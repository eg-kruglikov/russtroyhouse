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
      <div
        style={{
          fontSize: "13px",
          opacity: 0.9,
          width: "70%",
          margin: "0 auto",
        }}
      >
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
  </footer>
);

export default Footer;
