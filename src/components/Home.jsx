import React, { useEffect, useRef, useState } from "react";
import background from "../assets/background.jpg";
import hero from "../assets/hero.png";

import chairPlantOutline from "../assets/chair-plant-outline.png";
import MobilePhoneWidget from "../components/windows/MobilePhoneWidget";
import DesktopPhoneWidget from "../components/windows/DesktopPhoneWidget";
import QuestionModal from "./windows/FeedbackModal";
import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";
import Map from "../components/blocks/Map";
import Services from "../components/blocks/Services";
import PhotoGrid from "../components/blocks/PhotoGrid";

const Home = () => {
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
        width: "100vw",

        margin: "0 auto",
      }}
    >
      {/* изображения "ремонт начинается здась" */}

      {/* Иконка трубки, панель кнопок "позвонить" "обратный звонок" */}

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
            style={{
              width: "auto",

              height: "100%",
              objectFit: "cover",
              transform: isMobile ? "translate(18%, 0%)" : "translate(0%, 0%)",
            }}
          />
          <img
            src={hero}
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
          <button
            onTouchStart={(e) =>
              (e.currentTarget.style.transform =
                "translate(-50%, -52.6%) scale(0.9)")
            }
            onTouchEnd={(e) =>
              (e.currentTarget.style.transform =
                "translate(-50%, -52.6%) scale(1)")
            }
            onMouseDown={(e) =>
              (e.currentTarget.style.transform =
                "translate(-50%, -52.6%) scale(0.9)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform =
                "translate(-50%, -52.6%) scale(1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform =
                "translate(-50%, -52.6%) scale(1)")
            }
            disabled={phoneWidgetIsOpen}
            style={{
              position: "absolute",
              zIndex: 1,
              top: isMobile ? "72svh" : "80svh",

              left: "50.5%",
              transform: "translate(-50%, -52.6%)",
              backgroundColor: "#FFD700",
              color: "#ffff",
              fontWeight: "790",
              fontSize: "24px",
              padding: isMobile ? "16px 26px" : "26px 40px",
              border: "none",
              borderRadius: "40px",
              cursor: "pointer",
              boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
              transition: "transform 0.2s ease",
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              opacity: phoneWidgetIsOpen ? "0.5" : "1",
            }}
            onClick={() => setQuestioModalOpen(true)}
          >
            ЗАКАЗАТЬ
          </button>
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
          }}
        >
          <img
            src="/images/homePage/about.webp"
            style={{
              height: isMobile ? "auto" : "69%",
              width: isMobile ? "100%" : "auto",
              borderRadius: "10px",
            }}
            alt="о нас"
          />
          <div
            style={{
              padding: "24px",
              width: isMobile ? "100%" : "auto",

              color: "#ffffff",
              fontFamily: "sans-serif",
              borderRadius: "8px",
              marginRight: "2%",
              // marginLeft: "1%",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "40px" : "70px",
                fontWeight: "700",
                margin: "0 0 16px 0",
                color: "#FFD600",
                marginBottom: "0px",
              }}
            >
              КТО МЫ ?
            </h2>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "1.1",
                marginBottom: "33px",
                marginTop: "4px",
              }}
            >
              мы строительная компания, <br />
              работаем более 10 лет и успели <br />
              реализовать сотни проектов! <br />
              для нас ремонт — это не просто <br />
              стены и обои, а комфорт <br />и надёжность для жизни.
            </p>
            <button
              style={{
                padding: "4px 10px",
                backgroundColor: "transparent",
                border: "2px solid #FFD600",
                borderRadius: "22px",
                color: "#ffff",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              подробнее
            </button>
          </div>
        </section>
        {/* Наши услуги */}
        <Services
          isMobile={isMobile}
          servicesRef={servicesRef}
          setQuestioModalOpen={setQuestioModalOpen}
          phoneWidgetIsOpen={phoneWidgetIsOpen}
        />
        <section
          id="portfolio"
          ref={portfolioRef}
          style={{
            scrollMarginTop: "54px",
            textAlign: "center",

            margin: "0 auto",
            overflow: "visible",
            height: isMobile ? "auto" : "200vh",
          }}
        >
          <PhotoGrid
            isMobile={isMobile}
            scrollToportfolio={scrollToportfolio}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
              height: "20%",
            }}
          >
            <button
              type="button"
              onTouchStart={(e) =>
                (e.currentTarget.style.transform = "scale(0.97)")
              }
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.97)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              style={{
                backgroundColor: "#f2cb05",
                color: isMobile ? "#000" : "#ffff",
                padding: isMobile ? "17px 24px" : "32px 48px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "45px",
                cursor: "pointer",
                fontSize: isMobile ? "18px" : "30px",
                marginTop: isMobile ? "30px" : "0px",
                marginBottom: isMobile ? "30px" : "0px",
                alignSelf: "center",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
                opacity: phoneWidgetIsOpen ? "0.5" : "1",
              }}
              onClick={() => setQuestioModalOpen(true)}
              disabled={phoneWidgetIsOpen}
            >
              получить пример проекта
            </button>
          </div>
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
        // <Footer />
      </div>
    </div>
  );
};

export default Home;
