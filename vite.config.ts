import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['dndg.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'D&D Character Generator',
        short_name: 'D&D Gen',
        description: 'Генератор персонажей D&D 5e (2024)',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,ttf,json}']
      }
    })
  ],
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
