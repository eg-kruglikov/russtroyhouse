import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo_white.png";
import { usePressEffect } from "../../hooks/useSomething";
import "../styles/header.css";
import { motion, AnimatePresence } from "framer-motion";

const METRIKA_ID = 101296472;

// безопасный вызов ym
function ymSafe(fn) {
  try {
    if (window && typeof window.ym === "function") fn(window.ym);
  } catch (_) {}
}

// отправляем notBounce один раз при первом реальном действии
const useNotBounceOnce = () => {
  const sentRef = useRef(false);
  return () => {
    if (sentRef.current) return;
    ymSafe((ym) => ym(METRIKA_ID, "notBounce"));
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
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const press = usePressEffect();
  const ensureNotBounce = useNotBounceOnce();

  // соответствие названий кнопок целям Метрики
  const goalsMap = {
    Главная: "nav_hero_click",
    "О нас": "nav_about_click",
    Услуги: "nav_services_click",
    Портфолио: "nav_portfolio_click",
    "Дизайн-проекты": "nav_design_click",
    Контакты: "nav_contacts_click",
  };

  // универсальный обработчик кликов по пунктам навигации
  const handleNavClick = (name, actionFn) => {
    ensureNotBounce();
    ymSafe((ym) => ym(METRIKA_ID, "reachGoal", goalsMap[name] || "nav_click"));
    actionFn?.();
  };

  // логотип → наверх (если нужно) + цель
  const handleLogoClick = () => {
    ensureNotBounce();
    ymSafe((ym) => ym(METRIKA_ID, "reachGoal", "nav_logo_click"));
    scrollToHero?.();
  };

  // открытие/закрытие бургера
  const changeStateBurger = () => {
    navigator.vibrate?.(30);
    setMenuOpen((prev) => {
      const next = !prev;
      ensureNotBounce();
      ymSafe((ym) =>
        ym(
          METRIKA_ID,
          "reachGoal",
          next ? "nav_burger_open" : "nav_burger_close"
        )
      );
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
        ymSafe((ym) => ym(METRIKA_ID, "reachGoal", "nav_burger_close_outside"));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const navLinks = [
    { name: "Главная", href: scrollToHero },
    { name: "О нас", href: scrollToAbout },
    { name: "Услуги", href: scrollToServices },
    { name: "Портфолио", href: scrollToportfolio },
    { name: "Дизайн-проекты", href: scrollToDesignProjects },
    { name: "Контакты", href: scrollToContacts },
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
          }}
          aria-label="На главную"
        >
          <img
            src={logo}
            alt="Логотип"
            style={{ height: isMobile ? "24px" : "37px" }}
          />
        </button>

        {/* Навигация — десктоп */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: "2vw" }}>
            {navLinks.map((item, i) => (
              <button
                {...press}
                onClick={() => handleNavClick(item.name, item.href)}
                key={i}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  color: colorTextHeader,
                  fontSize: "18px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textDecoration: "none",
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
                  ymSafe((ym) =>
                    ym(
                      METRIKA_ID,
                      "reachGoal",
                      goalsMap[item.name] || "nav_click"
                    )
                  );
                  item.href?.();
                  setMenuOpen(false);
                  navigator.vibrate?.(30);
                }}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "block",
                  marginBottom: "12px",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "20px",
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
