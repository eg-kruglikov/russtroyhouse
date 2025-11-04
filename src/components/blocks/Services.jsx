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
      title: "Вайт бокс\nЧистовая отделка",
      description:
        "Полный цикл ремонта — от черновых до чистовых работ.\n\nДелаем всё: разводку коммуникаций, штукатурку, гипсокартон, стяжку, поклейку обоев, укладку напольных покрытий, установку сантехники и освещения.\n\nМожно заказать как полный ремонт, так и отдельные этапы — вайт бокс или чистовую отделку.",
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
          fontSize: isMobile ? "8vw" : "48px",
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
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "repeat(3, 1fr)",
          gap: isMobile ? "40px" : "0",
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
                backgroundColor: isMobile ? "transparent" : "#0f2431",
                borderRadius: "0",
                overflow: "hidden",
                boxShadow: isMobile ? "none" : "0 10px 40px rgba(0,0,0,0.3)",
                border: isMobile ? "none" : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Заголовок над фото */}
              <div
                style={{
                  padding: isMobile ? "0 20px 16px 20px" : "24px 24px 20px",
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? "6vw" : "30px",
                    fontWeight: 800,
                    margin: "0",
                    color: "#fff",
                    lineHeight: 1.1,
                    whiteSpace:
                      service.route === "whitebox" ? "pre-line" : "normal",
                  }}
                >
                  {service.title}
                </h2>
              </div>

              {/* Изображение или слайдер */}
              <div
                style={{
                  position: "relative",
                  width: "100vw",
                  height: isMobile ? "250px" : "280px",
                  marginLeft: "calc(-50vw + 50%)",
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
                    borderRadius: "0",
                    boxShadow: "none",
                  }}
                />
              </div>

              {/* Контент */}
              <div
                style={{
                  padding: isMobile ? "20px 20px" : "28px 24px 32px",
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
                    whiteSpace: "pre-line",
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
                  Подробнее
                  <span style={{ fontSize: "22px" }}>→</span>
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
