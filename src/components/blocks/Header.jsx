import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo_white.png";

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  const navLinks = [
    { name: "Главная", href: scrollToHero },
    { name: "О нас", href: scrollToAbout },
    { name: "Услуги", href: scrollToServices },
    { name: "Портфолио", href: scrollToportfolio },
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
        backgroundColor: "#0a1a23",
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
            tabIndex={0}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              padding: "8px",

              border: "none",
              outline: "none",
              WebkitTapHighlightColor: "transparent", // 💥 это убивает синий прямоугольник
            }}
          >
            <div
              style={{
                width: "24px",
                height: "3px",
                backgroundColor: "#fff",
                margin: "3px 0",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "3px",
                backgroundColor: "#fff",
                margin: "3px 0",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "3px",
                backgroundColor: "#fff",
                margin: "3px 0",
              }}
            />
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
              onClick={item.href}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "block",
                marginBottom: "12px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
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
