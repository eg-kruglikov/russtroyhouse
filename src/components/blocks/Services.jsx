import React from "react";
import { useNavigate } from "react-router-dom";
import { ymNavigate } from "../../utils/metrika";
import { TITLE_SIZES } from "../../utils/spacing";

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
      image: "/images/photolibrary/portfolio/cosmetic/1/4.jpg",
      route: "cosmetic",
    },
    {
      title: "Капитальный ремонт",
      description:
        "Полная перепланировка, демонтаж старых отделочных материалов, замена коммуникаций, окон и дверей, черновая и чистовая отделка.",
      price: "9500",
      image: "/images/photolibrary/portfolio/capital/2/7.jpg",
      route: "capital",
    },
    {
      title: "Дизайнерский ремонт",
      description:
        "Комплексный пакет чертежей, спецификация отделочных материалов, освещения, мебели и визуализация интерьера.",
      price: "16 500",
      image: "/images/photolibrary/portfolio/designer/1/2.jpg",
      route: "designer",
    },
    {
      title: "Чистовая/черновая отделка",
      description:
        "Полный цикл ремонта — от черновых до чистовых работ.\n\nДелаем всё: разводку коммуникаций, штукатурку, гипсокартон, стяжку, поклейку обоев, укладку напольных покрытий, установку сантехники и освещения.\n\nМожно заказать как полный ремонт, так и отдельные этапы — чистовую или черновую отделку.",
      price: "5000",
      image: "/images/repair/zelenyBor/1.webp",
      route: "whitebox",
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
      {/* Заголовок "Наши услуги" */}
      <h2
        id="nashi-uslugi"
        style={{
          fontSize: isMobile ? TITLE_SIZES.mobile.main : TITLE_SIZES.desktop.main,
          fontWeight: 800,
          margin: "0 0 20px 0",
          color: "#FFD700",
          textAlign: "left",
          lineHeight: 1.1,
          paddingLeft: isMobile ? "20px" : "24px",
        }}
      >
        Наши услуги
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "40px" : "48px",
          width: "100%",
          margin: "0",
        }}
      >
        {services.map((service, index) => {
          // Определяем id для блока услуги
          const serviceId = [
            "cosmetic",
            "capital",
            "designer",
            "whitebox",
          ].includes(service.route)
            ? service.route
            : null;

          return (
            <div
              key={index}
              id={serviceId}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "transparent",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "none",
              }}
            >
              {/* Заголовок над фото */}
              <div
                style={{
                  padding: isMobile ? "0 20px 16px 20px" : "0 24px 16px 24px",
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? TITLE_SIZES.mobile.service : TITLE_SIZES.desktop.main,
                    fontWeight: 800,
                    margin: "0",
                    color: "#fff",
                    lineHeight: 1.15,
                    whiteSpace:
                      service.route === "whitebox" ? "pre-line" : "normal",
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
                  aspectRatio: isMobile ? "4 / 3" : "3 / 2",
                  overflow: "hidden",
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
                  }}
                />
              </div>

              {/* Контент */}
              <div
                style={{
                  padding: isMobile ? "20px" : "28px 32px 32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  gap: "18px",
                }}
              >
                <p
                  style={{
                    fontSize: isMobile ? "4.2vw" : "21px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.6,
                    margin: "0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {service.description}
                </p>

                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(service.route);
                  }}
                  href={`/repair/${service.route}`}
                  style={{
                    color: "#FFD700",
                    fontSize: isMobile ? "4.5vw" : "24px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = "14px";
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = "10px";
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  Подробнее
                  <span style={{ fontSize: isMobile ? "5vw" : "28px" }}>→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
