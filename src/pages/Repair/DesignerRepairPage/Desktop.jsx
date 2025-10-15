// src/pages/RepairDesigner/Desktop.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { projects } from "../../../data/portfolio";
import { FALLBACK_IMAGE } from "../../../assets/fallbackImage";
import { handleImageError } from "../../../utils/imageFallback";
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
  const designerItems = projects
    .filter((p) => p.meta?.type === "Дизайнерский")
    .slice(0, 2);

  const steps = [
    "Бриф и обмеры",
    "Планировки и концепция",
    "3D-визуализации и материалы",
    "Рабочие чертежи и смета",
    "Реализация и авторский надзор",
    "Сдача объекта и гарантия",
  ];

  const pricesDesign = [
    {
      text: "Обмерный план, ТЗ, планировочные решения",
      price: "от 800 ₽/м²",
    },
    {
      text: "Мудборды, подбор стилистики и материалов",
      price: "от 600 ₽/м²",
    },
    { text: "3D-визуализации основных помещений", price: "от 900 ₽/м²" },
    {
      text: "Рабочая документация (чертежи, узлы, ведомости)",
      price: "от 700 ₽/м²",
    },
    {
      text: "Авторский надзор (визиты, правки, контроль)",
      price: "от 15 000 ₽/мес",
    },
    {
      text: "Комплектация (шоурумы, спецификации, поставки)",
      price: "по запросу",
    },
  ];

  const pricesBuild = [
    { text: "Подготовка: штукатурка/стяжка по маякам", price: "от 650 ₽/м²" },
    { text: "Сложные потолочные решения, ниши, карнизы", price: "по запросу" },
    {
      text: "Электрика под проект (световые сценарии)",
      price: "от 950 ₽/точка",
    },
    {
      text: "Плиточные работы (форматы 60×120 и крупнее)",
      price: "от 1 400 ₽/м²",
    },
    { text: "Покраска, декоративные покрытия, панели", price: "от 750 ₽/м²" },
    {
      text: "Монтаж дверей, плинтусов, встроенной мебели",
      price: "по запросу",
    },
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
          src="/images/repair/designer/hero.jpg"
          alt="Дизайнерский ремонт"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.8)",
          }}
        />
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
              textShadow: "0 0 14px rgba(0,0,0,.75)",
              fontWeight: 900,
              letterSpacing: 0.4,
            }}
          >
            Дизайнерский ремонт
          </h1>
          {/* без кнопки */}
        </div>
      </div>

      {/* ——— Премиальный оффер ——— */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255,215,0,.12) 0%, rgba(10,26,38,1) 45%, rgba(10,26,38,1) 55%, rgba(255,215,0,.08) 100%)",
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
          {/* Левая колонка */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,215,0,.12)",
                border: "1px solid rgba(255,215,0,.35)",
                color: "#FFD700",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: 0.3,
                marginBottom: 14,
                boxShadow: "0 6px 16px rgba(255,215,0,.18)",
              }}
            >
              Дизайн-проект + реализация «под ключ»
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
              Авторская концепция, премиальные материалы, идеальная реализация
            </h3>

            <p
              style={{
                margin: "0 0 24px",
                fontSize: 19,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.95)",
                maxWidth: 720,
              }}
            >
              🎨 Создадим интерьер вашей мечты с 3D-визуализацией. Увидите
              результат ещё до начала работ — никаких сюрпризов!
            </p>

            {/* Ключевые преимущества - компактными карточками */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
                marginTop: 24,
              }}
            >
              {[
                {
                  icon: "📐",
                  title: "3D-визуализация",
                  desc: "Покажем будущий интерьер",
                },
                {
                  icon: "🎯",
                  title: "Авторский надзор",
                  desc: "Контролируем каждый этап",
                },
                {
                  icon: "💎",
                  title: "Премиум-материалы",
                  desc: "Скидки у поставщиков",
                },
                {
                  icon: "⚡",
                  title: "Смарт-решения",
                  desc: "Умный дом и освещение",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,215,0,0.02))",
                    border: "1px solid rgba(255,215,0,.2)",
                    borderRadius: 12,
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        color: "#FFD700",
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,.7)",
                        fontSize: 14,
                        marginTop: 4,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка — карточка CTA */}
          <div
            style={{
              background: "#0a1a26",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 16px 48px rgba(0,0,0,.45)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #FFD700 0%, #FFC700 100%)",
                color: "#0a1a26",
                fontWeight: 900,
                fontSize: 14,
                padding: "10px 16px",
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(255,215,0,.4)",
                marginBottom: 18,
              }}
            >
              ✨ Бесплатный бонус
            </div>

            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              Узнайте стоимость вашего проекта
            </div>
            <div
              style={{
                color: "rgba(255,255,255,.9)",
                lineHeight: 1.8,
                marginBottom: 20,
                fontSize: 16,
              }}
            >
              Выезд дизайнера и расчёт сметы — бесплатно! Покажем портфолио,
              обсудим ваши идеи и составим план.
            </div>

            <div style={{ display: "grid", rowGap: 10, marginBottom: 18 }}>
              {[
                "Персональный дизайнер-куратор",
                "Чёткие спецификации и смета",
                "Фото/видео-отчёты по этапам",
              ].map((t) => (
                <div
                  key={t}
                  style={{ display: "flex", gap: 10, alignItems: "center" }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#FFD700",
                    }}
                  />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <button
              {...press}
              onClick={() => navigate("/contacts")}
              style={{
                ...press.style,
                background: "linear-gradient(135deg, #FFD700 0%, #FFC700 100%)",
                color: "#0a1a26",
                border: "none",
                borderRadius: 16,
                padding: "18px 32px",
                fontWeight: 900,
                fontSize: 18,
                cursor: "pointer",
                width: "100%",
                boxShadow: "0 16px 40px rgba(255,215,0,.4)",
              }}
            >
              🎁 Получить бесплатную консультацию
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
              <span>• 3D-подарок •</span>
              <span>• Авторский надзор •</span>
              <span>• Гарантия •</span>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Этапы ——— */}
      <Section style={{ paddingTop: 40 }}>
        <H2>Как мы работаем</H2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Левая колонка — таймлайн */}
          <div style={{ position: "relative", marginTop: 12 }}>
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

          {/* Правая колонка — блок цен (дизайн-проект) */}
          <div>
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

            <div
              style={{
                background: "#0a1a26",
                borderRadius: 16,
                padding: "24px 28px",
                boxShadow: "0 8px 28px rgba(0,0,0,.35)",
                border: "1px solid rgba(255,255,255,.06)",
                marginBottom: 24,
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
                Дизайн-проект (ориентировочно)
              </div>
              {pricesDesign.map((p) => (
                <PriceRow key={p.text} text={p.text} price={p.price} />
              ))}
            </div>

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
                Реализация по проекту (основные позиции)
              </div>
              {pricesBuild.map((p) => (
                <PriceRow key={p.text} text={p.text} price={p.price} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ——— Наши работы — 2 карточки (Дизайнерский) ——— */}
      <Section style={{ paddingTop: 10 }}>
        <H2 style={{ textAlign: "center" }}>
          Наши работы — дизайнерский ремонт
        </H2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {designerItems.map((p) => (
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
                  data-original-src={p.images?.[0] || ""}
                  alt={p.title}
                  loading="lazy"
                  onError={handleImageError}
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
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
