import React, { useMemo } from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { projects } from "../../../data/portfolio";
import { FALLBACK_IMAGE } from "../../../assets/fallbackImage";
import { handleImageError } from "../../../utils/imageFallback";
import { usePressEffect } from "../../../hooks/useSomething";

const DesignerRepairPageMobile = () => {
  const navigate = useNavigateWithMetrika();
  const press = usePressEffect();

  // берём только дизайнерские проекты и показываем первые 2
  const designerItems = useMemo(
    () => projects.filter((p) => p.meta?.type === "Дизайнерский").slice(0, 2),
    []
  );

  // утилиты-стили
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
    fontWeight: 800,
  };
  const ctaBtn = {
    display: "inline-block",
    marginTop: 12,
    padding: "12px 20px",
    border: "none",
    borderRadius: 999,
    background: "#FFD700",
    color: "#0a1a26",
    fontWeight: 800,
    fontSize: 16,
    boxShadow: "0 6px 16px rgba(255,215,0,.25)",
  };

  const PriceRow = ({ left, right }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: "clamp(8px, 2vw, 12px)",
        padding: "clamp(10px, 2.5vw, 14px) clamp(8px, 2vw, 10px)",
        borderBottom: "1px solid rgba(255,255,255,.12)",
      }}
    >
      <div
        style={{
          fontSize: "clamp(13px, 3.5vw, 16px)",
          lineHeight: 1.5,
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {left}
      </div>
      <div
        style={{
          color: "#FFD700",
          fontWeight: 900,
          fontSize: "clamp(13px, 3.5vw, 16px)",
          whiteSpace: "nowrap",
        }}
      >
        {right}
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{
          backgroundColor: "#0a1a26",
          color: "#fff",
          fontFamily: "'Arial', sans-serif",
          paddingTop: "60px",
          paddingBottom: 60,
        }}
      >
        {/* HERO — без кнопки, как просил */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 260,
            overflow: "hidden",
          }}
        >
          <img
            src="/images/repair/designer/hero.jpg"
            alt="Дизайнерский ремонт"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(.72)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#fff",
              padding: "0 10px",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(18px, 5.5vw, 26px)",
                fontWeight: 900,
                marginBottom: 6,
                letterSpacing: 0.8,
                textShadow: "0 0 10px rgba(0,0,0,.85)",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              ДИЗАЙНЕРСКИЙ РЕМОНТ
            </h1>
            <p
              style={{
                fontSize: 14,
                opacity: 0.95,
                textShadow: "0 0 8px rgba(0,0,0,.7)",
              }}
            >
              Авторская концепция • премиальные материалы • идеальная реализация
            </p>
          </div>
        </div>
        {/* PREMIUM блок: дорогой стиль */}
        <div
          style={{
            margin: "16px",
            padding: "22px 18px",
            borderRadius: 18,
            background:
              "radial-gradient(120% 120% at 0% 0%, rgba(255,215,0,.10) 0%, rgba(10,26,38,1) 55%)",
            boxShadow:
              "0 14px 40px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.04)",
          }}
        >
          {/* верхняя надпись — не кнопка */}
          <div
            style={{
              marginBottom: 12,
              color: "#FFD700",
              fontWeight: 700,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: ".5px",
            }}
          >
            Премиальная комплектация
          </div>

          {/* заголовок */}
          <h2
            style={{
              margin: "14px 0 8px",
              fontSize: 24,
              lineHeight: 1.25,
              fontWeight: 800,
              color: "#ffffff",
              textShadow: "0 2px 12px rgba(0,0,0,.35)",
            }}
          >
            Дизайн-проект + реализация{" "}
            <span style={{ color: "#FFD700" }}>«под ключ»</span>
          </h2>

          {/* краткий лид */}
          <p
            style={{
              color: "rgba(255,255,255,.95)",
              lineHeight: 1.7,
              marginBottom: 20,
              fontSize: 15,
            }}
          >
            🎨 Создадим интерьер вашей мечты с 3D-визуализацией. Увидите
            результат ещё до начала работ!
          </p>

          {/* Ключевые преимущества - крупными блоками */}
          <div
            style={{
              display: "grid",
              gap: 12,
              marginBottom: 20,
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
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <div
                    style={{ color: "#FFD700", fontWeight: 700, fontSize: 14 }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,.7)",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* единый призыв к действию — главная кнопка */}
          <button
            {...press}
            onClick={() => navigate("/contacts")}
            style={{
              ...press.style,
              width: "100%",
              padding: "18px 24px",
              border: "none",
              borderRadius: 16,
              background: "linear-gradient(135deg, #FFD700 0%, #FFC700 100%)",
              color: "#0a1a26",
              fontWeight: 900,
              fontSize: 17,
              letterSpacing: ".3px",
              boxShadow: "0 12px 32px rgba(255,215,0,.4)",
              cursor: "pointer",
            }}
          >
            🎁 Узнать стоимость своего проекта
          </button>

          {/* подстрока-бонус */}
          <div
            style={{
              textAlign: "center",
              color: "#FFD700",
              fontSize: 13,
              marginTop: 12,
              fontWeight: 700,
              background: "rgba(255,215,0,.1)",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            ✨ Выезд дизайнера бесплатно • Смета в подарок
          </div>
        </div>

        {/* Блок: Этапы дизайн-проекта (цены за м²) */}
        <div style={{ padding: 20 }}>
          {/* Блок о регионе работы */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <p
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 500,
                margin: 0,
                opacity: 0.9,
              }}
            >
              Мы работаем в Москве и Московской области
            </p>
          </div>

          <h3
            style={{
              color: "#FFD700",
              fontSize: "clamp(16px, 4.5vw, 20px)",
              marginBottom: 10,
              fontWeight: 800,
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            Этапы дизайн-проекта и ориентировочная стоимость
          </h3>

          <div
            style={{
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.03)",
              overflow: "hidden",
            }}
          >
            <PriceRow
              left="Обмерный план, ТЗ, планировочные решения"
              right="от 800 ₽/м²"
            />
            <PriceRow
              left="Мудборды, подбор стилистики и материалов"
              right="от 600 ₽/м²"
            />
            <PriceRow
              left="3D-визуализации основных помещений"
              right="от 900 ₽/м²"
            />
            <PriceRow
              left="Рабочая документация (чертежи, узлы, ведомости)"
              right="от 700 ₽/м²"
            />
            <PriceRow
              left="Авторский надзор (визиты, правки, контроль)"
              right="от 15 000 ₽/мес"
            />
            <PriceRow
              left="Комплектация (шоурумы, спецификации, поставки)"
              right="по запросу"
            />
          </div>

          <div
            style={{
              color: "rgba(255,255,255,.6)",
              fontSize: 12,
              marginTop: 8,
            }}
          >
            Итог зависит от площади и сложности. Точную смету и календарный план
            выдаём после брифа и обмеров.
          </div>
        </div>

        {/* Блок: Ремонт по дизайн-проекту (основные позиции) */}
        <div style={{ padding: 20 }}>
          <h3
            style={{
              color: "#FFD700",
              fontSize: 20,
              marginBottom: 10,
              fontWeight: 800,
            }}
          >
            Ремонт по дизайн-проекту (ориентировочно)
          </h3>

          <div
            style={{
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.03)",
              overflow: "hidden",
            }}
          >
            <PriceRow
              left="Подготовка: штукатурка/стяжка по маякам"
              right="от 650 ₽/м²"
            />
            <PriceRow
              left="Сложные потолочные решения, ниши, карнизы"
              right="по запросу"
            />
            <PriceRow
              left="Электрика под проект (световые сценарии)"
              right="от 950 ₽/точка"
            />
            <PriceRow
              left="Плиточные работы (форматы 60×120 и крупнее)"
              right="от 1 400 ₽/м²"
            />
            <PriceRow
              left="Покраска, декоративные покрытия, панели"
              right="от 750 ₽/м²"
            />
            <PriceRow
              left="Монтаж дверей, плинтусов, встроенной мебели"
              right="по запросу"
            />
          </div>
        </div>

        {/* Как мы работаем — под дизайнерский процесс */}
        <div style={{ padding: 20 }}>
          <h3
            style={{
              color: "#FFD700",
              fontSize: 20,
              marginBottom: 10,
              fontWeight: 800,
            }}
          >
            Как мы работаем
          </h3>
          <div style={{ display: "grid", rowGap: 16 }}>
            {[
              "Бриф и обмеры",
              "Планировки и концепция",
              "3D-визуализации и материалы",
              "Рабочие чертежи и смета",
              "Реализация и авторский надзор",
              "Сдача объекта и гарантия",
            ].map((t, i) => (
              <div
                key={t}
                style={{
                  display: "grid",
                  gridTemplateColumns: "28px 1fr",
                  columnGap: 10,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#FFD700",
                    color: "#0a1a26",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    fontSize: 14,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
        {/* УТП с кнопкой */}

        {/* Наши работы — динамически из portfolio.js */}
        <div style={{ padding: 20 }}>
          <h3
            style={{
              color: "#FFD700",
              fontSize: 20,
              marginBottom: 10,
              fontWeight: 800,
            }}
          >
            Наши работы — дизайнерский ремонт
          </h3>

          <div style={{ display: "grid", gap: 16 }}>
            {designerItems.map((p) => {
              const area = p.meta?.area || ""; // напр. "68 м²"

              return (
                <div
                  key={p.slug}
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#0f2431",
                    boxShadow: "0 10px 28px rgba(0,0,0,.25)",
                  }}
                >
                  <img
                    src={p.images?.[0] || FALLBACK_IMAGE}
                    data-original-src={p.images?.[0] || ""}
                    alt={p.title}
                    loading="lazy"
                    onError={handleImageError}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  {/* Инфо-строка: название + площадь */}
                  <div
                    style={{
                      padding: "14px 16px",
                      borderTop: "1px solid rgba(255,255,255,.08)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: 800,
                          lineHeight: 1.25,
                        }}
                      >
                        {
                          p.title.replace(
                            / — \d+\s*м²/i,
                            ""
                          ) /* на случай, если метраж уже в title */
                        }
                      </div>

                      {area && (
                        <span
                          style={{
                            flexShrink: 0,
                            background: "rgba(255,215,0,.12)",
                            color: "#FFD700",
                            border: "1px solid rgba(255,215,0,.35)",
                            borderRadius: 999,
                            padding: "6px 10px",
                            fontSize: 13,
                            fontWeight: 800,
                          }}
                        >
                          {area}
                        </span>
                      )}
                    </div>

                    {/* Локация/подзаголовок */}
                    {p.subtitle && (
                      <div
                        style={{
                          marginTop: 6,
                          color: "rgba(255,255,255,.75)",
                          fontSize: 14,
                          lineHeight: 1.4,
                        }}
                      >
                        {p.subtitle}
                      </div>
                    )}
                  </div>

                  {/* CTA — подняли выше и добавили нижний отступ */}
                  <div style={{ padding: "0 16px 16px" }}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/portfolio/${p.slug}`);
                      }}
                      href={`/portfolio/${p.slug}`}
                      style={{
                        color: "#FFD700",
                        fontSize: 16,
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        marginTop: "12px",
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
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* === Back to home === */}
        <div style={{ padding: 20 }}>
          <button
            {...press}
            onClick={() => navigate("/")}
            aria-label="На главную"
            style={{
              ...press.style,
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
    </>
  );
};

export default DesignerRepairPageMobile;
