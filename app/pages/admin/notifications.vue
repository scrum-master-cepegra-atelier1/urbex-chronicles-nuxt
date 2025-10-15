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
        
        <!-- Indicateur de chargement -->
        <div v-if="loading" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-center">
            <UiIcon name="refresh" size="5" class="text-blue-500 mr-2 animate-spin" />
            <span class="text-blue-800">Chargement des notifications...</span>
          </div>
        </div>
        
        <!-- Message de succès -->
        <div v-if="successMessage" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center">
            <UiIcon name="check" size="5" class="text-green-500 mr-2" />
            <span class="text-green-800">{{ successMessage }}</span>
          </div>
        </div>
        
        <!-- Message d'erreur -->
        <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <UiIcon name="exclamation" size="5" class="text-red-500 mr-2" />
            <span class="text-red-800">{{ error }}</span>
            <button @click="refreshData" class="ml-4 text-red-600 hover:text-red-800 underline">Réessayer</button>
          </div>
        </div>
      </div>
      
      <div class="ml-8">
        
        <!-- Stats Section dynamiques -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12">
            <!-- Total notifications -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ stats.total }}</div>
              <div class="text-base lg:text-lg text-gray-600">Total notifications</div>
            </div>

            <!-- Notifications envoyées -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ stats.sent }}</div>
              <div class="text-base lg:text-lg text-gray-600">Envoyées</div>
            </div>

            <!-- Notifications programmées -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ stats.scheduled }}</div>
              <div class="text-base lg:text-lg text-gray-600">Programmées</div>
            </div>

            <!-- Brouillons -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ stats.drafts }}</div>
              <div class="text-base lg:text-lg text-gray-600">Brouillons</div>
            </div>
          </div>
        </div>

        <!-- Add Notification Section -->
        <div class="mb-12 flex-shrink-0">

          <!-- Formulaire Principal avec onglet déroulant -->
          <div class="bg-white mb-12 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <!-- Header cliquable -->
            <div 
              @click="toggleAddForm"
              class="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-white flex items-center" style="font-family: 'Do Hyeon', sans-serif;">
                    <svg class="w-8 h-8 mr-3 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.021 15.479l1.414-1.414L9.021 18.65l-1.414 1.414L4.021 15.479z"/>
                    </svg>
                    Créer une nouvelle notification
                  </h2>
                  <p class="text-indigo-100 mt-1">
                    Envoyez des notifications push ciblées aux utilisateurs de l'application
                  </p>
                </div>
                <!-- Icône de déroulement -->
                <div class="flex items-center">
                  <svg 
                    :class="{ 'rotate-180': showAddForm }" 
                    class="w-6 h-6 text-indigo-200 transform transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Contenu du formulaire (déroulant) -->
            <div 
              v-show="showAddForm" 
              class="transition-all duration-300 ease-in-out"
              :class="showAddForm ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'"
            >
              <div class="p-8">
                
                <!-- Onglets -->
                <div class="border-b border-gray-200 mb-8">
                  <nav class="flex space-x-8" aria-label="Tabs">
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
                <div class="space-y-6">
                  
                  <!-- Onglet Contenu -->
                  <div v-if="activeTab === 'content'" class="space-y-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-6">Contenu de la notification</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <!-- Titre -->
                      <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Titre de la notification <span class="text-red-500">*</span>
                        </label>
                        <input 
                          v-model="newNotification.title"
                          type="text" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Titre accrocheur (max 60 caractères)"
                          maxlength="60"
                          required
                        />
                        <p class="mt-1 text-sm text-gray-500">{{ newNotification.title.length }}/60 caractères</p>
                      </div>
                      
                      <!-- Type de notification -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Type de notification</label>
                        <select 
                          v-model="newNotification.type"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="info">📢 Information générale</option>
                          <option value="mission">🎯 Nouvelle mission</option>
                          <option value="achievement">🏆 Succès débloqué</option>
                          <option value="update">🔄 Mise à jour</option>
                          <option value="event">🎉 Événement spécial</option>
                          <option value="reminder">⏰ Rappel</option>
                        </select>
                      </div>
                      
                      <!-- Priorité -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                        <select 
                          v-model="newNotification.priority"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="low">🔵 Basse</option>
                          <option value="normal">🟡 Normale</option>
                          <option value="high">🟠 Élevée</option>
                          <option value="urgent">🔴 Urgente</option>
                        </select>
                      </div>
                      
                      <!-- Message -->
                      <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Message détaillé <span class="text-red-500">*</span>
                        </label>
                        <textarea 
                          v-model="newNotification.message"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Contenu détaillé de la notification (max 200 caractères)"
                          rows="4"
                          maxlength="200"
                          required
                        ></textarea>
                        <p class="mt-1 text-sm text-gray-500">{{ newNotification.message.length }}/200 caractères</p>
                      </div>
                    </div>
                  </div>

                  <!-- Onglet Ciblage -->
                  <div v-if="activeTab === 'targeting'" class="space-y-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-6">Ciblage des utilisateurs</h3>
                    
                    <div class="space-y-6">
                      <!-- Audience cible -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Audience cible</label>
                        <select 
                          v-model="newNotification.audience"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="all">👥 Tous les utilisateurs</option>
                          <option value="active">⚡ Utilisateurs actifs (7 derniers jours)</option>
                          <option value="inactive">😴 Utilisateurs inactifs (30+ jours)</option>
                          <option value="new">🆕 Nouveaux utilisateurs (7 derniers jours)</option>
                          <option value="premium">💎 Utilisateurs premium</option>
                          <option value="location">📍 Par zone géographique</option>
                          <option value="specific">🎯 Utilisateurs spécifiques</option>
                        </select>
                      </div>
                      
                      <!-- IDs utilisateurs spécifiques -->
                      <div v-if="newNotification.audience === 'specific'">
                        <label class="block text-sm font-medium text-gray-700 mb-2">IDs des utilisateurs</label>
                        <input 
                          v-model="newNotification.specificUserIds"
                          type="text" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="1, 2, 3, 15, 42..."
                        />
                        <p class="mt-1 text-sm text-gray-500">Séparez les IDs par des virgules</p>
                      </div>
                      
                      <!-- Filtre géographique -->
                      <div v-if="newNotification.audience === 'location'">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Zone géographique</label>
                        <select 
                          v-model="newNotification.geographicFilter"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="belgium">🇧🇪 Belgique</option>
                          <option value="brussels">🏛️ Région Bruxelles-Capitale</option>
                          <option value="wallonia">🏞️ Wallonie</option>
                          <option value="flanders">🌷 Flandre</option>
                          <option value="custom">🎯 Zone personnalisée</option>
                        </select>
                      </div>
                      
                      <!-- Estimé du nombre de destinataires -->
                      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div class="flex items-center">
                          <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span class="text-blue-800 font-medium">Destinataires estimés : {{ estimatedRecipients }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Onglet Programmation -->
                  <div v-if="activeTab === 'scheduling'" class="space-y-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-6">Programmation d'envoi</h3>
                    
                    <div class="space-y-6">
                      <!-- Mode d'envoi -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-4">Mode d'envoi</label>
                        <div class="space-y-3">
                          <label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input 
                              v-model="newNotification.sendMode" 
                              type="radio" 
                              value="immediate" 
                              class="mr-3 text-indigo-600 focus:ring-indigo-500"
                            >
                            <div>
                              <span class="font-medium text-gray-900">⚡ Envoyer immédiatement</span>
                              <p class="text-sm text-gray-500">La notification sera envoyée dès la création</p>
                            </div>
                          </label>
                          <label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input 
                              v-model="newNotification.sendMode" 
                              type="radio" 
                              value="scheduled" 
                              class="mr-3 text-indigo-600 focus:ring-indigo-500"
                            >
                            <div>
                              <span class="font-medium text-gray-900">📅 Programmer l'envoi</span>
                              <p class="text-sm text-gray-500">Choisissez une date et heure d'envoi</p>
                            </div>
                          </label>
                          <label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input 
                              v-model="newNotification.sendMode" 
                              type="radio" 
                              value="draft" 
                              class="mr-3 text-indigo-600 focus:ring-indigo-500"
                            >
                            <div>
                              <span class="font-medium text-gray-900">📝 Sauvegarder comme brouillon</span>
                              <p class="text-sm text-gray-500">Enregistrer sans envoyer</p>
                            </div>
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
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            :min="today"
                          />
                        </div>
                        
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Heure d'envoi</label>
                          <input 
                            v-model="newNotification.scheduledTime"
                            type="time" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <!-- Options avancées -->
                      <div class="space-y-4">
                        <h4 class="font-medium text-gray-900">Options avancées</h4>
                        <div class="space-y-3">
                          <label class="flex items-center">
                            <input 
                              v-model="newNotification.silent" 
                              type="checkbox" 
                              class="mr-3 text-indigo-600 focus:ring-indigo-500 rounded"
                            >
                            <div>
                              <span class="text-gray-900">🔇 Notification silencieuse</span>
                              <p class="text-sm text-gray-500">Sans son ni vibration</p>
                            </div>
                          </label>
                          
                          <label class="flex items-center">
                            <input 
                              v-model="newNotification.persistent" 
                              type="checkbox" 
                              class="mr-3 text-indigo-600 focus:ring-indigo-500 rounded"
                            >
                            <div>
                              <span class="text-gray-900">📌 Notification persistante</span>
                              <p class="text-sm text-gray-500">Ne disparaît pas automatiquement</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 mt-8">
                  <button
                    @click="previewNotification"
                    :disabled="!canCreateNotification"
                    class="flex-1 sm:flex-initial px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    Prévisualiser
                  </button>
                  
                  <button
                    @click="createNotification"
                    :disabled="!canCreateNotification || isCreating"
                    :class="canCreateNotification && !isCreating ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                    class="flex-1 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium"
                  >
                    <svg v-if="!isCreating" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    <svg v-else class="animate-spin w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    {{ getButtonText() }}
                  </button>
                  
                  <button
                    @click="clearForm"
                    :disabled="isCreating"
                    class="flex-1 sm:flex-initial px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Liste des notifications -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">
              Historique des notifications
            </h2>
            <div class="flex items-center space-x-3">
              <!-- Filtres avec overlay -->
              <UiFilterOverlay
                page-title="les notifications"
                :filters="filters"
                :active-filters-count="activeFiltersCount"
                @update:filters="updateFilters"
                @reset="clearFilters"
              >
                <template #default="{ filters, updateFilter }">
                  <!-- Recherche -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Rechercher
                    </label>
                    <input
                      :value="filters.search"
                      @input="updateFilter('search', $event.target.value)"
                      type="text"
                      placeholder="Titre, message..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <!-- Type -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      :value="filters.type"
                      @change="updateFilter('type', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous les types</option>
                      <option value="info">Information</option>
                      <option value="mission">Mission</option>
                      <option value="achievement">Succès</option>
                      <option value="update">Mise à jour</option>
                      <option value="event">Événement</option>
                      <option value="reminder">Rappel</option>
                    </select>
                  </div>

                  <!-- Statut -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <select
                      :value="filters.status"
                      @change="updateFilter('status', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Tous les statuts</option>
                      <option value="sent">Envoyée</option>
                      <option value="scheduled">Programmée</option>
                      <option value="draft">Brouillon</option>
                    </select>
                  </div>

                  <!-- Priorité -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                    <select
                      :value="filters.priority"
                      @change="updateFilter('priority', $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Toutes les priorités</option>
                      <option value="low">Basse</option>
                      <option value="normal">Normale</option>
                      <option value="high">Élevée</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </template>
              </UiFilterOverlay>

              <!-- Bouton refresh -->
              <UiRefreshButton 
                :loading="loading" 
                @click="refreshData"
                variant="secondary"
                size="sm"
              />
            </div>
          </div>



          <!-- Message si aucune notification -->
          <div v-if="!loading && filteredNotifications.length === 0" class="mb-4 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="text-center">
              <UiIcon name="bell" size="12" class="mx-auto text-yellow-400 mb-3" />
              <h3 class="text-lg font-medium text-yellow-800 mb-1">Aucune notification trouvée</h3>
              <p class="text-yellow-700">
                {{ hasActiveFilters ? 'Aucune notification ne correspond à vos critères.' : 'Aucune notification n\'a encore été créée.' }}
                <br>{{ !hasActiveFilters ? 'Utilisez le formulaire ci-dessus pour envoyer votre première notification.' : '' }}
              </p>
            </div>
          </div>          <!-- Loading skeleton -->
          <div v-if="loading" class="space-y-4">
            <div v-for="n in 3" :key="n" class="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
              <div class="flex items-start justify-between">
                <div class="flex-1 space-y-3">
                  <div class="h-5 bg-gray-200 rounded w-2/3"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="flex space-x-4">
                    <div class="h-3 bg-gray-200 rounded w-16"></div>
                    <div class="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div class="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>

          <!-- Notifications Cards -->
          <div v-else class="space-y-4">
            <div 
              v-for="notification in filteredNotifications" 
              :key="notification.id"
              class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-gray-300"
            >
              <!-- Header avec titre et statut -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">
                    {{ notification.title }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-3">{{ notification.message }}</p>
                  
                  <!-- Infos compactes -->
                  <div class="flex flex-wrap items-center gap-3 text-sm">
                    <!-- Type -->
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
                          :class="getTypeColor(notification.type)">
                      {{ getTypeLabel(notification.type) }}
                    </span>
                    
                    <!-- Audience -->
                    <span class="text-gray-500">
                      👥 {{ getAudienceLabel(notification.audience) }}
                    </span>
                    
                    <!-- Date -->
                    <span class="text-gray-500" v-if="notification.sentAt">
                      📅 {{ formatDate(notification.sentAt) }}
                    </span>
                    
                    <!-- Destinataires -->
                    <span class="text-gray-700 font-medium">
                      📊 {{ notification.recipientCount || 0 }} destinataires
                    </span>
                  </div>
                </div>
                
                <!-- Statut et actions -->
                <div class="flex flex-col items-end space-y-3 ml-4">
                  <!-- Statut -->
                  <span :class="getStatusColor(notification.status)" 
                        class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ getStatusLabel(notification.status) }}
                  </span>
                  
                  <!-- Actions -->
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewNotification(notification)"
                      class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Voir détails"
                    >
                      <UiIcon name="eye" size="4" />
                    </button>
                    <button
                      v-if="notification.status === 'draft'"
                      @click="editNotification(notification)"
                      class="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200"
                      title="Modifier"
                    >
                      <UiIcon name="edit" size="4" />
                    </button>
                    <button
                      @click="deleteNotification(notification.id)"
                      class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Supprimer"
                    >
                      <UiIcon name="trash" size="4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Footer avec infos supplémentaires si brouillon ou programmé -->
              <div v-if="notification.status === 'draft' || notification.status === 'scheduled'" 
                   class="pt-3 border-t border-gray-100">
                <div class="flex items-center justify-between text-sm">
                  <span v-if="notification.status === 'draft'" class="text-gray-500 italic">
                    💾 Sauvegardé en brouillon
                  </span>
                  <span v-else-if="notification.status === 'scheduled'" class="text-blue-600">
                    ⏰ Programmé pour plus tard
                  </span>
                  
                  <div v-if="notification.status === 'draft'" class="flex space-x-2">
                    <button 
                      @click="editNotification(notification)"
                      class="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                    >
                      Continuer l'édition
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
    <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Prévisualisation</h3>
        <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-600">
          <UiIcon name="close" size="6" />
        </button>
      </div>
      
      <!-- Simulation de notification mobile -->
      <div class="bg-gray-100 p-4 rounded-xl">
        <div class="bg-white rounded-xl shadow-lg p-4 border-l-4 border-indigo-500">
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.021 15.479l1.414-1.414L9.021 18.65l-1.414 1.414L4.021 15.479z"/>
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
        <p><strong>Priorité:</strong> {{ getPriorityLabel(newNotification.priority) }}</p>
        <p v-if="newNotification.sendMode === 'scheduled'">
          <strong>Programmée pour:</strong> {{ newNotification.scheduledDate }} à {{ newNotification.scheduledTime }}
        </p>
      </div>
      
      <!-- Actions -->
      <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
        <button
          @click="showPreviewModal = false"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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

