import React, { useState } from "react";
import YellowBorderButton from "./YellowBorderButton";

const ROOM_TYPES = [
  {
    value: "room",
    label: "Комната / спальня / гостиная",
    shortLabel: "Комната",
    accent: "#70D6FF",
  },
  {
    value: "kitchen",
    label: "Кухня",
    shortLabel: "Кухня",
    accent: "#FFB347",
  },
  {
    value: "combinedBathroom",
    label: "Санузел совмещённый",
    shortLabel: "Санузел",
    accent: "#FF6B35",
  },
  {
    value: "toilet",
    label: "Туалет",
    shortLabel: "Туалет",
    accent: "#FFA84C",
  },
  {
    value: "bathroom",
    label: "Ванная комната",
    shortLabel: "Ванная",
    accent: "#C285FF",
  },
  {
    value: "corridor",
    label: "Коридор",
    shortLabel: "Коридор",
    accent: "#5DE5A4",
  },
  {
    value: "wardrobe",
    label: "Гардеробная",
    shortLabel: "Гардероб",
    accent: "#FFD700",
  },
  {
    value: "commercial",
    label: "Коммерческое помещение",
    shortLabel: "Коммерция",
    accent: "#FF6B35",
  },
];

const MATERIAL_QUALITY_OPTIONS = [
  { value: "standard", label: "Стандарт" },
  { value: "comfort", label: "Комфорт" },
  { value: "premium", label: "Премиум" },
];

const CEILING_OPTIONS = [
  { value: "stretch", label: "Натяжные" },
  { value: "drywall", label: "Гипсокартон" },
  { value: "none", label: "Нет" },
];

const FLOOR_OPTIONS = [
  { value: "screed", label: "Стяжка" },
  { value: "insulation", label: "Утепление" },
];

const SANITARY_QUALITY_OPTIONS = [
  { value: "budget", label: "Бюджет" },
  { value: "average", label: "Средняя" },
  { value: "premium", label: "Премиум" },
];

const BATH_OPTIONS = [
  { value: "bathtub", label: "Ванна" },
  { value: "shower", label: "Душевой уголок" },
  { value: "jacuzzi", label: "Джакузи" },
];

const FIELD_LIBRARY = {
  area: { label: "Площадь", type: "number", unit: "м²", min: 4, max: 200, step: 1 },
  materialQuality: {
    label: "Качество материалов",
    type: "select",
    options: MATERIAL_QUALITY_OPTIONS,
  },
  electricalPoints: {
    label: "Количество розеток",
    type: "number",
    unit: "шт.",
    min: 0,
    max: 40,
    step: 1,
  },
  ceiling: { label: "Потолки", type: "select", options: CEILING_OPTIONS },
  wallLeveling: { label: "Выравнивание стен", type: "toggle" },
  partitions: {
    label: "Перегородки",
    type: "number",
    unit: "м²",
    min: 0,
    max: 150,
    step: 1,
  },
  floorBase: { label: "Напольное покрытие", type: "select", options: FLOOR_OPTIONS },
  wetPoints: { label: "Мокрые точки", type: "number", min: 0, max: 8, step: 1 },
  hoodOutlet: { label: "Вывод под вытяжку", type: "toggle" },
  condRoute: { label: "Трасса под кондиционер", type: "toggle" },
  pipeReplacement: { label: "Замена труб", type: "toggle" },
  pipeRelocation: { label: "Перенос труб", type: "toggle" },
  waterproofing: { label: "Гидроизоляция", type: "toggle" },
  sanitaryQuality: {
    label: "Тип сантехники",
    type: "select",
    options: SANITARY_QUALITY_OPTIONS,
  },
  bathOption: {
    label: "Душевая / ванна / джакузи",
    type: "select",
    options: BATH_OPTIONS,
  },
  lighting: { label: "Подсветка", type: "toggle" },
  towelDryer: { label: "Полотенцесушитель", type: "toggle" },
  electricSockets: {
    label: "Розетки (электрика)",
    type: "number",
    unit: "шт.",
    min: 0,
    max: 12,
    step: 1,
  },
  enhancedElectrical: { label: "Усиленная электрика", type: "toggle" },
  fireAlarm: { label: "Пожарная сигнализация", type: "toggle" },
  noiseIsolation: { label: "Шумоизоляция", type: "toggle" },
  demolition: { label: "Демонтаж", type: "toggle" },
  demolitionFloor: { label: "Демонтаж пола / покрытия", type: "toggle" },
  demolitionWalls: { label: "Демонтаж стен / перегородок", type: "toggle" },
  demolitionSanitary: { label: "Демонтаж сантехники", type: "toggle" },
  demolitionToilet: { label: "Демонтаж унитаза / инсталляции", type: "toggle" },
};

