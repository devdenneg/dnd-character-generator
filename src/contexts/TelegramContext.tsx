import { createContext, useContext, ReactNode } from "react";
import { useTelegram } from "@/hooks/useTelegram";

interface TelegramContextType {
  tg: ReturnType<typeof useTelegram>["tg"];
  user: ReturnType<typeof useTelegram>["user"];
  isTelegramWebApp: boolean;
  isTelegramReady: boolean;
  colorScheme: "light" | "dark";
  themeParams: ReturnType<typeof useTelegram>["themeParams"];
}

const TelegramContext = createContext<TelegramContextType | null>(null);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const telegram = useTelegram();

  return (
    <TelegramContext.Provider value={telegram}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegramContext() {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error("useTelegramContext must be used within TelegramProvider");
  }
  return context;
}

export function useTelegramOptional() {
  return useContext(TelegramContext);
}
