import React from "react";

const DesignerRepairPageDesktop = () => {
  return (
    <div
      style={{
        backgroundColor: "#0a1a26", // Тёмный фон сайта
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      {/* Hero */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "480px",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/repair/designer/hero.jpg"
          alt="Дизайнерский ремонт"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.8)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "20px",
              textShadow: "0 0 12px rgba(0,0,0,0.8)",
            }}
          >
            ДИЗАЙНЕРСКИЙ РЕМОНТ
          </h1>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "30px",
              textShadow: "0 0 8px rgba(0,0,0,0.7)",
            }}
          >
            Мы создаём интерьеры, которые восхищают с первого взгляда
          </p>
          <button
            style={{
              backgroundColor: "#FFD700",
              color: "#0a1a26",
              border: "none",
              borderRadius: "30px",
              padding: "14px 40px",
              fontWeight: "bold",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Получить консультацию
          </button>
        </div>
      </div>

      {/* Описание */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#FFD700",
            fontSize: "36px",
            marginBottom: "30px",
          }}
        >
          Особенности дизайнерского ремонта
        </h2>
        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            marginBottom: "50px",
          }}
        >
          Дизайнерский ремонт — это не просто отделка помещений, а создание
          уникального интерьера с авторской концепцией. Мы учитываем стиль жизни
          заказчика, освещение, эргономику пространства и современные материалы.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          {[
            {
              title: "Индивидуальный дизайн-проект",
              img: "/assets/designer_1.jpg",
            },
            { title: "Премиальные материалы", img: "/assets/designer_2.jpg" },
            {
              title: "Контроль качества на всех этапах",
              img: "/assets/designer_3.jpg",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#122533",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                transition: "transform 0.3s",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    color: "#FFD700",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Галерея */}
      <div
        style={{
          backgroundColor: "#08131d",
          padding: "60px 0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#FFD700",
            fontSize: "36px",
            marginBottom: "40px",
          }}
        >
          Наши работы
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {[
            "/assets/designer_example1.jpg",
            "/assets/designer_example2.jpg",
            "/assets/designer_example3.jpg",
            "/assets/designer_example4.jpg",
            "/assets/designer_example5.jpg",
            "/assets/designer_example6.jpg",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Пример ${i + 1}`}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Призыв к действию */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundColor: "#0a1a26",
        }}
      >
        <h2
          style={{
            color: "#FFD700",
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          Бесплатный выезд замерщика и смета в подарок!
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Закажите дизайнерский ремонт и получите детальный расчёт бесплатно
        </p>
        <button
          style={{
            backgroundColor: "#FFD700",
            color: "#0a1a26",
            border: "none",
            borderRadius: "30px",
            padding: "14px 40px",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Оставить заявку
        </button>
      </div>
    </div>
  );
};

export default DesignerRepairPageDesktop;