// États réactifs
const loading = ref(false)
const isCreating = ref(false)
const error = ref('')
const successMessage = ref('')
const showAddForm = ref(false)
const showPreviewModal = ref(false)


// Gestion des onglets
const activeTab = ref('content')
const tabs = [
  { id: 'content', label: 'Contenu', icon: '📝' },
  { id: 'targeting', label: 'Ciblage', icon: '🎯' },
  { id: 'scheduling', label: 'Programmation', icon: '📅' }
]

// Date d'aujourd'hui pour la programmation
const today = new Date().toISOString().split('T')[0]

// Statistiques (données simulées)
const stats = ref({
  total: 47,
  sent: 32,
  scheduled: 5,
  drafts: 10
})

// Formulaire de nouvelle notification
const newNotification = ref({
  title: '',
  message: '',
  type: 'info',
  priority: 'normal',
  audience: 'all',
  specificUserIds: '',
  geographicFilter: '',
  sendMode: 'immediate',
  scheduledDate: '',
  scheduledTime: '',
  silent: false,
  persistent: false
})

// Données simulées pour l'historique
const notifications = ref([
  {
    id: 1,
    title: 'Nouvelle mission disponible !',
    message: 'Une mission d\'exploration vient d\'être ajoutée dans votre quartier.',
    type: 'mission',
    priority: 'normal',
    audience: 'active',
    status: 'sent',
    sentAt: '2024-10-08T14:30:00Z',
    recipientCount: 234
  },
  {
    id: 2,
    title: 'Mise à jour de l\'application',
    message: 'Découvrez les nouvelles fonctionnalités dans la version 2.1.0',
    type: 'update',
    priority: 'high',
    audience: 'all',
    status: 'sent',
    sentAt: '2024-10-07T09:00:00Z',
    recipientCount: 892
  },
  {
    id: 3,
    title: 'Événement spécial Halloween',
    message: 'Participez à notre chasse aux trésors spéciale Halloween du 31 octobre',
    type: 'event',
    priority: 'normal',
    audience: 'all',
    status: 'scheduled',
    sentAt: null,
    recipientCount: 0
  },
  {
    id: 4,
    title: 'Rappel d\'activité',
    message: 'Cela fait un moment ! Venez découvrir les nouvelles missions ajoutées.',
    type: 'reminder',
    priority: 'low',
    audience: 'inactive',
    status: 'draft',
    sentAt: null,
    recipientCount: 0
  }
])

