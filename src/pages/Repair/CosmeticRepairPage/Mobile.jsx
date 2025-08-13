import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mobile = () => {
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
  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = () => {
      console.log("⬅ Пользователь нажал Назад!");
      // например, редирект на главную
      // navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);
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

      <div style={{ position: "relative", width: "100%", height: "35vh" }}>
        <img
          src="/images/repair/cosmetic/hero.jpg"
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
            КОСМЕТИЧЕСКИЙ РЕМОНТ
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

      {/* Блок УТП */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#0B1C26",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{
            color: "#FFD700",
            fontSize: "20px",
            marginBottom: "12px",
            lineHeight: "1.3",
          }}
        >
          Бесплатная смета с выездом специалиста!
        </h2>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.5",
            marginBottom: "12px",
            color: "#fff",
          }}
        >
          Косметический ремонт — это быстрый способ освежить интерьер без
          глобальных работ и вмешательства в коммуникации. Обновим дизайн,
          сохранив планировку.
        </p>
        <ul
          style={{
            fontSize: "15px",
            lineHeight: "1.6",
            color: "#fff",
            paddingLeft: "18px",
          }}
        >
          <li>Покраска и оклейка обоев</li>
          <li>Замена плинтусов, розеток и выключателей</li>
          <li>Косметический ремонт потолков</li>
          <li>Обновление дверей и фурнитуры</li>
          <li>Установка и сборка новой мебели</li>
        </ul>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.5",
            marginTop: "12px",
            color: "#fff",
          }}
        >
          Начинаем работу через 2–3 дня после согласования. Гарантия до 3 лет.
        </p>
      </div>

      {/* Наши работы (мобилка) */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: "22px",
            marginBottom: "12px",
            fontWeight: 700,
          }}
        >
          Наши работы — косметический ремонт
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
          {/* Кейс 1 */}
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              background: "#0f2431",
              boxShadow: "0 8px 20px rgba(0,0,0,.25)",
            }}
          >
            <img
              src="/images/photolibrary/portfolio/cosmetic/1/1.jpg"
              alt="Косметический ремонт 60 м²"
              loading="lazy"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div style={{ padding: 12 }}>
              <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>
                Косметический ремонт — 60 м²
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,.85)",
                  marginTop: 4,
                  fontSize: 14,
                }}
              >
                Мытищи, ЖК «Лесной Городок» • срок 18 дней
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginTop: 8,
                }}
              >
                <span style={chip}>без пыли</span>
                <span style={chip}>окраска/обои</span>
                <span style={chip}>замена плинтусов</span>
              </div>

              <a href="/works/cosmetic-60" style={{ textDecoration: "none" }}>
                <button style={btn}>Подробнее</button>
              </a>
            </div>
          </div>

          {/* Кейс 2 */}
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              background: "#0f2431",
              boxShadow: "0 8px 20px rgba(0,0,0,.25)",
            }}
          >
            <img
              src="/images/photolibrary/portfolio/cosmetic/2/1.jpg"
              alt="Косметический ремонт 45 м²"
              loading="lazy"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div style={{ padding: 12 }}>
              <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>
                Косметический ремонт — 45 м²
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,.85)",
                  marginTop: 4,
                  fontSize: 14,
                }}
              >
                Пушкино, кирпичный дом • срок 14 дней
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginTop: 8,
                }}
              >
                <span style={chip}>обои</span>
                <span style={chip}>ламинат</span>
                <span style={chip}>санузел</span>
              </div>

              <a href="/works/cosmetic-45" style={{ textDecoration: "none" }}>
                <button style={btn}>Подробнее</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
