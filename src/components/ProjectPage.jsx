import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionModal from "./windows/FeedbackModal";

const ProjectPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/data/projectDescriptions.json`)
      .then((res) => res.json())
      .then((json) => setData(json[id]));
  }, [id]);
  console.log(data);

  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Если до низа страницы осталось меньше 100px — открываем модалку
      if (scrollTop + windowHeight >= fullHeight) {
        setQuestioModalOpen(true);
        window.removeEventListener("scroll", handleScroll); // убираем, чтобы не открывалась повторно
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // В будущем можно будет по `id` подгружать нужные данные
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#04141D",
        display: "flex",
        flexDirection: "column",

        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "2%",
          left: "4%",

          color: "#fff",
          padding: "10px 16px",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "26px",
          cursor: "pointer",
          zIndex: 1000,
        }}
        onClick={() => navigate("/", { state: { scrollTo: "portfolio" } })}
      >
        Назад
      </div>
      <QuestionModal
        isOpen={questioModalOpen}
        onClose={() => setQuestioModalOpen(false)}
        isMobile={isMobile}
      />
      {/* 1 блок */}
      <div
        style={{
          width: "auto",
          height: isMobile ? "61%" : "100%",
          position: "relative",

          boxSizing: "border-box",
          textAlign: "center",

          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: isMobile ? "240px" : "480px",
            height: isMobile ? "65px" : "130px",
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: " #44697E",
            borderRadius: "7px",
            padding: "0.5vw",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p
            style={{
              fontSize: isMobile ? "22px" : "46px",
              fontWeight: "bold",
              color: "white",
              marginTop: "10px",
              letterSpacing: isMobile ? "1.3px" : "2px",
            }}
          >
            ДИЗАЙН - ПРОЕКТ
          </p>
          <p
            style={{
              fontSize: isMobile ? "15px" : "31px",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "0px",
              marginTop: isMobile ? "-14px" : "-30px",
              marginBottom: "10px",
            }}
          >
            С ПРЕМИАЛЬНОЙ ОТДЕЛКОЙ
          </p>
        </div>

        <img
          src={`/images/photolibrary/project${id}/1.jpg`}
          alt="проект"
          style={{
            height: "100%", // растягивается по высоте окна
            width: "auto", // ширина подстраивается
            objectFit: "cover",
            objectPosition: "center", // <-- вот эта строка центрирует изображение
            display: "block",
          }}
        />
      </div>
      {/* 2 блок */}
      <div
        style={{
          width: "auto",
          height: "200%",
          boxSizing: "border-box",
          color: "white",
          fontFamily: "sans-serif",
          margin: "0 auto",
        }}
      >
        {/* Верхний блок */}
        <div
          style={{
            width: "20%",
            height: isMobile ? "17.2%" : "15%",
            marginTop: isMobile ? "2%" : "4%",
            marginBottom: isMobile ? "2%" : "4%",
            backgroundColor: "#274251",
            borderRadius: "7px",
            alignItems: "center",
            position: "relative",
            marginLeft: isMobile ? "2%" : "7%",
          }}
        >
          <p
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              fontSize: isMobile ? "2vh" : "3vh",
              fontWeight: "500",
              lineHeight: isMobile ? "22px" : "30px",
              position: "absolute",
              width: isMobile ? "320px" : "746px",
              height: "20vh",
              top: "5%",
              left: "10%",
            }}
          >
            Воплощение элегантности и продуманного пространства. Высокие потолки
            и эффектная люстра подчёркивают статус интерьера, а винтовая
            лестница с коваными перилами добавляет архитектурной
            выразительности. Молдинги на стенах, мягкий свет, прозрачное кресло
            в стиле «bubble chair» — каждый элемент подбирался с вниманием к
            деталям. Все работы выполнены под ключ: от демонтажа до финального
            декора.
          </p>
        </div>
        <div
          style={{
            padding: isMobile ? "2vw" : "0",
            width: isMobile ? "96vw" : "auto",
            height: isMobile ? "auto" : "31%",
            aspectRatio: isMobile ? "1 / 1" : "auto", // делает квадрат
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/2.jpg`}
            alt="Интерьер"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* 3 блок */}
        <div
          style={{
            width: isMobile ? "96vw" : "auto",
            height: isMobile ? "auto" : "50%",
            position: "relative",
            color: "white",
            fontFamily: "sans-serif",

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/3.jpg`}
            alt="Деталь 1"
            style={{
              height: isMobile ? "auto" : "55.5%",
              width: isMobile ? "100%" : "auto",
              padding: isMobile ? "2%" : "0",
              marginTop: isMobile ? "0%" : "5%",
              marginBottom: isMobile ? "0%" : "5%",
              objectFit: "contain",
              aspectRatio: "1 / 1",
            }}
          />{" "}
          <div
            style={{
              padding: isMobile ? "2vw" : "0",
              width: isMobile ? "100%" : "auto",
              height: isMobile ? "auto" : "33%",
              aspectRatio: isMobile ? "1 / 1" : "17 / 10", // делает квадрат
            }}
          >
            <img
              src={`/images/photolibrary/project${id}/4.jpg`}
              alt="Интерьер"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {!isMobile ? (
            <p
              style={{
                position: "absolute",
                width: "200px",
                top: "25%",
                right: "0%",
                fontSize: "16px",
                lineHeight: "25px",
              }}
            >
              Реализовано: <br />
              <br />
              Двусветное пространство с усиленной шумоизоляцией; Премиальные
              материалы отделки: декоративные панели, металл, натуральное
              дерево;Освещение в несколько сценариев (люстра + локальные
              подсветки);Эргономичное зонирование с учётом пожеланий клиента.
            </p>
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            width: "20%",
            height: isMobile ? "11%" : "10%",
            marginTop: isMobile ? "2%" : "4%",
            marginBottom: isMobile ? "2%" : "4%",
            backgroundColor: "#274251",
            borderRadius: "7px",
            alignItems: "center",
            position: "relative",
            marginLeft: isMobile ? "2%" : "7%",
          }}
        >
          <p
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              fontSize: isMobile ? "2vh" : "3vh",
              fontWeight: "500",
              lineHeight: isMobile ? "22px" : "30px",
              position: "absolute",
              width: isMobile ? "320px" : "746px",
              height: "20vh",
              top: "5%",
              left: "10%",
            }}
          >
            Компактное, но функциональное пространство, спроектированное с
            вниманием к стилю и комфорту. Монохромная цветовая гамма, акценты в
            графите и белом, мягкая мебель и дизайнерские детали создают
            атмосферу уюта и уравновешенности.
          </p>
        </div>

        <div
          style={{
            padding: isMobile ? "2vw" : "0",
            width: isMobile ? "96vw" : "auto",
            height: isMobile ? "auto" : "31%",
            aspectRatio: isMobile ? "1 / 1" : "auto", // делает квадрат
            marginBottom: isMobile ? "0%" : "3.6%",
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/5.jpg`}
            alt="Интерьер"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* 3 блок */}
        <div
          style={{
            width: isMobile ? "100vw" : "auto",
            height: isMobile ? "auto" : "50%",

            position: "relative",
            color: "white",
            fontFamily: "sans-serif",

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              padding: isMobile ? "2vw" : "0",
              width: isMobile ? "96vw" : "auto",
              height: isMobile ? "auto" : "32.65%",
              aspectRatio: isMobile ? "1 / 1" : "16 / 9",
            }}
          >
            <img
              src={`/images/photolibrary/project${id}/6.jpg`}
              alt="Интерьер"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            style={{
              padding: isMobile ? "2vw" : "0",
              width: isMobile ? "96vw" : "auto",
              height: isMobile ? "auto" : "58%",

              marginTop: isMobile ? "0%" : "4%",
              marginBottom: isMobile ? "0%" : "4%",
            }}
          >
            <img
              src={`/images/photolibrary/project${id}/7.jpg`}
              alt="Интерьер"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {!isMobile ? (
            <p
              style={{
                position: "absolute",
                width: "204px",
                top: "18%",
                right: "0%",
                fontSize: "16px",
                lineHeight: "25px",
              }}
            >
              В интерьере реализовано: <br />
              <br />
              Подвесное кресло в стиле "bubble" как элемент уюта и зонирования;{" "}
              <br />
              Эргономичное хранение с открытыми полками и встроенными
              модулями;Уютная зона отдыха с телевизором и местом для
              кофе/работы; <br />
              Сочетание текстур: дерево, бархат, матовые фасады, декоративная
              штукатурка.Эта спальня — пример того, как даже небольшое
              пространство может быть стильным, продуманным и тёплым.
            </p>
          ) : (
            ""
          )}
        </div>

        <div
          style={{
            padding: isMobile ? "2vw" : "0",
            width: isMobile ? "96vw" : "auto",
            height: isMobile ? "auto" : "33%",
            aspectRatio: "1 / 1",
            marginTop: isMobile ? "0%" : "4%",
            marginBottom: isMobile ? "0%" : "4%",
            display: "block",
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/8.jpg`}
            alt="Интерьер"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{
            width: "20%",
            height: isMobile ? "15%" : "15%",
            marginTop: isMobile ? "2%" : "4%",
            marginBottom: isMobile ? "2%" : "4%",
            backgroundColor: "#274251",
            borderRadius: "7px",
            alignItems: "center",
            position: "relative",
            marginLeft: isMobile ? "2%" : "7%",
          }}
        >
          <p
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              fontSize: isMobile ? "2vh" : "3vh",
              fontWeight: "500",
              lineHeight: isMobile ? "22px" : "30px",
              position: "absolute",
              width: isMobile ? "320px" : "746px",
              height: "20vh",
              top: "5%",
              left: "10%",
            }}
          >
            Функциональный и эстетичный интерьер, выполненный в духе современной
            классики. Пространство наполнено светом благодаря раздвижным
            перегородкам с прозрачным стеклом и чёткой геометрией.Мраморный стол
            и бархатные стулья добавляют уюта и статуса, а встроенные системы
            хранения делают интерьер не только красивым, но и практичным.
          </p>
        </div>

        <div
          style={{
            padding: isMobile ? "2vw" : "0",
            width: isMobile ? "96vw" : "auto",
            height: isMobile ? "auto" : "35%",

            marginTop: isMobile ? "0%" : "4%",
            marginBottom: isMobile ? "0%" : "4%",
            display: "block",
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/9.jpg`}
            alt="Интерьер"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        {!isMobile ? (
          <div
            style={{
              width: "20%",
              height: "calc(15% )",
              marginTop: "4%",
              marginBottom: "4%",

              borderRadius: "7px",
              alignItems: "center",
              position: "relative",
              marginLeft: "7%",
            }}
          >
            <p
              style={{
                marginTop: "0%",
                marginBottom: "0%",
                fontSize: "3vh",
                fontWeight: "500",
                lineHeight: "30px",
                position: "absolute",
                width: "746px",
                height: "90%",
                top: "5%",
                left: "180%",
              }}
            >
              Что реализовано:Полная перепланировка с созданием проходной
              кухни;Раздвижные перегородки в чёрном алюминиевом
              профиле;Шкафы-невидимки с push-механизмами;Подсветка и электрика с
              учётом сценариев использования.Пример умного дизайна, где каждая
              деталь работает на комфорт и эстетику.
            </p>
          </div>
        ) : (
          ""
        )}

        <div
          style={{
            padding: isMobile ? "2vw" : "0",
            width: isMobile ? "96vw" : "auto",
            height: isMobile ? "auto" : "46%",
            aspectRatio: "1 / 1",
            marginTop: isMobile ? "0%" : "4%",
            marginBottom: isMobile ? "0%" : "4%",
            display: "block",
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/10.jpg`}
            alt="Интерьер"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{
            width: "20%",
            height: isMobile ? "12%" : "10%",
            marginTop: isMobile ? "2%" : "4%",
            marginBottom: isMobile ? "2%" : "4%",
            backgroundColor: "#274251",
            borderRadius: "7px",
            alignItems: "center",
            position: "relative",
            marginLeft: isMobile ? "2%" : "7%",
          }}
        >
          <p
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              fontSize: isMobile ? "2vh" : "3vh",
              fontWeight: "500",
              lineHeight: isMobile ? "22px" : "30px",
              position: "absolute",
              width: isMobile ? "320px" : "746px",
              height: "20vh",
              top: "5%",
              left: "10%",
            }}
          >
            Минимализм и уют — в каждом элементе. Контраст тёплого дерева и
            бетонной плитки создаёт расслабляющую атмосферу. Встроенное
            освещение, парящие тумбы, гигиеничный подвесной унитаз и зона душа
            за стеклом — всё продумано для комфорта и визуальной чистоты.
          </p>
        </div>

        <div
          style={{
            width: isMobile ? "100%" : "auto",

            height: isMobile ? "auto" : "40%",
            objectFit: "contain",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/11.jpg`}
            alt="Интерьер"
            style={{
              width: isMobile ? "96%" : "100%",

              height: isMobile ? "96%" : "100%",
              padding: isMobile ? "2%" : "0",
            }}
          />
          {!isMobile ? (
            <p
              style={{
                width: "204px",

                fontSize: "16px",
                lineHeight: "25px",
                marginLeft: "10%",
                marginBottom: "0%",
              }}
            >
              Что реализовано: <br />
              <br />
              Полный демонтаж старой отделки;Вывод новых коммуникаций и скрытая
              сантехника;Установка акриловой ванны с подсветкой и
              гидромассажем;Влагостойкая мебель на заказ;Стены: керамогранит
              «под бетон» + ламели из натурального шпона;Пол с подогревом и
              зонированный тёплый свет.Современная и тёплая ванная, в которой
              приятно начать и закончить день.
            </p>
          ) : (
            ""
          )}
        </div>
        {isMobile ? (
          <div
            style={{
              width: "20%",
              height: "18%",
              marginTop: "2%",
              marginBottom: "2%",
              backgroundColor: "#274251",
              borderRadius: "7px",
              alignItems: "center",
              position: "relative",
              marginLeft: "2%",
            }}
          >
            <p
              style={{
                marginTop: "0%",
                marginBottom: "0%",
                fontSize: isMobile ? "2vh" : "3vh",
                fontWeight: "500",
                lineHeight: isMobile ? "22px" : "30px",
                position: "absolute",
                width: "300px",
                height: "20vh",
                top: "5%",
                left: "10%",
              }}
            >
              Полный демонтаж старой отделки;Вывод новых коммуникаций и скрытая
              сантехника;Установка акриловой ванны с подсветкой и
              гидромассажем;Влагостойкая мебель на заказ;Стены: керамогранит
              «под бетон» + ламели из натурального шпона;Пол с подогревом и
              зонированный тёплый свет.Современная и тёплая ванная, в которой
              приятно начать и закончить день.
            </p>
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            width: "100%",
            height: "10vh",
          }}
        ></div>
      </div>

      {/* КОНЕЧНАЯ */}
    </div>
  );
};

export default ProjectPage;
