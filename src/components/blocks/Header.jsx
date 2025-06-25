import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo_white.png";

import "../styles/header.css";

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

  const navLinks = [
    { name: "Главная", href: scrollToHero },
    { name: "О нас", href: scrollToAbout },
    { name: "Услуги", href: scrollToServices },
    { name: "Портфолио", href: scrollToportfolio },
    { name: "Контакты", href: scrollToContacts },
  ];
  const colorTextHeader = "#cdcdcd";

  const changeStateBurger = (e) => {
    e.stopPropagation();
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
      {isMobile && menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: "70px",
            right: "5.6vw",
            backgroundColor: "#1c1c1c",
            borderRadius: "12px",
            padding: "16px 24px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
            zIndex: 1001,
          }}
        >
          {navLinks.map((item, i) => (
            <button
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
                fontSize: "16px",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