const roomTypeFields = {
  room: [
    "area",
    "materialQuality",
    "electricalPoints",
    "electricSockets",
    "ceiling",
    "wallLeveling",
    "partitions",
    "floorBase",
    "demolition",
    "demolitionFloor",
    "demolitionWalls",
  ],
  kitchen: [
    "area",
    "materialQuality",
    "electricalPoints",
    "electricSockets",
    "ceiling",
    "wallLeveling",
    "floorBase",
    "wetPoints",
    "hoodOutlet",
    "condRoute",
    "demolition",
    "demolitionFloor",
    "demolitionWalls",
  ],
  combinedBathroom: [
    "area",
    "materialQuality",
    "wetPoints",
    "waterproofing",
    "pipeReplacement",
    "sanitaryQuality",
    "bathOption",
    "lighting",
    "towelDryer",
    "electricSockets",
    "demolition",
    "demolitionSanitary",
    "demolitionToilet",
  ],
  toilet: [
    "area",
    "materialQuality",
    "wetPoints",
    "waterproofing",
    "pipeReplacement",
    "demolition",
    "demolitionSanitary",
    "demolitionToilet",
    "electricSockets",
  ],
  bathroom: [
    "area",
    "materialQuality",
    "wetPoints",
    "waterproofing",
    "pipeReplacement",
    "sanitaryQuality",
    "bathOption",
    "lighting",
    "towelDryer",
    "electricSockets",
    "demolition",
    "demolitionSanitary",
    "demolitionToilet",
  ],
  corridor: [
    "area",
    "materialQuality",
    "electricalPoints",
    "electricSockets",
    "ceiling",
    "wallLeveling",
    "floorBase",
  ],
  wardrobe: [
    "area",
    "materialQuality",
    "electricSockets",
    "floorBase",
  ],
  commercial: [
    "area",
    "materialQuality",
    "electricalPoints",
    "electricSockets",
    "ceiling",
    "wallLeveling",
    "partitions",
    "floorBase",
    "wetPoints",
    "waterproofing",
    "hoodOutlet",
    "condRoute",
    "pipeReplacement",
    "pipeRelocation",
    "sanitaryQuality",
    "bathOption",
    "lighting",
    "towelDryer",
    "enhancedElectrical",
    "fireAlarm",
    "noiseIsolation",
    "demolition",
    "demolitionFloor",
    "demolitionWalls",
    "demolitionSanitary",
    "demolitionToilet",
  ],
};

const filterCalculationItems = (roomType, items) => {
  const allowed = new Set(roomTypeFields[roomType] ?? []);
  return items.filter((item) => !item.fieldKey || allowed.has(item.fieldKey));
};

const DEFAULT_CARD_VALUES = {
  area: 18,
  materialQuality: "standard",
  electricalPoints: 6,
  ceiling: "stretch",
  wallLeveling: true,
  partitions: 0,
  floorBase: "screed",
  wetPoints: 0,
  hoodOutlet: false,
  condRoute: false,
  pipeReplacement: false,
  pipeRelocation: false,
  waterproofing: false,
  sanitaryQuality: "budget",
  bathOption: "bathtub",
  lighting: false,
  towelDryer: false,
  electricSockets: 2,
  enhancedElectrical: false,
  fireAlarm: false,
  noiseIsolation: false,
  demolition: false,
  demolitionFloor: false,
  demolitionWalls: false,
  demolitionSanitary: false,
  demolitionToilet: false,
};

