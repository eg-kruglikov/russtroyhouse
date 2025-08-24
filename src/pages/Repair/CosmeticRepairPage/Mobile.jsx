import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../../../data/portfolio";

const Mobile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = () => console.log("⬅ Пользователь нажал Назад!");
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  // портфолио: берём только косметические и показываем первые 2
  const cosmeticItems = projects
    .filter((p) => p.meta?.type === "Косметический")
    .slice(0, 2);

  // прайс-лист (ориентиры "от")
  const priceItems = [
    {
      name: "Демонтаж старой отделки (обои/краска/плитка)",
      unit: "за м²",
      price: "от 590 ₽",
    },
    {
      name: "Шпатлевка и выравнивание стен под окраску",
      unit: "за м²",
      price: "от 650 ₽",
    },
    { name: "Покраска стен", unit: "за м²", price: "от 750 ₽" },
    {
      name: "Оклейка обоями (флизелин/винил)",
      unit: "за м²",
      price: "от 550 ₽",
    },
    { name: "Выравнивание потолка", unit: "за м²", price: "от 650 ₽" },
    { name: "Покраска потолка", unit: "за м²", price: "от 480 ₽" },
    { name: "Монтаж натяжного потолка", unit: "за м²", price: "от 700 ₽" },
    {
      name: "Укладка ламината/инженерной доски",
      unit: "за м²",
      price: "от 650 ₽",
    },
    { name: "Монтаж плинтуса (ПВХ/МДФ)", unit: "за п.м.", price: "от 190 ₽" },
    { name: "Замена розетки/выключателя", unit: "за точку", price: "от 350 ₽" },
    { name: "Монтаж светильника/спота", unit: "за шт.", price: "от 450 ₽" },
    {
      name: "Установка межкомнатной двери",
      unit: "за шт.",
      price: "от 3 500 ₽",
    },
    {
      name: "Силикон/герметизация примыканий",
      unit: "за п.м.",
      price: "от 120 ₽",
    },
    { name: "Сборка/установка мебели", unit: "за изделие", price: "от 900 ₽" },
    {
      name: "Клининговая уборка после ремонта",
      unit: "за м²",
      price: "от 80 ₽",
    },
  ];

  // стили (минимум, без внешних CSS)
  const cardWrap = {
    borderRadius: 18,
    overflow: "hidden",
    background: "#0f2431",
    boxShadow: "0 10px 28px rgba(0,0,0,.25)",
  };
  const imgStyle = {
    width: "100%",
    height: 200,
    objectFit: "cover",
    display: "block",
  };
  const titleBar = {
    background: "#0f2431",
    padding: "12px 16px",
    color: "#fff",
    fontSize: 18,
    fontWeight: 700,
  };
  const ctaBtn = {
    display: "inline-block",
    marginTop: 12,
    marginLeft: 16,
    marginBottom: 12,
    padding: "12px 20px",
    border: "none",
    borderRadius: 999,
    background: "#FFD700",
    color: "#0a1a26",
    fontWeight: 800,
    fontSize: 16,
    boxShadow: "0 6px 16px rgba(255,215,0,.25)",
    cursor: "pointer",
  };
  const contactBtn = {
    backgroundColor: "#FFD700",
    color: "#0a1a26",
    border: "none",
    borderRadius: 999,
    padding: "12px 22px",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(255,215,0,.25)",
  };
  const priceCard = {
    background: "#fff",
    color: "#0a1a26",
    borderRadius: 14,
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    border: "1px solid #e9eef2",
  };
  const priceName = { fontSize: 15, fontWeight: 700, lineHeight: 1.3 };
  const priceUnit = { fontSize: 12, color: "#66737f", marginTop: 2 };
  const priceTag = {
    background: "#0a1a26",
    color: "#fff",
    borderRadius: 999,
    padding: "8px 10px",
    fontWeight: 800,
    fontSize: 14,
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        paddingBottom: "60px",
      }}
    >
      {/* HERO */}
      <div style={{ position: "relative", width: "100%", height: "35vh" }}>
        <img
          src="/images/repair/cosmetic/hero.jpg"
          alt="Косметический ремонт"
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
              fontSize: 28,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 12,
              textShadow: "0 0 8px rgba(0,0,0,0.7)",
            }}
          >
            КОСМЕТИЧЕСКИЙ РЕМОНТ
          </h1>
        </div>
      </div>

      {/* === Как мы работаем (ровная колонка) === */}
      <div style={{ padding: "28px 20px" }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          Как мы работаем
        </h2>

        {/* настройки рейки/кружка */}
        {(() => {
          const rail = 36; // ширина левой колонки (рейки)
          const dot = 28; // диаметр жёлтого кружка

          const steps = [
            "Созвон и короткий бриф",
            "Смета и договор",
            "Ремонт",
            "Сдача объекта",
            "Счастливый заказчик",
          ];

          return (
            <div style={{ position: "relative" }}>
              {/* вертикальная линия-рейка (необязательно, но красиво) */}
              <div
                style={{
                  position: "absolute",
                  left: rail / 2, // строго по центру левой колонки
                  top: 6,
                  bottom: 6,
                  width: 2,
                  background: "rgba(255,215,0,.55)",
                  transform: "translateX(-1px)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ display: "grid", rowGap: 18 }}>
                {steps.map((text, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: `${rail}px 1fr`, // фикс. колонка под кружок + колонка под текст
                      alignItems: "center",
                      columnGap: 12,
                    }}
                  >
                    {/* ячейка под кружок — всегда одинаковой ширины */}
                    <div
                      style={{
                        width: rail,
                        height: dot, // высота строки подгоняется под кружок
                        display: "grid",
                        placeItems: "center", // кружок строго по центру колонки
                      }}
                    >
                      <div
                        style={{
                          width: dot,
                          height: dot,
                          borderRadius: "50%",
                          background: "#FFD700",
                          color: "#0a1a26",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 900,
                          fontSize: 14,
                          lineHeight: 1,
                        }}
                      >
                        {i + 1}
                      </div>
                    </div>

                    {/* текст шага */}
                    <div
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: 700,
                        lineHeight: 1.3,
                      }}
                    >
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Большое описание + состав косметического ремонта + цены */}
      <div style={{ padding: 20 }}>
        <h3 style={{ color: "#FFD700", fontSize: 22, margin: "18px 0 12px" }}>
          Что входит в состав работ
        </h3>

        <div style={{ display: "grid", gap: 10 }}>
          {[
            {
              name: "Демонтаж старой отделки (обои/краска/плитка)",
              price: "от 590 ₽/м²",
            },
            {
              name: "Подготовка поверхностей: шпатлевка, выравнивание",
              price: "от 650 ₽/м²",
            },
            {
              name: "Оклейка обоями или покраска стен и потолков",
              price: "от 550 ₽/м²",
            },
            {
              name: "Замена плинтусов, фурнитуры, розеток, выключателей",
              price: "от 350 ₽/точка",
            },
            {
              name: "Укладка ламината/инженерной доски, установка порогов",
              price: "от 650 ₽/м²",
            },
            {
              name: "Монтаж светильников/спотов, мелкие доработки",
              price: "от 450 ₽/шт.",
            },
            {
              name: "Уборка и вывоз строительного мусора",
              price: "от 80 ₽/м²",
            },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 4px",
                borderBottom: "1px solid rgba(255,255,255,.15)",
              }}
            >
              <div style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 500 }}>
                {row.name}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#FFD700",
                  whiteSpace: "nowrap",
                  marginLeft: 12,
                }}
              >
                {row.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* H1 + УТП + кнопка «Связаться» */}
      <div style={{ padding: 20 }}>
        <div
          style={{
            textAlign: "center",
            padding: "24px 16px",
            backgroundColor: "#0a1a26",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <h2
            style={{
              color: "#FFD700",
              fontSize: 22,
              marginBottom: 16,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Бесплатная смета с выездом специалиста!
          </h2>

          {/* Преимущества */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 20px 0",
              color: "#fff",
              fontSize: 16,
              lineHeight: "1.6",
              textAlign: "left",
              display: "inline-block",
            }}
          >
            <li>✔ Гарантия до 3 лет</li>
            <li>✔ Работаем строго по договору</li>
            <li>✔ Фотоотчёты каждый день</li>
          </ul>

          <button
            style={{
              backgroundColor: "#FFD700",
              color: "#0a1a26",
              border: "none",
              borderRadius: "30px",
              padding: "12px 32px",
              fontWeight: "bold",
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 6px 16px rgba(255,215,0,.35)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(255,215,0,.55)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(255,215,0,.35)")
            }
          >
            Связаться
          </button>
        </div>
      </div>

      {/* Портфолио (2 карточки как договаривались) */}
      <div style={{ padding: 20 }}>
        <h2
          style={{
            color: "#ffff",
            fontSize: 22,
            marginBottom: 12,
            fontWeight: 800,
            lineHeight: 1.15,
          }}
        >
          Наши работы — косметический ремонт
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
          {cosmeticItems.map((p) => (
            <div key={p.slug} style={cardWrap}>
              <img
                src={p.images?.[0] || "/images/placeholder.jpg"}
                alt={p.title}
                loading="lazy"
                style={imgStyle}
              />
              <div style={titleBar}>{p.title}</div>
              <button
                style={ctaBtn}
                onClick={() => navigate(`/portfolio/${p.slug}`)}
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* === Back to home === */}
      <div style={{ padding: 20 }}>
        <button
          onClick={() => navigate("/")}
          aria-label="На главную"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "14px 18px",
            background: "transparent",
            border: "2px solid #fff",
            color: "#fff",
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 16,
            boxShadow: "0 6px 16px rgba(0,0,0,.25)",
          }}
        >
          {/* стрелка слева */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ textTransform: "uppercase", letterSpacing: ".3px" }}>
            На главную
          </span>
        </button>
      </div>
    </div>
  );
};

export default Mobile;
