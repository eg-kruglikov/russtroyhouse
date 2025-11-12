import React from "react";

const CompanyName = ({ isMobile }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontWeight: 500,
        fontSize: isMobile ? "18px" : "19px",
        color: "rgba(255,255,255,0.85)",
        whiteSpace: "nowrap",
        fontStyle: "normal",
        letterSpacing: "0.5px",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      Руссуютстрой
    </div>
  );
};

export default CompanyName;

