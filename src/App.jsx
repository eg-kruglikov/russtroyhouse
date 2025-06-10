import React, { useEffect, useState } from "react";
import background from "./assets/background.jpg";
import logo from "./assets/logo_white.png";
import { useRef } from "react";
import FlowSlider from "./components/FlowSlider/FlowSlider";
import hero from "./assets/hero.png";

import chairPlantOutline from "./assets/chair-plant-outline.png";
import MobilePhoneWidget from "./components/windows/MobilePhoneWidget";
import DesktopPhoneWidget from "./components/windows/DesktopPhoneWidget";
import QuestionModal from "./components/windows/QuestionModal";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [phoneWidgetIsOpen, setPhoneWidgetIsOpen] = useState(false);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);

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
        maxWidth: "1300px",
        margin: "0 auto",
      }}
    >
      {/* изображения "ремонт начинается здась" */}
      <img
        src={hero}
        alt="РЕМОНТ НАЧИНАЕТСЯ ЗДЕСЬ"
        style={{
          width: "113%",
          maxWidth: "800px",
          height: "auto",
          position: "absolute",
          zIndex: 1,
          top: isMobile ? "64.1svh" : "61svh",
          left: "50.5%",
          transform: isMobile
            ? "translate(-50%, -86%)"
            : "translate(-50%, -44%)",
        }}
      />

      {/* панель кнопок "позвонить" "обратный звонок" */}

      {isMobile ? (
        <MobilePhoneWidget
          isOpen={phoneWidgetIsOpen}
          setIsOpen={setPhoneWidgetIsOpen}
          setQuestioModalOpen={setQuestioModalOpen}
        />
      ) : (
        <DesktopPhoneWidget
          isOpen={phoneWidgetIsOpen}
          setIsOpen={setPhoneWidgetIsOpen}
          setQuestioModalOpen={setQuestioModalOpen}
        />
      )}

      {/* кнопка "ЗАКАЗАТЬ" */}

      <button
        style={{
          display: phoneWidgetIsOpen ? "none" : "inline-block",
          position: "absolute",
          zIndex: 1,
          top: isMobile ? "80svh" : "85svh",
          left: "50.5%",
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

      {/* модалка обратной связи */}

      <QuestionModal
        isOpen={questioModalOpen}
        onClose={() => setQuestioModalOpen(false)}
        isMobile={isMobile}
      />

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
            height: "calc(100svh - 54px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
            margin: "0 auto",
            marginTop: "54px",

            overflow: "hidden",
            position: "relative",
          }}
        ></section>

        {/* Кто мы */}
        <section
          style={{
            background:
              "linear-gradient(0deg, rgba(2, 4, 4, 1) 0%, rgba(18, 16, 14, 0.91) 50%, rgba(34, 27, 24, 0.34) 100%)",

            textAlign: "center",

            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginRight: "auto",
              fontSize: isMobile ? "48px" : "130px",
              marginBottom: "24px",
              color: "#486072",
              marginTop: "14px",
              fontWeight: 700,
              marginLeft: isMobile ? "-5px" : "-10px",
            }}
          >
            КТО МЫ?
          </div>
          <p
            style={{
              maxWidth: "70%",
              margin: "0 auto",
              fontSize: isMobile ? "12px" : "20px",
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
          <img src={chairPlantOutline} alt="chairPlantOutline" />
        </section>

        {/* контур интерера (картинка) */}

        <section
          style={{
            backgroundColor: "#000",

            textAlign: "center",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        ></section>

        {/* Наши услуги */}
        <section
          style={{
            backgroundColor: "#000",
            padding: "80px 16px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              color: "#f2cb05",
              fontWeight: 700,
              marginBottom: "40px",
            }}
          >
            НАШИ УСЛУГИ
          </h2>

          <div
            style={{
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              maxWidth: "500px",
              gap: "36px",
            }}
          >
            {[
              {
                title: "КОСМЕТИЧЕСКИЙ РЕМОНТ",
                text: "Лёгкое обновление – покраска, обои, замена покрытий, освежение интерьера.",
                number: "1",
              },
              {
                title: "КАПИТАЛЬНЫЙ РЕМОНТ",
                text: "Замена коммуникаций, выравнивание стен, перепланировка, демонтаж, полная замена электрики.",
                number: "2",
              },
              {
                title: "ДИЗАЙНЕРСКИЙ РЕМОНТ",
                text: "Уникальные интерьеры под ключ. Визуальные концепции и премиальные материалы. Зонирование кухни – гостиной.",
                number: "3",
              },
            ].map((item) => (
              <div
                key={item.number}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    minWidth: "50px",
                    backgroundColor: "#011324",
                    color: "#f2cb05",
                    borderRadius: "50%",
                    border: "2px solid #f2cb05",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    fontWeight: 500,
                  }}
                >
                  {item.number}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#ccc",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            style={{
              marginTop: "48px",
              backgroundColor: "#f2cb05",
              color: "#000",
              padding: "14px 28px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "30px",
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
