import React, { useEffect, useRef, useState } from "react";

import hero from "../../assets/hero.png";

import MobilePhoneWidget from "../../components/windows/MobilePhoneWidget";

import Header from "../../components/blocks/Header";
import Footer from "../../components/blocks/Footer";
import Map from "../../components/blocks/Map";
import Services from "../../components/blocks/Services";
import PhotoGrid from "../../components/blocks/PhotoGrid";

import HomePortfolioGrid from "../../components/blocks/HomePortfolioGrid";
import { portfolioItems } from "../../data/portfolio";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [phoneWidgetIsOpen, setPhoneWidgetIsOpen] = useState(false);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const [widthFirstBlock, setWidthFirstBlock] = useState(0);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactsRef = useRef(null);
  const firstBlock = useRef(null);
  const designProjectsRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (firstBlock.current) {
        setWidthFirstBlock(firstBlock.current.offsetWidth);
      }
    };

    const observers = {};

    // Наблюдение за шириной secondBlock
    if (firstBlock.current) {
      observers["secondBlock"] = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setWidthFirstBlock(entry.contentRect.width);
        }
      });

      observers["secondBlock"].observe(firstBlock.current);
    }

    // Слушаем ресайз окна
    window.addEventListener("resize", updateWidth);
    updateWidth(); // при первом рендере

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

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
  const scrollToDesignProjects = () => scrollToWithOffset(designProjectsRef);

  const light = "#ffffff";

  return (
    <div
      style={{
        width: "100vw",

        margin: "0 auto",
        userSelect: "none",
      }}
    >
      {/* Иконка трубки*/}

      <MobilePhoneWidget isMobile={isMobile} />

      <div
        style={{
          fontFamily: "sans-serif",
          color: light,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          width: "100%",
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
          scrollToDesignProjects={scrollToDesignProjects}
        />
        {/* Hero */}
        <section
          ref={heroRef}
          style={{
            height: "calc(100svh - 54px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // textAlign: "center",
            boxSizing: "border-box",
            marginTop: "54px",

            position: "relative",
            scrollMarginTop: "54px",
          }}
        >
          {" "}
          <img
            src="/images/background.jpg"
            alt="Интерьер"
            loading="lazy"
            style={{
              width: "auto",

              height: "100%",
              objectFit: "cover",
              transform: isMobile ? "translate(18%, 0%)" : "translate(0%, 0%)",
            }}
          />
          <img
            src={hero}
            loading="lazy"
            alt="РЕМОНТ НАЧИНАЕТСЯ ЗДЕСЬ"
            style={{
              width: isMobile ? "105%" : "113%",
              maxWidth: "680px",
              height: "auto",
              position: "absolute",
              zIndex: 1,
              top: isMobile ? "57.4svh" : "61svh",
              left: "50.5%",
              transform: isMobile
                ? "translate(-50%, -86%)"
                : "translate(-50%, -65%)",
            }}
          />
        </section>
        {/* Кто мы */}
        <section
          ref={aboutRef}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            scrollMarginTop: "54px",
            height: isMobile ? "auto" : "71vh",
            position: "relative",
            padding: isMobile ? "20px" : "0px",
            width: isMobile ? "calc(100vw - 40px)" : "100vw",
            marginTop: "3vh",
          }}
        >
          <div
            ref={firstBlock}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img
              loading="lazy"
              src="/images/homePage/about.webp"
              alt="о нас"
              style={{
                width: isMobile ? "100%" : "50%",
                height: isMobile ? "200px" : "400px", // фиксированная высота
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "10px",
              }}
            />
            <div
              style={{
                padding: "24px",
                width: isMobile ? "100%" : "34vw",

                color: "#ffffff",
                fontFamily: "sans-serif",
                borderRadius: "8px",
                marginRight: "2%",
                // marginLeft: "1%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: isMobile ? "10px" : "36px",
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? "8vw" : "36px",
                    fontWeight: "700",
                    margin: "0 0 16px 0",
                    color: "#FFD600",
                    marginBottom: "0px",
                  }}
                >
                  МЫ&nbsp;
                </h2>
                <h2
                  style={{
                    fontSize: isMobile ? "8vw" : "36px",
                    fontWeight: "700",
                    margin: "0 0 16px 0",
                    color: "#ffff",
                    marginBottom: "0px",
                  }}
                >
                  - РуссУютСтрой!
                </h2>
              </div>
              <p
                style={{
                  fontSize: isMobile ? "5vw" : "20px",
                  fontWeight: "500",
                  lineHeight: "1.1",
                  marginBottom: "33px",
                  marginTop: "4px",
                  width: "80%",
                }}
              >
                <span style={{ color: "#f1c40f" }}>
                  ВЕДУЩАЯ СТРОИТЕЛЬНАЯ КОМПАНИЯ
                </span>{" "}
                Москвы и Подмосковья. Более 10 лет делаем ремонт под ключ любой
                сложности — от простых косметических до премиальных дизайнерских
                решений. Для нас ремонт — это не просто стены и отделка, а уют,
                комфорт и надёжность на годы вперёд.
              </p>
            </div>
          </div>
        </section>
        {/* Наши услуги */}
        <Services
          // id="services"
          isMobile={isMobile}
          servicesRef={servicesRef}
          setQuestioModalOpen={setQuestioModalOpen}
          phoneWidgetIsOpen={phoneWidgetIsOpen}
          widthFirstBlock={widthFirstBlock}
          scrollToServices={scrollToServices}
        />
        {/* портфолио  */}

        <section
          id="portfolio"
          ref={portfolioRef}
          style={{
            scrollMarginTop: "54px",
            marginTop: isMobile ? "6vh" : "10vh",
          }}
        >
          {/* общий контейнер для заголовка и сетки с одинаковыми полями */}
          <div
            style={{
              width: "100%",
              maxWidth: 1200,
              margin: "0 auto",

              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: isMobile ? 10 : 16,
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "9vw" : 40,
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                Портфолио
              </h2>
              <div
                style={{
                  opacity: 0.8,
                  fontSize: isMobile ? "4vw" : 16,
                  marginTop: isMobile ? 6 : 8,
                }}
              >
                Живые примеры наших работ
              </div>
            </div>

            {/* сетка 3×2 / 2×3 / 1×6 */}
            <HomePortfolioGrid
              items={portfolioItems}
              onTileClick={() => setQuestioModalOpen(true)}
            />
          </div>
        </section>

        {/* дизайн проекты */}
        <div
          style={{
            scrollMarginTop: "54px",
            textAlign: "center",

            margin: "0 auto",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: isMobile ? "5vh" : "15vh",
          }}
        >
          <p
            style={{
              fontSize: isMobile ? "12vw" : "90px",
            }}
          >
            Дизайн-проекты
          </p>
        </div>

        <section
          id="designProjects"
          ref={designProjectsRef}
          style={{
            // scrollMarginTop: "54px",
            textAlign: "center",

            margin: "0 auto",
            overflow: "visible",
            marginLeft: isMobile ? "0%" : "5%",
            marginRight: isMobile ? "0%" : "5%",
            height: isMobile ? "auto" : "200vh",
          }}
        >
          <PhotoGrid
            isMobile={isMobile}
            scrollToportfolio={scrollToportfolio}
          />
        </section>
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

          <Map />

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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
