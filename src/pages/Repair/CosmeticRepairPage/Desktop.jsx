import React from "react";

import { projects } from "../../../data/portfolio";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { Link } from "react-router-dom";
import { FALLBACK_IMAGE } from "../../../assets/fallbackImage";
import { usePressEffect } from "../../../hooks/useSomething";

const Desktop = () => {
  const navigate = useNavigateWithMetrika();
  const press = usePressEffect();

  // ——— helpers ———
  const Section = ({ children, style = {} }) => (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "60px 80px",
        ...style,
      }}
    >
      {children}
    </div>
  );

  const H2 = ({ children, style = {} }) => (
    <h2
      style={{
        color: "#FFD700",
        fontSize: 36,
        marginBottom: 24,
        fontWeight: 800,
        lineHeight: 1.15,
        ...style,
      }}
    >
      {children}
    </h2>
  );

  const PriceRow = ({ text, price }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 24,
        padding: "18px 0",
        borderBottom: "1px solid rgba(255,255,255,.12)",
      }}
    >
      <div style={{ fontSize: 20, lineHeight: 1.6 }}>{text}</div>
      <div style={{ color: "#FFD700", fontWeight: 800, fontSize: 20 }}>
        {price}
      </div>
    </div>
  );

  const Chip = ({ children }) => (
    <span
      style={{
        display: "inline-block",
        background: "rgba(255,215,0,.12)",
        color: "#FFD700",
        border: "1px solid rgba(255,215,0,.35)",
        padding: "8px 12px",
        borderRadius: 999,
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );

  // ——— данные ———
  const cosmeticItems = projects
    .filter((p) => p.meta?.type === "Косметический")
    .slice(0, 2);

  const steps = [
    "Созвон и короткий бриф",
    "Смета и договор",
    "Ремонт",
    "Сдача объекта",
    "Счастливый заказчик",
  ];

  const prices = [
    {
      text: "Демонтаж старой отделки (обои/краска/плитка)",
      price: "от 590 ₽/м²",
    },
    {
      text: "Подготовка поверхностей: шпаклёвка, выравнивание",
      price: "от 650 ₽/м²",
    },
    {
      text: "Оклейка обоями или покраска стен и потолков",
      price: "от 550 ₽/м²",
    },
    {
      text: "Замена плинтусов, фурнитуры, розеток, выключателей",
      price: "от 350 ₽/точка",
    },
    {
      text: "Укладка ламината/инженерной доски, установка порогов",
      price: "от 650 ₽/м²",
    },
    {
      text: "Монтаж светильников/спотов, мелкие доработки",
      price: "от 450 ₽/шт.",
    },
    { text: "Уборка и вывоз строительного мусора", price: "от 80 ₽/м²" },
  ];

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        paddingBottom: 80,
        background: "#06141d",
      }}
    >
      {/* ——— Hero ——— */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 520,
          overflow: "hidden",
          borderBottom: "3px solid #FFD700",
        }}
      >
        <img
          src="/images/repair/cosmetic/hero.jpg"
          alt="Косметический ремонт"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.95)",
          }}
        />

        {/* центр по X и Y */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              margin: 0,
              color: "#fff",
              textShadow: "0 0 12px rgba(0,0,0,.7)",
              fontWeight: 800,
              letterSpacing: 0.3,
            }}
          >
            Косметический ремонт
          </h1>
          {/* кнопку «Заказать» убрали по твоей просьбе */}
        </div>
      </div>

      {/* ——— Как мы работаем (две колонки) ——— */}
      <Section style={{ paddingTop: 50 }}>
        <H2>Как мы работаем</H2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* левая колонка — таймлайн */}
          <div style={{ position: "relative", marginTop: 12 }}>
            {/* вертикальная «рельса» */}
            <div
              style={{
                position: "absolute",
                left: 80,
                top: 4,
                bottom: 4,
                width: 2,
                background: "rgba(255,215,0,.55)",
                transform: "translateX(-1px)",
              }}
            />
            <div style={{ display: "grid", rowGap: 22 }}>
              {steps.map((t, i) => (
                <div
                  key={t}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr",
                    alignItems: "center",
                    columnGap: 20,
                  }}
                >
                  <div
                    style={{
                      width: 160,
                      height: 36,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "#FFD700",
                        color: "#0a1a26",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 900,
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* правая колонка — заполняем пустоту: преимущества + KPI */}
          <div>
            <div
              style={{
                background: "#0a1a26",
                borderRadius: 16,
                padding: "24px 28px",
                boxShadow: "0 8px 28px rgba(0,0,0,.35)",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              <div
                style={{
                  color: "#FFD700",
                  fontSize: 20,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                Что вы получаете
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  lineHeight: 1.8,
                  fontSize: 18,
                }}
              >
                <li>✔ Честная смета без скрытых платежей</li>
                <li>✔ Материалы на выбор: базовые/средний/премиум</li>
                <li>✔ Фотоотчёты каждый день</li>
                <li>✔ Работы по договору и графику</li>
              </ul>

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <Chip>Выезд за 24 часа</Chip>
                <Chip>Старт работ 2–3 дня</Chip>
                <Chip>Гарантия до 3 лет</Chip>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ——— Что входит в состав работ ——— */}
      <Section style={{ paddingTop: 20 }}>
        {/* Блок о регионе работы */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <p
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 500,
              margin: 0,
              opacity: 0.9,
            }}
          >
            Мы работаем в Москве и Московской области
          </p>
        </div>

        <H2>Что входит в состав работ</H2>
        <div>
          {prices.map((p) => (
            <PriceRow key={p.text} text={p.text} price={p.price} />
          ))}
        </div>
      </Section>

      {/* ——— УТП (контрастный блок-баннер) ——— */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255,215,0,.12) 0%, rgba(10,26,38,1) 40%, rgba(10,26,38,1) 60%, rgba(255,215,0,.08) 100%)",
          border: "1px solid rgba(255,215,0,.18)",
          borderRadius: 20,
          boxShadow:
            "0 30px 60px rgba(0,0,0,.45), inset 0 0 120px rgba(255,215,0,.06)",
          margin: 20,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "48px 56px",
            display: "grid",
            gridTemplateColumns: "1.25fr .95fr",
            gap: 36,
            alignItems: "center",
          }}
        >
          {/* Левая колонка — смысл и преимущества */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,.15)",
                border: "1px solid rgba(255,255,255,.3)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: 0.3,
                marginBottom: 14,
                boxShadow: "0 6px 16px rgba(0,0,0,.2)",
              }}
            >
              Бесплатный выезд • Бесплатная смета
            </div>

            <h3
              style={{
                margin: "6px 0 10px",
                fontSize: 36,
                lineHeight: 1.2,
                fontWeight: 900,
                color: "#fff",
                textShadow: "0 2px 14px rgba(0,0,0,.35)",
              }}
            >
              Честная смета с выездом специалиста
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.92)",
                maxWidth: 720,
              }}
            >
              Выезд и расчёт сметы — действительно бесплатно! Приедем в удобное
              время, замерим объём работ, поможем с выбором материалов. Никаких
              скрытых платежей и неожиданных доплат.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "12px 0 0",
                display: "grid",
                rowGap: 10,
                fontSize: 18,
                color: "#fff",
              }}
            >
              <li>✓ Гарантия до 3 лет на работы</li>
              <li>✓ Работа строго по договору и графику</li>
              <li>✓ Ежедневные фотоотчёты и связь в мессенджере</li>
            </ul>

            {/* Бейджи KPI */}
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 18,
              }}
            >
              {[
                "Выезд за 24 часа",
                "Старт работ 2–3 дня",
                "Фикс-смета",
                "Без аванса за материалы*",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-block",
                    background: "rgba(255,215,0,.12)",
                    color: "#FFD700",
                    border: "1px solid rgba(255,215,0,.35)",
                    padding: "8px 12px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: 12,
                marginTop: 6,
              }}
            >
              *по согласованию — при наличии клиентской дисконтной карты на
              закупку
            </div>
          </div>

          {/* Правая колонка — карточка-оффер */}
          <div
            style={{
              background: "#0a1a26",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 16px 48px rgba(0,0,0,.45)",
            }}
          >
            {/* «лента» гарантии */}
            <div
              style={{
                display: "inline-block",
                background:
                  "linear-gradient(90deg, rgba(255,215,0,1) 0%, rgba(255,215,0,.85) 100%)",
                color: "#0a1a26",
                fontWeight: 900,
                fontSize: 13,
                padding: "6px 12px",
                borderRadius: 10,
                boxShadow: "0 10px 22px rgba(255,215,0,.35)",
                marginBottom: 14,
              }}
            >
              Гарантия до 3 лет
            </div>

            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
              Зафиксируем смету и сроки
            </div>
            <div
              style={{
                color: "rgba(255,255,255,.85)",
                lineHeight: 1.7,
                marginBottom: 18,
              }}
            >
              Прозрачная смета без скрытых платежей. Материалы по прайсу
              поставщиков, наши скидки — ваши.
            </div>

            <div style={{ display: "grid", rowGap: 10, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#FFD700",
                  }}
                />
                <span>
                  Работаем официально: договор, смета, календарный план
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#FFD700",
                  }}
                />
                <span>Куратор проекта на связи 7 дней в неделю</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#FFD700",
                  }}
                />
                <span>Фото/видео-отчёты и чек-лист этапов работ</span>
              </div>
            </div>

            <button
              {...press}
              onClick={() => navigate("/contacts")}
              style={{
                ...press.style,
                backgroundColor: "#FFD700",
                color: "#0a1a26",
                border: "none",
                borderRadius: 30,
                padding: "14px 28px",
                fontWeight: 900,
                fontSize: 18,
                cursor: "pointer",
                width: "100%",
                boxShadow: "0 14px 30px rgba(255,215,0,.35)",
              }}
            >
              Связаться
            </button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 14,
                marginTop: 14,
                flexWrap: "wrap",
                color: "rgba(255,255,255,.7)",
                fontSize: 13,
              }}
            >
              <span>• Договор •</span>
              <span>• Фотоотчёты •</span>
              <span>• Гарантия •</span>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Наши работы — 2 карточки из portfolio.js ——— */}
      <Section style={{ paddingTop: 10 }}>
        <H2 style={{ textAlign: "center" }}>
          Наши работы — косметический ремонт
        </H2>

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
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#0f2431",
                  boxShadow: "0 10px 28px rgba(0,0,0,.25)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Картинка */}
                <img
                  src={p.images?.[0] || FALLBACK_IMAGE}
                  alt={p.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 340,
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Текстовый блок */}
                <div
                  style={{
                    padding: 18,
                    borderTop: "1px solid rgba(255,255,255,.08)",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Заголовок + бейдж площади */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: 800,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title.replace(/—.+/, "").trim()}
                    </div>
                    {p.meta?.area && (
                      <span
                        style={{
                          background: "rgba(255,215,0,.15)",
                          color: "#FFD700",
                          fontWeight: 800,
                          fontSize: 14,
                          padding: "4px 10px",
                          borderRadius: 12,
                          border: "1px solid rgba(255,215,0,.35)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.meta.area}
                      </span>
                    )}
                  </div>

                  {/* Адрес */}
                  {p.subtitle && (
                    <div
                      style={{
                        fontSize: 15,
                        color: "rgba(255,255,255,.8)",
                        marginBottom: 14,
                      }}
                    >
                      {p.subtitle}
                    </div>
                  )}

                  {/* Кнопка */}
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "12px",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFD700",
                        fontSize: 17,
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.gap = "12px";
                        e.currentTarget.style.opacity = "0.8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.gap = "8px";
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      Подробнее
                      <span style={{ fontSize: "20px" }}>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* === Back to home (Desktop) === */}
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <button
          {...press}
          onClick={() => navigate("/")}
          aria-label="На главную"
          style={{
            ...press.style,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: "16px 36px",
            background: "transparent",
            border: "2px solid #fff",
            color: "#fff",
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 18,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,.25)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#0a1a26";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#fff";
          }}
        >
          {/* стрелка */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ textTransform: "uppercase", letterSpacing: ".5px" }}>
            На главную
          </span>
        </button>
      </div>
    </div>
  );
};

export default Desktop;
