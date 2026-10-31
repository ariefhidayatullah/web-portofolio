"use client";

import { useSyncExternalStore } from "react";
import { dict, type Lang } from "@/data/i18n";

// Chosen language lives in localStorage; every component reading it re-renders on change.
const KEY = "lang";
const listeners = new Set<() => void>();

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const read = (): Lang => (localStorage.getItem(KEY) === "id" ? "id" : "en");

export function setLang(lang: Lang) {
  localStorage.setItem(KEY, lang);
  listeners.forEach((cb) => cb());
}

// Server and hydration render English; a saved "id" switches right after.
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "en");
}

export function useT() {
  return dict[useLang()];
}

// "2022-12" -> "Dec 2022" / "Des 2022"; "Present" -> "Present" / "Sekarang"
export function formatMonth(value: string, lang: Lang) {
  if (value === "Present") return dict[lang].experience.present;
  const [y, m] = value.split("-").map(Number);
  return new Date(y, m - 1).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
    month: "short",
    year: "numeric",
  });
}
