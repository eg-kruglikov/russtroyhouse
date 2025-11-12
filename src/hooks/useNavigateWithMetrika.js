// src/hooks/useNavigateWithMetrika.js
import { useNavigate } from "react-router-dom";

/**
 * Универсальный navigate для переходов по сайту.
 * Отправка событий в Метрику происходит автоматически в App.jsx через useEffect на location.
 *
 * Использование:
 *  navigateWithMetrika("/contacts")
 *  navigateWithMetrika("/repair/cosmetic")
 *  navigateWithMetrika("/", { scrollTo: "contact" })
 */
export function useNavigateWithMetrika() {
  const navigate = useNavigate();

  return (to = "/", opts = {}) => {
    const { hash, replace, state, scrollTo } = opts || {};
    const normalizedHash =
      typeof hash === "string" && hash.length > 0
        ? hash.startsWith("#")
          ? hash
          : `#${hash}`
        : "";

    // Подготовим путь для навигации
    const page =
      typeof to === "string" ? (to.startsWith("/") ? to : `/${to}`) : "/";

    // Если хотим передать state (например, scrollTo), пробрасываем его
    const navOpts =
      scrollTo || state || replace
        ? {
            ...(replace ? { replace: true } : {}),
            state: {
              ...(state || {}),
              ...(scrollTo ? { scrollTo } : {}),
            },
          }
        : undefined;

    // Выполняем навигацию (метрика сработает автоматически через useEffect в App.jsx)
    navigate(page, navOpts);

    if (normalizedHash) {
      requestAnimationFrame(() => {
        window.history.replaceState(null, "", `${page}${normalizedHash}`);
      });
    }
  };
}
