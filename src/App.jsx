import React, { useEffect, useRef, useState } from "react";
import background from "./assets/background.jpg";
import map from "./assets/map.png";
import FlowSlider from "./components/FlowSlider/FlowSlider";
import hero from "./assets/hero.png";

import chairPlantOutline from "./assets/chair-plant-outline.png";
import MobilePhoneWidget from "./components/windows/MobilePhoneWidget";
import DesktopPhoneWidget from "./components/windows/DesktopPhoneWidget";
import QuestionModal from "./components/windows/QuestionModal";
import Header from "./components/blocks/Header";
import Footer from "./components/blocks/Footer";
import Map from "./components/blocks/map";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [phoneWidgetIsOpen, setPhoneWidgetIsOpen] = useState(false);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactsRef = useRef(null);

  const scrollToWithOffset = (ref) => {
    const yOffset = -65; // высота шапки
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Отдельные функции на каждый блок
  const scrollToHero = () => scrollToWithOffset(heroRef);
  const scrollToAbout = () => scrollToWithOffset(aboutRef);
  const scrollToServices = () => scrollToWithOffset(servicesRef);
  const scrollToContacts = () => scrollToWithOffset(contactsRef);
  const scrollToportfolio = () => scrollToWithOffset(portfolioRef);

  const light = "#ffffff";

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

          color: light,

          overflow: "hidden",

          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Шапка */}
        <Header
          isMobile={isMobile}
          scrollToHero={scrollToHero}
          scrollToAbout={scrollToAbout}
          scrollToServices={scrollToServices}
          scrollToportfolio={scrollToportfolio}
          scrollToContacts={scrollToContacts}
        />
        id="about"
        {/* Hero */}
        <section
          ref={heroRef}
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "30% center",

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
            scrollMarginTop: "54px",
          }}
        ></section>
        {/* Кто мы */}
        <section
          ref={aboutRef}
          style={{
            background:
              "linear-gradient(0deg, rgba(2, 4, 4, 1) 0%, rgba(18, 16, 14, 0.91) 50%, rgba(34, 27, 24, 0.34) 100%)",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            scrollMarginTop: "54px",
            height: "100svh",
          }}
        >
          <div
            style={{
              marginRight: "auto",
              fontSize: isMobile ? "48px" : "130px",
              marginBottom: "24px",
              color: "#E6CD0B",
              marginTop: isMobile ? "-5px" : "-24px",
              fontWeight: 700,
              marginLeft: isMobile ? "-3px" : "-10px",
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
          ref={servicesRef}
          style={{
            backgroundColor: "#000",
            padding: "8px 16px",
            textAlign: "center",
            scrollMarginTop: "60px",
            height: "100svh",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "36px" : "48px",
              color: "#f2cb05",
              fontWeight: 700,
              marginBottom: "40px",
              whiteSpace: "nowrap",
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
              padding: "0px 26px",
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
                {!isMobile && (
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
                )}

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
          id="portfolio"
          ref={portfolioRef}
          style={{
            backgroundColor: "#000",
            scrollMarginTop: "54px",
            textAlign: "center",
            maxWidth: "1400px",
            margin: "0 auto",
            overflow: "visible",
          }}
        >
          <FlowSlider isMobile={isMobile} />
        </section>
        {/* карта с пунктиром */}
        <div
          id="contacts"
          ref={contactsRef}
          style={{
            position: "relative",
            margin: "0 auto",
            width: "100%",
            padding: "32px 0",
          }}
        >
          {/* Верхний пунктир */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "2px",
              background:
                "repeating-linear-gradient(90deg, transparent 0 20px, white 20px 32px)",
              backgroundSize: "40px 8px",
              animation: "dash-move-left 2s linear infinite",
            }}
          />
          {/* карта */}

          <Map />

          {/* Нижний пунктир */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "2px",
              background:
                "repeating-linear-gradient(90deg, transparent 0 20px, white 20px 32px)",
              backgroundSize: "40px 8px",
              animation: "dash-move-right 2s linear infinite",
              scrollMarginTop: "54px",
            }}
          />

          {/* Карта */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
