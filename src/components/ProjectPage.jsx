import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();

  // В будущем можно будет по `id` подгружать нужные данные
  return (
    <>
      {/* 1 блок */}
      <div
        style={{
          width: "100vw", // занимает всю ширину экрана
          height: "auto", // пусть растёт по контенту
          position: "relative",
          padding: "7vw", // адаптивные отступы
          boxSizing: "border-box",
          textAlign: "center",
          backgroundColor: "#04141D",
          fontFamily: "sans-serif",
        }}
      >
        <p
          style={{
            fontSize: "2.4vw", // текст растёт 1:1 со шириной
            fontWeight: "bold",
            color: "white",
            marginTop: "0",
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
          padding: "7vw",
          backgroundColor: "#04141D",
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
          padding: "7vw",
          backgroundColor: "#04141D",
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
          padding: "7vw",
          backgroundColor: "#04141D",
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
    </>
  );
};

export default ProjectPage;
