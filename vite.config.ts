import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],
  // Используем корневой путь для собственного сервера (Beget)
  // Для GitHub Pages нужно установить VITE_BASE_PATH=/dnd-character-generator/
  base: process.env.VITE_BASE_PATH || "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
