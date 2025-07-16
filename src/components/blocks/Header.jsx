import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo_white.png";
import { usePressEffect } from "../../hooks/useSomething";
import "../styles/header.css";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({
  isMobile,
  scrollToHero,
  scrollToAbout,
  scrollToServices,
  scrollToportfolio,
  scrollToContacts,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const press = usePressEffect();

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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navLinks = [
    { name: "Главная", href: scrollToHero },
    { name: "О нас", href: scrollToAbout },
    { name: "Услуги", href: scrollToServices },
    { name: "Дизайн-проекты", href: scrollToportfolio },
    { name: "Контакты", href: scrollToContacts },
  ];
  const colorTextHeader = "#cdcdcd";

  const changeStateBurger = (e) => {
    navigator.vibrate?.(30);
    setMenuOpen((prev) => !prev);
  };

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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Логотип"
            style={{ height: isMobile ? "24px" : "37px" }}
          />
        </div>

        {/* Навигация — десктоп */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: "2vw" }}>
            {navLinks.map((item, i) => (
              <button
                {...press}
                onClick={item.href}
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
              right: "5vw",
              left: "5vw",
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
                  item.href(), setMenuOpen(false);
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
                  fontSize: "22px",
                  WebkitTapHighlightColor: "transparent",
                  margin: "10px",
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
