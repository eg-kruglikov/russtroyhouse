import { FALLBACK_IMAGE } from "../assets/fallbackImage";

export function handleImageError(e) {
  const img = e.currentTarget;
  const originalSrc =
    img.getAttribute("data-original-src") || img.getAttribute("src") || "";

  // Пробуем альтернативы регистра для jpg/jpeg
  if (/\.(jpe?g)$/i.test(originalSrc)) {
    const base = originalSrc.replace(/\.(jpe?g)$/i, "");

    // 1) Попробовать верхний регистр .JPG
    if (!img.dataset.triedUpperJpg) {
      img.dataset.triedUpperJpg = "1";
      img.onerror = handleImageError; // оставить обработчик для следующего шага
      img.src = `${base}.JPG`;
      return;
    }

    // 2) Попробовать нижний регистр .jpg
    if (!img.dataset.triedLowerJpg) {
      img.dataset.triedLowerJpg = "1";
      img.onerror = handleImageError;
      img.src = `${base}.jpg`;
      return;
    }
  }

  // Последний шаг — показать инлайн плейсхолдер и остановить цикл
  img.onerror = null;
  img.src = FALLBACK_IMAGE;
}
