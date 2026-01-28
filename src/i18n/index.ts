import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ruTranslations } from "@/data/translations/ru";

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ruTranslations,
    },
  },
  lng: "ru", // Default language
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;
