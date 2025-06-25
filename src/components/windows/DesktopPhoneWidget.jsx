import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import phoneIcon from "../../assets/phone-icon.png";
import useIsNarrowScreen from "../../hooks/useIsNarrowScreen";

const DesktopPhoneWidget = ({ isOpen, setIsOpen, setQuestioModalOpen }) => {
  const isNarrow = useIsNarrowScreen(1328);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "9%",
        right: "10%",
        transform: "none",
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ width: 100 }}
        animate={{ width: isOpen ? "auto" : 100 }}
        transition={{ duration: 0.25 }}
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          backgroundColor: "rgba(17, 17, 17, 0.85)",
          borderRadius: "50px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          overflow: "hidden",
          height: "100px",
        }}
      >
        {/* Кнопка-трубка */}
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
            width: 100,
            height: 100,
            background: "#f2cb05",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            userSelect: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={phoneIcon}
            alt="phone"
            style={{ width: 90, height: 90, pointerEvents: "none" }}
          />
        </button>

        {/* Панель с кнопками */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "0 24px 0 32px",
              }}
            >
              <button
                style={{
                  background: "#f2cb05",
                  border: "none",
                  padding: "16px 28px",
                  borderRadius: "36px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  minWidth: "200px", // <-- ключевая строчка
                }}
                onClick={() => setQuestioModalOpen(true)}
              >
                ЗАКАЗАТЬ ЗВОНОК
              </button>
              <button
                style={{
                  background: "#f2cb05",
                  border: "none",
                  padding: "16px 28px",
                  borderRadius: "36px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  cursor: "pointer",
                  minWidth: "230px",
                }}
              >
                ПОЗВОНИТЬ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DesktopPhoneWidget;
