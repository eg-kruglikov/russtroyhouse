import "./App.css";
import React, { useEffect, useState } from "react";
import { styles, headerStyles } from "./styles";
import { works, services } from "./moks";
import logo from "./assets/logo_russtroyhouse_header.png";
import ModalCallback from "./components/modalCallback";
import background from "./assets/background.jpg";
import officeMain from "./assets/office_main.jpg";
import mobileImage from "./assets/about_mobile.jpg";
import desktopImage from "./assets/about_desktop.jpg";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styles.page}>
      <ModalCallback showModal={showModal} setShowModal={setShowModal} />
      {/* шапочка */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#ffffff", // чисто белый фон
          padding: "6px 0", // чуть меньше отступов по высоте
          zIndex: 1000,
          borderBottom: isScrolled ? "1px solid #ddd" : "1px solid #eee",
          boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s ease, border-bottom 0.3s ease",
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
          <img src={logo} alt="РусУютСтрой" style={{ height: "5vh" }} />{" "}
          {/* уменьшил логотип */}
          <a
            href="tel:+79264081811"
            style={{
              color: "#222222", // красивый строгий чёрный цвет
              fontSize: "15px", // чуть крупнее для солидности
              textDecoration: "none",
              fontWeight: "600",
              fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif", // строгий красивый шрифт
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

      {/* hero  */}
      <section
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 16px",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "32px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // белая подложка
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              marginBottom: "16px",
              lineHeight: "1.2",
              color: "#1d2d3c", // тёмный текст
            }}
          >
            РЕМОНТ КВАРТИРЫ ПОД КЛЮЧ
          </h1>

          <p
            style={{
              fontSize: "16px",
              marginBottom: "20px",
              color: "#8DD13B", // зелёная строка
              fontStyle: "italic",
              fontWeight: "600",
            }}
          >
            Гарантия до 3 лет — Честно, чётко и по договору
          </p>

          <div
            style={{
              fontSize: "15px",
              lineHeight: "1.6",
              marginBottom: "24px",
              textAlign: "left",
              maxWidth: "400px",
              margin: "0 auto 24px",
              color: "#1d2d3c", // тёмный текст
            }}
          >
            <p>✔️ Бесплатный выезд замерщика</p>
            <p>✔️ Честная смета без скрытых платежей</p>
            <p>✔️ Работаем в Королёве, Мытищах и Пушкино</p>
            <p>✔️ Договор и гарантия до 3 лет</p>
            <p>✔️ Ремонт без стресса и переплат</p>
          </div>

          <button
            style={{
              padding: "14px 20px",
              fontSize: "16px",
              backgroundColor: "#ff6a00",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              width: "100%",
              maxWidth: "280px",
              margin: "0 auto",
              display: "block",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e55a00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6a00")}
            onClick={() => setShowModal(true)}
          >
            Узнать стоимость ремонта
          </button>
        </div>
      </section>
      {/* мы в тг */}
      <section
        style={{
          paddingTop: "16px",
          backgroundColor: "#f8f8f8",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "32px", marginBottom: "16px", color: "#1d2d3c" }}
        >
          Мы в Telegram
        </h2>
        <p
          style={{
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto 32px",
            color: "#444",
          }}
        >
          Рассказываем о нюансах ремонта, делимся опытом, показываем, как
          создаём уют в квартирах и домах. Присоединяйтесь!
        </p>
        <a
          href="https://t.me/russtroyhouse"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#0088cc",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0077b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0088cc")}
        >
          Перейти в канал
        </a>
      </section>
      {/* почему мы */}
      <section
        id="why-us"
        style={{
          backgroundColor: "#f8f9fb",
          paddingTop: "50px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "36px",
              fontWeight: "700",
              color: "#1d2d3c",
              marginBottom: "30px",
            }}
          >
            Почему именно мы?
          </h2>
          {[
            {
              icon: "🎯",
              title: "Опыт, проверенный временем",
              text: "Мы работаем более 10 лет и успели реализовать десятки проектов. Для нас ремонт — это не просто стены и обои, а комфорт и надёжность для жизни.",
            },
            {
              icon: "🤝",
              title: "Договор и прозрачность",
              text: "Заключаем официальный договор с чёткими сроками, фиксированной сметой и гарантией на все виды работ до 3 лет.",
            },
            {
              icon: "📸",
              title: "Контроль в каждый день",
              text: "Ежедневные фотоотчёты в мессенджере — вы всегда знаете, что происходит на объекте.",
            },
            {
              icon: "🛠️",
              title: "Наши принципы — уют, качество, честность",
              text: "Мы не обещаем «евроремонт за 3 дня», но точно сделаем красиво, аккуратно и без нервов. Большинство клиентов приходят по рекомендации.",
            },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", maxWidth: "700px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#1d2d3c",
                  borderBottom: "2px solid #ff6a00",
                  display: "inline-block",
                  paddingBottom: "6px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ marginRight: "8px" }}>{item.icon}</span>
                {item.title}
              </h3>
              <p style={{ color: "#444", fontSize: "16px", lineHeight: "1.6" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* наши услуги */}
      <section
        id="services"
        style={{
          padding: "60px 16px",
          backgroundColor: "#f9f9f9",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "28px", marginBottom: "40px", fontWeight: "700" }}
        >
          Наши услуги
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "20px 10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                minHeight: "100px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: "32px" }}>{service.icon}</div>
              <div style={{ fontWeight: "600", fontSize: "16px" }}>
                {service.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* наши работы */}
      <section
        id="works"
        style={{
          backgroundColor: "#f4f4f4",
          padding: "60px 0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "40px",
            fontWeight: "700",
            color: "#1d2d3c",
          }}
        >
          Наши работы
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // стало 280
            gap: "24px",
            padding: "0 16px", // убираем боковой перекос
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {works.slice(0, 4).map((work) => (
            <div
              key={work.id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
              }}
            >
              <img
                src={work.image}
                alt={work.title}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "16px" }}>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    marginBottom: "4px",
                    color: "#1d2d3c",
                  }}
                >
                  {work.title}
                </div>
                <div style={{ fontSize: "14px", color: "#555" }}>
                  {work.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginTop: "30px",
          }}
        >
          <a
            href="https://drive.google.com/drive/u/0/folders/1au473YHcyqS1ljb4khUtKmFAJoL6BU12?sort=13&direction=a"
            style={{
              textDecoration: "none",
              color: "#1c2e52",
              fontSize: "18px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            📸 Больше работ →
          </a>
          <a
            href="https://drive.google.com/drive/u/0/folders/1-3j-D4J7TcQJhco5obTsstmo9-6BEaAD?sort=13&direction=a"
            style={{
              textDecoration: "none",
              color: "#1c2e52",
              fontSize: "18px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🎨 Дизайн проекты →
          </a>
        </div>
      </section>

      {/* НАШ ОФИС */}
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
            Это наш уютный офис, здесь мы встречаем клиентов, обсуждаем проекты
            и подписываем договоры.
          </p>
          <p
            style={{
              marginTop: "8px",
              fontSize: "15px",
              color: "#555",
            }}
          >
            📍 Московская область, г. Королёв, ул Проспект Королева 5 д, ТРЦ —
            Статус, 3 этаж, офис 315
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
        <p>
          ИП Самылкина Юлия Николаевна ИНН 501822549790 | ОГРНИП 323508100309453
        </p>
        <p>
          Юр Адрес: РОССИЯ, 141134, Московская обл, р-н Щелковский, мкр. Лосиный
          парк, туп. Кедровый, д. 6
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
