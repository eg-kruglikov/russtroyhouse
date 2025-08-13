import React from "react";
import { Link } from "react-router-dom";

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
          flexWrap: "wrap",
          backgroundColor: "#0B1C26",
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
            style={{
              color: "#FFD700",
              fontSize: "32px",
              marginBottom: "20px",
            }}
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

      {/* Галерея работ */}
      {/* Наши работы */}
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
          {/* Карточка 1 */}
          <div
            style={{
              position: "relative",
              borderRadius: 14,
              overflow: "hidden",
              background: "#0f2431",
              boxShadow: "0 10px 28px rgba(0,0,0,.25)",
            }}
          >
            <img
              src="/images/photolibrary/portfolio/cosmetic/1/1.jpg"
              alt="Косметический ремонт 60 м²"
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
                Косметический ремонт — 60 м²
              </div>
              <div style={{ color: "rgba(255,255,255,.85)", marginTop: 6 }}>
                Мытищи, ЖК Лесной Городок • срок 18 дней
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 12,
                  flexWrap: "wrap",
                }}
              >
                <span style={chip}>без пыли</span>
                <span style={chip}>окраска/обои</span>
                <span style={chip}>замена плинтусов</span>
              </div>

              <Link to="/works/cosmetic-60" style={{ textDecoration: "none" }}>
                <button style={btn}>Подробнее</button>
              </Link>
            </div>
          </div>

          {/* Карточка 2 */}
          <div
            style={{
              position: "relative",
              borderRadius: 14,
              overflow: "hidden",
              background: "#0f2431",
              boxShadow: "0 10px 28px rgba(0,0,0,.25)",
            }}
          >
            <img
              src="/images/photolibrary/portfolio/cosmetic/2/1.jpg"
              alt="Капитальный ремонт 75 м²"
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
                Капитальный ремонт — 75 м²
              </div>
              <div style={{ color: "rgba(255,255,255,.85)", marginTop: 6 }}>
                Королёв, монолит-кирпич • перепланировка
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 12,
                  flexWrap: "wrap",
                }}
              >
                <span style={chip}>новая электрика</span>
                <span style={chip}>замена труб</span>
                <span style={chip}>стяжка/штукатурка</span>
              </div>

              <Link to="/works/capital-75" style={{ textDecoration: "none" }}>
                <button style={btn}>Подробнее</button>
              </Link>
            </div>
          </div>
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
