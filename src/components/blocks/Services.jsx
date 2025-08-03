import React, { useRef, useState } from "react";

const Services = ({
  isMobile,
  servicesRef,
  setQuestioModalOpen,
  phoneWidgetIsOpen,
  widthFirstBlock,
}) => {
  return (
    <section
      ref={servicesRef}
      style={{
        textAlign: "center",
        scrollMarginTop: "60px",
        height: isMobile ? "auto" : "130vh",

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
          height: isMobile ? "auto" : "100%",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "12vw" : "42px",
            color: "#f2cb05",
            fontWeight: 700,
            marginBottom: isMobile ? "15px" : "0px",
            whiteSpace: "nowrap",
            marginTop: "0px",
            height: "10%",
          }}
        >
          НАШИ УСЛУГИ
        </h2>

        {/* косметический ремонт */}
        <div
          style={{
            height: isMobile ? "auto" : "29%",
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
                }}
                alt="о нас"
              />
              <div
                style={{
                  width: "100%",
                  height: "20%", // например, сделать желтую плашку по высоте
                  backgroundColor: "rgba(98, 98, 98, 0.65)",
                  bottom: 0,
                  left: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
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
                height: "100%",
                width: "330px",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: isMobile ? "center" : "start",
                marginLeft: isMobile ? "0px" : "5%",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: isMobile ? "20px" : "28px",
                  marginBottom: isMobile ? "18px" : "0%",
                  marginTop: isMobile ? "4px" : "20px",
                }}
              >
                косметический ремонт
              </p>
              {!isMobile && (
                <p
                  style={{
                    fontSize: "16px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    lineHeight: "normal",
                    letterSpacing: "0.09em",
                  }}
                >
                  Лёгкое обновление - покраска, обои, замена покрытий, освежение
                  интерьера.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* капитальный ремонт */}
        <div
          style={{
            height: isMobile ? "auto" : "29%",
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            marginBottom: "20px",
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
                height: "100%",
                width: isMobile ? "100%" : "400px",
                padding: "1%",
                alignSelf: "center",
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
                textAlign: isMobile ? "center" : "end",
                marginRight: isMobile ? "0px" : "5%",
                justifyContent: isMobile ? "space-between" : "center",
                alignItems: isMobile ? "center" : "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "5vw" : "28px",
                  marginBottom: isMobile ? "0" : "0%",
                  marginTop: isMobile ? "0" : "20px",
                }}
              >
                {" "}
                Капитальный ремонт
              </div>

              {!isMobile && (
                <p
                  style={{
                    fontSize: "16px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    lineHeight: "normal",
                    letterSpacing: "0.09em",
                  }}
                >
                  Замена коммуникаций, выравнивание стен, перепланировка,
                  демонтаж, полная замена электрики.
                </p>
              )}
              <button
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
            height: isMobile ? "auto" : "29%",
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
                height: "100%",
                width: "330px",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: isMobile ? "center" : "start",
                marginLeft: isMobile ? "0px" : "5%",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: isMobile ? "20px" : "28px",
                  marginBottom: isMobile ? "18px" : "0%",
                  marginTop: isMobile ? "4px" : "20px",
                }}
              >
                дизайнерский ремонт
              </p>
              {!isMobile && (
                <p
                  style={{
                    fontSize: "16px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    lineHeight: "normal",
                    letterSpacing: "0.09em",
                  }}
                >
                  Уникальные интерьеры под ключ. Визуальные концепции и
                  премиальные материалы. Зонирование кухни - гостинной.
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20%",
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
              // marginTop: isMobile ? "18px" : "40px",
              marginBottom: isMobile ? "15px" : "0px",

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
        </div>
      </div>
    </section>
  );
};

export default Services;
