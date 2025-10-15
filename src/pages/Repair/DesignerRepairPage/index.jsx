import React, { useState, useEffect } from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { useMetrikaActivity } from "../../../hooks/useMetrikaActivity";

const DesignerRepairPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Отслеживаем активность пользователя (скролл 75%, время на странице)
  useMetrikaActivity();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? <Mobile /> : <Desktop />;
};

export default DesignerRepairPage;
