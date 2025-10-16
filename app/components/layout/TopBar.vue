<template>
  <header class="fixed top-0 left-0 lg:left-72 right-0 z-40 bg-white px-4 sm:px-6 py-3 sm:py-4">
    <div class="flex items-center justify-between sm:justify-end">
      <!-- Menu hamburger pour mobile (à ajouter plus tard) -->
      <button class="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Barre de recherche avec profil utilisateur -->
      <div class="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 rounded-lg" style="background-color: rgba(217, 217, 217, 0.2);">
        <!-- Icône de recherche et input -->
        <div class="relative flex-1 w-32 sm:w-auto sm:max-w-xs">
          <div class="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Recherchez"
            class="block w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 rounded-lg leading-5 bg-rgba(217, 217, 217, 0.2) placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-blue-500 text-xs sm:text-sm"
          />
        </div>

        <!-- Profil utilisateur -->
        <div class="relative">
          <button 
            @click="toggleUserMenu"
            class="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
          >
            <!-- Avatar utilisateur -->
            <div class="w-7 h-7 sm:w-8 sm:h-8 bg-[#5d5a96] rounded-full flex items-center justify-center">
              <span class="text-white text-xs sm:text-sm font-medium">{{ userInitial }}</span>
            </div>
          </button>

          <!-- Menu déroulant -->
          <div 
            v-show="isUserMenuOpen" 
            class="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <div class="py-1">
              <!-- En-tête du menu avec info utilisateur -->
              <div class="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                <p class="text-xs sm:text-sm font-medium text-gray-900 truncate">
                  {{ isLoadingUser ? 'Chargement...' : user.nom }}
                </p>
                <p class="text-xs sm:text-sm text-gray-500 truncate">
                  {{ isLoadingUser ? '...' : user.email }}
                </p>
              </div>
              
              <!-- Options du menu -->
              <button
                @click="goToProfile"
                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Mon Profil
              </button>
              
              <button
                @click="goToSettings"
                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Paramètres
              </button>
              
              <div class="border-t border-gray-100 mt-1">
                <button
                  @click="logout"
                  class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// États réactifs
const searchQuery = ref('')
const isUserMenuOpen = ref(false)
const user = ref({
  nom: '',
  email: ''
})
const isLoadingUser = ref(true)

// Computed pour afficher l'initiale de l'utilisateur
const userInitial = computed(() => {
  return user.value.nom ? user.value.nom.charAt(0).toUpperCase() : 'A'
})

// Fonction pour récupérer les données utilisateur depuis le localStorage (AuthService)
const fetchUserData = async () => {
  try {
    isLoadingUser.value = true
    
    // Vérifier si on est côté client
    if (!process.client) {
      return
    }

    // Récupérer les données depuis localStorage (Laravel)
    const token = localStorage.getItem('laravel_admin_token')
    const userDataRaw = localStorage.getItem('laravel_admin_user')
    
    if (!token || !userDataRaw) {
      console.warn('Aucune donnée d\'authentification trouvée')
      await router.push('/login')
      return
    }

    try {
      const userData = JSON.parse(userDataRaw)
      user.value = {
        nom: userData.firstname || userData.username || userData.email || 'Admin',
        email: userData.email || 'admin@urbexchronicles.com'
      }
      console.log('Données utilisateur récupérées:', user.value)
    } catch (parseError) {
      console.error('Erreur de parsing des données utilisateur:', parseError)
      await router.push('/login')
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error)
    user.value = { nom: '', email: '' }
  } finally {
    isLoadingUser.value = false
  }
}

// Fonction pour toggle le menu utilisateur
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// Fermer le menu si on clique ailleurs
const closeMenuOnClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isUserMenuOpen.value = false
  }
}

// Navigation vers le profil
const goToProfile = () => {
  isUserMenuOpen.value = false
  router.push('/admin/profile')
  console.log('Navigation vers le profil')
}

// Navigation vers les paramètres
const goToSettings = () => {
  isUserMenuOpen.value = false
  router.push('/admin/settings')
  console.log('Navigation vers les paramètres')
}

// Fonction de déconnexion
const logout = async () => {
  isUserMenuOpen.value = false
  try {
    // Nettoyer le localStorage (Laravel)
    if (process.client) {
      localStorage.removeItem('laravel_admin_token')
      localStorage.removeItem('laravel_admin_user') 
      localStorage.removeItem('laravel_admin_token_expiry')
    }
    console.log('Déconnexion réussie')
    await router.push('/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    // Forcer la redirection même en cas d'erreur
    window.location.href = '/login'
  }
}

// Fonction de recherche (optionnelle pour plus tard)
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Recherche:', searchQuery.value)
    // TODO: Implémenter la logique de recherche
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', closeMenuOnClickOutside)
  fetchUserData()
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnClickOutside)
})

// Exposer les fonctions
defineExpose({
  searchQuery,
  logout,
  user
})
</script>

<style scoped>
/* Animations pour le menu déroulant */
.relative div[v-show] {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>