import React, { useEffect, useState } from "react";
import "./FlowSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

import SwiperCore from "swiper";
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import { SECTION_BACKGROUND } from "../../utils/spacing";

// подключаем модули
SwiperCore.use([FreeMode, Mousewheel, Autoplay]);

const images = [
  "/images/slider/img1.jpg",
  "/images/slider/img2.jpg",
  "/images/slider/img3.jpg",
  "/images/slider/img4.jpg",
  "/images/slider/img5.jpg",
];

const cosmeticImages = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
const capitalImages = ["/img4.jpg", "/img5.jpg", "/img6.jpg"];
const designerImages = ["/img7.jpg", "/img8.jpg", "/img9.jpg"];

export default function FlowSlider(isMobile) {
  return (
    <div style={{ padding: "20px 0", backgroundColor: SECTION_BACKGROUND }}>
      <Swiper
        spaceBetween={1}
        slidesPerView={"auto"}
        freeMode={true}
        grabCursor={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop={true}
        style={{ padding: "10px", overflow: "visible" }}
      >
        {images.map((src, idx) => (
          <SwiperSlide
            key={idx}
            style={{
              width: isMobile ? "100%" : "60%",

              borderRadius: "12px",
              overflow: "hidden",
              transition: "transform 6s ease",
            }}
            className="zoom-on-hover"
          >
            <img
              src={src}
              alt={`Slide ${idx}`}
              style={{
                width: "450px",

                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
