# Структура калькулятора WhiteboxCalculator

## Общая информация
**Файл:** `src/components/blocks/WhiteboxCalculator.jsx`  
**Компонент:** `WhiteboxCalculator`  
**Пропсы:** `{ isMobile: boolean }`

---

## 1. КОНСТАНТЫ И КОНФИГУРАЦИЯ

### 1.1. Типы помещений (ROOM_TYPES)
```javascript
const ROOM_TYPES = [
  {
    value: "room",              // идентификатор
    label: "Комната / спальня / гостиная",  // полное название
    shortLabel: "Комната",      // короткое название
    accent: "#70D6FF",          // цвет акцента
  },
  // ... остальные типы: kitchen, combinedBathroom, toilet, bathroom, corridor, wardrobe, commercial
]
```

### 1.2. Типы ремонта (REPAIR_TYPE_OPTIONS)
```javascript
const REPAIR_TYPE_OPTIONS = [
  { value: "cosmetic", label: "Косметический" },
  { value: "capital", label: "Капитальный" },
  { value: "whitebox", label: "Черновая отделка" },
];
```

### 1.3. Качество материалов (MATERIAL_QUALITY_OPTIONS)
```javascript
const MATERIAL_QUALITY_OPTIONS = [
  { value: "standard", label: "Стандарт" },
  { value: "comfort", label: "Комфорт" },
  { value: "premium", label: "Премиум" },
];
```

### 1.4. Другие опции
- `CEILING_OPTIONS` - варианты потолков (натяжные, гипсокартон, нет)
- `FLOOR_OPTIONS` - варианты пола (стяжка, утепление)
- `SANITARY_QUALITY_OPTIONS` - качество сантехники (бюджет, средняя, премиум)
- `BATH_OPTIONS` - варианты ванны (ванна, душевой уголок, джакузи)

### 1.5. Библиотека полей (FIELD_LIBRARY)
Содержит все доступные поля с их конфигурацией:
```javascript
const FIELD_LIBRARY = {
  area: { 
    label: "Площадь", 
    type: "number", 
    unit: "м²", 
    min: 4, 
    max: 200, 
    step: 1 
  },
  repairType: {
    label: "Вид ремонта",
    type: "select",
    options: REPAIR_TYPE_OPTIONS,
  },
  materialQuality: {
    label: "Качество материалов",
    type: "select",
    options: MATERIAL_QUALITY_OPTIONS,
  },
  // ... остальные поля
}
```

**Типы полей:**
- `number` - числовое поле с min/max/step/unit
- `select` - выпадающий список с options
- `toggle` - чекбокс (boolean)

### 1.6. Поля по типам помещений (roomTypeFields)
Определяет, какие поля доступны для каждого типа помещения:
```javascript
const roomTypeFields = {
  room: ["repairType", "area", "materialQuality", "electricalPoints", ...],
  kitchen: ["repairType", "area", "materialQuality", "electricalPoints", ...],
  // ... остальные типы
}
```

### 1.7. Значения по умолчанию (DEFAULT_CARD_VALUES)
```javascript
const DEFAULT_CARD_VALUES = {
  area: 18,
  repairType: "cosmetic",
  materialQuality: "standard",
  electricalPoints: 6,
  ceiling: "stretch",
  wallLeveling: true,
  // ... остальные поля
}
```

### 1.8. Переопределения по типам (TYPE_DEFAULT_OVERRIDES)
Специфичные значения для каждого типа помещения:
```javascript
const TYPE_DEFAULT_OVERRIDES = {
  room: {
    repairType: "cosmetic",
    wetPoints: 0,
    // ...
  },
  kitchen: {
    repairType: "cosmetic",
    wetPoints: 1,
    hoodOutlet: true,
    // ...
  },
  // ... остальные типы
}
```

---

## 2. КОЭФФИЦИЕНТЫ И РАСЦЕНКИ

### 2.1. Множители качества (QUALITY_MULTIPLIERS)
```javascript
const QUALITY_MULTIPLIERS = {
  standard: 1,
  comfort: 1.25,
  premium: 1.55,
};
```

### 2.2. Множители типов помещений (TYPE_MULTIPLIERS)
```javascript
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
```

### 2.3. Дополнительные расценки (COMMERCIAL_ADDITIONAL_RATES)
```javascript
const COMMERCIAL_ADDITIONAL_RATES = {
  enhancedElectrical: 7800,
  fireAlarm: 5200,
  noiseIsolation: 180,
};
```

### 2.4. Расценки на демонтаж (DEMOLITION_RATES)
```javascript
const DEMOLITION_RATES = {
  general: 220,      // за м²
  floor: 200,        // за м²
  walls: 250,        // за м²
  sanitary: 4500,    // фиксированная
  toilet: 3200,      // фиксированная
};
```

---

