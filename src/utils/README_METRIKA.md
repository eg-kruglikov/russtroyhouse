# 🎯 Централизованная система Яндекс.Метрики

## 📦 Структура

```
src/
├── utils/
│   ├── metrika.js           # Основной модуль с функциями метрики
│   └── METRIKA_GOALS.md     # Документация всех целей
├── hooks/
│   ├── useNavigateWithMetrika.js  # Хук для навигации с метрикой
│   └── useMetrikaActivity.js      # Хук для отслеживания активности
```

---

## 🚀 Быстрый старт

### 1. Базовое использование

```javascript
import { ymGoal, ymHit, ymNotBounce, ymNavigate } from "@/utils/metrika";

// Отправка цели
ymGoal("form_sent");

// Виртуальный хит
ymHit("/contacts");

// Фиксация активности
ymNotBounce();

// Хит + notBounce (комбинированный)
ymNavigate("/contacts");
```

### 2. Навигация с метрикой

```javascript
import { useNavigateWithMetrika } from "@/hooks/useNavigateWithMetrika";

function MyComponent() {
  const navigate = useNavigateWithMetrika();

  const handleClick = () => {
    navigate("/contacts"); // Автоматически отправит hit + notBounce
  };
}
```

### 3. Отслеживание активности пользователя

```javascript
import { useMetrikaActivity } from "@/hooks/useMetrikaActivity";

function MyPage() {
  // Автоматически отслеживает:
  // - Скролл (25%, 50%, 75%, 100%)
  // - Время на странице (30с, 1м, 2м, 3м, 5м)
  // - Первую активность (notBounce)
  useMetrikaActivity();

  return <div>...</div>;
}
```

### 4. Отслеживание ошибок

```javascript
import { ymError } from "@/utils/metrika";

try {
  // ваш код
} catch (error) {
  ymError(error, {
    component: "MyComponent",
    action: "handleSubmit",
  });
}
```

---

## 📚 API Справка

### `ymGoal(goal, params = {})`

Отправка достижения цели.

**Параметры:**

- `goal` (string) - Название цели
- `params` (object, optional) - Дополнительные параметры

**Пример:**

```javascript
ymGoal("form_sent");
ymGoal("product_view", { productId: 123 });
```

---

### `ymHit(url, options = {})`

Отправка виртуального хита (просмотр страницы).

**Параметры:**

- `url` (string) - URL страницы
- `options` (object, optional) - Дополнительные опции

**Пример:**

```javascript
ymHit("/contacts");
ymHit("/product/123", { title: "Product Name" });
```

---

### `ymNotBounce()`

Фиксация активности (не отказ).

**Пример:**

```javascript
ymNotBounce();
```

---

### `ymNavigate(url)`

Комбинированная функция: отправляет hit + notBounce.

**Параметры:**

- `url` (string) - URL страницы

**Пример:**

```javascript
ymNavigate("/contacts");
```

---

### `ymError(error, context = {})`

Отправка информации об ошибке в метрику.

**Параметры:**

- `error` (Error|string) - Объект ошибки или строка
- `context` (object, optional) - Контекст ошибки

**Пример:**

```javascript
try {
  throw new Error("Something went wrong");
} catch (error) {
  ymError(error, {
    component: "PaymentForm",
    userId: 123,
  });
}
```

---

### `ymScrollDepth(depth)`

Отслеживание глубины скролла.

**Параметры:**

- `depth` (number) - Глубина в процентах (25, 50, 75, 100)

**Пример:**

```javascript
ymScrollDepth(50); // Пользователь проскроллил 50% страницы
```

---

### `ymTimeOnPage(seconds)`

Отслеживание времени на странице.

**Параметры:**

- `seconds` (number) - Количество секунд

**Пример:**

```javascript
ymTimeOnPage(60); // Пользователь провел 1 минуту на странице
```

---

### `ymParams(params)`

Отправка параметров визита.

**Параметры:**

- `params` (object) - Параметры визита

**Пример:**

```javascript
ymParams({
  userType: "premium",
  source: "google",
});
```

---

### `ymTrackEvent(category, action, label = '')`

Универсальная функция для отслеживания пользовательских событий.

**Параметры:**

- `category` (string) - Категория события
- `action` (string) - Действие
- `label` (string, optional) - Метка

**Пример:**

```javascript
ymTrackEvent("Video", "Play", "Homepage Hero");
// Создаст цель: video_play
```

---

## 🎯 Хуки

### `useNavigateWithMetrika()`

Хук для навигации с автоматической отправкой метрики.

**Возвращает:** Функцию навигации

**Пример:**

```javascript
const navigate = useNavigateWithMetrika();

navigate("/contacts");
navigate("/repair/cosmetic");
navigate("/", { scrollTo: "portfolio" });
```

---

### `useMetrikaActivity()`

Хук для автоматического отслеживания активности пользователя.

**Отслеживает:**