const TYPE_DEFAULT_OVERRIDES = {
  room: {
    wetPoints: 0,
    hoodOutlet: false,
    condRoute: false,
    waterproofing: false,
    lighting: false,
    towelDryer: false,
    sanitaryQuality: "budget",
    electricSockets: 2,
  },
  kitchen: {
    wetPoints: 1,
    hoodOutlet: true,
    condRoute: false,
    waterproofing: false,
    pipeReplacement: false,
    pipeRelocation: false,
    lighting: false,
    towelDryer: false,
    sanitaryQuality: "budget",
    electricSockets: 2,
  },
  combinedBathroom: {
    wetPoints: 1,
    waterproofing: true,
    pipeReplacement: true,
    sanitaryQuality: "average",
    bathOption: "bathtub",
    lighting: true,
    towelDryer: true,
    electricSockets: 2,
  },
  bathroom: {
    wetPoints: 1,
    waterproofing: true,
    pipeReplacement: true,
    sanitaryQuality: "average",
    bathOption: "bathtub",
    lighting: true,
    towelDryer: true,
    electricSockets: 2,
  },
  toilet: {
    wetPoints: 1,
    waterproofing: true,
    pipeReplacement: true,
    sanitaryQuality: "budget",
    lighting: false,
    towelDryer: false,
    electricSockets: 1,
  },
  corridor: {
    electricSockets: 2,
    wetPoints: 0,
    hoodOutlet: false,
    waterproofing: false,
  },
  wardrobe: {
    electricSockets: 1,
    wetPoints: 0,
    hoodOutlet: false,
    waterproofing: false,
  },
  commercial: {
    wetPoints: 1,
    hoodOutlet: true,
    condRoute: false,
    waterproofing: true,
    pipeReplacement: true,
    pipeRelocation: true,
    sanitaryQuality: "average",
    bathOption: "shower",
    lighting: true,
    towelDryer: false,
    enhancedElectrical: false,
    fireAlarm: false,
    noiseIsolation: false,
    electricSockets: 4,
  },
};

const QUALITY_MULTIPLIERS = {
  standard: 1,
  comfort: 1.25,
  premium: 1.55,
};

const TYPE_MULTIPLIERS = {
  room: 1,
  kitchen: 1.15,
  combinedBathroom: 1.3,
  toilet: 1.05,
  bathroom: 1.35,
  corridor: 0.9,
  wardrobe: 0.85,
  commercial: 1.25,
};

const COMMERCIAL_ADDITIONAL_RATES = {
  enhancedElectrical: 7800,
  fireAlarm: 5200,
  noiseIsolation: 180,
};

const DEMOLITION_RATES = {
  general: 220,
  floor: 200,
  walls: 250,
  sanitary: 4500,
  toilet: 3200,
};

