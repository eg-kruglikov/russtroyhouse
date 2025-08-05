import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { useEffect } from "react";

import Home from "./components/pages/Home";
import ProjectPage from "./components/pages/ProjectPage";
import ScrollToTop from "./components/ScrollToTop";

import CapitalRepairPage from "./components/pages/Repair/CapitalRepairPage";
import CosmeticRepairPage from "./components/pages/Repair/CosmeticRepairPage";
import DesignerRepairPage from "./components/pages/Repair/DesignerRepairPage";

// Компонент для обработки редиректа
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

  useEffect(() => {
    if (action === "POP") {
      console.log("← Пользователь нажал Назад!", location.pathname);
      // Здесь можно добавить вызов Метрики, если нужно
      // if (window.ym) window.ym(101296472, "hit", location.pathname);
    }
  }, [action, location]);

  return (
    <>
      <RedirectHandler />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Страницы ремонтов */}
        <Route path="/repair/cosmetic" element={<CosmeticRepairPage />} />
        <Route path="/repair/capital" element={<CapitalRepairPage />} />
        <Route path="/repair/designer" element={<DesignerRepairPage />} />

        <Route path="/project/:id" element={<ProjectPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
