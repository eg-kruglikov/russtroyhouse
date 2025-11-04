import React from "react";
import { useNavigate } from "react-router-dom";
import { ymNavigate } from "../../utils/metrika";

const AnimatedImage = ({ src, alt, projectId, isMobile, title }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Отправляем виртуальный хит + notBounce
    ymNavigate(`/project/${projectId}`);

    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 100);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Заголовок перед фото */}
      <div
        style={{
          padding: isMobile ? "0 20px 16px 20px" : "24px 24px 20px",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "5vw" : "24px",
            fontWeight: 400,
            margin: "0",
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Изображение */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: isMobile ? "250px" : "280px",
          marginLeft: "calc(-50vw + 50%)",
        }}
      >
        <img
          loading="lazy"
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: "0",
            boxShadow: "none",
          }}
        />
      </div>

      {/* Контент */}
      <div
        style={{
          padding: isMobile ? "20px 20px" : "28px 24px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          flex: 1,
        }}
      >
        {/* Ссылка вместо кнопки */}
        <a
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
          href={`/project/${projectId}`}
          style={{
            color: "#FFD700",
            fontSize: isMobile ? "4.5vw" : "19px",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            marginTop: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.gap = "12px";
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.gap = "8px";
            e.currentTarget.style.opacity = "1";
          }}
        >
          Подробнее
          <span style={{ fontSize: "22px" }}>→</span>
        </a>
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
