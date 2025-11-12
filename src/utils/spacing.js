/**
 * Константы отступов, размеров и стилей для единообразия дизайна
 *
 * Использование:
 * import { LOGO_OFFSET, TITLE_SIZES, SECTION_PADDING } from '../utils/spacing';
 *
 * Затем в стилях:
 * paddingLeft: LOGO_OFFSET
 * fontSize: isMobile ? TITLE_SIZES.mobile.main : TITLE_SIZES.desktop.main
 * padding: isMobile ? SECTION_PADDING.mobile : SECTION_PADDING.desktop
 *
 * ПРЕИМУЩЕСТВА:
 * - Единообразие: все элементы с одинаковым стилем используют одну константу
 * - Легко изменить: меняешь значение в одном месте - меняется везде
 * - Понятность: названия констант говорят сами за себя
 */

// ========== ОТСТУПЫ ==========

// Отступ №1 - как у логотипа в шапке (от левого края экрана до логотипа)
// Используется для выравнивания заголовков и текста с логотипом
// Должен соответствовать padding контейнера Header (0 8vw)
export const LOGO_OFFSET = {
  mobile: "8vw",
  desktop: "8vw",
};

// Отступы секций (вертикальные и горизонтальные)
export const SECTION_PADDING = {
  mobile: "60px 16px",
  desktop: "100px 40px",
};

// Отступы секций с минимальными горизонтальными отступами
export const SECTION_PADDING_MINIMAL = {
  mobile: "8px 0",
  desktop: "60px 40px",
};

// Отступы между заголовком и подзаголовком
export const TITLE_SUBTITLE_GAP = {
  mobile: "8px",
  desktop: "16px",
};

// Отступы между заголовком и контентом (текстом и фото/видео)
export const TITLE_CONTENT_GAP = {
  mobile: "12px",
  desktop: "24px",
};

// Отступы между элементами внутри блока
export const BLOCK_INTERNAL_GAP = {
  mobile: "12px",
  desktop: "16px",
};

// Отступы между основными элементами секции
export const SECTION_INTERNAL_GAP = {
  mobile: "32px",
  desktop: "48px",
};

// ========== РАЗМЕРЫ ЗАГОЛОВКОВ ==========

// Основные заголовки секций (h2)
export const TITLE_SIZES = {
  mobile: {
    main: "8vw", // Последние работы, С заботой о вас
    portfolio: "7vw", // Портфолио
    service: "6vw", // Заголовки блоков услуг
  },
  desktop: {
    main: "38px", // Последние работы, Наши услуги, блоки ремонтов
    secondary: "42px", // С заботой о вас
    portfolio: "40px", // Портфолио
    service: "32px", // Заголовки блоков услуг
  },
};

// Подзаголовки (p)
export const SUBTITLE_SIZES = {
  mobile: {
    small: "14px", // Качественный ремонт...
    medium: "16px", // Посмотрите результаты...
  },
  desktop: {
    small: "18px", // Качественный ремонт...
    medium: "20px", // Посмотрите результаты...
  },
};

// ========== ЦВЕТА ==========

// Фон секций (как у шапки и основных блоков)
export const SECTION_BACKGROUND = "var(--color-background-primary)";

// Цвет основного заголовка
export const TITLE_COLOR = "#FFD700";

// Цвет подзаголовка
export const SUBTITLE_COLOR = "rgba(255,255,255,0.9)";

// Цвет подзаголовка (более светлый вариант)
export const SUBTITLE_COLOR_LIGHT = "rgba(255,255,255,0.85)";

// ========== ДРУГИЕ СТИЛИ ==========

// Максимальная ширина контента
export const CONTENT_MAX_WIDTH = {
  standard: "1200px",
  wide: "1400px",
};

// Выравнивание текста заголовков
export const TEXT_ALIGN = {
  left: "left",
  center: "center",
};

// Вес шрифта заголовков
export const FONT_WEIGHT = {
  title: "900",
  subtitle: "400",
};
