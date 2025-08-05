import React from "react";

const Desktop = () => {
  return (
    <div
      style={{
        backgroundColor: "#0a1a26", // твой тёмно-синий фон
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        paddingBottom: "80px",
      }}
    >
      {/* Hero секция */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
        }}
      >
        {/* ФОТО - добавь свою картинку */}
        <img
          src="/images/repair/cosmetic/hero.jpg"
          alt="Косметический ремонт"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "20px",
              color: "#fff",
              textShadow: "0 0 10px rgba(0,0,0,0.7)",
            }}
          >
            Косметический ремонт
          </h1>
          <button
            style={{
              backgroundColor: "#FFD700",
              border: "none",
              borderRadius: "30px",
              padding: "15px 40px",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Заказать
          </button>
        </div>
      </div>

      {/* Блок УТП */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          padding: "60px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* ФОТО */}
          <img
            src="/assets/cosmetic_utp.jpg"
            alt="УТП"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{ color: "#FFD700", fontSize: "32px", marginBottom: "20px" }}
          >
            Что входит в косметический ремонт?
          </h2>
          <ul style={{ fontSize: "20px", lineHeight: "1.8" }}>
            <li>Покраска стен и оклейка обоев</li>
            <li>Замена плинтусов, розеток и выключателей</li>
            <li>Косметический ремонт потолков</li>
            <li>Обновление дверей и фурнитуры</li>
          </ul>
        </div>
      </div>

      {/* Галерея работ */}
      <div style={{ padding: "0 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: "32px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Примеры работ
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {/* ФОТО - добавь свои картинки */}
          <img
            src="/assets/cosmetic_example1.jpg"
            alt="Пример ремонта 1"
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <img
            src="/assets/cosmetic_example2.jpg"
            alt="Пример ремонта 2"
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <img
            src="/assets/cosmetic_example3.jpg"
            alt="Пример ремонта 3"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
      </div>

      {/* CTA - Заказать звонок */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <button
          style={{
            backgroundColor: "#FFD700",
            color: "#0a1a26",
            border: "none",
            borderRadius: "30px",
            padding: "15px 50px",
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
