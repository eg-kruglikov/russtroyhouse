import React, { useState, useRef } from "react";
import { ymGoal } from "../../utils/metrika";
import { SECTION_BACKGROUND } from "../../utils/spacing";

// CSS для кастомных radio buttons
const radioButtonStyles = `
  .repair-calculator input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  
  .repair-calculator label {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }
  
  .repair-calculator label:active {
    background-color: transparent !important;
  }
  
  .repair-calculator input[type="checkbox"] {
    outline: none;
  }
  
  .repair-calculator input[type="checkbox"]:focus,
  .repair-calculator input[type="checkbox"]:active {
    outline: none;
    box-shadow: none;
  }
  
  .repair-calculator input[type="number"]:focus,
  .repair-calculator input[type="number"]:active {
    outline: none;
  }
`;

const RepairCalculator = ({ isMobile }) => {
  const AREA_MIN = 30;
  const AREA_MAX = 350;

  const areaInputRef = useRef(null);
  const toNumber = (value) => {
    const num =
      typeof value === "number" ? value : Number.parseFloat(value || "0");
    if (Number.isNaN(num)) {
      return AREA_MIN;
    }
    return Math.min(Math.max(num, AREA_MIN), AREA_MAX);
  };

  const handleAreaChange = (value) => {
    setArea(toNumber(value));
  };

  const repairOptionsLayout = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: isMobile ? "16px" : "32px",
    rowGap: "20px",
    alignItems: "start",
    gridAutoRows: "auto",
  };

  const headerStyle = {
    fontSize: isMobile ? "18px" : "22px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    paddingBottom: "4px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "4px",
  };

  const rowGridStyle = {
    display: "grid",
    gridTemplateColumns: `${isMobile ? 18 : 20}px 1fr`,
    alignItems: "center",
    columnGap: isMobile ? "10px" : "12px",
    padding: "4px 0",
  };

  const spacerHeight = isMobile ? "26px" : "30px";

  const repairOptions = [
    { value: "cosmetic", label: "Косметический" },
    { value: "capital", label: "Капитальный" },
    { value: "whitebox", label: "Белый бокс" },
    { value: "designer", label: "Дизайнерский" },
  ];

  const roomOptions = [
    { value: "studio", label: "Студия" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4+", label: "4+" },
  ];

  const materialOptions = [
    { value: "standard", label: "Стандарт" },
    { value: "comfort", label: "Комфорт" },
    { value: "premium", label: "Премиум" },
  ];

  const premisesOptions = [
    { value: "newbuilding", label: "Новостройка" },
    { value: "secondary", label: "Вторичка" },
    { value: "apartments", label: "Апартаменты" },
  ];

  const topRowCount = Math.max(repairOptions.length, roomOptions.length);
  const bottomRowCount = Math.max(
    materialOptions.length,
    premisesOptions.length
  );

  const renderOptionColumn = (
    title,
    options,
    selectedValue,
    onSelect,
    totalRows
  ) => (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `auto repeat(${totalRows}, auto)`,
        rowGap: "8px",
        alignContent: "start",
      }}
    >
      <div style={headerStyle}>{title}</div>
      {options.map((option) => (
        <label key={option.value} style={rowGridStyle}>
          <input
            type="checkbox"
            checked={selectedValue === option.value}
            onChange={(e) => {
              if (e.target.checked) {
                onSelect(option.value);
              }
            }}
            style={{
              accentColor: "#FF6B35",
              width: isMobile ? "18px" : "20px",
              height: isMobile ? "18px" : "20px",
            }}
          />
          <span
            style={{
              fontSize: isMobile ? "14px" : "16px",
              color:
                selectedValue === option.value
                  ? "#FFD700"
                  : "rgba(255,255,255,0.75)",
              fontWeight: selectedValue === option.value ? "600" : "400",
            }}
          >
            {option.label}
          </span>
        </label>
      ))}
      {Array.from({ length: totalRows - options.length }).map((_, idx) => (
        <div key={`${title}-spacer-${idx}`} style={{ height: spacerHeight }} />
      ))}
    </div>
  );

  // Состояние калькулятора
  const [repairType, setRepairType] = useState("cosmetic");
  const [roomCount, setRoomCount] = useState("studio");
  const [area, setArea] = useState(50);
  const [materialQuality, setMaterialQuality] = useState("standard");
  const [premisesType, setPremisesType] = useState("newbuilding");
  const [replanning, setReplanning] = useState(false);

  // Состояние формы
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("call");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Расчет стоимости
  const calculatePrice = () => {
    if (!area || area <= 0) return { total: 0, perSquare: 0 };

    // Базовые цены по типам ремонта (руб/м²)
    // Базовые цены указаны для стандарта, вторички, 1 комнаты
    const basePrices = {
      cosmetic: 10000, // 9,000-13,000 ₽/м² для новостройки, 11,000-15,000 для вторички
      capital: 16000, // 14,000-18,000 ₽/м² для новостройки, 16,000-20,000 для вторички
      designer: 22000, // от 22,000 ₽/м² для новостройки, от 25,000 для вторички
      whitebox: 14000, // белый бокс между косметическим и капитальным
    };

    // Множители качества материалов
    const qualityMultipliers = {
      standard: 1,
      comfort: 1.3,
      premium: 1.6,
    };

    // Множители по количеству комнат
    const roomMultipliers = {
      studio: 0.9,
      1: 1,
      2: 1.2,
      3: 1.4,
      "4+": 1.6,
    };

    // Множители по типу помещения
    const premisesMultipliers = {
      newbuilding: 1.2, // новостройка - нужна черновая отделка
      secondary: 1.0, // вторичка - стандартная цена
      apartments: 1.5, // апартаменты - элитное жилье
    };

    const basePrice = basePrices[repairType];
    const qualityMultiplier = qualityMultipliers[materialQuality];
    const roomMultiplier = roomMultipliers[roomCount];
    const premisesMultiplier = premisesMultipliers[premisesType];

    // Расчет базовой цены
    let pricePerSquare = Math.round(
      basePrice * qualityMultiplier * roomMultiplier * premisesMultiplier
    );

    // Добавляем стоимость перепланировки
    if (replanning) {
      pricePerSquare += 1500; // +1500₽/м² за перепланировку
    }

    const totalPrice = Math.round(pricePerSquare * area);

    // Расчет сроков ремонта (дни)
    const getRepairTime = () => {
      const baseTimePerSquare = {
        cosmetic: 0.5, // 0.5 дня за м²
        capital: 1.2, // 1.2 дня за м²
        whitebox: 1.5, // 1.5 дня за м²
        designer: 2.0, // 2 дня за м²
      };

      const premisesTimeMultipliers = {
        newbuilding: 1.0, // новостройка - стандартное время
        secondary: 1.3, // вторичка - больше времени на демонтаж
        apartments: 1.1, // апартаменты - чуть больше времени
      };

      const baseTime = baseTimePerSquare[repairType];
      const premisesMultiplier = premisesTimeMultipliers[premisesType];

      let totalDays = Math.round(baseTime * area * premisesMultiplier);

      // Добавляем время на перепланировку
      if (replanning) {
        totalDays += Math.round(area * 0.3); // +0.3 дня за м²
      }

      // Минимальные сроки
      const minDays = Math.max(totalDays * 0.8, 7); // минимум 7 дней
      const maxDays = Math.max(totalDays * 1.2, minDays + 3); // +20% максимум

      return { min: Math.round(minDays), max: Math.round(maxDays) };
    };

    const timeRange = getRepairTime();

    return { total: totalPrice, perSquare: pricePerSquare, timeRange };
  };

  const { total, perSquare, timeRange } = calculatePrice();

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneDigitsOnly = phone.replace(/\D/g, "");
    if (phoneDigitsOnly.length < 10) {
      setError("Введите корректный номер телефона");
      return;
    }

    setError("");
    setIsLoading(true);

    const token = import.meta.env.VITE_TELEGRAM_TOKEN;
    const chatIds = [
      import.meta.env.VITE_TELEGRAM_CHAT_ID_EGOR,
      import.meta.env.VITE_TELEGRAM_CHAT_ID_ANTON,
    ];

    const repairTypeNames = {
      cosmetic: "Косметический",
      capital: "Капитальный",
      designer: "Дизайнерский",
      whitebox: "Белый бокс",
    };

    const qualityNames = {
      standard: "Стандарт",
      comfort: "Комфорт",
      premium: "Премиум",
    };

    const roomNames = {
      studio: "Студия",
      1: "1 комната",
      2: "2 комнаты",
      3: "3 комнаты",
      "4+": "4+ комнат",
    };

    const premisesNames = {
      newbuilding: "Новостройка",
      secondary: "Вторичка",
      apartments: "Апартаменты",
    };

    const contactMethodNames = {
      call: "Перезвоните",
      whatsapp: "Пришлите в WhatsApp",
      telegram: "Пришлите в Telegram",
    };

    const replanningText = replanning ? "\n🔨 Перепланировка: Да" : "";

    const now = new Date().toLocaleString("ru-RU");
    const message = `🧮 Новая заявка с калькулятора ремонта:\n\n📱 Телефон: ${phone}\n🏠 Тип ремонта: ${
      repairTypeNames[repairType]
    }\n🏢 Комнат: ${roomNames[roomCount]}\n🏘️ Тип помещения: ${
      premisesNames[premisesType]
    }\n📐 Площадь: ${area} м²\n⭐ Качество материалов: ${
      qualityNames[materialQuality]
    }${replanningText}\n💰 Расчетная стоимость: ${total.toLocaleString()} ₽ (${perSquare.toLocaleString()} ₽/м²)\n⏱️ Сроки: ${
      timeRange.min
    }-${timeRange.max} дней\n📞 Способ связи: ${
      contactMethodNames[contactMethod]
    }\n⏰ Время: ${now}`;

    try {
      for (const id of chatIds) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: id,
            text: message,
          }),
        });
      }

      ymGoal("calculator_form_sent");
      setIsSubmitted(true);
      setPhone("");
    } catch (err) {
      setError("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  // Форматирование числа с пробелами
  const formatNumber = (num) => {
    return num.toLocaleString("ru-RU");
  };

  return (
    <>
      <style>{radioButtonStyles}</style>
      <section
        className="repair-calculator"
        style={{
          width: "100%",
          backgroundColor: SECTION_BACKGROUND,
          paddingTop: isMobile ? "20px" : "40px",
          paddingBottom: isMobile ? "10px" : "20px",
          marginTop: "0",
          position: "relative",
          borderTop: "none",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "24px" : "32px",
          }}
        >
          {/* Заголовок */}
          <div
            style={{
              textAlign: "left",
              paddingLeft: isMobile ? "20px" : "24px",
              paddingRight: isMobile ? "20px" : "24px",
              boxSizing: "border-box",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "28px" : "48px",
                fontWeight: "800",
                color: "#FFD700",
                margin: "0 0 16px 0",
                lineHeight: isMobile ? 1.3 : 1.2,
                letterSpacing: "-0.5px",
              }}
            >
              Калькулятор ремонта
            </h2>
            <p
              style={{
                fontSize: isMobile ? "16px" : "22px",
                fontWeight: "400",
                color: "rgba(255,255,255,0.85)",
                margin: "0",
                lineHeight: 1.5,
              }}
            >
              Узнайте примерный бюджет за 30 секунд — без звонков и анкет
            </p>
          </div>

          {/* Основной контейнер калькулятора */}
          <div
            style={{
              backgroundColor: "transparent",
              borderRadius: "20px",
              paddingTop: isMobile ? "24px" : "32px",
              paddingBottom: isMobile ? "24px" : "32px",
              paddingLeft: isMobile ? "20px" : "24px",
              paddingRight: isMobile ? "20px" : "24px",
              border: "none",
              boxShadow: "none",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "24px" : "32px",
                alignItems: "start",
              }}
            >
              {/* Левая часть - параметры */}
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div style={repairOptionsLayout}>
                    {renderOptionColumn(
                      "Тип ремонта",
                      repairOptions,
                      repairType,
                      setRepairType,
                      topRowCount
                    )}
                    {renderOptionColumn(
                      "Количество комнат",
                      roomOptions,
                      roomCount,
                      setRoomCount,
                      topRowCount
                    )}
                  </div>

                  <div style={repairOptionsLayout}>
                    {renderOptionColumn(
                      "Качество материалов",
                      materialOptions,
                      materialQuality,
                      setMaterialQuality,
                      bottomRowCount
                    )}
                    {renderOptionColumn(
                      "Тип помещения",
                      premisesOptions,
                      premisesType,
                      setPremisesType,
                      bottomRowCount
                    )}
                  </div>

                  {/* Перепланировка */}
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                        border: replanning
                          ? "1px solid #FF6B35"
                          : "1px solid rgba(255,255,255,0.2)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onMouseEnter={(e) => {
                        if (!replanning) {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.05)";
                        } else {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={replanning}
                        onChange={(e) => setReplanning(e.target.checked)}
                        style={{
                          accentColor: "#FF6B35",
                          transform: "scale(1.2)",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: isMobile ? "14px" : "16px",
                            color: replanning
                              ? "#FFD700"
                              : "rgba(255,255,255,0.9)",
                            fontWeight: replanning ? "600" : "400",
                          }}
                        >
                          Перепланировка
                        </span>
                        <span
                          style={{
                            fontSize: isMobile ? "12px" : "14px",
                            color: "rgba(255,255,255,0.6)",
                            marginLeft: "-5px",
                          }}
                        >
                          +1500₽/м²
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Площадь */}
                  <div style={{ width: "100%" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: isMobile ? "14px" : "16px",
                        fontWeight: "600",
                        color: "rgba(255,255,255,0.9)",
                        marginBottom: "8px",
                      }}
                    >
                      Площадь (м²)
                    </label>
                    <div
                      style={{
                        width: "100%",
                        padding: isMobile ? "8px 12px" : "10px 16px",
                        fontSize: isMobile ? "24px" : "32px",
                        fontWeight: "700",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "12px",
                        color: "#FFFFFF",
                        textAlign: "center",
                        marginBottom: "16px",
                        boxSizing: "border-box",
                      }}
                    >
                      {formatNumber(area)}
                    </div>
                    <input
                      ref={areaInputRef}
                      type="range"
                      value={area}
                      min={AREA_MIN}
                      max={AREA_MAX}
                      step={1}
                      onInput={(e) => handleAreaChange(e.target.valueAsNumber)}
                      onChange={(e) => handleAreaChange(e.target.valueAsNumber)}
                      onTouchMove={(e) =>
                        handleAreaChange(e.target.valueAsNumber)
                      }
                      onTouchStart={(e) =>
                        handleAreaChange(e.target.valueAsNumber)
                      }
                      onPointerMove={(e) => {
                        if (e.buttons === 1) {
                          handleAreaChange(e.target.valueAsNumber);
                        }
                      }}
                      onPointerDown={(e) =>
                        handleAreaChange(e.target.valueAsNumber)
                      }
                      style={{
                        width: "100%",
                        accentColor: "#FF6B35",
                        touchAction: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Правая часть - результат и форма */}
              <div>
                {/* Результат расчета */}
                <div
                  style={{
                    backgroundColor: "transparent",
                    paddingLeft: isMobile ? "20px" : "24px",
                    paddingRight: isMobile ? "20px" : "24px",
                    paddingTop: isMobile ? "20px" : "24px",
                    paddingBottom: isMobile ? "20px" : "24px",
                    marginBottom: "24px",
                    marginLeft: "25px",
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "16px" : "18px",
                      fontWeight: "600",
                      color: "#FFFFFF",
                      margin: "0 0 12px 0",
                    }}
                  >
                    Примерная стоимость
                  </h3>

                  {total > 0 ? (
                    <>
                      <div
                        style={{
                          fontSize: isMobile ? "28px" : "36px",
                          fontWeight: "800",
                          color: "#ffffff",
                          margin: "0 0 8px 0",
                        }}
                      >
                        {formatNumber(total)}{" "}
                        <span style={{ color: "#FFD700" }}>₽</span>
                      </div>
                      <div
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          color: "rgba(255,255,255,0.8)",
                          margin: "0",
                        }}
                      >
                        (≈ {formatNumber(perSquare)} ₽ за м²)
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        fontSize: isMobile ? "16px" : "18px",
                        color: "rgba(255,255,255,0.6)",
                        margin: "0",
                      }}
                    >
                      Введите площадь для расчета
                    </div>
                  )}

                  <p
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      color: "rgba(255,255,255,0.7)",
                      margin: "12px 0 0 0",
                      fontStyle: "italic",
                    }}
                  >
                    Цена предварительная, точный расчёт уточнит специалист.
                  </p>
                </div>

                {/* Форма и отправка удалены по требованию — оставляем только блок "Примерная стоимость" */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RepairCalculator;
