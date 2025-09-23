// src/components/portfolio/PortfolioProject.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigationType } from "react-router-dom";
import { useNavigateWithMetrika } from "../../hooks/useNavigateWithMetrika";

export default function PortfolioProject(props) {
  const {
    title = "Проект",
    subtitle = "",
    meta = {}, // { area, type, duration, budget }
    description = [], // массив абзацев
    scope = [], // массив пунктов работ
    images = [], // [hero, ...gallery]
  } = props;

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const hero = images?.[0];
  const gallery = useMemo(() => images.slice(1), [images]);

  const navigate = useNavigateWithMetrika();

  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [navType]);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: isMobile ? "16px" : "24px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: isMobile ? "7vw" : 36,
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>

        {subtitle ? (
          <div
            style={{
              marginTop: 6,
              color: "rgba(255,255,255,.9)",
              fontSize: isMobile ? "4vw" : 18,
            }}
          >
            {subtitle}
          </div>
        ) : null}

        {/* Hero */}
        <div
          style={{
            marginTop: isMobile ? 14 : 18,
            borderRadius: 14,
            overflow: "hidden",
            background: "#0f2431",
            boxShadow: "0 10px 28px rgba(0,0,0,.25)",
          }}
        >
          <img
            src={hero}
            alt={title}
            style={{
              display: "block",
              width: "100%",
              height: isMobile ? 220 : 460,
              objectFit: "cover",
            }}
          />
        </div>

        {/* Метаданные */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: isMobile ? 14 : 18,
          }}
        >
          {meta?.area ? <Chip label={`Площадь: ${meta.area}`} /> : null}
          {meta?.type ? <Chip label={`Тип: ${meta.type}`} /> : null}
          {meta?.duration ? <Chip label={`Срок: ${meta.duration}`} /> : null}
          {meta?.budget ? <Chip label={`Бюджет: ${meta.budget}`} /> : null}
        </div>

        {/* Описание */}
        {description?.length ? (
          <section style={{ marginTop: isMobile ? 18 : 24 }}>
            <SectionTitle isMobile={isMobile} title="Описание работ" />
            <div style={{ display: "grid", gap: 10 }}>
              {description.map((p, i) => (
                <p
                  key={i}
                  style={{
                    margin: 0,
                    color: "rgba(255,255,255,.95)",
                    fontSize: isMobile ? "4.2vw" : 18,
                    lineHeight: 1.6,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ) : null}

        {/* Объём работ */}
        {scope?.length ? (
          <section style={{ marginTop: isMobile ? 18 : 24 }}>
            <SectionTitle isMobile={isMobile} title="Что было сделано" />
            <ul
              style={{
                margin: 0,
                paddingLeft: isMobile ? 18 : 22,
                display: "grid",
                gap: 8,
              }}
            >
              {scope.map((s, i) => (
                <li
                  key={i}
                  style={{
                    color: "rgba(255,255,255,.95)",
                    fontSize: isMobile ? "4.2vw" : 18,
                    lineHeight: 1.5,
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Галерея — ИСПРАВЛЕНО: 1 колонка на мобиле, 2 — на десктопе */}
        {gallery?.length ? (
          <section style={{ marginTop: isMobile ? 18 : 28, marginBottom: 32 }}>
            <SectionTitle isMobile={isMobile} title="Фотографии проекта" />
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
            >
              {gallery.map((src, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#0f2431",
                  }}
                >
                  <img
                    src={src}
                    alt={`${title} — фото ${i + 2}`}
                    style={{
                      display: "block",
                      width: "100%",
                      height: isMobile ? 220 : 260,
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* CTA */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <button
            onClick={() => navigate("/contacts")}
            style={{
              backgroundColor: "#FFD700",
              color: "#0a1a26",
              border: "none",
              borderRadius: 999,
              padding: isMobile ? "12px 22px" : "14px 26px",
              fontSize: isMobile ? 16 : 18,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Получить консультацию
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, isMobile }) {
  return (
    <h2
      style={{
        margin: 0,
        marginBottom: isMobile ? 10 : 12,
        color: "#FFD700",
        fontSize: isMobile ? "5vw" : 22,
        fontWeight: 800,
        letterSpacing: 0.2,
      }}
    >
      {title}
    </h2>
  );
}

function Chip({ label }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "rgba(255,255,255,.1)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,.2)",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 14,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
