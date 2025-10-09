<template>
  <aside class="fixed inset-y-0 left-0 z-50 w-72 bg-[#5d5a96] text-white shadow-lg transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
    <!-- Header avec Logo et Titre -->
    <div class="flex items-center justify-center h-16 lg:h-20 px-4">
      <div class="flex items-center space-x-3 lg:space-x-4">
        <img 
          src="/images/logo.svg" 
          alt="Urbex Chronicles Logo" 
          class="h-10 w-10 lg:h-14 lg:w-14"
        />
        <h1 class="text-xl lg:text-2xl font-bold text-white">Urbex Chronicles</h1>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-6 lg:px-10 pt-16 lg:pt-28 pb-6 lg:pb-8 space-y-4 lg:space-y-6 overflow-y-auto h-[calc(100vh-120px)] lg:h-[calc(100vh-140px)]">
      <NuxtLink
        v-for="item in navigationItems"
        :key="item.name"
        :to="item.href"
        class="flex items-center px-3 lg:px-5 py-4 lg:py-6 text-sm lg:text-base font-medium rounded-xl transition-all duration-200"
        :style="{
          backgroundColor: 'rgba(221, 214, 222, 0.3)',
          color: isActiveRoute(item.href) ? '#ffe14d' : 'white'
        }"
      >
        <div 
          class="mr-3 lg:mr-4 h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center text-sm lg:text-base font-bold"
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
    <div class="pb-4 lg:pb-6">
      <div class="flex items-center justify-center">
        <button
          @click="setLanguage('fr')"
          class="px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors duration-200 w-12 lg:w-14 text-center"
          :class="currentLanguage === 'fr' ? 'text-white' : 'text-gray-400'"
        >
          FR
        </button>
        <span class="text-gray-400 text-base lg:text-lg mx-2 lg:mx-3">|</span>
        <button
          @click="setLanguage('en')"
          class="px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors duration-200 w-12 lg:w-14 text-center"
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
    href: '/admin/utilisateurs',
    icon: '👥' // Icône temporaire - sera remplacée
  },
  {
    name: 'Circuits',
    href: '/admin/circuits',
    icon: '📍' // Icône temporaire - sera remplacée
  },
  {
    name: 'Missions',
    href: '/admin/missions',
    icon: '🎯' // Icône temporaire - sera remplacée
  },
  {
    name: 'Succès',
    href: '/admin/success',
    icon: '🏆' // Icône temporaire - sera remplacée
  }
  // TODO: Ajouter Notifications et Tickets quand les pages seront créées
  // {
  //   name: 'Notifications',
  //   href: '/admin/notifications',
  //   icon: '🔔'
  // },
  // {
  //   name: 'Tickets',
  //   href: '/admin/tickets',
  //   icon: '🎫'
  // }
]

// Fonction pour vérifier si une route est active
const isActiveRoute = (href) => {
  if (href === '/') {
    // Pour la route racine, vérifier exactement la correspondance
    return route.path === '/'
  } else {
    // Pour les autres routes, utiliser la logique existante
    return route.path === href || route.path.startsWith(href + '/')
  }
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