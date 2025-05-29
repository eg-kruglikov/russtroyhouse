import React, { useState } from "react";
import background from "./assets/background.jpg";
import logo from "./assets/logo_white.png";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Главная", "О нас", "Портфолио", "Услуги", "Контакты"];

  const yellow = "#FFD700";
  const dark = "#486072";
  const light = "#ffffff";

  return (
    <div
      style={{ fontFamily: "sans-serif", backgroundColor: dark, color: light }}
    >
      {/* Шапка */}
      <header
        style={{
          position: "fixed",
          width: "calc(100vw - 31px)",
          height: "60px",
          backgroundColor: "#486072",
          marginTop: "-8px",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 auto",
            height: "100%",
            
          }}
        >
          {/* Логотип */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Логотип" style={{ height: "44px" }} />
          </div>

          {/* Меню */}
          <nav style={{ display: "flex", gap: "32px" }}>
            {["ГЛАВНАЯ", "О НАС", "ПОРТФОЛИО", "УСЛУГИ", "КОНТАКТЫ"].map(
              (item, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "80px", // визуальное смещение блока вниз
          boxSizing: "border-box",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "96px",
            fontWeight: 900,
            color: "#ffffff",
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
            margin: "0 0 12px 0",
            letterSpacing: "1px",
          }}
        >
          РЕМОНТ
        </h1>

        <h2
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "#ffffff",
            textShadow: "0 3px 10px rgba(0, 0, 0, 0.5)",
            marginBottom: "36px",
          }}
        >
          НАЧИНАЕТСЯ ЗДЕСЬ
        </h2>

        <button
          style={{
            backgroundColor: "#FFD700",
            color: "#000",
            fontWeight: "700",
            fontSize: "18px",
            padding: "14px 40px",
            border: "none",
            borderRadius: "32px",
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
            transition: "transform 0.2s ease",
          }}
        >
          ЗАКАЗАТЬ
        </button>
      </section>

      {/* Кто мы */}
      <section
        style={{
          backgroundColor: "#1c1c1c",
          padding: "80px 0px",
          textAlign: "center",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "24px", color: "#ccc" }}>
          КТО МЫ?
        </h2>
        <p
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "18px",
            color: "#aaa",
          }}
        >
          Мы работаем более 10 лет и успели реализовать сотни проектов. Для нас
          ремонт — это не просто стены и обои, а комфорт и надёжность для жизни.{" "}
          <br />
          <br />
          Заключаем официальный договор с чёткими сроками, фиксированной сметой
          и гарантией до 3 лет. <br />
          <br />
          Мы не обещаем "евроремонт за 3 дня", но точно сделаем красиво,
          аккуратно и без нервов. Большинство клиентов приходят по рекомендации.
        </p>
      </section>

      {/* Наши услуги */}
      <section
        style={{
          backgroundColor: "#000",
          padding: "80px 0px",
          textAlign: "center",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "40px", color: "#fff" }}>
          НАШИ УСЛУГИ
        </h2>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
          }}
        >
          {[
            {
              title: "КОСМЕТИЧЕСКИЙ РЕМОНТ",
              text: "Лёгкое обновление – покраска, обои, замена покрытий, освежение интерьера.",
              number: 1,
            },
            {
              title: "КАПИТАЛЬНЫЙ РЕМОНТ",
              text: "Замена коммуникаций, выравнивание стен, перепланировка, демонтаж, полная замена электрики.",
              number: 2,
            },
            {
              title: "ДИЗАЙНЕРСКИЙ РЕМОНТ",
              text: "Уникальные интерьеры под ключ. Визуальные концепции и премиальные материалы. Зонирование кухни – гостиной.",
              number: 3,
            },
          ].map((item) => (
            <div key={item.number} style={{ textAlign: "left", color: "#fff" }}>
              <div
                style={{
                  fontSize: "20px",
                  marginBottom: "6px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#333",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  {item.number}
                </span>
                {item.title}
              </div>
              <p
                style={{ color: "#ccc", fontSize: "16px", paddingLeft: "42px" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <button
          style={{
            marginTop: "40px",
            backgroundColor: yellow,
            color: "#000",
            padding: "12px 24px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ЗАКАЗАТЬ ЗВОНОК
        </button>
      </section>
    </div>
  );
};

export default App;
