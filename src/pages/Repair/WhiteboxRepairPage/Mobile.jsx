import React, { useRef, useState, useEffect, useMemo } from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import FullWidthImageGallery from "../../../components/blocks/FullWidthImageGallery";
import FullWidthViewportVideo from "../../../components/blocks/FullWidthViewportVideo";
import BeforeAfterSection from "../../../components/blocks/BeforeAfterSection";
import WhiteboxCalculator from "../../../components/blocks/WhiteboxCalculator";
import CallbackForm from "../../../components/blocks/CallbackForm";
import YellowBorderButton from "../../../components/blocks/YellowBorderButton";
import {
  SECTION_BACKGROUND,
  TITLE_SIZES,
  TITLE_SUBTITLE_GAP,
  TITLE_CONTENT_GAP,
} from "../../../utils/spacing";
import { WHITEBOX_WORK_GALLERY_GROUPS } from "./galleryData";
import { useScrollContext } from "../../../contexts/ScrollContext";
import { ymTrackEvent, ymGoal } from "../../../utils/metrika";

const WA_CONTACT_LINK = `https://wa.me/79264081811?text=${encodeURIComponent(
  "Здравствуйте! Хочу получить точный расчет черновой отделки. Источник: whitebox"
)};`;
const PHONE_CONTACT_LINK = "tel:+79264081811";
const CONTACT_METHODS = [
  { value: "call", label: "Позвонить" },
  { value: "whatsapp", label: "Написать в WhatsApp" },
];

