import React, { useEffect, useRef, useState } from "react";

/**
 * FullWidthImageGallery - Галерея изображений на всю ширину экрана со свайпом и счетчиком
 * @param {Array<string>} images - Массив путей к изображениям
 * @param {string} aspectRatio - Соотношение сторон (по умолчанию "1280 / 960")
 * @param {string} altPrefix - Префикс для alt текста (по умолчанию "Изображение")
 * @param {boolean} isMobile - Флаг мобильной версии (влияет на размер счетчика)
 */
const FullWidthImageGallery = ({
  images,
  aspectRatio = "1280 / 960",
  altPrefix = "Изображение",
  isMobile = false,
  onIndexChange,
  counterFormatter,
  counterStyle,
  counterTextStyle,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Свайп влево - следующее фото
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else if (distance < -minSwipeDistance) {
      // Свайп вправо - предыдущее фото
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    if (typeof onIndexChange === "function") {
      onIndexChange(currentImageIndex);
    }
  }, [currentImageIndex, onIndexChange]);

  if (!images || images.length === 0) {
    return null;
  }

  const counterContent = counterFormatter
    ? counterFormatter(currentImageIndex, images.length)
    : `${currentImageIndex + 1}/${images.length}`;

  return (
    <div
      style={{
        marginBottom: isMobile ? 16 : 20,
        width: "100%",
        position: "relative",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Счетчик фото */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? 12 : 16,
          right: isMobile ? 12 : 16,
          background: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          width: isMobile ? 40 : 48,
          height: isMobile ? 40 : 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          backdropFilter: "blur(8px)",
          ...counterStyle,
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: isMobile ? 12 : 14,
            fontWeight: 700,
            ...counterTextStyle,
          }}
        >
          {counterContent}
        </span>
      </div>

      <img
        src={images[currentImageIndex]}
        alt={`${altPrefix} ${currentImageIndex + 1}`}
        style={{
          width: "100%",
          aspectRatio,
          objectFit: "cover",
          display: "block",
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
};

export default FullWidthImageGallery;

