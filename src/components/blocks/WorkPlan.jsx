import React from "react";

const steps = [
  {
    title: "Созвон / Заявка",
    description: "Оставляете заявку на сайте или звоните нам.",
    icon: "📞",
  },
  {
    title: "Выезд и смета",
    description: "Приезжаем на объект, оцениваем работы, составляем смету.",
    icon: "📄",
  },
  {
    title: "Начало ремонта",
    description: "Подписываем договор, закупаем материалы и начинаем ремонт.",
    icon: "🛠️",
  },
  {
    title: "Сдача объекта",
    description: "Финальный осмотр и передача готового объекта с гарантией.",
    icon: "🔑",
  },
];

export default function WorkPlan() {
  return (
    <section
      style={{
        padding: "60px 20px",
        backgroundColor: "#0a1a24", // тёмный фон сайта
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "40px",
          fontWeight: "700",
          color: "#f9d423", // жёлтый заголовок
        }}
      >
        ЭТАПЫ РАБОТЫ
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#102533",
              borderRadius: "12px",
              padding: "24px 16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>
              {step.icon}
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#fff",
              }}
            >
              {step.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#bbb" }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
