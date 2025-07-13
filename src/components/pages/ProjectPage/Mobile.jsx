import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionModal from "../../windows/FeedbackModal";

const ProjectPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/images/photolibrary/project${id}/data.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Нет data.json");
        return res.json();
      })
      .then(setData)
      .catch(() => setData(null));
  }, [id]);

  const [questioModalOpen, setQuestioModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [blockHeights, setBlockHeights] = useState({
    block1: 0,
    block2: 0,
    block3: 0,
    block4: 0,
    block5: 0,
  });

  const refs = {
    block1: useRef(null),
    block2: useRef(null),
    block3: useRef(null),
    block4: useRef(null),
    block5: useRef(null),
  };

  const updateBlockHeight = (blockName, height) => {
    setBlockHeights((prev) => ({
      ...prev,
      [blockName]: height,
    }));
  };

  console.log(blockHeights, refs.block5);

  useEffect(() => {
    const observers = {};

    ["block1", "block2", "block3", "block4", "block5"].forEach((block) => {
      if (!refs[block].current) return;

      observers[block] = new ResizeObserver((entries) => {
        for (let entry of entries) {
          updateBlockHeight(block, entry.contentRect.height);
        }
      });

      observers[block].observe(refs[block].current);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

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
      {/* <QuestionModal
        isOpen={questioModalOpen}
        onClose={() => setQuestioModalOpen(false)}
        isMobile={isMobile}
      /> */}
      {/* 1 блок */}
      <div
        style={{
          width: "auto",
          height: "61%",
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
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "#44697E",
            borderRadius: "7px",
            padding: "0.5vw",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "white",
              marginTop: "10px",
              letterSpacing: "1.3px",
              whiteSpace: "nowrap",
              textAlign: "center", // это можно оставить
            }}
          >
            {data?.title1}
          </p>
          <p
            style={{
              fontSize: "16px", // ← можно подогнать
              fontWeight: "bold",
              color: "white",
              letterSpacing: "2px", // ← растягивает строку визуально
              marginTop: "-14px",
              marginBottom: "10px",
              textTransform: "uppercase",
              width: "100%",
              textAlign: "center", // можно и justify, но срабатывает плохо для одной строки
            }}
          >
            {data?.title2}
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
          position: "relative",
        }}
      >
        {/* Верхний блок */}
        <div
          style={{
            width: "24%",
            height: `calc(${blockHeights.block1}px + 2%)`,
            marginTop: "2%",
            marginBottom: "2%",
            backgroundColor: "#274251",
            borderRadius: "7px",
            alignItems: "center",

            marginLeft: "4%",
          }}
        ></div>
        <p
          ref={refs.block1}
          style={{
            marginTop: "0%",
            marginBottom: "0%",
            fontSize: "2vh",
            fontWeight: "500",
            lineHeight: "20px",
            position: "absolute",

            height: "auto",
            top: "1.5%",
            left: "7%",
            right: "5%",
          }}
        >
          {data?.text1}
        </p>
        <div
          style={{
            padding: "2vw",
            width: "96vw",
            height: "auto",
            aspectRatio: "1 / 1", // делает квадрат
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
            width: "96vw",
            height: "auto",
            position: "relative",
            color: "white",
            fontFamily: "sans-serif",

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            aspectRatio: "1 / 1", // делает квадрат
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/3.jpg`}
            alt="Деталь 1"
            style={{
              height: "auto",
              width: "100%",
              padding: "2%",
              marginTop: "0%",
              marginBottom: "0%",
              objectFit: "contain",
              aspectRatio: "1 / 1",
            }}
          />{" "}
          <div
            style={{
              padding: "2vw",
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1", // делает квадрат
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
        </div>

        <div
          style={{
            padding: "2vw",
            width: "96vw",
            height: "auto",
            aspectRatio: "1 / 1", // делает квадрат
            marginBottom: "0%",
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

        <div
          style={{
            width: "30%",
            height: `calc(${blockHeights.block3}px + 2%)`,
            marginTop: "2%",
            marginBottom: "2%",
            backgroundColor: "#274251",
            borderRadius: "7px",
            alignItems: "center",
            position: "relative",
            marginLeft: "5%",
          }}
        >
          <p
            ref={refs.block3}
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "20px",
              position: "absolute",

              height: "auto",
              top: "9%",
              left: "15%",
              right: "-180%",
            }}
          >
            {data?.text3}
          </p>
        </div>

        {/* 3 блок */}
        <div
          style={{
            width: "100vw",
            height: "auto",

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
              padding: "2vw",
              width: "96vw",
              height: "auto",
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`/images/photolibrary/project${id}/6.jpg`}
              alt="Интерьер"
              style={{
                width: "90%",

                objectFit: "cover",
                aspectRatio: "1 / 1",
              }}
            />
          </div>
          <div
            style={{
              padding: "2vw",
              width: "96vw",
              height: "auto",

              marginTop: "0%",
              marginBottom: "0%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`/images/photolibrary/project${id}/7.jpg`}
              alt="Интерьер"
              style={{
                width: "90%",

                objectFit: "cover",
                aspectRatio: "1 / 1",
              }}
            />
          </div>
        </div>

        <div
          style={{
            width: "100vw",
            height: "auto",
            aspectRatio: "16 / 10",
            marginTop: "0%",
            marginBottom: "0%",

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
            width: "30%",
            height: `calc(${blockHeights.block4}px + 2%)`,
            marginTop: "2%",
            marginBottom: "2%",
            backgroundColor: "#274251",
            borderRadius: "7px",
            alignItems: "center",
            position: "relative",
            marginLeft: "5%",
          }}
        >
          <p
            ref={refs.block4}
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "20px",
              position: "absolute",

              height: "auto",
              top: "7%",
              left: "15%",
              right: "-180%",
            }}
          >
            {data?.text5}
          </p>
        </div>

        <div
          style={{
            padding: "2vw",
            width: "96vw",
            height: "auto",

            marginTop: "0%",
            marginBottom: "0%",
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
              aspectRatio: "14 / 10",
            }}
          />
        </div>

        <div
          style={{
            padding: "2vw",
            width: "96vw",
            height: "auto",
            aspectRatio: "1 / 1",
            marginTop: "0%",
            marginBottom: "0%",
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
            width: "100%",

            height: "auto",
            objectFit: "contain",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <img
            src={`/images/photolibrary/project${id}/11.jpg`}
            alt="Интерьер"
            style={{
              width: "96%",

              height: "96%",
              padding: "2%",
            }}
          />
        </div>
        <div
          style={{
            width: "30%",
            height: `calc(${blockHeights.block5}px + 2%)`,
            marginTop: "2%",
            marginBottom: "2%",
            backgroundColor: "#274251",
            borderRadius: "7px",
            alignItems: "center",
            position: "relative",
            marginLeft: "5%",
            display: "block",
          }}
        >
          <p
            ref={refs.block5}
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "20px",
              position: "absolute",
              height: "auto",
              top: "9%",
              left: "15%",
              right: "-180%",
              display: "block", // ← показываем только на мобиле
            }}
          >
            {data?.text8}
          </p>
        </div>

        <div
          style={{
            width: "100%",
            height: "20vh",
          }}
        ></div>
      </div>

      {/* КОНЕЧНАЯ */}
    </div>
  );
};

export default ProjectPage;
