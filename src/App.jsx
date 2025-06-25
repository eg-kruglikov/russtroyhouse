import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ProjectPage from "./components/ProjectPage";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
