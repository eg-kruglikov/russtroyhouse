import React, { useEffect, useRef, useState } from "react";
import { usePressEffect } from "../../hooks/useSomething";
import "../styles/header.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigateWithMetrika } from "../../hooks/useNavigateWithMetrika";
import { ymGoal, ymNotBounce } from "../../utils/metrika";

// отправляем notBounce один раз при первом реальном действии
const useNotBounceOnce = () => {
  const sentRef = useRef(false);
  return () => {
    if (sentRef.current) return;
    ymNotBounce();
    sentRef.current = true;
  };
};

const Header = ({
  isMobile,
  scrollToHero,
  scrollToAbout,
  scrollToServices,
  scrollToportfolio,
  scrollToContacts,
  scrollToDesignProjects,
  scrollToReviews,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const press = usePressEffect();
  const ensureNotBounce = useNotBounceOnce();
  const navigateWithMetrika = useNavigateWithMetrika();

  // Определяем широкий экран (>1100px)
  useEffect(() => {
    const checkWideScreen = () => setIsWideScreen(window.innerWidth > 1100);
    checkWideScreen();
    window.addEventListener("resize", checkWideScreen);
    return () => window.removeEventListener("resize", checkWideScreen);
  }, []);

  // соответствие названий кнопок целям Метрики
  const goalsMap = {
    Главная: "nav_hero_click",
    "Цены и услуги": "nav_services_click",
    Портфолио: "nav_portfolio_click",
    "Дизайн-проекты": "nav_design_click",
    Контакты: "nav_contacts_click",
  };

  // универсальный обработчик кликов по пунктам навигации
  const handleNavClick = (name, actionFn) => {
    ensureNotBounce();
    ymGoal(goalsMap[name] || "nav_click");
    actionFn?.();
  };

  // логотип → наверх (если нужно) + цель
  const handleLogoClick = () => {
    ensureNotBounce();
    ymGoal("nav_logo_click");
    scrollToHero?.();
  };

  // открытие/закрытие бургера
  const changeStateBurger = () => {
    navigator.vibrate?.(30);
    setMenuOpen((prev) => {
      const next = !prev;
      ensureNotBounce();
      ymGoal(next ? "nav_burger_open" : "nav_burger_close");
      return next;
    });
  };

  // клик вне мобильного меню — закрываем
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        // фиксируем закрытие по «вне клику»
        ymGoal("nav_burger_close_outside");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const navLinks = [
    { name: "Главная", href: scrollToHero },
    { name: "Цены и услуги", href: scrollToServices },
    { name: "Портфолио", href: scrollToportfolio },
    { name: "Дизайн-проекты", href: scrollToDesignProjects },
    { name: "Отзывы", href: scrollToReviews },
    { name: "Контакты", href: () => navigateWithMetrika("/contacts") },
  ];

  const colorTextHeader = "#cdcdcd";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "54px",
        backgroundColor: "#04141D",
        padding: "6px 0",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1060px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 auto",
          height: "100%",
          padding: "0 8vw",
        }}
      >
        {/* Логотип */}
        <button
          onClick={handleLogoClick}
          style={{
            all: "unset",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "12px" : "8px",
          }}
          aria-label="На главную"
        >
          <img
            src="/logo.png"
            alt="Логотип РуссУютСтрой"
            style={{
              width: "auto",
              height: "36px",
              borderRadius: "8px",
              display: "block",
              flexShrink: 0,
              objectFit: "contain",
            }}
          />
          {(isMobile || isWideScreen) && (
            <div
              style={{
                fontWeight: "900",
                fontSize: isMobile ? "16px" : "17px",
                color: "rgba(255,255,255,.9)",
                whiteSpace: "nowrap",
              }}
            >
              РуссУютСтрой
            </div>
          )}
        </button>

        {/* Навигация — десктоп */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: "1.2vw", flexWrap: "wrap" }}>
            {navLinks.map((item, i) => (
              <button
                {...press}
                onClick={() => handleNavClick(item.name, item.href)}
                key={i}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  color:
                    item.name === "Цены и услуги" ? "#FFB84D" : colorTextHeader,
                  fontSize: item.name === "Цены и услуги" ? "16px" : "15px",
                  fontWeight: item.name === "Цены и услуги" ? "700" : "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}

        {/* Бургер-иконка — мобилка */}
        {isMobile && (
          <div
            ref={burgerRef}
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={changeStateBurger}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") changeStateBurger();
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      {/* Мобильное выпадающее меню */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.05, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "70px",
              right: "20vw",
              left: "20vw",
              backgroundColor: "#04141D",
              borderRadius: "12px",
              padding: "16px 24px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
              zIndex: 1001,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {navLinks.map((item, i) => (
              <button
                {...press}
                key={i}
                onClick={() => {
                  ensureNotBounce();
                  ymGoal(goalsMap[item.name] || "nav_click");
                  item.href?.();
                  setMenuOpen(false);
                  navigator.vibrate?.(30);
                }}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "block",
                  marginBottom: "12px",
                  color: item.name === "Цены и услуги" ? "#FFB84D" : "#fff",
                  textDecoration: "none",
                  fontWeight: item.name === "Цены и услуги" ? "700" : "600",
                  fontSize: item.name === "Цены и услуги" ? "22px" : "20px",
                  WebkitTapHighlightColor: "transparent",
                  margin: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
