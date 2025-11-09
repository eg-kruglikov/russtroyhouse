import React, { useEffect, useRef, useState } from "react";
import { usePressEffect } from "../../hooks/useSomething";
import "../styles/header.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigateWithMetrika } from "../../hooks/useNavigateWithMetrika";
import { useLocation } from "react-router-dom";
import { useScrollContext } from "../../contexts/ScrollContext";
import { usePhoneIconContext } from "../../contexts/PhoneIconContext";
import { ymGoal, ymNotBounce } from "../../utils/metrika";
import CompanyName from "./CompanyName";

// отправляем notBounce один раз при первом реальном действии
const useNotBounceOnce = () => {
  const sentRef = useRef(false);
  return () => {
    if (sentRef.current) return;
    ymNotBounce();
    sentRef.current = true;
  };
};

const Header = ({
  isMobile: isMobileProp,
  scrollToHero,
  scrollToAbout,
  scrollToServices,
  scrollToportfolio,
  scrollToContacts,
  scrollToDesignProjects,
  scrollToReviews,
  scrollToCalculator,
  scrollToNashiUslugi,
  scrollToCosmetic,
  scrollToCapital,
  scrollToDesigner,
  scrollToWhitebox,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCapitalPage = location.pathname === "/repair/capital";
  const isContactsPage = location.pathname === "/contacts";
  const scrollContext = useScrollContext();
  const { isScrolledToEnd, setIsScrolledToEnd } = usePhoneIconContext();
  const [isMobile, setIsMobile] = useState(isMobileProp !== undefined ? isMobileProp : window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const savedScrollY = useRef(0);

  // Сбрасываем состояние при переходе на другую страницу
  useEffect(() => {
    if (!isCapitalPage) {
      setIsScrolledToEnd(false);
    }
  }, [location.pathname, isCapitalPage, setIsScrolledToEnd]);

  const press = usePressEffect();
  const ensureNotBounce = useNotBounceOnce();
  const navigateWithMetrika = useNavigateWithMetrika();

  // Получаем функции скролла из контекста или пропсов (для обратной совместимости)
  const scrollFunctions = scrollContext?.scrollFunctions || {
    scrollToHero,
    scrollToAbout,
    scrollToServices,
    scrollToportfolio,
    scrollToContacts,
    scrollToDesignProjects,
    scrollToReviews,
    scrollToCalculator,
    scrollToNashiUslugi,
    scrollToCosmetic,
    scrollToCapital,
    scrollToDesigner,
    scrollToWhitebox,
  };

  // Определяем мобильную версию, если не передан пропс
  useEffect(() => {
    if (isMobileProp === undefined) {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, [isMobileProp]);

  // Определяем широкий экран (>1100px)
  useEffect(() => {
    const checkWideScreen = () => setIsWideScreen(window.innerWidth > 1100);
    checkWideScreen();
    window.addEventListener("resize", checkWideScreen);
    return () => window.removeEventListener("resize", checkWideScreen);
  }, []);

  // соответствие названий кнопок целям Метрики
  const goalsMap = {
    Главная: "nav_hero_click",
    "Калькулятор ремонта": "nav_calculator_click",
    Ремонты: "nav_repairs_click",
    Косметический: "nav_cosmetic_click",
    Капитальный: "nav_capital_click",
    Дизайнерский: "nav_designer_click",
    "Вайт бокс/Чистовая отделка": "nav_whitebox_click",
    Вайтбокс: "nav_whitebox_click", // для обратной совместимости
    "Наши последние работы": "nav_portfolio_click",
    Отзывы: "nav_reviews_click",
    "Больше наших работ": "nav_more_works_click",
    "Дизайн проекты": "nav_design_click",
  };

  const triggerNavAction = (item, behavior = "smooth") => {
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
      const targetRoute =
        item.route && item.route.startsWith("/")
          ? item.route
          : `/${item.route || ""}`;

      navigateWithMetrika(targetRoute || "/", {
        scrollTo: item.scrollKey,
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
  };

  const handleMenuSelection = (item, { behavior = "smooth" } = {}) => {
    if (!item) return;
    ensureNotBounce();
    ymGoal(goalsMap[item.name] || "nav_click");
    triggerNavAction(item, behavior);
  };

  // логотип → наверх (если нужно) + цель
  const handleLogoClick = () => {
    ensureNotBounce();
    ymGoal("nav_logo_click");
    if (isHomePage) {
      scrollFunctions.scrollToHero?.();
    } else {
      navigateWithMetrika("/");
    }
  };

  // открытие/закрытие бургера
  const changeStateBurger = () => {
    navigator.vibrate?.(30);
    setMenuOpen((prev) => {
      const next = !prev;
      // Если закрываем меню, сохраняем текущую позицию на всякий случай
      if (!next && savedScrollY.current === 0) {
        // Если позиция не была сохранена, пробуем восстановить из body.style.top
        const topValue = document.body.style.top;
        if (topValue) {
          const parsed = parseInt(topValue.replace("px", "")) || 0;
          savedScrollY.current = Math.abs(parsed);
        }
      }
      ensureNotBounce();
      ymGoal(next ? "nav_burger_open" : "nav_burger_close");
      return next;
    });
  };

  // блокировка скролла при открытом меню
  useEffect(() => {
    if (menuOpen) {
      // Сохраняем текущую позицию скролла в ref
      savedScrollY.current = window.scrollY || window.pageYOffset || 0;
      // Блокируем скролл
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Восстанавливаем скролл - сначала снимаем стили
      const scrollY = savedScrollY.current;
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Восстанавливаем позицию скролла после того как стили применятся
      // Используем requestAnimationFrame для гарантии применения стилей
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (scrollY !== undefined && scrollY !== null && scrollY >= 0) {
            window.scrollTo(0, scrollY);
          }
        });
      });
    }
    return () => {
      // Очистка при размонтировании - только если меню было открыто
      if (menuOpen) {
        const scrollY = savedScrollY.current;
        document.documentElement.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        // Восстанавливаем позицию при размонтировании
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (scrollY !== undefined && scrollY !== null && scrollY >= 0) {
              window.scrollTo(0, scrollY);
            }
          });
        });
      }
    };
  }, [menuOpen]);

  // клик вне мобильного меню — закрываем
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        // фиксируем закрытие по «вне клику»
        ymGoal("nav_burger_close_outside");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Обработчики навигации
  // Структура меню
  const menuItems = [
    { 
      name: "Главная", 
      scrollKey: "scrollToHero",
      href: scrollFunctions.scrollToHero, 
      route: "/",
      type: "link" 
    },
    { 
      name: "Калькулятор ремонта", 
      scrollKey: "scrollToCalculator",
      href: scrollFunctions.scrollToCalculator, 
      route: "/#calculator",
      type: "link" 
    },
    {
      name: "Ремонты",
      type: "submenu",
      scrollKey: "scrollToNashiUslugi",
      href: scrollFunctions.scrollToNashiUslugi,
      route: "/#nashi-uslugi",
      submenu: [
        {
          name: "Косметический",
          scrollKey: "scrollToCosmetic",
          href: scrollFunctions.scrollToCosmetic,
          route: "/#cosmetic",
        },
        {
          name: "Капитальный",
          scrollKey: "scrollToCapital",
          href: scrollFunctions.scrollToCapital,
          route: "/#capital",
        },
        {
          name: "Дизайнерский",
          scrollKey: "scrollToDesigner",
          href: scrollFunctions.scrollToDesigner,
          route: "/#designer",
        },
        {
          name: "Вайт бокс/Чистовая отделка",
          scrollKey: "scrollToWhitebox",
          href: scrollFunctions.scrollToWhitebox,
          route: "/#whitebox",
        },
      ],
    },
    { 
      name: "Наши последние работы", 
      scrollKey: "scrollToportfolio",
      href: scrollFunctions.scrollToportfolio, 
      route: "/#portfolio",
      type: "link" 
    },
    { 
      name: "Отзывы", 
      scrollKey: "scrollToReviews",
      href: scrollFunctions.scrollToReviews, 
      route: "/#reviews",
      type: "link" 
    },
    { 
      name: "Дизайн проекты", 
      scrollKey: "scrollToDesignProjects",
      href: scrollFunctions.scrollToDesignProjects, 
      route: "/#design-projects",
      type: "link" 
    },
  ];

  const colorTextHeader = "#cdcdcd";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "60px",
        backgroundColor: "#04141D",
        padding: "0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1060px",
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "20px" : "24px",
          margin: "0 auto",
          height: "100%",
          paddingLeft: isMobile ? "20px" : "24px",
          paddingRight: isMobile ? "20px" : "24px",
          fontFamily: "Arial, sans-serif", // базовый шрифт для контейнера
        }}
      >
        {/* Бургер-иконка — мобилка */}
        {isMobile && (
          <div
            ref={burgerRef}
            className="burger"
            onClick={changeStateBurger}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") changeStateBurger();
            }}
            style={{
              flexShrink: 0,
            }}
          >
            <span></span>
            <span></span>
          </div>
        )}

        {/* Название компании */}
        {(isMobile || isWideScreen) && (
          <button
            onClick={handleLogoClick}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="На главную"
          >
            <CompanyName isMobile={isMobile} />
          </button>
        )}

        {/* Навигация — десктоп */}
        {!isMobile && (
          <nav
            style={{
              display: "flex",
              gap: "1.2vw",
              flexWrap: "wrap",
            }}
          >
            {menuItems
              .filter((item) => item.type === "link" || item.type === "submenu")
              .map((item, i) => (
                <button
                  {...press}
                  onClick={() => handleMenuSelection(item)}
                  key={i}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    color: colorTextHeader,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </button>
              ))}
          </nav>
        )}

        {/* Иконка телефона справа */}
        {!isContactsPage && (
          <button
            onClick={() => {
              ensureNotBounce();
              ymGoal("nav_phone_click");
              ymNotBounce();
              navigateWithMetrika("/contacts");
            }}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              marginLeft: "auto",
              WebkitTapHighlightColor: "transparent",
            }}
            aria-label="Позвонить"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={{ display: "block" }}
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.1 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.79.59 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.21a2 2 0 0 1 2.11-.45c.86.27 1.75.47 2.65.59A2 2 0 0 1 22 16.92Z"
                fill={isCapitalPage && isScrolledToEnd ? "#FFD700" : "rgba(255,255,255,0.85)"}
                style={{
                  transition: "fill 0.3s ease",
                }}
              />
            </svg>
          </button>
        )}
      </div>

      {/* Мобильное выпадающее меню */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            {/* Фон с blur эффектом */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={changeStateBurger}
              onTouchStart={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                zIndex: 999,
                pointerEvents: "auto",
                touchAction: "none",
              }}
            />
            {/* Меню панель */}
            <motion.div
              ref={menuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94], // cubic-bezier для плавной анимации
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(4, 20, 29, 0.85)",
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
                padding: "24px",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                fontFamily: "Arial, sans-serif", // sans-serif для меню
              }}
            >
              {/* Верхняя часть с логотипом и крестиком */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                  paddingTop: "0px",
                  flexShrink: 0,
                }}
              >
                {/* Логотип */}
                <button
                  onClick={() => {
                    handleLogoClick();
                    setMenuOpen(false);
                  }}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                  aria-label="На главную"
                >
                  <img
                    src="/logo.png"
                    alt="РуссУютСтрой"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                </button>

                {/* Крестик закрытия */}
                <button
                  onClick={changeStateBurger}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    color: "rgba(255, 255, 255, 0.85)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  aria-label="Закрыть меню"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Список пунктов меню */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  paddingTop: "4px",
                }}
              >
                {menuItems.map((item, i) => (
                  <div key={i}>
                    {item.type === "submenu" ? (
                      <div
                        style={{
                          backgroundColor: "transparent",
                          borderRadius: "16px",
                          padding: "0",
                          marginTop: "8px",
                          marginBottom: "8px",
                          border: "none",
                          boxShadow: "none",
                          position: "relative",
                        }}
                      >
                        <button
                          {...press}
                          onClick={() => {
                            ensureNotBounce();
                            ymGoal(goalsMap[item.name] || "nav_click");
                            setMenuOpen(false);
                            navigator.vibrate?.(30);
                            // Выполняем навигацию/скролл после закрытия меню
                            setTimeout(() => {
                              triggerNavAction(item);
                            }, 300);
                          }}
                          style={{
                            all: "unset",
                            cursor: "pointer",
                            display: "block",
                            color: "#FFD700",
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "800",
                            fontSize: isMobile ? "16px" : "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            marginBottom: "8px",
                            textAlign: "left",
                            WebkitTapHighlightColor: "transparent",
                            padding: "0",
                            width: "100%",
                          }}
                        >
                          {item.name}
                        </button>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            paddingLeft: "12px",
                          }}
                        >
                          {item.submenu.map((subItem, j) => (
                            <button
                              {...press}
                              key={j}
                              onClick={() => {
                                ensureNotBounce();
                                ymGoal(goalsMap[subItem.name] || "nav_click");
                                setMenuOpen(false);
                                navigator.vibrate?.(30);
                                // Выполняем навигацию/скролл после закрытия меню
                                setTimeout(() => {
                                  triggerNavAction(subItem);
                                }, 300);
                              }}
                              style={{
                                all: "unset",
                                cursor: "pointer",
                                display: "block",
                                color: "rgba(255,255,255,.92)",
                                fontFamily: "Arial, sans-serif",
                                textDecoration: "none",
                                fontWeight: "500",
                                fontSize: isMobile ? "14px" : "15px",
                                textTransform: "none",
                                letterSpacing: "0.3px",
                                WebkitTapHighlightColor: "transparent",
                                padding: "0",
                                textAlign: "left",
                                lineHeight: 1.6,
                              }}
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        {...press}
                        onClick={() => {
                          ensureNotBounce();
                          ymGoal(goalsMap[item.name] || "nav_click");
                          setMenuOpen(false);
                          navigator.vibrate?.(30);
                          // Выполняем навигацию/скролл после закрытия меню
                          setTimeout(() => {
                            triggerNavAction(item);
                          }, 300);
                        }}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          display: "block",
                          color: "#fff",
                          fontFamily: "Arial, sans-serif",
                          textDecoration: "none",
                          fontWeight: "600",
                          fontSize: "16px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          WebkitTapHighlightColor: "transparent",
                          padding: "12px 0",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
