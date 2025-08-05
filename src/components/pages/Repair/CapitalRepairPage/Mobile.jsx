import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mobile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = () => {
      console.log("⬅ Пользователь нажал Назад!", window.history.state);
      // navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate]);
  console.log("-->");
  return (
    <div
      style={{
        backgroundColor: "#0a1a26", // Тёмно-синий фон
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        paddingBottom: "40px",
      }}
    >
      {/* Hero */}
      <div style={{ position: "relative", width: "100%", height: "240px" }}>
        <img
          src="/images/repair/capital/hero.jpg"
          alt="Капитальный ремонт"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderBottom: "3px solid #FFD700",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "90%",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "12px",
              textShadow: "0 0 8px rgba(0,0,0,0.7)",
            }}
          >
            КАПИТАЛЬНЫЙ РЕМОНТ
          </h1>
          <button
            style={{
              backgroundColor: "#FFD700",
              color: "#0a1a26",
              border: "none",
              borderRadius: "20px",
              padding: "10px 28px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Заказать
          </button>
        </div>
      </div>

      {/* Описание */}
      <div style={{ padding: "30px 20px" }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: "22px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          Что входит в капитальный ремонт?
        </h2>
        <ul
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            paddingLeft: "18px",
            marginBottom: "30px",
          }}
        >
          <li>Замена всех коммуникаций</li>
          <li>Перепланировка и усиление конструкций</li>
          <li>Выравнивание стен и полов</li>
          <li>Комплексная отделка под ключ</li>
        </ul>
      </div>

      {/* Галерея */}
      <div style={{ padding: "0 10px" }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: "22px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Наши работы
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {[
            "/assets/capital_example1.jpg",
            "/assets/capital_example2.jpg",
            "/assets/capital_example3.jpg",
            "/assets/capital_example4.jpg",
            "/assets/capital_example5.jpg",
            "/assets/capital_example6.jpg",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Пример ${i + 1}`}
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      </div>

      {/* Кнопка CTA */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          style={{
            backgroundColor: "#FFD700",
            color: "#0a1a26",
            border: "none",
            borderRadius: "25px",
            padding: "12px 36px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Заказать звонок
        </button>
      </div>
    </div>
  );
};

export default Mobile;
