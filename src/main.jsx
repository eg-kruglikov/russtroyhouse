import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// --- обработка redirect из 404.html ---
const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");
if (redirect) {
  window.history.replaceState({}, "", decodeURIComponent(redirect));
}
// --- конец обработки ---

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
