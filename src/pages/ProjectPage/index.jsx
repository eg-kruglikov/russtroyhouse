import { useEffect, useState } from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const ProjectPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <Mobile /> : <Desktop />;
};

export default ProjectPage;
