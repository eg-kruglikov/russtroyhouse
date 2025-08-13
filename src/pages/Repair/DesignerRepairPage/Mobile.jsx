import React from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";

const DesignerRepairPageMobile = () => {
  const navigateWithMetrika = useNavigateWithMetrika();
  return (
    <>
      <button
        onClick={() => navigateWithMetrika("portfolio")}
        style={{
          position: "fixed",
          bottom: "30px", // отступ от низа
          right: "30px", // отступ от правого края
          padding: "14px 28px",
          backgroundColor: "#274251",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000,
          transition: "0.2s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#366078")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#274251")}
      >
        Вернуться на главную
      </button>
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
            height: "260px",
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
              filter: "brightness(0.7)",
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
              padding: "0 10px",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "12px",
                textShadow: "0 0 8px rgba(0,0,0,0.8)",
              }}
            >
              ДИЗАЙНЕРСКИЙ РЕМОНТ
            </h1>
            <p
              style={{
                fontSize: "14px",
                marginBottom: "18px",
                textShadow: "0 0 6px rgba(0,0,0,0.7)",
              }}
            >
              Создаём интерьеры с характером и изюминкой
            </p>
            <button
              style={{
                backgroundColor: "#FFD700",
                color: "#0a1a26",
                border: "none",
                borderRadius: "24px",
                padding: "10px 28px",
                fontWeight: "bold",
                fontSize: "16px",
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
            padding: "30px 16px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#FFD700",
              fontSize: "20px",
              marginBottom: "18px",
            }}
          >
            Особенности ремонта
          </h2>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
            Дизайнерский ремонт — это авторская работа, подбор премиальных
            материалов и внимание к каждой детали. Мы создаём интерьеры, которые
            радуют глаз и повышают комфорт жизни.
          </p>

          {[
            { title: "Индивидуальный проект", img: "/assets/designer_m1.jpg" },
            { title: "Премиальные материалы", img: "/assets/designer_m2.jpg" },
            { title: "Контроль качества", img: "/assets/designer_m3.jpg" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#122533",
                borderRadius: "12px",
                marginBottom: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "14px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    color: "#FFD700",
                    marginBottom: "6px",
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Галерея */}
        <div
          style={{
            backgroundColor: "#08131d",
            padding: "40px 16px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#FFD700",
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            Наши работы
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {[
              "/assets/designer_example1.jpg",
              "/assets/designer_example2.jpg",
              "/assets/designer_example3.jpg",
              "/assets/designer_example4.jpg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Пример ${i + 1}`}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Призыв к действию */}
        <div
          style={{
            textAlign: "center",
            padding: "40px 16px",
            backgroundColor: "#0a1a26",
          }}
        >
          <h2
            style={{
              color: "#FFD700",
              fontSize: "18px",
              marginBottom: "12px",
            }}
          >
            Бесплатный выезд замерщика и смета в подарок!
          </h2>
          <p style={{ fontSize: "14px", marginBottom: "20px" }}>
            Закажите дизайнерский ремонт и получите детальный расчёт бесплатно
          </p>
          <button
            style={{
              backgroundColor: "#FFD700",
              color: "#0a1a26",
              border: "none",
              borderRadius: "24px",
              padding: "10px 28px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </>
  );
};

export default DesignerRepairPageMobile;
