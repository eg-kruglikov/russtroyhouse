// src/hooks/usePressEffect.js
import { useCallback } from "react";

export const usePressEffect = () => {
  const onStart = useCallback((e) => {
    e.currentTarget.style.transform = "scale(0.9)";
  }, []);

  const onEnd = useCallback((e) => {
    e.currentTarget.style.transform = "scale(1)";
  }, []);

  return {
    onTouchStart: onStart,
    onTouchEnd: onEnd,
    onMouseDown: onStart,
    onMouseUp: onEnd,
    onMouseLeave: onEnd,
    style: {
      WebkitTapHighlightColor: "transparent",
      transition: "transform .12s ease",
    },
  };
};
