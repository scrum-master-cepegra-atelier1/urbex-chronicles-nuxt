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
  app: {
    head: {
      title: 'Urbex Chronicles',
      titleTemplate: '%s - CMS',
      meta: [
        { name: 'description', content: 'Système de gestion de contenu pour Urbex Chronicles' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' },
        { rel: 'apple-touch-icon', href: '/images/logo.svg' }
      ]
    }
  }
})