// Validation pour la création
const canCreateNotification = computed(() => {
  return newNotification.value.title.length >= 3 && 
         newNotification.value.message.length >= 10 &&
         (newNotification.value.sendMode !== 'scheduled' || 
          (newNotification.value.scheduledDate && newNotification.value.scheduledTime))
})

// Estimation du nombre de destinataires
const estimatedRecipients = computed(() => {
  const baseUsers = 1000 // Base d'utilisateurs simulée
  
  switch (newNotification.value.audience) {
    case 'all': return baseUsers
    case 'active': return Math.floor(baseUsers * 0.6)
    case 'inactive': return Math.floor(baseUsers * 0.25)
    case 'new': return Math.floor(baseUsers * 0.1)
    case 'premium': return Math.floor(baseUsers * 0.15)
    case 'location': return Math.floor(baseUsers * 0.3)
    case 'specific': 
      const ids = newNotification.value.specificUserIds.split(',').filter(id => id.trim())
      return ids.length
    default: return 0
  }
})

// Filters state
const filters = ref({
  search: '',
  type: '',
  status: '',
  priority: ''
})

// Computed pour les filtres actifs  
const hasActiveFilters = computed(() => {
  return filters.value.search || filters.value.type || filters.value.status || filters.value.priority
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.search) count++
  if (filters.value.type) count++
  if (filters.value.status) count++
  if (filters.value.priority) count++
  return count
})

