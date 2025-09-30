// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image', '@pinia/nuxt'],
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/style/main.scss'
  ],
  alias: {
    "~": "./app",
    "@": "./app"
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})