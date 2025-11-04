import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { useEffect } from "react";

import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

import CapitalRepairPage from "./pages/Repair/CapitalRepairPage";
import CosmeticRepairPage from "./pages/Repair/CosmeticRepairPage";
import DesignerRepairPage from "./pages/Repair/DesignerRepairPage";
import WhiteboxRepairPage from "./pages/Repair/WhiteboxRepairPage";

import PortfolioProjectPage from "./pages/Portfolio/Project";

import { useScrollRestoration } from "./hooks/useScrollRestoration";
import { ymNavigate, ymError, ymPageViewsCount } from "./utils/metrika";

import ContactsPage from "./pages/Contacts";
import Header from "./components/blocks/Header";

const RedirectHandler = () => {
  useEffect(() => {
    const search = window.location.search;

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

  // Отслеживание количества просмотренных страниц
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
  }, [location]);

  useEffect(() => {
    const isInitialLoad = (window.history?.state?.idx ?? 0) === 0;
    if (isInitialLoad) return;
    if (action === "POP") {
      const url =
        location.pathname + (location.search || "") + (location.hash || "");
      ymNavigate(url);
    }
  }, [action, location]);

  useScrollRestoration();

  return (
    <>
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
    </>
  );
};

export default App;
