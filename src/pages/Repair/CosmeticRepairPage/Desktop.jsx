import React, { useMemo } from "react";
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
import {
  SECTION_BACKGROUND,
  TITLE_SIZES,
  TITLE_COLOR,
} from "../../../utils/spacing";

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

  const atmosphereImages = [
    "/images/photolibrary/portfolio/cosmetic/1/1.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/2.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/3.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/4.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/5.jpg",
  ];

  const processImages = [
    "/images/photolibrary/portfolio/cosmetic/2/1.jpg",
    "/images/photolibrary/portfolio/cosmetic/2/2.jpg",
    "/images/photolibrary/portfolio/cosmetic/2/3.jpg",
    "/images/photolibrary/portfolio/cosmetic/2/4.jpg",
  ];

  const detailImages = [
    "/images/photolibrary/portfolio/cosmetic/1/3.jpg",
    "/images/photolibrary/portfolio/cosmetic/2/1.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/5.jpg",
  ];

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
              alt="Косметический ремонт"
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
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Косметический ремонт
              </h1>
            </div>
          </div>

          {/* Что входит */}
          <div
            style={{
              padding: "24px 24px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: TITLE_SIZES.desktop.service,
                fontWeight: 700,
                margin: "0 0 24px 0",
                textAlign: "left",
              }}
            >
              Что входит?
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                "Демонтаж старых покрытий со стен, потолка, пола.",
                "Шпатлевка, грунтовка, выравнивание стен, потолка и пола.",
                "Оклейка стен обоями, обновление краски, напольного покрытия.",
                "Монтаж сантехники без разводки коммуникаций.",
                "Выполнение частичной разводки электросетей, установка розеток, светильников.",
                "Замена плинтусов и наличников",
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      minWidth: "20px",
                      flexShrink: 0,
                    }}
                  >
                    <path
                      d="M2 8L7 13L18 2"
                      stroke="#FFD700"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      lineHeight: 1.6,
                      margin: 0,
                      textAlign: "left",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Примеры */}
          <div
            style={{
              padding: "40px 24px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h2
              style={{
                color: TITLE_COLOR,
                fontSize: 44,
                marginBottom: 24,
                fontWeight: 800,
                textAlign: "left",
              }}
            >
              Примеры
            </h2>
          </div>

          {/* Атмосфера интерьера */}
          <div
            style={{
              padding: "0 24px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Title>Атмосфера и уют</Title>
          </div>

          <FullWidthImageGallery
            images={atmosphereImages}
            altPrefix="Атмосфера косметического ремонта"
            isMobile={false}
          />

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
              }}
            >
              Обновляем покрытия, освежаем фактуры и делаем интерьеры светлее —
              от аккуратной поклейки до замены плинтусов и освещения.
            </p>
          </div>

          {/* Этапы */}
          <div
            style={{
              padding: "40px 24px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Title>Этапы обновления</Title>
          </div>

          <FullWidthImageGallery
            images={processImages}
            altPrefix="Этапы косметического ремонта"
            isMobile={false}
          />

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
              }}
            >
              Начинаем с осмотра и сметы, затем подготавливаем поверхности,
              следим за чистотой монтажа и сдаём готовую квартиру с минимальным
              простоем.
            </p>
          </div>

          {/* Детали */}
          <div
            style={{
              padding: "40px 24px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Title>Детали и аккуратность</Title>
          </div>

          <FullWidthImageGallery
            images={detailImages}
            altPrefix="Детали косметического ремонта"
            isMobile={false}
          />

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
              }}
            >
              Рабочая группа следит за мелочами: выверяем стыки, наводим чистоту
              и сдаём объект в состоянии «можно заезжать».
            </p>
          </div>

          {/* Сроки и стоимость — блок 1 в 1 */}
          <div
            style={{
              padding: "40px 24px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Title>Сроки и стоимость</Title>
          </div>

          <div
            style={{
              marginBottom: 20,
              width: "100%",
            }}
          >
            <img
              src="/images/photolibrary/portfolio/capital/1.jpg"
              alt="Сроки и стоимость"
              style={{
                width: "100%",
                aspectRatio: "1280 / 960",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

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
              Средняя цена косметического ремонта — около 6 000 ₽ за м². Это
              базовый ориентир: итог зависит от выбранных материалов и объёма
              работ.
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
              Примерную стоимость ремонта можно рассчитать в нашем калькуляторе
              на главной странице.
            </p>
            <p
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.6,
                margin: 0,
                textAlign: "left",
                marginBottom: 16,
                borderLeft: "2px solid #FFD700",
                paddingLeft: 18,
              }}
            >
              Для точной сметы свяжитесь с нами любым удобным способом на
              странице{" "}
              <a
                href="/contacts"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/contacts");
                }}
                style={{
                  color: "#FFD700",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                контактов
              </a>
              .
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
              Сроки определяются после личной консультации и фиксируются в
              смете.
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
              Мы держим слово и остаёмся ответственными за результат.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Desktop;
