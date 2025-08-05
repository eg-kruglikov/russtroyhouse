import React, { useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";

const Desktop = () => {
  const action = useNavigationType();

  useEffect(() => {
    if (action === "POP") {
      console.log("← Пользователь нажал Назад!");
    }
  }, [action]);
  console.log("-->");
  return (
    <div
      style={{
        backgroundColor: "#0a1a26", // тёмно-синий фон
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        paddingBottom: "60px",
      }}
    >
      {/* Hero секция */}
      <div style={{ position: "relative", width: "100%", height: "500px" }}>
        <img
          src="/images/repair/capital/hero.jpg"
          alt="Капитальный ремонт"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              color: "#fff",
              marginBottom: "20px",
              textShadow: "0 0 10px rgba(0,0,0,0.7)",
            }}
          >
            КАПИТАЛЬНЫЙ РЕМОНТ
          </h1>
          <p
            style={{
              fontSize: "20px",
              maxWidth: "400px",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
            Полная замена коммуникаций, выравнивание стен и полов,
            перепланировка и комплексная отделка. Всё под ключ.
          </p>
          <button
            style={{
              backgroundColor: "#FFD700",
              color: "#0a1a26",
              border: "none",
              borderRadius: "25px",
              padding: "14px 40px",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Заказать
          </button>
        </div>
      </div>

      {/* Секция "Что входит в ремонт" */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "80px 10%",
          gap: "60px",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src="/assets/desktop_capital_info.jpg"
            alt="План ремонта"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              color: "#FFD700",
              fontSize: "32px",
              marginBottom: "20px",
            }}
          >
            Что входит в капитальный ремонт?
          </h2>
          <ul
            style={{ fontSize: "20px", lineHeight: "1.8", paddingLeft: "20px" }}
          >
            <li>Замена всех коммуникаций: электрика, сантехника</li>
            <li>Перепланировка и усиление конструкций</li>
            <li>Выравнивание стен и стяжка полов</li>
            <li>Комплексная отделка под ключ</li>
          </ul>
        </div>
      </div>

      {/* Галерея работ */}
      <div style={{ padding: "0 10%" }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: "32px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Наши работы
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <img
            src="/assets/capital_example1.jpg"
            alt="Пример ремонта 1"
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <img
            src="/assets/capital_example2.jpg"
            alt="Пример ремонта 2"
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <img
            src="/assets/capital_example3.jpg"
            alt="Пример ремонта 3"
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <img
            src="/assets/capital_example4.jpg"
            alt="Пример ремонта 4"
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <img
            src="/assets/capital_example5.jpg"
            alt="Пример ремонта 5"
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <img
            src="/assets/capital_example6.jpg"
            alt="Пример ремонта 6"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <button
          style={{
            backgroundColor: "#FFD700",
            color: "#0a1a26",
            border: "none",
            borderRadius: "30px",
            padding: "16px 50px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Заказать звонок
        </button>
      </div>
    </div>
  );
};

export default Desktop;
