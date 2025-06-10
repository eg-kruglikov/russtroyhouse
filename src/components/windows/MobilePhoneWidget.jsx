import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import phoneIcon from "../../assets/phone-icon.png";

const PhoneMobilePanel = ({ isOpen, setIsOpen, setQuestioModalOpen }) => {
  return (
    <>
      {/* Кнопка трубки (всегда видна) */}
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          navigator.vibrate?.(50);
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
          bottom: "6svh",
          right: "34px",
          width: "70px",
          height: "70px",
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
        }}
      >
        <img
          src={phoneIcon}
          alt="phone"
          style={{
            width: 62,
            height: 62,
            pointerEvents: "none",
          }}
        />
      </button>

      {/* Панель — появляется только при isOpen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              bottom: "6svh",
              right: "88px", // отступ от трубки
              width: "200px",
              height: "160px",
              backgroundColor: "#111",
              borderRadius: "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              gap: "12px",
              zIndex: 1000,
              paddingRight: "38px",
              paddingLeft: "10px",
            }}
          >
            <button
              style={{
                background: "#f2cb05",
                border: "none",

                borderRadius: "28px",
                fontWeight: "bold",
                fontSize: "17px",
                height: "60px",
                width: "185px",
                whiteSpace: "nowrap",
              }}
              onClick={() => setQuestioModalOpen(true)}
            >
              ЗАКАЗАТЬ ЗВОНОК
            </button>
            <button
              style={{
                background: "#f2cb05",
                border: "none",

                borderRadius: "28px",
                fontWeight: "bold",
                fontSize: "17px",
                width: "185px",
                height: "60px",
                whiteSpace: "nowrap",
              }}
            >
              ПОЗВОНИТЬ
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhoneMobilePanel;
