import React from "react";
import { useNavigate } from "react-router-dom";
import { usePressEffect } from "../../hooks/useSomething";
import { ymNavigate } from "../../utils/metrika";

const AnimatedImage = ({ src, alt, projectId, isMobile, title }) => {
  const navigate = useNavigate();
  const press = usePressEffect();

  const handleClick = (e) => {
    // Отправляем виртуальный хит + notBounce
    ymNavigate(`/project/${projectId}`);

    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 100);
  };

  return (
    <div
      {...press}
      onClick={handleClick}
      style={{
        ...press.style,
        width: "100%",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        height: isMobile ? "auto" : "auto",
      }}
    >
      <img
        loading="lazy"
        src={src}
        alt={alt}
        style={{
          aspectRatio: "4 / 3",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          position: "relative",
        }}
      />
      {/* текстовая подложка с названием проекта */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: isMobile ? "10px 12px 46px" : "12px 14px 52px",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 60%, rgba(0,0,0,.75) 100%)",
          color: "#fff",
          display: "grid",
          gap: 6,
        }}
        aria-hidden
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: isMobile ? 18 : 20,
            lineHeight: 1.25,
            textShadow: "0 2px 8px rgba(0,0,0,.6)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            opacity: 0.9,
            fontSize: isMobile ? 12 : 13,
          }}
        >
          Смотреть дизайн‑проект
        </div>
      </div>

      {/* компактная кнопка-ярлык */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          background: "#FFD700",
          color: "#0a1a26",
          borderRadius: 999,
          padding: isMobile ? "8px 12px" : "10px 14px",
          fontWeight: 900,
          fontSize: isMobile ? 12 : 14,
          boxShadow: "0 8px 16px rgba(255,215,0,.3)",
        }}
      >
        Подробнее
      </div>
      {/* <div
        style={{
          display: isMobile ? "inline-block" : "none",
          position: "absolute",
          backgroundColor: "#ffd600",
          color: "white",
          fontSize: "18px",
          padding: "4px 14px",
          paddingRight: "40px",
          clipPath: "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)",
          fontFamily: "sans-serif",
          bottom: "2%",
        }}
      >
        узнать больше
      </div> */}
    </div>
  );
};

export default AnimatedImage;
