import React from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import FullWidthImageGallery from "../../../components/blocks/FullWidthImageGallery";
import { SECTION_BACKGROUND } from "../../../utils/spacing";

const Mobile = () => {
  const navigate = useNavigateWithMetrika();

  const atmosphereImages = [
    "/images/photolibrary/portfolio/cosmetic/1/1.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/2.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/3.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/4.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/5.jpg",
  ];

  const processImages = [
    "/images/photolibrary/portfolio/cosmetic/2/1.jpg",
    "/images/photolibrary/portfolio/cosmetic/2/2.jpg",
    "/images/photolibrary/portfolio/cosmetic/2/3.jpg",
    "/images/photolibrary/portfolio/cosmetic/2/4.jpg",
  ];

  const detailImages = [
    "/images/photolibrary/portfolio/cosmetic/1/3.jpg",
    "/images/photolibrary/portfolio/cosmetic/2/1.jpg",
    "/images/photolibrary/portfolio/cosmetic/1/5.jpg",
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
          alt="Косметический ремонт"
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
              fontSize: "clamp(28px, 8vw, 38px)",
              margin: 0,
              color: "#fff",
              textShadow: "0 0 12px rgba(0,0,0,.7)",
              fontWeight: 800,
              letterSpacing: 0.3,
            }}
          >
            Косметический ремонт
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
          {`Косметический ремонт обновляет интерьер без сложных перепланировок.
Мы освежаем покрытия, меняем предполагаемые элементы декора и берём на себя закупку материалов.
Работы выполняем бережно, поддерживая порядок в квартире на каждом этапе.`}
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 1.6,
            margin: "14px 0 0",
            textAlign: "left",
          }}
        >
          В команде работают профильные мастера, соблюдаем строительные нормы и
          фиксируем цену в смете. Закупаем материалы по корпоративным скидкам,
          ведём ежедневный контроль и гарантируем отсутствие скрытых «допов».
          После сдачи передаём гарантию и остаёмся на связи — можно сразу
          заезжать и пользоваться обновлённым пространством.
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
          Атмосфера и уют
        </h2>
      </div>

      <FullWidthImageGallery
        images={atmosphereImages}
        altPrefix="Атмосфера косметического ремонта"
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
          Подбираем решения, которые делают комнаты светлее и аккуратнее —
          обновлённые стены, освежённые полы и новая фурнитура.
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
          Этапы обновления
        </h2>
      </div>

      <FullWidthImageGallery
        images={processImages}
        altPrefix="Этапы косметического ремонта"
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
          Сначала составляем смету, затем готовим поверхности и аккуратно
          выполняем отделку, чтобы можно было быстро вернуться к привычной
          жизни.
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
          Детали и аккуратность
        </h2>
      </div>

      <FullWidthImageGallery
        images={detailImages}
        altPrefix="Детали косметического ремонта"
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
          Закрываем мелкие вопросы по ходу работ, поддерживаем чистоту и сдаём
          результат в формате «можно заезжать».
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
          Средняя цена косметического ремонта — около 6 000 ₽ за м². Это
          ориентир: итоговая смета зависит от материалов и объёма работ.
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
