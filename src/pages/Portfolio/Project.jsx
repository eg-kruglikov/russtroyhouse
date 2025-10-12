import { useParams } from "react-router-dom";
import { useEffect } from "react";

import PortfolioProject from "../../components/portfolio/PortfolioProject";
import { projects } from "../../data/portfolio";
import { ymHit } from "../../utils/metrika";

export default function PortfolioProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) return;

    // Фиксируем просмотр страницы портфолио
    ymHit(`/portfolio/${slug}`);
  }, [slug, project]);

  if (!project) return <div>Проект не найден</div>;

  return <PortfolioProject {...project} />;
}
