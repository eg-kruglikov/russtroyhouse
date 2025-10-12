/**
 * Хук для отслеживания активности пользователя на странице
 * Отслеживает:
 * - Глубину скролла (25%, 50%, 75%, 100%)
 * - Время на странице (30с, 1м, 2м, 3м, 5м)
 * - Первую активность (notBounce)
 */

import { useEffect, useRef } from "react";
import { ymScrollDepth, ymTimeOnPage, ymNotBounce } from "../utils/metrika";

export const useMetrikaActivity = () => {
  const scrollDepthsTracked = useRef(new Set());
  const timeIntervalsTracked = useRef(new Set());
  const startTime = useRef(Date.now());
  const notBounceSent = useRef(false);

  useEffect(() => {
    // Отслеживание глубины скролла
    const handleScroll = () => {
      // Отправляем notBounce при первом скролле
      if (!notBounceSent.current) {
        ymNotBounce();
        notBounceSent.current = true;
      }

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

      // Определяем пороги скролла
      const depths = [25, 50, 75, 100];

      depths.forEach((depth) => {
        if (scrollPercent >= depth && !scrollDepthsTracked.current.has(depth)) {
          scrollDepthsTracked.current.add(depth);
          ymScrollDepth(depth);
        }
      });
    };

    // Отслеживание времени на странице
    const trackTimeOnPage = () => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);

      // Пороги времени в секундах
      const timeThresholds = [30, 60, 120, 180, 300];

      timeThresholds.forEach((threshold) => {
        if (
          elapsed >= threshold &&
          !timeIntervalsTracked.current.has(threshold)
        ) {
          timeIntervalsTracked.current.add(threshold);
          ymTimeOnPage(threshold);
        }
      });
    };

    // Проверяем время каждые 10 секунд
    const timeInterval = setInterval(trackTimeOnPage, 10000);

    // Добавляем слушатель скролла с throttling
    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 300);
    };

    // Отслеживание других видов активности
    const handleActivity = () => {
      if (!notBounceSent.current) {
        ymNotBounce();
        notBounceSent.current = true;
      }
    };

    // Слушаем различные события активности
    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("mousemove", handleActivity, {
      once: true,
      passive: true,
    });
    window.addEventListener("click", handleActivity, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", handleActivity, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchstart", handleActivity, {
      once: true,
      passive: true,
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      clearInterval(timeInterval);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
};

export default useMetrikaActivity;
