import "./App.css";
import React, { useState } from "react";
import { styles, headerStyles } from "./styles";
import { works, services } from "./moks";
import logo from "./assets/logo_russtroyhouse_header_new.png";
import ModalCallback from "./components/modalCallback";
import background from "./assets/background_new_3.jpg";
import officeMain from "./assets/office_main.jpg";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={styles.page}>
      <ModalCallback showModal={showModal} setShowModal={setShowModal} />
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          padding: "6px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="РусУютСтрой" style={{ height: "6vh" }} />
          <a
            href="tel:+7 (926) 408-18-11"
            style={{
              color: "#1c2e52",
              fontSize: "16px",
              textDecoration: "none",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span role="img" aria-label="phone">
              📞
            </span>
            +7 (926) 408-18-11
          </a>
        </div>
      </header>

      <section
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 16px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)", // для Safari
            padding: "40px 20px",
            borderRadius: "12px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              marginBottom: "16px",
              lineHeight: "1.2",
            }}
          >
            Ремонт квартир под ключ в Москве
          </h1>
          <p
            style={{
              fontSize: "20px",
              fontStyle: "italic",
              color: "#f97316",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Мы создаём уют
          </p>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "10px",
              lineHeight: "1.4",
            }}
          >
            Более 10 лет опыта. Работаем строго по договору.
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.4",
              marginBottom: "20px",
            }}
          >
            Гарантия, качество и соблюдение сроков от надёжной строительной
            компании
          </p>
          <button
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#f97316",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              maxWidth: "260px",
              margin: "0 auto",
            }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Оставить заявку
          </button>
          <p
            className="bookmark-reminder"
            style={{
              color: "#fff",
              textAlign: "center",
              marginTop: "12px",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            ⭐ Не забудьте добавить наш сайт в закладки, чтобы не потерять!{" "}
            <br />
            Это поможет быстро вернуться и завершить выбор 😊
          </p>
        </div>
      </section>

      <section id="services" style={styles.section}>
        <h2 style={styles.sectionTitle}>Наши услуги</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transition: "transform 0.2s ease",
              }}
            >
              <div style={{ fontSize: "32px" }}>{service.icon}</div>
              <div style={{ fontWeight: "600", fontSize: "18px" }}>
                {service.title}
              </div>
              <p style={{ fontSize: "14px", color: "#333" }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="works" style={styles.section}>
        <h2 style={styles.sectionTitle}>Наши работы</h2>
        <div style={styles.grid}>
          {works.map((work) => (
            <div key={work.id} style={styles.card}>
              <img src={work.image} alt={work.title} style={styles.image} />
              <div style={styles.cardTitle}>{work.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="office" style={styles.section}>
        <h2 style={styles.sectionTitle}>Наш офис</h2>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <img
            src={officeMain}
            alt="Офис компании РусУютСтрой"
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              objectFit: "cover",
            }}
          />
          <p
            style={{
              marginTop: "16px",
              fontSize: "16px",
              color: "#333",
              lineHeight: "1.5",
            }}
          >
            Мы работаем в уютном офисе с видом на набережную. Здесь мы встречаем
            клиентов, обсуждаем проекты и подписываем договоры.
          </p>
          <p
            style={{
              marginTop: "8px",
              fontSize: "15px",
              color: "#555",
            }}
          >
            📍 Московская область, г. Балашиха, пр-т Ленина, д. 32
          </p>
        </div>
      </section>

      <footer
        style={{
          backgroundColor: "#1e2c50",
          color: "#fff",
          textAlign: "center",
          padding: "30px 20px",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      >
        <p>ИП Самылкина Юлия Николаевна ИНН/КПП: 5029189414 / 775101001</p>
        <p>
          Адрес: Королёв, ул Проспект Королева 5 д, ТРЦ — Статус, 3 этаж, офис
          315
        </p>
        <p style={{ marginTop: "8px" }}>
          <a
            href="mailto:rus_pd@mail.ru"
            style={{
              color: "#fff",
              textDecoration: "underline",
              marginRight: "16px",
            }}
          >
            rus_pd@mail.ru
          </a>
          <a
            href="tel:+79264081811"
            style={{
              color: "#fff",
              textDecoration: "underline",
            }}
          >
            +7 (926) 408-18-11
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
