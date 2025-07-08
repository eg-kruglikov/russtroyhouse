import React from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/images/homePage/img1.jpg",
  "/images/homePage/img2.jpg",
  "/images/homePage/img3.jpg",
  "/images/homePage/img4.jpg",
  "/images/homePage/img5.jpg",
  "/images/homePage/img6.jpg",
];

const PhotoGrid = ({ isMobile, scrollToportfolio }) => {
  const navigate = useNavigate();

  const handleClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div
      style={{
        // width: isMobile ? "100vw" : "auto",
        height: isMobile ? "auto" : "80%",
        // padding: "0px 1vw",
        boxSizing: "border-box",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "1%",
      }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flex: isMobile ? "1 1 100%" : "1 1 calc(50% - 8px)", // две колонки
            maxWidth: isMobile ? "100%" : "calc(50% - 16px)",
            marginBottom: isMobile ? "10px" : "0px",
            overflow: "hidden",
            cursor: "pointer",
            position: "relative",
            height: "33%",
          }}
        >
          <img
            src={src}
            alt={`Проект ${i + 1}`}
            style={{
              aspectRatio: isMobile ? "4 / 3" : "auto",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => handleClick(i + 1)}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
