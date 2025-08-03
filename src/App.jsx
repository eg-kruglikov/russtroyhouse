import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import ProjectPage from "./components/pages/ProjectPage";
import ScrollToTop from "./components/ScrollToTop";

import CapitalRepairPage from "./components/pages/Repair/CapitalRepairPage";
import CosmeticRepairPage from "./components/pages/Repair/CosmeticRepairPage";
import DesignerRepairPage from "./components/pages/Repair/DesignerRepairPage";

import { useEffect } from "react";

const RedirectHandler = () => {
  useEffect(() => {
    const search = window.location.search;
    if (search.startsWith("?/")) {
      const newPath = search.slice(2); // Убираем ?/
      window.history.replaceState(null, "", "/" + newPath);
    }
  }, []);
  return null;
};

const App = () => {
  return (
    <Router>
      <RedirectHandler />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />

        {/* Страницы ремонтов */}
        <Route path="/repair/capital" element={<CapitalRepairPage />} />
        <Route path="/repair/cosmetic" element={<CosmeticRepairPage />} />
        <Route path="/repair/designer" element={<DesignerRepairPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
