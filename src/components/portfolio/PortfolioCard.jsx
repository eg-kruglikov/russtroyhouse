import { Link } from "react-router-dom";

export default function PortfolioCard({ project }) {
  const cover = project.images?.[0];
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        background: "#0f2431",
        boxShadow: "0 10px 28px rgba(0,0,0,.25)",
      }}
    >
      <img
        src={cover}
        alt={project.title}
        style={{
          width: "100%",
          height: 220,
          objectFit: "cover",
          display: "block",
        }}
      />
      <div style={{ padding: 14 }}>
        <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>
          {project.title}
        </div>
        {project.subtitle && (
          <div
            style={{
              color: "rgba(255,255,255,.85)",
              marginTop: 4,
              fontSize: 14,
            }}
          >
            {project.subtitle}
          </div>
        )}
        <Link
          to={`/portfolio/${project.slug}`}
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              marginTop: 12,
              background: "#FFD700",
              color: "#0a1a26",
              border: "none",
              borderRadius: 999,
              padding: "10px 18px",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Подробнее
          </button>
        </Link>
      </div>
    </div>
  );
}
