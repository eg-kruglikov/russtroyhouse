import { useParams, Navigate } from "react-router-dom";

import PortfolioProject from "../../components/portfolio/PortfolioProject";
import { projects } from "../../data/portfolio";

export default function PortfolioProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/portfolio" replace />;

  return <PortfolioProject {...project} />;
}
