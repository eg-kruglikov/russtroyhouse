import React from "react";
import AnimatedImage from "../../components/blocks/AnimatedImage";

const images = [
  "/images/homePage/img1.jpg",
  "/images/homePage/img2.jpg",
  "/images/homePage/img3.jpg",
  "/images/homePage/img4.jpg",
  "/images/homePage/img5.jpg",
  "/images/homePage/img6.jpg",
];

const PhotoGrid = ({ isMobile }) => {
  return (
    <div
      style={{
        height: isMobile ? "auto" : "80%",
        boxSizing: "border-box",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "1%",
      }}
    >
      {images.map((src, i) => (
        <AnimatedImage
          key={i}
          src={src}
          alt={`Проект ${i + 1}`}
          projectId={i + 1}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
