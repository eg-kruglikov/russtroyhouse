import React, { useMemo } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import {
  SECTION_BACKGROUND,
  TITLE_CONTENT_GAP,
  TITLE_SIZES,
  TITLE_SUBTITLE_GAP,
} from "../../utils/spacing";

const BeforeAfterSection = ({
  isMobile,
  sectionId,
  sectionRef,
  sliderContainerRef,
  title,
  subtitle,
  footerDescription,
  firstImage,
  secondImage,
  sliderHeightPx,
  sectionStyle,
  headerTitleStyle,
  headerSubtitleStyle,
  marginTop,
}) => {
  const effectiveMarginTop = useMemo(() => {
    if (typeof marginTop === "string") return marginTop;
    return isMobile ? "12px" : "20px";
  }, [isMobile, marginTop]);

  const handleMouseEnter = (event) => {
    if (isMobile) return;
    event.currentTarget.style.transform = "scale(1.02)";
    event.currentTarget.style.boxShadow = "0 25px 70px rgba(0,0,0,0.6)";
  };

  const handleMouseLeave = (event) => {
    if (isMobile) return;
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
  };

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      style={{
        width: "100%",
        backgroundColor: SECTION_BACKGROUND,
        paddingTop: isMobile ? "30px" : "50px",
        paddingBottom: isMobile ? "30px" : "50px",
        marginTop: effectiveMarginTop,
        position: "relative",
        boxSizing: "border-box",
        ...(sectionStyle || {}),
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          boxSizing: "border-box",
        }}
      >
        {(title || subtitle) && (
          <div
            style={{
              textAlign: "left",
              width: "100%",
              paddingLeft: isMobile ? "20px" : "24px",
              paddingRight: isMobile ? "20px" : "24px",
              boxSizing: "border-box",
              marginBottom: isMobile
                ? TITLE_CONTENT_GAP.mobile
                : TITLE_CONTENT_GAP.desktop,
            }}
          >
            {title && (
              <h2
                style={{
                  fontSize: isMobile
                    ? TITLE_SIZES.mobile.main
                    : TITLE_SIZES.desktop.main,
                  fontWeight: "900",
                  color: "#FFD700",
                  margin: `0 0 ${
                    isMobile
                      ? TITLE_SUBTITLE_GAP.mobile
                      : TITLE_SUBTITLE_GAP.desktop
                  } 0`,
                  lineHeight: isMobile ? 1.2 : 1.1,
                  letterSpacing: "-0.5px",
                  textShadow: "0 2px 8px rgba(255,215,0,0.2)",
                  whiteSpace: "nowrap",
                  ...(headerTitleStyle || {}),
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: isMobile ? "18px" : "22px",
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  lineHeight: 1.6,
                  fontWeight: 500,
                  ...(headerSubtitleStyle || {}),
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      <div
        ref={sliderContainerRef}
        style={{
          width: "100%",
          height: sliderHeightPx,
          maxHeight: sliderHeightPx,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          transition: isMobile
            ? "none"
            : "transform 0.3s ease, box-shadow 0.3s ease",
          willChange: "transform",
          borderRadius: "0px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BeforeAfterSlider
          firstImage={firstImage}
          secondImage={secondImage}
          isMobile={isMobile}
        />
      </div>

      {footerDescription && (
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0",
            paddingTop: isMobile ? "6px" : "12px",
            paddingLeft: isMobile ? "20px" : "24px",
            paddingRight: isMobile ? "20px" : "24px",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: isMobile ? "16px" : "20px",
              color: "rgba(255,255,255,0.85)",
              margin: 0,
              lineHeight: 1.6,
              fontWeight: 400,
              fontFamily: "'Nunito', sans-serif",
              background: "none",
              WebkitTextFillColor: "rgba(255,255,255,0.85)",
            }}
          >
            {footerDescription}
          </p>
        </div>
      )}
    </section>
  );
};

export default BeforeAfterSection;