// Fonctions utilitaires
const getTypeLabel = (type) => {
  const types = {
    info: 'Information',
    mission: 'Mission',
    achievement: 'Succès',
    update: 'Mise à jour',
    event: 'Événement',
    reminder: 'Rappel'
  }
  return types[type] || type
}

const getTypeColor = (type) => {
  const colors = {
    info: 'bg-blue-100 text-blue-800',
    mission: 'bg-green-100 text-green-800',
    achievement: 'bg-yellow-100 text-yellow-800',
    update: 'bg-purple-100 text-purple-800',
    event: 'bg-pink-100 text-pink-800',
    reminder: 'bg-orange-100 text-orange-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const getPriorityLabel = (priority) => {
  const priorities = {
    low: 'Basse',
    normal: 'Normale',
    high: 'Élevée',
    urgent: 'Urgente'
  }
  return priorities[priority] || priority
}

const getAudienceLabel = (audience) => {
  const audiences = {
    all: 'Tous',
    active: 'Actifs',
    inactive: 'Inactifs',
    new: 'Nouveaux',
    premium: 'Premium',
    location: 'Zone géographique',
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
const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value
}

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}

const clearForm = () => {
  newNotification.value = {
    title: '',
    message: '',
    type: 'info',
    priority: 'normal',
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
  error.value = ''
  
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
      recipientCount: newNotification.value.sendMode === 'draft' ? 0 : estimatedRecipients.value
    }
    
    // Ajouter à la liste
    notifications.value.unshift(newNotif)
    
    // Mettre à jour les stats
    stats.value.total++
    if (newNotif.status === 'sent') stats.value.sent++
    else if (newNotif.status === 'scheduled') stats.value.scheduled++
    else if (newNotif.status === 'draft') stats.value.drafts++
    
    successMessage.value = 'Notification créée avec succès !'
    setTimeout(() => { successMessage.value = '' }, 5000)
    
    // Réinitialiser le formulaire
    clearForm()
    showAddForm.value = false
    
  } catch (err) {
    error.value = 'Erreur lors de la création de la notification'
    console.error('Erreur:', err)
  } finally {
    isCreating.value = false
  }
}

