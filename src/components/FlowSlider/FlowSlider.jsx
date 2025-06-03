import React, { useEffect, useState } from "react";
import "./FlowSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

import SwiperCore from "swiper";
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";

// подключаем модули
SwiperCore.use([FreeMode, Mousewheel, Autoplay]);

const images = [
  "/images/slider/img1.jpg",
  "/images/slider/img2.jpg",
  "/images/slider/img3.jpg",
  "/images/slider/img4.jpg",
  "/images/slider/img5.jpg",
];

export default function FlowSlider(isMobile) {
  return (
    <div style={{ padding: "20px 0", backgroundColor: "#111" }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        freeMode={true}
        grabCursor={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
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
              transition: "transform 0.3s ease",
            }}
            className="zoom-on-hover"
          >
            <img
              src={src}
              alt={`Slide ${idx}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