const USAGE_STEPS = [
  "Добавляйте помещения — каждая карточка отражает отдельный объект.",
  "Для разных типов выбирайте нужные параметры (комната, кухня, санузел и т. п.).",
  "Карточки дублируются, перемещаются и переименовываются, чтобы вы чувствовали контроль.",
  "Внутренние расчёты выполняются автоматически — штукатурка, электрика, сантехника, гидроизоляция, демонтаж и кабели.",
  "Внизу видна итоговая сумма по всем карточкам.",
];

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `room-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
};

const getTypeEntry = (type) => ROOM_TYPES.find((entry) => entry.value === type) ?? ROOM_TYPES[0];

const getTypeShortLabel = (type) => getTypeEntry(type).shortLabel || "Помещение";

const getDefaultDraft = (type, existingCards = []) => {
  const shortLabel = getTypeShortLabel(type);
  const count = (existingCards.filter((card) => card.type === type).length || 0) + 1;
  const typeOverrides = TYPE_DEFAULT_OVERRIDES[type] ?? {};
  return {
    ...DEFAULT_CARD_VALUES,
    ...typeOverrides,
    type,
    name: `${shortLabel} ${count}`,
  };
};

const createCardFromDraft = (draft) => ({
  id: generateId(),
  ...draft,
});

const formatNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) ? value.toLocaleString("ru-RU") : "0";

const getOptionLabel = (fieldKey, value) => {
  const config = FIELD_LIBRARY[fieldKey];
  if (!config || !Array.isArray(config.options)) {
    return value ?? "-";
  }
  const match = config.options.find((option) => option.value === value);
  return match ? match.label : value ?? "-";
};

const calculateCardPrice = (card) => {
  const area = Math.max(Math.round(card.area) || 0, 0);
  if (area <= 0) {
    return { total: 0, perSquare: 0, breakdown: [] };
  }

  const breakdown = [];
  const allowedFields = new Set(roomTypeFields[card.type] ?? []);
  const hasField = (key) => allowedFields.has(key);
  const addBreakdown = (label, amount, detail, fieldKey) => {
    if (amount > 0) {
      const entry = { label, value: Math.round(amount) };
      if (detail) {
        entry.detail = detail;
      }
      if (fieldKey) {
        entry.fieldKey = fieldKey;
      }
      breakdown.push(entry);
    }
  };

  const basePrice = 9500;
  const quality = QUALITY_MULTIPLIERS[card.materialQuality] ?? 1;
  const typeMultiplier = TYPE_MULTIPLIERS[card.type] ?? 1;
  const typeEntry = getTypeEntry(card.type);
  const baseCost = basePrice * area * quality * typeMultiplier;
  let total = baseCost;
  const qualityLabel = getOptionLabel("materialQuality", card.materialQuality);
  const typeLabel = typeEntry.shortLabel || typeEntry.label;
  const baseDetail = `${formatNumber(basePrice)} ₽ × ${formatNumber(area)} м² × ${qualityLabel} × ${typeLabel}`;
  addBreakdown("Базовая ставка", baseCost, baseDetail);

  if (hasField("ceiling")) {
    const ceilingRates = {
      stretch: 220,
      drywall: 320,
      none: 180,
    };
    const ceilingRate = ceilingRates[card.ceiling] ?? ceilingRates.stretch;
    const ceilingCost = area * ceilingRate;
    total += ceilingCost;
    addBreakdown(
      "Потолок",
      ceilingCost,
      `${formatNumber(ceilingRate)} ₽ × ${formatNumber(area)} м²`,
      "ceiling"
    );
  }

  if (hasField("wallLeveling") && card.wallLeveling) {
    const wallCost = area * 480;
    total += wallCost;
    addBreakdown(
      "Выравнивание стен",
      wallCost,
      `480 ₽ × ${formatNumber(area)} м²`,
      "wallLeveling"
    );
  }

  if (hasField("floorBase") && card.floorBase === "insulation") {
    const floorInsulationCost = area * 260;
    total += floorInsulationCost;
    addBreakdown(
      "Утепление пола",
      floorInsulationCost,
      `260 ₽ × ${formatNumber(area)} м²`,
      "floorBase"
    );
  }

  if (hasField("electricalPoints")) {
    const electricalPoints = Math.max(0, card.electricalPoints || 0);
    const electricalPointsCost = electricalPoints * 480;
    total += electricalPointsCost;
    if (electricalPoints > 0) {
      addBreakdown(
        "Электротехнические точки",
        electricalPointsCost,
        `${formatNumber(480)} ₽ × ${formatNumber(electricalPoints)} шт.`,
        "electricalPoints"
      );
    }
  }

  if (hasField("electricSockets")) {
    const sockets = Math.max(0, card.electricSockets || 0);
    const socketsCost = sockets * 380;
    total += socketsCost;
    if (sockets > 0) {
      addBreakdown(
        "Розетки",
        socketsCost,
        `${formatNumber(380)} ₽ × ${formatNumber(sockets)} шт.`,
        "electricSockets"
      );
    }
  }

  if (hasField("partitions")) {
    const partitions = Math.max(0, card.partitions || 0);
    const partitionsCost = partitions * 1300;
    total += partitionsCost;
    if (partitions > 0) {
      addBreakdown(
        "Перегородки",
        partitionsCost,
        `${formatNumber(1300)} ₽ × ${formatNumber(partitions)} м²`,
        "partitions"
      );
    }
  }

  if (hasField("wetPoints")) {
    const wetPoints = Math.max(0, card.wetPoints || 0);
    const wetPointsCost = wetPoints * 5200;
    total += wetPointsCost;
    if (wetPoints > 0) {
      addBreakdown(
        "Мокрые точки / сантехника",
        wetPointsCost,
        `${formatNumber(5200)} ₽ × ${formatNumber(wetPoints)} шт.`,
        "wetPoints"
      );
    }
  }

  if (hasField("hoodOutlet") && card.hoodOutlet) {
    total += 4200;
    addBreakdown("Вывод под вытяжку", 4200, "фиксированная сумма", "hoodOutlet");
  }
  if (hasField("condRoute") && card.condRoute) {
    total += 7600;
    addBreakdown("Трасса под кондиционер", 7600, "фиксированная сумма", "condRoute");
  }
  if (hasField("pipeReplacement") && card.pipeReplacement) {
    total += 8800;
    addBreakdown("Замена труб", 8800, "фиксированная сумма", "pipeReplacement");
  }
  if (hasField("pipeRelocation") && card.pipeRelocation) {
    total += 6000;
    addBreakdown("Перенос труб", 6000, "фиксированная сумма", "pipeRelocation");
  }
  if (hasField("waterproofing") && card.waterproofing) {
    const waterproofingCost = area * 520;
    total += waterproofingCost;
    addBreakdown(
      "Гидроизоляция",
      waterproofingCost,
      `${formatNumber(520)} ₽ × ${formatNumber(area)} м²`,
      "waterproofing"
    );
  }

  if (hasField("sanitaryQuality")) {
    if (card.sanitaryQuality === "average") {
      total += 9500;
      addBreakdown("Сантехнический комплект: средний", 9500, "фиксированная сумма", "sanitaryQuality");
    } else if (card.sanitaryQuality === "premium") {
      total += 18000;
      addBreakdown("Сантехнический комплект: премиум", 18000, "фиксированная сумма", "sanitaryQuality");
    }
  }

  if (hasField("bathOption")) {
    if (card.bathOption === "shower") {
      total += 8200;
      addBreakdown("Душевой уголок", 8200, "фиксированная сумма", "bathOption");
    } else if (card.bathOption === "jacuzzi") {
      total += 22000;
      addBreakdown("Джакузи", 22000, "фиксированная сумма", "bathOption");
    } else {
      total += 14000;
      addBreakdown("Установка ванны", 14000, "фиксированная сумма", "bathOption");
    }
  }

  if (hasField("lighting") && card.lighting) {
    total += 2600;
    addBreakdown("Подсветка", 2600, null, "lighting");
  }
  if (hasField("towelDryer") && card.towelDryer) {
    total += 2100;
    addBreakdown("Полотенцесушитель", 2100, null, "towelDryer");
  }

  if (hasField("enhancedElectrical") && card.enhancedElectrical) {
    total += COMMERCIAL_ADDITIONAL_RATES.enhancedElectrical;
    addBreakdown(
      "Усиленная электрика",
      COMMERCIAL_ADDITIONAL_RATES.enhancedElectrical,
      "фиксированная сумма",
      "enhancedElectrical"
    );
  }
  if (hasField("fireAlarm") && card.fireAlarm) {
    total += COMMERCIAL_ADDITIONAL_RATES.fireAlarm;
    addBreakdown(
      "Пожарная сигнализация",
      COMMERCIAL_ADDITIONAL_RATES.fireAlarm,
      "фиксированная сумма",
      "fireAlarm"
    );
  }
  if (hasField("noiseIsolation") && card.noiseIsolation) {
    const noiseCost = COMMERCIAL_ADDITIONAL_RATES.noiseIsolation * area;
    total += noiseCost;
    addBreakdown(
      "Шумоизоляция",
      noiseCost,
      `${formatNumber(COMMERCIAL_ADDITIONAL_RATES.noiseIsolation)} ₽ × ${formatNumber(area)} м²`,
      "noiseIsolation"
    );
  }

  if (hasField("demolition") && card.demolition) {
    const demolitionCost = area * DEMOLITION_RATES.general;
    total += demolitionCost;
    addBreakdown("Демонтаж", demolitionCost, null, "demolition");
  }
  if (hasField("demolitionFloor") && card.demolitionFloor) {
    const demolitionFloorCost = area * DEMOLITION_RATES.floor;
    total += demolitionFloorCost;
    addBreakdown(
      "Демонтаж напольного покрытия",
      demolitionFloorCost,
      null,
      "demolitionFloor"
    );
  }
  if (hasField("demolitionWalls") && card.demolitionWalls) {
    const demolitionWallsCost = area * DEMOLITION_RATES.walls;
    total += demolitionWallsCost;
    addBreakdown(
      "Демонтаж стен / перегородок",
      demolitionWallsCost,
      null,
      "demolitionWalls"
    );
  }
  if (hasField("demolitionSanitary") && card.demolitionSanitary) {
    total += DEMOLITION_RATES.sanitary;
    addBreakdown(
      "Демонтаж сантехники",
      DEMOLITION_RATES.sanitary,
      "фиксированная сумма",
      "demolitionSanitary"
    );
  }
  if (hasField("demolitionToilet") && card.demolitionToilet) {
    total += DEMOLITION_RATES.toilet;
    addBreakdown(
      "Демонтаж унитаза / инсталляции",
      DEMOLITION_RATES.toilet,
      "фиксированная сумма",
      "demolitionToilet"
    );
  }

  const roundedTotal = Math.round(total);
  return {
    total: roundedTotal,
    perSquare: Math.round(roundedTotal / Math.max(area, 1)),
    breakdown: filterCalculationItems(card.type, breakdown),
  };
};

const DuplicateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none">
    <rect
      x="5"
      y="4"
      width="8"
      height="9"
      rx="2"
      stroke="#FFD700"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="3"
      y="2"
      width="8"
      height="9"
      rx="2"
      stroke="#FFD700"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none">
    <path d="M5 6h8" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M6 6V4h6v2M5 6c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1"
      stroke="#FF6B35"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M8 9v5" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 9v5" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = ({ direction }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none">
    {direction === "up" ? (
      <path d="M6 3L10 9H2L6 3Z" fill="#FFD700" />
    ) : (
      <path d="M6 9L10 3H2L6 9Z" fill="#FFD700" />
    )}
  </svg>
);

const IconButton = ({ label, onClick, disabled, children, style }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    disabled={disabled}
    style={{
      all: "unset",
      width: 36,
      height: 36,
      borderRadius: 4,
      border: "1px solid rgba(255,255,255,0.2)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled ? "not-allowed" : "pointer",
      background: disabled ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
      transition: "transform 0.15s ease",
      ...style,
    }}
  >
    {children}
  </button>
);

const WhiteboxCalculator = ({ isMobile }) => {
  const [roomCards, setRoomCards] = useState(() => [
    createCardFromDraft(getDefaultDraft("room", [])),
  ]);
  const [constructorDraft, setConstructorDraft] = useState(() => getDefaultDraft("room", []));
  const [expandedCardIds, setExpandedCardIds] = useState(() => []);
  const totalBudget = roomCards.reduce(
    (acc, card) => acc + calculateCardPrice(card).total,
    0
  );

  const handleCardNameChange = (id, value) => {
    setRoomCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, name: value } : card))
    );
  };

  const handleDuplicateCard = (id) => {
    setRoomCards((prev) => {
      const index = prev.findIndex((card) => card.id === id);
      if (index === -1) {
        return prev;
      }
      const original = prev[index];
      const duplicate = createCardFromDraft({
        ...original,
        name: `${original.name} (копия)`,
      });
      const next = [...prev];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
  };

  const handleDeleteCard = (id) => {
    setRoomCards((prev) => prev.filter((card) => card.id !== id));
  };

  const moveCard = (id, direction) => {
    setRoomCards((prev) => {
      const index = prev.findIndex((card) => card.id === id);
      if (index === -1) {
        return prev;
      }
      const target = index + direction;
      if (target < 0 || target >= prev.length) {
        return prev;
      }
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleConstructorFieldChange = (key, rawValue) => {
    setConstructorDraft((prev) => {
      const config = FIELD_LIBRARY[key];
      if (!config) {
        return prev;
      }
      const next = { ...prev };
      if (config.type === "number") {
        const parsed = Number(rawValue);
        if (Number.isNaN(parsed)) {
          return prev;
        }
        const min = config.min ?? -Infinity;
        const max = config.max ?? Infinity;
        next[key] = Math.max(min, Math.min(max, parsed));
      } else if (config.type === "toggle") {
        next[key] = Boolean(rawValue);
      } else {
        next[key] = rawValue;
      }
      return next;
    });
  };

  const handleCreateCard = () => {
    const newCard = createCardFromDraft(constructorDraft);
    const updatedCards = [...roomCards, newCard];
    setRoomCards(updatedCards);
    setConstructorDraft((prev) => ({
      ...prev,
      name: getDefaultDraft(prev.type, updatedCards).name,
    }));
  };

  const handleTypeSelect = (type) => {
    setConstructorDraft(getDefaultDraft(type, roomCards));
  };

  const currentFields = roomTypeFields[constructorDraft.type] ?? [];
  const canCreate =
    Number(constructorDraft.area) > 0 && constructorDraft.name?.trim().length > 0;

  const renderFieldValue = (fieldKey, value) => {
    const config = FIELD_LIBRARY[fieldKey];
    if (!config) {
      return value ?? "-";
    }
    if (config.type === "toggle") {
      return value ? "Да" : "Нет";
    }
    if (config.type === "select") {
      return getOptionLabel(fieldKey, value);
    }
    const numeric = typeof value === "number" ? value : Number(value);
    const formatted = Number.isNaN(numeric) ? value ?? "-" : formatNumber(numeric);
    return config.unit ? `${formatted} ${config.unit}` : formatted;
  };

  const renderConstructorInput = (fieldKey) => {
    const config = FIELD_LIBRARY[fieldKey];
    if (!config) {
      return null;
    }
    const value = constructorDraft[fieldKey];
    const label = config.label;
    const sharedInputStyle = {
      width: "100%",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: 4,
      background: "rgba(255,255,255,0.03)",
      color: "#fff",
      padding: "8px 12px",
      fontSize: isMobile ? 14 : 16,
    };

    if (config.type === "number") {
      return (
        <label
          key={fieldKey}
          style={{ display: "flex", flexDirection: "column", gap: 6, color: "#fff" }}
        >
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{label}</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="number"
              min={config.min}
              max={config.max}
              step={config.step}
              value={typeof value === "number" ? value : value ?? ""}
              onChange={(event) => handleConstructorFieldChange(fieldKey, event.target.value)}
              style={sharedInputStyle}
            />
            {config.unit && (
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                {config.unit}
              </span>
            )}
          </div>
        </label>
      );
    }

    if (config.type === "select") {
      return (
        <label
          key={fieldKey}
          style={{ display: "flex", flexDirection: "column", gap: 6, color: "#fff" }}
        >
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{label}</span>
          <select
            value={value ?? config.options[0]?.value}
            onChange={(event) => handleConstructorFieldChange(fieldKey, event.target.value)}
            style={{
              ...sharedInputStyle,
              appearance: "none",
              cursor: "pointer",
              backgroundImage:
                "linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.6) 50%), linear-gradient(135deg, rgba(255,255,255,0.6) 50%, transparent 50%)",
              backgroundPosition:
                "calc(100% - 18px) calc(50% + 2px), calc(100% - 13px) calc(50% + 2px)",
              backgroundSize: "6px 6px, 6px 6px",
              backgroundRepeat: "no-repeat",
            }}
          >
            {config.options.map((option) => (
              <option key={option.value} value={option.value} style={{ color: "#05060A" }}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      );
    }

    if (config.type === "toggle") {
      return (
        <label
          key={fieldKey}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 12px",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.03)",
            color: "#fff",
            fontSize: 14,
          }}
        >
          <span>{label}</span>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => handleConstructorFieldChange(fieldKey, event.target.checked)}
            style={{
              accentColor: "#FFD700",
              width: 20,
              height: 20,
            }}
          />
        </label>
      );
    }

    return null;
  };

  const containerPadding = isMobile ? "20px" : "30px";
  const fieldGridColumns = isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))";

  return (
    <div
      className="whitebox-calculator"
      style={{
        marginTop: "20px",
        background: "rgba(8, 12, 22, 0.95)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: containerPadding,
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "18px" : "24px",
        boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: isMobile ? 16 : 18,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#FFD700",
              margin: "0 0 6px",
            }}
          >
            Калькулятор черновой отделки
          </p>
          <h3
            style={{
              fontSize: isMobile ? 24 : 30,
              margin: 0,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            Сформируйте прозрачный расчёт
          </h3>
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 15,
            lineHeight: 1.5,
            margin: 0,
            maxWidth: isMobile ? "100%" : "360px",
          }}
        >
          Добавляйте помещения, подбирайте параметры и следите за итогом по каждому объекту.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.14)",
            borderRadius: 1,
          }}
        />
        <div>
          <h4
            style={{
              margin: "0 0 6px",
              fontSize: isMobile ? 20 : 22,
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Помещения
          </h4>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.75)",
              fontSize: 14,
            }}
          >
            Каждая карточка — отдельное помещение с собственным расчётом.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {roomCards.map((card, index) => {
            const { total: cardTotal, perSquare, breakdown } = calculateCardPrice(card);
            const typeEntry = getTypeEntry(card.type);
            const cardFields = roomTypeFields[card.type] ?? [];
            return (
              <div
                key={card.id}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <input
                      value={card.name}
                      onChange={(event) => handleCardNameChange(card.id, event.target.value)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        fontSize: isMobile ? 20 : 24,
                        fontWeight: 700,
                        padding: 0,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baseline",
                        gap: "10px",
                        marginTop: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: typeEntry.accent,
                          border: `1px solid ${typeEntry.accent}`,
                          borderRadius: 999,
                          padding: "2px 10px",
                          background: "rgba(255,255,255,0.05)",
                        }}
                      >
                        {typeEntry.shortLabel}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        ≈{formatNumber(perSquare)} ₽/м²
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#FFD700",
                          fontWeight: 600,
                        }}
                      >
                        {formatNumber(cardTotal)} ₽
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <IconButton
                        label="Переместить вверх"
                        onClick={() => moveCard(card.id, -1)}
                        disabled={index === 0}
                      >
                        <ArrowIcon direction="up" />
                      </IconButton>
                      <IconButton
                        label="Переместить вниз"
                        onClick={() => moveCard(card.id, 1)}
                        disabled={index === roomCards.length - 1}
                      >
                        <ArrowIcon direction="down" />
                      </IconButton>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <IconButton
                        label="Дублировать карточку"
                        onClick={() => handleDuplicateCard(card.id)}
                      >
                        <DuplicateIcon />
                      </IconButton>
                      <IconButton
                        label="Удалить карточку"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
                    gap: "10px",
                    paddingTop: "12px",
                  }}
                >
                  {cardFields.map((fieldKey) => (
                    <div
                      key={`${card.id}-${fieldKey}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.65)",
                          flex: 1,
                        }}
                      >
                        {FIELD_LIBRARY[fieldKey]?.label ?? fieldKey}
                      </span>
                      <span
                        style={{
                          fontSize: 15,
                          color: "#fff",
                          fontWeight: 600,
                          textAlign: "right",
                          minWidth: "fit-content",
                          flexShrink: 0,
                        }}
                      >
                        {renderFieldValue(fieldKey, card[fieldKey])}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    paddingTop: "12px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCardIds((prev) =>
                        prev.includes(card.id)
                          ? prev.filter((entry) => entry !== card.id)
                          : [...prev, card.id]
                      )
                    }
                    style={{
                      all: "unset",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      cursor: "pointer",
                      fontSize: 14,
                      color: "#FFD700",
                      fontWeight: 600,
                    }}
                  >
                    <span>Подробнее о составе расчета</span>
                    <span style={{ fontSize: 18 }}>
                      {expandedCardIds.includes(card.id) ? "▾" : "▸"}
                    </span>
                  </button>
                  {expandedCardIds.includes(card.id) && breakdown.length > 0 && (
                    <div
                      style={{
                        marginTop: 10,
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
                        gap: "8px",
                      }}
                    >
                      {breakdown.map((item) => (
                        <div
                          key={`${card.id}-breakdown-${item.label}`}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 13,
                                color: "rgba(255,255,255,0.65)",
                              }}
                            >
                              {item.label}
                            </span>
                            {item.detail && (
                              <span
                                style={{
                                  fontSize: 12,
                                  color: "rgba(255,255,255,0.45)",
                                }}
                              >
                                {item.detail}
                              </span>
                            )}
                          </div>
                          <span
                            style={{
                              fontSize: 13,
                              color: "#FFD700",
                              fontWeight: 600,
                            }}
                          >
                            {formatNumber(item.value)} ₽
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: containerPadding,
          marginTop: "6px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 6px",
              fontSize: isMobile ? 20 : 24,
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Конструктор комнаты
          </h4>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
            Выберите тип помещения и заполните поля — здесь настраиваются свойства карточки.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
            gap: "10px",
          }}
        >
          {ROOM_TYPES.map((option) => {
            const selected = option.value === constructorDraft.type;
            return (
              <button
                type="button"
                key={option.value}
                onClick={() => handleTypeSelect(option.value)}
                style={{
                  borderRadius: 6,
                  border: `1px solid ${selected ? "#FFD700" : "rgba(255,255,255,0.4)"}`,
                  background: selected ? option.accent : "rgba(255,255,255,0.04)",
                  color: selected ? "#0B0B0B" : "#fff",
                  padding: "10px 12px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  minHeight: "52px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <span>{option.shortLabel}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: selected ? "#1E1E1E" : "rgba(255,255,255,0.6)",
                    fontWeight: 500,
                  }}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Название карточки
            <input
              value={constructorDraft.name}
              onChange={(event) =>
                setConstructorDraft((prev) => ({ ...prev, name: event.target.value }))
              }
              style={{
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "10px 14px",
                background: "rgba(255,255,255,0.03)",
                color: "#fff",
                fontSize: 16,
              }}
            />
          </label>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: fieldGridColumns,
            gap: "12px",
          }}
        >
          {currentFields.map((fieldKey) => renderConstructorInput(fieldKey))}
        </div>

        <YellowBorderButton
          onClick={handleCreateCard}
          disabled={!canCreate}
          style={{ borderRadius: 6, fontSize: 16 }}
        >
          Создать
        </YellowBorderButton>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {USAGE_STEPS.map((step) => (
            <div
              key={step}
              style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}
            >
              <span style={{ color: "#FFD700", fontSize: 18, lineHeight: 1 }}>▹</span>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 13,
                  lineHeight: 1.4,
                }}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 13,
            margin: 0,
          }}
        >
          🧮 Под капотом считается штукатурка (площадь × коэффициент), электрика (точка × цена),
          сантехника (мокрые точки × базовая цена), гидроизоляция (площадь × ставка), демонтаж,
          выравнивание полов и прокладка кабеля.
        </p>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#FFD700",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            ✔ Общая сумма
          </span>
          <strong
            style={{
              fontSize: isMobile ? 22 : 26,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {formatNumber(totalBudget)} ₽
          </strong>
        </div>
      </div>
    </div>
  );
};

export default WhiteboxCalculator;