const previewNotification = () => {
  if (canCreateNotification.value) {
    showPreviewModal.value = true
  }
}

const refreshData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Simulation de chargement
    await new Promise(resolve => setTimeout(resolve, 1000))
    successMessage.value = 'Données actualisées'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (err) {
    error.value = 'Erreur lors du rafraîchissement'
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

// Notifications filtrées
const filteredNotifications = computed(() => {
  let filtered = notifications.value

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(notification =>
      notification.title.toLowerCase().includes(search) ||
      notification.message.toLowerCase().includes(search)
    )
  }

  if (filters.value.type) {
    filtered = filtered.filter(notification => notification.type === filters.value.type)
  }

  if (filters.value.status) {
    filtered = filtered.filter(notification => notification.status === filters.value.status)
  }

  if (filters.value.priority) {
    filtered = filtered.filter(notification => notification.priority === filters.value.priority)
  }

  return filtered
})

// Update filters function for UiFilterOverlay
const updateFilters = (newFilters) => {
  filters.value = { ...newFilters }
}

// Clear filters
const clearFilters = () => {
  filters.value = {
    search: '',
    type: '',
    status: '',
    priority: ''
  }
}

const deleteNotification = async (notificationId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
    const index = notifications.value.findIndex(n => n.id === notificationId)
    if (index !== -1) {
      const notification = notifications.value[index]
      notifications.value.splice(index, 1)
      
      // Mettre à jour les stats
      stats.value.total--
      if (notification.status === 'sent') stats.value.sent--
      else if (notification.status === 'scheduled') stats.value.scheduled--
      else if (notification.status === 'draft') stats.value.drafts--
      
      successMessage.value = 'Notification supprimée'
      setTimeout(() => { successMessage.value = '' }, 3000)
    }
  }
}
</script>

<style scoped>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
}
</style>