## 3. ФУНКЦИИ РАСЧЕТА

### 3.1. calculateCardPrice(card)
**Входные данные:**
- `card` - объект карточки помещения со всеми полями

**Выходные данные:**
```javascript
{
  total: number,        // итоговая стоимость
  perSquare: number,    // стоимость за м²
  breakdown: [         // детализация расчета
    {
      label: string,    // название позиции
      value: number,    // стоимость
      detail?: string,  // детали (опционально)
      fieldKey?: string // ключ поля (опционально)
    }
  ]
}
```

**Логика расчета:**
1. Базовая ставка: `9500 ₽ × площадь × качество × тип_помещения`
2. Потолки: зависит от типа (натяжные: 220 ₽/м², гипсокартон: 320 ₽/м², нет: 180 ₽/м²)
3. Выравнивание стен: `480 ₽ × площадь` (если включено)
4. Утепление пола: `260 ₽ × площадь` (если выбрано)
5. Электротехнические точки: `480 ₽ × количество`
6. Розетки: `380 ₽ × количество`
7. Перегородки: `1300 ₽ × м²`
8. Мокрые точки: `5200 ₽ × количество`
9. Фиксированные услуги:
   - Вывод под вытяжку: 4200 ₽
   - Трасса под кондиционер: 7600 ₽
   - Замена труб: 8800 ₽
   - Перенос труб: 6000 ₽
10. Гидроизоляция: `520 ₽ × площадь`
11. Сантехнические комплекты:
    - Средний: 9500 ₽
    - Премиум: 18000 ₽
12. Ванна/душ:
    - Душевой уголок: 8200 ₽
    - Джакузи: 22000 ₽
    - Ванна: 14000 ₽
13. Подсветка: 2600 ₽
14. Полотенцесушитель: 2100 ₽
15. Коммерческие дополнения (см. COMMERCIAL_ADDITIONAL_RATES)
16. Демонтаж (см. DEMOLITION_RATES)

---

## 4. СОСТОЯНИЕ КОМПОНЕНТА

### 4.1. roomCards (массив карточек)
```javascript
const [roomCards, setRoomCards] = useState([...])
```
Каждая карточка содержит:
```javascript
{
  id: string,              // уникальный идентификатор
  type: string,            // тип помещения (room, kitchen, etc.)
  name: string,            // название карточки
  repairType: string,      // вид ремонта (cosmetic, capital, whitebox)
  area: number,            // площадь
  materialQuality: string, // качество материалов
  // ... все остальные поля из FIELD_LIBRARY
}
```

### 4.2. constructorDraft (черновик новой карточки)
```javascript
const [constructorDraft, setConstructorDraft] = useState({...})
```
Содержит те же поля, что и карточка, но без `id`

### 4.3. expandedCardIds (развернутые карточки)
```javascript
const [expandedCardIds, setExpandedCardIds] = useState([])
```
Массив ID карточек, у которых развернута детализация расчета

---

## 5. ОБРАБОТЧИКИ СОБЫТИЙ

### 5.1. handleCardNameChange(id, value)
Изменение названия карточки

### 5.2. handleDuplicateCard(id)
Дублирование карточки

### 5.3. handleDeleteCard(id)
Удаление карточки

### 5.4. moveCard(id, direction)
Перемещение карточки вверх/вниз (direction: -1 или 1)

### 5.5. handleToggleBreakdown(cardId)
Развернуть/свернуть детализацию расчета

### 5.6. handleConstructorFieldChange(key, rawValue)
Изменение поля в конструкторе:
- Валидация для number (min/max)
- Нормализация для toggle (boolean)
- Обновление constructorDraft

### 5.7. handleCreateCard()
Создание новой карточки из черновика

### 5.8. handleTypeSelect(type)
Выбор типа помещения в конструкторе

---

## 6. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

### 6.1. generateId()
Генерация уникального ID для карточки

### 6.2. getTypeEntry(type)
Получение конфигурации типа помещения

### 6.3. getTypeShortLabel(type)
Получение короткого названия типа

### 6.4. getDefaultDraft(type, existingCards)
Создание черновика с дефолтными значениями для типа

### 6.5. createCardFromDraft(draft)
Создание карточки из черновика (добавляет id)

### 6.6. formatNumber(value)
Форматирование числа в русский формат (пробелы как разделители)

### 6.7. getOptionLabel(fieldKey, value)
Получение текстового значения опции по ключу поля и значению

### 6.8. filterCalculationItems(roomType, items)
Фильтрация позиций расчета по доступным полям типа помещения

### 6.9. renderFieldValue(fieldKey, value)
Рендеринг значения поля для отображения в карточке

### 6.10. renderConstructorInput(fieldKey)
Рендеринг поля ввода в конструкторе (number/select/toggle)

---

## 7. СТРУКТУРА UI

