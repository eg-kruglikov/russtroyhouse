import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = ({
  isMobile,
  servicesRef,
  setQuestioModalOpen,
  phoneWidgetIsOpen,
  widthFirstBlock,
}) => {
  const navigate = useNavigate();
  const handleClick = (url) => {
    const page = `/repair/${url}`;
    if (window.ym) {
      // Сообщаем о просмотре новой страницы (виртуальный хит)
      window.ym(101296472, "hit", page);
      // Дополнительно фиксируем, что визит не отказ
      window.ym(101296472, "notBounce");
    }

    setTimeout(() => {
      navigate(page);
    }, 100);
  };

  return (
    <section
      ref={servicesRef}
      style={{
        textAlign: "center",
        scrollMarginTop: "60px",
        height: "auto",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: isMobile ? "100vw" : "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: isMobile ? "80%" : widthFirstBlock,
          height: "auto",
        }}
      >
        <div
          style={{
            fontSize: isMobile ? "12vw" : "42px",
            color: "#f2cb05",
            fontWeight: 700,
            marginBottom: isMobile ? "15px" : "0px",
            whiteSpace: "nowrap",
            marginTop: "0px",
            height: isMobile ? "8vh" : "10vh",
          }}
        >
          НАШИ УСЛУГИ
        </div>

        {/* косметический ремонт */}
        <div
          style={{
            height: isMobile ? "auto" : "29vh",
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: isMobile ? "auto" : "100%",
              width: "100%",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",

              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                position: "relative",
                width: isMobile ? "100%" : "auto",
                height: isMobile ? "auto" : "100%",
              }}
            >
              <img
                loading="lazy"
                src="/images/homePage/services1.webp"
                style={{
                  height: isMobile ? "auto" : "100%",
                  width: isMobile ? "100%" : "auto",
                  alignSelf: "center",
                  display: "block",
                  borderRadius: "10px",
                }}
                alt="о нас"
              />
              <div
                style={{
                  width: "100%",
                  height: "20%",
                  backgroundColor: "rgba(98, 98, 98, 0.65)",
                  bottom: 0,
                  left: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    marginLeft: "20px",
                    fontSize: "20px",
                    color: "#ffff",
                  }}
                >
                  Цена от
                </div>
                <div style={{ color: "yellow", fontSize: "20px" }}>
                  {" "}
                  &nbsp;3400
                </div>

                <div
                  style={{
                    fontSize: "20px",
                    color: "#ffff",
                  }}
                >
                  &nbsp;руб/м²
                </div>
              </div>
            </div>

            <div
              style={{
                height: isMobile ? "100%" : "auto",
                width: isMobile ? "100%" : "50vw",
                padding: "1%",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: isMobile ? "start" : "center",
                justifyContent: isMobile ? "space-between" : "center",
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "7vw" : "clamp(4px, 3.5vw, 56px)",
                  marginBottom: isMobile ? "3vh" : "20px",
                  marginTop: isMobile ? "3vh" : "20px",
                  textDecoration: "underline",
                }}
              >
                Косметический ремонт
              </div>

              <div
                style={{
                  fontSize: isMobile ? "4.2vw" : "clamp(16px, 1.8vw, 18px)",
                  fontWeight: "500",

                  width: "80%",
                }}
              >
                <span style={{ color: "#FFD700" }}>Короткие сроки</span> и{" "}
                <span style={{ color: "#FFD700" }}>минимальные вложения</span> —
                и вы будто переехали в новую квартиру. Мы обновим стены, заменим
                покрытия и сделаем интерьер заметно свежее без пыли, шума и
                затянувшихся ремонтов.
              </div>

              <button
                onClick={() => {
                  handleClick("cosmetic");
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid #FFD700", // жёлтая рамка
                  borderRadius: "20px",
                  padding: "4px 0px",
                  fontSize: isMobile ? "3.5vw" : "20px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: isMobile ? "25vw" : "150px",
                  height: "35px",
                  marginTop: "3vh",
                }}
              >
                подробнее
              </button>
            </div>
          </div>
        </div>
        {/* капитальный ремонт */}
        <div
          style={{
            height: isMobile ? "auto" : "35vh",
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",

            marginTop: isMobile ? "8vh" : "8vh",
            marginBottom: isMobile ? "8vh" : "8vh",
          }}
        >
          <div
            style={{
              height: isMobile ? "auto" : "100%",
              width: "100%",
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row",

              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                height: isMobile ? "100%" : "auto",
                width: isMobile ? "100%" : "50vw",
                padding: "1%",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: isMobile ? "start" : "center",
                justifyContent: isMobile ? "space-between" : "center",
                alignItems: isMobile ? "start" : "center",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "7vw" : "clamp(4px, 3.5vw, 56px)",
                  marginBottom: isMobile ? "3vh" : "20px",
                  marginTop: isMobile ? "3vh" : "20px",
                  fontWeight: 700,
                }}
              >
                {" "}
                Капитальный ремонт
              </div>

              <div
                style={{
                  fontSize: isMobile ? "4.2vw" : "clamp(16px, 1.8vw, 18px)",
                  fontWeight: "500",

                  width: "80%",
                }}
              >
                <span style={{ color: "#FFD700" }}>
                  Полное обновление квартиры
                </span>{" "}
                с заменой всех коммуникаций и перепланировкой под ваши нужды —{" "}
                <span style={{ color: "#FFD700" }}>РЕМОНТ ЛЮБОЙ СЛОЖНОСТИ</span>
                . Крепкие инженерные системы, качественные отделочные материалы,
                идеально ровные стены и интерьер, который будет радовать каждый
                день.
              </div>

              <button
                onClick={() => {
                  handleClick("capital");
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid #FFD700", // жёлтая рамка
                  borderRadius: "20px",
                  padding: "4px 0px",
                  fontSize: isMobile ? "3.5vw" : "20px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: isMobile ? "25vw" : "150px",
                  height: "35px",
                  boxShadow: "0 0 10px rgba(255, 215, 0, 0.4)",
                  marginTop: "3vh",
                }}
              >
                подробнее
              </button>
            </div>

            <div
              style={{
                position: "relative",
                width: isMobile ? "100%" : "auto",
                height: isMobile ? "auto" : "100%",
              }}
            >
              <img
                loading="lazy"
                src="/images/homePage/services2.webp"
                style={{
                  height: isMobile ? "auto" : "100%",
                  width: isMobile ? "100%" : "auto",
                  alignSelf: "center",
                  display: "block",
                  borderRadius: "10px",
                }}
                alt="о нас"
              />
              <div
                style={{
                  width: "100%",
                  height: "15%",
                  backgroundColor: "rgba(98, 98, 98, 0.65)",
                  bottom: 0,
                  left: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    marginLeft: "20px",
                    fontSize: "20px",
                    color: "#ffff",
                  }}
                >
                  Цена от
                </div>
                <div style={{ color: "yellow", fontSize: "20px" }}>
                  {" "}
                  &nbsp;11600
                </div>

                <div
                  style={{
                    fontSize: "20px",
                    color: "#ffff",
                  }}
                >
                  &nbsp;руб/м²
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* дизайнерский ремонт */}
        <div
          style={{
            height: isMobile ? "auto" : "35vh",
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: isMobile ? "auto" : "100%",
              width: "100%",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",

              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                position: "relative",
                width: isMobile ? "100%" : "auto",
                height: isMobile ? "auto" : "100%",
              }}
            >
              <img
                loading="lazy"
                src="/images/homePage/services3.webp"
                style={{
                  height: isMobile ? "auto" : "100%",
                  width: isMobile ? "100%" : "auto",
                  alignSelf: "center",
                  display: "block",
                  borderRadius: "10px",
                }}
                alt="о нас"
              />
              <div
                style={{
                  width: "100%",
                  height: "20%",
                  backgroundColor: "rgba(98, 98, 98, 0.8)",
                  bottom: 0,
                  left: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    marginLeft: "20px",
                    fontSize: "20px",
                    color: "#ffff",
                  }}
                >
                  Цена от
                </div>
                <div style={{ color: "yellow", fontSize: "20px" }}>
                  {" "}
                  &nbsp;17 200
                </div>

                <div
                  style={{
                    fontSize: "20px",
                    color: "#ffff",
                  }}
                >
                  &nbsp;руб/м²
                </div>
              </div>
            </div>
            <div
              style={{
                height: isMobile ? "100%" : "auto",
                width: isMobile ? "100%" : "50vw",
                padding: "1%",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: isMobile ? "start" : "center",

                justifyContent: isMobile ? "center" : "center",
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "7vw" : "clamp(4px, 3.5vw, 56px)",
                  marginBottom: isMobile ? "3vh" : "20px",
                  marginTop: isMobile ? "3vh" : "20px",
                  fontWeight: 700,
                  display: "inline-block",
                  background:
                    "linear-gradient(90deg, #FFD700 0%, #ffffff 50%, #FFD700 100%)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shine 2.5s linear infinite",
                }}
              >
                Дизайнерский ремонт
              </div>

              <div
                style={{
                  fontWeight: "500",
                  width: "80%",
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    fontSize: isMobile ? "4.1vw" : "clamp(16px, 1.8vw, 18px)",
                    fontWeight: 400,
                  }}
                >
                  Ищете{" "}
                  <span style={{ color: "#FFD700" }}>УНИКАЛЬНЫЙ ДИЗАЙН</span> ?
                  <br />
                  Мы создаём интерьеры под ключ, в которых продумано всё — от
                  визуальной концепции до зонирования кухни-гостиной. У нас{" "}
                  <span style={{ color: "#FFD700" }}>
                    лучшие дизайнеры, опытные строители{" "}
                  </span>{" "}
                  и <span style={{ color: "#FFD700" }}> честные цены</span> без
                  скрытых затрат.
                </div>
              </div>

              <button
                onClick={() => {
                  handleClick("designer");
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid #FFD700", // жёлтая рамка
                  borderRadius: "20px",
                  padding: "4px 0px",
                  fontSize: isMobile ? "3.5vw" : "20px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: isMobile ? "25vw" : "150px",
                  height: "35px",
                  boxShadow: "0 0 10px rgba(255, 215, 0, 0.4)",
                  marginTop: "3vh",
                }}
              >
                подробнее
              </button>
            </div>
          </div>
        </div>

        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: isMobile ? "13vh" : "20vh",
          }}
        >
          <button
            type="button"
            onTouchStart={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            style={{
              backgroundColor: "#f2cb05",
              color: isMobile ? "#000" : "#ffff",
              padding: isMobile ? "17px 24px" : "25px 48px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "45px",
              cursor: "pointer",
              fontSize: isMobile ? "14px" : "24px",

              alignSelf: "center",
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              opacity: phoneWidgetIsOpen ? "0.5" : "1",
            }}
            onClick={() => setQuestioModalOpen(true)}
            disabled={phoneWidgetIsOpen}
          >
            УЗНАТЬ СТОИМОСТЬ
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Services;
