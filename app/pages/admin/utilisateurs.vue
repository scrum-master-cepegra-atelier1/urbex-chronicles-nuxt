<template>
  <!-- Sidebar: Position fixe -->
  <LayoutSidebar />
  <!-- TopBar: Position fixe -->
  <LayoutTopBar />
  
  <!-- Contenu principal -->
  <main class="pl-5 ml-0 lg:ml-72 mt-16 me-16 lg:mt-20 min-h-screen bg-white">
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Page Title -->
      <div class="mb-12 flex-shrink-0">
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Utilisateurs</h1>
      </div>
      
      <div class="flex-1 flex flex-col overflow-hidden ml-8">
        
        <!-- Stats Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
            <!-- Total utilisateurs -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalUsers }}</div>
              <div class="text-base lg:text-lg text-gray-600">Utilisateurs en ligne</div>
            </div>

            <!-- Nouveaux utilisateurs -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ newUsers }}</div>
              <div class="text-base lg:text-lg text-gray-600">Nouveaux utilisateurs</div>
            </div>
          </div>
        </div>

        <!-- Users Management Table -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">Gestion des utilisateurs</h2>
            <div class="flex space-x-3">
              <button
                @click="testStrapi"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Test Strapi
              </button>
              <button
                @click="refreshUsers"
                :disabled="loading"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                {{ loading ? 'Chargement...' : 'Actualiser' }}
              </button>
            </div>
          </div>

          <!-- Message d'erreur -->
          <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <strong>Erreur de connexion :</strong>
            </div>
            <p class="mt-1">{{ error }}</p>
            <div class="mt-2 text-sm">
              <p><strong>Solutions possibles :</strong></p>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Vérifiez que Strapi est démarré : <code class="bg-red-200 px-1 rounded">npm run develop</code></li>
                <li>Connectez-vous en tant qu'administrateur dans Strapi : <code class="bg-red-200 px-1 rounded">http://localhost:1337/admin</code></li>
                <li>Vérifiez que votre token admin est valide (reconnectez-vous si nécessaire)</li>
              </ul>
            </div>
          </div>

          <!-- Message si aucun utilisateur -->
          <div v-if="!loading && !error && users.length === 0" class="mb-4 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="text-center">
              <svg class="w-12 h-12 mx-auto text-yellow-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 18.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <h3 class="text-lg font-medium text-yellow-800 mb-1">Aucun utilisateur trouvé</h3>
              <p class="text-yellow-700">
                Aucun utilisateur n'est enregistré dans votre base de données Strapi.
                <br>Créez des utilisateurs dans l'interface d'administration de Strapi.
              </p>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Table Header -->
            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <div class="grid grid-cols-6 gap-6 text-base font-medium text-gray-700">
                <div>Nom d'utilisateur</div>
                <div>Adresse email</div>
                <div>Statut</div>
                <div>Rôle</div>
                <div>Expérience</div>
                <div>Actions</div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="max-h-96 overflow-y-auto">
              <!-- Loading skeleton -->
              <div v-if="loading" class="px-6 py-6">
                <div class="animate-pulse space-y-4">
                  <div v-for="n in 3" :key="n" class="grid grid-cols-6 gap-6">
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <!-- Users list -->
              <div 
                v-else
                v-for="user in users" 
                :key="user.id"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-6 gap-6 items-center text-base">
                  <div class="text-gray-900 font-medium">{{ user.username || 'N/A' }}</div>
                  <div class="text-gray-600">{{ user.email || 'N/A' }}</div>
                  <div class="flex items-center">
                    <span :class="getStatusBadgeClass(user)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ getUserStatus(user) }}
                    </span>
                  </div>
                  <div class="text-gray-700">{{ getUserRole(user) }}</div>
                  <div class="flex items-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ getUserExperience(user) }} XP
                    </span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="editUser(user)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2"
                      title="Modifier"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="handleDeleteUser(user.documentId || user.id)"
                      class="text-red-600 hover:text-red-800 transition-colors duration-200 p-2"
                      title="Supprimer"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </main>
  
  <!-- Modal d'édition d'utilisateur -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Modifier l'utilisateur</h3>
        <button @click="cancelEdit" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Formulaire d'édition -->
      <div v-if="editingUser" class="space-y-4">
        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur</label>
          <input 
            v-model="editingUser.username"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Nom d'utilisateur (min. 3 caractères)"
            required
          />
        </div>
        
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            v-model="editingUser.email"
            type="email" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            required
          />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <!-- Experience -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Expérience</label>
            <input 
              v-model="editingUser.experience"
              type="number" 
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Points d'expérience"
            />
          </div>
          
          <!-- Status toggles -->
          <div class="space-y-3">
            <div class="flex items-center">
              <input 
                v-model="editingUser.confirmed"
                type="checkbox" 
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">Compte confirmé</label>
            </div>
            
            <div class="flex items-center">
              <input 
                v-model="editingUser.blocked"
                type="checkbox" 
                class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">Compte bloqué</label>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            @click="cancelEdit"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            @click="saveEditUser"
            :disabled="!editingUser.email"
            :class="editingUser.email ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Meta de la page
