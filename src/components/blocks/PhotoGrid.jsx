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

const PhotoGrid = ({ isMobile }) => {
  const navigate = useNavigate();

  const handleClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section
      style={{
        width: "100%", // растягиваем на всю ширину экрана
        padding: "24px 1vw", // отступы по бокам
        boxSizing: "border-box", // чтобы padding не выходил за экран
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(2, 1fr)", // 2 колонки
          gap: "16px",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              overflow: "hidden",

              width: "100%",
              aspectRatio: "4 / 3", // сохраняет пропорции (можно 16/9 или своё)
              cursor: "pointer",
            }}
          >
            <img
              src={src}
              alt={`Проект ${i + 1}`}
              style={{
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
    </section>
  );
};

export default PhotoGrid;
