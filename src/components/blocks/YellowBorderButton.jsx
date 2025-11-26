import React from "react";

/**
 * Кнопка с желтой рамкой в стиле WhiteboxCalculator
 * @param {Object} props
 * @param {React.ReactNode} props.children - Текст кнопки
 * @param {Function} props.onClick - Обработчик клика
 * @param {boolean} props.isMobile - Флаг мобильной версии
 * @param {boolean} props.disabled - Состояние disabled
 * @param {string} props.type - Тип кнопки (button, submit, reset)
 * @param {Object} props.style - Дополнительные стили
 */
const YellowBorderButton = ({
  children,
  onClick,
  isMobile = false,
  disabled = false,
  type = "button",
  style = {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: isMobile ? "10px 24px" : "12px 32px",
        fontSize: isMobile ? "16px" : "18px",
        fontWeight: "700",
        backgroundColor: "transparent",
        color: "#FFFFFF",
        border: "1.5px solid #FFD700",
        borderRadius: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.2s ease",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default YellowBorderButton;

