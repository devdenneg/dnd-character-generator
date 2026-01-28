// Translation API Client
// Uses LibreTranslate (free, self-hosted or public instances)

const LIBRE_TRANSLATE_URL = "https://libretranslate.com/translate";

interface TranslateResponse {
  translatedText: string;
}

// Simple in-memory cache for translations
const translationCache = new Map<string, string>();

export async function translateText(
  text: string,
  sourceLang: string = "en",
  targetLang: string = "ru",
): Promise<string> {
  // Check cache first
  const cacheKey = `${sourceLang}:${targetLang}:${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(LIBRE_TRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      }),
    });

    if (!response.ok) {
      console.warn("Translation API error, returning original text");
      return text;
    }

    const data: TranslateResponse = await response.json();
    const translated = data.translatedText;

    // Cache the result
    translationCache.set(cacheKey, translated);

    return translated;
  } catch (error) {
    console.warn("Translation failed, returning original text:", error);
    return text;
  }
}

// Batch translate multiple texts
export async function translateBatch(
  texts: string[],
  sourceLang: string = "en",
  targetLang: string = "ru",
): Promise<string[]> {
  const results = await Promise.all(
    texts.map((text) => translateText(text, sourceLang, targetLang)),
  );
  return results;
}

// Clear translation cache (useful for testing)
export function clearTranslationCache(): void {
  translationCache.clear();
}
