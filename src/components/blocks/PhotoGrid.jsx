import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullWidthImageGallery from "./FullWidthImageGallery";
import { ymNavigate } from "../../utils/metrika";
import { SECTION_BACKGROUND } from "../../utils/spacing";

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
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = images.map((item) => item.img);

  const currentProject = images[currentIndex] ?? images[0];

  const handleLearnMore = (projectId) => {
    if (!projectId) return;

    ymNavigate(`/project/${projectId}`);

    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 100);
  };

  const galleryWrapperStyle = {
    position: "relative",
    width: isMobile ? "100vw" : "100%",
    marginLeft: isMobile ? "calc(-50vw + 50%)" : 0,
    maxWidth: "100%",
  };

  const contentWrapperStyle = {
    backgroundColor: SECTION_BACKGROUND,
    padding: isMobile ? "14px 20px 18px" : "20px 24px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: isMobile ? 6 : 10,
    minHeight: isMobile ? 95 : 115,
    height: isMobile ? 95 : 115,
  };

  const titleStyle = {
    fontSize: isMobile ? "5vw" : "28px",
    fontWeight: 500,
    margin: 0,
    color: "#ffffff",
    lineHeight: 1.2,
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div style={galleryWrapperStyle}>
        <FullWidthImageGallery
          images={galleryImages}
          isMobile={isMobile}
          aspectRatio={isMobile ? "4 / 3" : "1200 / 750"}
          altPrefix="Дизайн-проект"
          onIndexChange={setCurrentIndex}
          counterFormatter={(index, total) => `${index + 1}/${total}`}
          counterStyle={{
            background: "rgba(0,0,0,0.65)",
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
          }}
          counterTextStyle={{
            color: "#FFFFFF",
            fontSize: isMobile ? 12 : 14,
            fontWeight: 600,
          }}
        />
      </div>

      <div style={contentWrapperStyle}>
        <h2 style={titleStyle}>{currentProject.title}</h2>
        <a
          href={`/project/${currentIndex + 1}`}
          onClick={(event) => {
            event.preventDefault();
            handleLearnMore(currentIndex + 1);
          }}
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
    </div>
  );
};

export default PhotoGrid;
