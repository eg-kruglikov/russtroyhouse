import React, { useEffect, useState } from "react";
import map from "../../assets/map.png";

const Map = () => {
  const [vw, setVw] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 768;
  const maxWidth = 1100; // ограничение ширины на широких экранах
  const height = isMobile ? 200 : 320;

  return (
    <div style={{ width: "100%" }}>
      <section
        onClick={() => {
          window.open(
            "https://yandex.ru/maps/?pt=37.844056,55.921869&z=17&l=map",
            "_blank"
          );
        }}
        style={{
          width: "100%",
          maxWidth: "100%",
          borderRadius: 0,
          boxShadow: "none",
          backgroundImage: `url(${map})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          height,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
        }}
        aria-label="Открыть карту в Яндекс.Картах"
      />
    </div>
  );
};

export default Map;
