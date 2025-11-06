import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionModal from "../../components/windows/FeedbackModal";
import Map from "../../components/blocks/Map";
import Footer from "../../components/blocks/Footer";
import { usePressEffect } from "../../hooks/useSomething";
import { ymGoal } from "../../utils/metrika";
import { useMetrikaActivity } from "../../hooks/useMetrikaActivity";

const WA_LINK = `https://wa.me/79264081811?text=${encodeURIComponent(
  "Здравствуйте! Хочу обсудить ремонт."
)}`;
const TG_CHANNEL = "https://t.me/russtroyhouse";

// ====== СТИЛИ ======
const deep = "#0a1a26";
const yellow = "#FFD700";
const whiteSoft = "rgba(255,255,255,.9)";
const borderSoft = "1px solid rgba(255,255,255,.10)";

const Page = {
  minHeight: "100vh",
  paddingTop: "60px",
  background: deep,
  color: "#fff",
  fontFamily: "'Arial', sans-serif",
};

// удалён локальный Header — используется глобальный Header из приложения

const Main = { maxWidth: 980, margin: "0 auto", padding: "20px" };
const H1 = {
  fontSize: 28,
  textAlign: "center",
  margin: "8px 0 6px",
  fontWeight: 800,
};
const Lead = {
  textAlign: "center",
  opacity: 0.9,
  fontSize: 14,
  marginBottom: 18,
  lineHeight: 1.45,
};
const Cards = { display: "grid", gap: 16 };
const Card = {
  borderRadius: 0,
  background: "transparent",
  boxShadow: "none",
  border: "none",
  padding: 0,
};
const CardHead = { fontWeight: 900, fontSize: 20, marginBottom: 10 };
const CardText = {
  opacity: 0.95,
  lineHeight: 1.6,
  fontSize: 15,
  marginBottom: 12,
};
const BtnWrap = { display: "flex", justifyContent: "center", width: "100%" };

const BtnBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "12px 20px",
  borderRadius: 12,
  fontWeight: 800,
  fontSize: 15,
  cursor: "pointer",
  textDecoration: "none",
  boxShadow: "0 6px 18px rgba(0,0,0,.2)",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
};

const BtnFilled = {
  ...BtnBase,
  background: yellow,
  color: deep,
  border: "none",
};
const BtnOutline = {
  ...BtnBase,
  background: "transparent",
  color: "#fff",
  border: "2px solid rgba(255,255,255,.9)",
};

const IconPhone = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.1 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.79.59 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.21a2 2 0 0 1 2.11-.45c.86.27 1.75.47 2.65.59A2 2 0 0 1 22 16.92Z"
      fill={deep}
    />
  </svg>
);

