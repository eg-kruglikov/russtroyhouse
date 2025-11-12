import React, { useEffect } from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import FullWidthImageGallery from "../../../components/blocks/FullWidthImageGallery";
import FullWidthViewportVideo from "../../../components/blocks/FullWidthViewportVideo";
import { SECTION_BACKGROUND } from "../../../utils/spacing";

const Mobile = () => {
  const navigate = useNavigateWithMetrika();

  // Галерея фото для блока "Качество и практичность"
  const qualityImages = [
    "/images/photolibrary/portfolio/capital/2/slider1/1.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/2.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/3.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/4.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/5.jpg",
    "/images/photolibrary/portfolio/capital/2/slider1/6.jpg",
  ];

  // Галерея фото для блока "От идеи до реализации"
  const etapyImages = [
    "/images/photolibrary/portfolio/capital/1/1.jpg",
    "/images/photolibrary/portfolio/capital/1/2.jpg",
    "/images/photolibrary/portfolio/capital/1/3.jpg",
    "/images/photolibrary/portfolio/capital/1/4.jpg",
  ];

  // Галерея фото для нижнего блока "Качество и практичность"
  const qualityBottomImages = [
    "/images/photolibrary/portfolio/repair/1.jpg",
    "/images/photolibrary/portfolio/repair/2.jpg",
    "/images/photolibrary/portfolio/repair/3.jpg",
  ];

  useEffect(() => {
    const handleBack = () => {
      // лог только для отладки
      console.log("⬅ Пользователь нажал Назад!");
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

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
      {/* Hero */}
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
          alt="Капитальный ремонт"
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
            Капитальный ремонт
          </h1>
        </div>
      </div>

      {/* Описание под изображением */}
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
          {`Капитальный ремонт — это не просто обновление, а полное преображение квартиры.
Мы выполняем весь комплекс работ: от демонтажа и перепланировки до чистовой отделки.
Меняем коммуникации, выравниваем стены, монтируем напольные покрытия и создаём современный, продуманный интерьер.
Работы выполняют профильные специалисты с большим опытом.
Мы используем только проверенные материалы и профессиональное оборудование, соблюдаем строительные нормы и сроки.
Стоимость ремонта фиксируется в смете — без скрытых платежей и внезапных "допов".
Если требуется, поможем оптимизировать смету: подберём материалы с лучшим соотношением цена/качество.
В результате вы получаете надёжный ремонт "под ключ", рассчитанный на годы эксплуатации.`}
        </p>
      </div>

      {/* Блок "Эстетика и стиль" */}
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
          Эстетика и стиль
        </h2>
      </div>

      {/* Галерея фото на всю ширину экрана */}
      <FullWidthImageGallery
        images={qualityImages}
        altPrefix="Эстетика и стиль"
        isMobile={true}
      />

      {/* Описание */}
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
          Мы создаём уютные и современные интерьеры — под любые запросы и
          бюджеты. Реализуем идеи, сочетающие комфорт, дизайн и практичность.
        </p>
      </div>

      {/* Блок "От идеи до реализации" */}
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

      {/* Галерея фото на всю ширину экрана */}
      <FullWidthImageGallery
        images={etapyImages}
        altPrefix="Этапы ремонта"
        isMobile={true}
      />

      {/* Описание */}
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
          Этапы: разработка дизайн-проекта и сметы → черновые работы (демонтаж,
          коммуникации, стяжка и пр.) → финишная отделка (укладка покрытий,
          установка сантехники и др.).
        </p>
      </div>

      {/* Блок "Качество и практичность" (нижний) */}
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

      {/* Галерея фото на всю ширину экрана */}
      <FullWidthImageGallery
        images={qualityBottomImages}
        altPrefix="Качество и практичность"
        isMobile={true}
      />

      {/* Описание */}
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

      {/* Блок "Сроки и стоимость" */}
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

      {/* Фото на всю ширину экрана */}
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

      {/* Описание */}
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
          Средняя цена капитального ремонта — около 9 500 ₽ за м². Это ориентир:
          итог зависит от материалов, инженерных решений и объёма работ.
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
