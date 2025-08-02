import "./App.css";
import React, { useEffect, useState } from "react";
import { styles, headerStyles } from "./styles";
import { works, services, repairTypes } from "./moks";
import logo from "./assets/logo_russtroyhouse_header.png";
import ModalCallback from "./components/modalCallback";
import background from "./assets/background.jpg";
import officeMain from "./assets/office_main.jpg";
import mobileImage from "./assets/about_mobile.jpg";
import desktopImage from "./assets/about_desktop.jpg";
import ModalConfirmCall from "./components/ModalConfirmCall";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function App() {
  const [showModalCallback, setShowModalCallback] = useState(false);
  const [showModalConfirmCall, setShowModalConfirmCall] = useState(false);

  const [hidenTel, setHidenTel] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f1f3f6",
        // backgroundColor: "#fffaf1",
        color: "#333",
      }}
    >
      <ModalCallback
        showModal={showModalCallback}
        setShowModal={setShowModalCallback}
      />
      <ModalConfirmCall
        showModal={showModalConfirmCall}
        setShowModal={setShowModalConfirmCall}
        setHidenTel={setHidenTel}
      />
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
          borderBottom: "1px solid #ddd",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
          {hidenTel ? (
            <a
              href="tel:+79264081811"
              onClick={(e) => {
                e.preventDefault();
                setShowModalConfirmCall(true);
              }}
              style={{
                color: "#222",
                fontSize: "15px",
                textDecoration: "none",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Segoe UI', 'Roboto', sans-serif",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span role="img" aria-label="phone">
                📞
              </span>
              <span style={{ color: "#000" }}>+7 (926)</span>
              <span
                style={{
                  marginLeft: "4px",
                  display: "inline-block",
                  color: "#000", // для fallback
                  WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)",
                  maskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  opacity: 1,
                }}
              >
                408-18-11
              </span>
            </a>
          ) : (
            <a
              href="tel:+79264081811"
              style={{
                color: "#222222",
                fontSize: "15px",
                textDecoration: "none",
                fontWeight: "600",
                fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onClick={(e) => {
                e.preventDefault();
                setShowModalConfirmCall(true);
              }}
            >
              <span role="img" aria-label="phone">
                📞
              </span>
              +7 (926) 408-18-11
            </a>
          )}
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

          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "32px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "1.4",
              marginBottom: "16px",
              color: "#1d2d3c",
            }}
          >
            <div>РЕМОНТ КВАРТИРЫ ПОД КЛЮЧ</div>
            <div style={{ whiteSpace: "nowrap", fontWeight: "400" }}>
              от{" "}
              <span style={{ color: "#ff6a00", fontWeight: "700" }}>
                5 500 ₽/м<sup>2</sup>
              </span>
            </div>
          </h1>

          <p
            style={{
              fontSize: "18px",
              marginBottom: "12px",
              color: "#8DD13B",
              fontStyle: "italic",
              fontWeight: "700",
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
              color: "#1d2d3c",
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
            onClick={() => setShowModalCallback(true)}
          >
            Узнать стоимость ремонта
          </button>
        </div>
      </section>
      {/* new */}
      <section
        id="why-us"
        style={{
          backgroundColor: "#f8f9fb",
          padding: "50px 16px",
          boxSizing: "border-box",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // 👈 для мобил
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {repairTypes.map((type, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 300px", // 👈 автоматическая адаптация
                minWidth: "280px",
                maxWidth: "100%",
                backgroundColor: type.bgColor,
                padding: "24px",
                borderRadius: "16px",
                color: type.textColor,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  borderBottom: `2px solid ${
                    type.accentColor || type.textColor
                  }`,
                  paddingBottom: "6px",
                  color: type.headingColor || type.textColor,
                }}
              >
                {type.title}
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  marginBottom: "24px",
                  lineHeight: "1.5",
                  color: type.textColor,
                }}
              >
                {type.description}
              </p>

              <div style={{ display: "grid", gap: "16px" }}>
                {type.photos.map((photo, i) => (
                  <div key={i}>
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "8px",
                        color: type.textColor,
                        opacity: 0.8,
                      }}
                    >
                      {photo.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* почему мы */}
      <section
        id="why-us"
        style={{
          backgroundColor: "#f8f9fb",
          paddingTop: "50px",
          boxSizing: "border-box",
          maxWidth: "1200px",
          margin: "0 auto",
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
              text: "Мы работаем более 10 лет и успели реализовать сотни проектов! Для нас ремонт — это не просто стены и обои, а комфорт и надёжность для жизни.",
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
          padding: "60px 0px",
          backgroundColor: "#f9f9f9",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
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
          backgroundColor: "#f9f9f9",
          padding: "60px 0",
          maxWidth: "1200px",
          margin: "0 auto",
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
              top: isMobile ? "80svh" : "79.6svh",
            }}
          >
            🎨 Дизайн проекты →
          </a>
        </div>
      </section>
      <img
        src={phoneIcon}
        alt="phoneIcon"
        style={{
          width: isMobile ? "60px" : "90px",
          height: "auto",
          position: "fixed",
          zIndex: 1,
          top: isMobile ? "80svh" : "79.6svh",
          left: isMobile ? "calc(85% - 7px)" : "79%",
          transform: "translateX(-50%)",
        }}
      />
      <button
        style={{
          position: "absolute",
          zIndex: 1,
          top: "75svh",
          left: "50.5%",
          transform: "translate(-50%, -52.6%)",
          backgroundColor: "#FFD700",
          color: "#000",
          fontWeight: "790",
          fontSize: "24px",
          padding: isMobile ? "16px 26px" : "26px 40px",
          border: "none",
          borderRadius: "40px",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
          transition: "transform 0.2s ease",
        }}
      >
        ЗАКАЗАТЬ
      </button>

      {/* мы в тг */}
      <section
        style={{
          paddingTop: "16px",
          backgroundColor: "#f8f8f8",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
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

      {/* НАШ ОФИС */}
      <section
        id="office"
        style={{
          padding: "40px 16px",
          textAlign: "center",
          boxSizing: "border-box",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={styles.sectionTitle}>Наш офис</h2>
        <div
          style={{
            textAlign: "center",
            maxWidth: "1200px",
            margin: "0 auto",
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
