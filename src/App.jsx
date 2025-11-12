import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { useEffect } from "react";
import { PhoneIconProvider } from "./contexts/PhoneIconContext";

import Home from "./pages/Home/Index.jsx";
import ProjectPage from "./pages/ProjectPage";

import CapitalRepairPage from "./pages/Repair/CapitalRepairPage";
import CosmeticRepairPage from "./pages/Repair/CosmeticRepairPage";
import DesignerRepairPage from "./pages/Repair/DesignerRepairPage";
import WhiteboxRepairPage from "./pages/Repair/WhiteboxRepairPage";

import PortfolioProjectPage from "./pages/Portfolio/Project";

import { useScrollRestoration } from "./hooks/useScrollRestoration";
import { ymNavigate, ymError, ymPageViewsCount } from "./utils/metrika";
import { useEngagementGoals } from "./hooks/useEngagementGoals";

import ContactsPage from "./pages/Contacts";
import Header from "./components/blocks/Header";
import { ScrollProvider } from "./contexts/ScrollContext";

const RedirectHandler = () => {
  useEffect(() => {
    const search = window.location.search;
    if (!search) return;

    const params = new URLSearchParams(search);
    if (params.has("_ym_debug")) {
      return;
    }

    if (search.startsWith("?/")) {
      const newPath = search.slice(2); // убираем ?/
      // Используем pushState, чтобы первая страница осталась в истории
      window.history.pushState(null, "", "/" + newPath);
    }
  }, []);

  return null;
};

// Основной компонент приложения
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// Внутренний компонент, который имеет доступ к useLocation/useNavigationType
const AppContent = () => {
  const location = useLocation();
  const action = useNavigationType();
  const { registerPageCount } = useEngagementGoals();

  // 🔹 Глобальный обработчик ошибок
  useEffect(() => {
    const handleError = (event) => {
      ymError(event.error || event.message, {
        type: "uncaught_error",
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    };

    const handleUnhandledRejection = (event) => {
      ymError(event.reason, {
        type: "unhandled_rejection",
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  // 🔹 Хук, который чинит refresh с GitHub Pages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      window.history.replaceState(null, "", redirect);
    }
  }, []);

  // 🔹 Отправка hit в Метрику при каждом изменении маршрута (для корректной работы Вебвизора в SPA)
  useEffect(() => {
    const url =
      location.pathname + (location.search || "") + (location.hash || "");
    
    // Отправляем hit при каждом изменении маршрута
    // Это помогает Вебвизору "видеть" смену экрана и корректно записывать активность
    ymNavigate(url);
  }, [location]);

  // 🔹 Отслеживание количества просмотренных страниц
  useEffect(() => {
    const viewedPages = new Set(
      JSON.parse(sessionStorage.getItem("viewedPages") || "[]")
    );

    const currentPage = location.pathname;
    if (!viewedPages.has(currentPage)) {
      viewedPages.add(currentPage);
      sessionStorage.setItem("viewedPages", JSON.stringify([...viewedPages]));

      const pageCount = viewedPages.size;
      ymPageViewsCount(pageCount);
    }

    registerPageCount(viewedPages.size || 1);
  }, [location, registerPageCount]);

  useScrollRestoration();

  return (
    <>
      <PhoneIconProvider>
        <ScrollProvider>
          <RedirectHandler />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Страницы ремонтов */}
            <Route path="/repair/cosmetic" element={<CosmeticRepairPage />} />
            <Route path="/repair/capital" element={<CapitalRepairPage />} />
            <Route path="/repair/designer" element={<DesignerRepairPage />} />
            <Route path="/repair/whitebox" element={<WhiteboxRepairPage />} />

            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/portfolio/:slug" element={<PortfolioProjectPage />} />

            <Route path="/contacts" element={<ContactsPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ScrollProvider>
      </PhoneIconProvider>
    </>
  );
};

export default App;
