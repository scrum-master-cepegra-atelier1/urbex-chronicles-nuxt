<template>
  <!-- Sidebar: Position fixe -->
  <LayoutSidebar />
  <!-- TopBar: Position fixe -->
  <LayoutTopBar />
  
  <!-- Contenu principal -->
  <main class="pl-5 ml-0 lg:ml-72 mt-16 me-16 lg:mt-20 min-h-screen bg-white">
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Page Title -->
      <UiPageHeader
        title="Utilisateurs"
        subtitle="Gestion des comptes utilisateurs"
        size="lg"
        spacing="loose"
      />
      
      <div class="flex-1 flex flex-col overflow-hidden ml-8">
        
        <!-- Stats Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 me-32">
            
            <!-- Total utilisateurs -->
            <div class="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200 h-full flex flex-col justify-between">
              <div>
                <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                  {{ loading ? '...' : totalUsers }}
                </div>
                <div class="text-base lg:text-lg text-gray-600 leading-tight">Total<br>utilisateurs</div>
              </div>
            </div>

            <!-- Utilisateurs actifs -->
            <div class="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200 h-full flex flex-col justify-between">
              <div>
                <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                  {{ loading ? '...' : activeUsers }}
                </div>
                <div class="text-base lg:text-lg text-gray-600 leading-tight">Utilisateurs<br>actifs</div>
              </div>
              <div class="text-xs text-gray-500 mt-4">Confirmés et non bloqués</div>
            </div>
            
            <!-- Utilisateurs en mission -->
            <div class="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200 h-full flex flex-col justify-between">
              <div>
                <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                  {{ loading ? '...' : usersInMission }}
                </div>
                <div class="text-base lg:text-lg text-gray-600 leading-tight">En<br>mission</div>
              </div>
              <div class="text-xs text-gray-500 mt-4">Activité en cours</div>
            </div>
            
            <!-- XP total -->
            <div class="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200 h-full flex flex-col justify-between">
              <div>
                <div class="text-3xl lg:text-4xl font-bold text-gray-900 mb-3" style="font-family: 'Freeman', sans-serif;">
                  {{ loading ? '...' : totalExperience.toLocaleString('fr-FR') }}
                </div>
                <div class="text-base lg:text-lg text-gray-600 leading-tight">XP<br>total</div>
              </div>
              <div class="text-xs text-gray-500 mt-4">Expérience cumulée</div>
            </div>
            
          </div>
        </div>

        <!-- Users Management Table -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">Gestion des utilisateurs</h2>
            <div class="flex items-center space-x-4">
              <UiFilterOverlay
                page-title="les utilisateurs"
                :filters="{ searchTerm, selectedConfirmed, selectedBlocked, selectedRole, selectedExperience, selectedAvatar }"
                :active-filters-count="activeFiltersCount"
                @update:filters="updateFilters"
                @reset="resetFilters"
              >
                <template #default="{ filters, updateFilter }">
                  <!-- Recherche -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Rechercher
                    </label>
                    <input
                      :value="filters.searchTerm"
                      @input="updateFilter('searchTerm', $event.target.value)"
                      type="text"
                      placeholder="Nom d'utilisateur, email ou titre..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <p class="text-xs text-gray-500 mt-1">Recherche dans username, email et title</p>
                  </div>

                  <!-- Statut de confirmation -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Statut de confirmation
                    </label>
                    <select
                      :value="filters.selectedConfirmed"
                      @change="updateFilter('selectedConfirmed', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous</option>
                      <option value="true">Confirmé</option>
                      <option value="false">Non confirmé</option>
                    </select>
                  </div>

                  <!-- Statut de blocage -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Statut de blocage
                    </label>
                    <select
                      :value="filters.selectedBlocked"
                      @change="updateFilter('selectedBlocked', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous</option>
                      <option value="false">Actif</option>
                      <option value="true">Bloqué</option>
                    </select>
                  </div>

                  <!-- Rôle -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Rôle
                    </label>
                    <select
                      :value="filters.selectedRole"
                      @change="updateFilter('selectedRole', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous les rôles</option>
                      <option value="Authenticated">Utilisateur</option>
                      <option value="Admin">Administrateur</option>
                      <option value="Moderator">Modérateur</option>
                    </select>
                  </div>

                  <!-- Niveau d'expérience -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Niveau d'expérience
                    </label>
                    <select
                      :value="filters.selectedExperience"
                      @change="updateFilter('selectedExperience', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous les niveaux</option>
                      <option value="0">Débutant (0 XP)</option>
                      <option value="1-100">Novice (1-100 XP)</option>
                      <option value="101-500">Intermédiaire (101-500 XP)</option>
                      <option value="501-1000">Avancé (501-1000 XP)</option>
                      <option value="1001+">Expert (1001+ XP)</option>
                    </select>
                  </div>

                  <!-- Présence d'avatar -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Avatar
                    </label>
                    <select
                      :value="filters.selectedAvatar"
                      @change="updateFilter('selectedAvatar', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous</option>
                      <option value="true">Avec avatar</option>
                      <option value="false">Sans avatar</option>
                    </select>
                  </div>
                </template>
              </UiFilterOverlay>
              <UiRefreshButton
                @click="refreshUsers"
                :loading="loading"
                variant="secondary"
                size="sm"
              />
              <UiLastUpdated 
                :last-updated="new Date()"
                size="xs"
                variant="muted"
              />
            </div>
          </div>

          <!-- Résultats des filtres (si filtres actifs) -->
          <div v-if="activeFiltersCount > 0" class="mb-6 p-3 bg-purple-50 border border-purple-200 rounded-md">
            <div class="flex items-center justify-between">
              <span class="text-sm text-purple-700">
                {{ filteredUsersCount }} utilisateur(s) trouvé(s) sur {{ totalUsers }}
              </span>
            </div>
          </div>

          <!-- Message d'erreur -->
          <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <div class="flex items-center">
              <UiIcon name="exclamation" size="md" class="mr-2" />
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
              <UiIcon name="warning" size="xl" class="mx-auto text-yellow-400 mb-3" />
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
              <div class="grid grid-cols-7 gap-4 text-base font-medium text-gray-700">
                <div>Utilisateur</div>
                <div>Email</div>
                <div>Rôle</div>
                <div>Statut</div>
                <div>Expérience</div>
                <div>Activité actuelle</div>
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
                v-for="user in filteredUsers" 
                :key="user.id"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-7 gap-4 items-center text-sm">
                  <!-- Utilisateur (Avatar + Username + Title) -->
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <img 
                        v-if="user.avatar?.url"
                        :src="getAvatarUrl(user.avatar.url)" 
                        :alt="user.username"
                        class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                        @error="handleAvatarError"
                      />
                      <div 
                        v-else
                        class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center border-2 border-white shadow-sm"
                      >
                        <UiIcon name="user" size="md" class="text-purple-600" />
                      </div>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="text-gray-900 font-medium truncate">{{ user.username || 'N/A' }}</div>
                      <div v-if="user.title" class="text-gray-500 text-xs truncate">{{ user.title }}</div>
                    </div>
                  </div>
                  
                  <!-- Email -->
                  <div class="text-gray-600 truncate">{{ user.email || 'N/A' }}</div>
                  
                  <!-- Rôle -->
                  <div class="flex items-center">
                    <UiBadge 
                      :variant="getRoleVariant(user.role)" 
                      :label="getRoleLabel(user.role)"
                      size="xs"
                    />
                  </div>
                  
                  <!-- Statut -->
                  <div class="flex items-center">
                    <UiBadge 
                      :variant="getStatusVariant(user)" 
                      :label="getStatusLabel(user)"
                      size="xs"
                    />
                  </div>
                  
                  <!-- Expérience -->
                  <div class="flex items-center">
                    <UiBadge 
                      variant="purple" 
                      :label="formatExperience(user.experience)"
                      size="xs"
                    />
                  </div>
                  
                  <!-- Activité actuelle -->
                  <div class="text-xs text-gray-500">
                    <div v-if="user.current_mission?.title" class="truncate">
                      🎯 {{ user.current_mission.title }}
                    </div>
                    <div v-else-if="user.current_circuit?.name" class="truncate">
                      🗺️ {{ user.current_circuit.name }}
                    </div>
                    <div v-else class="text-gray-400">Aucune activité</div>
                  </div>
                  
                  <!-- Actions -->
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editUser(user)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1.5 rounded hover:bg-blue-50"
                      title="Modifier"
                    >
                      <UiIcon name="edit" size="sm" />
                    </button>
                    <button
                      @click="handleDeleteUser(user.documentId || user.id)"
                      class="text-red-600 hover:text-red-800 transition-colors duration-200 p-1.5 rounded hover:bg-red-50"
                      title="Supprimer"
                    >
                      <UiIcon name="trash" size="sm" />
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
        <h3 class="text-xl font-bold text-gray-900">
          Modifier l'utilisateur
          <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">✓ Mise à jour</span>
        </h3>
        <button @click="cancelEdit" class="text-gray-400 hover:text-gray-600">
          <UiIcon name="x" size="lg" />
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
        
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titre/Fonction</label>
          <input 
            v-model="editingUser.title"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Titre ou fonction de l'utilisateur"
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
        
        <!-- Info sur les relations (lecture seule) -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Informations additionnelles</h4>
          <div class="grid grid-cols-2 gap-4 text-xs text-gray-600">
            <div>
              <span class="font-medium">Rôle actuel:</span> 
              {{ getRoleLabel(editingUser.role) }}
            </div>
            <div>
              <span class="font-medium">Réalisations:</span> 
              {{ editingUser.achievements?.length || 0 }}
            </div>
            <div>
              <span class="font-medium">Mission actuelle:</span> 
              {{ editingUser.current_mission?.title || 'Aucune' }}
            </div>
            <div>
              <span class="font-medium">Circuit actuel:</span> 
              {{ editingUser.current_circuit?.name || 'Aucun' }}
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            @click="cancelEdit"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Annuler
          </button>
          <button
            @click="saveEditUser"
            :disabled="!editingUser.email"
            class="px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
