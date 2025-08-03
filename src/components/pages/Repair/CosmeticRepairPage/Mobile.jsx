import React from "react";

const Mobile = () => {
  return (
    <div
      style={{
        backgroundColor: "#0a1a26", // твой тёмно-синий фон
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        paddingBottom: "60px",
      }}
    >
      {/* Hero секция */}
      <div style={{ position: "relative" }}>
        {/* ФОТО - добавь свою картинку косметического ремонта */}
        <img
          src="/assets/mobile_cosmetic_hero.jpg"
          alt="Косметический ремонт"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "22px", marginBottom: "10px" }}>
            Косметический ремонт
          </h1>
          <button
            style={{
              backgroundColor: "#FFD700", // ярко-жёлтая кнопка
              border: "none",
              borderRadius: "25px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Заказать
          </button>
        </div>
      </div>

      {/* Блок УТП */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{ color: "#FFD700", fontSize: "20px", marginBottom: "10px" }}
        >
          Что входит в косметический ремонт?
        </h2>
        <ul style={{ fontSize: "16px", lineHeight: "1.6" }}>
          <li>Покраска и оклейка обоев</li>
          <li>Замена плинтусов и розеток</li>
          <li>Косметический ремонт потолков</li>
          <li>Обновление межкомнатных дверей</li>
        </ul>
      </div>

      {/* Галерея работ */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{ color: "#FFD700", fontSize: "20px", marginBottom: "15px" }}
        >
          Примеры работ
        </h2>
        <div style={{ display: "grid", gap: "15px" }}>
          {/* ФОТО - добавь свои картинки */}
          <img
            src="/assets/cosmetic_example1.jpg"
            alt="Пример ремонта 1"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <img
            src="/assets/cosmetic_example2.jpg"
            alt="Пример ремонта 2"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <img
            src="/assets/cosmetic_example3.jpg"
            alt="Пример ремонта 3"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      </div>

      {/* CTA - Заказать звонок */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          style={{
            backgroundColor: "#FFD700",
            color: "#0a1a26",
            border: "none",
            borderRadius: "25px",
            padding: "12px 30px",
            fontSize: "16px",
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