### 7.1. Заголовок и инструкции
- Заголовок "Калькулятор черновой отделки"
- Подзаголовок "Сформируйте прозрачный расчёт"
- Список шагов использования (USAGE_STEPS)
- Описание внутренних расчетов

### 7.2. Секция "Помещения"
Список созданных карточек:
- Название (редактируемое)
- Бейджи: тип помещения, вид ремонта, качество материалов
- Стоимость за м² и итоговая стоимость
- Кнопки управления (переместить, дублировать, удалить)
- Сетка полей карточки
- Кнопка "Подробнее о составе расчета" с развертываемой детализацией

### 7.3. Секция "Конструктор комнаты"
- Заголовок и описание
- Выбор типа помещения (кнопки)
- **Вид ремонта** (кнопки: Косметический, Капитальный, Черновая отделка)
- Поле "Название карточки"
- Сетка полей конструктора (из currentFields, исключая repairType)
- Кнопка "Создать"
- Блок "Общая сумма"

---

## 8. ВАЖНЫЕ МОМЕНТЫ ДЛЯ ДОРАБОТКИ

### 8.1. Расчет стоимости
Функция `calculateCardPrice` находится в строках **485-751**.  
Здесь можно:
- Изменить базовую ставку (сейчас 9500 ₽)
- Изменить коэффициенты качества
- Изменить коэффициенты типов помещений
- Добавить/изменить расценки на услуги
- Добавить учет типа ремонта (repairType) в расчет

### 8.2. Добавление новых полей
1. Добавить опции в соответствующий массив (если select)
2. Добавить поле в `FIELD_LIBRARY`
3. Добавить значение по умолчанию в `DEFAULT_CARD_VALUES`
4. Добавить в нужные `roomTypeFields`
5. Добавить в `TYPE_DEFAULT_OVERRIDES` (если нужно)
6. Добавить расчет в `calculateCardPrice` (если влияет на стоимость)

### 8.3. Изменение логики расчета по типу ремонта
В функции `calculateCardPrice` можно добавить проверку `card.repairType`:
```javascript
if (card.repairType === "cosmetic") {
  // логика для косметического
} else if (card.repairType === "capital") {
  // логика для капитального
} else if (card.repairType === "whitebox") {
  // логика для черновой отделки
}
```

### 8.4. Изменение отображения
- Секция карточек: строки **1243-1528**
- Конструктор: строки **1531-1740**
- Стили инлайновые, можно менять напрямую

---

## 9. ЗАВИСИМОСТИ

- `YellowBorderButton` - компонент кнопки
- `ymTrackEvent` - функция метрики для отслеживания событий

---

## 10. ПРИМЕР ИЗМЕНЕНИЯ РАСЧЕТА

Если нужно изменить расчет в зависимости от типа ремонта:

```javascript
const calculateCardPrice = (card) => {
  // ... существующий код ...
  
  // Добавить после базовой ставки:
  let repairTypeMultiplier = 1;
  if (card.repairType === "capital") {
    repairTypeMultiplier = 1.2; // +20% для капитального
  } else if (card.repairType === "whitebox") {
    repairTypeMultiplier = 0.8; // -20% для черновой отделки
  }
  
  total = baseCost * repairTypeMultiplier;
  // ... остальной код ...
}
```

---

## 11. СТРУКТУРА ДАННЫХ КАРТОЧКИ

Полный список полей карточки:
- `id` - уникальный идентификатор
- `type` - тип помещения
- `name` - название
- `repairType` - вид ремонта
- `area` - площадь
- `materialQuality` - качество материалов
- `electricalPoints` - количество розеток
- `electricSockets` - розетки (электрика)
- `ceiling` - потолки
- `wallLeveling` - выравнивание стен (boolean)
- `partitions` - перегородки (м²)
- `floorBase` - напольное покрытие
- `wetPoints` - мокрые точки
- `hoodOutlet` - вывод под вытяжку (boolean)
- `condRoute` - трасса под кондиционер (boolean)
- `pipeReplacement` - замена труб (boolean)
- `pipeRelocation` - перенос труб (boolean)
- `waterproofing` - гидроизоляция (boolean)
- `sanitaryQuality` - тип сантехники
- `bathOption` - душевая/ванна/джакузи
- `lighting` - подсветка (boolean)
- `towelDryer` - полотенцесушитель (boolean)
- `enhancedElectrical` - усиленная электрика (boolean)
- `fireAlarm` - пожарная сигнализация (boolean)
- `noiseIsolation` - шумоизоляция (boolean)
- `demolition` - демонтаж (boolean)
- `demolitionFloor` - демонтаж пола (boolean)
- `demolitionWalls` - демонтаж стен (boolean)
- `demolitionSanitary` - демонтаж сантехники (boolean)
- `demolitionToilet` - демонтаж унитаза (boolean)

