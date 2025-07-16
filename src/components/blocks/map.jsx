import React, { useRef, useState } from "react";
import map from "../../assets/map.png";

const Map = () => {
  const sectionRef = useRef(null);

  return (
    <section
      onClick={() => {
        window.open(
          "https://yandex.ru/maps/?pt=37.844056,55.921869&z=17&l=map",
          "_blank"
        );
      }}
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
        cursor: "pointer",
      }}
    ></section>
  );
};

export default Map;
