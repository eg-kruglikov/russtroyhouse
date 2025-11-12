import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionModal from "../../components/windows/FeedbackModal";
import Map from "../../components/blocks/Map";
import Footer from "../../components/blocks/Footer";
import { usePressEffect } from "../../hooks/useSomething";
import { ymGoal } from "../../utils/metrika";
import { useMetrikaActivity } from "../../hooks/useMetrikaActivity";
import { useResponsiveShell } from "../../hooks/useResponsiveShell";
import { useNotBounceOnce } from "../../hooks/useNotBounceOnce";
import { useNavigateWithMetrika } from "../../hooks/useNavigateWithMetrika";
import { createMenuItems, NAV_GOALS_MAP } from "../../utils/navigationConfig";
import officeMain from "../../assets/office_main.jpg";
import { SECTION_BACKGROUND } from "../../utils/spacing";

const WA_LINK = `https://wa.me/79264081811?text=${encodeURIComponent(
  "Здравствуйте! Хочу обсудить ремонт."
)}`;
const TG_CHANNEL = "https://t.me/russtroyhouse";

// ====== СТИЛИ ======
const deep = SECTION_BACKGROUND;
const yellow = "#FFD700";
const whiteSoft = "rgba(255,255,255,.9)";
const borderSoft = "1px solid rgba(255,255,255,.10)";

const Page = {
  minHeight: "100vh",
  paddingTop: "60px",
  background: deep,
  color: "#fff",
  fontFamily: "'Arial', sans-serif",
};

// удалён локальный Header — используется глобальный Header из приложения
const H1 = {
  fontSize: 28,
  textAlign: "center",
  margin: "8px 0 6px",
  fontWeight: 800,
};
const Lead = {
  textAlign: "center",
  opacity: 0.9,
  fontSize: 14,
  marginBottom: 18,
  lineHeight: 1.45,
};
const Cards = { display: "grid", gap: 16 };
const Card = {
  borderRadius: 0,
  background: "transparent",
  boxShadow: "none",
  border: "none",
  padding: 0,
};
const CardHead = { fontWeight: 900, fontSize: 20, marginBottom: 10 };
const CardText = {
  opacity: 0.95,
  lineHeight: 1.6,
  fontSize: 15,
  marginBottom: 12,
};
const BtnWrap = { display: "flex", justifyContent: "center", width: "100%" };

const BtnBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "12px 20px",
  borderRadius: 12,
  fontWeight: 800,
  fontSize: 15,
  cursor: "pointer",
  textDecoration: "none",
  boxShadow: "0 6px 18px rgba(0,0,0,.2)",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
};

const BtnFilled = {
  ...BtnBase,
  background: yellow,
  color: deep,
  border: "none",
};
const BtnOutline = {
  ...BtnBase,
  background: "transparent",
  color: "#fff",
  border: "2px solid rgba(255,255,255,.9)",
};

const IconPhone = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.1 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.79.59 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.21a2 2 0 0 1 2.11-.45c.86.27 1.75.47 2.65.59A2 2 0 0 1 22 16.92Z"
      fill={deep}
    />
  </svg>
);

const ContactsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [numberDisplayed, setNumberDisplayed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const [activeScrollKey, setActiveScrollKey] = useState(null);
  const press = usePressEffect();
  const ensureNotBounce = useNotBounceOnce();
  const navigateWithMetrika = useNavigateWithMetrika();
  const {
    contentWidth: shellContentWidth,
    layoutPadding,
    showSidebar,
    sidebarWidth,
  } = useResponsiveShell();
  const sidebarGap = 0;
  const containerShift = showSidebar ? -(sidebarWidth + sidebarGap) / 2 : 0;
  const fallbackContentWidth = shellContentWidth > 0 ? shellContentWidth : 720;

  // Отслеживаем активность пользователя (скролл, время на странице)
  useMetrikaActivity();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showNumber = () => {
    if (!numberDisplayed) {
      ymGoal("call_confirmed");
      setNumberDisplayed(true);
    }
  };

  const confirmCall = () => {
    ymGoal("call_confirmed");
    window.location.href = "tel:+79264081811";
  };

  // универсальная кнопка
  const Btn = ({ children, href, onClick, outline, icon }) => {
    const style = outline ? BtnOutline : BtnFilled;
    if (href) {
      return (
        <div style={BtnWrap}>
          <a
            {...press}
            href={href}
            style={{ ...press.style, ...style }}
            rel="noopener noreferrer"
            target={href.startsWith("http") ? "_blank" : undefined}
            onClick={onClick}
          >
            {icon}
            <span>{children}</span>
          </a>
        </div>
      );
    }
    return (
      <div style={BtnWrap}>
        <button
          {...press}
          style={{ ...press.style, ...style }}
          onClick={onClick}
        >
          {icon}
          <span>{children}</span>
        </button>
      </div>
    );
  };

  // обёртка для целей
  const wrap =
    (cb, goalName, extra = {}) =>
    (e) => {
      if (e && e.preventDefault) e.preventDefault();
      ymGoal(goalName, extra);
      setTimeout(() => cb?.(), 150); // задержка, чтобы успел отработать reachGoal
    };

  // Меню для sidebar
  const menuItems = useMemo(() => createMenuItems({}), []);

  const handleSidebarSelection = (item) => {
    if (!item) return;
    ensureNotBounce();
    ymGoal(NAV_GOALS_MAP[item.name] || "nav_click");
    if (item.route) {
      navigateWithMetrika(item.route);
    }
  };

  return (
    <div style={Page}>
      <QuestionModal
        isOpen={questioModalOpen}
        onClose={() => setQuestioModalOpen(false)}
        isMobile={isMobile}
      />

      {/* локальная шапка удалена */}

      {/* Main */}
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
          transform: showSidebar ? `translateX(${containerShift}px)` : undefined,
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
            padding: "20px 0",
          }}
        >
          <div style={Cards}>
          {/* Акция */}
          <section style={{ ...Card }}>
            <div
              style={{
                ...CardHead,
                color: yellow,
                fontSize: 28,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Акция осени
              <span style={{ fontSize: 28 }}>🍂</span>
            </div>
            <div
              style={{
                ...CardText,
                fontSize: 15,
                fontWeight: 600,
                opacity: 0.9,
                marginBottom: 14,
                paddingLeft: 12,
                borderLeft: "3px solid rgba(255,215,0,.5)",
              }}
            >
              Пока конкуренты повышают цены на зиму — мы даём скидки!
              Зафиксируйте выгодную стоимость сейчас.
            </div>
            <div style={{ ...CardText, fontSize: 16, fontWeight: 500 }}>
              Скажите{" "}
              <span style={{ color: "#ffffff", fontWeight: 800 }}>
                "Ремонт 2025"
              </span>{" "}
              при первом звонке и получите{" "}
              <span style={{ color: yellow, fontWeight: 800 }}>
                скидку до 7%
              </span>{" "}
              на любой вид ремонта!
            </div>
            <div
              style={{
                padding: 0,
                borderRadius: 0,
                background: "transparent",
                border: "none",
                fontSize: 13,
                opacity: 0.85,
                textAlign: "left",
                marginBottom: 8,
              }}
            >
              ⏰ Акция действует до конца календарной осени.
            </div>
          </section>

          {/* Кнопки связи */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <button
              {...press}
              onClick={() => setQuestioModalOpen(true)}
              style={{
                ...press.style,
                background: "transparent",
                border: "none",
                color: "#FFD700",
                fontSize: 19,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
                transition: "all 0.2s ease",
                padding: 0,
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Заказать звонок
            </button>

            <button
              {...press}
              onClick={() => {
                if (isMobile) confirmCall();
                else showNumber();
              }}
              style={{
                ...press.style,
                background: "transparent",
                border: "none",
                color: "#FFD700",
                fontSize: 19,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
                transition: "all 0.2s ease",
                padding: 0,
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {numberDisplayed ? "+7 (926) 408-18-11" : "Позвонить"}
            </button>

            <button
              {...press}
              onClick={wrap(
                () => window.open(WA_LINK, "_blank"),
                "lead_whatsapp"
              )}
              style={{
                ...press.style,
                background: "transparent",
                border: "none",
                color: "#FFD700",
                fontSize: 19,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
                transition: "all 0.2s ease",
                padding: 0,
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Написать в WhatsApp
            </button>
          </div>

          <div
            style={{
              marginTop: 28,
              width: "100%",
              overflow: "hidden",
              borderRadius: "0px",
            }}
          >
            <img
              src={officeMain}
              alt="Офис РусСтройХаус"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
            />
          </div>

          <div
            style={{
              marginTop: 18,
              textAlign: "left",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            МОСКОВСКАЯ ОБЛАСТЬ, Г. КОРОЛЁВ, УЛ ПРОСПЕКТ КОРОЛЁВА 5Д, ТРЦ —
            СТАТУС, 3 ЭТАЖ, ОФИС 315
            <div
              style={{
                marginTop: 6,
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              Будем рады видеть вас в гостях.
            </div>
          </div>

          {/* Кнопка На главную удалена */}
          </div>

          {/* Карта и контакты */}
          <div
            style={{
              position: "relative",
              margin: "28px 0 32px",
              width: "100%",
            }}
          >
            <Map />
          </div>
        </main>
      </div>

      <Footer showAddress={false} />
    </div>
  );
};

export default ContactsPage;
