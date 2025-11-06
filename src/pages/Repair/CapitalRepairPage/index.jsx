import React, { useState, useEffect } from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { useMetrikaActivity } from "../../../hooks/useMetrikaActivity";
import { usePhoneIconContext } from "../../../contexts/PhoneIconContext";

const CapitalRepairPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { setIsScrolledToEnd } = usePhoneIconContext();

  // Отслеживаем активность пользователя (скролл 75%, время на странице)
  useMetrikaActivity();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Отслеживание скролла до конца страницы
  useEffect(() => {
    let hasReachedEnd = false;

    const handleScroll = () => {
      // Если уже достигли конца, больше не проверяем
      if (hasReachedEnd) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      // Проверяем, достиг ли пользователь конца страницы (с небольшой погрешностью)
      const isAtEnd = scrollBottom >= documentHeight - 50;
      
      if (isAtEnd && !hasReachedEnd) {
        hasReachedEnd = true;
        setIsScrolledToEnd(true);
      }
    };

    // Проверяем при монтировании
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      // Сбрасываем состояние при размонтировании
      setIsScrolledToEnd(false);
    };
  }, [setIsScrolledToEnd]);

  return isMobile ? <Mobile /> : <Desktop />;
};

export default CapitalRepairPage;
