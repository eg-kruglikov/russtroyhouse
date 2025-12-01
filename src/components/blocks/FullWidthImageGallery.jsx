import React, { useEffect, useRef, useState } from "react";
import { ymTrackEvent } from "../../utils/metrika";

/**
 * FullWidthImageGallery - Галерея изображений на всю ширину экрана со свайпом и счетчиком
 * @param {Array<string>} images - Массив путей к изображениям
 * @param {string} aspectRatio - Соотношение сторон (по умолчанию "1280 / 960")
 * @param {string} altPrefix - Префикс для alt текста (по умолчанию "Изображение")
 * @param {boolean} isMobile - Флаг мобильной версии (влияет на размер счетчика)
 */
const FullWidthImageGallery = ({
  images,
  aspectRatio,
  altPrefix = "Изображение",
  isMobile = false,
  onIndexChange,
  counterFormatter,
  counterStyle,
  counterTextStyle,
  interactionLabel = "",
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

  const trackGalleryInteraction = (action, index, source) => {
    if (!interactionLabel) return;
    const actionKey = source ? `${action}_${source}` : action;
    const labelParts = [interactionLabel];
    if (typeof index === "number") {
      labelParts.push(`img-${index + 1}`);
    }
    if (source) {
      labelParts.push(source);
    }
    ymTrackEvent("whitebox_gallery", actionKey, labelParts.join("|"));
  };

  const handleNext = (source = "button") => {
    if (!images?.length) {
      return;
    }
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    trackGalleryInteraction("next", nextIndex, source);
  };

  const handlePrev = (source = "button") => {
    if (!images?.length) {
      return;
    }
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
    trackGalleryInteraction("prev", prevIndex, source);
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Свайп влево - следующее фото
      handleNext("swipe");
    } else if (distance < -minSwipeDistance) {
      // Свайп вправо - предыдущее фото
      handlePrev("swipe");
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
    ...(aspectRatio ? { aspectRatio } : {}),
        overflow: "hidden",
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

      <button
        type="button"
        onClick={handlePrev}
        aria-label="Предыдущее фото"
        style={{
          position: "absolute",
          top: "50%",
          left: isMobile ? 12 : 16,
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.6)",
          border: "none",
          borderRadius: "50%",
          width: isMobile ? 40 : 48,
          height: isMobile ? 40 : 48,
          color: "#fff",
          fontSize: isMobile ? 18 : 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          zIndex: 12,
        }}
      >
        ‹
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Следующее фото"
        style={{
          position: "absolute",
          top: "50%",
          right: isMobile ? 12 : 16,
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.6)",
          border: "none",
          borderRadius: "50%",
          width: isMobile ? 40 : 48,
          height: isMobile ? 40 : 48,
          color: "#fff",
          fontSize: isMobile ? 18 : 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          zIndex: 12,
        }}
      >
        ›
      </button>

      <img
        src={images[currentImageIndex]}
        alt={`${altPrefix} ${currentImageIndex + 1}`}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          display: "block",
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
};

export default FullWidthImageGallery;

