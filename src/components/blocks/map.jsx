import React, { useRef, useState } from "react";
import map from "../../assets/map.png";

const Map = () => {
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40; // Горизонталь
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40; // Вертикаль
    section.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  };

  const handleMouseLeave = () => {
    const section = sectionRef.current;
    section.style.backgroundPosition = "50% 50%";
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${map})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        height: "20vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxSizing: "border-box",
        margin: "0 auto",
        overflow: "hidden",
        position: "relative",
        transition: "background-position 0.1s ease-out",
      }}
    ></section>
  );
};

export default Map;
