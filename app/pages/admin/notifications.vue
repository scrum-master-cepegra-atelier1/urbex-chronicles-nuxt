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
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Notifications</h1>
      </div>
      
      <div class="flex-1 flex flex-col overflow-hidden ml-8">
        
        <!-- Stats Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12">
            <!-- Notifications totales -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalNotifications }}</div>
              <div class="text-base lg:text-lg text-gray-600">Notifications totales</div>
            </div>

            <!-- Notifications envoyées -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ sentNotifications }}</div>
              <div class="text-base lg:text-lg text-gray-600">Envoyées</div>
            </div>

            <!-- Notifications programmées -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ scheduledNotifications }}</div>
              <div class="text-base lg:text-lg text-gray-600">Programmées</div>
            </div>

            <!-- Notifications brouillon -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ draftNotifications }}</div>
              <div class="text-base lg:text-lg text-gray-600">Brouillons</div>
            </div>
          </div>
        </div>

        <!-- Add Notification Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Header avec gradient -->
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 border-b border-gray-200 rounded-t-lg">
              <h3 class="text-lg font-semibold text-white">Créer une nouvelle notification</h3>
              <p class="text-indigo-100 mt-1">Envoyez des notifications push aux utilisateurs de l'application</p>
            </div>

            <!-- Onglets -->
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="setActiveTab(tab.id)"
                  :class="[
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2'
                  ]"
                >
                  <span>{{ tab.icon }}</span>
                  <span>{{ tab.label }}</span>
                </button>
              </nav>
            </div>

            <!-- Contenu des onglets -->
            <div class="p-6">
              <!-- Onglet Contenu -->
              <div v-if="activeTab === 'content'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Contenu de la notification</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Titre -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Titre <span class="text-red-500">*</span></label>
                    <input 
                      v-model="newNotification.title"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Titre de la notification (max 60 caractères)"
                      maxlength="60"
                      required
                    />
                    <p class="mt-1 text-sm text-gray-500">{{ newNotification.title.length }}/60 caractères</p>
                  </div>
                  
                  <!-- Type -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Type de notification</label>
                    <select 
                      v-model="newNotification.type"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="info">Information</option>
                      <option value="mission">Nouvelle mission</option>
                      <option value="achievement">Succès débloqué</option>
                      <option value="update">Mise à jour</option>
                      <option value="event">Événement</option>
                    </select>
                  </div>
                  
                  <!-- Message -->
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Message <span class="text-red-500">*</span></label>
                    <textarea 
                      v-model="newNotification.message"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Contenu détaillé de la notification (max 200 caractères)"
                      rows="3"
                      maxlength="200"
                      required
                    ></textarea>
                    <p class="mt-1 text-sm text-gray-500">{{ newNotification.message.length }}/200 caractères</p>
                  </div>
                </div>
              </div>

              <!-- Onglet Ciblage -->
              <div v-if="activeTab === 'targeting'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Ciblage des utilisateurs</h4>
                <div class="space-y-4">
                  <!-- Audience -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Audience cible</label>
                    <select 
                      v-model="newNotification.audience"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">Tous les utilisateurs</option>
                      <option value="active">Utilisateurs actifs (connectés dans les 7 derniers jours)</option>
                      <option value="inactive">Utilisateurs inactifs (pas connectés depuis 30 jours)</option>
                      <option value="new">Nouveaux utilisateurs (inscrits dans les 7 derniers jours)</option>
                      <option value="premium">Utilisateurs premium</option>
                      <option value="specific">Utilisateurs spécifiques</option>
                    </select>
                  </div>
                  
                  <!-- IDs utilisateurs spécifiques -->
                  <div v-if="newNotification.audience === 'specific'">
                    <label class="block text-sm font-medium text-gray-700 mb-2">IDs des utilisateurs (séparés par des virgules)</label>
                    <input 
                      v-model="newNotification.specificUserIds"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="1, 2, 3, 15, 42"
                    />
                    <p class="mt-1 text-sm text-gray-500">Entrez les IDs des utilisateurs séparés par des virgules</p>
                  </div>
                  
                  <!-- Filtres géographiques -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Zone géographique (optionnel)</label>
                    <select 
                      v-model="newNotification.geographicFilter"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Aucun filtre géographique</option>
                      <option value="belgium">Belgique uniquement</option>
                      <option value="brussels">Région Bruxelles-Capitale</option>
                      <option value="wallonia">Wallonie</option>
                      <option value="flanders">Flandre</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Onglet Programmation -->
              <div v-if="activeTab === 'scheduling'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Programmation d'envoi</h4>
                <div class="space-y-4">
                  <!-- Mode d'envoi -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Mode d'envoi</label>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input 
                          v-model="newNotification.sendMode" 
                          type="radio" 
                          value="immediate" 
                          class="mr-2 text-indigo-600 focus:ring-indigo-500"
                        >
                        <span>Envoyer immédiatement</span>
                      </label>
                      <label class="flex items-center">
                        <input 
                          v-model="newNotification.sendMode" 
                          type="radio" 
                          value="scheduled" 
                          class="mr-2 text-indigo-600 focus:ring-indigo-500"
                        >
                        <span>Programmer l'envoi</span>
                      </label>
                      <label class="flex items-center">
                        <input 
                          v-model="newNotification.sendMode" 
                          type="radio" 
                          value="draft" 
                          class="mr-2 text-indigo-600 focus:ring-indigo-500"
                        >
                        <span>Sauvegarder comme brouillon</span>
                      </label>
                    </div>
                  </div>
                  
                  <!-- Date et heure programmées -->
                  <div v-if="newNotification.sendMode === 'scheduled'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Date d'envoi</label>
                      <input 
                        v-model="newNotification.scheduledDate"
                        type="date" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        :min="today"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Heure d'envoi</label>
                      <input 
                        v-model="newNotification.scheduledTime"
                        type="time" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <!-- Options avancées -->
                  <div class="space-y-3">
                    <label class="flex items-center">
                      <input 
                        v-model="newNotification.silent" 
                        type="checkbox" 
                        class="mr-2 text-indigo-600 focus:ring-indigo-500"
                      >
                      <span class="text-sm text-gray-700">Notification silencieuse (sans son ni vibration)</span>
                    </label>
                    
                    <label class="flex items-center">
                      <input 
                        v-model="newNotification.persistent" 
                        type="checkbox" 
                        class="mr-2 text-indigo-600 focus:ring-indigo-500"
                      >
                      <span class="text-sm text-gray-700">Notification persistante (ne disparaît pas automatiquement)</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Actions (toujours visibles) -->
              <div class="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  @click="createNotification"
                  :disabled="!canCreateNotification || isCreating"
                  :class="canCreateNotification && !isCreating ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                  class="px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
                >
                  <svg v-if="!isCreating" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  <svg v-else class="animate-spin w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  {{ getButtonText() }}
                </button>
                <button
                  @click="clearForm"
                  :disabled="isCreating"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Réinitialiser
                </button>
                <button
                  @click="previewNotification"
                  :disabled="!canCreateNotification"
                  class="px-6 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-md transition-colors duration-200 flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Prévisualiser
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Management Table -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">Historique des notifications</h2>
            <div class="flex space-x-3">
              <button
                @click="refreshNotifications"
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

          <!-- Message si aucune notification -->
          <div v-if="!loading && notifications.length === 0" class="mb-4 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="text-center">
              <svg class="w-12 h-12 mx-auto text-yellow-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.021 15.479l1.414-1.414L9.021 18.65l-1.414 1.414L4.021 15.479z"/>
              </svg>
              <h3 class="text-lg font-medium text-yellow-800 mb-1">Aucune notification trouvée</h3>
              <p class="text-yellow-700">
                Aucune notification n'a encore été créée.
                <br>Utilisez le formulaire ci-dessus pour envoyer votre première notification.
              </p>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Table Header -->
            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <div class="grid grid-cols-8 gap-6 text-base font-medium text-gray-700">
                <div>Titre</div>
                <div>Type</div>
                <div>Audience</div>
                <div>Statut</div>
                <div>Envoyée le</div>
                <div>Programmée pour</div>
                <div>Destinataires</div>
                <div>Actions</div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="max-h-96 overflow-y-auto">
              <!-- Loading skeleton -->
              <div v-if="loading" class="px-6 py-6">
                <div class="animate-pulse space-y-4">
                  <div v-for="n in 3" :key="n" class="grid grid-cols-8 gap-6">
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <!-- Notifications list -->
              <div 
                v-else
                v-for="notification in notifications" 
                :key="notification.id"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-8 gap-6 items-center text-base">
                  <div class="text-gray-900 font-medium">{{ notification.title }}</div>
                  <div class="flex items-center">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                          :class="getTypeColor(notification.type)">
                      {{ getTypeLabel(notification.type) }}
                    </span>
                  </div>
                  <div class="text-gray-600 text-sm">{{ getAudienceLabel(notification.audience) }}</div>
                  <div class="flex items-center">
                    <span :class="getStatusColor(notification.status)" 
                          class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ getStatusLabel(notification.status) }}
                    </span>
                  </div>
                  <div class="text-gray-600 text-sm">{{ formatDate(notification.sentAt) }}</div>
                  <div class="text-gray-600 text-sm">{{ formatDate(notification.scheduledFor) }}</div>
                  <div class="text-gray-900 font-bold">{{ notification.recipientCount || 0 }}</div>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="viewNotification(notification)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2"
                      title="Voir détails"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                    <button
                      v-if="notification.status === 'draft'"
                      @click="editNotification(notification)"
                      class="text-green-600 hover:text-green-800 transition-colors duration-200 p-2"
                      title="Modifier"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteNotification(notification.id)"
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

  <!-- Modal de prévisualisation -->
  <div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Prévisualisation</h3>
        <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Simulation de notification mobile -->
      <div class="bg-gray-100 p-4 rounded-lg">
        <div class="bg-white rounded-lg shadow-lg p-4 border-l-4 border-indigo-500">
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h4 class="font-semibold text-gray-900 text-sm">Urbex Chronicles</h4>
                <span class="text-xs text-gray-500">maintenant</span>
              </div>
              <h5 class="font-medium text-gray-800 mt-1">{{ newNotification.title || 'Titre de la notification' }}</h5>
              <p class="text-gray-600 text-sm mt-1">{{ newNotification.message || 'Message de la notification' }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Infos -->
      <div class="mt-4 space-y-2 text-sm text-gray-600">
        <p><strong>Type:</strong> {{ getTypeLabel(newNotification.type) }}</p>
        <p><strong>Audience:</strong> {{ getAudienceLabel(newNotification.audience) }}</p>
        <p v-if="newNotification.sendMode === 'scheduled'">
          <strong>Programmée pour:</strong> {{ newNotification.scheduledDate }} à {{ newNotification.scheduledTime }}
        </p>
      </div>
      
      <!-- Actions -->
      <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
        <button
          @click="showPreviewModal = false"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Meta de la page
definePageMeta({
  title: 'Notifications Urbex'
})

// Head configuration
useHead({
  title: 'Notifications Urbex',
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

// Gestion des onglets
const activeTab = ref('content')
const tabs = [
  { id: 'content', label: 'Contenu', icon: '📝' },
  { id: 'targeting', label: 'Ciblage', icon: '🎯' },
  { id: 'scheduling', label: 'Programmation', icon: '📅' }
]

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}

// États réactifs (données fake pour l'instant)
const loading = ref(false)
const isCreating = ref(false)
const showPreviewModal = ref(false)

// Date d'aujourd'hui pour la programmation
const today = new Date().toISOString().split('T')[0]

// Données fake pour les statistiques
const totalNotifications = ref(47)
const sentNotifications = ref(32)
const scheduledNotifications = ref(5)
const draftNotifications = ref(10)

// Formulaire de nouvelle notification
const newNotification = ref({
  title: '',
  message: '',
  type: 'info',
  audience: 'all',
  specificUserIds: '',
  geographicFilter: '',
  sendMode: 'immediate',
  scheduledDate: '',
  scheduledTime: '',
  silent: false,
  persistent: false
})

// Données fake pour l'historique des notifications
const notifications = ref([
  {
    id: 1,
    title: 'Nouvelle mission disponible !',
    message: 'Une mission d\'exploration vient d\'être ajoutée dans votre quartier.',
    type: 'mission',
    audience: 'active',
    status: 'sent',
    sentAt: '2024-10-08T14:30:00Z',
    scheduledFor: null,
    recipientCount: 234
  },
  {
    id: 2,
    title: 'Mise à jour de l\'application',
    message: 'Découvrez les nouvelles fonctionnalités dans la version 2.1.0',
    type: 'update',
    audience: 'all',
    status: 'sent',
    sentAt: '2024-10-07T09:00:00Z',
    scheduledFor: null,
    recipientCount: 892
  },
  {
    id: 3,
    title: 'Événement spécial Halloween',
    message: 'Participez à notre chasse aux trésors spéciale Halloween du 31 octobre',
    type: 'event',
    audience: 'all',
    status: 'scheduled',
    sentAt: null,
    scheduledFor: '2024-10-25T10:00:00Z',
    recipientCount: 0
  },
  {
    id: 4,
    title: 'Succès débloqué',
    message: 'Félicitations ! Vous avez débloqué le succès "Explorateur débutant"',
    type: 'achievement',
    audience: 'specific',
    status: 'draft',
    sentAt: null,
    scheduledFor: null,
    recipientCount: 0
  },
  {
    id: 5,
    title: 'Rappel d\'activité',
    message: 'Cela fait un moment ! Venez découvrir les nouvelles missions ajoutées.',
    type: 'info',
    audience: 'inactive',
    status: 'sent',
    sentAt: '2024-10-05T16:45:00Z',
    scheduledFor: null,
    recipientCount: 156
  }
])

// Validation pour la création
const canCreateNotification = computed(() => {
  return newNotification.value.title.length >= 3 && 
         newNotification.value.message.length >= 10 &&
         (newNotification.value.sendMode !== 'scheduled' || 
          (newNotification.value.scheduledDate && newNotification.value.scheduledTime))
})

// Fonctions utilitaires
const getTypeLabel = (type) => {
  const types = {
    info: 'Information',
    mission: 'Mission',
    achievement: 'Succès',
    update: 'Mise à jour',
    event: 'Événement'
  }
  return types[type] || type
}

const getTypeColor = (type) => {
  const colors = {
    info: 'bg-blue-100 text-blue-800',
    mission: 'bg-green-100 text-green-800',
    achievement: 'bg-yellow-100 text-yellow-800',
    update: 'bg-purple-100 text-purple-800',
    event: 'bg-pink-100 text-pink-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const getAudienceLabel = (audience) => {
  const audiences = {
    all: 'Tous',
    active: 'Actifs',
    inactive: 'Inactifs',
    new: 'Nouveaux',
    premium: 'Premium',
    specific: 'Spécifiques'
  }
  return audiences[audience] || audience
}

const getStatusLabel = (status) => {
  const statuses = {
    sent: 'Envoyée',
    scheduled: 'Programmée',
    draft: 'Brouillon',
    failed: 'Échec'
  }
  return statuses[status] || status
}

const getStatusColor = (status) => {
  const colors = {
    sent: 'bg-green-100 text-green-800',
    scheduled: 'bg-blue-100 text-blue-800',
    draft: 'bg-gray-100 text-gray-800',
    failed: 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getButtonText = () => {
  if (isCreating.value) return 'Création...'
  
  switch (newNotification.value.sendMode) {
    case 'immediate':
      return 'Envoyer maintenant'
    case 'scheduled':
      return 'Programmer l\'envoi'
    case 'draft':
      return 'Sauvegarder le brouillon'
    default:
      return 'Créer la notification'
  }
}

// Fonctions pour les actions
const clearForm = () => {
  newNotification.value = {
    title: '',
    message: '',
    type: 'info',
    audience: 'all',
    specificUserIds: '',
    geographicFilter: '',
    sendMode: 'immediate',
    scheduledDate: '',
    scheduledTime: '',
    silent: false,
    persistent: false
  }
}

const createNotification = async () => {
  if (!canCreateNotification.value) return
  
  isCreating.value = true
  
  try {
    // Simulation de création
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Créer la nouvelle notification
    const newNotif = {
      id: notifications.value.length + 1,
      ...newNotification.value,
      status: newNotification.value.sendMode === 'draft' ? 'draft' : 
              newNotification.value.sendMode === 'scheduled' ? 'scheduled' : 'sent',
      sentAt: newNotification.value.sendMode === 'immediate' ? new Date().toISOString() : null,
      scheduledFor: newNotification.value.sendMode === 'scheduled' ? 
                   `${newNotification.value.scheduledDate}T${newNotification.value.scheduledTime}:00Z` : null,
      recipientCount: newNotification.value.sendMode === 'draft' ? 0 : Math.floor(Math.random() * 500) + 50
    }
    
    // Ajouter à la liste
    notifications.value.unshift(newNotif)
    
    // Mettre à jour les stats
    totalNotifications.value++
    if (newNotif.status === 'sent') sentNotifications.value++
    else if (newNotif.status === 'scheduled') scheduledNotifications.value++
    else if (newNotif.status === 'draft') draftNotifications.value++
    
    console.log('Notification créée avec succès:', newNotif)
    
    // Réinitialiser le formulaire
    clearForm()
    
  } catch (err) {
    console.error('Erreur lors de la création de la notification:', err)
    alert('Erreur lors de la création de la notification')
  } finally {
    isCreating.value = false
  }
}

const previewNotification = () => {
  if (canCreateNotification.value) {
    showPreviewModal.value = true
  }
}

const refreshNotifications = async () => {
  loading.value = true
  try {
    // Simulation de chargement
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Notifications rafraîchies')
  } finally {
    loading.value = false
  }
}

const viewNotification = (notification) => {
  console.log('Voir notification:', notification)
  // Ici on pourrait ouvrir une modal avec plus de détails
}

const editNotification = (notification) => {
  console.log('Modifier notification:', notification)
  // Ici on pourrait remplir le formulaire avec les données de la notification
}

const deleteNotification = async (notificationId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
    const index = notifications.value.findIndex(n => n.id === notificationId)
    if (index !== -1) {
      const notification = notifications.value[index]
      notifications.value.splice(index, 1)
      
      // Mettre à jour les stats
      totalNotifications.value--
      if (notification.status === 'sent') sentNotifications.value--
      else if (notification.status === 'scheduled') scheduledNotifications.value--
      else if (notification.status === 'draft') draftNotifications.value--
      
      console.log('Notification supprimée')
    }
  }
}
</script>

<style>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
}
</style>