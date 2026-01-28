// Custom translation hook with auto-translation support
import { useState, useCallback } from "react";
import { useTranslation as useI18nTranslation } from "react-i18next";
import { translateText } from "@/api/translate";

interface UseTranslationReturn {
  t: (key: string) => string;
  translateAsync: (text: string) => Promise<string>;
  isTranslating: boolean;
}

// Cache for auto-translated texts
const autoTranslationCache = new Map<string, string>();

export function useTranslation(): UseTranslationReturn {
  const { t } = useI18nTranslation();
  const [isTranslating, setIsTranslating] = useState(false);

  const translateAsync = useCallback(async (text: string): Promise<string> => {
    // Check cache first
    if (autoTranslationCache.has(text)) {
      return autoTranslationCache.get(text)!;
    }

    setIsTranslating(true);
    try {
      const translated = await translateText(text, "en", "ru");
      autoTranslationCache.set(text, translated);
      return translated;
    } finally {
      setIsTranslating(false);
    }
  }, []);

  return {
    t,
    translateAsync,
    isTranslating,
  };
}

// Hook for translating multiple texts at once
export function useAutoTranslate() {
  const [translations, setTranslations] = useState<Map<string, string>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const translateTexts = useCallback(async (texts: string[]): Promise<void> => {
    const textsToTranslate = texts.filter(
      (text) => !autoTranslationCache.has(text),
    );

    if (textsToTranslate.length === 0) {
      // All texts are cached
      const cached = new Map<string, string>();
      texts.forEach((text) => {
        if (autoTranslationCache.has(text)) {
          cached.set(text, autoTranslationCache.get(text)!);
        }
      });
      setTranslations(cached);
      return;
    }

    setIsLoading(true);
    try {
      await Promise.all(
        textsToTranslate.map(async (text) => {
          const translated = await translateText(text, "en", "ru");
          autoTranslationCache.set(text, translated);
          return { original: text, translated };
        }),
      );

      const newTranslations = new Map<string, string>();
      texts.forEach((text) => {
        if (autoTranslationCache.has(text)) {
          newTranslations.set(text, autoTranslationCache.get(text)!);
        }
      });
      setTranslations(newTranslations);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTranslation = useCallback(
    (text: string): string => {
      return translations.get(text) || autoTranslationCache.get(text) || text;
    },
    [translations],
  );

  return {
    translateTexts,
    getTranslation,
    isLoading,
  };
}
