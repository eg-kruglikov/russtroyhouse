import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import hero from "../../assets/hero.png";

import MobilePhoneWidget from "../../components/windows/MobilePhoneWidget";

import Header from "../../components/blocks/Header";
import Services from "../../components/blocks/Services";
import PhotoGrid from "../../components/blocks/PhotoGrid";

import HomePortfolioGrid from "../../components/blocks/HomePortfolioGrid";
import { portfolioItems } from "../../data/portfolio";
import { usePressEffect } from "../../hooks/useSomething";
import { useMetrikaActivity } from "../../hooks/useMetrikaActivity";

const Home = () => {
  const press = usePressEffect();
  const [isMobile, setIsMobile] = useState(false);
  const [phoneWidgetIsOpen, setPhoneWidgetIsOpen] = useState(false);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const [widthFirstBlock, setWidthFirstBlock] = useState(0);

  // Отслеживаем активность пользователя (скролл, время на странице)
  useMetrikaActivity();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  // const contactsRef = useRef(null);
  const firstBlock = useRef(null);
  const designProjectsRef = useRef(null);
  const reviewsRef = useRef(null);

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
  const scrollToReviews = () => scrollToWithOffset(reviewsRef);

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
          scrollToReviews={scrollToReviews}
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

        {/* АКЦИЯ ОСЕНИ */}
        <section
          style={{
            width: "100%",
            background:
              "linear-gradient(180deg, #243542 0%, #1d2d3c 50%, #16232c 100%)",
            padding: isMobile ? "40px 0" : "70px 40px",
            marginTop: "0",
            position: "relative",
            overflow: "hidden",
            borderTop: "3px solid #FFD700",
            borderBottom: "3px solid #FFD700",
          }}
        >
          {/* Декоративные элементы */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background: "rgba(255, 215, 0, 0.05)",
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: "250px",
              height: "250px",
              background: "rgba(255, 215, 0, 0.03)",
              borderRadius: "50%",
              filter: "blur(80px)",
            }}
          />

          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              padding: isMobile ? "0 20px" : "0",
              boxSizing: "border-box",
            }}
          >
            {/* Эмодзи */}
            <div
              style={{
                fontSize: isMobile ? "36px" : "56px",
                marginBottom: isMobile ? "10px" : "16px",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              🍂
            </div>

            {/* Заголовок */}
            <h2
              style={{
                fontSize: isMobile ? "26px" : "44px",
                fontWeight: "900",
                color: "#FFD700",
                margin: "0 0 10px 0",
                textTransform: "uppercase",
                letterSpacing: isMobile ? "0.5px" : "1px",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              АКЦИЯ ОСЕНИ
            </h2>

            {/* Подзаголовок */}
            <p
              style={{
                fontSize: isMobile ? "17px" : "24px",
                fontWeight: "700",
                color: "#ffffff",
                margin: "0 0 16px 0",
                opacity: 0.95,
                lineHeight: "1.4",
              }}
            >
              Получите скидку на ремонт
            </p>

            {/* Описание */}
            <p
              style={{
                fontSize: isMobile ? "14px" : "17px",
                fontWeight: "400",
                color: "#ffffff",
                margin: "0 0 24px 0",
                opacity: 0.85,
                lineHeight: "1.5",
              }}
            >
              Специальное предложение действует до конца года
            </p>

            {/* Кнопка */}
            <Link
              to="/contacts"
              style={{
                textDecoration: "none",
                display: "inline-block",
                margin: isMobile ? "8px 0 0 0" : "0",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                  color: "#1a2a35",
                  padding: isMobile ? "18px 50px" : "20px 60px",
                  borderRadius: "50px",
                  fontSize: isMobile ? "16px" : "20px",
                  fontWeight: "800",
                  cursor: "pointer",
                  boxShadow:
                    "0 8px 24px rgba(255, 215, 0, 0.25), 0 0 20px rgba(242, 203, 5, 0.3)",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(255, 215, 0, 0.4), 0 0 30px rgba(242, 203, 5, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(255, 215, 0, 0.25), 0 0 20px rgba(242, 203, 5, 0.3)";
                }}
              >
                Узнать подробности
              </div>
            </Link>
          </div>
        </section>

        {/* Кто мы */}
        <section
          ref={aboutRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            scrollMarginTop: "54px",
            padding: isMobile ? "20px 20px" : "30px 40px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            marginTop: "0vh",
            boxSizing: "border-box",
          }}
        >
          <div
            ref={firstBlock}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isMobile ? "24px" : "40px",
            }}
          >
            {/* Картинка */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: isMobile ? "100%" : "950px",
                maxHeight: isMobile ? "auto" : "400px",
                overflow: "hidden",
                borderRadius: "16px",
              }}
            >
              <img
                loading="lazy"
                src="/images/homePage/about.webp"
                alt="о нас"
                style={{
                  width: "100%",
                  height: isMobile ? "auto" : "400px",
                  objectFit: "cover",
                  objectPosition: "center 65%",
                  borderRadius: "16px",
                  boxShadow: "0 10px 40px rgba(0,0,0,.3)",
                  display: "block",
                }}
              />
            </div>

            {/* Заголовок */}
            <h2
              style={{
                fontSize: isMobile ? "8.5vw" : "52px",
                fontWeight: "800",
                margin: 0,
                color: "#FFE5B4",
                textAlign: "center",
                whiteSpace: "nowrap",
                textShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
                letterSpacing: "0.5px",
              }}
            >
              Мы создаем уют
            </h2>
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
            height: "auto",
          }}
        >
          <PhotoGrid
            isMobile={isMobile}
            scrollToportfolio={scrollToportfolio}
          />
        </section>
        {/* Отзывы */}
        <section
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? "18px 16px 28px" : "24px 24px 40px",
            boxSizing: "border-box",
          }}
          ref={reviewsRef}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? 12 : 18,
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "9vw" : 40,
                fontWeight: 800,
                margin: 0,
              }}
            >
              Отзывы
            </h2>
            <div
              style={{
                opacity: 0.85,
                fontSize: isMobile ? "4vw" : 16,
                marginTop: isMobile ? 6 : 8,
              }}
            >
              Работаем по Москве и области — ценим доверие и сроки
            </div>
          </div>

          {(() => {
            const reviews = [
              {
                name: "Анна К.",
                place: "Москва, СЗАО",
                text: "Полный капитальный ремонт квартиры под ключ. Чёткая смета и ежедневные отчёты, помогли с материалами. Сдали на неделю раньше срока — довольны!",
              },
              {
                name: "Сергей и Ольга П.",
                place: "Красногорск",
                text: "Премиальный дизайнерский ремонт под ключ. Результат как в визуализации: скрытые двери, аккуратные стыки, идеальная геометрия. Рекомендуем!",
              },
              {
                name: "Ирина М.",
                place: "Мытищи",
                text: "Освежили квартиру целиком перед продажей. Команда вышла через два дня, уложились за 10 дней. Чисто, без задержек и допработ.",
              },
              {
                name: "Дмитрий С.",
                place: "Химки",
                text: "Ремонт под ключ по договору: фикс‑смета, календарный план, фотоотчёты. Все правки учитывали оперативно. Качеством доволен.",
              },
              {
                name: "Марина Л.",
                place: "Подольск",
                text: "Комплексный ремонт квартиры. Помогли с закупкой, всё аккуратно и по графику. Отдельно отметим работу с документами и гарантии.",
              },
              {
                name: "Алексей Н.",
                place: "Москва‑Сити",
                text: "Премиальный дизайнерский ремонт под ключ в апартаментах. Внимание к деталям, авторский надзор, материалы класса люкс — получилось именно то, что хотели.",
              },
            ];

            const gridStyle = {
              display: "grid",
              gap: isMobile ? 12 : 16,
              gridTemplateColumns: isMobile
                ? "1fr"
                : typeof window !== "undefined" && window.innerWidth >= 1200
                ? "1fr 1fr 1fr"
                : "1fr 1fr",
              alignItems: "stretch",
            };

            const cardStyle = {
              borderRadius: 16,
              background: "#0f2431",
              border: "1px solid rgba(255,255,255,.08)",
              boxShadow: "0 10px 28px rgba(0,0,0,.25)",
              padding: isMobile ? 14 : 18,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            };

            const nameStyle = {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: 800,
              fontSize: isMobile ? 16 : 18,
              color: "#fff",
            };

            const placeStyle = {
              color: "#FFD700",
              fontSize: isMobile ? 12 : 13,
              fontWeight: 800,
              opacity: 0.9,
            };

            const textStyle = {
              color: "rgba(255,255,255,.92)",
              fontSize: isMobile ? 14 : 15,
              lineHeight: 1.6,
            };

            return (
              <div style={gridStyle}>
                {reviews.map((r, i) => (
                  <div key={i} style={cardStyle}>
                    <div style={nameStyle}>
                      <span>{r.name}</span>
                      <span style={placeStyle}>{r.place}</span>
                    </div>
                    <div style={textStyle}>{r.text}</div>
                  </div>
                ))}
              </div>
            );
          })()}
        </section>
      </div>
    </div>
  );
};

export default Home;
