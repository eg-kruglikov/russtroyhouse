import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { projects } from "../../../data/portfolio";
import { FALLBACK_IMAGE } from "../../../assets/fallbackImage";
import { usePressEffect } from "../../../hooks/useSomething";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { useMetrikaActivity } from "../../../hooks/useMetrikaActivity";
import { ymGoal } from "../../../utils/metrika";

// Конфиг под типы ремонта
const REPAIR_CONFIG = {
  cosmetic: {
    title: "КОСМЕТИЧЕСКИЙ РЕМОНТ",
    hero: "/images/repair/cosmetic/hero.jpg",
    typeLabel: "Косметический",
    h2: "Наши работы — косметический ремонт",
    uspTitle: "Бесплатная смета с выездом замерщика!",
    uspBullets: [
      "Покраска и оклейка обоев",
      "Замена плинтусов, розеток и выключателей",
      "Косметика потолков и освещение",
    ],
    uspLead:
      "Быстро освежим интерьер без вмешательства в коммуникации. Начинаем через 2–3 дня, гарантия до 3 лет.",
  },
  capital: {
    title: "КАПИТАЛЬНЫЙ РЕМОНТ",
    hero: "/images/repair/capital/hero.jpg",
    typeLabel: "Капитальный",
    h2: "Наши работы — капитальный ремонт",
    uspTitle: "Полная смета и график работ — бесплатно",
    uspBullets: [
      "Демонтаж, черновые работы",
      "Новая электрика и сантехника",
      "Стяжка, штукатурка, чистовая отделка",
    ],
    uspLead:
      "Делаем под ключ по договору: сроки, этапы, фотоотчёты. Гарантия до 3 лет.",
  },
  designer: {
    title: "ДИЗАЙНЕРСКИЙ РЕМОНТ",
    hero: "/images/repair/designer/hero.jpg",
    typeLabel: "Дизайнерский",
    h2: "Наши работы — дизайнерский ремонт",
    uspTitle: "Реализуем дизайн-проект под ключ",
    uspBullets: [
      "Точные сметы по спецификациям",
      "Авторский надзор и контроль качества",
      "Премиальные материалы и решения",
    ],
    uspLead: "Делаем как в проекте — по срокам и бюджету. Гарантия до 3 лет.",
  },
};

const styles = `
.repair-wrap{background:#0a1a26;color:#fff;font-family:Arial,sans-serif}
.repair-hero{position:relative;width:100%;height:35vh}
@media (min-width:1024px){.repair-hero{height:480px}}
.repair-hero img{width:100%;height:100%;object-fit:cover;border-bottom:3px solid #FFD700;filter:brightness(.9)}
.repair-hero__inner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;width:90%}
.repair-title{font-size:28px;font-weight:700;margin:0 0 12px;text-shadow:0 0 8px rgba(0,0,0,.7)}
@media (min-width:1024px){.repair-title{font-size:48px;margin-bottom:20px;text-shadow:0 0 12px rgba(0,0,0,.8)}}
.repair-btn{background:#FFD700;color:#0a1a26;border:none;border-radius:24px;padding:10px 28px;font-weight:800;font-size:16px;cursor:pointer}
@media (min-width:1024px){.repair-btn{border-radius:30px;padding:14px 40px;font-size:20px}}
.repair-usp{padding:20px;background:#0B1C26;border-radius:8px;margin:0 20px}
@media (min-width:1024px){.repair-usp{max-width:1200px;margin:40px auto;padding:40px 24px}}
.repair-usp h2{color:#FFD700;font-size:20px;margin:0 0 12px}
@media (min-width:1024px){.repair-usp h2{font-size:28px;margin-bottom:16px}}
.repair-usp p, .repair-usp li{font-size:15px;line-height:1.6}
.repair-grid{display:grid;gap:16px;margin:20px}
.repair-grid h2{color:#FFD700;font-size:22px;margin:0 0 12px;font-weight:700}
.cards{display:grid;gap:16px;grid-template-columns:1fr}
@media (min-width:768px){.cards{grid-template-columns:1fr 1fr}}
@media (min-width:1200px){.cards{grid-template-columns:1fr 1fr 1fr}}
.card{border-radius:12px;overflow:hidden;background:#0f2431;box-shadow:0 8px 20px rgba(0,0,0,.25)}
.card img{width:100%;height:200px;object-fit:cover;display:block}
.card__body{padding:12px}
.card__title{color:#fff;font-size:18px;font-weight:700}
.card__btn{margin-top:12px;background:#FFD700;color:#0a1a26;border:none;border-radius:999px;padding:12px 22px;font-weight:800;cursor:pointer;font-size:16px}
`;

export default function RepairPage() {
  const { type } = useParams();
  const cfg = REPAIR_CONFIG[type] ?? REPAIR_CONFIG.cosmetic;
  const navigateWithMetrika = useNavigateWithMetrika();
  const press = usePressEffect();

  useMetrikaActivity();

  const items = useMemo(
    () => projects.filter((p) => p.meta?.type === cfg.typeLabel),
    [cfg.typeLabel]
  );

  const handleConsultationClick = () => {
    ymGoal("repair_consult_click", { category: cfg.typeLabel });
    navigateWithMetrika("/", {
      scrollTo: "#contact",
      hash: "#contact",
    });
  };

  const handleProjectClick = (slug) => {
    if (!slug) return;
    ymGoal("repair_portfolio_click", { category: cfg.typeLabel, slug });
    navigateWithMetrika(`/portfolio/${slug}`);
  };

  return (
    <div className="repair-wrap">
      {/* локальные стили */}
      <style>{styles}</style>

      {/* HERO */}
      <div className="repair-hero">
        <img src={cfg.hero} alt={cfg.title} />
        <div className="repair-hero__inner">
          <h1 className="repair-title">{cfg.title}</h1>
          <button
            {...press}
            className="repair-btn"
            onClick={handleConsultationClick}
            style={press.style}
          >
            Получить консультацию
          </button>
        </div>
      </div>

      {/* УТП */}
      <section className="repair-usp">
        <h2>{cfg.uspTitle}</h2>
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {cfg.uspBullets.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <p style={{ marginTop: 12 }}>{cfg.uspLead}</p>
      </section>

      {/* Портфолио */}
      <section className="repair-grid">
        <h2>{cfg.h2}</h2>
        <div className="cards">
          {items.map((p) => (
            <div key={p.slug} className="card">
              <img
                src={p.images?.[0] || FALLBACK_IMAGE}
                alt={p.title}
                loading="lazy"
              />
              <div className="card__body">
                <div className="card__title">{p.title}</div>
                {/* Подзаголовок при желании:
                <div style={{color:"rgba(255,255,255,.85)", marginTop:4, fontSize:14}}>
                  {p.subtitle}
                </div>
                */}
                <button
                  {...press}
                  className="card__btn"
                  onClick={() => handleProjectClick(p.slug)}
                  style={press.style}
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
