import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionModal from "../../components/windows/FeedbackModal";

/** безопасный триггер метрики (не упадёт, если ym нет) */
const goal = (name, params = {}) => {
  try {
    if (window?.ym) window.ym(101296472, "reachGoal", name, params);
  } catch {}
};

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
  background: deep,
  color: "#fff",
  fontFamily: "'Arial', sans-serif",
};

const Header = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "16px 20px",
  borderBottom: "1px solid rgba(255,255,255,.08)",
  position: "sticky",
  top: 0,
  zIndex: 5,
  background: deep,
};

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
  borderRadius: 18,
  background:
    "radial-gradient(140% 140% at 0% 0%, rgba(255,215,0,.06) 0%, rgba(15,36,49,1) 55%)",
  boxShadow: "0 10px 28px rgba(0,0,0,.28)",
  border: borderSoft,
  padding: 16,
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
  gap: 12,
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 800,
  fontSize: 16,
  cursor: "pointer",
  textDecoration: "none",
  boxShadow: "0 8px 24px rgba(0,0,0,.25)",
  transition: "transform .06s ease",
  width: "auto",
  maxWidth: "560px",
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showNumber = () => {
    if (!numberDisplayed) {
      goal("call_confirmed");
      setNumberDisplayed(true);
    }
  };

  const confirmCall = () => {
    goal("call_confirmed");
    window.location.href = "tel:+79264081811";
  };

  // универсальная кнопка
  const Btn = ({ children, href, onClick, outline, icon }) => {
    const style = outline ? BtnOutline : BtnFilled;
    if (href) {
      return (
        <div style={BtnWrap}>
          <a
            href={href}
            style={style}
            rel="noopener noreferrer"
            target={href.startsWith("http") ? "_blank" : undefined}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(.98)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
          style={style}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
      goal(goalName, extra);
      setTimeout(() => cb?.(), 150); // задержка, чтобы успел отработать reachGoal
    };

  return (
    <div style={Page}>
      <QuestionModal
        isOpen={questioModalOpen}
        onClose={() => setQuestioModalOpen(false)}
        isMobile={isMobile}
      />

      {/* Header */}
      <div style={Header}>
        <img
          src="/logo.png"
          alt="РуссУютСтрой"
          style={{ width: 36, height: 36, borderRadius: 8, display: "block" }}
        />
        <div style={{ fontWeight: 900, fontSize: 18, color: whiteSoft }}>
          РуссУютСтрой
        </div>
      </div>

      {/* Main */}
      <div style={Main}>
        <h1 style={H1}>Связь</h1>
        <div style={Lead}>Любым удобным способом — отвечаем быстро.</div>

        <div style={Cards}>
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

          {/* Обратная связь */}
          <section style={Card}>
            <div style={CardHead}>Обратная связь</div>
            <div style={CardText}>
              Перезвоним вам сами — в любое удобное время. Оставьте номер и
              короткий комментарий.
            </div>
            <Btn onClick={() => setQuestioModalOpen(true)}>
              Заказать обратный звонок
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

          {/* На главную */}
          <div
            style={{
              ...Card,
              background: "transparent",
              border: "none",
              boxShadow: "none",
              paddingTop: 6,
            }}
          >
            <Btn
              outline
              onClick={wrap(() => navigate("/"), "contacts_home")}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              }
            >
              На главную
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
