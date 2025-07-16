import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionModal from "../../windows/FeedbackModal";

const ProjectPageDesktop = () => {
  const [data, setData] = useState(null);
  const [questioModalOpen, setQuestioModalOpen] = useState(false);
  const [widthSecondBlock, setWidthSecondBlock] = useState(0);
  const [hasImage11, setHasImage11] = useState(false);

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

  const secondBlock = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/images/photolibrary/project${id}/data.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Нет data.json");
        return res.json();
      })
      .then(setData)
      .catch(() => setData(null));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight) {
        setQuestioModalOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = `/images/photolibrary/project${id}/11.jpg`;
    img.onload = () => setHasImage11(true);
    img.onerror = () => setHasImage11(false);
  }, [id]);
  const updateBlockHeight = (blockName, height) => {
    setBlockHeights((prev) => ({
      ...prev,
      [blockName]: height,
    }));
  };
  useEffect(() => {
    const updateWidth = () => {
      if (secondBlock.current) {
        setWidthSecondBlock(secondBlock.current.offsetWidth);
      }
    };

    const observers = {};

    // Наблюдение за 5 блоками
    ["block1", "block2", "block3", "block4", "block5"].forEach((block) => {
      if (!refs[block]?.current) return;

      observers[block] = new ResizeObserver((entries) => {
        for (let entry of entries) {
          updateBlockHeight(block, entry.contentRect.height);
        }
      });

      observers[block].observe(refs[block].current);
    });

    // Наблюдение за шириной secondBlock
    if (secondBlock.current) {
      observers["secondBlock"] = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setWidthSecondBlock(entry.contentRect.width);
        }
      });

      observers["secondBlock"].observe(secondBlock.current);
    }

    // Слушаем ресайз окна
    window.addEventListener("resize", updateWidth);
    updateWidth(); // при первом рендере

    return () => {
      // Чистим всех observers
      Object.values(observers).forEach((observer) => observer.disconnect());
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div
      style={{
        width: "auto",
        height: "auto",
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
          top: "2%",
          left: "4%",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "26px",
          cursor: "pointer",
          zIndex: 1000,
          fontFamily: "sans-serif",
          WebkitTapHighlightColor: "transparent",
        }}
        onClick={() => navigate("/", { state: { scrollTo: "portfolio" } })}
      >
        НА ГЛАВНУЮ
      </div>
      {/* <QuestionModal
        isOpen={questioModalOpen}
        onClose={() => setQuestioModalOpen(false)}
        isMobile={false}
      /> */}
      {/* родитель всей разметки */}
      <div
        style={{
          width: "100vw",
          height: "auto",
          backgroundColor: "#04141D",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          alignItems: "center",
        }}
      >
        {/* 1 блок с заглавным фото */}
        <div
          style={{
            width: "auto",
            height: "100vh",
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
                fontSize: "46px",
                fontWeight: "bold",
                color: "white",
                marginTop: "10px",
                letterSpacing: "2px",
                whiteSpace: "nowrap",
                textAlign: "center", // это можно оставить
              }}
            >
              {data?.title1}
            </p>
            <p
              style={{
                fontSize: "33px", // ← можно подогнать
                fontWeight: "bold",
                color: "white",
                letterSpacing: "6px", // ← растягивает строку визуально
                marginTop: "-30px",
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
        {/* 2 блок  */}
        <div
          style={{
            width: "auto",
            height: "auto",
            boxSizing: "border-box",
            color: "white",
            fontFamily: "sans-serif",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div style={{ width: widthSecondBlock }}>
            <div
              style={{
                width: "240px",
                height: `calc(${blockHeights.block1}px + 3vh)`,
                marginTop: "4%",
                marginBottom: "4%",
                backgroundColor: "#274251",
                borderRadius: "7px",
                alignItems: "center",
                marginLeft: "5%",
                position: "relative",
              }}
            >
              <p
                ref={refs.block1}
                style={{
                  marginTop: "0%",
                  marginBottom: "0%",
                  fontSize: "3vh",
                  fontWeight: "500",
                  lineHeight: "28px",
                  position: "absolute",

                  height: "auto",
                  top: "1.5vh",
                  left: "18%",
                  width: `${widthSecondBlock * 0.8}px`,
                }}
              >
                {data?.text1}
              </p>
            </div>
          </div>
          <div
            ref={secondBlock}
            style={{
              width: "auto",
              height: "70vh",
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
        </div>
        {/* 3 блок  */}
        <div
          style={{
            width: widthSecondBlock,
            height: "auto",
            boxSizing: "border-box",
            color: "white",
            fontFamily: "sans-serif",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <div
            style={{
              height: "100vh",
              position: "relative",
              color: "white",
              fontFamily: "sans-serif",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              loading="lazy"
              src={`/images/photolibrary/project${id}/3.jpg`}
              alt="Деталь 1"
              style={{
                height: "54%",
                width: "auto",

                objectFit: "contain",
                aspectRatio: "1 / 1",
                paddingTop: "3vh",
                paddingBottom: "3vh",
              }}
            />{" "}
            <div
              style={{
                width: "auto",
                height: "40%",
                aspectRatio: "13.5 / 10",
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
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                lineHeight: "25px",
                width: "180px",
                marginLeft: "0vw",
              }}
            >
              {data?.text2}
            </p>
          </div>
        </div>

        {/* блок 4 */}
        <div
          style={{
            width: "auto",
            height: "auto",
            boxSizing: "border-box",
            color: "white",
            fontFamily: "sans-serif",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div style={{ width: widthSecondBlock }}>
            <div
              style={{
                width: "240px",
                height: `calc(${blockHeights.block2}px + 3vh)`,
                marginTop: "4%",
                marginBottom: "4%",
                backgroundColor: "#274251",
                borderRadius: "7px",
                alignItems: "center",
                marginLeft: "5%",
                position: "relative",
              }}
            >
              <p
                ref={refs.block2}
                style={{
                  marginTop: "0%",
                  marginBottom: "0%",
                  fontSize: "3vh",
                  fontWeight: "500",
                  lineHeight: "28px",
                  position: "absolute",

                  height: "auto",
                  top: "1.5vh",
                  left: "18%",
                  width: `${widthSecondBlock * 0.8}px`,
                }}
              >
                {data?.text3}
              </p>
            </div>
          </div>
          <div
            style={{
              width: widthSecondBlock,
              height: "auto",
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
        </div>

        {/* 5 блок  */}
        <div
          style={{
            height: "auto",
            boxSizing: "border-box",
            color: "white",
            fontFamily: "sans-serif",
            width: widthSecondBlock,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <div
            style={{
              height: "100vh",
              position: "relative",
              color: "white",
              fontFamily: "sans-serif",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              loading="lazy"
              src={`/images/photolibrary/project${id}/6.jpg`}
              alt="Деталь 1"
              style={{
                height: "54%",
                width: "auto",

                objectFit: "contain",
                aspectRatio: "1 / 1",
                paddingTop: "2vh",
                paddingBottom: "2vh",
              }}
            />{" "}
            <div
              style={{
                width: "auto",
                height: "40%",
                aspectRatio: "13.5 / 10",
                paddingBottom: "2vh",
              }}
            >
              <img
                loading="lazy"
                src={`/images/photolibrary/project${id}/7.jpg`}
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
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                lineHeight: "25px",
                width: "180px",
                marginLeft: "10vw",
              }}
            >
              {data?.text4}
            </p>
          </div>
        </div>

        {/* 6 блок */}
        <div
          style={{
            width: "auto",
            height: "auto",
            boxSizing: "border-box",
            color: "white",
            fontFamily: "sans-serif",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              width: widthSecondBlock,
              height: "auto",
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
          <div style={{ width: widthSecondBlock }}>
            <div
              style={{
                width: "240px",
                height: `calc(${blockHeights.block3}px + 3vh)`,
                marginTop: "4%",
                marginBottom: "4%",
                backgroundColor: "#274251",
                borderRadius: "7px",
                alignItems: "center",
                marginLeft: "5%",
                position: "relative",
              }}
            >
              <p
                ref={refs.block3}
                style={{
                  marginTop: "0%",
                  marginBottom: "0%",
                  fontSize: "3vh",
                  fontWeight: "500",
                  lineHeight: "28px",
                  position: "absolute",

                  height: "auto",
                  top: "1.5vh",
                  left: "18%",
                  width: `${widthSecondBlock * 0.8}px`,
                }}
              >
                {data?.text5}
              </p>
            </div>
          </div>
        </div>

        {/* 7 блок */}

        <div
          style={{
            width: "auto",
            height: "auto",
            boxSizing: "border-box",
            color: "white",
            fontFamily: "sans-serif",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              width: widthSecondBlock,
              height: "auto",
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
              }}
            />
          </div>
          <div style={{ width: widthSecondBlock }}>
            <div
              style={{
                width: "240px",
                height: `calc(${blockHeights.block4}px + 3vh)`,
                marginTop: "4%",
                marginBottom: "4%",

                borderRadius: "7px",
                alignItems: "center",
                marginLeft: "50%",
                position: "relative",
              }}
            >
              <p
                ref={refs.block4}
                style={{
                  marginTop: "0%",
                  marginBottom: "0%",
                  fontSize: "2vh",
                  fontWeight: "500",
                  lineHeight: "28px",
                  position: "absolute",

                  height: "auto",
                  top: "1.5vh",
                  left: "18%",
                  width: `${widthSecondBlock * 0.4}px`,
                }}
              >
                {data?.text6}
              </p>
            </div>
          </div>
        </div>

        {/* 8 блок */}

        <div
          style={{
            width: "auto",
            height: "auto",
            boxSizing: "border-box",
            color: "white",
            fontFamily: "sans-serif",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              width: widthSecondBlock,
              height: "auto",
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
          <div style={{ width: widthSecondBlock }}>
            <div
              style={{
                width: "240px",
                height: `calc(${blockHeights.block5}px + 3vh)`,
                marginTop: "4%",
                marginBottom: "4%",
                backgroundColor: "#274251",
                borderRadius: "7px",
                alignItems: "center",
                marginLeft: "5%",
                position: "relative",
              }}
            >
              <p
                ref={refs.block5}
                style={{
                  marginTop: "0%",
                  marginBottom: "0%",
                  fontSize: "3vh",
                  fontWeight: "500",
                  lineHeight: "28px",
                  position: "absolute",

                  height: "auto",
                  top: "1.5vh",
                  left: "18%",
                  width: `${widthSecondBlock * 0.8}px`,
                }}
              >
                {data?.text8}
              </p>
            </div>
          </div>
        </div>

        {/* 9 блок  */}
        <div
          style={{
            height: "auto",
            boxSizing: "border-box",
            color: "white",
            fontFamily: "sans-serif",
            width: widthSecondBlock,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <div
            style={{
              height: "90vh",
              position: "relative",
              color: "white",
              fontFamily: "sans-serif",
              display: hasImage11 ? "flex" : "none",

              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              loading="lazy"
              src={`/images/photolibrary/project${id}/11.jpg`}
              alt="Деталь 1"
              style={{
                height: "90%",
                width: "auto",

                objectFit: "contain",
                aspectRatio: "1 / 1",
                paddingTop: "2vh",
                paddingBottom: "2vh",
              }}
            />{" "}
          </div>
          <div
            style={{
              display: hasImage11 ? "flex" : "none",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                lineHeight: "25px",
                width: "180px",
                marginLeft: "10vw",
              }}
            >
              {data?.text7}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageDesktop;
