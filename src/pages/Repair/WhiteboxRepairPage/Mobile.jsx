import React, { useRef, useState, useEffect } from "react";
import { useNavigateWithMetrika } from "../../../hooks/useNavigateWithMetrika";
import FullWidthImageGallery from "../../../components/blocks/FullWidthImageGallery";
import FullWidthViewportVideo from "../../../components/blocks/FullWidthViewportVideo";
import BeforeAfterSection from "../../../components/blocks/BeforeAfterSection";
import WhiteboxCalculator from "../../../components/blocks/WhiteboxCalculator";
import {
  SECTION_BACKGROUND,
  TITLE_SIZES,
  TITLE_SUBTITLE_GAP,
  TITLE_CONTENT_GAP,
} from "../../../utils/spacing";

const Mobile = () => {
  const navigate = useNavigateWithMetrika();

  const imagePreparation = "/images/repair/zelenyBor/2.webp";
  const imageGeometry = "/images/repair/zelenyBor/3.webp";
  const imageEngineering = "/images/repair/Sevastopolsky22A/1.webp";
  const imageFinal = "/images/repair/Sevastopolsky22A/2.webp";

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
              fontSize: "clamp(38px, 7vw, 34px)",
              margin: 0,
              color: "#fff",
              textShadow: "0 0 12px rgba(0,0,0,.7)",
              fontWeight: 800,
              letterSpacing: 0.3,
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>Черновая</span>
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
          {`Мы работаем с 2014 года и завершили более 2000 объектов разной сложности — от монтажных работ и натяжных потолков до комплексных ремонтов. В команде только профильные мастера, все работы выполняются по СНиП и ГОСТ.

Черновой ремонт — это основа квартиры: стяжка пола, штукатурка, электрика, сантехника, выравнивание стен и монтаж перегородок. Качество этого этапа определяет долговечность всей последующей отделки.

Мы фиксируем стоимость в договоре, работаем прозрачно и используем проверенные материалы. Заказывая черновой ремонт у нас, вы получаете надёжную базу для будущего интерьера и уверенность в результате.`}
        </p>
      </div>

      {/* Калькулятор White Box */}
      <WhiteboxCalculator isMobile={true} />

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

      {/* Блок "Качество и практичность" */}
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

      <div
        style={{
          padding: "32px 20px 0",
        }}
      >
        <h2
          style={{
            color: "#FFD700",
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
          <span style={{ color: "#FFD700" }}>
            Средняя цена white box — около 8 700 ₽ за м².
          </span>{" "}
          Это ориентир: на итог влияет инженерия, масштаб и выбранные материалы.
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
          }}
        >
          Точные Сроки определяются после консультации и фиксируются в смете.
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
          src={imageGeometry}
          alt="Получите расчет"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.8)",
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
              fontSize: "clamp(20px, 5.5vw, 28px)",
              fontWeight: 800,
              margin: 0,
              marginBottom: 14,
              lineHeight: 1.3,
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
            }}
          >
            Получите точный расчет
            <br />
            <span style={{ color: "#FFD700" }}>за наш счет</span> в течение 1-2
            <br />
            дней после звонка
          </h2>

          <a
            href="tel:+79264081811"
            style={{
              color: "#fff",
              fontSize: "clamp(28px, 8vw, 42px)",
              fontWeight: 700,
              textDecoration: "none",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
            }}
          >
            +7 (926) 408-18-11
          </a>
        </div>
      </div>

      {/* Блок "Последние работы" */}
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
      />

      {/* Обертка для Отзывов и "С заботой о вас" */}
      <div
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
                setCurrentReviewIndex((prev) =>
                  prev < reviews.length - 1 ? prev + 1 : 0
                );
              } else if (distance < -minSwipeDistance) {
                if (navigator.vibrate) {
                  navigator.vibrate(50);
                }
                setCurrentReviewIndex((prev) =>
                  prev > 0 ? prev - 1 : reviews.length - 1
                );
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
              fontSize: 16,
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
