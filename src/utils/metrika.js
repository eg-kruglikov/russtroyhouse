/**
 * Централизованный модуль для работы с Яндекс.Метрикой
 * ID счетчика: 101296472
 */

export const METRIKA_ID = 101296472;

/**
 * Проверяет доступность Яндекс.Метрики
 */
const isMetrikaAvailable = () => {
  return typeof window !== "undefined" && typeof window.ym === "function";
};

/**
 * Безопасный вызов функции метрики
 * @param {Function} fn - Функция для выполнения с ym
 */
const ymSafe = (fn) => {
  try {
    if (isMetrikaAvailable()) {
      fn(window.ym);
    }
  } catch (error) {
    console.warn("Metrika error:", error);
  }
};

/**
 * Отправка виртуального хита (просмотр страницы)
 * @param {string} url - URL страницы
 * @param {Object} options - Дополнительные параметры
 */
export const ymHit = (url, options = {}) => {
  ymSafe((ym) => {
    ym(METRIKA_ID, "hit", url, options);
  });
};

/**
 * Отправка достижения цели
 * @param {string} goal - Название цели
 * @param {Object} params - Параметры цели
 */
export const ymGoal = (goal, params = {}) => {
  ymSafe((ym) => {
    ym(METRIKA_ID, "reachGoal", goal, params);
  });
};

/**
 * Фиксация активности (не отказ)
 */
export const ymNotBounce = () => {
  ymSafe((ym) => {
    ym(METRIKA_ID, "notBounce");
  });
};

/**
 * Отправка параметров визита
 * @param {Object} params - Параметры визита
 */
export const ymParams = (params) => {
  ymSafe((ym) => {
    ym(METRIKA_ID, "params", params);
  });
};

/**
 * Отправка информации о событии (универсальная)
 * @param {string} eventName - Название события
 * @param {Object} params - Параметры события
 */
export const ymEvent = (eventName, params = {}) => {
  ymGoal(eventName, params);
};

/**
 * Отправка информации об ошибке
 * @param {Error|string} error - Объект ошибки или строка
 * @param {Object} context - Контекст ошибки
 */
export const ymError = (error, context = {}) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : "";

  ymGoal("js_error", {
    message: errorMessage,
    stack: errorStack?.substring(0, 200), // Ограничиваем длину стека
    ...context,
  });
};

/**
 * Универсальная функция для отслеживания пользовательских событий
 * @param {string} category - Категория события
 * @param {string} action - Действие
 * @param {string} label - Метка (опционально)
 */
export const ymTrackEvent = (category, action, label = "") => {
  const eventName = `${category}_${action}`.toLowerCase().replace(/\s+/g, "_");
  ymGoal(eventName, { label });
};

/**
 * Отслеживание скролла страницы
 * @param {number} depth - Глубина скролла в процентах (25, 50, 75, 100)
 */
export const ymScrollDepth = (depth) => {
  ymGoal(`scroll_depth_${depth}`, { depth });
};

/**
 * Отслеживание времени на странице
 * @param {number} seconds - Количество секунд
 */
export const ymTimeOnPage = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  let goal = "time_on_page_30s";

  if (seconds >= 300) goal = "time_on_page_5min";
  else if (seconds >= 180) goal = "time_on_page_3min";
  else if (seconds >= 120) goal = "time_on_page_2min";
  else if (seconds >= 60) goal = "time_on_page_1min";

  ymGoal(goal, { seconds, minutes });
};

/**
 * Комбинированная функция: hit + notBounce
 * @param {string} url - URL страницы
 */
export const ymNavigate = (url) => {
  ymHit(url);
  ymNotBounce();
};

/**
 * Отслеживание просмотра N страниц
 * @param {number} count - Количество просмотренных страниц
 */
export const ymPageViewsCount = (count) => {
  if (count === 2) ymGoal("page_views_2");
  if (count === 3) ymGoal("page_views_3");
  if (count >= 5) ymGoal("page_views_5");
};

// Экспортируем все функции по умолчанию для удобства
export default {
  METRIKA_ID,
  ymHit,
  ymGoal,
  ymNotBounce,
  ymParams,
  ymEvent,
  ymError,
  ymTrackEvent,
  ymScrollDepth,
  ymTimeOnPage,
  ymNavigate,
  ymPageViewsCount,
};
