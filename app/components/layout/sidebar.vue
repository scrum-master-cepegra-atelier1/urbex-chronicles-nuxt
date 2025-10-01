<template>
  <aside class="fixed inset-y-0 left-0 z-50 w-72 bg-[#5d5a96] text-white shadow-lg">
    <!-- Header avec Logo et Titre -->
    <div class="flex items-center justify-center h-20 ">
      <div class="flex items-center space-x-4">
        <img 
          src="/images/logo.svg" 
          alt="Urbex Chronicles Logo" 
          class="h-14 w-14"
        />
        <h1 class="text-2xl font-bold text-white">Urbex Chronicles</h1>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-10 pt-28 pb-8 space-y-6 overflow-y-auto h-[calc(100vh-140px)]">
      <NuxtLink
        v-for="item in navigationItems"
        :key="item.name"
        :to="item.href"
        class="flex items-center px-5 py-6 text-base font-medium rounded-xl transition-all duration-200"
        :style="{
          backgroundColor: 'rgba(221, 214, 222, 0.3)',
          color: isActiveRoute(item.href) ? '#ffe14d' : 'white'
        }"
      >
        <div 
          class="mr-4 h-6 w-6 flex items-center justify-center text-base font-bold"
          :style="{
            color: isActiveRoute(item.href) ? '#ffe14d' : 'white'
          }"
        >
          {{ item.icon }}
        </div>
        {{ item.name }}
      </NuxtLink>
    </nav>

    <!-- Sélecteur de langue en bas -->
    <div>
      <div class="flex items-center justify-center">
        <button
          @click="setLanguage('fr')"
          class="px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 w-14 text-center"
          :class="currentLanguage === 'fr' ? 'text-white' : 'text-gray-400'"
        >
          FR
        </button>
        <span class="text-gray-400 text-lg mx-3">|</span>
        <button
          @click="setLanguage('en')"
          class="px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 w-14 text-center"
          :class="currentLanguage === 'en' ? 'text-white' : 'text-gray-400'"
        >
          ENG
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// État actuel de la langue
const currentLanguage = ref('fr')

// Route actuelle pour la navigation active
const route = useRoute()

// Éléments de navigation
const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: '📊' // Icône temporaire - sera remplacée
  },
  {
    name: 'Utilisateurs',
    href: '/admin/users',
    icon: '👥' // Icône temporaire - sera remplacée
  },
  {
    name: 'Spots urbex',
    href: '/admin/spots',
    icon: '📍' // Icône temporaire - sera remplacée
  },
  {
    name: 'Missions',
    href: '/admin/missions',
    icon: '🎯' // Icône temporaire - sera remplacée
  },
  {
    name: 'Success',
    href: '/admin/success',
    icon: '🏆' // Icône temporaire - sera remplacée
  },
  {
    name: 'Notifications',
    href: '/admin/notifications',
    icon: '🔔' // Icône temporaire - sera remplacée
  },
  {
    name: 'Tickets',
    href: '/admin/tickets',
    icon: '🎫' // Icône temporaire - sera remplacée
  }
]

// Fonction pour vérifier si une route est active
const isActiveRoute = (href) => {
  let isActive
  if (href === '/') {
    // Pour la route racine, vérifier exactement la correspondance
    isActive = route.path === '/'
  } else {
    // Pour les autres routes, utiliser la logique existante
    isActive = route.path === href || route.path.startsWith(href + '/')
  }
  console.log(`Route actuelle: ${route.path}, href: ${href}, active: ${isActive}`)
  return isActive
}

// Fonction pour changer la langue
const setLanguage = (lang) => {
  currentLanguage.value = lang
  // TODO: Implémenter le système de traduction plus tard
  console.log(`Langue changée vers: ${lang}`)
}
</script>

<style scoped>
/* Plus besoin de CSS personnalisé - tout est géré par Tailwind ! */
</style>