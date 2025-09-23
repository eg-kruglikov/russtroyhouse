import React from "react";

import phoneIcon from "../../assets/phone-icon.png";

import { useNavigateWithMetrika } from "../../hooks/useNavigateWithMetrika";

const PhoneMobilePanel = ({ isMobile }) => {
  const navigate = useNavigateWithMetrika();
  return (
    <>
      {/* Кнопка трубки (всегда видна) */}
      <button
        onClick={() => {
          navigate("/contacts");
          navigator.vibrate?.(30);
        }}
        type="button"
        onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        style={{
          all: "unset",
          position: "fixed",
          bottom: isMobile ? "6svh" : "10%",
          right: isMobile ? "20px" : "10%",
          width: isMobile ? "70px" : "100px",
          height: isMobile ? "70px" : "100px",
          background: "#f2cb05",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 1001,
          WebkitTapHighlightColor: "transparent",
          transition: "transform 0.1s ease",
          outline: "none",
        }}
      >
        <img
          src={phoneIcon}
          alt="phone"
          style={{
            width: isMobile ? 62 : 100,
            height: isMobile ? 62 : 100,
            pointerEvents: "none",
          }}
        />
      </button>
    </>
  );
};

export default PhoneMobilePanel;
