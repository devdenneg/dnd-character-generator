import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    chat_instance?: string;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setParams: (params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }) => void;
  };
  HapticFeedback: {
    impactOccurred: (
      style: "light" | "medium" | "heavy" | "rigid" | "soft",
    ) => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  sendData: (data: string) => void;
  openLink: (url: string) => void;
  openTelegramLink: (url: string) => void;
  showPopup: (
    params: {
      title?: string;
      message: string;
      buttons?: Array<{
        id?: string;
        type?: "default" | "ok" | "close" | "cancel" | "destructive";
        text?: string;
      }>;
    },
    callback?: (buttonId: string) => void,
  ) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (
    message: string,
    callback?: (confirmed: boolean) => void,
  ) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export function useTelegram() {
  const [tg] = useState<TelegramWebApp | null>(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      return window.Telegram.WebApp;
    }
    return null;
  });

  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isTelegramReady, setIsTelegramReady] = useState(false);

  useEffect(() => {
    if (tg) {
      // Инициализация Telegram WebApp
      tg.ready();
      tg.expand();

      // Получаем данные пользователя
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }

      setIsTelegramReady(true);

      // Применяем тему Telegram
      document.documentElement.style.setProperty(
        "--tg-theme-bg-color",
        tg.themeParams.bg_color || "#ffffff",
      );
      document.documentElement.style.setProperty(
        "--tg-theme-text-color",
        tg.themeParams.text_color || "#000000",
      );
      document.documentElement.style.setProperty(
        "--tg-theme-hint-color",
        tg.themeParams.hint_color || "#999999",
      );
      document.documentElement.style.setProperty(
        "--tg-theme-link-color",
        tg.themeParams.link_color || "#2481cc",
      );
      document.documentElement.style.setProperty(
        "--tg-theme-button-color",
        tg.themeParams.button_color || "#2481cc",
      );
      document.documentElement.style.setProperty(
        "--tg-theme-button-text-color",
        tg.themeParams.button_text_color || "#ffffff",
      );
      document.documentElement.style.setProperty(
        "--tg-theme-secondary-bg-color",
        tg.themeParams.secondary_bg_color || "#f4f4f4",
      );
    }
  }, [tg]);

  return {
    tg,
    user,
    isTelegramReady,
    isTelegramWebApp: !!tg,
    colorScheme: tg?.colorScheme || "light",
    themeParams: tg?.themeParams || {},
  };
}
