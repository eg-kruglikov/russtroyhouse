import React, { useEffect } from "react";
import { FALLBACK_IMAGE } from "../../../assets/fallbackImage";
import { useNavigate } from "react-router-dom";
import { projects } from "../../../data/portfolio";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { usePressEffect } from "../../../hooks/useSomething";

const Mobile = () => {
  const navigate = useNavigateWithMetrika();
  const press = usePressEffect();

  useEffect(() => {
    const handleBack = () => {
      // лог только для отладки
      console.log("⬅ Пользователь нажал Назад!");
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  // берём только капитальные и показываем первые 2
  const capitalItems = projects
    .filter((p) => p.meta?.type === "Капитальный")
    .slice(0, 2);

  // ——— стили-утилиты ———
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
        gap: 12,
        padding: "14px 10px",
        borderBottom: "1px solid rgba(255,255,255,.12)",
      }}
    >
      <div style={{ fontSize: 16, lineHeight: 1.5 }}>{left}</div>
      <div style={{ color: "#FFD700", fontWeight: 800, fontSize: 16 }}>
        {right}
      </div>
    </div>
  );

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        paddingBottom: 60,
        background: "#0a1a26",
      }}
    >
      {/* Hero */}
      <div style={{ position: "relative", width: "100%", height: "35vh" }}>
        <img
          src="/images/repair/capital/hero.jpg"
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
              fontSize: 28,
              fontWeight: 900,
              color: "#fff",
              marginBottom: 10,
              textShadow: "0 0 8px rgba(0,0,0,.7)",
              letterSpacing: 0.2,
            }}
          >
            КАПИТАЛЬНЫЙ РЕМОНТ
          </h1>
        </div>
      </div>

      {/* УТП — сильнее, чем в косметическом */}
      <div style={{ padding: 20 }}>
        <div
          style={{
            background: "#0b1c26",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 10px 28px rgba(0,0,0,.35)",
          }}
        >
          <h2
            style={{
              color: "#FFD700",
              fontSize: 20,
              marginBottom: 10,
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            Капремонт «под ключ»: всё берём на себя
          </h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              rowGap: 8,
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            <li>
              ✔ Перепланировка с проектом и согласованием (при необходимости)
            </li>
            <li>✔ Новая электрика и сантехника «с нуля» по нормам</li>
            <li>✔ Стяжка полов, штукатурка по маякам, шумо- и гидроизоляция</li>
            <li>✔ Тёплые полы, вентиляция/радиаторы, подготовка под технику</li>
            <li>✔ Отделка санузлов «под ключ», плитка, аксессуары</li>
            <li>✔ Двери, плинтусы, фурнитура, установка кухни/мебели</li>
            <li>✔ Ежедневные фотоотчёты, ПТО/технадзор, договор и график</li>
          </ul>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            {[
              "Выезд за 24 часа",
              "Старт 2–3 дня",
              "Гарантия до 3 лет",
              "Фикс-смета",
            ].map((t) => (
              <span
                key={t}
                style={{
                  background: "rgba(255,215,0,.12)",
                  color: "#FFD700",
                  border: "1px solid rgba(255,215,0,.35)",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "32px 16px",
          background:
            "linear-gradient(145deg, rgba(255,215,0,0.15), rgba(10,26,38,0.95))",
          borderBottom: "1px solid rgba(255,215,0,.25)",
        }}
      >
        <h2
          style={{
            color: "#FFD700",
            fontSize: 22,
            marginBottom: 16,
            fontWeight: 800,
            lineHeight: 1.4,
          }}
        >
          Бесплатный выезд лучшего специалиста!
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,.85)",
            marginBottom: 20,
            maxWidth: 500,
            margin: "0 auto 20px",
          }}
        >
          Начните ремонт с чёткой концепции и визуализации. Мы покажем, как
          будет выглядеть ваш интерьер ещё до начала работ.
        </p>
        <button
          {...press}
          onClick={() => navigate("/contacts")}
          style={{
            ...press.style,
            backgroundColor: "#FFD700",
            color: "#0a1a26",
            border: "none",
            borderRadius: 30,
            padding: "12px 36px",
            fontWeight: 900,
            fontSize: 18,
            cursor: "pointer",
            boxShadow: "0 8px 22px rgba(255,215,0,.35)",
          }}
        >
          Связаться
        </button>
      </div>

      {/* Прайс-блок — под капитальный */}
      <div style={{ padding: 20 }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: 800,
          }}
        >
          Что входит в состав работ и ориентировочные цены
        </h2>

        <div
          style={{
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,.08)",
            background: "rgba(255,255,255,.03)",
            overflow: "hidden",
          }}
        >
          <PriceRow
            left="Демонтаж перегородок/покрытий, вынос мусора"
            right="от 350 ₽/м²"
          />
          <PriceRow
            left="Согласование перепланировки (при необходимости)"
            right="по запросу"
          />
          <PriceRow
            left="Штроба и новая электрика (проект+монтаж)"
            right="от 950 ₽/точка"
          />
          <PriceRow
            left="Разводка сантехники (ПП/медь), коллекторы, инсталяции"
            right="от 1 900 ₽/точка"
          />
          <PriceRow
            left="Стяжка пола по маякам (сухая/полусухая)"
            right="от 650 ₽/м²"
          />
          <PriceRow left="Штукатурка стен по маякам" right="от 650 ₽/м²" />
          <PriceRow
            left="Шумо/гидроизоляция (санузлы, мокрые зоны)"
            right="от 350 ₽/м²"
          />
          <PriceRow
            left="Тёплый пол (кабель/плёнка), подготовка под радиаторы"
            right="от 1 400 ₽/контур"
          />
          <PriceRow left="Плиточные работы (стены/пол)" right="от 1 200 ₽/м²" />
          <PriceRow
            left="Покраска/обои (после подготовки)"
            right="от 550 ₽/м²"
          />
          <PriceRow
            left="Монтаж дверей, плинтусов, фурнитуры"
            right="от 2 900 ₽/компл."
          />
          <PriceRow left="Комплекс «санузел под ключ»" right="по запросу" />
        </div>

        <div
          style={{ color: "rgba(255,255,255,.6)", fontSize: 12, marginTop: 8 }}
        >
          Цены ориентировочные и зависят от проекта, материалов и объёмов. Смету
          фиксируем после осмотра — без скрытых платежей.
        </div>
      </div>

      {/* Как мы работаем — компактный вертикальный таймлайн */}
      <div style={{ padding: 20 }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: 800,
          }}
        >
          Как мы работаем
        </h2>
        <div style={{ display: "grid", rowGap: 16 }}>
          {[
            "Созвон и короткий бриф",
            "Выезд, обмеры и смета",
            "Договор, график, закупки",
            "Черновые работы: демонтаж, инженерка, база",
            "Чистовые работы, санузлы, двери, фурнитура",
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

      {/* Наши работы — динамически */}
      <div style={{ padding: 20 }}>
        <h2
          style={{
            color: "#FFD700",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: 800,
          }}
        >
          Наши работы — капитальный ремонт
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
          {capitalItems.map((p) => {
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
                  alt={p.title}
                  loading="lazy"
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
                  <button
                    {...press}
                    style={{
                      ...press.style,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "12px 20px",
                      border: "none",
                      borderRadius: 999,
                      background: "#FFD700",
                      color: "#0a1a26",
                      fontWeight: 800,
                      fontSize: 16,
                      boxShadow: "0 6px 16px rgba(255,215,0,.25)",
                      cursor: "pointer",
                      width: "100%",
                      margin: "8px 0 10px", // ↑ меньше сверху, есть отступ снизу
                    }}
                    onClick={() => navigate(`/portfolio/${p.slug}`)}
                  >
                    Подробнее
                  </button>
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
  );
};

export default Mobile;
