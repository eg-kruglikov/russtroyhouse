import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import hero from "../../assets/hero.png";
import brushYellow from "../../assets/brush-yellow.webp";

import BeforeAfterSlider from "../../components/blocks/BeforeAfterSlider";

// import MobilePhoneWidget from "../../components/windows/MobilePhoneWidget";

import Services from "../../components/blocks/Services";
import PhotoGrid from "../../components/blocks/PhotoGrid";
import RepairCalculator from "../../components/blocks/RepairCalculator";

import { usePressEffect } from "../../hooks/useSomething";
import { useMetrikaActivity } from "../../hooks/useMetrikaActivity";
import {
  useGlobalVideoSound,
  isGlobalVideoSoundEnabled,
  enableGlobalVideoSound,
  disableGlobalVideoSound,
} from "../../hooks/useGlobalVideoSound";
import {
  SECTION_BACKGROUND,
  TITLE_SIZES,
  SUBTITLE_SIZES,
  TITLE_SUBTITLE_GAP,
  TITLE_CONTENT_GAP,
  SECTION_INTERNAL_GAP,
  SECTION_PADDING,
} from "../../utils/spacing";
import { useScrollContext } from "../../contexts/ScrollContext";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToStateKey = location.state?.scrollTo;
  const press = usePressEffect();
  const [isMobile, setIsMobile] = useState(false);
  const [phoneWidgetIsOpen, setPhoneWidgetIsOpen] = useState(false);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const [widthFirstBlock, setWidthFirstBlock] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [displayedReviewIndex, setDisplayedReviewIndex] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const isAnimatingRef = useRef(false);

  // Отслеживаем активность пользователя (скролл, время на странице)
  useMetrikaActivity();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  // const contactsRef = useRef(null);
  const firstBlock = useRef(null);
  const designProjectsRef = useRef(null);
  const reviewsRef = useRef(null);
  const calculatorRef = useRef(null);
  const videoRef = useRef(null);
  const portfolioRef = useRef(null);
  const userUnmutedRef = useRef(false);
  const videoContainerRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const reviewsSliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [soundEnabled] = useGlobalVideoSound();
  const { setScrollFunctions } = useScrollContext();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Инстаграм-подобное автопроигрывание: проигрываем в видимости, ставим на паузу вне её
  useEffect(() => {
    if (!videoContainerRef.current || !videoRef.current) return;
    const videoEl = videoRef.current;

    // Всегда начинаем без звука (как в Instagram). Даже если глобально включён звук,
    // авто-плей с аудио может быть заблокирован браузером.
    // Переключение звука делаем только по явному действию пользователя.
    videoEl.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            try {
              // При входе в зону видимости всегда запускаем без звука
              videoEl.muted = true;
              await videoEl.play();
              // Если пользователь ранее включил звук (реальным действием), разблокируем звук после старта
              if (userUnmutedRef.current) {
                videoEl.muted = false;
                videoEl.volume = 1;
              }
            } catch (_) {}
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // При смене глобального звука синхронизируем текущий ролик
  useEffect(() => {
    if (!videoRef.current) return;
    if (soundEnabled && userUnmutedRef.current) {
      // Разрешаем звук только если был явный клик пользователя
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
    } else {
      videoRef.current.muted = true;
    }
  }, [soundEnabled]);

  // Отслеживаем ручное включение/выключение звука пользователем через системные контролы
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const onVolumeChange = () => {
      const isUnmuted = !videoEl.muted && videoEl.volume > 0;
      userUnmutedRef.current = isUnmuted;
      if (isUnmuted) {
        // Пользователь включил звук руками — включаем глобальный флаг
        enableGlobalVideoSound();
      } else {
        // Пользователь выключил звук — глобально тоже выключаем
        disableGlobalVideoSound();
      }
    };
    videoEl.addEventListener("volumechange", onVolumeChange);
    return () => videoEl.removeEventListener("volumechange", onVolumeChange);
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

  // Анимация перелистывания карточек: плитка трясется, текст растворяется
  useEffect(() => {
    if (currentReviewIndex === displayedReviewIndex) return;

    const shakeDuration = 300; // Длительность тряски (мс)
    const fadeDelay = 150; // Момент смены контента (середина анимации)
    isAnimatingRef.current = true;

    // Старый текст затухает
    setContentOpacity(0);

    // Начинаем тряску плитки
    setIsShaking(true);

    // В середине анимации меняем содержимое
    setTimeout(() => {
      setDisplayedReviewIndex(currentReviewIndex);
      setContentOpacity(0); // Новый текст пока невидим

      // Небольшая задержка перед появлением нового текста
      requestAnimationFrame(() => {
        setContentOpacity(1); // Новый текст появляется
      });
    }, fadeDelay);

    // Завершение анимации
    setTimeout(() => {
      setIsShaking(false);
      isAnimatingRef.current = false;
    }, shakeDuration);

    return () => {
      isAnimatingRef.current = false;
      setIsShaking(false);
    };
  }, [currentReviewIndex, displayedReviewIndex]);

  const scrollToWithOffset = useCallback((ref, behavior = "smooth") => {
    const yOffset = -65; // высота шапки
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior });
  }, []);
  const scrollToHash = (hash) => {
    if (!hash) return;
    const targetId = hash.replace("#", "");
    if (!targetId) return;

    const attempts = 10;
    const delay = 100;

    const tryScroll = (remaining) => {
      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = -75;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "auto" });
      } else if (remaining > 0) {
        setTimeout(() => tryScroll(remaining - 1), delay);
      }
    };

    tryScroll(attempts);
  };

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      scrollToHash(location.hash);
    }
  }, [location.pathname, location.hash]);


  // Функция прокрутки к элементу по id
  const scrollToElementById = useCallback((elementId, behavior = "smooth") => {
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -75; // высота шапки + 10px дополнительный отступ
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior });
    }
  }, []);

  // Отдельные функции на каждый блок
  const scrollToHero = useCallback(
    (behavior = "smooth") => scrollToWithOffset(heroRef, behavior),
    [scrollToWithOffset]
  );
  const scrollToAbout = useCallback(
    (behavior = "smooth") => scrollToWithOffset(aboutRef, behavior),
    [scrollToWithOffset]
  );
  const scrollToServices = useCallback(
    (behavior = "smooth") => scrollToWithOffset(servicesRef, behavior),
    [scrollToWithOffset]
  );
  const scrollToContacts = useCallback(
    (behavior = "smooth") => scrollToWithOffset(contactsRef, behavior),
    [scrollToWithOffset]
  );
  const scrollToDesignProjects = useCallback(
    (behavior = "smooth") => scrollToWithOffset(designProjectsRef, behavior),
    [scrollToWithOffset]
  );
  const scrollToReviews = useCallback(
    (behavior = "smooth") => scrollToWithOffset(reviewsRef, behavior),
    [scrollToWithOffset]
  );
  const scrollToCalculator = useCallback(
    (behavior = "smooth") => scrollToWithOffset(calculatorRef, behavior),
    [scrollToWithOffset]
  );
  const scrollToportfolio = useCallback(
    (behavior = "smooth") => scrollToWithOffset(portfolioRef, behavior),
    [scrollToWithOffset]
  );

  // Функции прокрутки к конкретным блокам услуг
  const scrollToNashiUslugi = useCallback(
    (behavior = "smooth") => scrollToElementById("nashi-uslugi", behavior),
    [scrollToElementById]
  );
  const scrollToCosmetic = useCallback(
    (behavior = "smooth") => scrollToElementById("cosmetic", behavior),
    [scrollToElementById]
  );
  const scrollToCapital = useCallback(
    (behavior = "smooth") => scrollToElementById("capital", behavior),
    [scrollToElementById]
  );
  const scrollToDesigner = useCallback(
    (behavior = "smooth") => scrollToElementById("designer", behavior),
    [scrollToElementById]
  );
  const scrollToWhitebox = useCallback(
    (behavior = "smooth") => scrollToElementById("whitebox", behavior),
    [scrollToElementById]
  );

  const light = "#ffffff";

  // Функции скролла для передачи в Header через контекст
  const scrollFunctions = useMemo(
    () => ({
      scrollToHero,
      scrollToAbout,
      scrollToServices,
      scrollToContacts,
      scrollToDesignProjects,
      scrollToReviews,
      scrollToCalculator,
      scrollToportfolio,
      scrollToNashiUslugi,
      scrollToCosmetic,
      scrollToCapital,
      scrollToDesigner,
      scrollToWhitebox,
    }),
    [
      scrollToHero,
      scrollToAbout,
      scrollToServices,
      scrollToContacts,
      scrollToDesignProjects,
      scrollToReviews,
      scrollToCalculator,
      scrollToportfolio,
      scrollToNashiUslugi,
      scrollToCosmetic,
      scrollToCapital,
      scrollToDesigner,
      scrollToWhitebox,
    ]
  );

  useEffect(() => {
    setScrollFunctions?.(scrollFunctions);
    return () => setScrollFunctions?.(null);
  }, [scrollFunctions, setScrollFunctions]);

  useLayoutEffect(() => {
    if (location.pathname !== "/" || !scrollToStateKey) return;
    const handler = scrollFunctions?.[scrollToStateKey];
    if (typeof handler === "function") {
      handler("auto");
    } else if (typeof scrollToStateKey === "string") {
      const targetId = scrollToStateKey.startsWith("#")
        ? scrollToStateKey.slice(1)
        : scrollToStateKey;
      scrollToElementById(targetId, "auto");
    }
  }, [
    location.pathname,
    scrollToStateKey,
    scrollFunctions,
    scrollToElementById,
  ]);

  useEffect(() => {
    if (location.pathname !== "/" || !scrollToStateKey) return;
    navigate(
      location.pathname + (location.search || "") + (location.hash || ""),
      {
        replace: true,
        state: {
          ...(location.state || {}),
          scrollTo: undefined,
        },
      }
    );
  }, [
    location.pathname,
    location.search,
    location.hash,
    scrollToStateKey,
    location.state,
    navigate,
  ]);

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
          {/* Hero */}
          <section
            ref={heroRef}
            style={{
              height: "calc(100svh - 60px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // textAlign: "center",
              boxSizing: "border-box",
              marginTop: "60px",

              position: "relative",
              scrollMarginTop: "60px",
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
                transform: isMobile
                  ? "translate(18%, 0%)"
                  : "translate(0%, 0%)",
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
            {/* Декоративный мазок с текстом региона */}
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                top: isMobile ? "66svh" : "79svh",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: isMobile ? "84vw" : 600,
                height: isMobile ? "auto" : "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: isMobile ? "auto" : "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "visible",
                }}
              >
                <img
                  src={brushYellow}
                  alt="Декоративный мазок"
                  loading="lazy"
                  style={{
                    width: isMobile ? "100%" : "100%",
                    height: isMobile ? "auto" : "auto",
                    opacity: 0.95,
                    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
                    display: "block",
                    objectFit: isMobile ? "contain" : "contain",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    textAlign: "center",
                    lineHeight: 1.1,
                    // средний размер между подзаголовком и основным текстом
                    fontSize: isMobile ? "4.2vw" : "22px",
                    letterSpacing: isMobile ? 0 : "0.2px",
                    padding: isMobile ? "4px 10px" : "6px 16px",
                  }}
                >
                  Москва и Московская область
                </div>
              </div>
            </div>
          </section>

          {/* Калькулятор стоимости ремонта */}
          <section
            ref={calculatorRef}
            id="calculator"
            style={{ scrollMarginTop: "74px" }}
          >
            <RepairCalculator isMobile={isMobile} />
          </section>

          {/* Блок со скидкой */}
          <section
            style={{
              width: "100%",
              backgroundColor: SECTION_BACKGROUND,
              padding: isMobile ? "5px 0 30px 0" : "15px 0 50px 0",
              marginTop: "0",
              position: "relative",
              borderTop: "none",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingLeft: isMobile ? "20px" : "24px",
                paddingRight: isMobile ? "20px" : "24px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "20px" : "32px",
                alignItems: "flex-start",
              }}
            >
              {/* Заголовок */}
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "48px",
                  fontWeight: "800",
                  color: "#ffffff",
                  margin: "0",
                  lineHeight: isMobile ? 1.3 : 1.2,
                  width: "100%",
                  textAlign: isMobile ? "left" : "center",
                  letterSpacing: "0",
                  wordSpacing: "0",
                }}
              >
                {
                  "Получите точный расчет за наш счет в течение 1-2 дней после звонка"
                }
              </h2>

              {/* Подзаголовок */}
              <p
                style={{
                  fontSize: isMobile ? "13px" : "20px",
                  fontWeight: "400",
                  color: "rgba(255,255,255,0.85)",
                  margin: "0",
                  lineHeight: 1.5,
                  width: "100%",
                  textAlign: isMobile ? "left" : "center",
                  letterSpacing: "0",
                  wordSpacing: "0",
                }}
              >
                Гарантируем включение выезда специалиста и детальной сметы в
                стоимость
              </p>

              {/* Кнопка */}
              <div>
                <Link
                  to="/contacts"
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#fff",
                    fontSize: isMobile ? "4.5vw" : "19px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = "12px";
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = "8px";
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  Получить расчет
                  <span style={{ fontSize: "22px" }}>→</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Наши услуги */}
          <Services isMobile={isMobile} servicesRef={servicesRef} />

          {/* Блок с вертикальным слайдером Последние работы */}
          <section
            ref={portfolioRef}
            id="portfolio"
            style={{
              width: "100%",
              backgroundColor: SECTION_BACKGROUND,
              paddingTop: isMobile ? "30px" : "50px",
              paddingBottom: isMobile ? "30px" : "50px",
              marginTop: isMobile ? "12px" : "20px",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  width: "100%",
                  paddingLeft: isMobile ? "20px" : "24px",
                  paddingRight: isMobile ? "20px" : "24px",
                  boxSizing: "border-box",
                  marginBottom: isMobile
                    ? TITLE_CONTENT_GAP.mobile
                    : TITLE_CONTENT_GAP.desktop,
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? "7vw" : TITLE_SIZES.desktop.main,
                    fontWeight: "900",
                    color: "#FFD700",
                    margin: `0 0 ${
                      isMobile
                        ? TITLE_SUBTITLE_GAP.mobile
                        : TITLE_SUBTITLE_GAP.desktop
                    } 0`,
                    lineHeight: isMobile ? 1.2 : 1.1,
                    letterSpacing: "-0.5px",
                    textShadow: "0 2px 8px rgba(255,215,0,0.2)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Последние работы
                </h2>
                <p
                  style={{
                    fontSize: isMobile ? "18px" : "22px",
                    color: "rgba(255,255,255,0.9)",
                    margin: 0,
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  Дизайнерский ремонт в Москве на Большой Спасской
                </p>
              </div>
            </div>

            <div
              ref={sliderContainerRef}
              style={{
                width: "100vw",
                height: isMobile ? "calc(100vw * 0.66)" : "400px",
                maxHeight: isMobile ? "calc(100vw * 0.66)" : "400px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                position: "relative",
                marginLeft: "calc(-50vw + 50%)",
                transition: isMobile
                  ? "none"
                  : "transform 0.3s ease, box-shadow 0.3s ease",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 70px rgba(0,0,0,0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(0,0,0,0.5)";
                }
              }}
            >
              <BeforeAfterSlider
                firstImage="/images/photolibrary/portfolio/designer/1/1.jpg"
                secondImage="/images/photolibrary/portfolio/designer/1/2.jpg"
                isMobile={isMobile}
              />
            </div>

            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0",
                paddingTop: isMobile ? "6px" : "12px",
                paddingLeft: isMobile ? "20px" : "24px",
                paddingRight: isMobile ? "20px" : "24px",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontSize: isMobile ? "16px" : "20px",
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  fontFamily: "'Nunito', sans-serif",
                  background: "none",
                  WebkitTextFillColor: "rgba(255,255,255,0.85)",
                }}
              >
                Полная перепланировка, отделка стен и потолка, замена окон и
                дверей, укладка паркетной доски, установка современного
                освещения
              </p>
            </div>
          </section>

          {/* Блок с вертикальным слайдером Последние работы - второй */}
          <section
            style={{
              width: "100%",
              backgroundColor: SECTION_BACKGROUND,
              paddingTop: isMobile ? "30px" : "50px",
              paddingBottom: isMobile ? "30px" : "50px",
              marginTop: isMobile ? "4px" : "8px",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  width: "100%",
                  paddingLeft: isMobile ? "20px" : "24px",
                  paddingRight: isMobile ? "20px" : "24px",
                  boxSizing: "border-box",
                  marginBottom: isMobile
                    ? TITLE_CONTENT_GAP.mobile
                    : TITLE_CONTENT_GAP.desktop,
                }}
              >
                <p
                  style={{
                    fontSize: isMobile ? "18px" : "22px",
                    color: "rgba(255,255,255,0.9)",
                    margin: 0,
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  Комплексный ремонт квартиры с акцентом на современный
                  минимализм, Москва, ЖК «Символ»
                </p>
              </div>
            </div>

            <div
              style={{
                width: "100vw",
                height: isMobile ? "calc(100vw * 0.66)" : "400px",
                maxHeight: isMobile ? "calc(100vw * 0.66)" : "400px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                position: "relative",
                marginLeft: "calc(-50vw + 50%)",
                transition: isMobile
                  ? "none"
                  : "transform 0.3s ease, box-shadow 0.3s ease",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 70px rgba(0,0,0,0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(0,0,0,0.5)";
                }
              }}
            >
              <BeforeAfterSlider
                firstImage="/images/photolibrary/portfolio/capital/2/1.jpg"
                secondImage="/images/photolibrary/portfolio/capital/2/7.jpg"
                isMobile={isMobile}
              />
            </div>

            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0",
                paddingTop: isMobile ? "6px" : "12px",
                paddingLeft: isMobile ? "20px" : "24px",
                paddingRight: isMobile ? "20px" : "24px",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontSize: isMobile ? "16px" : "20px",
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  fontFamily: "'Nunito', sans-serif",
                  background: "none",
                  WebkitTextFillColor: "rgba(255,255,255,0.85)",
                }}
              >
                Демонтаж старых покрытий и коммуникаций, полная замена электрики
                и сантехники, выравнивание стен и устройство скрытых дверей,
                монтаж потолков с освещением, укладка напольного покрытия,
                облицовка санузла плиткой под мрамор с декоративными элементами
              </p>
            </div>
          </section>

          {/* Отзывы */}
          <section
            style={{
              width: "100%",
              maxWidth: 1200,
              margin: "0 auto",
              padding: isMobile ? "18px 16px 14px" : "24px 24px 20px",
              boxSizing: "border-box",
            }}
            ref={reviewsRef}
          >
            <div
              style={{
                textAlign: isMobile ? "left" : "center",
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
                Чем довольны те, кто доверил нам ремонт.
              </div>
            </div>

            {(() => {
              const reviews = [
                {
                  name: "Никита",
                  place: "ЖК «Сердце Столицы»",
                  text: "Благодарим за работу по ремонту квартиры в ЖК «Сердце Столицы». Бесплатная и быстрая смета, качественная и своевременная работа, заранее составленный график работ. Особая благодарность мастеру Севастьяну за постоянный контроль и связь. Помогли с выбором отделочных материалов со скидкой. Буду рекомендовать компанию друзьям!",
                },
                {
                  name: "Андрей Т.",
                  place: "Пушкинский район, МО",
                  text: "Работали с директором Антоном Самылкиным и прорабом Севастьяном над домом 240 м². Компания выбрана после встреч с четырьмя подрядчиками — самая компетентная. Работы выполнены точно по проектам: вся электрика, водоснабжение, отопление, фиброармированная стяжка, штукатурка, плитка, установка дорогой сантехники. Каждый этап сдавался технадзору, замечания исправлялись. Дом сдан под ключ, все сроки соблюдены без задержек. Рекомендую!",
                },
                {
                  name: "Боровских А.",
                  place: "Москва",
                  text: "Ремонт сделан хорошо. Особенно приятно отношение прораба Валерия — всегда корректно относился к вопросам, готов был объяснить и посоветовать. В процессе мы периодически уезжали, но он планировал работы так, чтобы это не задерживало процесс. Работы выполнены аккуратно, после ремонта квартира практически чистая. В целом работой доволен!",
                },
                {
                  name: "Аноним",
                  place: "Москва",
                  text: "Обратились в компанию по совету друзей, которые были довольны работой. Сотрудники помогали во всём: от помощи в покупке черновых материалов до помощи в выборе отделочных материалов. Особенно понравилась работа прораба, который помог снизить затраты на дизайнера — грамотно посоветовал по размещению розеток и выключателей. Всегда был готов к компромиссам, приходил на встречи даже поздно вечером после рабочего дня. Довольны!",
                },
                {
                  name: "Оля М.",
                  place: "Москва",
                  text: "Мастера компетентные, всегда готовы проконсультировать, посоветовать, объяснить, особенно важно, что работы делали для себя и на долго. Особая благодарность прорабу — советы были ценными, предложения конструктивными, постоянно контролировал процесс. Всё чётко, ясно и прозрачно! Работа строго по смете, итоговая сумма точно по договору — ни копейкой больше.",
                },
              ];

              // Функция для получения инициалов
              const getInitials = (name) => {
                const parts = name.split(" ");
                if (parts.length >= 2) {
                  return (parts[0][0] + parts[1][0]).toUpperCase();
                }
                return name[0].toUpperCase();
              };

              // Функция для генерации цвета аватарки
              const getAvatarColor = (name) => {
                return "#5a6b78";
              };

              // Обработчики свайпа (touch и mouse)
              const handleStart = (clientX) => {
                touchStartX.current = clientX;
              };

              const handleMove = (clientX) => {
                touchEndX.current = clientX;
              };

              const handleEnd = () => {
                if (!touchStartX.current || !touchEndX.current) return;

                // Блокируем свайп во время анимации
                if (isAnimatingRef.current) {
                  touchStartX.current = 0;
                  touchEndX.current = 0;
                  return;
                }

                const distance = touchStartX.current - touchEndX.current;
                const minSwipeDistance = 50;

                if (distance > minSwipeDistance) {
                  // Свайп влево - следующая карточка
                  // Короткая вибрация
                  if (navigator.vibrate) {
                    navigator.vibrate(50);
                  }
                  setCurrentReviewIndex((prev) =>
                    prev < reviews.length - 1 ? prev + 1 : 0
                  );
                } else if (distance < -minSwipeDistance) {
                  // Свайп вправо - предыдущая карточка
                  // Короткая вибрация
                  if (navigator.vibrate) {
                    navigator.vibrate(50);
                  }
                  setCurrentReviewIndex((prev) =>
                    prev > 0 ? prev - 1 : reviews.length - 1
                  );
                }

                touchStartX.current = 0;
                touchEndX.current = 0;
              };

              const handleTouchStart = (e) => {
                handleStart(e.touches[0].clientX);
              };

              const handleTouchMove = (e) => {
                handleMove(e.touches[0].clientX);
              };

              const handleTouchEnd = () => {
                handleEnd();
              };

              // Обработчики для мыши (десктоп)
              const handleMouseDown = (e) => {
                handleStart(e.clientX);
              };

              const handleMouseMove = (e) => {
                if (touchStartX.current !== 0) {
                  handleMove(e.clientX);
                }
              };

              const handleMouseUp = () => {
                handleEnd();
              };

              const displayedReview = reviews[displayedReviewIndex];

              const sliderContainerStyle = {
                position: "relative",
                width: "100%",
                overflow: "hidden",
                userSelect: "none",
                cursor: "grab",
              };

              // Плитка - трясется вместе с содержимым
              const cardStyle = {
                borderRadius: 16,
                background: SECTION_BACKGROUND,
                border: "1px solid rgba(255,255,255,.1)",
                boxShadow: "0 8px 24px rgba(0,0,0,.4)",
                padding: isMobile
                  ? "14px 20px 14px 18px"
                  : "18px 26px 18px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                position: "relative",
                animation: isShaking ? "shake 0.3s ease-in-out" : "none",
                touchAction: "pan-y",
                userSelect: "none",
                cursor: "grab",
              };

              // Содержимое - трясется вместе с плиткой, затухает/появляется
              const cardContentStyle = {
                opacity: contentOpacity,
                transition: "opacity 0.1s ease-in-out",
                position: "relative",
                zIndex: 1,
              };

              const indicatorStyle = {
                position: "absolute",
                top: isMobile ? 12 : 16,
                right: isMobile ? 12 : 16,
                width: isMobile ? 32 : 36,
                height: isMobile ? 32 : 36,
                borderRadius: "50%",
                backgroundColor: SECTION_BACKGROUND,
                border: "1px solid rgba(255,255,255,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 700,
                fontSize: isMobile ? 12 : 14,
                opacity: 1,
                zIndex: 10,
                pointerEvents: "none",
              };

              const nameStyle = {
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 10 : 12,
                marginBottom: 8,
              };

              const avatarStyle = {
                width: isMobile ? 40 : 44,
                height: isMobile ? 40 : 44,
                borderRadius: "50%",
                backgroundColor: getAvatarColor(displayedReview.name),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: isMobile ? 14 : 16,
                flexShrink: 0,
              };

              const nameInfoStyle = {
                display: "flex",
                flexDirection: "column",
                gap: 4,
                flex: 1,
              };

              const nameTextStyle = {
                fontWeight: 800,
                fontSize: isMobile ? 16 : 18,
                color: "#fff",
              };

              const placeStyle = {
                color: "#FFD700",
                fontSize: isMobile ? 12 : 13,
                fontWeight: 600,
                opacity: 0.9,
              };

              const starsStyle = {
                display: "flex",
                gap: 2,
                marginBottom: 8,
              };

              const textStyle = {
                color: "rgba(255,255,255,.92)",
                fontSize: isMobile ? 14 : 15,
                lineHeight: 1.6,
              };

              // SVG для звезды
              const StarIcon = ({ filled = true, size = 14 }) => (
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill={filled ? "#f2cb05" : "none"}
                  stroke="#f2cb05"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              );

              return (
                <>
                  <style>
                    {`
                    @keyframes shake {
                      0%, 100% { transform: translateX(0); }
                      10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                      20%, 40%, 60%, 80% { transform: translateX(4px); }
                    }
                  `}
                  </style>
                  <div
                    ref={reviewsSliderRef}
                    style={sliderContainerStyle}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {/* Плитка с содержимым - трясется */}
                    <div style={cardStyle}>
                      {/* Индикатор с номером карточки - всегда видим, не подвержен анимации */}
                      <div style={indicatorStyle}>
                        {currentReviewIndex + 1}/{reviews.length}
                      </div>

                      {/* Содержимое - трясется вместе с плиткой, затухает/появляется */}
                      <div style={cardContentStyle}>
                        <div style={nameStyle}>
                          <div style={avatarStyle}>
                            {getInitials(displayedReview.name)}
                          </div>
                          <div style={nameInfoStyle}>
                            <div style={nameTextStyle}>
                              {displayedReview.name}
                            </div>
                            <div style={starsStyle}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  filled={true}
                                  size={isMobile ? 12 : 14}
                                />
                              ))}
                            </div>
                            <div style={placeStyle}>
                              {displayedReview.place}
                            </div>
                          </div>
                        </div>
                        <div style={textStyle}>{displayedReview.text}</div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </section>

          {/* С заботой о вас / О нас */}
          <section
            ref={aboutRef}
            style={{
              scrollMarginTop: "54px",
              width: "100%",
              backgroundColor: SECTION_BACKGROUND,
              paddingTop: isMobile ? "30px" : "50px",
              paddingBottom: isMobile ? "30px" : "50px",
              marginTop: isMobile ? "4px" : "8px",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  width: "100%",
                  paddingLeft: isMobile ? "20px" : "24px",
                  paddingRight: isMobile ? "20px" : "24px",
                  boxSizing: "border-box",
                  marginBottom: isMobile
                    ? TITLE_CONTENT_GAP.mobile
                    : TITLE_CONTENT_GAP.desktop,
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile
                      ? TITLE_SIZES.mobile.main
                      : TITLE_SIZES.desktop.main,
                    fontWeight: "900",
                    color: "#FFD700",
                    margin: `0 0 ${
                      isMobile
                        ? TITLE_SUBTITLE_GAP.mobile
                        : TITLE_SUBTITLE_GAP.desktop
                    } 0`,
                    lineHeight: isMobile ? 1.2 : 1.1,
                    letterSpacing: "-0.5px",
                    textShadow: "0 2px 8px rgba(255,215,0,0.2)",
                  }}
                >
                  С заботой о вас
                </h2>
                <p
                  style={{
                    fontSize: isMobile ? "18px" : "22px",
                    color: "rgba(255,255,255,0.9)",
                    margin: 0,
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  Внимание не только к деталям, но и к вашим соседям и другим
                  жильцам дома
                </p>
              </div>

              <div
                ref={videoContainerRef}
                style={{
                  width: "100vw",
                  marginLeft: "calc(-50vw + 50%)",
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  position: "relative",
                }}
              >
                {/* Кнопка звука поверх видео в правом верхнем углу */}
                <button
                  aria-label={
                    soundEnabled
                      ? "Выключить звук видео"
                      : "Включить звук видео"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    if (soundEnabled) {
                      disableGlobalVideoSound();
                      if (videoRef.current) {
                        videoRef.current.muted = true;
                      }
                    } else {
                      enableGlobalVideoSound();
                      if (videoRef.current) {
                        userUnmutedRef.current = true;
                        videoRef.current.muted = false;
                        videoRef.current.volume = 1;
                        videoRef.current.play().catch(() => {});
                      }
                    }
                  }}
                  onFocus={(e) => e.currentTarget.blur()}
                  tabIndex={-1}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 5,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    cursor: "pointer",
                    backdropFilter: "blur(3px)",
                    outline: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {soundEnabled ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15 9a5 5 0 0 1 0 6" />
                      <path d="M17.5 5.5a9 9 0 0 1 0 13" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="22" y1="9" x2="16" y2="15" />
                      <line x1="16" y1="9" x2="22" y2="15" />
                    </svg>
                  )}
                </button>
                <video
                  ref={videoRef}
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    display: "block",
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  onClick={() => {
                    enableGlobalVideoSound();
                    if (videoRef.current) {
                      userUnmutedRef.current = true;
                      videoRef.current.muted = false;
                      videoRef.current.volume = 1;
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  controls
                >
                  <source
                    src="/videos/care-about-you.MOV"
                    type="video/quicktime"
                  />
                  <source src="/videos/care-about-you.MOV" type="video/mp4" />
                  Ваш браузер не поддерживает видео
                </video>
              </div>

              <div
                style={{
                  width: "100%",
                  maxWidth: "1400px",
                  margin: "0",
                  paddingTop: isMobile
                    ? TITLE_CONTENT_GAP.mobile
                    : TITLE_CONTENT_GAP.desktop,
                  paddingLeft: isMobile ? "20px" : "24px",
                  paddingRight: isMobile ? "20px" : "24px",
                  boxSizing: "border-box",
                }}
              >
                <p
                  style={{
                    fontSize: isMobile ? "16px" : "20px",
                    color: "rgba(255,255,255,0.9)",
                    margin: 0,
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  Во время ремонта квартиры в жилом доме мы полностью
                  упаковываем лифты, а также всю входную группу на этаже
                </p>
              </div>
            </div>
          </section>

          {/* дизайн проекты */}
          <h2
            id="design-projects"
            style={{
              fontSize: isMobile ? "8vw" : "48px",
              fontWeight: 800,
              margin: "0 0 20px 0",
              color: "#fff",
              textAlign: "left",
              lineHeight: 1.1,
              paddingLeft: isMobile ? "20px" : "24px",
              scrollMarginTop: "54px",
              paddingTop: isMobile ? "20px" : "24px",
            }}
          >
            Дизайн-проекты
          </h2>

          <section
            id="designProjects"
            ref={designProjectsRef}
            style={{
              width: "100%",
              overflow: "visible",
              paddingBottom: isMobile ? "15px" : "25px",
            }}
          >
            <PhotoGrid isMobile={isMobile} />
          </section>
        </div>
      </div>
  );
};

export default Home;
