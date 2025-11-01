import React, { useState, useRef, useEffect, useCallback } from "react";

const BeforeAfterSlider = ({ firstImage, secondImage, isMobile }) => {
  const containerRef = useRef(null);
  const delimiterRef = useRef(null);
  const [position, setPosition] = useState(50); // начальная позиция 50%
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPositionRef = useRef(50);
  const scrollPositionRef = useRef(0);

  const handleStart = useCallback(
    (clientX) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // Сохраняем начальные значения и позицию скролла ДО блокировки
      startXRef.current = clientX;
      startPositionRef.current = position;
      scrollPositionRef.current =
        window.pageYOffset || document.documentElement.scrollTop;

      setIsDragging(true);
      isDraggingRef.current = true;

      // Блокируем скролл только на мобильных устройствах
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }
    },
    [position, isMobile]
  );

  const handleMove = useCallback(
    (clientX) => {
      if (!isDraggingRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const deltaX = clientX - startXRef.current;
      const deltaPercent = (deltaX / containerWidth) * 100;

      const newPosition = Math.max(
        0,
        Math.min(100, startPositionRef.current + deltaPercent)
      );
      setPosition(newPosition);

      // Блокируем скролл страницы при движении только на мобильных устройствах
      if (isMobile && !document.body.style.position) {
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPositionRef.current}px`;
        document.body.style.width = "100%";
      }
    },
    [isMobile]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;

    // Разблокируем скролл страницы только если блокировали (на мобильных)
    if (isMobile) {
      const savedScrollPosition = scrollPositionRef.current;
      const wasFixed = document.body.style.position === "fixed";

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.height = "";

      // Восстанавливаем позицию скролла только если она была заблокирована
      if (wasFixed) {
        requestAnimationFrame(() => {
          window.scrollTo(0, savedScrollPosition);
        });
      }
    }
  }, [isMobile]);

  // Обработчики мыши - используются только для локальных событий
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(e.clientX);
  };

  // Добавляем touch обработчик напрямую для избежания passive listener проблемы
  useEffect(() => {
    const container = containerRef.current;
    const delimiter = delimiterRef.current;

    if (!container) return;

    const touchStartHandler = (e) => {
      e.stopPropagation();
      handleStart(e.touches[0].clientX);
    };

    // Добавляем обработчик с passive: false
    container.addEventListener("touchstart", touchStartHandler, {
      passive: false,
    });
    if (delimiter) {
      delimiter.addEventListener("touchstart", touchStartHandler, {
        passive: false,
      });
    }

    return () => {
      container.removeEventListener("touchstart", touchStartHandler);
      if (delimiter) {
        delimiter.removeEventListener("touchstart", touchStartHandler);
      }
    };
  }, [handleStart]);

  // Глобальные обработчики
  useEffect(() => {
    if (!isDragging) return;

    const moveHandler = (e) => {
      if (e.type === "mousemove") {
        e.preventDefault();
        handleMove(e.clientX);
      } else if (e.type === "touchmove") {
        if (e.cancelable) {
          e.preventDefault();
        }
        handleMove(e.touches[0].clientX);
      }
    };

    const endHandler = (e) => {
      if (e.type === "mouseup") {
        handleEnd();
      } else if (e.type === "touchend" || e.type === "touchcancel") {
        if (e.cancelable) {
          e.preventDefault();
        }
        handleEnd();
      }
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", endHandler);
    window.addEventListener("touchmove", moveHandler, { passive: false });
    window.addEventListener("touchend", endHandler, { passive: false });
    window.addEventListener("touchcancel", endHandler, { passive: false });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", endHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", endHandler);
      window.removeEventListener("touchcancel", endHandler);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        touchAction: "none",
        cursor: "grab",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Второе изображение (после) - справа */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={secondImage}
          alt="После"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Первое изображение (до) - слева */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 2,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={firstImage}
          alt="До"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Ползунок - вертикальная линия */}
      <div
        ref={delimiterRef}
        style={{
          position: "absolute",
          top: 0,
          left: `${position}%`,
          width: "3px",
          height: "100%",
          transform: "translateX(-50%)",
          zIndex: 10,
          cursor: "grab",
          touchAction: "none",
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Линия - вертикальная */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            width: "3px",
            height: "100%",
            backgroundColor: "#FFD700",
            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.9)",
          }}
        />

        {/* Кнопка */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #FFD700 0%, #FFC700 100%)",
            border: "2px solid rgba(255, 255, 255, 0.95)",
            borderRadius: "50%",
            boxShadow:
              "0 4px 16px rgba(255, 215, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            touchAction: "none",
          }}
        >
          <span
            style={{
              color: "rgba(0, 0, 0, 0.8)",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            ↔
          </span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
