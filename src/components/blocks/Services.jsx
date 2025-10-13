import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ymNavigate } from "../../utils/metrika";

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
    // Отправляем виртуальный хит + notBounce
    ymNavigate(page);

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
          width: isMobile ? "92%" : widthFirstBlock,
          height: "auto",
        }}
      >
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
                height: isMobile ? "250px" : "100%",
              }}
            >
              <img
                loading="lazy"
                src="/images/homePage/services1.webp"
                style={{
                  height: isMobile ? "250px" : "100%",
                  width: isMobile ? "100%" : "auto",
                  alignSelf: "center",
                  display: "block",
                  borderRadius: "10px",
                  boxShadow: isMobile
                    ? "0 8px 24px rgba(0, 0, 0, 0.4)"
                    : "none",
                  objectFit: "cover",
                }}
                alt="о нас"
              />
              <div
                style={{
                  width: "100%",
                  height: isMobile ? "22%" : "20%",
                  backgroundColor: isMobile
                    ? "rgba(20, 20, 20, 0.85)"
                    : "rgba(98, 98, 98, 0.65)",
                  bottom: 0,
                  left: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  borderTop: isMobile
                    ? "2px solid rgba(255, 215, 0, 0.5)"
                    : "none",
                }}
              >
                <div
                  style={{
                    marginLeft: "20px",
                    fontSize: isMobile ? "4.5vw" : "20px",
                    color: "#ffff",
                    fontWeight: isMobile ? 500 : 400,
                  }}
                >
                  Цена от
                </div>
                <div
                  style={{
                    color: "#FFD700",
                    fontSize: isMobile ? "5.5vw" : "20px",
                    fontWeight: isMobile ? 700 : 400,
                  }}
                >
                  {" "}
                  &nbsp;3900
                </div>

                <div
                  style={{
                    fontSize: isMobile ? "4.5vw" : "20px",
                    color: "#ffff",
                    fontWeight: isMobile ? 500 : 400,
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
                }}
              >
                Косметический ремонт
              </div>

              <div
                style={{
                  fontSize: isMobile ? "4.5vw" : "clamp(16px, 1.8vw, 18px)",
                  fontWeight: "500",
                  width: "80%",
                  lineHeight: isMobile ? "1.5" : "1.6",
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
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = "scale(0.95)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(255, 215, 0, 0.8)";
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(255, 215, 0, 0.5)";
                }}
                style={{
                  backgroundColor: isMobile ? "#FFD700" : "transparent",
                  color: isMobile ? "#000" : "white",
                  border: "2px solid #FFD700",
                  borderRadius: "25px",
                  padding: isMobile ? "10px 0px" : "4px 0px",
                  fontSize: isMobile ? "4vw" : "20px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: isMobile ? "35vw" : "150px",
                  height: isMobile ? "45px" : "35px",
                  marginTop: "3vh",
                  boxShadow: isMobile
                    ? "0 0 15px rgba(255, 215, 0, 0.5)"
                    : "none",
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
                  fontSize: isMobile ? "4.5vw" : "clamp(16px, 1.8vw, 18px)",
                  fontWeight: "500",
                  width: "80%",
                  lineHeight: isMobile ? "1.5" : "1.6",
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
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = "scale(0.95)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(255, 215, 0, 0.8)";
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = isMobile
                    ? "0 0 15px rgba(255, 215, 0, 0.5)"
                    : "0 0 10px rgba(255, 215, 0, 0.4)";
                }}
                style={{
                  backgroundColor: isMobile ? "#FFD700" : "transparent",
                  color: isMobile ? "#000" : "white",
                  border: "2px solid #FFD700",
                  borderRadius: "25px",
                  padding: isMobile ? "10px 0px" : "4px 0px",
                  fontSize: isMobile ? "4vw" : "20px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: isMobile ? "35vw" : "150px",
                  height: isMobile ? "45px" : "35px",
                  boxShadow: isMobile
                    ? "0 0 15px rgba(255, 215, 0, 0.5)"
                    : "0 0 10px rgba(255, 215, 0, 0.4)",
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
                height: isMobile ? "250px" : "100%",
              }}
            >
              <img
                loading="lazy"
                src="/images/homePage/services2.webp"
                style={{
                  height: isMobile ? "250px" : "100%",
                  width: isMobile ? "100%" : "auto",
                  alignSelf: "center",
                  display: "block",
                  borderRadius: "10px",
                  boxShadow: isMobile
                    ? "0 8px 24px rgba(0, 0, 0, 0.4)"
                    : "none",
                  objectFit: "cover",
                }}
                alt="о нас"
              />
              <div
                style={{
                  width: "100%",
                  height: isMobile ? "22%" : "15%",
                  backgroundColor: isMobile
                    ? "rgba(20, 20, 20, 0.85)"
                    : "rgba(98, 98, 98, 0.65)",
                  bottom: 0,
                  left: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  borderTop: isMobile
                    ? "2px solid rgba(255, 215, 0, 0.5)"
                    : "none",
                }}
              >
                <div
                  style={{
                    marginLeft: "20px",
                    fontSize: isMobile ? "4.5vw" : "20px",
                    color: "#ffff",
                    fontWeight: isMobile ? 500 : 400,
                  }}
                >
                  Цена от
                </div>
                <div
                  style={{
                    color: "#FFD700",
                    fontSize: isMobile ? "5.5vw" : "20px",
                    fontWeight: isMobile ? 700 : 400,
                  }}
                >
                  {" "}
                  &nbsp;9500
                </div>

                <div
                  style={{
                    fontSize: isMobile ? "4.5vw" : "20px",
                    color: "#ffff",
                    fontWeight: isMobile ? 500 : 400,
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
                height: isMobile ? "250px" : "100%",
              }}
            >
              <img
                loading="lazy"
                src="/images/homePage/services3.webp"
                style={{
                  height: isMobile ? "250px" : "100%",
                  width: isMobile ? "100%" : "auto",
                  alignSelf: "center",
                  display: "block",
                  borderRadius: "10px",
                  boxShadow: isMobile
                    ? "0 8px 24px rgba(0, 0, 0, 0.4)"
                    : "none",
                  objectFit: "cover",
                }}
                alt="о нас"
              />
              <div
                style={{
                  width: "100%",
                  height: isMobile ? "22%" : "20%",
                  backgroundColor: isMobile
                    ? "rgba(20, 20, 20, 0.85)"
                    : "rgba(98, 98, 98, 0.8)",
                  bottom: 0,
                  left: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  borderTop: isMobile
                    ? "2px solid rgba(255, 215, 0, 0.5)"
                    : "none",
                }}
              >
                <div
                  style={{
                    marginLeft: "20px",
                    fontSize: isMobile ? "4.5vw" : "20px",
                    color: "#ffff",
                    fontWeight: isMobile ? 500 : 400,
                  }}
                >
                  Цена от
                </div>
                <div
                  style={{
                    color: "#FFD700",
                    fontSize: isMobile ? "5.5vw" : "20px",
                    fontWeight: isMobile ? 700 : 400,
                  }}
                >
                  {" "}
                  &nbsp;16 500
                </div>

                <div
                  style={{
                    fontSize: isMobile ? "4.5vw" : "20px",
                    color: "#ffff",
                    fontWeight: isMobile ? 500 : 400,
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
                    fontSize: isMobile ? "4.5vw" : "clamp(16px, 1.8vw, 18px)",
                    fontWeight: 400,
                    lineHeight: isMobile ? "1.5" : "1.6",
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
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = "scale(0.95)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(255, 215, 0, 0.8)";
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = isMobile
                    ? "0 0 15px rgba(255, 215, 0, 0.5)"
                    : "0 0 10px rgba(255, 215, 0, 0.4)";
                }}
                style={{
                  backgroundColor: isMobile ? "#FFD700" : "transparent",
                  color: isMobile ? "#000" : "white",
                  border: "2px solid #FFD700",
                  borderRadius: "25px",
                  padding: isMobile ? "10px 0px" : "4px 0px",
                  fontSize: isMobile ? "4vw" : "20px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: isMobile ? "35vw" : "150px",
                  height: isMobile ? "45px" : "35px",
                  boxShadow: isMobile
                    ? "0 0 15px rgba(255, 215, 0, 0.5)"
                    : "0 0 10px rgba(255, 215, 0, 0.4)",
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