const ContactsPage = () => {
  const navigate = useNavigate();
  const [numberDisplayed, setNumberDisplayed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const press = usePressEffect();

  // Отслеживаем активность пользователя (скролл, время на странице)
  useMetrikaActivity();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showNumber = () => {
    if (!numberDisplayed) {
      ymGoal("call_confirmed");
      setNumberDisplayed(true);
    }
  };

  const confirmCall = () => {
    ymGoal("call_confirmed");
    window.location.href = "tel:+79264081811";
  };

  // универсальная кнопка
  const Btn = ({ children, href, onClick, outline, icon }) => {
    const style = outline ? BtnOutline : BtnFilled;
    if (href) {
      return (
        <div style={BtnWrap}>
          <a
            {...press}
            href={href}
            style={{ ...press.style, ...style }}
            rel="noopener noreferrer"
            target={href.startsWith("http") ? "_blank" : undefined}
            onClick={onClick}
          >
            {icon}
            <span>{children}</span>
          </a>
        </div>
      );
    }
    return (
      <div style={BtnWrap}>
        <button
          {...press}
          style={{ ...press.style, ...style }}
          onClick={onClick}
        >
          {icon}
          <span>{children}</span>
        </button>
      </div>
    );
  };

  // обёртка для целей
  const wrap =
    (cb, goalName, extra = {}) =>
    (e) => {
      if (e && e.preventDefault) e.preventDefault();
      ymGoal(goalName, extra);
      setTimeout(() => cb?.(), 150); // задержка, чтобы успел отработать reachGoal
    };

  return (
    <div style={Page}>
      <QuestionModal
        isOpen={questioModalOpen}
        onClose={() => setQuestioModalOpen(false)}
        isMobile={isMobile}
      />

      {/* локальная шапка удалена */}

      {/* Main */}
      <div style={Main}>

        <div style={Cards}>
          {/* Акция */}
          <section style={{ ...Card }}>
            <div
              style={{
                ...CardHead,
                color: yellow,
                fontSize: 28,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Акция осени
              <span style={{ fontSize: 28 }}>🍂</span>
            </div>
            <div
              style={{
                ...CardText,
                fontSize: 15,
                fontWeight: 600,
                opacity: 0.9,
                marginBottom: 14,
                paddingLeft: 12,
                borderLeft: "3px solid rgba(255,215,0,.5)",
              }}
            >
              Пока конкуренты повышают цены на зиму — мы даём скидки!
              Зафиксируйте выгодную стоимость сейчас.
            </div>
            <div style={{ ...CardText, fontSize: 16, fontWeight: 500 }}>
              Скажите{" "}
              <span style={{ color: yellow, fontWeight: 800 }}>
                "Ремонт 2025"
              </span>{" "}
              при первом звонке и получите{" "}
              <span style={{ color: yellow, fontWeight: 800 }}>
                скидку до 10%
              </span>{" "}
              на любой вид ремонта!
            </div>
            <div
              style={{
                padding: 0,
                borderRadius: 0,
                background: "transparent",
                border: "none",
                fontSize: 13,
                opacity: 0.85,
                textAlign: "left",
                marginBottom: 8,
              }}
            >
              ⏰ Акция действует до конца года
            </div>
            <div
              style={{
                padding: 0,
                borderRadius: 0,
                background: "transparent",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                opacity: 0.9,
                textAlign: "left",
                color: "#ff9966",
              }}
            >
              🔥 Количество мест в акции ограничено
            </div>
          </section>

          {/* Способы связи + Оставить заявку (единый блок, чтобы сократить интервал) */}
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                fontWeight: 900,
                fontSize: 30,
                color: "#ffffff",
                marginBottom: 4,
              }}
            >
              Способы связи
            </div>
            <section style={Card}>
              <div style={CardHead}>Оставить заявку</div>
              <div style={CardText}>
                Оставьте номер телефона — мы перезвоним в течение 15 минут и
                ответим на все вопросы.
              </div>
              <Btn
                onClick={() => setQuestioModalOpen(true)}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      fill={deep}
                    />
                  </svg>
                }
              >
                Заказать звонок
              </Btn>
            </section>
          </div>

          {/* Позвонить */}
          <section style={Card}>
            <div style={CardHead}>Позвонить</div>
            <div style={CardText}>
              Позвоните прямо сейчас — ответим на любой вопрос и сориентируем по
              срокам и стоимости.
            </div>
            <Btn
              onClick={() => {
                if (isMobile) confirmCall();
                else showNumber();
              }}
              icon={IconPhone}
            >
              {numberDisplayed ? "+7 (926) 408-18-11" : "Позвонить"}
            </Btn>
          </section>

          {/* WhatsApp */}
          <section style={Card}>
            <div style={CardHead}>Написать в WhatsApp</div>
            <div style={CardText}>
              Если неудобно говорить — с удовольствием ответим Вам в чате.
            </div>
            <Btn
              href={WA_LINK}
              onClick={wrap(
                () => window.open(WA_LINK, "_blank"),
                "lead_whatsapp"
              )}
              icon={
                <img
                  alt="WhatsApp"
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  style={{ width: 24, height: 24, display: "block" }}
                />
              }
            >
              <span style={{ color: "black", fontWeight: 700 }}>
                Написать&nbsp;
              </span>
              <span style={{ color: "white", fontWeight: 700 }}>WhatsApp</span>
            </Btn>
          </section>

          {/* Telegram */}
          <section style={Card}>
            <div style={CardHead}>Наш Telegram-канал</div>
            <div style={CardText}>
              Делимся советами и показываем наши объекты.
            </div>
            <Btn
              href={TG_CHANNEL}
              outline
              onClick={wrap(
                () => window.open(TG_CHANNEL, "_blank"),
                "contacts_telegram_channel"
              )}
              icon={
                <img
                  alt="Telegram"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                  style={{ width: 18, height: 18, display: "block" }}
                />
              }
            >
              Открыть канал
            </Btn>
          </section>

          {/* Кнопка На главную удалена */}
        </div>
      </div>
      {/* Карта и контакты */}
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          padding: "32px 0",
        }}
      >
        <Map />
      </div>

      <Footer />
    </div>
  );
};

export default ContactsPage;
