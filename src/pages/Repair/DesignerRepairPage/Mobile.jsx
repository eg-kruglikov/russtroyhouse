import React from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import FullWidthImageGallery from "../../../components/blocks/FullWidthImageGallery";
import FullWidthViewportVideo from "../../../components/blocks/FullWidthViewportVideo";
import { SECTION_BACKGROUND } from "../../../utils/spacing";

const Mobile = () => {
  const navigate = useNavigateWithMetrika();

  const conceptImages = [
    "/images/photolibrary/portfolio/designer/1/1.jpg",
    "/images/photolibrary/portfolio/designer/1/2.jpg",

    "/images/photolibrary/portfolio/designer/1/4.jpg",
  ];

  const processImages = [
    "/images/photolibrary/portfolio/designer/2/2.JPG",
    "/images/photolibrary/portfolio/designer/2/1.JPG",

    "/images/photolibrary/portfolio/designer/2/4.JPG",
    "/images/photolibrary/portfolio/designer/2/8.JPG",
    "/images/photolibrary/portfolio/designer/2/6.JPG",
  ];

  const detailImages = [
    "/images/photolibrary/portfolio/designer/1/5.jpg",
    "/images/photolibrary/portfolio/designer/1/8.jpg",
    "/images/photolibrary/portfolio/designer/1/9.jpg",
  ];

  const qualityPracticalImages = [
    "/images/photolibrary/portfolio/repair/1.jpg",
    "/images/photolibrary/portfolio/repair/2.jpg",
    "/images/photolibrary/portfolio/repair/3.jpg",
  ];

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
          alt="Дизайнерский ремонт"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.9)",
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
              fontSize: "clamp(28px, 8vw, 38px)",
              margin: 0,
              color: "#fff",
              textShadow: "0 0 14px rgba(0,0,0,.75)",
              fontWeight: 800,
              letterSpacing: 0.4,
            }}
          >
            Дизайнерский ремонт
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
          {`Дизайнерский ремонт объединяет концепцию и реализацию.
Мы создаём проект, подбираем материалы и ведём авторский надзор до финальной сдачи.
Каждый этап контролируем, чтобы результат совпал с визуализациями.`}
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
          Концепция и атмосфера
        </h2>
      </div>

      <FullWidthImageGallery
        images={conceptImages}
        altPrefix="Концепция дизайнерского ремонта"
        isMobile
      />

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
          Подбираем стиль, текстуры и свет, чтобы квартира выглядела цельно и
          современно.
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
          Детали и контроль качества
        </h2>
      </div>

      <FullWidthImageGallery
        images={detailImages}
        altPrefix="Детали дизайнерского ремонта"
        isMobile
        aspectRatio="auto"
      />

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
          Контролируем отделку, мебель и свет, сдаём объект в состоянии «как на
          картинках».
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
          От идеи до реализации
        </h2>
      </div>

      <FullWidthImageGallery
        images={processImages}
        altPrefix="Этапы дизайнерского ремонта"
        isMobile
      />

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
          Готовим визуализации, рабочие чертежи и контролируем исполнение, чтобы
          ваша концепция воплотилась без компромиссов.
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
          Качество и практичность
        </h2>
      </div>

      <FullWidthImageGallery
        images={qualityPracticalImages}
        altPrefix="Качество и практичность"
        isMobile
      />

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
          Мы делаем качественно и рационально: подбираем материалы с оптимальным
          соотношением цена/качество, чтобы вы не переплачивали — и получали
          ремонт на десятилетия.
        </p>
      </div>

      <FullWidthViewportVideo
        videoSrc="/videos/1.mp4"
        containerStyle={{ marginTop: 20 }}
      />

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
          src="/images/photolibrary/portfolio/capital/1.jpg"
          alt="Сроки и стоимость"
          style={{
            width: "100%",
            aspectRatio: "1280 / 960",
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
          Средняя цена дизайнерского ремонта — около 13 000 ₽ за м². Это
          ориентир: итоговая смета зависит от авторских решений, материалов и
          комплектации. Мы дополнительно контролируем черновой этап: следим за
          инженерными сетями и используем долговечные материалы, чтобы системы
          отопления, водоснабжения, водоотведения, вентиляции и электрики
          служили безотказно долгие годы.
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
          Примерную стоимость ремонта можно рассчитать в нашем калькуляторе на
          главной странице.
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
          Сроки определяются после личной консультации и фиксируются в смете.
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
