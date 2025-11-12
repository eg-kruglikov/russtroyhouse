import React from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import { SECTION_BACKGROUND } from "../../../utils/spacing";

const Mobile = () => {
  const navigate = useNavigateWithMetrika();

  const imagePreparation = "/images/repair/zelenyBor/2.webp";
  const imageGeometry = "/images/repair/zelenyBor/3.webp";
  const imageEngineering = "/images/repair/Sevastopolsky22A/1.webp";
  const imageFinal = "/images/repair/Sevastopolsky22A/2.webp";

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        paddingTop: "60px",
        paddingBottom: 60,
        background: SECTION_BACKGROUND,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "35vh",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/repair/zelenyBor/1.webp"
          alt="White box ремонт"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.95)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(24px, 7vw, 34px)",
              margin: 0,
              color: "#fff",
              textShadow: "0 0 12px rgba(0,0,0,.7)",
              fontWeight: 800,
              letterSpacing: 0.3,
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>Чистовая/черновая</span>
            <br />
            отделка
          </h1>
        </div>
      </div>

      <div
        style={{
          padding: "20px 20px 0",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            whiteSpace: "pre-line",
          }}
        >
          {`White box — предчистовая отделка: выровненные стены и потолки, стяжка, штукатурка, инженерные сети и проверенные основания.
Мы работаем по СНиП и ГОСТ, фиксируем смету в договоре и сдаём объект, готовый к финишу без переделок.`}
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            marginTop: 14,
            textAlign: "left",
          }}
        >
          Нужен следующий этап? Выполним чистовой ремонт «под ключ» — от подбора
          материалов и поставок до финальной сборки интерьера и авторского
          надзора.
        </p>
      </div>

      <div
        style={{
          padding: "32px 20px 0",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: 26,
            marginBottom: 16,
            fontWeight: 800,
            textAlign: "left",
          }}
        >
          Подготовка и чистота
        </h2>
      </div>

      <div
        style={{
          width: "100%",
          marginBottom: 16,
        }}
      >
        <img
          src={imagePreparation}
          alt="Подготовка white box"
          style={{
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: "0 20px",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
          }}
        >
          Шлифуем и армируем поверхности, выставляем маяки, чтобы получить
          ровные стены и потолки. После сдачи уже можно замерять мебель и
          встроенные элементы — основа готова.
        </p>
      </div>

      <div
        style={{
          padding: "32px 20px 0",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: 26,
            marginBottom: 16,
            fontWeight: 800,
            textAlign: "left",
          }}
        >
          Инженерные системы
        </h2>
      </div>

      <div
        style={{
          width: "100%",
          marginBottom: 16,
        }}
      >
        <img
          src={imageGeometry}
          alt="Геометрия и свет"
          style={{
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: "0 20px",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
          }}
        >
          Подготавливаем ниши, закладные и скрытые элементы под свет, карнизы и
          двери. Финальная отделка ложится ровно, а проект реализуется без
          переделок.
        </p>
      </div>

      <div
        style={{
          padding: "32px 20px 0",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: 26,
            marginBottom: 16,
            fontWeight: 800,
            textAlign: "left",
          }}
        >
          Передача объекта
        </h2>
      </div>

      <div
        style={{
          width: "100%",
          marginBottom: 16,
        }}
      >
        <img
          src={imageEngineering}
          alt="Инженерные системы"
          style={{
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: "0 20px",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
          }}
        >
          Электрика, отопление, слаботочка и сантехника проходят по проекту,
          учитывая мебель и технику. Скрытые работы документируем актами и фото
          — чистовой этап стартует без вопросов.
        </p>
      </div>

      <div
        style={{
          padding: "32px 20px 0",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: 26,
            marginBottom: 16,
            fontWeight: 800,
            textAlign: "left",
          }}
        >
          Сроки и стоимость
        </h2>
      </div>

      <div
        style={{
          marginBottom: 16,
          width: "100%",
        }}
      >
        <img
          src={imageFinal}
          alt="Сроки и стоимость white box ремонта"
          style={{
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: "0 20px",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            marginBottom: 12,
          }}
        >
          Средняя цена white box — около 8 700 ₽ за м². Это ориентир: на итог
          влияет инженерия, масштаб и выбранные материалы. Примерную стоимость
          ремонта можно рассчитать в нашем калькуляторе на главной странице.
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            marginBottom: 12,
            borderLeft: "2px solid #FFD700",
            paddingLeft: 16,
          }}
        >
          Для точной сметы свяжитесь с нами любым удобным способом на странице{" "}
          <a
            href="/contacts"
            onClick={(event) => {
              event.preventDefault();
              navigate("/contacts");
            }}
            style={{
              color: "#FFD700",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            контактов
          </a>
          .
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            marginBottom: 12,
          }}
        >
          Сроки определяются после консультации и фиксируются в смете.
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
          }}
        >
          Мы держим слово и остаёмся ответственными за результат.
        </p>
      </div>
    </div>
  );
};

export default Mobile;
