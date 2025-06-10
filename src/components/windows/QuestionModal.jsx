import React, { useState } from "react";

const QuestionModal = ({ isOpen, onClose, isMobile }) => {
  if (!isOpen) return null;

  const [phone, setPhone] = useState("+7");
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Гарантируем, что номер начинается с +7
    if (!value.startsWith("+7")) return;

    // Удаляем все символы кроме цифр (оставляя префикс +7)
    const digits = value.replace(/[^\d]/g, "").slice(1); // всё после +7

    const formatted = `+7${digits}`;
    setPhone(formatted);

    if (digits.length !== 10) {
      setError("Введите корректный номер телефона");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 12 || error) {
      alert("Проверьте правильность номера");
      return;
    }
    console.log("Данные отправлены:", { phone });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
        fontFamily: "sans-serif",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "250px" : "550px",
          backgroundColor: "#111",
          borderRadius: "24px",
          padding: "32px 24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          color: "#fff",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            fontSize: isMobile ? "13px" : "26px",
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: "500",
          }}
        >
          ПОМОЖЕМ РЕШИТЬ ВАШИ ВОПРОСЫ
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <input
            type="text"
            placeholder="ИМЯ"
            style={{
              backgroundColor: "#222",
              color: "#fff",
              padding: "14px 16px",
              border: "none",
              borderRadius: "14px",
              fontSize: "15px",
              width: isMobile ? "68.4%" : "68%",
              display: "block",
              marginLeft: isMobile ? "27px" : "70px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginLeft: isMobile ? "-10px" : "33px",
            }}
          >
            <img
              src="https://flagcdn.com/w40/ru.png"
              alt="RU"
              style={{ width: "24px", flexShrink: 0 }}
            />
            <div style={{ flexGrow: 1 }}>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                style={{
                  backgroundColor: "#222",
                  color: "#fff",
                  padding: "14px 16px",
                  border: error ? "1px solid red" : "none",
                  borderRadius: "14px",
                  fontSize: "15px",

                  width: isMobile ? "77%" : "78.3%",
                  display: "block",
                }}
              />
              {error && (
                <div
                  style={{
                    color: "red",
                    fontSize: "13px",
                    marginTop: "4px",
                    marginLeft: "4px",
                  }}
                >
                  {error}
                </div>
              )}
            </div>
          </div>

          <textarea
            placeholder="ВАШ ТЕКСТ"
            rows="4"
            style={{
              marginLeft: isMobile ? "27px" : "70px",
              backgroundColor: "#222",
              color: "#fff",
              padding: "14px 16px",
              border: "none",
              borderRadius: "14px",
              fontSize: "15px",
              width: isMobile ? "68.4%" : "68%",
              resize: "none",
            }}
          />

          <p
            style={{
              fontSize: "11px",
              color: "#888",
              textAlign: "center",
              marginTop: "6px",
              lineHeight: 1.5,
            }}
          >
            нажимая на кнопку, я соглашаюсь на{" "}
            <a href="#" style={linkStyle}>
              обработку персональных данных
            </a>{" "}
            и с{" "}
            <a href="#" style={linkStyle}>
              правилами пользования платформой
            </a>
          </p>

          <button
            type="submit"
            style={{
              marginTop: "12px",
              backgroundColor: "#f2cb05",
              border: "none",
              padding: "16px 24px",
              borderRadius: "36px",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              width: isMobile ? "150px" : "30%",
              color: "#000",
              marginLeft: isMobile ? "53px" : "190px",
            }}
          >
            ОТПРАВИТЬ
          </button>
        </form>
      </div>
    </div>
  );
};

const linkStyle = {
  color: "#aaa",
  textDecoration: "underline",
};

export default QuestionModal;
