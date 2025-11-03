// src/components/blocks/HomePortfolioGrid.jsx
import { useEffect, useState } from "react";
import { useNavigateWithMetrika } from "../../hooks/useNavigateWithMetrika";
import { FALLBACK_IMAGE } from "../../assets/fallbackImage";
import { handleImageError } from "../../utils/imageFallback";
import { usePressEffect } from "../../hooks/useSomething";

export default function HomePortfolioGrid({ items = [] }) {
  const [vw, setVw] = useState(() => window.innerWidth);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 768;
  const columns = isMobile ? 2 : vw < 1200 ? 2 : 3;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "0 20px" : "0 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: isMobile ? 8 : 20,
        }}
      >
        {items.slice(0, 6).map((p, i) => (
          <PortfolioCard
            key={p.slug || p.href || i}
            p={p}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}

function PortfolioCard({ p, isMobile }) {
  const navigate = useNavigateWithMetrika();
  const press = usePressEffect();

  const cover = p?.images?.[0] || FALLBACK_IMAGE;
  const chip = (p?.meta?.area || "").trim();

  // ссылка для кнопки
  const link =
    (p?.href && p.href.trim()) ||
    (p?.slug ? `/portfolio/${p.slug}` : "/portfolio");
  const isInternal = link.startsWith("/");

  const go = () => {
    if (isInternal) {
      navigate(link);
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      style={{
        display: "block",
        borderRadius: 16,
        overflow: "hidden",
        background: "#0f2431",
        boxShadow: "0 10px 28px rgba(0,0,0,.25)",
        transition: "transform .18s ease, box-shadow .18s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.25)";
      }}
    >
      <img
        src={cover}
        data-original-src={cover}
        alt={p?.title || "Проект"}
        loading="lazy"
        onError={handleImageError}
        style={{
          width: "100%",
          height: isMobile ? 120 : 260,
          objectFit: "cover",
          display: "block",
        }}
      />

      <div style={{ padding: isMobile ? 8 : 18 }}>
        <div>
          <div
            style={{
              fontSize: isMobile ? 14 : 22,
              lineHeight: 1.2,
              fontWeight: 800,
              marginBottom: isMobile ? 4 : 6,
              color: "#FFD700",
            }}
          >
            {(p?.title || "").replace(/—\s*\d+\s*м²/gi, "").trim() || "Проект"}
          </div>
          {(p?.area || p?.location) && (
            <div
              style={{
                fontSize: isMobile ? 12 : 15,
                color: "#FFD700",
                fontWeight: 400,
                marginBottom: isMobile ? 2 : 4,
                opacity: 0.8,
              }}
            >
              {[p?.area, p?.location].filter(Boolean).join(" • ")}
            </div>
          )}
        </div>

        {/* Кнопка — единственная интерактивщина */}
        <button
          {...press}
          type="button"
          onClick={go}
          style={{
            ...press.style,
            cursor: "pointer",
            width: "100%",
            marginTop: isMobile ? 8 : 14,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            textAlign: "left",
            background: "transparent",
            color: "#fff",
            borderRadius: 0,
            padding: isMobile ? "8px 0 0 0" : "12px 0 0 0",
            fontWeight: 700,
            fontSize: isMobile ? 14 : 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Подробнее</span>
          <span style={{ fontSize: isMobile ? 16 : 20 }}>→</span>
        </button>
      </div>
    </div>
  );
}