definePageMeta({
  title: 'Utilisateurs'
})

// Head configuration
useHead({
  title: 'Utilisateurs',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect', 
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Freeman&display=swap'
    }
  ]
})

// Utilisation du composable pour la gestion des utilisateurs
const { 
  users, 
  loading, 
  error, 
  fetchUsers, 
  updateUser,
  deleteUser,
  testConnection,
  getUserRole,
  getUserStatus,
  getUserExperience
} = await useUsers()

// Chargement initial des utilisateurs
await fetchUsers()

// États pour la modal d'édition
const showEditModal = ref(false)
const editingUser = ref(null)

// Computed properties
const totalUsers = computed(() => users.value.length)
const newUsers = computed(() => {
  // Calculer les nouveaux utilisateurs (par exemple, créés dans les 30 derniers jours)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  return users.value.filter(user => {
    if (user.createdAt) {
      return new Date(user.createdAt) > thirtyDaysAgo
    }
    return false
  }).length
})

// Fonctions d'aide pour l'affichage cohérent selon le schéma Strapi
const getStatusBadgeClass = (user) => {
  if (user.blocked) return 'bg-red-100 text-red-800'
  if (!user.confirmed) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

// Fonctions pour les actions utilisateur
const editUser = (user) => {
  editingUser.value = { 
    ...user,
    // Normaliser les champs pour l'édition selon le schéma réel
    username: user.username || '',
    email: user.email || '',
    experience: user.experience || 0,
    confirmed: user.confirmed !== undefined ? user.confirmed : true,
    blocked: user.blocked !== undefined ? user.blocked : false
  }
  showEditModal.value = true
}

const saveEditUser = async () => {
  if (!editingUser.value) return
  
  try {
    // Préparer les données selon le schéma Strapi réel
    const userData = {
      username: editingUser.value.username,
      email: editingUser.value.email,
      experience: parseInt(editingUser.value.experience) || 0,
      confirmed: editingUser.value.confirmed,
      blocked: editingUser.value.blocked
    }
    
    // Utiliser documentId pour Strapi v5
    const userIdToUse = editingUser.value.documentId || editingUser.value.id
    console.log('🔄 Sauvegarde utilisateur avec ID:', userIdToUse, 'et données:', userData)
    
    await updateUser(userIdToUse, userData)
    
    console.log('✅ Utilisateur mis à jour avec succès')
    
    // Fermer la modal
    showEditModal.value = false
    editingUser.value = null
    
    // PAS de refresh automatique - le composable met à jour localement
    
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour de l\'utilisateur:', err)
    // Afficher un message d'erreur à l'utilisateur
    alert('Erreur lors de la mise à jour. Vérifiez vos permissions et réessayez.')
  }
}

const cancelEdit = () => {
  showEditModal.value = false
  editingUser.value = null
}

const handleDeleteUser = async (userId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    const success = await deleteUser(userId)
    if (!success && error.value) {
      // Afficher l'erreur pendant 5 secondes
      setTimeout(() => {
        error.value = null
      }, 5000)
    }
  }
}

const refreshUsers = async () => {
  await fetchUsers()
}

const testStrapi = async () => {
  await testConnection()
}
</script>

<style>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
}
</style>