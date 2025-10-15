import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import hero from "../../assets/hero.png";

// import MobilePhoneWidget from "../../components/windows/MobilePhoneWidget";

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

      {/* <MobilePhoneWidget isMobile={isMobile} /> */}

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

        {/* Блок со скидкой */}
        <section
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #0a1a26 0%, #16232c 100%)",
            padding: isMobile ? "40px 0" : "80px 0",
            marginTop: "0",
            position: "relative",
            borderTop: isMobile ? "4px solid #FF6B35" : "6px solid #FF6B35",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: isMobile ? "92%" : "90%",
              maxWidth: "1000px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "20px" : "32px",
              alignItems: "center",
            }}
          >
            {/* Заголовок */}
            <h2
              style={{
                fontSize: isMobile ? "22px" : "48px",
                fontWeight: "800",
                color: "#ffffff",
                margin: "0",
                lineHeight: isMobile ? 1.3 : 1.2,
                letterSpacing: "-0.5px",
              }}
            >
              Ремонт с комфортом <br />
              начинается с приятной скидки
            </h2>

            {/* Подзаголовок */}
            <p
              style={{
                fontSize: isMobile ? "13px" : "20px",
                fontWeight: "400",
                color: "rgba(255,255,255,0.85)",
                margin: "0",
                lineHeight: 1.5,
                maxWidth: isMobile ? "100%" : "800px",
              }}
            >
              Бесплатный расчёт сметы, скидка на материалы и фиксированная цена
              по договору
            </p>

            {/* Кнопка */}
            <div>
              <Link
                to="/contacts"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                <div
                  {...press}
                  style={{
                    ...press.style,
                    background: "#FF6B35",
                    color: "#ffffff",
                    padding: isMobile ? "16px 40px" : "18px 48px",
                    borderRadius: "12px",
                    fontSize: isMobile ? "16px" : "18px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(255, 107, 53, 0.3)",
                    transition: "all 0.2s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(255, 107, 53, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(255, 107, 53, 0.3)";
                  }}
                >
                  Получить скидку
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Блок о регионе работы */}
        <section
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #1a2a3a 0%, #2a3a4a 100%)",
            padding: isMobile ? "50px 0" : "80px 0",
            marginTop: "0",
            position: "relative",
            borderTop: isMobile ? "3px solid #FFD700" : "4px solid #FFD700",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: isMobile ? "92%" : "90%",
              maxWidth: "1000px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : "24px",
              alignItems: "center",
            }}
          >
            {/* Заголовок */}
            <h2
              style={{
                fontSize: isMobile ? "20px" : "42px",
                fontWeight: "800",
                color: "#ffffff",
                margin: "0",
                lineHeight: isMobile ? 1.3 : 1.2,
                letterSpacing: "-0.5px",
              }}
            >
              Мы работаем в Москве <br />и Московской области
            </h2>

            {/* Подзаголовок */}
            <p
              style={{
                fontSize: isMobile ? "14px" : "18px",
                fontWeight: "400",
                color: "rgba(255,255,255,0.9)",
                margin: "0",
                lineHeight: 1.5,
                maxWidth: isMobile ? "100%" : "700px",
              }}
            >
              Опытная команда мастеров готова выполнить ремонт любой сложности в
              удобное для вас время
            </p>

            {/* Декоративная линия */}
            <div
              style={{
                width: isMobile ? "60px" : "80px",
                height: "3px",
                background: "linear-gradient(90deg, #FFD700, #FF6B35)",
                borderRadius: "2px",
                marginTop: isMobile ? "8px" : "12px",
              }}
            />
          </div>
        </section>

        {/* Наши услуги */}
        <Services isMobile={isMobile} servicesRef={servicesRef} />
        {/* портфолио  */}

        <section
          id="portfolio"
          ref={portfolioRef}
          style={{
            scrollMarginTop: "54px",
            marginTop: isMobile ? "6vh" : "12vh",
            paddingTop: isMobile ? "4vh" : "6vh",
            borderTop: "2px solid rgba(255, 215, 0, 0.3)",
            minHeight: isMobile ? "calc(100vh - 60px)" : "auto",
            display: isMobile ? "flex" : "block",
            flexDirection: isMobile ? "column" : "initial",
          }}
        >
          {/* общий контейнер для заголовка и сетки с одинаковыми полями */}
          <div
            style={{
              width: "100%",
              maxWidth: 1200,
              margin: "0 auto",
              boxSizing: "border-box",
              flex: isMobile ? 1 : "initial",
              display: isMobile ? "flex" : "block",
              flexDirection: isMobile ? "column" : "initial",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: isMobile ? 8 : 16,
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "7vw" : 40,
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                Портфолио
              </h2>
              <div
                style={{
                  opacity: 0.8,
                  fontSize: isMobile ? "3.5vw" : 16,
                  marginTop: isMobile ? 4 : 8,
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
