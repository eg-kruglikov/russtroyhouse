import React, { useRef, useState } from "react";

const Services = ({
  isMobile,
  servicesRef,
  setQuestioModalOpen,
  phoneWidgetIsOpen,
}) => {
  return (
    <section
      ref={servicesRef}
      style={{
        textAlign: "center",
        scrollMarginTop: "60px",
        height: isMobile ? "auto" : "130vh",
        marginLeft: "5.5vw",
        marginRight: "5.5vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? "34px" : "42px",
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
      <div
        style={{
          height: isMobile ? "auto" : "29%",
          width: "64vw",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          marginRight: isMobile ? "0%" : "20vw",
        }}
      >
        <img
          loading="lazy"
          src="/images/homePage/services1.webp"
          style={{
            height: isMobile ? "auto" : "100%",
            width: isMobile ? "100%" : "auto",
            alignSelf: "center",
          }}
          alt="о нас"
        />
        <div
          style={{
            height: "100%",
            width: "330px",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            textAlign: isMobile ? "center" : "start",
            marginLeft: isMobile ? "0px" : "5vw",
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
      <div
        style={{
          height: isMobile ? "auto" : "29%",
          width: "64vw",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          marginLeft: isMobile ? "0%" : "20vw",
        }}
      >
        {!isMobile && (
          <div
            style={{
              height: "100%",
              width: "280px",
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              textAlign: "end",
              marginRight: "10%",
              justifyContent: "center",
            }}
          >
            <>
              <p
                style={{
                  fontSize: "26px",
                  marginBottom: "0%",
                  fontWeight: 700,
                }}
              >
                капитальный ремонт
              </p>
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
            </>
          </div>
        )}
        <img
          loading="lazy"
          src="/images/homePage/services2.webp"
          style={{
            height: isMobile ? "auto" : "100%",
            width: isMobile ? "100%" : "auto",
            alignSelf: "center",
          }}
          alt="о нас"
        />

        {isMobile && (
          <p
            style={{
              fontSize: isMobile ? "20px" : "28px",
              marginBottom: isMobile ? "18px" : "0%",
              marginTop: isMobile ? "4px" : "20px",
            }}
          >
            капитальный ремонт
          </p>
        )}
      </div>
      <div
        style={{
          height: isMobile ? "auto" : "29%",
          width: "64vw",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          marginRight: isMobile ? "0%" : "20vw",
        }}
      >
        <img
          loading="lazy"
          src="/images/homePage/services3.webp"
          style={{
            height: isMobile ? "auto" : "100%",
            width: isMobile ? "100%" : "auto",
            alignSelf: "center",
          }}
          alt="о нас"
        />
        <div
          style={{
            height: "100%",
            width: "330px",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            textAlign: isMobile ? "center" : "start",
            marginLeft: isMobile ? "0px" : "5vw",
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
              Уникальные интерьеры под ключ. Визуальные концепции и премиальные
              материалы. Зонирование кухни - гостинной.
            </p>
          )}
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
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
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
    </section>
  );
};

export default Services;
