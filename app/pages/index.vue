<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <LayoutSidebar />
    
    <!-- Contenu principal -->
    <div class="flex-1 lg:ml-72">
      <!-- TopBar -->
      <LayoutTopBar />
      <!-- Contenu du dashboard -->
      <main class="p-4 sm:p-6 lg:p-8">
        <!-- Section de bienvenue -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4">Bienvenue dans votre espace d'administration</h2>
          <p class="text-base sm:text-lg lg:text-xl opacity-90">
            Interface de gestion de contenu pour votre application d'exploration urbaine.
          </p>
        </div>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border">
          <div class="flex items-center">
            <div class="bg-blue-100 p-2 lg:p-3 rounded-lg">
              <div class="w-4 h-4 lg:w-6 lg:h-6 bg-blue-500 rounded"></div>
            </div>
            <div class="ml-3 lg:ml-4">
              <div class="text-lg lg:text-2xl font-bold text-gray-900">{{ stats.missions }}</div>
              <div class="text-xs lg:text-sm text-gray-500">Missions</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border">
          <div class="flex items-center">
            <div class="bg-green-100 p-2 lg:p-3 rounded-lg">
              <div class="w-4 h-4 lg:w-6 lg:h-6 bg-green-500 rounded"></div>
            </div>
            <div class="ml-3 lg:ml-4">
              <div class="text-lg lg:text-2xl font-bold text-gray-900">{{ stats.fragments }}</div>
              <div class="text-xs lg:text-sm text-gray-500">Fragments</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border">
          <div class="flex items-center">
            <div class="bg-yellow-100 p-2 lg:p-3 rounded-lg">
              <div class="w-4 h-4 lg:w-6 lg:h-6 bg-yellow-500 rounded"></div>
            </div>
            <div class="ml-3 lg:ml-4">
              <div class="text-lg lg:text-2xl font-bold text-gray-900">{{ stats.locations }}</div>
              <div class="text-xs lg:text-sm text-gray-500">Lieux</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border">
          <div class="flex items-center">
            <div class="bg-purple-100 p-2 lg:p-3 rounded-lg">
              <div class="w-4 h-4 lg:w-6 lg:h-6 bg-purple-500 rounded"></div>
            </div>
            <div class="ml-3 lg:ml-4">
              <div class="text-lg lg:text-2xl font-bold text-gray-900">{{ stats.users }}</div>
              <div class="text-xs lg:text-sm text-gray-500">Utilisateurs</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modules de gestion -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        
        <!-- Module Missions -->
        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div class="flex items-center mb-3 lg:mb-4">
            <div class="bg-blue-500 text-white p-2 lg:p-3 rounded-lg">
              <div class="w-6 h-6 lg:w-8 lg:h-8 bg-white bg-opacity-20 rounded"></div>
            </div>
            <h3 class="ml-3 lg:ml-4 text-base lg:text-lg font-semibold text-gray-900">Missions</h3>
          </div>
          <p class="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4">Créer et gérer les missions d'exploration urbaine</p>
          <button 
            @click="navigateToModule('admin/missions')"
            class="w-full bg-blue-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm lg:text-base"
          >
            Gérer les missions →
          </button>
        </div>

        <!-- Module Fragments -->
        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div class="flex items-center mb-3 lg:mb-4">
            <div class="bg-green-500 text-white p-2 lg:p-3 rounded-lg">
              <div class="w-6 h-6 lg:w-8 lg:h-8 bg-white bg-opacity-20 rounded"></div>
            </div>
            <h3 class="ml-3 lg:ml-4 text-base lg:text-lg font-semibold text-gray-900">Fragments</h3>
          </div>
          <p class="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4">Gérer les fragments d'information et indices</p>
          <button 
            @click="navigateToModule('admin/fragments')"
            class="w-full bg-green-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm lg:text-base"
          >
            Gérer les fragments →
          </button>
        </div>

        <!-- Module Lieux -->
        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div class="flex items-center mb-3 lg:mb-4">
            <div class="bg-yellow-500 text-white p-2 lg:p-3 rounded-lg">
              <div class="w-6 h-6 lg:w-8 lg:h-8 bg-white bg-opacity-20 rounded"></div>
            </div>
            <h3 class="ml-3 lg:ml-4 text-base lg:text-lg font-semibold text-gray-900">Lieux</h3>
          </div>
          <p class="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4">Cartographier les lieux d'exploration urbaine</p>
          <button 
            @click="navigateToModule('admin/locations')"
            class="w-full bg-yellow-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm lg:text-base"
          >
            Gérer les lieux →
          </button>
        </div>

        <!-- Module Utilisateurs -->
        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div class="flex items-center mb-3 lg:mb-4">
            <div class="bg-purple-500 text-white p-2 lg:p-3 rounded-lg">
              <div class="w-6 h-6 lg:w-8 lg:h-8 bg-white bg-opacity-20 rounded"></div>
            </div>
            <h3 class="ml-3 lg:ml-4 text-base lg:text-lg font-semibold text-gray-900">Utilisateurs</h3>
          </div>
          <p class="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4">Gérer les comptes et permissions des explorateurs</p>
          <button 
            @click="navigateToModule('admin/users')"
            class="w-full bg-purple-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm lg:text-base"
          >
            Gérer les utilisateurs →
          </button>
        </div>

        <!-- Module Médias -->
        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div class="flex items-center mb-3 lg:mb-4">
            <div class="bg-pink-500 text-white p-2 lg:p-3 rounded-lg">
              <div class="w-6 h-6 lg:w-8 lg:h-8 bg-white bg-opacity-20 rounded"></div>
            </div>
            <h3 class="ml-3 lg:ml-4 text-base lg:text-lg font-semibold text-gray-900">Médias</h3>
          </div>
          <p class="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4">Bibliothèque de photos, vidéos et documents</p>
          <button 
            @click="navigateToModule('admin/media')"
            class="w-full bg-pink-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm lg:text-base"
          >
            Gérer les médias →
          </button>
        </div>

        <!-- Module Analytics -->
        <div class="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div class="flex items-center mb-3 lg:mb-4">
            <div class="bg-indigo-500 text-white p-2 lg:p-3 rounded-lg">
              <div class="w-6 h-6 lg:w-8 lg:h-8 bg-white bg-opacity-20 rounded"></div>
            </div>
            <h3 class="ml-3 lg:ml-4 text-base lg:text-lg font-semibold text-gray-900">Analytics</h3>
          </div>
          <p class="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4">Statistiques d'utilisation et performances</p>
          <button 
            @click="navigateToModule('admin/analytics')"
            class="w-full bg-indigo-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors text-sm lg:text-base"
          >
            Voir les statistiques →
          </button>
        </div>
        </div>

      </main>
    </div>
  </div>
</template><script setup>
// Meta de la page
definePageMeta({
  title: 'Dashboard - Urbex Chronicles CMS'
})

// Head configuration
useHead({
  title: 'Dashboard - Urbex Chronicles CMS'
})

// Router
const router = useRouter()

// État réactif
const stats = ref({
  missions: 12,
  fragments: 45,
  locations: 8,
  users: 156
})

// Méthodes
const navigateToModule = (path) => {
  console.log(`Navigation vers: /${path}`)
  // router.push(`/${path}`)
}
</script>
