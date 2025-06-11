// blocks/Footer.jsx

import React from "react";

const Footer = () => (
  <footer
    style={{
      backgroundColor: "#0a1a23",
      color: "#fff",
      padding: "32px 16px",
      textAlign: "center",
      fontSize: "14px",
    }}
  >
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px" }}>
        📍 МОСКОВСКАЯ ОБЛАСТЬ, Г. КОРОЛЁВ, УЛ ПРОСПЕКТ КОРОЛЁВА 5Д, ТРЦ —
        СТАТУС, 3 ЭТАЖ, ОФИС 315
      </div>
      <div style={{ fontSize: "13px", opacity: 0.9 }}>
        ИП САМЫЛКИНА ЮЛИЯ НИКОЛАЕВНА · ИНН 501822549790 · ОГРНИП 323508100309453
        <br />
        ЮР АДРЕС: РОССИЯ, 141134, МОСКОВСКАЯ ОБЛ., Р-Н ЩЕЛКОВСКИЙ, МКР. ЛОСИНЫЙ
        ПАРК, ТУП. КЕДРОВЫЙ, Д. 6
        <br />
        <a
          href="mailto:rus_pd@mail.ru"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          rus_pd@mail.ru
        </a>{" "}
        ·{" "}
        <a href="tel:+79264081811" style={{ color: "#fff" }}>
          +7 (926) 408-18-11
        </a>
      </div>
    </div>

    <div
      style={{
        backgroundColor: "#111",
        color: "#ccc",
        padding: "20px 12px 8px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ fontWeight: "600", fontSize: "16px", color: "#fff" }}>
        © 2025 РусУютСтрой
      </div>
      <div style={{ marginTop: "4px", fontSize: "13px" }}>
        Москва и область ·{" "}
        <a
          href="tel:+79264081811"
          style={{ color: "#f2cb05", fontWeight: "bold" }}
        >
          +7 (926) 408-18-11
        </a>
      </div>
      <div style={{ marginTop: "6px", fontSize: "13px", color: "#9aa" }}>
        Сделано для людей. Без фальши и дешёвого пафоса.
      </div>
      <div style={{ marginTop: "10px", fontSize: "13px" }}>
        Сайт, дизайн и продвижение:{" "}
        <a
          href="https://metalgears.ru"
          style={{ color: "#f2cb05", fontWeight: "500" }}
        >
          MetalGears
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
