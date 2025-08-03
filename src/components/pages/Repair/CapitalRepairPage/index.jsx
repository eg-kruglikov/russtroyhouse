import React, { useState, useEffect } from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const CapitalRepairPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? <Mobile /> : <Desktop />;
};

export default CapitalRepairPage;
