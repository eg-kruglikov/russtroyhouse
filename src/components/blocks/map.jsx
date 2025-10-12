import React, { useEffect, useState } from "react";
import map from "../../assets/map.png";
import { usePressEffect } from "../../hooks/useSomething";

const Map = () => {
  const [vw, setVw] = useState(() => window.innerWidth);
  const press = usePressEffect();

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 768;
  const maxWidth = 1100; // ограничение ширины на широких экранах
  const height = isMobile ? 200 : 320;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "0 16px" }}
    >
      <section
        {...press}
        onClick={() => {
          window.open(
            "https://yandex.ru/maps/?pt=37.844056,55.921869&z=17&l=map",
            "_blank"
          );
        }}
        style={{
          ...press.style,
          width: "100%",
          maxWidth,
          borderRadius: 16,
          boxShadow: "0 10px 28px rgba(0,0,0,.25)",
          backgroundImage: `url(${map})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          height,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
        }}
        aria-label="Открыть карту в Яндекс.Картах"
      />
    </div>
  );
};

export default Map;
