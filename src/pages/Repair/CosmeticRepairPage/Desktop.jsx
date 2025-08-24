import React from "react";
import { Link } from "react-router-dom";
import { projects } from "../../../data/portfolio"; // 🔹 добавили импорт

const Desktop = () => {
  const btn = {
    marginTop: 16,
    backgroundColor: "#FFD700",
    color: "#0a1a26",
    border: "none",
    borderRadius: 999,
    padding: "12px 22px",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 16,
  };

  const chip = {
    background: "rgba(255,215,0,.12)",
    color: "#FFD700",
    border: "1px solid rgba(255,215,0,.35)",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
  };

  // 🔹 берём первые два проекта косметического ремонта
  const cosmeticItems = projects
    .filter((p) => p.meta?.type === "Косметический")
    .slice(0, 2);

  return (
    <div
      style={{
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
        <img
          src="/images/repair/cosmetic/hero.jpg"
          alt="Косметический ремонт"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          flexWrap: "wrap",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "300px",
          }}
        >
          <h2
            style={{ color: "#FFD700", fontSize: "32px", marginBottom: "20px" }}
          >
            Бесплатная смета с выездом специалиста!
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              marginBottom: "20px",
            }}
          >
            Косметический ремонт — это способ быстро и недорого освежить дизайн
            вашей квартиры или дома, не затрагивая коммуникации, трубы,
            электрику и другие сложные системы. Мы обновим внешний вид
            помещений, сохранив их планировку, но придав им современный и
            ухоженный вид.
          </p>
          <ul
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              marginBottom: "20px",
            }}
          >
            <li>Покраска стен и оклейка обоев</li>
            <li>Замена плинтусов, розеток и выключателей</li>
            <li>Косметический ремонт потолков</li>
            <li>Обновление дверей и фурнитуры</li>
            <li>Установка и сборка новой мебели</li>
            <li>Мелкий ремонт и устранение дефектов отделки</li>
          </ul>
          <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
            Выезд мастера и составление сметы — бесплатно. Начинаем работы в
            течение 2–3 дней после согласования. Гарантия на все виды работ — до
            3 лет.
          </p>
        </div>
      </div>

      {/* Наши работы — динамически, 2 карточки (фото + заголовок) */}
      <div style={{ padding: "0 80px", maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: "32px",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Наши работы
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {cosmeticItems.map((p) => (
            <Link
              key={p.slug}
              to={`/portfolio/${p.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#0f2431",
                  boxShadow: "0 10px 28px rgba(0,0,0,.25)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={p.images?.[0] || "/images/placeholder.jpg"}
                  alt={p.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 320,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div style={{ padding: 16 }}>
                  <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
                    {p.title}
                  </div>
                  {/* Никаких подзаголовков/чипов — только фото + заголовок */}
                </div>
              </div>
            </Link>
          ))}
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
