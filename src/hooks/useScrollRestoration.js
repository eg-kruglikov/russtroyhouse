// src/hooks/useScrollRestoration.js
import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const DEBUG = false; // <-- включи true, чтобы видеть детальные логи в консоли

// где сохраняем позиции: ключ -> { x, y }
const scrollPositions = new Map();

/**
 * Если ты скроллишь не window, передай сюда ref на контейнер:
 *   useScrollRestoration(containerRef)
 */
export function useScrollRestoration(containerRef) {
  const location = useLocation();
  const navType = useNavigationType(); // POP (назад/вперёд), PUSH, REPLACE

  // куда скроллим: либо контейнер, либо window
  const getTarget = () => containerRef?.current ?? window;

  // текущие координаты скролла
  const getScroll = () => {
    const t = getTarget();
    if (t === window) {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft || 0,
        y: window.pageYOffset || document.documentElement.scrollTop || 0,
      };
    }
    return { x: t.scrollLeft, y: t.scrollTop };
  };

  const setScroll = (x, y) => {
    const t = getTarget();
    if (t === window) {
      window.scrollTo(x, y);
    } else {
      t.scrollTo({ left: x, top: y, behavior: "auto" });
    }
  };

  // сохраняем позицию на скролле (с дебаунсом)
  const saveTimer = useRef(null);
  useEffect(() => {
    const t = getTarget();
    const onScroll = () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        const pos = getScroll();
        scrollPositions.set(location.key || location.pathname, pos);
        if (DEBUG)
          console.log("[scroll-save]", location.key || location.pathname, pos);
      }, 80);
    };

    // подписка
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", () => {
      const pos = getScroll();
      scrollPositions.set(location.key || location.pathname, pos);
      if (DEBUG)
        console.log(
          "[beforeunload-save]",
          location.key || location.pathname,
          pos
        );
    });

    return () => {
      t.removeEventListener("scroll", onScroll);
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, location.pathname, containerRef?.current]);

  // восстанавливаем при смене маршрута
  useEffect(() => {
    const key = location.key || location.pathname;
    const saved = scrollPositions.get(key);

    if (DEBUG) {
      console.log("[nav]", navType, "key:", key, "saved:", saved);
    }

    // При новых переходах — вверх
    if (navType !== "POP") {
      setScroll(0, 0);
      return;
    }

    // При «Назад/Вперёд» пробуем восстановить…
    if (!saved) return; // нечего восстанавливать

    // …но дождёмся, пока контент дорендерится (картинки, списки и т.п.)
    let tries = 0;
    const MAX_TRIES = 20;
    const STEP = 50; // мс

    const tryRestore = () => {
      tries += 1;

      // вычисляем «доступную» высоту, чтобы не скроллить дальше контента
      const t = getTarget();
      const maxHeight =
        t === window
          ? Math.max(
              document.documentElement.scrollHeight,
              document.body.scrollHeight
            )
          : t.scrollHeight;

      const targetY = Math.min(saved.y, maxHeight - 1);

      setScroll(saved.x, targetY);

      if (DEBUG) {
        console.log(
          `[restore ${tries}] to`,
          saved,
          "maxHeight:",
          maxHeight,
          "currentY:",
          getScroll().y
        );
      }

      // если уже почти там — останавливаемся
      if (Math.abs(getScroll().y - targetY) < 2 || tries >= MAX_TRIES) return;

      setTimeout(tryRestore, STEP);
    };

    // первый заход — сразу (а потом догоняем по мере дорендера)
    tryRestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, location.pathname, navType, containerRef?.current]);
}
