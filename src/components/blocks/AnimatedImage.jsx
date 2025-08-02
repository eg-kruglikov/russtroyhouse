import React from "react";
import { useNavigate } from "react-router-dom";
import more from "../../assets/more.png";

const AnimatedImage = ({ src, alt, projectId, isMobile, title }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 100);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        flex: isMobile ? "1 1 100%" : "1 1 calc(50% - 8px)",
        maxWidth: isMobile ? "100%" : "calc(50% - 16px)",
        marginBottom: isMobile ? "10px" : "0px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        height: "33%",
        transition: "transform 0.2s ease",
        WebkitTapHighlightColor: "transparent",
      }}
      onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
      <div
        style={{
          position: "absolute",

          top: "15px", // Отступ сверху
          left: "50%", // Центр по горизонтали
          transform: "translateX(-50%)",
          fontSize: isMobile ? "4.6vw" : "2.1vw",
          whiteSpace: "nowrap",

          fontWeight: "500",
          textShadow: "2px 2px 6px rgba(0, 0, 0, 0.9)",
        }}
      >
        {title}
      </div>
      <img
        loading="lazy"
        src={more}
        style={{
          position: "absolute",
          bottom: "4%",
          left: "0%",
          height: "auto",
          width: isMobile ? "35%" : "25%",
        }}
      />
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
