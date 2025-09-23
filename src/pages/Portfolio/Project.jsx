import { useParams } from "react-router-dom";
import { useEffect } from "react";

import PortfolioProject from "../../components/portfolio/PortfolioProject";
import { projects } from "../../data/portfolio";

const METRIKA_ID = 101296472;

export default function PortfolioProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) return;

    try {
      if (window?.ym) {
        const url = `/portfolio/${slug}`;
        // фиксируем просмотр страницы
        window.ym(METRIKA_ID, "hit", url);
        // отдельная цель для аналитики
      }
    } catch (e) {
      console.warn("Metrika error:", e);
    }
  }, [slug, project]);

  if (!project) return <div>Проект не найден</div>;

  return <PortfolioProject {...project} />;
}
