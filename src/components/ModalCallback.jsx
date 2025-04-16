import { useState } from "react";

const ModalCallback = ({ showModal, setShowModal }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      setError("Пожалуйста, введите корректное имя");
      return;
    }

    const phoneDigitsOnly = phone.replace(/\D/g, "");
    if (phoneDigitsOnly.length < 10) {
      setError("Введите корректный номер телефона (минимум 10 цифр)");
      return;
    }

    setError("");
    setLoading(true);

    const token = import.meta.env.VITE_TELEGRAM_TOKEN;
    const chatIds = [
      import.meta.env.VITE_TELEGRAM_CHAT_ID_EGOR,
      import.meta.env.VITE_TELEGRAM_CHAT_ID_ANTON,
    ];
    const now = new Date().toLocaleString("ru-RU");
    const message = `\u{1F4DE} Новая заявка с сайта:\n\n\u{1F464} Имя: ${name}\n\u{1F4F1} Телефон: ${phone}\n\u{1F4DD} Комментарий: ${
      comment || "—"
    }\n\u{23F0} Время: ${now}`;

    try {
      for (const id of chatIds) {
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
      setSubmitted(true);
      setName("");
      setPhone("");
      setComment("");
    } catch (err) {
      setError("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };
  return (
    showModal && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "400px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Обратный звонок
          </h2>

          {submitted ? (
            <p style={{ textAlign: "center", color: "green" }}>
              Заявка отправлена!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              />
              <textarea
                placeholder="Комментарий (интересует ремонт, стройка дома...)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  minHeight: "80px",
                }}
              />
              {error && (
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px 30px",
                  backgroundColor: loading ? "#aaa" : "#f97316",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                }}
              >
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </form>
          )}

          <button
            onClick={() => {
              setShowModal(false);
              setSubmitted(false);
            }}
            style={{
              marginTop: "20px",
              backgroundColor: "#eee",
              padding: "10px",
              fontSize: "14px",
              width: "100%",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    )
  );
};

export default ModalCallback;
