import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const [hasImage11, setHasImage11] = useState(false);

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

  useEffect(() => {
    const img = new Image();
    img.src = `/images/photolibrary/project${id}/11.jpg`;
    img.onload = () => setHasImage11(true);
    img.onerror = () => setHasImage11(false);
  }, [id]);

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

  const handleClick = () => {
    // Сообщаем Метрике о виртуальном переходе
    if (window.ym) {
      window.ym(101296472, "hit", "/?fromProject=1");
      window.ym(101296472, "notBounce");
    }

    // Делаем реальный navigate
    setTimeout(() => {
      navigate("/", { state: { scrollTo: "portfolio" } });
    }, 100);
  };

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
        onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        style={{
          position: "fixed",
          top: "1%",
          left: "1%",
          fontFamily: "sans-serif",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 1000,
          WebkitTapHighlightColor: "transparent",
        }}
        onClick={handleClick}
      >
        НА ГЛАВНУЮ
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
          loading="lazy"
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
            loading="lazy"
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
            loading="lazy"
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
              loading="lazy"
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
            loading="lazy"
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
              top: "17px",
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
              loading="lazy"
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
              loading="lazy"
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
            loading="lazy"
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
              top: "17px",
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
            loading="lazy"
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
            loading="lazy"
            src={`/images/photolibrary/project${id}/10.jpg`}
            alt="Интерьер"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {
          <div
            style={{
              width: "100%",

              height: "auto",
              objectFit: "contain",

              display: hasImage11 ? "flex" : "none",

              alignItems: "flex-end",
              position: "relative",
            }}
          >
            <img
              loading="lazy"
              src={`/images/photolibrary/project${id}/11.jpg`}
              alt="Интерьер"
              style={{
                width: "96%",

                padding: "2%",
              }}
            />
          </div>
        }
        {
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
              display: hasImage11 ? "block" : "none",
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
                top: "17px",

                left: "15%",
                right: "-180%",
                display: "block",
              }}
            >
              {data?.text8}
            </p>
          </div>
        }

        <div
          style={{
            width: "100%",
            height: "5vh",
          }}
        ></div>
      </div>

      {/* КОНЕЧНАЯ */}
    </div>
  );
};

export default ProjectPage;
