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

import BeforeAfterSection from "../../components/blocks/BeforeAfterSection";
// import MobilePhoneWidget from "../../components/windows/MobilePhoneWidget";

import Services from "../../components/blocks/Services";
import PhotoGrid from "../../components/blocks/PhotoGrid";
import RepairCalculator from "../../components/blocks/RepairCalculator";
import FullWidthViewportVideo from "../../components/blocks/FullWidthViewportVideo";
import FullWidthImageGallery from "../../components/blocks/FullWidthImageGallery";

import { usePressEffect } from "../../hooks/useSomething";
import { useMetrikaActivity } from "../../hooks/useMetrikaActivity";
import { useNotBounceOnce } from "../../hooks/useNotBounceOnce";
import { useResponsiveShell } from "../../hooks/useResponsiveShell";
import { createMenuItems, NAV_GOALS_MAP } from "../../utils/navigationConfig";
import { ymGoal } from "../../utils/metrika";
import { useNavigateWithMetrika } from "../../hooks/useNavigateWithMetrika";
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
  const isHomePage = location.pathname === "/";
  const scrollToStateKey = location.state?.scrollTo;
  const press = usePressEffect();
  const ensureNotBounce = useNotBounceOnce();
  const {
    contentWidth: shellContentWidth,
    layoutPadding,
    showSidebar,
    sidebarWidth,
  } = useResponsiveShell();
  const sidebarGap = 0;
  const containerShift = showSidebar ? -(sidebarWidth + sidebarGap) / 2 : 0;
  const navigateWithMetrika = useNavigateWithMetrika();
  const [isMobile, setIsMobile] = useState(false);
  const [phoneWidgetIsOpen, setPhoneWidgetIsOpen] = useState(false);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const [widthFirstBlock, setWidthFirstBlock] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [displayedReviewIndex, setDisplayedReviewIndex] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const isAnimatingRef = useRef(false);
  const [activeScrollKey, setActiveScrollKey] = useState("scrollToHero");
  const activeScrollKeyRef = useRef("scrollToHero");
  const fallbackContentWidth = shellContentWidth > 0 ? shellContentWidth : 720;
  const sliderHeightValue = isMobile
    ? Math.round(fallbackContentWidth * 0.66)
    : 400;
  const sliderHeightPx = isMobile ? `${sliderHeightValue}px` : "400px";

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
  const portfolioRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const reviewsSliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const { setScrollFunctions, setActiveScrollKey: setContextActiveScrollKey } =
    useScrollContext();

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

  const menuItems = useMemo(
    () => createMenuItems(scrollFunctions),
    [scrollFunctions]
  );

  const normalizeRoute = useCallback((route) => {
    if (!route) {
      return { path: "/", hash: "" };
    }

    const [rawPath = "", rawHash = ""] = route.split("#");
    const trimmedPath = rawPath.trim();
    const path =
      trimmedPath.length > 0
        ? trimmedPath.startsWith("/")
          ? trimmedPath
          : `/${trimmedPath}`
        : "/";

    const trimmedHash = rawHash.trim();
    const hash =
      trimmedHash.length > 0
        ? trimmedHash.startsWith("#")
          ? trimmedHash
          : `#${trimmedHash}`
        : "";

    return { path, hash };
  }, []);

  const triggerMenuNav = useCallback(
    (item, behavior = "smooth") => {
      if (!item) return;

      const scrollFnFromContext =
        item.scrollKey && scrollFunctions?.[item.scrollKey];
      const fallbackFn =
        typeof item.href === "function" ? item.href : undefined;
      const scrollFn = scrollFnFromContext || fallbackFn;

      if (isHomePage && typeof scrollFn === "function") {
        scrollFn(behavior);
        return;
      }

      if (item.scrollKey) {
        const { path: targetPath, hash: targetHash } = normalizeRoute(
          item.route
        );
        navigateWithMetrika(targetPath || "/", {
          scrollTo: item.scrollKey,
          hash: targetHash,
        });
        return;
      }

      if (item.route) {
        navigateWithMetrika(item.route);
        return;
      }

      if (typeof scrollFn === "function") {
        scrollFn(behavior);
      }
    },
    [isHomePage, navigateWithMetrika, normalizeRoute, scrollFunctions]
  );

  const handleSidebarSelection = useCallback(
    (item, { behavior = "smooth" } = {}) => {
      if (!item) return;
      ensureNotBounce();
      ymGoal(NAV_GOALS_MAP[item.name] || "nav_click");
      triggerMenuNav(item, behavior);
    },
    [ensureNotBounce, triggerMenuNav]
  );
  useEffect(() => {
    setScrollFunctions?.(scrollFunctions);
    return () => setScrollFunctions?.(null);
  }, [scrollFunctions, setScrollFunctions]);

  useEffect(() => {
    setContextActiveScrollKey?.(activeScrollKey);
  }, [activeScrollKey, setContextActiveScrollKey]);

  useEffect(() => {
    return () => {
      setContextActiveScrollKey?.(null);
    };
  }, [setContextActiveScrollKey]);

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

  useEffect(() => {
    activeScrollKeyRef.current = activeScrollKey;
  }, [activeScrollKey]);

  useEffect(() => {
    if (!isHomePage) return;
    setContextActiveScrollKey?.(activeScrollKey);
  }, [activeScrollKey, isHomePage, setContextActiveScrollKey]);

  useEffect(() => {
    if (!isHomePage) {
      return undefined;
    }

    const sectionEntries = [
      { element: heroRef.current, key: "scrollToHero" },
      { element: portfolioRef.current, key: "scrollToportfolio" },
      { element: reviewsRef.current, key: "scrollToReviews" },
      { element: designProjectsRef.current, key: "scrollToDesignProjects" },
    ];

    // Отдельный массив для калькулятора с более мягкими настройками
    const calculatorEntry = {
      element: calculatorRef.current,
      key: "scrollToCalculator",
    };

    const idMappings = [
      { id: "nashi-uslugi", key: "scrollToNashiUslugi" },
      { id: "cosmetic", key: "scrollToCosmetic" },
      { id: "capital", key: "scrollToCapital" },
      { id: "designer", key: "scrollToDesigner" },
      { id: "whitebox", key: "scrollToWhitebox" },
    ];

    const elementKeyMap = new Map();
    const visibilityMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const mappedKey = elementKeyMap.get(entry.target);
          if (!mappedKey) return;

          if (entry.isIntersecting) {
            visibilityMap.set(entry.target, entry.intersectionRatio);
          } else {
            visibilityMap.delete(entry.target);
          }
        });

        if (visibilityMap.size === 0) {
          return;
        }

        const [topEntry] = [...visibilityMap.entries()].sort(
          (a, b) => b[1] - a[1]
        );

        if (!topEntry) {
          return;
        }

        const nextKey = elementKeyMap.get(topEntry[0]);

        if (nextKey && nextKey !== activeScrollKeyRef.current) {
          activeScrollKeyRef.current = nextKey;
          setActiveScrollKey(nextKey);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sectionEntries.forEach(({ element, key }) => {
      if (!element) return;
      elementKeyMap.set(element, key);
      observer.observe(element);
    });

    idMappings.forEach(({ id, key }) => {
      const element = document.getElementById(id);
      if (!element) return;
      elementKeyMap.set(element, key);
      observer.observe(element);
    });

    // Отдельный observer для калькулятора с более мягкими настройками
    const calculatorObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const mappedKey = elementKeyMap.get(entry.target);
          if (!mappedKey) return;

          if (entry.isIntersecting) {
            visibilityMap.set(entry.target, entry.intersectionRatio);
          } else {
            visibilityMap.delete(entry.target);
          }
        });

        if (visibilityMap.size === 0) {
          return;
        }

        const [topEntry] = [...visibilityMap.entries()].sort(
          (a, b) => b[1] - a[1]
        );

        if (!topEntry) {
          return;
        }

        const nextKey = elementKeyMap.get(topEntry[0]);

        if (nextKey && nextKey !== activeScrollKeyRef.current) {
          activeScrollKeyRef.current = nextKey;
          setActiveScrollKey(nextKey);
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -15% 0px", // Более мягкие настройки для большого блока
        threshold: [0, 0.1, 0.2],
      }
    );

    // Добавляем калькулятор в отслеживание с отдельным observer
    if (calculatorEntry.element) {
      elementKeyMap.set(calculatorEntry.element, calculatorEntry.key);
      calculatorObserver.observe(calculatorEntry.element);
    }

    return () => {
      elementKeyMap.forEach((_, element) => {
        observer.unobserve(element);
      });
      observer.disconnect();

      if (calculatorEntry.element) {
        calculatorObserver.unobserve(calculatorEntry.element);
      }
      calculatorObserver.disconnect();
      visibilityMap.clear();
    };
  }, [
    showSidebar,
    isHomePage,
    heroRef,
    calculatorRef,
    servicesRef,
    portfolioRef,
    reviewsRef,
    designProjectsRef,
  ]);

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          boxSizing: "border-box",
          gap: `${sidebarGap}px`,
          paddingLeft: `${layoutPadding}px`,
          paddingRight: `${layoutPadding}px`,
          transform: showSidebar
            ? `translateX(${containerShift}px)`
            : undefined,
        }}
      >
        {showSidebar && (
          <aside
            style={{
              flex: `0 0 ${sidebarWidth}px`,
              maxWidth: `${sidebarWidth}px`,
              width: `${sidebarWidth}px`,
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "0px",
              padding: "28px 22px 28px",
              position: "sticky",
              top: "60px",
              height: "auto",
              maxHeight: "calc(100vh - 108px)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              overflowY: "auto",
              alignSelf: "flex-start",
              WebkitBackdropFilter: "blur(12px)",
              backdropFilter: "blur(12px)",
              boxShadow: "none",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {menuItems.map((item, index) => {
                if (item.type === "submenu") {
                  const isSubmenuActive = item.scrollKey === activeScrollKey;

                  return (
                    <div
                      key={`${item.name}-${index}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <button
                        {...press}
                        onClick={() => handleSidebarSelection(item)}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          color: isSubmenuActive
                            ? "#FFD700"
                            : "rgba(255,255,255,0.92)",
                          fontFamily: "Arial, sans-serif",
                          fontWeight: 800,
                          fontSize: "16px",
                          letterSpacing: "0.6px",
                          textTransform: "uppercase",
                          padding: "4px 0",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {item.name}
                      </button>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          paddingLeft: "8px",
                        }}
                      >
                        {item.submenu?.map((subItem, subIndex) => {
                          const isSubItemActive =
                            subItem.scrollKey === activeScrollKey;
                          return (
                            <button
                              {...press}
                              key={`${subItem.name}-${subIndex}`}
                              onClick={() => handleSidebarSelection(subItem)}
                              style={{
                                all: "unset",
                                cursor: "pointer",
                                color: isSubItemActive
                                  ? "#FFD700"
                                  : "rgba(255,255,255,0.92)",
                                fontFamily: "Arial, sans-serif",
                                fontWeight: 600,
                                fontSize: "16px",
                                letterSpacing: "0.3px",
                                textTransform: "none",
                                lineHeight: 1.6,
                                opacity: isSubItemActive ? 1 : 0.94,
                                transition:
                                  "color 0.2s ease, opacity 0.2s ease",
                              }}
                            >
                              {subItem.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                const isItemActive = item.scrollKey === activeScrollKey;

                return (
                  <button
                    {...press}
                    key={`${item.name}-${index}`}
                    onClick={() => handleSidebarSelection(item)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      color: isItemActive
                        ? "#FFD700"
                        : "rgba(255,255,255,0.95)",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 800,
                      fontSize: "16px",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      lineHeight: 1.5,
                      padding: "2px 0",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </aside>
        )}
        <main
          style={{
            flex: `0 0 ${fallbackContentWidth}px`,
            maxWidth: `${fallbackContentWidth}px`,
            width: "100%",
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
                  filter: "brightness(0.87)",
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
                  paddingRight: isMobile ? "20px" : "48px",
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
                    fontSize: isMobile ? TITLE_SIZES.mobile.service : TITLE_SIZES.desktop.service,
                    fontWeight: "800",
                    color: "#ffffff",
                    margin: "0",
                    lineHeight: isMobile ? 1.3 : 1.25,
                    width: "100%",
                    textAlign: "left",
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
                    fontSize: isMobile ? "14px" : "20px",
                    fontWeight: "400",
                    color: "rgba(255,255,255,0.9)",
                    margin: "0",
                    lineHeight: 1.6,
                    width: "100%",
                    textAlign: "left",
                    letterSpacing: "0",
                    wordSpacing: "0",
                  }}
                >
                  Гарантируем выезд специалиста и смету за наш счет
                </p>

                {/* Кнопка */}
                <div>
                  <Link
                    to="/contacts"
                    style={{
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "#FFD700",
                      fontSize: isMobile ? "5vw" : "22px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.gap = "14px";
                      e.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.gap = "10px";
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    Получить расчет
                    <span style={{ fontSize: isMobile ? "5.2vw" : "26px" }}>
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Наши услуги */}
            <Services isMobile={isMobile} servicesRef={servicesRef} />

            <BeforeAfterSection
              isMobile={isMobile}
              sectionRef={portfolioRef}
              sectionId="portfolio"
              sliderContainerRef={sliderContainerRef}
              firstImage="/images/photolibrary/portfolio/designer/1/1.jpg"
              secondImage="/images/photolibrary/portfolio/designer/1/2.jpg"
              title="Последние работы"
              subtitle="Дизайнерский ремонт в Москве на Большой Спасской"
              footerDescription="Полная перепланировка, отделка стен и потолка, замена окон и дверей, укладка паркетной доски, установка современного освещения"
              sliderHeightPx={sliderHeightPx}
              marginTop={isMobile ? "12px" : "20px"}
              headerTitleStyle={{
                fontSize: isMobile ? "7vw" : TITLE_SIZES.desktop.main,
                whiteSpace: "nowrap",
              }}
              headerSubtitleStyle={{
                fontSize: isMobile ? "18px" : "22px",
              }}
            />

            <BeforeAfterSection
              isMobile={isMobile}
              firstImage="/images/photolibrary/portfolio/capital/2/1.jpg"
              secondImage="/images/photolibrary/portfolio/capital/2/7.jpg"
              subtitle="Комплексный ремонт квартиры с акцентом на современный минимализм, Москва, ЖК «Символ»"
              footerDescription="Демонтаж старых покрытий и коммуникаций, полная замена электрики и сантехники, выравнивание стен и устройство скрытых дверей, монтаж потолков с освещением, укладка напольного покрытия, облицовка санузла плиткой под мрамор с декоративными элементами"
              sliderHeightPx={sliderHeightPx}
              marginTop={isMobile ? "4px" : "8px"}
              headerSubtitleStyle={{
                fontSize: isMobile ? "18px" : "22px",
              }}
            />

            {/* Обертка для Отзывов и "С заботой о вас" */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                width: "100%",
                gap: isMobile ? "0" : "0",
                alignItems: "stretch",
              }}
            >
              {/* Отзывы */}
              <section
                style={{
                  width: isMobile ? "100%" : "40%",
                  margin: "0",
                  padding: isMobile ? "18px 16px 14px" : "50px 24px 20px",
                  boxSizing: "border-box",
                  flex: isMobile ? "none" : "0 0 40%",
                }}
                ref={reviewsRef}
              >
              <div
                style={{
                  textAlign: "left",
                  marginBottom: isMobile ? 12 : 18,
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? TITLE_SIZES.mobile.main : TITLE_SIZES.desktop.main,
                    fontWeight: 900,
                    margin: 0,
                    color: "#FFD700",
                    lineHeight: isMobile ? 1.2 : 1.1,
                    letterSpacing: "-0.5px",
                    textShadow: "0 2px 8px rgba(255,215,0,0.2)",
                  }}
                >
                  Отзывы
                </h2>
                <div
                  style={{
                    fontSize: isMobile ? "18px" : "22px",
                    color: "rgba(255,255,255,0.9)",
                    marginTop: isMobile ? 6 : 8,
                    fontWeight: 500,
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
                  width: isMobile ? "100%" : "60%",
                  backgroundColor: SECTION_BACKGROUND,
                  paddingTop: isMobile ? "30px" : "50px",
                  paddingBottom: isMobile ? "30px" : "50px",
                  marginTop: isMobile ? "4px" : "0",
                  position: "relative",
                  boxSizing: "border-box",
                  flex: isMobile ? "none" : "0 0 60%",
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

                <FullWidthViewportVideo
                  videoSrc="/videos/care-about-you.MOV"
                  sources={[
                    {
                      src: "/videos/care-about-you.MOV",
                      type: "video/quicktime",
                    },
                    { src: "/videos/care-about-you.MOV", type: "video/mp4" },
                  ]}
                  aspectRatio="4 / 5"
                  containerStyle={{
                    width: "100%",
                    marginLeft: 0,
                    borderRadius: 0,
                    overflow: "hidden",
                    boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
                  }}
                  videoStyle={{
                    objectFit: "cover",
                  }}
                  showSoundToggle={!isMobile}
                />

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
            </div>

            {/* дизайн проекты */}
            <h2
              id="design-projects"
              style={{
                fontSize: isMobile ? TITLE_SIZES.mobile.main : TITLE_SIZES.desktop.main,
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
        </main>
      </div>
    </div>
  );
};

export default Home;
