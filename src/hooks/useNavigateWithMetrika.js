// src/hooks/useNavigateWithMetrika.js
import { useNavigate } from "react-router-dom";

/**
 * Универсальный navigate с отправкой событий в Метрику.
 *
 * Использование:
 *  navigateWithMetrika("/contacts")
 *  navigateWithMetrika("/repair/cosmetic")
 *  navigateWithMetrika("/", { scrollTo: "contact" })
 */
export function useNavigateWithMetrika() {
  const navigate = useNavigate();

  return (to = "/", opts = {}) => {
    // Подготовим путь для хита Метрики
    const page =
      typeof to === "string" ? (to.startsWith("/") ? to : `/${to}`) : "/";
    console.log(page);
    if (window.ym) {
      window.ym(101296472, "hit", page);
      window.ym(101296472, "notBounce");
    }

    // Если хотим передать state (например, scrollTo), пробрасываем его
    const navOpts =
      opts && (opts.scrollTo || opts.state || opts.replace)
        ? {
            ...(opts.replace ? { replace: true } : {}),
            state: {
              ...(opts.state || {}),
              ...(opts.scrollTo ? { scrollTo: opts.scrollTo } : {}),
            },
          }
        : undefined;

    // маленькая задержка, чтобы Метрика успела зафиксировать хит
    setTimeout(() => navigate(page, navOpts), 100);
  };
}