- Глубину скролла (25%, 50%, 75%, 100%)
- Время на странице (30с, 1м, 2м, 3м, 5м)
- Первую активность (клик, скролл, движение мыши, нажатие клавиши)

**Пример:**

```javascript
function HomePage() {
  useMetrikaActivity();

  return <div>Контент страницы</div>;
}
```

---

## 🔧 Глобальные настройки

### ID счетчика метрики

```javascript
import { METRIKA_ID } from "@/utils/metrika";
console.log(METRIKA_ID); // 101296472
```

### Проверка доступности метрики

Все функции автоматически проверяют доступность `window.ym` и безопасно обрабатывают ошибки.

---

## 🎨 Примеры использования

### Пример 1: Форма обратной связи

```javascript
import { ymGoal } from "@/utils/metrika";

function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendForm(formData);
      ymGoal("form_sent"); // ✅ Отправка цели
      showSuccessMessage();
    } catch (error) {
      ymError(error, { form: "contact" }); // ✅ Отправка ошибки
      showErrorMessage();
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Пример 2: Карточка товара

```javascript
import { useNavigateWithMetrika } from "@/hooks/useNavigateWithMetrika";
import { ymGoal } from "@/utils/metrika";

function ProductCard({ id }) {
  const navigate = useNavigateWithMetrika();

  const handleClick = () => {
    ymGoal("product_click", { productId: id }); // ✅ Цель
    navigate(`/product/${id}`); // ✅ Навигация с метрикой
  };

  return <div onClick={handleClick}>...</div>;
}
```

### Пример 3: Страница с отслеживанием активности

```javascript
import { useMetrikaActivity } from "@/hooks/useMetrikaActivity";

function BlogPost() {
  useMetrikaActivity(); // ✅ Автоматическое отслеживание

  return (
    <article>
      <h1>Заголовок статьи</h1>
      <p>Длинный контент...</p>
    </article>
  );
}
```

### Пример 4: Обработка ошибок

Глобальный обработчик настроен в `App.jsx`:

```javascript
// В App.jsx уже настроено:
window.addEventListener("error", (event) => {
  ymError(event.error, {
    type: "uncaught_error",
    filename: event.filename,
    lineno: event.lineno,
  });
});
```

---

## 📊 Отслеживаемые цели

Полный список целей смотрите в файле [`METRIKA_GOALS.md`](./METRIKA_GOALS.md).

**Основные категории:**

- 🧭 Навигация (`nav_*`)
- 💼 Конверсии (`form_sent`, `call_confirmed`)
- 📜 Активность (`scroll_depth_*`, `time_on_page_*`)
- 🐛 Технические (`js_error`)

---

## ✅ Миграция со старого кода

### Было:

```javascript
if (window.ym) {
  window.ym(101296472, "reachGoal", "form_sent");
}
```

### Стало:

```javascript
import { ymGoal } from "@/utils/metrika";
ymGoal("form_sent");
```

---

### Было:

```javascript
if (window.ym) {
  window.ym(101296472, "hit", "/contacts");
  window.ym(101296472, "notBounce");
}
```

### Стало:

```javascript
import { ymNavigate } from "@/utils/metrika";
ymNavigate("/contacts");
```

---

## 🚨 Частые ошибки

### ❌ Неправильно:

```javascript
// Не импортируется ID напрямую
window.ym(101296472, "reachGoal", "goal");
```

### ✅ Правильно:

```javascript
import { ymGoal } from "@/utils/metrika";
ymGoal("goal");
```

---

### ❌ Неправильно:

```javascript
// Забыли обработать ошибки
throw new Error("Oops");
```

### ✅ Правильно:

```javascript
import { ymError } from "@/utils/metrika";

try {
  throw new Error("Oops");
} catch (error) {
  ymError(error, { context: "MyComponent" });
}
```

---

## 🎓 Best Practices

1. **Всегда используйте централизованные функции** вместо прямых вызовов `window.ym`
2. **Добавляйте `useMetrikaActivity()`** на все основные страницы
3. **Используйте `useNavigateWithMetrika()`** для всей навигации
4. **Отправляйте ошибки в метрику** для анализа проблем
5. **Документируйте новые цели** в `METRIKA_GOALS.md`

---

## 📝 Changelog

### 2025-10-10 - v2.0

- ✅ Создан централизованный модуль `metrika.js`
- ✅ Добавлен хук `useMetrikaActivity` для отслеживания активности
- ✅ Добавлен глобальный обработчик ошибок
- ✅ Удален устаревший компонент `Metrika.jsx`
- ✅ Все компоненты мигрированы на новую систему
- ✅ Создана полная документация

---

## 🔗 Ссылки

- [Документация целей](./METRIKA_GOALS.md)
- [Яндекс.Метрика - Официальная документация](https://yandex.ru/support/metrica/)
- [ID счетчика: 101296472](https://metrika.yandex.ru/dashboard?id=101296472)
