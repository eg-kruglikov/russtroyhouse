import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Сразу сбрасываем без задержек, без анимации
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTop = 0; // для Safari
  }, [pathname]);

  return null;
};

export default ScrollToTop;
