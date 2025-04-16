import "./App.css";
import React, { useState } from "react";
import { styles, headerStyles } from "./styles";
import { works, services } from "./moks";
import logo from "./assets/logo_russtroyhouse_header_new.png";
import ModalCallback from "./components/modalCallback";

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
          <img src={logo} alt="РусУютСтрой" style={{ height: "7vh" }} />
          <a
            href="tel:+79991234567"
            style={{
              color: "#1c2e52",
              fontSize: "20px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            +7 (999) 123-45-67
          </a>
        </div>
      </header>

      <section style={styles.section}>
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#1c2e52",
          }}
        >
          Ремонт квартир под ключ в Москве
        </h2>
        <p
          style={{
            fontSize: "24px",
            color: "#f97316",
            fontStyle: "italic",
            marginBottom: "30px",
            fontWeight: "800",
          }}
        >
          Мы создаём уют
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          Гарантия, качество и соблюдение сроков от надёжной строительной
          компании
        </p>
        <button onClick={() => setShowModal(true)} style={styles.button}>
          Оставить заявку
        </button>
      </section>

      <section id="services" style={styles.section}>
        <h2 style={styles.sectionTitle}>Наши услуги</h2>
        <div style={styles.grid}>
          {services.map((service, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardTitle}>{service}</div>
              <p style={styles.text}>
                Подробнее об этой услуге вы можете узнать у нашего менеджера.
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

      <section id="about" style={styles.section}>
        <h2 style={styles.sectionTitle}>Ваше спокойствие — наша работа</h2>
        <p style={styles.sectionText}>
          С нами вы можете не беспокоиться о сроках, качестве и контроле. Мы
          работаем строго по договору, предоставляем ежедневные фотоотчёты и
          даём гарантию на все виды работ. Более 10 лет опыта и сотни довольных
          клиентов позволяют нам решать задачи любой сложности профессионально и
          надёжно.
        </p>
        <button style={styles.button}>Узнать больше</button>
      </section>

      <section id="contact" style={styles.section}>
        <h2 style={styles.sectionTitle}>Оставьте заявку</h2>
        <p style={styles.sectionText}>
          Наш менеджер свяжется с вами в течение 15 минут
        </p>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Ваше имя"
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="tel"
            placeholder="Телефон"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Отправить
          </button>
        </form>
      </section>

      <footer style={styles.footer}>
        <p>ООО «РусУютСтрой»</p>
        <p>ИНН: 5032309990 / ОГРН: 1235000050982</p>
        <p>Адрес: Московская область, г. Балашиха, пр-т Ленина, д. 32</p>
        <p>Email: info@russtroyhouse.ru | Телефон: +7 (999) 123-45-67</p>
        <p>© {new Date().getFullYear()} РусУютСтрой. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App;
