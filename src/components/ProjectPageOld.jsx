import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionModal from "./windows/QuestionModal";

const ProjectPage = () => {
  const { id } = useParams();

  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        width: "100vw", // занимает всю ширину экрана
        minHeight: "100vh",
        backgroundColor: "#04141D",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <QuestionModal
        isOpen={questioModalOpen}
        onClose={() => setQuestioModalOpen(false)}
        isMobile={isMobile}
      />
      {/* 1 блок */}
      <div
        style={{
          width: "100vw", // занимает всю ширину экрана
          height: "auto", // пусть растёт по контенту
          position: "relative",
          paddingLeft: "7vw",
          paddingRight: "7vw",
          boxSizing: "border-box",
          textAlign: "center",

          fontFamily: "sans-serif",
        }}
      >
        <p
          style={{
            fontSize: "3.17vw", // текст растёт 1:1 со шириной
            fontWeight: "bold",
            color: "white",
            marginTop: "1vh",
            marginBottom: "1vh",
          }}
        >
          ДИЗАЙН - ПРОЕКТ С ПРЕМИАЛЬНОЙ ОТДЕЛКОЙ
        </p>

        <img
          src="/images/photoGrid/project1/1.jpg"
          alt="проект"
          style={{
            width: "90%", // растягивается по ширине блока
            height: "auto", // сохраняет пропорции
          }}
        />
      </div>
      {/* 2 блок */}
      <div
        style={{
          width: "100vw",
          boxSizing: "border-box",
          paddingLeft: "7vw",
          paddingRight: "7vw",
          paddingTop: "7vw",

          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Верхний блок */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "0.2vw",
          }}
        >
          <img
            src="/images/photoGrid/project1/2.jpg"
            alt="Интерьер"
            style={{
              width: "70%",
              height: "auto",
              objectFit: "cover",
              marginRight: "-5vw",
            }}
          />
          <div
            style={{
              width: "30%",
              padding: "2vw",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "1.8vw",
                fontWeight: "700",
                lineHeight: "1.2",
              }}
            >
              воплощение элегантности и продуманного пространства, высокие
              потолки и эффектная люстра подчёркивают статус интерьера, а
              винтовая лестница с коваными перилами добавляет архитектурной
              выразительности.
            </p>
          </div>
        </div>

        {/* Нижний блок */}
        <div style={{ display: "flex", width: "100%", marginLeft: "22vw" }}>
          {/* Текст слева */}
          <div
            style={{
              width: "40%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "end",
            }}
          >
            <p
              style={{
                fontSize: "1.8vw",
                fontWeight: "700",
                lineHeight: "1.2",
                maxWidth: "90%",
                marginRight: "3vw",
              }}
            >
              Молдинги на стенах, мягкий свет, прозрачное кресло в стиле «bubble
              chair» — каждый элемент подбирался с вниманием к деталям.
            </p>
          </div>

          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "2vw",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/photoGrid/project1/3.jpg"
              alt="Деталь 1"
              style={{
                width: "60%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
      {/* 3 блок */}
      <div
        style={{
          width: "100vw",
          boxSizing: "border-box",
          paddingLeft: "7vw",
          paddingRight: "7vw",
          paddingTop: "7vw",

          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Верхний блок */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "0.2vw",
          }}
        >
          <div
            style={{
              width: "30%",
              paddingRight: "2vw",

              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              textAlign: "end",
              alignItems: "end",
            }}
          >
            <p
              style={{
                fontSize: "1.5vw",
                fontWeight: "500",
                lineHeight: "1.1",
                marginBottom: "0px",
                width: "60%",
              }}
            >
              Компактное, но функциональное пространство, спроектированное с
              вниманием к стилю и комфорту
            </p>
            <p
              style={{
                fontSize: "1.5vw",
                fontWeight: "500",
                lineHeight: "1.1",
                marginBottom: "0px",
              }}
            >
              монохромная цветовая гамма, акценты в графите и белом, мягкая
              мебель и дизайнерские детали создают атмосферу уюта и
              уравновешенности.
            </p>
          </div>
          <img
            src="/images/photoGrid/project1/4.jpg"
            alt="Интерьер"
            style={{
              width: "55%",
              height: "auto",
              objectFit: "cover",
              marginRight: "10vw",
            }}
          />
        </div>

        {/* Нижний блок */}
        <div style={{ display: "flex", width: "100%", marginLeft: "16vw" }}>
          {/* Текст слева */}

          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "2vw",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/photoGrid/project1/5.jpg"
              alt="Деталь 1"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div
            style={{
              width: "40%",
              paddingLeft: "1vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "start",
            }}
          >
            <p
              style={{
                fontSize: "1.6vw",
                fontWeight: "500",
                lineHeight: "1.1",
                maxWidth: "90%",
                marginRight: "3vw",
              }}
            >
              в интерьере реализовано:
              <br />
              <br /> подвесное кресло в стиле "bubble" как элемент уюта и
              зонирования;
              <br />
              <br /> эргономичное хранение с открытыми полками и встроенными
              модулями;
              <br />
              <br /> уютная зона отдыха с телевизором и местом для кофе/работы;
            </p>
          </div>
        </div>
      </div>
      {/* 4 блок */}
      <div
        style={{
          width: "100vw",
          boxSizing: "border-box",
          paddingLeft: "7vw",
          paddingRight: "7vw",
          paddingTop: "7vw",

          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Верхний блок */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "1vw",
            position: "relative", // чтобы позиционировать текст внутри
          }}
        >
          {/* Картинка */}
          <img
            src="/images/photoGrid/project1/6.jpg"
            alt="Интерьер"
            style={{
              width: "48%",
              height: "auto",
              objectFit: "cover",
            }}
          />

          {/* Выезжающий текст */}
          <p
            style={{
              position: "absolute",
              left: "4vw",
              bottom: "-5.3vw", // выезд текста вниз
              fontSize: "1.7vw",
              fontWeight: "600",
              lineHeight: "1.2",
              width: "20%",
              textAlign: "right",
            }}
          >
            Функциональный и эстетичный интерьер, выполненный в духе современной
            классики. Пространство наполнено светом благодаря раздвижным
            перегородкам с прозрачным стеклом и чёткой геометрией.
          </p>
        </div>

        {/* Нижний блок */}
        <div
          style={{
            display: "flex",
            width: "100%",
            marginLeft: "30vw",
            position: "relative",
          }}
        >
          {/* Текст слева */}

          <div
            style={{
              width: "48%",
              display: "flex",
              flexDirection: "column",
              gap: "2vw",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/photoGrid/project1/7.jpg"
              alt="Деталь 1"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div
            style={{
              width: "20%",
              paddingLeft: "1vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "start",
              position: "absolute",
              right: "26vw",
              bottom: "-2.1vw",
            }}
          >
            <p
              style={{
                fontSize: "1.7vw",
                fontWeight: "600",
                lineHeight: "1.2",
                maxWidth: "90%",
                marginRight: "3vw",
              }}
            >
              Мраморный стол и бархатные стулья добавляют уюта и статуса, а
              встроенные системы хранения делают интерьер не только красивым, но
              и практичным.
            </p>
          </div>
        </div>
      </div>
      {/* 5 блок */}
      <div
        style={{
          width: "100vw",
          boxSizing: "border-box",
          paddingLeft: "7vw",
          paddingRight: "7vw",
          paddingTop: "7vw",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Верхний блок */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "60%",

              display: "flex",
              // flexDirection: "column",
              justifyContent: "center",
              // textAlign: "end",
              // alignItems: "end",
            }}
          >
            <img
              src="/images/photoGrid/project1/8.jpg"
              alt="Интерьер"
              style={{
                width: "70%",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <img
              src="/images/photoGrid/project1/9.jpg"
              alt="Интерьер"
              style={{
                width: "60%",
                height: "80%",
                objectFit: "cover",
                marginLeft: "1vw",
              }}
            />
          </div>
        </div>

        {/* Нижний блок */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "1vw",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "30%",
              paddingLeft: "1vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "start",
              position: "absolute",
              left: "10.4%",
              top: "-6%",
            }}
          >
            {/* левый текст  */}
            <p
              style={{
                fontSize: "1.36vw",
                fontWeight: "500",
                lineHeight: "1.1",
                maxWidth: "90%",
                marginRight: "3vw",
              }}
            >
              Современная ванная комната с элементами эко-стиля. Интерьер
              выполнен в тёплых, естественных тонах с акцентом на дерево и
              камень. В центре внимания — функциональная зона с просторной
              ванной, подсветкой и стеклянной перегородкой. Натуральная текстура
              стен и мягкое освещение создают атмосферу уюта и спокойствия.
              Зелёный коврик добавляет нотку природы и контрастирует с
              минималистичной палитрой. Все элементы продуманы — от чёрного
              душевого гарнитура до зеркал с подсветкой и лаконичных деревянных
              полок.
            </p>
          </div>

          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              gap: "2vw",
              justifyContent: "center",
              marginLeft: "10vw",
            }}
          >
            <img
              src="/images/photoGrid/project1/10.jpg"
              alt="Деталь 1"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div
            style={{
              width: "20%",
              paddingLeft: "1vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "start",
              position: "absolute",
              right: "7%",
              top: "-33%",
            }}
          >
            {/* правый текст */}
            <p
              style={{
                fontSize: "1.44vw",
                fontWeight: "500",
                lineHeight: "1.1",
                maxWidth: "90%",
                marginRight: "3vw",
              }}
            >
              В проекте выполнен капитальный ремонт: выровнены стены и полы,
              заменены все коммуникации, проведена новая электрика и установлено
              современное сантехническое оборудование. Интерьер оформлен в
              тёплой гамме с сочетанием дерева, камня и стекла. Установлены
              ниши, встроенное освещение и тёплый пол — всё для комфорта и
              стиля.
            </p>
          </div>
        </div>
      </div>

      {/* 6 блок пустой */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "15vh",
        }}
      ></div>
    </div>
  );
};

export default ProjectPage;
