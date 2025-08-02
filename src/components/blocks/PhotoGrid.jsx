import React from "react";
import AnimatedImage from "../../components/blocks/AnimatedImage";

const images = [
  {
    img: "/images/homePage/img1.jpg",
    title: "Современный уют с винтажными акцентами",
  },
  {
    img: "/images/homePage/img2.jpg",
    title: "Теплая атмосфера с первого шага",
  },
  {
    img: "/images/homePage/img3.jpg",
    title: "Место, где рождается спокойствие",
  },
  {
    img: "/images/homePage/img4.jpg",
    title: "Современный комфорт и расслабление",
  },
  { img: "/images/homePage/img5.jpg", title: "Простор и уют для всей семьи" },
  {
    img: "/images/homePage/img6.jpg",
    title: "Интерьер, в котором хочется остаться",
  },
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
      {images.map((el, i) => (
        <AnimatedImage
          key={i}
          src={el.img}
          alt={`Проект ${i + 1}`}
          projectId={i + 1}
          isMobile={isMobile}
          title={el.title}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
