import React, { useMemo } from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { useResponsiveShell } from "../../../hooks/useResponsiveShell";
import { useNotBounceOnce } from "../../../hooks/useNotBounceOnce";
import { usePressEffect } from "../../../hooks/useSomething";
import { createMenuItems, NAV_GOALS_MAP } from "../../../utils/navigationConfig";
import { ymGoal } from "../../../utils/metrika";
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

  const menuItems = useMemo(() => createMenuItems({}), []);

  const handleSidebarSelection = (item) => {
    if (!item) return;
    ensureNotBounce();
    ymGoal(NAV_GOALS_MAP[item.name] || "nav_click");
    if (item.route) {
      navigate(item.route);
    }
  };

  const imagePreparation = "/images/repair/zelenyBor/2.webp";
  const imageGeometry = "/images/repair/zelenyBor/3.webp";
  const imageEngineering = "/images/repair/Sevastopolsky22A/1.webp";
  const imageFinal = "/images/repair/Sevastopolsky22A/2.webp";

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
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>Чистовая/черновая</span>
            <br />
            отделка
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
          {`White box — это предчистовая отделка, тот самый «белый короб», где уже выполнены все сложные черновые работы.
Мы выравниваем стены и потолки по лазерной геометрии, делаем стяжку и штукатурку, выводим электрику, сантехнику и вентиляцию, оставляя объект технически готовым под финиш.
Работаем строго по СНиП и ГОСТ, используем проверенные материалы и фиксируем цену в договоре, поэтому смета не «плавает», а результат предсказуем.`}
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 18,
            lineHeight: 1.6,
            marginTop: 18,
            textAlign: "left",
          }}
        >
          После сдачи white box мы можем продолжить с чистовым ремонтом «под
          ключ»: подобрать отделку, организовать поставки, вести авторский
          надзор и собрать интерьер до последнего светильника. Один подрядчик
          отвечает за оба этапа — это экономит время и гарантирует качество.
        </p>
      </div>

      {/* Подготовка и чистота */}
      <div
        style={{
          padding: "40px 0 0",
          width: "100%",
        }}
      >
        <Title>Подготовка и чистота</Title>
      </div>

      <div
        style={{
          width: "100%",
          marginBottom: 20,
        }}
      >
        <img
          src={imagePreparation}
          alt="Подготовка white box"
          style={{
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

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
          Снимаем строительную пыль, шлифуем и армируем стены, выставляем маяки,
          чтобы получить идеально ровные плоскости и чистое основание. Уже на
          этом этапе можно замерять мебель и встроенные конструкции — сюрпризов
          при чистовой отделке не будет.
        </p>
      </div>

      {/* Геометрия и свет */}
      <div
        style={{
          padding: "40px 0 0",
          width: "100%",
        }}
      >
        <Title>Геометрия и свет</Title>
      </div>

      <div
        style={{
          width: "100%",
          marginBottom: 20,
        }}
      >
        <img
          src={imageGeometry}
          alt="Геометрия и свет"
          style={{
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

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
          Проверяем геометрию, подготавливаем ниши и закладные под карнизы,
          световые линии и скрытые двери. Финальные покрытия ложатся без
          зазоров, а дизайнерские решения реализуются именно так, как задумано.
        </p>
      </div>

      {/* Инженерные системы */}
      <div
        style={{
          padding: "40px 0 0",
          width: "100%",
        }}
      >
        <Title>Инженерные системы</Title>
      </div>

      <div
        style={{
          width: "100%",
          marginBottom: 20,
        }}
      >
        <img
          src={imageEngineering}
          alt="Инженерные системы"
          style={{
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

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
          Разводим электрику, отопление, слаботочку и сантехнику с учётом
          будущей техники и мебели. Все скрытые работы документируем актами и
          фото, чтобы при чистовом ремонте не возникало вопросов у дизайнеров и
          поставщиков.
        </p>
      </div>

      {/* Сроки и стоимость */}
      <div
        style={{
          padding: "40px 0 0",
          width: "100%",
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
          src={imageFinal}
          alt="Сроки и стоимость white box ремонта"
          style={{
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

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
          Средняя цена white box по рынку — около 8 700 ₽ за м². Это усреднённый
          ориентир: на итог влияет инженерия, масштаб и выбранные материалы.
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
