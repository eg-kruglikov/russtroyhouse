// Simple global sound state for videos (Instagram-like behavior)
// - Default: muted
// - When user enables sound once, all videos should play with sound

const STORAGE_KEY = "globalVideoSoundEnabled";

// Lightweight pub/sub to notify listeners across components
const subscribers = new Set();

function getInitial() {
  if (typeof window === "undefined") return false;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "1";
  } catch (_) {
    return false;
  }
}

let soundEnabled = getInitial();

export function isGlobalVideoSoundEnabled() {
  return soundEnabled;
}

export function enableGlobalVideoSound() {
  if (soundEnabled) return;
  soundEnabled = true;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "1");
    }
  } catch (_) {}
  subscribers.forEach((cb) => {
    try {
      cb(soundEnabled);
    } catch (_) {}
  });
}

export function disableGlobalVideoSound() {
  if (!soundEnabled) return;
  soundEnabled = false;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "0");
    }
  } catch (_) {}
  subscribers.forEach((cb) => {
    try {
      cb(soundEnabled);
    } catch (_) {}
  });
}

export function subscribeGlobalVideoSound(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

// React hook helper
import { useEffect, useState } from "react";
export function useGlobalVideoSound() {
  const [enabled, setEnabled] = useState(isGlobalVideoSoundEnabled());
  useEffect(() => subscribeGlobalVideoSound(setEnabled), []);
  return [enabled, enableGlobalVideoSound];
}

