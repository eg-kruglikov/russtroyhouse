import React, { useState } from "react";
import { usePressEffect } from "../../hooks/useSomething";
import { ymGoal } from "../../utils/metrika";

const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
];

const CallbackForm = ({ isMobile, source = "site" }) => {
  const press = usePressEffect();
  const [callbackTime, setCallbackTime] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("+7");
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [callbackError, setCallbackError] = useState("");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const handleCallbackPhoneChange = (e) => {
    let value = e.target.value;

    // Гарантируем, что номер начинается с +7
    if (!value.startsWith("+7")) return;

    // Удаляем все символы кроме цифр (оставляя префикс +7)
    const digits = value.replace(/[^\d]/g, "").slice(1); // всё после +7

    const formatted = `+7${digits}`;
    setCallbackPhone(formatted);

    if (digits.length !== 10) {
      setCallbackError("Введите корректный номер телефона");
    } else {
      setCallbackError("");
    }
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();

    if (!callbackTime) {
      setCallbackError("Выберите время для звонка");
      return;
    }

    if (callbackPhone.length !== 12 || callbackError) {
      setCallbackError("Проверьте правильность номера");
      return;
    }

    const phoneDigitsOnly = callbackPhone.replace(/\D/g, "");
    if (phoneDigitsOnly.length < 10) {
      setCallbackError("Введите корректный номер телефона (минимум 10 цифр)");
      return;
    }

    setCallbackError("");
    setCallbackLoading(true);

    const token = import.meta.env.VITE_TELEGRAM_TOKEN;
    const chatIds = [
      import.meta.env.VITE_TELEGRAM_CHAT_ID_EGOR,
      import.meta.env.VITE_TELEGRAM_CHAT_ID_ANTON,
    ];
    const now = new Date().toLocaleString("ru-RU");
    const message = `📞 Новая заявка на обратный звонок с сайта (${source}):\n\n📱 Телефон: ${callbackPhone}\n⏰ Время для звонка: ${callbackTime}\n🕐 Время заявки: ${now}`;

    try {
      for (const id of chatIds) {
        if (id) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: id,
              text: message,
            }),
          });
        }
      }
      ymGoal("form_sent");
      setCallbackSubmitted(true);
      setCallbackPhone("+7");
      setCallbackTime("");
      setTimeout(() => {
        setCallbackSubmitted(false);
      }, 3000);
    } catch (err) {
      setCallbackError("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setCallbackLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: isMobile ? "24px 20px" : "32px 24px",
        boxSizing: "border-box",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(16, 21, 36, 0.95)",
      }}
    >
      <h3
        style={{
          color: "#FFD700",
          fontSize: isMobile ? 22 : 24,
          margin: "0 0 14px",
          fontWeight: 700,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        Получите точный расчет
      </h3>

      {callbackSubmitted ? (
        <p
          style={{
            color: "#FFD700",
            fontSize: 16,
            textAlign: "left",
            margin: 0,
          }}
        >
          Спасибо! Мы свяжемся с вами в указанное время.
        </p>
      ) : (
        <form
          onSubmit={handleCallbackSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Время для звонка
            <select
              value={callbackTime}
              onChange={(e) => setCallbackTime(e.target.value)}
              required
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                fontSize: 15,
                padding: "10px 14px",
                appearance: "none",
                cursor: "pointer",
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M1 1 L5 5 L9 1\' stroke=\'%23ffffff\' stroke-width=\'1.5\' stroke-linecap=\'round\' fill=\'none\'/%3E%3C/svg%3E")',
                backgroundPosition: "calc(100% - 16px) 50%",
                backgroundRepeat: "no-repeat",
                paddingRight: 36,
                boxSizing: "border-box",
              }}
            >
              <option value="" style={{ color: "#05060A" }}>
                Выберите время
              </option>
              {timeSlots.map((slot) => (
                <option
                  key={slot}
                  value={slot}
                  style={{ color: "#05060A" }}
                >
                  {slot}
                </option>
              ))}
            </select>
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Номер телефона
            <input
              type="tel"
              value={callbackPhone}
              onChange={handleCallbackPhoneChange}
              placeholder="+7 (___) ___-__-__"
              required
              style={{
                width: "100%",
                borderRadius: 8,
                border: callbackError
                  ? "1px solid #ff6b6b"
                  : "1px solid rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                fontSize: 15,
                padding: "10px 14px",
                boxSizing: "border-box",
              }}
            />
          </label>

          {callbackError && (
            <p
              style={{
                color: "#ff6b6b",
                fontSize: 13,
                margin: 0,
                textAlign: "left",
              }}
            >
              {callbackError}
            </p>
          )}

          <button
            {...press}
            type="submit"
            disabled={callbackLoading}
            style={{
              ...press.style,
              borderRadius: 8,
              border: "1px solid #FFD700",
              background: "transparent",
              color: "#fff",
              fontSize: 15,
              padding: "12px 18px",
              fontWeight: 700,
              cursor: callbackLoading ? "not-allowed" : "pointer",
              minHeight: 48,
              alignSelf: "flex-start",
              opacity: callbackLoading ? 0.5 : 1,
            }}
          >
            {callbackLoading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CallbackForm;

