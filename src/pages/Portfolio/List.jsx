import PortfolioCard from "../../components/portfolio/PortfolioCard";
import { projects } from "../../data/portfolio";

export default function PortfolioList() {
  return (
    <div style={{ background: "#0a1a26", color: "#fff", minHeight: "100vh" }}>
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 60px" }}
      >
        <h1 style={{ fontSize: 28, margin: "0 0 16px" }}>Наши работы</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {projects.map((p) => (
            <PortfolioCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
