import React, { useMemo, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { useResponsiveShell } from "../../../hooks/useResponsiveShell";
import { useNotBounceOnce } from "../../../hooks/useNotBounceOnce";
import { usePressEffect } from "../../../hooks/useSomething";
import {
  createRepairPageMenuItems,
  NAV_GOALS_MAP,
} from "../../../utils/navigationConfig";
import { ymGoal } from "../../../utils/metrika";
import FullWidthImageGallery from "../../../components/blocks/FullWidthImageGallery";
import FullWidthViewportVideo from "../../../components/blocks/FullWidthViewportVideo";
import BeforeAfterSection from "../../../components/blocks/BeforeAfterSection";
import WhiteboxCalculator from "../../../components/blocks/WhiteboxCalculator";
import {
  SECTION_BACKGROUND,
  TITLE_SIZES,
  TITLE_SUBTITLE_GAP,
  TITLE_CONTENT_GAP,
} from "../../../utils/spacing";
import { WHITEBOX_WORK_GALLERY_GROUPS } from "./galleryData";

const WA_CONTACT_LINK = `https://wa.me/79264081811?text=${encodeURIComponent(
  "Здравствуйте! Хочу получить точный расчёт черновой отделки. Источник: whitebox"
)};`;
const PHONE_CONTACT_LINK = "+7 (926) 408-18-11";
const CONTACT_METHODS = [
  { value: "call", label: "Позвонить" },
  { value: "whatsapp", label: "Написать в WhatsApp" },
];

const Desktop = () => {
  const navigate = useNavigateWithMetrika();
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
  const fallbackContentWidth = shellContentWidth > 0 ? shellContentWidth : 720;

  const location = useLocation();
  const menuItems = useMemo(() => {
    return createRepairPageMenuItems(location.pathname);
  }, [location.pathname]);

  const handleSidebarSelection = (item) => {
    if (!item) return;
    ensureNotBounce();
    ymGoal(NAV_GOALS_MAP[item.name] || "nav_click");
    if (item.route) {
      navigate(item.route);
    }
  };

  const imageGeometry = "/images/repair/zelenyBor/3.webp";

  // Галерея фото для блока "Качество и практичность"
  const qualityBottomImages = [
    "/images/photolibrary/portfolio/repair/1.jpg",
    "/images/photolibrary/portfolio/repair/2.jpg",
    "/images/photolibrary/portfolio/repair/3.jpg",
  ];

  // Состояния для блока отзывов
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [displayedReviewIndex, setDisplayedReviewIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);
  const isAnimatingRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const reviewsSliderRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const sliderHeightPx = fallbackContentWidth; // Квадратный формат
  const [contactMethod, setContactMethod] = useState("call");
  const [currentWorkGalleryIndex, setCurrentWorkGalleryIndex] = useState(0);
  const [secondaryWorkGalleryIndex, setSecondaryWorkGalleryIndex] = useState(0);

  useEffect(() => {
    if (currentReviewIndex !== displayedReviewIndex) {
      isAnimatingRef.current = true;
      setIsShaking(true);
      setContentOpacity(0);

      setTimeout(() => {
        setDisplayedReviewIndex(currentReviewIndex);
        setIsShaking(false);
      }, 100);

      setTimeout(() => {
        setContentOpacity(1);
      }, 150);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 500);
    }
  }, [currentReviewIndex, displayedReviewIndex]);

  const Title = ({ children }) => (
    <h2
      style={{
        color: "#fff",
        fontSize: 44,
        marginBottom: 24,
        fontWeight: 800,
        textAlign: "left",
      }}
    >
      {children}
    </h2>
  );

  return (
    <div
      style={{
        color: "#fff",
        paddingTop: "60px",
        paddingBottom: 80,
        background: SECTION_BACKGROUND,
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
                // Обработка separator
                if (item.type === "separator") {
                  return (
                    <div
                      key={`separator-${index}`}
                      style={{
                        height: "24px",
                        width: "100%",
                      }}
                    />
                  );
                }

                return (
                  <button
                    {...press}
                    key={`${item.name}-${index}`}
                    onClick={() => handleSidebarSelection(item)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.95)",
                      fontWeight: 500,
                      fontSize: "16px",
                      letterSpacing: "0.6px",
                      textTransform: "uppercase",
                      lineHeight: 1.5,
                      padding: "4px 0",
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
            borderLeft: "1px solid rgba(255, 255, 255, 0.10)",
            borderRight: "none",
          }}
        >
          {/* Hero */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 520,
              overflow: "hidden",
            }}
          >
            <img
              src="/images/repair/zelenyBor/1.webp"
              alt="White box ремонт"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(.95)",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontSize: 56,
                  margin: 0,
                  color: "#fff",
                  textShadow: "0 0 12px rgba(0,0,0,.7)",
                  fontWeight: 800,
                  letterSpacing: 0.3,
                  whiteSpace: "pre-line",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {`Черновой ремонт под ключ`}
              </h1>
            </div>
          </div>

          {/* Описание под изображением */}
          <div
            style={{
              padding: "24px 24px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
                whiteSpace: "pre-line",
              }}
            >
            {`Мы работаем в сфере строительства с 2014 года и выполняем комплексные ремонты с точным соблюдением СНиП и ГОСТ. В команде — только профильные мастера, а черновая отделка выполняется на уровне, который обеспечивает долговечность чистовой отделки.

Черновой ремонт — это основа квартиры: стяжка пола, штукатурка, электрика, сантехника, выравнивание стен и монтаж перегородок. Качество этого этапа определяет долговечность всей последующей отделки.

Мы фиксируем стоимость в договоре, работаем прозрачно и используем проверенные материалы. Заказывая черновой ремонт у нас, вы получаете надёжную базу для будущего интерьера и уверенность в результате.`}
            </p>
          </div>

          {/* Калькулятор White Box */}
          <WhiteboxCalculator isMobile={false} />

          {/* Блок «Получить точный расчёт» */}
          <div
            style={{
              marginTop: 32,
              padding: "28px 32px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(16, 21, 36, 0.95)",
            }}
          >
            <h3
              style={{
                color: "#FFD700",
                fontSize: 24,
                margin: "0 0 14px",
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Получить точный расчёт
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 16,
                margin: "0 0 18px",
                maxWidth: "560px",
              }}
            >
              Выберите способ связи — звонок или WhatsApp. Сообщение помечается
              как заявка с блока whitebox, чтобы менеджер сразу понял, откуда
              пришёл запрос.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
                flexWrap: "wrap",
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
                Вариант связи
                <select
                  value={contactMethod}
                  onChange={(event) => setContactMethod(event.target.value)}
                  style={{
                    width: 220,
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
                  }}
                >
                  {CONTACT_METHODS.map((method) => (
                    <option
                      key={method.value}
                      value={method.value}
                      style={{ color: "#05060A" }}
                    >
                      {method.label}
                    </option>
                  ))}
                </select>
              </label>
              {contactMethod === "whatsapp" ? (
                <button
                  type="button"
                  onClick={() => window.open(WA_CONTACT_LINK, "_blank")}
                  style={{
                    borderRadius: 8,
                    border: "none",
                    background: "#FFD700",
                    color: "#05060A",
                    fontSize: 15,
                    padding: "12px 18px",
                    fontWeight: 700,
                    cursor: "pointer",
                    minHeight: 48,
                    alignSelf: "flex-end",
                  }}
                >
                  Написать в WhatsApp
                </button>
              ) : (
                <div
                  style={{
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.4)",
                    padding: "12px 16px",
                    minWidth: 220,
                    minHeight: 48,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 4,
                    background: "rgba(255,255,255,0.01)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    Телефон для звонка
                  </span>
                  <a
                    href={`tel:${PHONE_CONTACT_LINK.replace(/\D/g, "")}`}
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#FFD700",
                      textDecoration: "none",
                    }}
                  >
                    +7 (926) 408-18-11
                  </a>
                </div>
              )}
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 12,
                marginTop: 14,
              }}
            >
              Уточните, что запрос пришёл со страницы whitebox, чтобы сохранить
              связь с расчётом.
            </p>
          </div>

          {/* Почему мы? */}

          {/* Почему мы? */}
          <div
            style={{
              padding: "40px 24px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Title>Почему мы?</Title>
            <h3
              style={{
                color: "#FFD700",
                fontSize: 32,
                marginBottom: 40,
                fontWeight: 800,
                textAlign: "left",
                lineHeight: 1.3,
              }}
            >
              Мы предлагаем надёжные и качественные услуги по ремонту квартир
            </h3>
          </div>

          {/* Два дочерних блока */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "24px",
              width: "100%",
              padding: "0 24px",
              boxSizing: "border-box",
              marginBottom: 40,
            }}
          >
            {/* Левый блок - Гарантируем качество */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3 / 2",
                  overflow: "hidden",
                  marginBottom: 20,
                }}
              >
                <img
                  src="/images/confirm.jpeg"
                  alt="Гарантируем качество услуг"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <h4
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: 800,
                  marginBottom: 16,
                  textAlign: "left",
                }}
              >
                Гарантируем качество услуг
              </h4>
              <ul
                style={{
                  color: "#fff",
                  fontSize: 18,
                  lineHeight: 1.8,
                  margin: 0,
                  paddingLeft: 20,
                  listStyle: "none",
                }}
              >
                <li style={{ marginBottom: 12, position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: -20,
                      color: "#FFD700",
                    }}
                  >
                    •
                  </span>
                  Даём гарантию на выполненные работы*.
                </li>
                <li style={{ marginBottom: 12, position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: -20,
                      color: "#FFD700",
                    }}
                  >
                    •
                  </span>
                  Исправляем недостатки в выполненных работах.
                </li>
                <li style={{ marginBottom: 12, position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: -20,
                      color: "#FFD700",
                    }}
                  >
                    •
                  </span>
                  Работаем строго по СНиП и ГОСТ, используем проверенные материалы и контролируем каждый этап ремонта.
                </li>
              </ul>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginTop: 12,
                  fontStyle: "italic",
                }}
              >
                * Условия гарантии зависят от вида работ. Подробнее уточняйте при
                заключении договора.
              </p>
            </div>

            {/* Правый блок - Фиксированные цены */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3 / 2",
                  overflow: "hidden",
                  marginBottom: 20,
                }}
              >
                <img
                  src="/images/confirm1.jpeg"
                  alt="Фиксированные цены на услуги"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <h4
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: 800,
                  marginBottom: 16,
                  textAlign: "left",
                }}
              >
                Предлагаем фиксированные цены на услуги
              </h4>
              <ul
                style={{
                  color: "#fff",
                  fontSize: 18,
                  lineHeight: 1.8,
                  margin: 0,
                  paddingLeft: 20,
                  listStyle: "none",
                }}
              >
                <li style={{ marginBottom: 12, position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: -20,
                      color: "#FFD700",
                    }}
                  >
                    •
                  </span>
                  Гарантируем доступные цены на работы.
                </li>
                <li style={{ marginBottom: 12, position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: -20,
                      color: "#FFD700",
                    }}
                  >
                    •
                  </span>
                  Фиксируем цену каждой услуги и не меняем её в процессе выполнения заказа.
                </li>
                <li style={{ marginBottom: 12, position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: -20,
                      color: "#FFD700",
                    }}
                  >
                    •
                  </span>
                  Прораб согласует с вами изменение общей стоимости заказа, если в процессе его выполнения изменится набор услуг.
                </li>
              </ul>
            </div>
          </div>

          {/* Блок "Наши работы" */}
          <div
            style={{
              padding: "40px 24px 0",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                color: "#FFD700",
                fontSize: TITLE_SIZES.desktop.main,
                margin: 0,
                fontWeight: 800,
                textAlign: "left",
              }}
            >
              Наши работы
            </h2>
            <h3
              style={{
                color: "#fff",
                fontSize: TITLE_SIZES.desktop.main,
                marginTop: 8,
                marginBottom: 16,
                fontWeight: 800,
                textAlign: "left",
              }}
            >
              Черновой отделки
            </h3>
          </div>

          <FullWidthImageGallery
            images={WHITEBOX_WORK_GALLERY_GROUPS.primary.map(
              (item) => item.image
            )}
            altPrefix="Наши работы"
            isMobile={false}
            onIndexChange={setCurrentWorkGalleryIndex}
          />

          <div
            style={{
              padding: "0 24px",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: 32,
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
              }}
            >
              {
                WHITEBOX_WORK_GALLERY_GROUPS.primary[
                  currentWorkGalleryIndex %
                    WHITEBOX_WORK_GALLERY_GROUPS.primary.length
                ]?.description
              }
            </p>
          </div>

          <FullWidthImageGallery
            images={WHITEBOX_WORK_GALLERY_GROUPS.secondary.map(
              (item) => item.image
            )}
            altPrefix="Наши работы"
            isMobile={false}
            onIndexChange={setSecondaryWorkGalleryIndex}
          />

          <div
            style={{
              padding: "0 24px",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: 32,
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
              }}
            >
              {
                WHITEBOX_WORK_GALLERY_GROUPS.secondary[
                  secondaryWorkGalleryIndex %
                    WHITEBOX_WORK_GALLERY_GROUPS.secondary.length
                ]?.description
              }
            </p>
          </div>

          {/* Блок "Как мы работаем" */}
          <div
            style={{
              padding: "40px 24px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: 44,
                marginBottom: 24,
                fontWeight: 800,
                textAlign: "left",
              }}
            >
              Как мы работаем
            </h2>
          </div>

          {/* Галерея фото на всю ширину экрана */}
          <FullWidthImageGallery
            images={qualityBottomImages}
            altPrefix="Качество и практичность"
            isMobile={false}
          />

          {/* Описание */}
          <div
            style={{
              padding: "0 24px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
                marginBottom: 16,
              }}
            >
              Мы делаем ремонт рационально и качественно — так, чтобы он служил
              десятилетиями без переделок.
            </p>
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
                marginBottom: 16,
              }}
            >
              На черновом этапе готовим помещение под чистовую отделку: выполняем
              демонтаж при необходимости, выравниваем стены, пол и потолок, делаем
              стяжку, прокладываем электроточки, сантехнику, слаботочку и отопление.
              Все работы идут строго по проекту, с учётом мебели, техники и будущего
              интерьера.
            </p>
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
                marginBottom: 16,
              }}
            >
              Мы подбираем материалы с оптимальным балансом цена/качество, чтобы
              вы не переплачивали, но получали результат уровня премиум.
            </p>
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
                marginBottom: 16,
              }}
            >
              Скрытые работы документируем: делаем фото, видео и акты, чтобы каждый
              этап был прозрачен и понятен.
            </p>
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
                marginBottom: 16,
              }}
            >
              Заранее подготавливаем ниши, закладные, усиления и скрытые элементы
              под свет, карнизы, кондиционеры и двери — это позволяет чистовой
              отделке ложиться ровно, а всему проекту реализовываться без
              доработок.
            </p>
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
              }}
            >
              В результате вы получаете ремонт, в котором каждая деталь продумана,
              технически верна и готова к долгой эксплуатации.
            </p>
          </div>

          <div
            style={{
              padding: "0 24px",
              width: "100%",
              boxSizing: "border-box",
              marginTop: 20,
            }}
          >
            <h3
              style={{
                color: "#FFD700",
                fontSize: TITLE_SIZES.desktop.service,
                margin: 0,
                fontWeight: 800,
                textAlign: "left",
              }}
            >
              Видео с объекта
            </h3>
          </div>

          <FullWidthViewportVideo
            videoSrc="/videos/1.mp4"
            containerStyle={{ marginTop: 24 }}
          />

          {/* Блок с призывом к действию */}
          <div
            style={{
              position: "relative",
              width: "100%",
              marginTop: 40,
              overflow: "hidden",
            }}
          >
            <img
              src={imageGeometry}
              alt="Получите расчет"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.8)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "60px 40px",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  color: "#fff",
                  fontSize: 40,
                  fontWeight: 800,
                  margin: 0,
                  marginBottom: 14,
                  lineHeight: 1.3,
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                }}
              >
                Получите точный расчет
                <br />
                <span style={{ color: "#FFD700" }}>за наш счет</span> в течение
                1-2
                <br />
                дней после звонка
              </h2>
              <a
                href="tel:+79264081811"
                style={{
                  color: "#fff",
                  fontSize: 48,
                  fontWeight: 700,
                  textDecoration: "none",
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                }}
              >
                +7 (926) 408-18-11
              </a>
            </div>
          </div>

          {/* Блок "Последние работы" */}
          <BeforeAfterSection
            isMobile={false}
            sectionId="portfolio"
            sliderContainerRef={sliderContainerRef}
            firstImage="/images/photolibrary/portfolio/designer/1/1.jpg"
            secondImage="/images/photolibrary/portfolio/designer/1/2.jpg"
            title="Последние работы"
            subtitle="Дизайнерский ремонт в Москве на Большой Спасской"
            footerDescription="Полная перепланировка, отделка стен и потолка, замена окон и дверей, укладка паркетной доски, установка современного освещения"
            sliderHeightPx={sliderHeightPx}
            marginTop="20px"
            headerTitleStyle={{
              fontSize: TITLE_SIZES.desktop.main,
              whiteSpace: "nowrap",
            }}
            headerSubtitleStyle={{
              fontSize: "22px",
            }}
          />

          <BeforeAfterSection
            isMobile={false}
            firstImage="/images/photolibrary/portfolio/capital/2/1.jpg"
            secondImage="/images/photolibrary/portfolio/capital/2/7.jpg"
            subtitle="Комплексный ремонт квартиры с акцентом на современный минимализм, Москва, ЖК «Символ»"
            footerDescription="Демонтаж старых покрытий и коммуникаций, полная замена электрики и сантехники, выравнивание стен и устройство скрытых дверей, монтаж потолков с освещением, укладка напольного покрытия, облицовка санузла плиткой под мрамор с декоративными элементами"
            sliderHeightPx={sliderHeightPx}
            marginTop="8px"
            headerSubtitleStyle={{
              fontSize: "22px",
            }}
          />

          {/* Обертка для Отзывов и "С заботой о вас" */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "0",
              alignItems: "stretch",
            }}
          >
            {/* Отзывы */}
            <section
              style={{
                width: "40%",
                margin: "0",
                padding: "50px 24px 20px",
                boxSizing: "border-box",
                flex: "0 0 40%",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  marginBottom: 18,
                }}
              >
                <h2
                  style={{
                    fontSize: TITLE_SIZES.desktop.main,
                    fontWeight: 900,
                    margin: 0,
                    color: "#FFD700",
                    lineHeight: 1.1,
                    letterSpacing: "-0.5px",
                    textShadow: "0 2px 8px rgba(255,215,0,0.2)",
                  }}
                >
                  Отзывы
                </h2>
                <div
                  style={{
                    fontSize: "22px",
                    color: "rgba(255,255,255,0.9)",
                    marginTop: 8,
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

                const getInitials = (name) => {
                  const parts = name.split(" ");
                  if (parts.length >= 2) {
                    return (parts[0][0] + parts[1][0]).toUpperCase();
                  }
                  return name[0].toUpperCase();
                };

                const getAvatarColor = (name) => {
                  return "#5a6b78";
                };

                const handleStart = (clientX) => {
                  touchStartX.current = clientX;
                };

                const handleMove = (clientX) => {
                  touchEndX.current = clientX;
                };

                const handleEnd = () => {
                  if (!touchStartX.current || !touchEndX.current) return;

                  if (isAnimatingRef.current) {
                    touchStartX.current = 0;
                    touchEndX.current = 0;
                    return;
                  }

                  const distance = touchStartX.current - touchEndX.current;
                  const minSwipeDistance = 50;

                  if (distance > minSwipeDistance) {
                    if (navigator.vibrate) {
                      navigator.vibrate(50);
                    }
                    setCurrentReviewIndex((prev) =>
                      prev < reviews.length - 1 ? prev + 1 : 0
                    );
                  } else if (distance < -minSwipeDistance) {
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

                const cardStyle = {
                  borderRadius: 16,
                  background: SECTION_BACKGROUND,
                  border: "1px solid rgba(255,255,255,.1)",
                  boxShadow: "0 8px 24px rgba(0,0,0,.4)",
                  padding: "18px 26px 18px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  position: "relative",
                  animation: isShaking ? "shake 0.3s ease-in-out" : "none",
                  touchAction: "pan-y",
                  userSelect: "none",
                  cursor: "grab",
                };

                const cardContentStyle = {
                  opacity: contentOpacity,
                  transition: "opacity 0.1s ease-in-out",
                  position: "relative",
                  zIndex: 1,
                };

                const indicatorStyle = {
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: SECTION_BACKGROUND,
                  border: "1px solid rgba(255,255,255,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 700,
                  fontSize: 14,
                  opacity: 1,
                  zIndex: 10,
                  pointerEvents: "none",
                };

                const nameStyle = {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                };

                const avatarStyle = {
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: getAvatarColor(displayedReview.name),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
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
                  fontSize: 18,
                  color: "#fff",
                };

                const placeStyle = {
                  color: "#FFD700",
                  fontSize: 13,
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
                  fontSize: 15,
                  lineHeight: 1.6,
                };

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
                      <div style={cardStyle}>
                        <div style={indicatorStyle}>
                          {currentReviewIndex + 1}/{reviews.length}
                        </div>

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
                                    size={14}
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

            {/* С заботой о вас */}
            <section
              style={{
                scrollMarginTop: "54px",
                width: "60%",
                backgroundColor: SECTION_BACKGROUND,
                paddingTop: "50px",
                paddingBottom: "50px",
                marginTop: "0",
                position: "relative",
                boxSizing: "border-box",
                flex: "0 0 60%",
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
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    boxSizing: "border-box",
                    marginBottom: TITLE_CONTENT_GAP.desktop,
                  }}
                >
                  <h2
                    style={{
                      fontSize: TITLE_SIZES.desktop.main,
                      fontWeight: "900",
                      color: "#FFD700",
                      margin: `0 0 ${TITLE_SUBTITLE_GAP.desktop} 0`,
                      lineHeight: 1.1,
                      letterSpacing: "-0.5px",
                      textShadow: "0 2px 8px rgba(255,215,0,0.2)",
                    }}
                  >
                    С заботой о вас
                  </h2>
                  <p
                    style={{
                      fontSize: "22px",
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
                  showSoundToggle={true}
                />

                <div
                  style={{
                    width: "100%",
                    maxWidth: "1400px",
                    margin: "0",
                    paddingTop: TITLE_CONTENT_GAP.desktop,
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    boxSizing: "border-box",
                  }}
                >
                  <p
                    style={{
                      fontSize: "20px",
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
        </main>
      </div>
    </div>
  );
};

export default Desktop;
