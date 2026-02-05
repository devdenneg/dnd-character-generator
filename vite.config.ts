import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

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
  server: {
    proxy: {
      "/uploads": {
        target: "https://dndgenerator.fun",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
