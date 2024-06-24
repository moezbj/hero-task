"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export enum Language {
  EN = "en",
  FR = "fr",
}

let leng = "";

if (typeof window !== "undefined") {
  window.navigator.languages.find((language) =>
    Object.values(Language).some((locale) => locale === language.slice(2))
  ) || "fr";
}

export const defaultLanguage = leng || "fr";

export const supportedLanguages = [
  { code: Language.EN, name: "English" },
  { code: Language.FR, name: "Français" },
];

i18n.use(initReactI18next);
