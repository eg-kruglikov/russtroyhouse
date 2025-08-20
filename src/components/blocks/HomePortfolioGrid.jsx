// src/components/blocks/HomePortfolioGrid.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* -------- utils -------- */

// страхуемся, если где-то .JPG вместо .jpg
function jpgCandidates(src) {
  if (!src) return [];
  const upper = src.replace(/\.jpg$/i, ".JPG");
  return src === upper ? [src] : [src, upper];
}

function SmartImg({ srcs = [], alt = "", style }) {
  const [idx, setIdx] = useState(0);
  return (
    <img
      src={srcs[idx] || ""}
      alt={alt}
      style={style}
      onError={() => {
        if (idx < srcs.length - 1) setIdx(idx + 1);
      }}
    />
  );
}

/* -------- component -------- */

export default function HomePortfolioGrid({ items = [], onTileClick }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [vw, setVw] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setVw(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const columns = isMobile ? 1 : vw < 1100 ? 2 : 3;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "0 16px" : "0 24px", // симметричные поля
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: isMobile ? 12 : 16,
        }}
      >
        {items.slice(0, 6).map((item, i) => (
          <Tile
            key={i}
            title={item.title}
            cover={item.images?.[0]}
            href={item.href}
            onClick={() => onTileClick?.(item, i)}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}

/* -------- tile -------- */

function Tile({ title, cover, href, onClick, isMobile }) {
  const candidates = jpgCandidates(cover).length
    ? jpgCandidates(cover)
    : ["/images/photolibrary/placeholder.jpg"];

  const wrapperStyle = {
    display: "block",
    textDecoration: "none",
    color: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    background: "#0f2431",
    boxShadow: "0 10px 24px rgba(0,0,0,.25)",
    transition: "transform .25s ease, box-shadow .25s ease",
  };

  const hoverIn = (e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 14px 34px rgba(0,0,0,.35)";
  };
  const hoverOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,.25)";
  };

  const content = (
    <>
      {/* обложка */}
      <div style={{ width: "100%", height: isMobile ? 220 : 240 }}>
        <SmartImg
          srcs={candidates}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* подпись */}
      <div
        style={{
          padding: isMobile ? "10px 12px" : "12px 14px",
          borderTop: "1px solid rgba(255,255,255,.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: isMobile ? "4.6vw" : 18,
            color: "#fff",
          }}
        >
          {title}
        </div>
        <span
          style={{
            background: "#FFD700",
            color: "#0a1a26",
            borderRadius: 999,
            padding: "6px 10px",
            fontWeight: 800,
            fontSize: isMobile ? 12 : 13,
            whiteSpace: "nowrap",
          }}
        >
          Подробнее
        </span>
      </div>
    </>
  );

  // 1) Если нет href, но есть onClick — кнопка
  if (!href && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        style={{
          ...wrapperStyle,
          width: "100%",
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          textAlign: "inherit",
        }}
      >
        {content}
      </button>
    );
  }

  // 2) Внутренний переход (SPA)
  if (href && href.startsWith("/")) {
    return (
      <Link
        to={href}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        style={wrapperStyle}
      >
        {content}
      </Link>
    );
  }

  // 3) Внешняя ссылка (новая вкладка)
  return (
    <a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      style={wrapperStyle}
    >
      {content}
    </a>
  );
}
