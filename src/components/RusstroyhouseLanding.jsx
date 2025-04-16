import React from "react";

export default function RusstroyhouseLanding() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        color: "#333",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#f5f5f5",
          padding: "5rem 1.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Ремонт квартир под ключ в Москве
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            marginBottom: "2rem",
            maxWidth: "90vw",
          }}
        >
          Комфорт, стиль и надежность — профессиональный ремонт под ключ от
          Russtroyhouse.
        </p>
        <button
          style={{
            fontSize: "1rem",
            padding: "0.9rem 2rem",
            borderRadius: "1rem",
            backgroundColor: "transparent",
            color: "#000",
            border: "2px solid #ff6600",
            boxShadow: "none",
            cursor: "pointer",
          }}
        >
          Получить консультацию
        </button>
      </section>

      {/* Services Section */}
      <section
        style={{
          padding: "4rem 1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {[
          {
            title: "Дизайн-проект",
            desc: "Создаем уникальные проекты, адаптированные под ваш стиль.",
          },
          {
            title: "Черновой и чистовой ремонт",
            desc: "Полный спектр работ с гарантией качества и сроков.",
          },
          {
            title: "Материалы и комплектация",
            desc: "Подбор и доставка качественных материалов от проверенных поставщиков.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: "1.5rem",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              padding: "2rem",
              backgroundColor: "#fff",
              flex: "1 1 280px",
              maxWidth: "360px",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "#000",
              }}
            >
              {item.title}
            </h3>
            <p style={{ color: "#666" }}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Portfolio Section */}
      <section
        style={{
          backgroundColor: "#fafafa",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Наши проекты
        </h2>
        <p
          style={{
            marginBottom: "3rem",
            maxWidth: "90vw",
            marginInline: "auto",
          }}
        >
          Посмотрите на реальные кейсы: мы гордимся качеством и вниманием к
          деталям.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              style={{
                height: "250px",
                width: "280px",
                backgroundColor: "#ddd",
                borderRadius: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
              }}
            >
              Проект {idx + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          backgroundColor: "#000",
          color: "white",
          padding: "4rem 1.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Готовы начать?
        </h2>
        <p style={{ marginBottom: "2rem", maxWidth: "90vw" }}>
          Свяжитесь с нами и получите бесплатную консультацию по вашему ремонту.
        </p>
        <button
          style={{
            fontSize: "1rem",
            padding: "1rem 2.5rem",
            borderRadius: "1rem",
            backgroundColor: "#e63946",
            color: "white",
            border: "none",
            boxShadow: "0 4px 14px rgba(255,255,255,0.2)",
            cursor: "pointer",
          }}
        >
          Записаться на замер
        </button>
      </section>
    </div>
  );
}