// import { useFilters } from '~/composables/useFilters'
// import UserFilters from '~/components/filters/UserFilters.vue'

// Head configuration pour les polices
useHead({
  title: 'Gestion des utilisateurs - Urbex Chronicles',
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

// Fonctions utilitaires inline pour éviter les problèmes d'import
const getStatusVariant = (user) => {
  if (user.blocked) return 'danger'
  if (!user.confirmed) return 'warning'
  return 'success'
}

const getStatusLabel = (user) => {
  if (user.blocked) return 'Bloqué'
  if (!user.confirmed) return 'Non confirmé'
  return 'Actif'
}

const formatExperience = (experience) => {
  if (!experience) return '0 XP'
  return `${Number(experience).toLocaleString()} XP`
}

const getRoleVariant = (role) => {
  if (!role) return 'default'
  const roleValue = typeof role === 'string' ? role : role.name;
  switch (roleValue?.toLowerCase()) {
    case 'admin':
    case 'superadmin':
    case 'super admin':
      return 'danger'
    case 'moderator':
    case 'moderateur':
      return 'warning'
    case 'user':
    case 'authenticated':
      return 'success'
    default:
      return 'default'
  }
}

const getRoleLabel = (role) => {
  if (!role) return 'Aucun rôle'
  const roleValue = typeof role === 'string' ? role : role.name;
  switch (roleValue?.toLowerCase()) {
    case 'admin':
      return 'Admin'
    case 'superadmin':
    case 'super admin':
      return 'Super Admin'
    case 'moderator':
    case 'moderateur':
      return 'Modérateur'
    case 'user':
    case 'authenticated':
      return 'Utilisateur'
    default:
      return roleValue || 'Inconnu'
  }
}

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

// Système de filtres basé sur le schéma Strapi
const searchTerm = ref('')
const selectedConfirmed = ref('')
const selectedBlocked = ref('')
const selectedRole = ref('')
const selectedExperience = ref('')
const selectedAvatar = ref('')

// Utilisateurs filtrés
const filteredUsers = computed(() => {
  let filtered = users.value

  // Filtre de recherche (username, email, title)
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.username?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.title?.toLowerCase().includes(search)
    )
  }

  // Filtre par statut de confirmation
  if (selectedConfirmed.value !== '') {
    const isConfirmed = selectedConfirmed.value === 'true'
    filtered = filtered.filter(user => user.confirmed === isConfirmed)
  }

  // Filtre par statut de blocage
  if (selectedBlocked.value !== '') {
    const isBlocked = selectedBlocked.value === 'true'
    filtered = filtered.filter(user => user.blocked === isBlocked)
  }

  // Filtre par rôle
  if (selectedRole.value) {
    filtered = filtered.filter(user => 
      user.role?.name === selectedRole.value
    )
  }

  // Filtre par niveau d'expérience
  if (selectedExperience.value) {
    const expValue = selectedExperience.value
    filtered = filtered.filter(user => {
      const exp = parseInt(user.experience) || 0
      switch (expValue) {
        case '0': return exp === 0
        case '1-100': return exp >= 1 && exp <= 100
        case '101-500': return exp >= 101 && exp <= 500
        case '501-1000': return exp >= 501 && exp <= 1000
        case '1001+': return exp >= 1001
        default: return true
      }
    })
  }

  // Filtre par présence d'avatar
  if (selectedAvatar.value !== '') {
    const hasAvatar = selectedAvatar.value === 'true'
    if (hasAvatar) {
      filtered = filtered.filter(user => user.avatar && user.avatar.id)
    } else {
      filtered = filtered.filter(user => !user.avatar || !user.avatar.id)
    }
  }

  return filtered
})

