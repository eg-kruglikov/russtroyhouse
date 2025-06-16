import React, { useRef, useState } from "react";

const Services = ({ isMobile, servicesRef, setQuestioModalOpen }) => {
  const moks = [
    {
      title: "КОСМЕТИЧЕСКИЙ РЕМОНТ",
      text: "Лёгкое обновление – покраска, обои, замена покрытий, освежение интерьера.",
      number: "1",
    },
    {
      title: "КАПИТАЛЬНЫЙ РЕМОНТ",
      text: "Замена коммуникаций, выравнивание стен, перепланировка, демонтаж, полная замена электрики.",
      number: "2",
    },
    {
      title: "ДИЗАЙНЕРСКИЙ РЕМОНТ",
      text: "Уникальные интерьеры под ключ. Визуальные концепции и премиальные материалы. Зонирование кухни – гостиной.",
      number: "3",
    },
  ];

  return (
    <section
      ref={servicesRef}
      style={{
        backgroundColor: "#000",
        padding: "8px 16px",
        textAlign: "center",
        scrollMarginTop: "60px",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? "36px" : "78px",
          color: "#f2cb05",
          fontWeight: 700,
          marginBottom: isMobile ? "30px" : "50px",
          whiteSpace: "nowrap",
        }}
      >
        НАШИ УСЛУГИ
      </h2>

      <div
        style={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          gap: isMobile ? "20px" : "36px",
          padding: "0px 26px",
        }}
      >
        {moks.map((item) => (
          <div
            key={item.number}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              color: "#fff",
              textAlign: "left",
            }}
          >
            {!isMobile && (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  flexShrink: 0, // <--- важно, чтобы не сжимался!
                  marginTop: "40px",
                  marginRight: "20px",
                  backgroundColor: "#011324",
                  color: "#f2cb05",
                  borderRadius: "50%",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "84px",
                  fontWeight: 500,
                }}
              >
                {item.number}
              </div>
            )}

            <div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: isMobile ? "16px" : "26px",
                  marginBottom: isMobile ? "0px" : "8px",
                }}
              >
                {item.title}
              </div>
              <p
                style={{
                  fontSize: isMobile ? "15px" : "20px",
                  color: "#ccc",
                  letterSpacing: "2px",
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        style={{
          backgroundColor: "#f2cb05",
          color: "#000",
          padding: "20px 32px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          fontSize: "18px",
          marginTop: isMobile ? "10px" : "60px",
        }}
        onClick={() => setQuestioModalOpen(true)}
      >
        ЗАКАЗАТЬ ЗВОНОК
      </button>
    </section>
  );
};

export default Services;
