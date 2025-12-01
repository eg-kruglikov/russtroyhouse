import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [isMobile, setIsMobile] = useState(false);
  const [callbackTime, setCallbackTime] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("+7");
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [callbackError, setCallbackError] = useState("");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
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

  const confirmCall = () => {
    ymGoal("call_confirmed");
    window.location.href = "tel:+79264081811";
  };

  const handleCallbackPhoneChange = (e) => {
    let value = e.target.value;

    // Гарантируем, что номер начинается с +7
    if (!value.startsWith("+7")) return;

    // Удаляем все символы кроме цифр (оставляя префикс +7)
    const digits = value.replace(/[^\d]/g, "").slice(1); // всё после +7

    const formatted = `+7${digits}`;
    setCallbackPhone(formatted);

    if (digits.length !== 10) {
      setCallbackError("Введите корректный номер телефона");
    } else {
      setCallbackError("");
    }
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();

    if (!callbackTime) {
      setCallbackError("Выберите время для звонка");
      return;
    }

    if (callbackPhone.length !== 12 || callbackError) {
      setCallbackError("Проверьте правильность номера");
      return;
    }

    const phoneDigitsOnly = callbackPhone.replace(/\D/g, "");
    if (phoneDigitsOnly.length < 10) {
      setCallbackError("Введите корректный номер телефона (минимум 10 цифр)");
      return;
    }

    setCallbackError("");
    setCallbackLoading(true);

    const token = import.meta.env.VITE_TELEGRAM_TOKEN;
    const chatIds = [
      import.meta.env.VITE_TELEGRAM_CHAT_ID_EGOR,
      // import.meta.env.VITE_TELEGRAM_CHAT_ID_ANTON,
    ];
    const now = new Date().toLocaleString("ru-RU");
    const message = `📞 Новая заявка на обратный звонок с сайта:\n\n📱 Телефон: ${callbackPhone}\n⏰ Время для звонка: ${callbackTime}\n🕐 Время заявки: ${now}`;

    try {
      for (const id of chatIds) {
        if (id) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: id,
              text: message,
            }),
          });
        }
      }
      ymGoal("form_sent");
      setCallbackSubmitted(true);
      setCallbackPhone("+7");
      setCallbackTime("");
      setTimeout(() => {
        setCallbackSubmitted(false);
      }, 3000);
    } catch (err) {
      setCallbackError("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setCallbackLoading(false);
    }
  };

  const timeSlots = [
    "с 9 до 11",
    "с 11 до 13",
    "с 13 до 15",
    "с 15 до 17",
    "с 17 до 19",
  ];

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
              border: "none",
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
                  return (
                    <div
                      key={`${item.name}-${index}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
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
                              fontWeight: 500,
                              fontSize: "16px",
                              letterSpacing: "0.6px",
                              textTransform: "uppercase",
                              padding: "4px 0",
                              transition: "color 0.2s ease",
                            }}
                          >
                            {subItem.name}
                          </button>
                        );
                      })}
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
                      fontWeight: 500,
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
            borderLeft: "1px solid rgba(255, 255, 255, 0.10)",
            borderRight: "none",
          }}
        >
          <div style={{ ...Cards, paddingLeft: isMobile ? "20px" : "24px", paddingRight: isMobile ? "20px" : "24px", boxSizing: "border-box" }}>
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
          {isMobile ? (
            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* Разделительная линия перед номером телефона */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.12)",
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />

              {/* Блок 1: Номер телефона на мобиле */}
              <a
                href="tel:+79264081811"
                onClick={() => {
                  ymGoal("call_confirmed");
                }}
                style={{
                  color: "#fff",
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: 1.5,
                  fontFamily: "Arial, sans-serif",
                  paddingBottom: 20,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                +7 (926) 408-18-11
              </a>

              {/* Разделительная линия 1 */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.12)",
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />

              {/* Блок 2: Кнопка WhatsApp */}
              <button
                {...press}
                onClick={wrap(
                  () => window.open(WA_LINK, "_blank"),
                  "lead_whatsapp"
                )}
                style={{
                  ...press.style,
                  borderRadius: 8,
                  border: "1px solid #FFD700",
                  background: "transparent",
                  color: "#fff",
                  fontSize: 15,
                  padding: "12px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  minHeight: 48,
                  alignSelf: "flex-start",
                  textAlign: "left",
                }}
              >
                Написать в WhatsApp
              </button>

              {/* Разделительная линия 2 */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.12)",
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />

              {/* Блок 3: Кнопка Telegram */}
              <button
                {...press}
                onClick={wrap(
                  () => window.open(TG_CHANNEL, "_blank"),
                  "contacts_telegram_channel"
                )}
                style={{
                  ...press.style,
                  borderRadius: 8,
                  border: "1px solid #FFD700",
                  background: "transparent",
                  color: "#fff",
                  fontSize: 15,
                  padding: "12px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  minHeight: 48,
                  alignSelf: "flex-start",
                  textAlign: "left",
                }}
              >
                Наш Telegram канал
              </button>

              {/* Разделительная линия 3 */}
              <div
                style={{
                  marginTop: 20,
                  marginBottom: 12,
                  height: 1,
                  background: "rgba(255,255,255,0.12)",
                  width: "100%",
                }}
              />
            </div>
          ) : (
            /* Десктоп: одна плитка для всех трех элементов */
            <div
              style={{
                marginTop: 16,
                padding: "28px 32px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(16, 21, 36, 0.95)",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* Блок 1: Номер телефона */}
              <a
                href="tel:+79264081811"
                onClick={() => {
                  ymGoal("call_confirmed");
                }}
                style={{
                  color: "#fff",
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: 1.5,
                  fontFamily: "Arial, sans-serif",
                  paddingBottom: 20,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                +7 (926) 408-18-11
              </a>

              {/* Разделительная линия 1 */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.12)",
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />

              {/* Блок 2: Кнопка WhatsApp */}
              <button
                {...press}
                onClick={wrap(
                  () => window.open(WA_LINK, "_blank"),
                  "lead_whatsapp"
                )}
                style={{
                  ...press.style,
                  borderRadius: 8,
                  border: "1px solid #FFD700",
                  background: "transparent",
                  color: "#fff",
                  fontSize: 15,
                  padding: "12px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  minHeight: 48,
                  alignSelf: "flex-start",
                  textAlign: "left",
                }}
              >
                Написать в WhatsApp
              </button>

              {/* Разделительная линия 2 */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.12)",
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />

              {/* Блок 3: Кнопка Telegram */}
              <button
                {...press}
                onClick={wrap(
                  () => window.open(TG_CHANNEL, "_blank"),
                  "contacts_telegram_channel"
                )}
                style={{
                  ...press.style,
                  borderRadius: 8,
                  border: "1px solid #FFD700",
                  background: "transparent",
                  color: "#fff",
                  fontSize: 15,
                  padding: "12px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  minHeight: 48,
                  alignSelf: "flex-start",
                  textAlign: "left",
                }}
              >
                Наш Telegram канал
              </button>

              {/* Разделительная линия 3 */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.12)",
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />

              {/* Блок 4: Форма обратного звонка внутри плитки на десктопе */}
              <div>
              <h3
                style={{
                  color: "#FFD700",
                  fontSize: isMobile ? 22 : 24,
                  margin: "0 0 14px",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Обратный звонок
              </h3>

              {callbackSubmitted ? (
                <p
                  style={{
                    color: "#FFD700",
                    fontSize: 16,
                    textAlign: "left",
                    margin: 0,
                  }}
                >
                  Спасибо! Мы свяжемся с вами в указанное время.
                </p>
              ) : (
                <form
                  onSubmit={handleCallbackSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    Время для звонка
                    <select
                      value={callbackTime}
                      onChange={(e) => setCallbackTime(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.4)",
                        background: "rgba(255,255,255,0.04)",
                        color: "#fff",
                        fontSize: 15,
                        padding: "10px 14px",
                        appearance: "none",
                        cursor: "pointer",
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M1 1 L5 5 L9 1\' stroke=\'%23ffffff\' stroke-width=\'1.5\' stroke-linecap=\'round\' fill=\'none\'/%3E%3C/svg%3E")',
                        backgroundPosition: "calc(100% - 16px) 50%",
                        backgroundRepeat: "no-repeat",
                        paddingRight: 36,
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="" style={{ color: "#05060A" }}>
                        Выберите время
                      </option>
                      {timeSlots.map((slot) => (
                        <option
                          key={slot}
                          value={slot}
                          style={{ color: "#05060A" }}
                        >
                          {slot}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    Номер телефона
                    <input
                      type="tel"
                      value={callbackPhone}
                      onChange={handleCallbackPhoneChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        border: callbackError
                          ? "1px solid #ff6b6b"
                          : "1px solid rgba(255,255,255,0.4)",
                        background: "rgba(255,255,255,0.04)",
                        color: "#fff",
                        fontSize: 15,
                        padding: "10px 14px",
                        boxSizing: "border-box",
                      }}
                    />
                  </label>

                  {callbackError && (
                    <p
                      style={{
                        color: "#ff6b6b",
                        fontSize: 13,
                        margin: 0,
                        textAlign: "left",
                      }}
                    >
                      {callbackError}
                    </p>
                  )}

                  <button
                    {...press}
                    type="submit"
                    disabled={callbackLoading}
                    style={{
                      ...press.style,
                      borderRadius: 8,
                      border: "1px solid #FFD700",
                      background: "transparent",
                      color: "#fff",
                      fontSize: 15,
                      padding: "12px 18px",
                      fontWeight: 700,
                      cursor: callbackLoading ? "not-allowed" : "pointer",
                      minHeight: 48,
                      alignSelf: "flex-start",
                      opacity: callbackLoading ? 0.5 : 1,
                    }}
                  >
                    {callbackLoading ? "Отправка..." : "Отправить"}
                  </button>
                </form>
              )}
              </div>
            </div>
          )}

          {/* Блок 3: Форма обратного звонка для мобильной версии */}
          {isMobile && (
            <div
              style={{
                padding: "24px 0",
              }}
            >
              <h3
                style={{
                  color: "#FFD700",
                  fontSize: 22,
                  margin: "0 0 14px",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Обратный звонок
              </h3>

              {callbackSubmitted ? (
                <p
                  style={{
                    color: "#FFD700",
                    fontSize: 16,
                    textAlign: "left",
                    margin: 0,
                  }}
                >
                  Спасибо! Мы свяжемся с вами в указанное время.
                </p>
              ) : (
                <form
                  onSubmit={handleCallbackSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    Время для звонка
                    <select
                      value={callbackTime}
                      onChange={(e) => setCallbackTime(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.4)",
                        background: "rgba(255,255,255,0.04)",
                        color: "#fff",
                        fontSize: 15,
                        padding: "10px 14px",
                        appearance: "none",
                        cursor: "pointer",
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M1 1 L5 5 L9 1\' stroke=\'%23ffffff\' stroke-width=\'1.5\' stroke-linecap=\'round\' fill=\'none\'/%3E%3C/svg%3E")',
                        backgroundPosition: "calc(100% - 16px) 50%",
                        backgroundRepeat: "no-repeat",
                        paddingRight: 36,
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="" style={{ color: "#05060A" }}>
                        Выберите время
                      </option>
                      {timeSlots.map((slot) => (
                        <option
                          key={slot}
                          value={slot}
                          style={{ color: "#05060A" }}
                        >
                          {slot}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    Номер телефона
                    <input
                      type="tel"
                      value={callbackPhone}
                      onChange={handleCallbackPhoneChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        border: callbackError
                          ? "1px solid #ff6b6b"
                          : "1px solid rgba(255,255,255,0.4)",
                        background: "rgba(255,255,255,0.04)",
                        color: "#fff",
                        fontSize: 15,
                        padding: "10px 14px",
                        boxSizing: "border-box",
                      }}
                    />
                  </label>

                  {callbackError && (
                    <p
                      style={{
                        color: "#ff6b6b",
                        fontSize: 13,
                        margin: 0,
                        textAlign: "left",
                      }}
                    >
                      {callbackError}
                    </p>
                  )}

                  <button
                    {...press}
                    type="submit"
                    disabled={callbackLoading}
                    style={{
                      ...press.style,
                      borderRadius: 8,
                      border: "1px solid #FFD700",
                      background: "transparent",
                      color: "#fff",
                      fontSize: 15,
                      padding: "12px 18px",
                      fontWeight: 700,
                      cursor: callbackLoading ? "not-allowed" : "pointer",
                      minHeight: 48,
                      alignSelf: "flex-start",
                      opacity: callbackLoading ? 0.5 : 1,
                    }}
                  >
                    {callbackLoading ? "Отправка..." : "Отправить"}
                  </button>
                </form>
              )}
            </div>
          )}
          </div>

          {/* Изображение офиса - без отступов */}
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

          {/* Адрес - с отступами */}
          <div
            style={{
              marginTop: 18,
              paddingLeft: isMobile ? "20px" : "24px",
              paddingRight: isMobile ? "20px" : "24px",
              textAlign: "left",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.5,
              boxSizing: "border-box",
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