// Nombre de filtres actifs
const activeFiltersCount = computed(() => {
  let count = 0
  if (searchTerm.value) count++
  if (selectedConfirmed.value) count++
  if (selectedBlocked.value) count++
  if (selectedRole.value) count++
  if (selectedExperience.value) count++
  if (selectedAvatar.value) count++
  return count
})

// Méthode pour mettre à jour un filtre individuel
const updateFilter = (filterName, value) => {
  switch (filterName) {
    case 'searchTerm':
      searchTerm.value = value
      break
    case 'selectedConfirmed':
      selectedConfirmed.value = value
      break
    case 'selectedBlocked':
      selectedBlocked.value = value
      break
    case 'selectedRole':
      selectedRole.value = value
      break
    case 'selectedExperience':
      selectedExperience.value = value
      break
    case 'selectedAvatar':
      selectedAvatar.value = value
      break
  }
}

// Méthode pour mettre à jour les filtres depuis l'overlay
const updateFilters = (newFilters) => {
  searchTerm.value = newFilters.searchTerm || ''
  selectedConfirmed.value = newFilters.selectedConfirmed || ''
  selectedBlocked.value = newFilters.selectedBlocked || ''
  selectedRole.value = newFilters.selectedRole || ''
  selectedExperience.value = newFilters.selectedExperience || ''
  selectedAvatar.value = newFilters.selectedAvatar || ''
}

