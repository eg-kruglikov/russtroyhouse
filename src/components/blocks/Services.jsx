import React from "react";
import { useNavigate } from "react-router-dom";
import { ymNavigate } from "../../utils/metrika";

const Services = ({ isMobile, servicesRef }) => {
  const navigate = useNavigate();
  const handleClick = (url) => {
    const page = `/repair/${url}`;
    ymNavigate(page);
    setTimeout(() => {
      navigate(page);
    }, 100);
  };

  const services = [
    {
      title: "Косметический ремонт",
      description:
        "Легкое обновление помещений без полного цикла ремонтно-отделочных работ и внесения существенных изменений.",
      price: "3900",
      image: "/images/homePage/services1.webp",
      route: "cosmetic",
    },
    {
      title: "Капитальный ремонт",
      description:
        "Полная перепланировка, демонтаж старых отделочных материалов, замена коммуникаций, окон и дверей, черновая и чистовая отделка.",
      price: "9500",
      image: "/images/homePage/services2.webp",
      route: "capital",
    },
    {
      title: "Дизайнерский ремонт",
      description:
        "Комплексный пакет чертежей, спецификация отделочных материалов, освещения, мебели и визуализация интерьера.",
      price: "16 500",
      image: "/images/homePage/services3.webp",
      route: "designer",
    },
  ];

  return (
    <section
      ref={servicesRef}
      style={{
        scrollMarginTop: "60px",
        padding: isMobile ? "30px 0" : "60px 0",
        width: "100%",
      }}
    >
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "repeat(3, 1fr)",
          gap: isMobile ? "40px" : "32px",
          width: isMobile ? "92%" : "90%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: isMobile ? "transparent" : "#0f2431",
              borderRadius: isMobile ? "0" : "20px",
              overflow: "hidden",
              boxShadow: isMobile ? "none" : "0 10px 40px rgba(0,0,0,0.3)",
              border: isMobile ? "none" : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Заголовок над фото */}
            <div
              style={{
                padding: isMobile ? "0 0 16px 0" : "24px 24px 20px",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "7.5vw" : "36px",
                  fontWeight: 800,
                  margin: "0",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                {service.title}
              </h2>
            </div>

            {/* Изображение */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: isMobile ? "250px" : "280px",
              }}
            >
              <img
                loading="lazy"
                src={service.image}
                alt={service.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: isMobile ? "10px" : "0",
                  boxShadow: isMobile
                    ? "0 8px 24px rgba(0, 0, 0, 0.4)"
                    : "none",
                }}
              />

              {/* Цена поверх картинки */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: isMobile ? "22%" : "25%",
                  backgroundColor: isMobile
                    ? "rgba(20, 20, 20, 0.85)"
                    : "rgba(10, 26, 38, 0.92)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "20px",
                  borderTop: isMobile
                    ? "2px solid rgba(255, 215, 0, 0.5)"
                    : "1px solid rgba(255, 215, 0, 0.3)",
                  borderRadius: isMobile ? "0 0 10px 10px" : "0",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? "4.5vw" : "18px",
                    color: "#fff",
                    fontWeight: isMobile ? 500 : 400,
                  }}
                >
                  Цена от
                </span>
                <span
                  style={{
                    color: "#FFD700",
                    fontSize: isMobile ? "5.5vw" : "22px",
                    fontWeight: isMobile ? 700 : 600,
                    marginLeft: "8px",
                  }}
                >
                  {service.price}
                </span>
                <span
                  style={{
                    fontSize: isMobile ? "4.5vw" : "18px",
                    color: "#fff",
                    fontWeight: isMobile ? 500 : 400,
                    marginLeft: "4px",
                  }}
                >
                  руб/м²
                </span>
              </div>
            </div>

            {/* Контент */}
            <div
              style={{
                padding: isMobile ? "20px 0" : "28px 24px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "flex-start" : "flex-start",
                textAlign: "left",
                flex: 1,
              }}
            >
              {/* Описание */}
              <p
                style={{
                  fontSize: isMobile ? "4.2vw" : "16px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                  margin: "0 0 20px 0",
                  flex: 1,
                }}
              >
                {service.description}
              </p>

              {/* Ссылка вместо кнопки */}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(service.route);
                }}
                href={`/repair/${service.route}`}
                style={{
                  color: "#FFD700",
                  fontSize: isMobile ? "4.5vw" : "19px",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  marginTop: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = "12px";
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = "8px";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Цены и примеры работ
                <span style={{ fontSize: "22px" }}>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
