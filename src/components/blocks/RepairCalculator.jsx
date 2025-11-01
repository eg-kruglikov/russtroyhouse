import React, { useState, useEffect } from "react";
import { usePressEffect } from "../../hooks/useSomething";
import { ymGoal } from "../../utils/metrika";

const RepairCalculator = ({ isMobile }) => {
  const press = usePressEffect();

  // Состояние калькулятора
  const [repairType, setRepairType] = useState("cosmetic");
  const [roomCount, setRoomCount] = useState("studio");
  const [area, setArea] = useState("");
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
    const basePrices = {
      cosmetic: 4500, // обновлено по конкурентам
      capital: 9900, // обновлено по конкурентам
      designer: 17900, // обновлено по конкурентам
      whitebox: 11900, // белый бокс по конкурентам
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
      2: 1.1,
      3: 1.2,
      "4+": 1.3,
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
    <section
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #1a2a3a 0%, #2a3a4a 100%)",
        padding: isMobile ? "50px 0" : "80px 0",
        marginTop: "0",
        position: "relative",
        borderTop: isMobile ? "3px solid #FFD700" : "4px solid #FFD700",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: isMobile ? "92%" : "90%",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "24px" : "32px",
        }}
      >
        {/* Заголовок */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: isMobile ? "24px" : "42px",
              fontWeight: "800",
              color: "#ffffff",
              margin: "0 0 16px 0",
              lineHeight: isMobile ? 1.3 : 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            Примерный расчет стоимости вашего ремонта
          </h2>
          <p
            style={{
              fontSize: isMobile ? "14px" : "18px",
              fontWeight: "400",
              color: "rgba(255,255,255,0.85)",
              margin: "0",
              lineHeight: 1.5,
              maxWidth: isMobile ? "100%" : "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Узнайте примерный бюджет за 30 секунд — без звонков и анкет
          </p>
        </div>

        {/* Основной контейнер калькулятора */}
        <div
          style={{
            backgroundColor: "#0f2431",
            borderRadius: "20px",
            padding: isMobile ? "24px" : "32px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
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
              <h3
                style={{
                  fontSize: isMobile ? "18px" : "24px",
                  fontWeight: "700",
                  color: "#ffffff",
                  margin: "0 0 20px 0",
                }}
              >
                Параметры ремонта
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Тип ремонта */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.9)",
                      marginBottom: "8px",
                    }}
                  >
                    Тип ремонта
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {[
                      { value: "cosmetic", label: "Косметический" },
                      { value: "capital", label: "Капитальный" },
                      { value: "whitebox", label: "Белый бокс" },
                      { value: "designer", label: "Дизайнерский" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          cursor: "pointer",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          backgroundColor:
                            repairType === option.value
                              ? "rgba(255, 215, 0, 0.1)"
                              : "transparent",
                          border:
                            repairType === option.value
                              ? "1px solid #FFD700"
                              : "1px solid rgba(255,255,255,0.2)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (repairType !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "rgba(255,255,255,0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (repairType !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="repairType"
                          value={option.value}
                          checked={repairType === option.value}
                          onChange={(e) => setRepairType(e.target.value)}
                          style={{
                            accentColor: "#FFD700",
                            transform: "scale(1.2)",
                          }}
                        />
                        <span
                          style={{
                            fontSize: isMobile ? "14px" : "16px",
                            color:
                              repairType === option.value
                                ? "#FFFFFF"
                                : "rgba(255,255,255,0.9)",
                            fontWeight:
                              repairType === option.value ? "600" : "400",
                          }}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Количество комнат */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.9)",
                      marginBottom: "8px",
                    }}
                  >
                    Количество комнат
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "8px",
                    }}
                  >
                    {[
                      { value: "studio", label: "Студия" },
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                      { value: "4+", label: "4+" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          padding: "12px 8px",
                          borderRadius: "8px",
                          backgroundColor:
                            roomCount === option.value
                              ? "rgba(255, 215, 0, 0.1)"
                              : "transparent",
                          border:
                            roomCount === option.value
                              ? "1px solid #FFD700"
                              : "1px solid rgba(255,255,255,0.2)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (roomCount !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "rgba(255,255,255,0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (roomCount !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="roomCount"
                          value={option.value}
                          checked={roomCount === option.value}
                          onChange={(e) => setRoomCount(e.target.value)}
                          style={{
                            accentColor: "#FFD700",
                            transform: "scale(1.2)",
                            marginRight: "8px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: isMobile ? "14px" : "16px",
                            color:
                              roomCount === option.value
                                ? "#FFFFFF"
                                : "rgba(255,255,255,0.9)",
                            fontWeight:
                              roomCount === option.value ? "600" : "400",
                          }}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
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
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Введите площадь"
                    min="1"
                    max="1000"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: isMobile ? "16px" : "18px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      color: "#ffffff",
                      outline: "none",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#FFD700";
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.2)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.05)";
                    }}
                  />
                </div>

                {/* Качество материалов */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.9)",
                      marginBottom: "8px",
                    }}
                  >
                    Качество материалов
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {[
                      { value: "standard", label: "Стандарт" },
                      { value: "comfort", label: "Комфорт" },
                      { value: "premium", label: "Премиум" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          cursor: "pointer",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          backgroundColor:
                            materialQuality === option.value
                              ? "rgba(255, 215, 0, 0.1)"
                              : "transparent",
                          border:
                            materialQuality === option.value
                              ? "1px solid #FFD700"
                              : "1px solid rgba(255,255,255,0.2)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (materialQuality !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "rgba(255,255,255,0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (materialQuality !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="materialQuality"
                          value={option.value}
                          checked={materialQuality === option.value}
                          onChange={(e) => setMaterialQuality(e.target.value)}
                          style={{
                            accentColor: "#FFD700",
                            transform: "scale(1.2)",
                          }}
                        />
                        <span
                          style={{
                            fontSize: isMobile ? "14px" : "16px",
                            color:
                              materialQuality === option.value
                                ? "#FFFFFF"
                                : "rgba(255,255,255,0.9)",
                            fontWeight:
                              materialQuality === option.value ? "600" : "400",
                          }}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Тип помещения */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.9)",
                      marginBottom: "8px",
                    }}
                  >
                    Тип помещения
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {[
                      {
                        value: "newbuilding",
                        label: "Новостройка",
                        desc: "Бетонная коробка",
                      },
                      {
                        value: "secondary",
                        label: "Вторичка",
                        desc: "Старые коммуникации",
                      },
                      {
                        value: "apartments",
                        label: "Апартаменты",
                        desc: "Элитное жилье",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          cursor: "pointer",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          backgroundColor:
                            premisesType === option.value
                              ? "rgba(255, 215, 0, 0.1)"
                              : "transparent",
                          border:
                            premisesType === option.value
                              ? "1px solid #FFD700"
                              : "1px solid rgba(255,255,255,0.2)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (premisesType !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "rgba(255,255,255,0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (premisesType !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="premisesType"
                          value={option.value}
                          checked={premisesType === option.value}
                          onChange={(e) => setPremisesType(e.target.value)}
                          style={{
                            accentColor: "#FFD700",
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
                              color:
                                premisesType === option.value
                                  ? "#FFFFFF"
                                  : "rgba(255,255,255,0.9)",
                              fontWeight:
                                premisesType === option.value ? "600" : "400",
                            }}
                          >
                            {option.label}
                          </span>
                          <span
                            style={{
                              fontSize: isMobile ? "12px" : "14px",
                              color: "rgba(255,255,255,0.6)",
                            }}
                          >
                            {option.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
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
                      backgroundColor: replanning
                        ? "rgba(255, 215, 0, 0.1)"
                        : "transparent",
                      border: replanning
                        ? "1px solid #FFD700"
                        : "1px solid rgba(255,255,255,0.2)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!replanning) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!replanning) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={replanning}
                      onChange={(e) => setReplanning(e.target.checked)}
                      style={{
                        accentColor: "#FFD700",
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
                        }}
                      >
                        +1500₽/м²
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Правая часть - результат и форма */}
            <div>
              {/* Результат расчета */}
              <div
                style={{
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                  border: "1px solid #FFD700",
                  borderRadius: "16px",
                  padding: isMobile ? "20px" : "24px",
                  marginBottom: "24px",
                  textAlign: "center",
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
                      {formatNumber(total)} ₽
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        color: "rgba(255,255,255,0.8)",
                        margin: "0 0 12px 0",
                      }}
                    >
                      (≈ {formatNumber(perSquare)} ₽ за м²)
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        color: "#FFD700",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      ⏱️ Сроки: {timeRange.min}-{timeRange.max} дней
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
  );
};

export default RepairCalculator;