// Réinitialiser les filtres
const resetFilters = () => {
  searchTerm.value = ''
  selectedConfirmed.value = ''
  selectedBlocked.value = ''
  selectedRole.value = ''
  selectedExperience.value = ''
  selectedAvatar.value = ''
}

// États pour la modal d'édition
const showEditModal = ref(false)
const editingUser = ref(null)

// Computed properties
const totalUsers = computed(() => users.value.length)
const filteredUsersCount = computed(() => filteredUsers.value.length)
const newUsers = computed(() => {
  // Calculer les nouveaux utilisateurs (par exemple, créés dans les 30 derniers jours)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  return filteredUsers.value.filter(user => {
    if (user.createdAt) {
      return new Date(user.createdAt) > thirtyDaysAgo
    }
    return false
  }).length
})

const activeUsers = computed(() => {
  return filteredUsers.value.filter(user => !user.blocked && user.confirmed).length
})

const usersInMission = computed(() => {
  return filteredUsers.value.filter(user => user.current_mission || user.current_circuit).length
})

const totalExperience = computed(() => {
  return filteredUsers.value.reduce((total, user) => total + (Number(user.experience) || 0), 0)
})

// Fonctions d'aide pour l'affichage cohérent selon le schéma Strapi

// Fonctions pour les actions utilisateur
const editUser = (user) => {
  editingUser.value = { 
    ...user,
    // Normaliser les champs pour l'édition selon le schéma réel
    username: user.username || '',
    email: user.email || '',
    title: user.title || '',
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
      title: editingUser.value.title || null,
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

// Fonctions pour gérer les avatars
const getAvatarUrl = (avatarUrl) => {
  // Si l'URL est relative, la convertir en URL complète
  if (avatarUrl && !avatarUrl.startsWith('http')) {
    return `http://localhost:1337${avatarUrl}`
  }
  return avatarUrl
}

const handleAvatarError = (event) => {
  // Remplacer par l'icône par défaut si l'image ne se charge pas
  event.target.style.display = 'none'
}
</script>

<style>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
}
</style>