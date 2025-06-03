import React, { useEffect, useState } from "react";
import background from "./assets/background.jpg";
import logo from "./assets/logo_white.png";
import { useRef } from "react";
import FlowSlider from "./components/FlowSlider/FlowSlider";
import hero from "./assets/hero.png";
import phoneIcon from "./assets/phone-icon.png";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const navLinks = ["Главная", "О нас", "Портфолио", "Услуги", "Контакты"];

  const yellow = "#FFD700";
  const dark = "#486072";
  const light = "#ffffff";
  const colorTextHeader = "#cdcdcd";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1152px",
        margin: "0 auto",
      }}
    >
      <img
        src={hero}
        alt="РЕМОНТ НАЧИНАЕТСЯ ЗДЕСЬ"
        style={{
          width: "113%",
          maxWidth: "800px",
          height: "auto",
          position: "absolute",
          zIndex: 1,
          top: "61.4svh",
          left: "50.5%",
          transform: "translate(-50%, -52.6%)",
        }}
      />
      <img
        src={phoneIcon}
        alt="phoneIcon"
        style={{
          width: isMobile ? "60px" : "90px",
          height: "auto",
          position: "absolute",
          zIndex: 1,
          top: isMobile ? "88svh" : "79.6svh",
          left: isMobile ? "calc(92% - 7px)" : "92%",
          transform: "translateX(-50%)",
        }}
      />

      <button
        style={{
          position: "absolute",
          zIndex: 1,
          left: "50.5%",
          top: "85svh",
          transform: "translate(-50%, -52.6%)",
          backgroundColor: "#FFD700",
          color: "#000",
          fontWeight: "790",
          fontSize: "24px",
          padding: isMobile ? "16px 26px" : "26px 40px",
          border: "none",
          borderRadius: "40px",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
          transition: "transform 0.2s ease",
        }}
      >
        ЗАКАЗАТЬ
      </button>

      <div
        style={{
          fontFamily: "sans-serif",
          backgroundColor: dark,
          color: light,

          overflow: "hidden",

          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Шапка */}
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "54px",
            backgroundColor: "#486072",
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
              padding: "0 3vw",
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
              <nav style={{ display: "flex", gap: "32px" }}>
                {navLinks.map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{
                      color: colorTextHeader,
                      fontSize: "18px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textDecoration: "none",
                    }}
                  >
                    {item}
                  </a>
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
                <a
                  key={i}
                  href="#"
                  style={{
                    display: "block",
                    marginBottom: "12px",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Hero */}
        <section
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "30% center",
            // height: isMobile ? `${viewportHeight}px` : "100vh",
            height: "100svh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "80px",
            boxSizing: "border-box",

            margin: "0 auto",
            // marginTop: "-50px",

            overflow: "hidden",
            position: "relative",
          }}
        ></section>

        {/* Кто мы */}
        <section
          style={{
            backgroundColor: "#1c1c1c",

            textAlign: "center",

            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "-5px",
          }}
        >
          <div
            style={{
              marginRight: "auto",
              fontSize: "48px",
              marginBottom: "24px",
              color: "#486072",
              marginTop: "14px",
              fontWeight: 700,
            }}
          >
            КТО МЫ?
          </div>
          <p
            style={{
              maxWidth: "70%",
              margin: "0 auto",
              fontSize: "12px",
              fontWeight: 520,
              lineHeight: "200%",
              color: "rgba(255, 255, 255, 1)",
            }}
          >
            МЫ РАБОТАЕМ БОЛЕЕ 10 ЛЕТ И УСПЕЛИ РЕАЛИЗОВАТЬ СОТНИ ПРОЕКТОВ! ДЛЯ
            НАС РЕМОНТ — ЭТО НЕ ПРОСТО СТЕНЫ И ОБОИ, А КОМФОРТ И НАДЁЖНОСТЬ ДЛЯ
            ЖИЗНИ. <br />
            <br />
            ЗАКЛЮЧАЕМ ОФИЦИАЛЬНЫЙ ДОГОВОР С ЧЁТКИМИ СРОКАМИ, ФИКСИРОВАННОЙ
            СМЕТОЙ И ГАРАНТИЕЙ НА ВСЕ ВИДЫ РАБОТ ДО 3 ЛЕТ. <br />
            <br />
            МЫ НЕ ОБЕЩАЕМ «ЕВРОРЕМОНТ ЗА 3 ДНЯ», НО ТОЧНО СДЕЛАЕМ КРАСИВО,
            АККУРАТНО И БЕЗ НЕРВОВ. БОЛЬШИНСТВО КЛИЕНТОВ ПРИХОДЯТ ПО
            РЕКОМЕНДАЦИИ. <br />
            <br />
            ЕЖЕДНЕВНЫЕ ФОТООТЧЁТЫ В МЕССЕНДЖЕРЕ — ВЫ ВСЕГДА ЗНАЕТЕ, ЧТО
            ПРОИСХОДИТ НА ОБЪЕКТЕ.
          </p>
        </section>

        {/* контур интерера (картинка) */}

        <section
          style={{
            backgroundColor: "#000",
            padding: "80px 0px",
            textAlign: "center",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        ></section>

        {/* Наши услуги */}
        <section
          style={{
            backgroundColor: "#000",
            padding: "80px 0px",
            textAlign: "center",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <h2 style={{ fontSize: "28px", marginBottom: "40px", color: "#fff" }}>
            НАШИ УСЛУГИ
          </h2>
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "24px",
            }}
          >
            {[
              {
                title: "КОСМЕТИЧЕСКИЙ РЕМОНТ",
                text: "Лёгкое обновление – покраска, обои, замена покрытий, освежение интерьера.",
                number: 1,
              },
              {
                title: "КАПИТАЛЬНЫЙ РЕМОНТ",
                text: "Замена коммуникаций, выравнивание стен, перепланировка, демонтаж, полная замена электрики.",
                number: 2,
              },
              {
                title: "ДИЗАЙНЕРСКИЙ РЕМОНТ",
                text: "Уникальные интерьеры под ключ. Визуальные концепции и премиальные материалы. Зонирование кухни – гостиной.",
                number: 3,
              },
            ].map((item) => (
              <div
                key={item.number}
                style={{ textAlign: "left", color: "#fff" }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    marginBottom: "6px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#333",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    {item.number}
                  </span>
                  {item.title}
                </div>
                <p
                  style={{
                    color: "#ccc",
                    fontSize: "16px",
                    paddingLeft: "42px",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <button
            style={{
              marginTop: "40px",
              backgroundColor: yellow,
              color: "#000",
              padding: "12px 24px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ЗАКАЗАТЬ ЗВОНОК
          </button>
        </section>

        {/* Фото */}
        <section
          style={{
            backgroundColor: "#000",

            textAlign: "center",
            maxWidth: "1400px",
            margin: "0 auto",
            overflow: "visible",
          }}
        >
          <FlowSlider isMobile={isMobile} />
        </section>
      </div>
    </div>
  );
};

export default App;