const Mobile = () => {
  const navigate = useNavigateWithMetrika();
  const heroRef = useRef(null);
  const calculatorRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const howWeWorkRef = useRef(null);
  const designProjectsRef = useRef(null);
  const reviewsRef = useRef(null);

  const { setScrollFunctions, setActiveScrollKey } = useScrollContext();

  const sections = useMemo(
    () => [
      { key: "scrollToHero", ref: heroRef },
      { key: "scrollToCalculator", ref: calculatorRef },
      { key: "scrollToAbout", ref: aboutRef },
      { key: "scrollToportfolio", ref: worksRef },
      { key: "scrollToNashiUslugi", ref: howWeWorkRef },
      { key: "scrollToDesignProjects", ref: designProjectsRef },
      { key: "scrollToReviews", ref: reviewsRef },
    ],
    []
  );

  useEffect(() => {
    if (!setScrollFunctions) return;

    const scrollFns = sections.reduce((acc, section) => {
      acc[section.key] = () => {
        section.ref.current?.scrollIntoView({ behavior: "smooth" });
      };
      return acc;
    }, {});

    setScrollFunctions(scrollFns);
    return () => setScrollFunctions(null);
  }, [sections, setScrollFunctions]);

  useEffect(() => {
    if (!setActiveScrollKey) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let nextKey = sections[0]?.key;
      for (const section of sections) {
        const elem = section.ref.current;
        if (!elem) continue;
        const top = elem.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= top) {
          nextKey = section.key;
        } else {
          break;
        }
      }
      setActiveScrollKey(nextKey);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, setActiveScrollKey]);

  useEffect(() => {
    return () => {
      setActiveScrollKey?.(null);
      setScrollFunctions?.(null);
    };
  }, [setActiveScrollKey, setScrollFunctions]);

  const imageGeometry = "/images/repair/zelenyBor/3.webp";

  // Галерея фото для блока "Качество и практичность"
  const qualityBottomImages = [
    "/images/photolibrary/portfolio/repair/1.jpg",
    "/images/photolibrary/portfolio/repair/2.jpg",
    "/images/photolibrary/portfolio/repair/3.jpg",
  ];

  // Состояния для блока отзывов
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [displayedReviewIndex, setDisplayedReviewIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [sliderHeightPx, setSliderHeightPx] = useState(window.innerWidth);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState("call");
  const [currentWorkGalleryIndex, setCurrentWorkGalleryIndex] = useState(0);
  const [secondaryWorkGalleryIndex, setSecondaryWorkGalleryIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const reviewsSliderRef = useRef(null);
  const sliderContainerRef = useRef(null);

  useEffect(() => {
    if (currentReviewIndex !== displayedReviewIndex) {
      isAnimatingRef.current = true;
      setIsShaking(true);
      setContentOpacity(0);

      setTimeout(() => {
        setDisplayedReviewIndex(currentReviewIndex);
        setIsShaking(false);
      }, 100);

      setTimeout(() => {
        setContentOpacity(1);
      }, 150);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 500);
    }
  }, [currentReviewIndex, displayedReviewIndex]);

  // Обновление высоты слайдера при изменении размера экрана (для квадратного формата)
  useEffect(() => {
    const handleResize = () => {
      setSliderHeightPx(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div
      style={{
        color: "#fff",
        paddingTop: "60px",
        paddingBottom: 60,
        background: SECTION_BACKGROUND,
      }}
    >
      <div
        ref={heroRef}
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
              fontSize: "clamp(28px, 8vw, 38px)",
              margin: 0,
              color: "#fff",
              textShadow: "0 0 12px rgba(0,0,0,.7)",
              fontWeight: 800,
              letterSpacing: 0.3,
              whiteSpace: "pre-line",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {`Черновой ремонт под ключ`}
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
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            whiteSpace: "pre-line",
          }}
        >
          {`Мы работаем в сфере строительства с 2014 года и выполняем комплексные ремонты с точным соблюдением СНиП и ГОСТ. В команде — только профильные мастера, а черновая отделка выполняется на уровне, который обеспечивает долговечность чистовой отделки.

Черновой ремонт — это основа квартиры: стяжка пола, штукатурка, электрика, сантехника, выравнивание стен и монтаж перегородок. Качество этого этапа определяет долговечность всей последующей отделки.

Мы фиксируем стоимость в договоре, работаем прозрачно и используем проверенные материалы. Заказывая черновой ремонт у нас, вы получаете надёжную базу для будущего интерьера и уверенность в результате.`}
        </p>
      </div>

      {/* Калькулятор White Box */}
      <div ref={calculatorRef}>
        <WhiteboxCalculator isMobile={true} />
      </div>

      {/* Блок «Получить точный расчёт» */}
      <div style={{ marginTop: 24 }}>
        <CallbackForm isMobile={true} source="whitebox" />
      </div>

      {/* Почему мы? */}
      <div
        ref={aboutRef}
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
          Почему мы?
        </h2>
        <h3
          style={{
            color: "#FFD700",
            fontSize: 20,
            marginBottom: 24,
            fontWeight: 800,
            textAlign: "left",
            lineHeight: 1.3,
          }}
        >
          Мы предлагаем надёжные и качественные услуги по ремонту квартир
        </h3>
      </div>

      {/* Изображение - Гарантируем качество (полная ширина) */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 2",
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <img
          src="/images/confirm.jpeg"
          alt="Гарантируем качество услуг"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Два дочерних блока */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          width: "100%",
          padding: "0 20px",
          boxSizing: "border-box",
          marginBottom: 32,
        }}
      >
        {/* Левый блок - Гарантируем качество */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 12,
              textAlign: "left",
            }}
          >
            Гарантируем качество услуг
          </h4>
          <ul
            style={{
              color: "#fff",
              fontSize: 17,
              lineHeight: 1.8,
              margin: 0,
              paddingLeft: 20,
              listStyle: "none",
            }}
          >
            <li style={{ marginBottom: 10, position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: -20,
                  color: "#FFD700",
                }}
              >
                •
              </span>
              Даём гарантию на выполненные работы*.
            </li>
            <li style={{ marginBottom: 10, position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: -20,
                  color: "#FFD700",
                }}
              >
                •
              </span>
              Работаем строго по СНиП и ГОСТ, используем проверенные материалы и
              контролируем каждый этап ремонта.
            </li>
          </ul>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              lineHeight: 1.6,
              marginTop: 10,
              fontStyle: "italic",
            }}
          >
            * Условия гарантии зависят от вида работ. Подробнее уточняйте при
            заключении договора.
          </p>
        </div>
      </div>

      {/* Изображение - Фиксированные цены (полная ширина) */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 2",
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <img
          src="/images/confirm1.jpeg"
          alt="Фиксированные цены на услуги"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Блок - Фиксированные цены */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "0 20px",
          boxSizing: "border-box",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 12,
              textAlign: "left",
            }}
          >
            Предлагаем фиксированные цены на услуги
          </h4>
          <ul
            style={{
              color: "#fff",
              fontSize: 17,
              lineHeight: 1.8,
              margin: 0,
              paddingLeft: 20,
              listStyle: "none",
            }}
          >
            <li style={{ marginBottom: 10, position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: -20,
                  color: "#FFD700",
                }}
              >
                •
              </span>
              Гарантируем доступные цены на работы.
            </li>
            <li style={{ marginBottom: 10, position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: -20,
                  color: "#FFD700",
                }}
              >
                •
              </span>
              Фиксируем цену каждой услуги и не меняем её в процессе выполнения
              заказа.
            </li>
            <li style={{ marginBottom: 10, position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: -20,
                  color: "#FFD700",
                }}
              >
                •
              </span>
              Прораб согласует с вами изменение общей стоимости заказа, если в
              процессе его выполнения изменится набор услуг.
            </li>
          </ul>
        </div>
      </div>

      {/* Блок "Наши работы" */}
      <div
        ref={worksRef}
        style={{
          padding: "32px 20px 0",
          marginBottom: 16,
        }}
      >
        <h2
          style={{
            color: "#FFD700",
            fontSize: 26,
            marginBottom: 8,
            fontWeight: 800,
            textAlign: "left",
          }}
        >
          Наши работы
        </h2>
        <h3
          style={{
            color: "#fff",
            fontSize: 26,
            margin: 0,
            fontWeight: 800,
            textAlign: "left",
            marginBottom: 16,
          }}
        >
          Черновой отделки
        </h3>
      </div>

      <FullWidthImageGallery
        images={WHITEBOX_WORK_GALLERY_GROUPS.primary.map((item) => item.image)}
        altPrefix="Наши работы"
        isMobile={true}
        onIndexChange={setCurrentWorkGalleryIndex}
        interactionLabel="gallery_whitebox_primary_mobile"
      />

      <div
        style={{
          padding: "0 20px",
          marginBottom: 32,
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
          }}
        >
          {
            WHITEBOX_WORK_GALLERY_GROUPS.primary[
              currentWorkGalleryIndex %
                WHITEBOX_WORK_GALLERY_GROUPS.primary.length
            ]?.description
          }
        </p>
      </div>

      <FullWidthImageGallery
        images={WHITEBOX_WORK_GALLERY_GROUPS.secondary.map(
          (item) => item.image
        )}
        altPrefix="Наши работы"
        isMobile={true}
        onIndexChange={setSecondaryWorkGalleryIndex}
        interactionLabel="gallery_whitebox_secondary_mobile"
      />

      <div
        style={{
          padding: "0 20px",
          marginBottom: 32,
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
          }}
        >
          {
            WHITEBOX_WORK_GALLERY_GROUPS.secondary[
              secondaryWorkGalleryIndex %
                WHITEBOX_WORK_GALLERY_GROUPS.secondary.length
            ]?.description
          }
        </p>
      </div>

      {/* Блок "Как мы работаем" */}
      <div
        ref={howWeWorkRef}
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
          Как мы работаем
        </h2>
      </div>

      {/* Галерея фото на всю ширину экрана */}
      <FullWidthImageGallery
        images={qualityBottomImages}
        altPrefix="Качество и практичность"
        isMobile={true}
        interactionLabel="gallery_whitebox_quality_mobile"
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
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            marginBottom: 12,
          }}
        >
          Мы делаем ремонт рационально и качественно — так, чтобы он служил
          десятилетиями без переделок.
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            marginBottom: 12,
          }}
        >
          На черновом этапе готовим помещение под чистовую отделку: выполняем
          демонтаж при необходимости, выравниваем стены, пол и потолок, делаем
          стяжку, прокладываем электроточки, сантехнику, слаботочку и отопление.
          Все работы идут строго по проекту, с учётом мебели, техники и будущего
          интерьера.
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            marginBottom: 12,
          }}
        >
          Мы подбираем материалы с оптимальным балансом цена/качество, чтобы вы
          не переплачивали, но получали результат уровня премиум.
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            marginBottom: 12,
          }}
        >
          Скрытые работы документируем: делаем фото, видео и акты, чтобы каждый
          этап был прозрачен и понятен.
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
            marginBottom: 12,
          }}
        >
          Заранее подготавливаем ниши, закладные, усиления и скрытые элементы
          под свет, карнизы, кондиционеры и двери — это позволяет чистовой
          отделке ложиться ровно, а всему проекту реализовываться без доработок.
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            textAlign: "left",
          }}
        >
          В результате вы получаете ремонт, в котором каждая деталь продумана,
          технически верна и готова к долгой эксплуатации.
        </p>
      </div>

      <div
        style={{
          padding: "0 20px",
          marginTop: 16,
        }}
      >
        <h3
          style={{
            color: "#FFD700",
            fontSize: TITLE_SIZES.mobile.service,
            margin: 0,
            fontWeight: 800,
            textAlign: "left",
          }}
        >
          Видео с объекта
        </h3>
      </div>

      <FullWidthViewportVideo
        videoSrc="/videos/1.mp4"
        containerStyle={{ marginTop: 20 }}
        trackingLabel="video_object_mobile"
      />

      {/* Блок с призывом к действию */}
      <div
        style={{
          position: "relative",
          width: "100%",
          marginTop: 32,
          overflow: "hidden",
        }}
      >
        <img
          src="/images/repair/zelenyBor/1.webp"
          alt="Получите расчет"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.85)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "30px 20px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(24px, 6.5vw, 32px)",
              fontWeight: 800,
              margin: 0,
              marginBottom: 14,
              lineHeight: 1.3,
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)",
            }}
          >
            Получите точный расчет
            <br />
            <span style={{ color: "#FFD700", textShadow: "0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)" }}>за наш счет</span> в течение 1-2
            <br />
            дней после звонка
          </h2>

          <a
            href="tel:+79264081811"
            onClick={() => {
              ymGoal("call_confirmed");
            }}
            style={{
              color: "#fff",
              fontSize: "clamp(32px, 9vw, 48px)",
              fontWeight: 800,
              textDecoration: "none",
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            +7 (926) 408-18-11
          </a>
        </div>
      </div>

      {/* Блок "Последние работы" */}
      <div ref={designProjectsRef}>
        <BeforeAfterSection
          isMobile={true}
          sectionId="portfolio"
          sliderContainerRef={sliderContainerRef}
          firstImage="/images/photolibrary/portfolio/designer/1/1.jpg"
          secondImage="/images/photolibrary/portfolio/designer/1/2.jpg"
          title="Последние работы"
          subtitle="Дизайнерский ремонт в Москве на Большой Спасской"
          footerDescription="Полная перепланировка, отделка стен и потолка, замена окон и дверей, укладка паркетной доски, установка современного освещения"
          sliderHeightPx={sliderHeightPx}
          marginTop="12px"
          headerTitleStyle={{
            fontSize: "7vw",
            whiteSpace: "nowrap",
          }}
          headerSubtitleStyle={{
            fontSize: "18px",
          }}
          interactionLabel="before_after_portfolio_designer_mobile"
        />

        <BeforeAfterSection
          isMobile={true}
          firstImage="/images/photolibrary/portfolio/capital/2/1.jpg"
          secondImage="/images/photolibrary/portfolio/capital/2/7.jpg"
          subtitle="Комплексный ремонт квартиры с акцентом на современный минимализм, Москва, ЖК «Символ»"
          footerDescription="Демонтаж старых покрытий и коммуникаций, полная замена электрики и сантехники, выравнивание стен и устройство скрытых дверей, монтаж потолков с освещением, укладка напольного покрытия, облицовка санузла плиткой под мрамор с декоративными элементами"
          sliderHeightPx={sliderHeightPx}
          marginTop="4px"
          headerSubtitleStyle={{
            fontSize: "18px",
          }}
          interactionLabel="before_after_portfolio_capital_mobile"
        />
      </div>

      {/* Обертка для Отзывов и "С заботой о вас" */}
      <div
        ref={reviewsRef}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "0",
          alignItems: "stretch",
        }}
      >
        {/* Отзывы */}
        <section
          style={{
            width: "100%",
            margin: "0",
            padding: "18px 16px 14px",
            boxSizing: "border-box",
            flex: "none",
          }}
        >
          <div
            style={{
              textAlign: "left",
              marginBottom: 12,
            }}
          >
            <h2
              style={{
                fontSize: TITLE_SIZES.mobile.main,
                fontWeight: 900,
                margin: 0,
                color: "#FFD700",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                textShadow: "0 2px 8px rgba(255,215,0,0.2)",
              }}
            >
              Отзывы
            </h2>
            <div
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.9)",
                marginTop: 6,
                fontWeight: 500,
              }}
            >
              Чем довольны те, кто доверил нам ремонт.
            </div>
          </div>

          {(() => {
            const reviews = [
              {
                name: "Никита",
                place: "ЖК «Сердце Столицы»",
                text: "Благодарим за работу по ремонту квартиры в ЖК «Сердце Столицы». Бесплатная и быстрая смета, качественная и своевременная работа, заранее составленный график работ. Особая благодарность мастеру Севастьяну за постоянный контроль и связь. Помогли с выбором отделочных материалов со скидкой. Буду рекомендовать компанию друзьям!",
              },
              {
                name: "Андрей Т.",
                place: "Пушкинский район, МО",
                text: "Работали с директором Антоном Самылкиным и прорабом Севастьяном над домом 240 м². Компания выбрана после встреч с четырьмя подрядчиками — самая компетентная. Работы выполнены точно по проектам: вся электрика, водоснабжение, отопление, фиброармированная стяжка, штукатурка, плитка, установка дорогой сантехники. Каждый этап сдавался технадзору, замечания исправлялись. Дом сдан под ключ, все сроки соблюдены без задержек. Рекомендую!",
              },
              {
                name: "Боровских А.",
                place: "Москва",
                text: "Ремонт сделан хорошо. Особенно приятно отношение прораба Валерия — всегда корректно относился к вопросам, готов был объяснить и посоветовать. В процессе мы периодически уезжали, но он планировал работы так, чтобы это не задерживало процесс. Работы выполнены аккуратно, после ремонта квартира практически чистая. В целом работой доволен!",
              },
              {
                name: "Аноним",
                place: "Москва",
                text: "Обратились в компанию по совету друзей, которые были довольны работой. Сотрудники помогали во всём: от помощи в покупке черновых материалов до помощи в выборе отделочных материалов. Особенно понравилась работа прораба, который помог снизить затраты на дизайнера — грамотно посоветовал по размещению розеток и выключателей. Всегда был готов к компромиссам, приходил на встречи даже поздно вечером после рабочего дня. Довольны!",
              },
              {
                name: "Оля М.",
                place: "Москва",
                text: "Мастера компетентные, всегда готовы проконсультировать, посоветовать, объяснить, особенно важно, что работы делали для себя и на долго. Особая благодарность прорабу — советы были ценными, предложения конструктивными, постоянно контролировал процесс. Всё чётко, ясно и прозрачно! Работа строго по смете, итоговая сумма точно по договору — ни копейкой больше.",
              },
            ];

            const getInitials = (name) => {
              const parts = name.split(" ");
              if (parts.length >= 2) {
                return (parts[0][0] + parts[1][0]).toUpperCase();
              }
              return name[0].toUpperCase();
            };

            const getAvatarColor = (name) => {
              return "#5a6b78";
            };

            const trackReviewInteraction = (direction, targetIndex) => {
              ymTrackEvent(
                "whitebox_reviews",
                `${direction}_swipe`,
                `review_${targetIndex + 1}`
              );
            };

            const goToNextReview = () => {
              setCurrentReviewIndex((prev) => {
                const next = prev < reviews.length - 1 ? prev + 1 : 0;
                trackReviewInteraction("next", next);
                return next;
              });
            };

            const goToPrevReview = () => {
              setCurrentReviewIndex((prev) => {
                const next = prev > 0 ? prev - 1 : reviews.length - 1;
                trackReviewInteraction("prev", next);
                return next;
              });
            };

            const handleStart = (clientX) => {
              touchStartX.current = clientX;
            };

            const handleMove = (clientX) => {
              touchEndX.current = clientX;
            };

            const handleEnd = () => {
              if (!touchStartX.current || !touchEndX.current) return;

              if (isAnimatingRef.current) {
                touchStartX.current = 0;
                touchEndX.current = 0;
                return;
              }

              const distance = touchStartX.current - touchEndX.current;
              const minSwipeDistance = 50;

              if (distance > minSwipeDistance) {
                if (navigator.vibrate) {
                  navigator.vibrate(50);
                }
                goToNextReview();
              } else if (distance < -minSwipeDistance) {
                if (navigator.vibrate) {
                  navigator.vibrate(50);
                }
                goToPrevReview();
              }

              touchStartX.current = 0;
              touchEndX.current = 0;
            };

            const handleTouchStart = (e) => {
              handleStart(e.touches[0].clientX);
            };

            const handleTouchMove = (e) => {
              handleMove(e.touches[0].clientX);
            };

            const handleTouchEnd = () => {
              handleEnd();
            };

            const handleMouseDown = (e) => {
              handleStart(e.clientX);
            };

            const handleMouseMove = (e) => {
              if (touchStartX.current !== 0) {
                handleMove(e.clientX);
              }
            };

            const handleMouseUp = () => {
              handleEnd();
            };

            const displayedReview = reviews[displayedReviewIndex];

            const sliderContainerStyle = {
              position: "relative",
              width: "100%",
              overflow: "hidden",
              userSelect: "none",
              cursor: "grab",
            };

            const cardStyle = {
              borderRadius: 16,
              background: SECTION_BACKGROUND,
              border: "1px solid rgba(255,255,255,.1)",
              boxShadow: "0 8px 24px rgba(0,0,0,.4)",
              padding: "14px 20px 14px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              position: "relative",
              animation: isShaking ? "shake 0.3s ease-in-out" : "none",
              touchAction: "pan-y",
              userSelect: "none",
              cursor: "grab",
            };

            const cardContentStyle = {
              opacity: contentOpacity,
              transition: "opacity 0.1s ease-in-out",
              position: "relative",
              zIndex: 1,
            };

            const indicatorStyle = {
              position: "absolute",
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: SECTION_BACKGROUND,
              border: "1px solid rgba(255,255,255,.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.85)",
              fontWeight: 700,
              fontSize: 12,
              opacity: 1,
              zIndex: 10,
              pointerEvents: "none",
            };

            const nameStyle = {
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            };

            const avatarStyle = {
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: getAvatarColor(displayedReview.name),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            };

            const nameInfoStyle = {
              display: "flex",
              flexDirection: "column",
              gap: 4,
              flex: 1,
            };

            const nameTextStyle = {
              fontWeight: 800,
              fontSize: 17,
              color: "#fff",
            };

            const placeStyle = {
              color: "#FFD700",
              fontSize: 12,
              fontWeight: 600,
              opacity: 0.9,
            };

            const starsStyle = {
              display: "flex",
              gap: 2,
              marginBottom: 8,
            };

            const textStyle = {
              color: "rgba(255,255,255,.92)",
              fontSize: 14,
              lineHeight: 1.6,
            };

            const StarIcon = ({ filled = true, size = 14 }) => (
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={filled ? "#f2cb05" : "none"}
                stroke="#f2cb05"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            );

            return (
              <>
                <style>
                  {`
                    @keyframes shake {
                      0%, 100% { transform: translateX(0); }
                      10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                      20%, 40%, 60%, 80% { transform: translateX(4px); }
                    }
                  `}
                </style>
                <div
                  ref={reviewsSliderRef}
                  style={sliderContainerStyle}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div style={cardStyle}>
                    <div style={indicatorStyle}>
                      {currentReviewIndex + 1}/{reviews.length}
                    </div>

                    <div style={cardContentStyle}>
                      <div style={nameStyle}>
                        <div style={avatarStyle}>
                          {getInitials(displayedReview.name)}
                        </div>
                        <div style={nameInfoStyle}>
                          <div style={nameTextStyle}>
                            {displayedReview.name}
                          </div>
                          <div style={starsStyle}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon key={star} filled={true} size={12} />
                            ))}
                          </div>
                          <div style={placeStyle}>{displayedReview.place}</div>
                        </div>
                      </div>
                      <div style={textStyle}>{displayedReview.text}</div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </section>

        {/* С заботой о вас */}
        <section
          style={{
            scrollMarginTop: "54px",
            width: "100%",
            backgroundColor: SECTION_BACKGROUND,
            paddingTop: "30px",
            paddingBottom: "30px",
            marginTop: "4px",
            position: "relative",
            boxSizing: "border-box",
            flex: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1400px",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                textAlign: "left",
                width: "100%",
                paddingLeft: "20px",
                paddingRight: "20px",
                boxSizing: "border-box",
                marginBottom: TITLE_CONTENT_GAP.mobile,
              }}
            >
              <h2
                style={{
                  fontSize: TITLE_SIZES.mobile.main,
                  fontWeight: "900",
                  color: "#FFD700",
                  margin: `0 0 ${TITLE_SUBTITLE_GAP.mobile} 0`,
                  lineHeight: 1.2,
                  letterSpacing: "-0.5px",
                  textShadow: "0 2px 8px rgba(255,215,0,0.2)",
                }}
              >
                С заботой о вас
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                Внимание не только к деталям, но и к вашим соседям и другим
                жильцам дома
              </p>
            </div>

            <FullWidthViewportVideo
              videoSrc="/videos/care-about-you.MOV"
              sources={[
                {
                  src: "/videos/care-about-you.MOV",
                  type: "video/quicktime",
                },
                { src: "/videos/care-about-you.MOV", type: "video/mp4" },
              ]}
              aspectRatio="4 / 5"
              containerStyle={{
                width: "100%",
                marginLeft: 0,
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
              }}
              videoStyle={{
                objectFit: "cover",
              }}
              showSoundToggle={false}
              trackingLabel="video_care_mobile"
            />

            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0",
                paddingTop: TITLE_CONTENT_GAP.mobile,
                paddingLeft: "20px",
                paddingRight: "20px",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Во время ремонта квартиры в жилом доме мы полностью упаковываем
                лифты, а также всю входную группу на этаже
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mobile;
