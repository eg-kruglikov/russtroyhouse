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

import PortfolioProjectPage from "./pages/Portfolio/Project";

import { useScrollRestoration } from "./hooks/useScrollRestoration";

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

  // 🔹 Хук, который чинит refresh с GitHub Pages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      window.history.replaceState(null, "", redirect);
    }
  }, []);

  useEffect(() => {
    if (action === "POP") {
      console.log("⬅ Пользователь нажал Назад!", location.pathname);
    }
  }, [action, location]);

  useScrollRestoration();

  return (
    <>
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Страницы ремонтов */}
        <Route path="/repair/cosmetic" element={<CosmeticRepairPage />} />
        <Route path="/repair/capital" element={<CapitalRepairPage />} />
        <Route path="/repair/designer" element={<DesignerRepairPage />} />

        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/portfolio/:slug" element={<PortfolioProjectPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
