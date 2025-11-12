// src/pages/RepairCapital/Desktop.jsx
import React, { useMemo } from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { useResponsiveShell } from "../../../hooks/useResponsiveShell";
import { useNotBounceOnce } from "../../../hooks/useNotBounceOnce";
import { usePressEffect } from "../../../hooks/useSomething";
import { createMenuItems, NAV_GOALS_MAP } from "../../../utils/navigationConfig";
import { ymGoal } from "../../../utils/metrika";
import FullWidthImageGallery from "../../../components/blocks/FullWidthImageGallery";
import FullWidthViewportVideo from "../../../components/blocks/FullWidthViewportVideo";
import { SECTION_BACKGROUND } from "../../../utils/spacing";

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

  // Меню для sidebar
  const menuItems = useMemo(() => createMenuItems({}), []);

  const handleSidebarSelection = (item) => {
    if (!item) return;
    ensureNotBounce();
    ymGoal(NAV_GOALS_MAP[item.name] || "nav_click");
    if (item.route) {
      navigate(item.route);
    }
  };

  // Галерея фото для блока "Качество и практичность"
  const qualityImages = [
    "/images/photolibrary/portfolio/capital/2/slider1/1.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/2.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/3.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/4.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/5.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/6.jpg",
  ];

  // Галерея фото для блока "От идеи до реализации"
  const etapyImages = [
    "/images/photolibrary/portfolio/capital/1/1.jpg",
    "/images/photolibrary/portfolio/capital/1/2.jpg",
    "/images/photolibrary/portfolio/capital/1/3.jpg",
    "/images/photolibrary/portfolio/capital/1/4.jpg",
  ];

  // Галерея фото для нижнего блока "Качество и практичность"
  const qualityBottomImages = [
    "/images/photolibrary/portfolio/repair/1.jpg",
    "/images/photolibrary/portfolio/repair/2.jpg",
    "/images/photolibrary/portfolio/repair/3.jpg",
  ];

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
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
                          color: "rgba(255,255,255,0.92)",
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
                        {item.submenu?.map((subItem, subIndex) => (
                          <button
                            {...press}
                            key={`${subItem.name}-${subIndex}`}
                            onClick={() => handleSidebarSelection(subItem)}
                            style={{
                              all: "unset",
                              cursor: "pointer",
                              color: "rgba(255,255,255,0.92)",
                              fontFamily: "Arial, sans-serif",
                              fontWeight: 600,
                              fontSize: "16px",
                              letterSpacing: "0.3px",
                              textTransform: "none",
                              lineHeight: 1.6,
                              opacity: 0.94,
                              transition: "color 0.2s ease, opacity 0.2s ease",
                            }}
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
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
      {/* ——— Hero ——— */}
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
          alt="Капитальный ремонт"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.95)",
          }}
        />

        {/* центр по X и Y, без кнопки */}
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
            }}
          >
            Капитальный ремонт
          </h1>
        </div>
      </div>

      {/* Описание под изображением */}
      <div
        style={{
          padding: "24px 0 0",
          width: "100%",
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
          {`Капитальный ремонт — это не просто обновление, а полное преображение квартиры.
Мы выполняем весь комплекс работ: от демонтажа и перепланировки до чистовой отделки.
Меняем коммуникации, выравниваем стены, монтируем напольные покрытия и создаём современный, продуманный интерьер.
Работы выполняют профильные специалисты с большим опытом.
Мы используем только проверенные материалы и профессиональное оборудование, соблюдаем строительные нормы и сроки.
Стоимость ремонта фиксируется в смете — без скрытых платежей и внезапных "допов".
Если требуется, поможем оптимизировать смету: подберём материалы с лучшим соотношением цена/качество.
В результате вы получаете надёжный ремонт "под ключ", рассчитанный на годы эксплуатации.`}
        </p>
      </div>

      {/* Блок "Эстетика и стиль" */}
      <div
        style={{
          padding: "40px 0 0",
          width: "100%",
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
          Эстетика и стиль
        </h2>
      </div>

      {/* Галерея фото на всю ширину экрана */}
      <FullWidthImageGallery
        images={qualityImages}
        altPrefix="Эстетика и стиль"
        isMobile={false}
      />

      {/* Описание */}
      <div
        style={{
          padding: "0",
          width: "100%",
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
          Мы создаём уютные и современные интерьеры — под любые запросы и
          бюджеты. Реализуем идеи, сочетающие комфорт, дизайн и практичность.
        </p>
      </div>

      {/* Блок "От идеи до реализации" */}
      <div
        style={{
          padding: "40px 0 0",
          width: "100%",
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
          От идеи до реализации
        </h2>
      </div>

      {/* Галерея фото на всю ширину экрана */}
      <FullWidthImageGallery
        images={etapyImages}
        altPrefix="Этапы ремонта"
        isMobile={false}
      />

      {/* Описание */}
      <div
        style={{
          padding: "0",
          width: "100%",
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
          Этапы: разработка дизайн-проекта и сметы → черновые работы (демонтаж,
          коммуникации, стяжка и пр.) → финишная отделка (укладка покрытий,
          установка сантехники и др.).
        </p>
      </div>

      {/* Блок "Качество и практичность" (нижний) */}
      <div
        style={{
          padding: "40px 0 0",
          width: "100%",
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
          Качество и практичность
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
          padding: "0",
          width: "100%",
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
          Мы делаем качественно и рационально: подбираем материалы с оптимальным
          соотношением цена/качество, чтобы вы не переплачивали — и получали
          ремонт на десятилетия.
        </p>
      </div>

      <FullWidthViewportVideo
        videoSrc="/videos/1.mp4"
        containerStyle={{ marginTop: 24 }}
      />

      {/* Блок "Сроки и стоимость" */}
      <div
        style={{
          padding: "40px 0 0",
          width: "100%",
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
          Сроки и стоимость
        </h2>
      </div>

      {/* Фото на всю ширину экрана */}
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

      {/* Описание */}
      <div
        style={{
          padding: "0",
          width: "100%",
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
          Средняя цена капитального ремонта — около 9 500 ₽ за м². Это ориентир:
          финальная смета зависит от уровня материалов, инженерных решений и
          объёма работ.
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
          Примерную стоимость ремонта можно рассчитать в нашем калькуляторе на
          главной странице.
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
          Для точной сметы свяжитесь с нами любым удобным способом на странице{" "}
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
          Сроки определяются после личной консультации и фиксируются в смете.
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
