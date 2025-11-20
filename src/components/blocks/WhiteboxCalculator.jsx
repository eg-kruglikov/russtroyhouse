import React, { useState, useRef } from "react";
import { ymGoal } from "../../utils/metrika";
import { SECTION_BACKGROUND } from "../../utils/spacing";

// CSS для кастомных checkbox и input
const calculatorStyles = `
  .whitebox-calculator input[type="checkbox"] {
    outline: none;
  }
  
  .whitebox-calculator input[type="checkbox"]:focus,
  .whitebox-calculator input[type="checkbox"]:active {
    outline: none;
    box-shadow: none;
  }
  
  .whitebox-calculator input[type="number"]:focus,
  .whitebox-calculator input[type="number"]:active {
    outline: none;
  }
  
  .whitebox-calculator label {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }
  
  .whitebox-calculator label:active {
    background-color: transparent !important;
  }
`;

const WhiteboxCalculator = ({ isMobile }) => {
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

  // Состояние калькулятора
  const [area, setArea] = useState(50);
  const [materialQuality, setMaterialQuality] = useState("standard");
  const [electricalPoints, setElectricalPoints] = useState(10);
  const [electricalPanel, setElectricalPanel] = useState("12");
  const [plumbingPoints, setPlumbingPoints] = useState(3);
  const [warmFloor, setWarmFloor] = useState(false);
  const [warmFloorArea, setWarmFloorArea] = useState(0);
  const [designerRepair, setDesignerRepair] = useState(false);
  const [heatingSystem, setHeatingSystem] = useState(false);
  const [ventilation, setVentilation] = useState(false);
  const [kitchenPoints, setKitchenPoints] = useState(3);

  // Состояние формы
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("call");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const materialOptions = [
    { value: "standard", label: "Стандарт" },
    { value: "comfort", label: "Комфорт" },
    { value: "premium", label: "Премиум" },
  ];

  const electricalPanelOptions = [
    { value: "12", label: "12 модулей" },
    { value: "24", label: "24 модуля" },
    { value: "36", label: "36 модулей" },
  ];

  // Расчет стоимости
  const calculatePrice = () => {
    if (!area || area <= 0) return { total: 0, perSquare: 0 };

    // Базовая цена white box (руб/м²)
    const basePrice = 8700;

    // Множители качества материалов
    const qualityMultipliers = {
      standard: 1,
      comfort: 1.25,
      premium: 1.5,
    };

    // Стоимость дополнительных опций
    let additionalCost = 0;

    // Электрика: базовая стоимость + дополнительные точки
    const baseElectricalPoints = 8; // базовое количество точек
    if (electricalPoints > baseElectricalPoints) {
      const extraPoints = electricalPoints - baseElectricalPoints;
      additionalCost += extraPoints * 350; // 350₽ за дополнительную точку
    }

    // Электрощит
    const panelCosts = {
      "12": 0, // базовый
      "24": 1000,
      "36": 2000,
    };
    additionalCost += panelCosts[electricalPanel] || 0;

    // Сантехника: базовая стоимость + дополнительные точки
    const basePlumbingPoints = 2; // базовое количество точек
    if (plumbingPoints > basePlumbingPoints) {
      const extraPoints = plumbingPoints - basePlumbingPoints;
      additionalCost += extraPoints * 4500; // 4500₽ за дополнительную точку
    }

    // Теплый пол
    if (warmFloor && warmFloorArea > 0) {
      additionalCost += warmFloorArea * 800; // 800₽/м² за теплый пол
    }

    // Под дизайнерский ремонт (+15% к базе)
    if (designerRepair) {
      additionalCost += basePrice * area * 0.15;
    }

    // Система отопления
    if (heatingSystem) {
      additionalCost += 15000; // фиксированная стоимость
    }

    // Вентиляция
    if (ventilation) {
      additionalCost += 20000; // фиксированная стоимость
    }

    // Кухня: дополнительные точки
    const baseKitchenPoints = 2;
    if (kitchenPoints > baseKitchenPoints) {
      const extraPoints = kitchenPoints - baseKitchenPoints;
      additionalCost += extraPoints * 2000; // 2000₽ за дополнительную точку на кухне
    }

    const qualityMultiplier = qualityMultipliers[materialQuality];
    const baseTotal = Math.round(basePrice * area * qualityMultiplier);
    const totalPrice = Math.round(baseTotal + additionalCost);
    const pricePerSquare = Math.round(totalPrice / area);

    // Расчет сроков ремонта (дни)
    const baseTimePerSquare = 1.5; // 1.5 дня за м² для white box
    let totalDays = Math.round(baseTimePerSquare * area);

    // Добавляем время на дополнительные работы
    if (warmFloor) totalDays += 3;
    if (heatingSystem) totalDays += 5;
    if (ventilation) totalDays += 4;
    if (designerRepair) totalDays += Math.round(area * 0.2);

    const minDays = Math.max(totalDays * 0.8, 7);
    const maxDays = Math.max(totalDays * 1.2, minDays + 3);

    return {
      total: totalPrice,
      perSquare: pricePerSquare,
      timeRange: { min: Math.round(minDays), max: Math.round(maxDays) },
    };
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

    const qualityNames = {
      standard: "Стандарт",
      comfort: "Комфорт",
      premium: "Премиум",
    };

    const panelNames = {
      "12": "12 модулей",
      "24": "24 модуля",
      "36": "36 модулей",
    };

    const contactMethodNames = {
      call: "Перезвоните",
      whatsapp: "Пришлите в WhatsApp",
      telegram: "Пришлите в Telegram",
    };

    const additionalOptions = [];
    if (warmFloor) {
      additionalOptions.push(`Теплый пол: ${warmFloorArea} м²`);
    }
    if (designerRepair) {
      additionalOptions.push("Под дизайнерский ремонт: Да");
    }
    if (heatingSystem) {
      additionalOptions.push("Система отопления: Да");
    }
    if (ventilation) {
      additionalOptions.push("Вентиляция: Да");
    }

    const additionalText =
      additionalOptions.length > 0
        ? `\n📋 Дополнительно:\n${additionalOptions.join("\n")}`
        : "";

    const now = new Date().toLocaleString("ru-RU");
    const message = `🧮 Новая заявка с калькулятора White Box:\n\n📱 Телефон: ${phone}\n📐 Площадь: ${area} м²\n⭐ Качество материалов: ${
      qualityNames[materialQuality]
    }\n⚡ Электрика: ${electricalPoints} точек, щит ${panelNames[electricalPanel]}\n🚿 Сантехника: ${plumbingPoints} точек\n🍳 Кухня: ${kitchenPoints} точек${additionalText}\n💰 Расчетная стоимость: ${total.toLocaleString()} ₽ (${perSquare.toLocaleString()} ₽/м²)\n⏱️ Сроки: ${
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

      ymGoal("whitebox_calculator_form_sent");
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

  const headerStyle = {
    fontSize: isMobile ? "18px" : "22px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    display: "flex",
    alignItems: "flex-end",
    minHeight: isMobile ? "44px" : "58px",
    margin: 0,
  };

  const separatorStyle = {
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.1)",
    margin: "8px 0 12px",
  };

  const rowGridStyle = {
    display: "grid",
    gridTemplateColumns: `${isMobile ? 18 : 20}px 1fr`,
    alignItems: "center",
    columnGap: isMobile ? "10px" : "12px",
    padding: "4px 0",
  };

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
        gridTemplateRows: `auto auto repeat(${totalRows}, auto)`,
        rowGap: "8px",
        alignContent: "start",
      }}
    >
      <div style={headerStyle}>{title}</div>
      <div style={separatorStyle} />
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
        <div key={`${title}-spacer-${idx}`} style={{ height: "30px" }} />
      ))}
    </div>
  );

  const renderNumberInput = (label, value, onChange, min = 0, max = 100) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <label
        style={{
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: "600",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const num = parseInt(e.target.value) || 0;
          onChange(Math.min(Math.max(num, min), max));
        }}
        min={min}
        max={max}
        style={{
          width: "100%",
          padding: isMobile ? "8px 12px" : "10px 16px",
          fontSize: isMobile ? "16px" : "18px",
          fontWeight: "600",
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "8px",
          color: "#FFFFFF",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      />
    </div>
  );

  const renderCheckbox = (label, checked, onChange, description) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        padding: isMobile ? "12px 14px" : "14px 16px",
        borderRadius: "10px",
        backgroundColor: "transparent",
        border: checked
          ? "1px solid #FF6B35"
          : "1px solid rgba(255,255,255,0.25)",
        transition: "all 0.2s ease",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "transparent";
      }}
      onMouseEnter={(e) => {
        if (!checked) {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
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
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          accentColor: "#FF6B35",
          transform: "scale(1.1)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: isMobile ? "14px" : "16px",
            color: checked ? "#FFD700" : "rgba(255,255,255,0.9)",
            fontWeight: checked ? "600" : "400",
          }}
        >
          {label}
        </span>
        {description && (
          <span
            style={{
              fontSize: isMobile ? "12px" : "13px",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {description}
          </span>
        )}
      </div>
    </label>
  );

  const maxOptionRows = Math.max(
    materialOptions.length,
    electricalPanelOptions.length
  );

  return (
    <>
      <style>{calculatorStyles}</style>
      <section
        className="whitebox-calculator"
        style={{
          width: "100%",
          backgroundColor: SECTION_BACKGROUND,
          paddingTop: isMobile ? "20px" : "40px",
          paddingBottom: isMobile ? "10px" : "20px",
          marginTop: "0",
          position: "relative",
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
              Калькулятор White Box
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
              Рассчитайте стоимость черновой отделки с учетом всех параметров
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
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "24px" : "32px",
              }}
            >
              {/* Площадь и качество материалов */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(2, minmax(0, 1fr))",
                  columnGap: isMobile ? "0" : "24px",
                  rowGap: isMobile ? "20px" : "28px",
                  alignItems: "start",
                }}
              >
                {renderOptionColumn(
                  "Качество материалов",
                  materialOptions,
                  materialQuality,
                  setMaterialQuality,
                  maxOptionRows
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                    style={{
                      width: "100%",
                      accentColor: "#FF6B35",
                      touchAction: "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  />
                </div>
              </div>

              {/* Электрика */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(2, minmax(0, 1fr))",
                  columnGap: isMobile ? "0" : "24px",
                  rowGap: isMobile ? "16px" : "20px",
                }}
              >
                {renderNumberInput(
                  "Количество точек электрики",
                  electricalPoints,
                  setElectricalPoints,
                  5,
                  50
                )}
                {renderOptionColumn(
                  "Электрощит",
                  electricalPanelOptions,
                  electricalPanel,
                  setElectricalPanel,
                  maxOptionRows
                )}
              </div>

              {/* Сантехника и кухня */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(2, minmax(0, 1fr))",
                  columnGap: isMobile ? "0" : "24px",
                  rowGap: isMobile ? "16px" : "20px",
                }}
              >
                {renderNumberInput(
                  "Количество точек сантехники",
                  plumbingPoints,
                  setPlumbingPoints,
                  1,
                  20
                )}
                {renderNumberInput(
                  "Точки на кухне",
                  kitchenPoints,
                  setKitchenPoints,
                  1,
                  15
                )}
              </div>

              {/* Дополнительные опции */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "16px" : "20px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    columnGap: isMobile ? "0" : "24px",
                    rowGap: isMobile ? "16px" : "20px",
                  }}
                >
                  {renderCheckbox(
                    "Теплый пол",
                    warmFloor,
                    setWarmFloor,
                    "800₽/м²"
                  )}
                  {renderCheckbox(
                    "Под дизайнерский ремонт",
                    designerRepair,
                    setDesignerRepair,
                    "+15% к стоимости"
                  )}
                  {renderCheckbox(
                    "Система отопления",
                    heatingSystem,
                    setHeatingSystem,
                    "+15 000₽"
                  )}
                  {renderCheckbox(
                    "Вентиляция",
                    ventilation,
                    setVentilation,
                    "+20 000₽"
                  )}
                </div>
                {warmFloor && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr"
                        : "repeat(2, minmax(0, 1fr))",
                      columnGap: isMobile ? "0" : "24px",
                    }}
                  >
                    {renderNumberInput(
                      "Площадь теплого пола (м²)",
                      warmFloorArea,
                      (val) => setWarmFloorArea(Math.min(val, area)),
                      0,
                      area
                    )}
                  </div>
                )}
              </div>

              {/* Результат расчета */}
              <div
                style={{
                  marginTop: isMobile ? "24px" : "36px",
                  backgroundColor: "transparent",
                  textAlign: "left",
                  padding: isMobile ? "0" : "0 4px",
                }}
              >
                <h3
                  style={{
                    fontSize: isMobile ? "18px" : "22px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    margin: "0 0 14px 0",
                  }}
                >
                  Примерная стоимость
                </h3>

                {total > 0 ? (
                  <>
                    <div
                      style={{
                        fontSize: isMobile ? "32px" : "48px",
                        fontWeight: "800",
                        color: "#ffffff",
                        margin: "0 0 10px 0",
                      }}
                    >
                      {formatNumber(total)}{" "}
                      <span style={{ color: "#FFD700" }}>₽</span>
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "16px" : "20px",
                        color: "rgba(255,255,255,0.85)",
                        margin: "0",
                      }}
                    >
                      (≈ {formatNumber(perSquare)} ₽ за м²)
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      fontSize: isMobile ? "18px" : "20px",
                      color: "rgba(255,255,255,0.7)",
                      margin: "0",
                    }}
                  >
                    Введите площадь для расчета
                  </div>
                )}

                <p
                  style={{
                    fontSize: isMobile ? "13px" : "16px",
                    color: "rgba(255,255,255,0.75)",
                    margin: "14px 0 0 0",
                    fontStyle: "italic",
                    maxWidth: isMobile ? "100%" : "520px",
                  }}
                >
                  Цена предварительная, точный расчёт уточнит специалист.
                </p>
              </div>

              {/* Форма обратной связи */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        gap: "16px",
                      }}
                    >
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        required
                        style={{
                          flex: 1,
                          padding: isMobile ? "12px 16px" : "14px 18px",
                          fontSize: isMobile ? "16px" : "18px",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "12px",
                          color: "#FFFFFF",
                          boxSizing: "border-box",
                        }}
                      />
                      <select
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                        style={{
                          padding: isMobile ? "12px 16px" : "14px 18px",
                          fontSize: isMobile ? "16px" : "18px",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "12px",
                          color: "#FFFFFF",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="call">Перезвоните</option>
                        <option value="whatsapp">Пришлите в WhatsApp</option>
                        <option value="telegram">Пришлите в Telegram</option>
                      </select>
                    </div>
                    {error && (
                      <div
                        style={{
                          color: "#ff4444",
                          fontSize: isMobile ? "14px" : "16px",
                        }}
                      >
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        padding: isMobile ? "14px 24px" : "16px 32px",
                        fontSize: isMobile ? "16px" : "18px",
                        fontWeight: "700",
                        backgroundColor: "#FF6B35",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "12px",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.6 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {isLoading ? "Отправка..." : "Получить расчет"}
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  style={{
                    padding: isMobile ? "20px" : "24px",
                    backgroundColor: "rgba(255,215,0,0.1)",
                    border: "1px solid rgba(255,215,0,0.3)",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "18px" : "20px",
                      fontWeight: "600",
                      color: "#FFD700",
                      marginBottom: "8px",
                    }}
                  >
                    Спасибо!
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "14px" : "16px",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    Мы свяжемся с вами в ближайшее время
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhiteboxCalculator;

