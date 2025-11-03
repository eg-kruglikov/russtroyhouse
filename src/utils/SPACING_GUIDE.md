# Руководство по использованию констант стилей

Все повторяющиеся значения стилей (отступы, размеры заголовков, цвета) зафиксированы в `src/utils/spacing.js` для единообразия дизайна.

## Как использовать

### 1. Импорт констант

```javascript
import {
  LOGO_OFFSET,
  SECTION_PADDING,
  TITLE_SIZES,
  SUBTITLE_SIZES,
  TITLE_CONTENT_GAP,
  SECTION_BACKGROUND,
  TITLE_COLOR,
  SUBTITLE_COLOR,
} from "../../utils/spacing";
```

### 2. Примеры использования

#### Отступ слева (как у логотипа)

```javascript
paddingLeft: LOGO_OFFSET; // "20px"
```

#### Отступы секции

```javascript
padding: isMobile ? SECTION_PADDING.mobile : SECTION_PADDING.desktop;
// Мобильный: "60px 16px"
// Десктоп: "100px 40px"
```

#### Размеры заголовков

```javascript
// Основной заголовок
fontSize: isMobile ? TITLE_SIZES.mobile.main : TITLE_SIZES.desktop.main;
// Мобильный: "8vw"
// Десктоп: "48px"

// Второстепенный заголовок
fontSize: isMobile ? TITLE_SIZES.mobile.main : TITLE_SIZES.desktop.secondary;
// Мобильный: "8vw"
// Десктоп: "42px"
```

#### Размеры подзаголовков

```javascript
// Маленький подзаголовок
fontSize: isMobile ? SUBTITLE_SIZES.mobile.small : SUBTITLE_SIZES.desktop.small;
// Мобильный: "14px"
// Десктоп: "18px"

// Средний подзаголовок
fontSize: isMobile
  ? SUBTITLE_SIZES.mobile.medium
  : SUBTITLE_SIZES.desktop.medium;
// Мобильный: "16px"
// Десктоп: "20px"
```

#### Отступы между элементами

```javascript
// Между заголовком и подзаголовком
marginBottom: isMobile ? TITLE_SUBTITLE_GAP.mobile : TITLE_SUBTITLE_GAP.desktop;
// Мобильный: "8px"
// Десктоп: "16px"

// Между заголовком и контентом (фото/видео)
marginTop: isMobile ? TITLE_CONTENT_GAP.mobile : TITLE_CONTENT_GAP.desktop;
// Мобильный: "12px"
// Десктоп: "24px"

// Между элементами внутри блока
gap: isMobile ? BLOCK_INTERNAL_GAP.mobile : BLOCK_INTERNAL_GAP.desktop;
// Мобильный: "12px"
// Десктоп: "16px"

// Между основными элементами секции
gap: isMobile ? SECTION_INTERNAL_GAP.mobile : SECTION_INTERNAL_GAP.desktop;
// Мобильный: "32px"
// Десктоп: "48px"
```

#### Цвета

```javascript
backgroundColor: SECTION_BACKGROUND; // "#04141D"
color: TITLE_COLOR; // "#FFD700"
color: SUBTITLE_COLOR; // "rgba(255,255,255,0.9)"
color: SUBTITLE_COLOR_LIGHT; // "rgba(255,255,255,0.85)"
```

#### Максимальная ширина контента

```javascript
maxWidth: CONTENT_MAX_WIDTH.standard; // "1200px"
maxWidth: CONTENT_MAX_WIDTH.wide; // "1400px"
```

## Полный пример использования

```javascript
import {
  LOGO_OFFSET,
  SECTION_PADDING,
  TITLE_SIZES,
  SUBTITLE_SIZES,
  TITLE_SUBTITLE_GAP,
  TITLE_CONTENT_GAP,
  SECTION_BACKGROUND,
  TITLE_COLOR,
  SUBTITLE_COLOR,
  CONTENT_MAX_WIDTH,
} from "../../utils/spacing";

// Секция
<section
  style={{
    backgroundColor: SECTION_BACKGROUND,
    padding: isMobile ? SECTION_PADDING.mobile : SECTION_PADDING.desktop,
  }}
>
  {/* Контейнер */}
  <div
    style={{
      maxWidth: CONTENT_MAX_WIDTH.wide,
      paddingLeft: LOGO_OFFSET,
    }}
  >
    {/* Заголовок */}
    <h2
      style={{
        fontSize: isMobile ? TITLE_SIZES.mobile.main : TITLE_SIZES.desktop.main,
        color: TITLE_COLOR,
        marginBottom: isMobile
          ? TITLE_SUBTITLE_GAP.mobile
          : TITLE_SUBTITLE_GAP.desktop,
      }}
    >
      Заголовок
    </h2>

    {/* Подзаголовок */}
    <p
      style={{
        fontSize: isMobile
          ? SUBTITLE_SIZES.mobile.medium
          : SUBTITLE_SIZES.desktop.medium,
        color: SUBTITLE_COLOR,
      }}
    >
      Подзаголовок
    </p>

    {/* Контент */}
    <div
      style={{
        marginTop: isMobile
          ? TITLE_CONTENT_GAP.mobile
          : TITLE_CONTENT_GAP.desktop,
      }}
    >
      {/* Фото/видео */}
    </div>
  </div>
</section>;
```

## Изменение значений

Все значения можно изменить в одном месте - файле `src/utils/spacing.js`.
После изменения значения обновятся везде, где используются константы.

## Добавление новых констант

Если нужно добавить новую константу:

1. Откройте `src/utils/spacing.js`
2. Добавьте константу в соответствующую секцию
3. Добавьте комментарий с описанием использования
4. Импортируйте и используйте в нужных компонентах

Пример:

```javascript
// Отступы для кнопок
export const BUTTON_PADDING = {
  mobile: "14px 30px",
  desktop: "18px 40px",
};
```
