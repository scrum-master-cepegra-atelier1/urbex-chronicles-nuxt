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
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Missions</h1>
      </div>
      
      <div class="flex-1 flex flex-col overflow-hidden ml-8">
        
        <!-- Stats Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <!-- Missions totales -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalMissions }}</div>
              <div class="text-base lg:text-lg text-gray-600">Missions totales</div>
            </div>

            <!-- Missions publiées -->
            <div class="bg-green-50 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-green-700 mb-2" style="font-family: 'Freeman', sans-serif;">{{ publishedMissions }}</div>
              <div class="text-base lg:text-lg text-green-600">Publiées</div>
            </div>

            <!-- Missions modifiées -->
            <div class="bg-orange-50 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-orange-700 mb-2" style="font-family: 'Freeman', sans-serif;">{{ modifiedMissions }}</div>
              <div class="text-base lg:text-lg text-orange-600">Modifiées</div>
            </div>

            <!-- Missions en brouillon -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ draftMissions }}</div>
              <div class="text-base lg:text-lg text-gray-600">Brouillon</div>
            </div>
          </div>
        </div>

        <!-- Add Mission Section -->
        <div class="mb-12 flex-shrink-0">
          <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <!-- Header cliquable -->
            <div 
              @click="showAddForm = !showAddForm"
              class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-white flex items-center" style="font-family: 'Do Hyeon', sans-serif;">
                    <UiIcon name="plus" size="lg" class="mr-3 text-blue-200" />
                    Ajouter une nouvelle mission
                  </h2>
                  <p class="text-blue-100 mt-1">
                    Créez une mission avec géolocalisation et description détaillée
                  </p>
                </div>
                <!-- Icône de déroulement -->
                <div class="flex items-center">
                  <UiIcon 
                    name="close"
                    :class="{ 'rotate-180': showAddForm }" 
                    class="text-blue-200 transform transition-transform duration-200"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            <!-- Contenu du formulaire (collapsible) -->
            <div 
              v-show="showAddForm" 
              class="transition-all duration-300 ease-in-out"
              :class="showAddForm ? 'animate-fade-in' : ''"
            >
              <!-- Onglets -->
              <div class="border-b border-gray-200">
                <nav class="flex space-x-8 px-6" aria-label="Tabs">
                  <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="setActiveTab(tab.id)"
                    :class="[
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
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
              <!-- Onglet Informations -->
              <div v-if="activeTab === 'infos'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Informations générales</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Titre -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Titre <span class="text-red-500">*</span></label>
                    <input 
                      v-model="newMission.title"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Nom de la mission (min. 5 caractères)"
                      required
                    />
                  </div>
                  
                  <!-- Threshold -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Threshold (mètres)</label>
                    <input 
                      v-model="newMission.threshold"
                      type="number" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Seuil requis en mètres"
                    />
                  </div>
                  
                  <!-- Statut -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <select 
                      v-model="newMission.status"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                    </select>
                  </div>
                  
                  <!-- Circuit associé -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Circuit associé (optionnel)</label>
                    <select 
                      v-model="newMission.circuit"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Aucun circuit</option>
                      <option 
                        v-for="circuit in circuits" 
                        :key="circuit.id" 
                        :value="circuit.id"
                      >
                        {{ circuit.name || `Circuit ${circuit.id}` }}
                      </option>
                    </select>
                    <p class="mt-1 text-sm text-gray-500">Associez cette mission à un circuit existant</p>
                  </div>
                </div>
              </div>

              <!-- Onglet Localisation -->
              <div v-if="activeTab === 'location'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Géolocalisation</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Latitude -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input 
                      v-model="newMission.latitude"
                      type="number" 
                      step="any"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="ex: 50.8503"
                    />
                    <p class="mt-1 text-sm text-gray-500">Coordonnée latitude de la mission</p>
                  </div>
                  
                  <!-- Longitude -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input 
                      v-model="newMission.longitude"
                      type="number" 
                      step="any"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="ex: 4.3517"
                    />
                    <p class="mt-1 text-sm text-gray-500">Coordonnée longitude de la mission</p>
                  </div>
                  
                  <!-- Adresse (optionnel) -->
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Adresse (optionnel)</label>
                    <input 
                      v-model="newMission.address"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Adresse approximative du lieu"
                    />
                  </div>
                </div>
              </div>

              <!-- Onglet Description -->
              <div v-if="activeTab === 'description'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Description détaillée</h4>
                <div class="space-y-4">
                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                      v-model="newMission.description"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Description détaillée de la mission"
                      rows="4"
                    ></textarea>
                    <p class="mt-1 text-sm text-gray-500">Décrivez l'objectif et les détails de la mission</p>
                  </div>

                  <!-- Hint -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Indice (optionnel)</label>
                    <textarea 
                      v-model="newMission.hint"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Indice pour aider à accomplir la mission"
                      rows="2"
                    ></textarea>
                    <p class="mt-1 text-sm text-gray-500">Indice facultatif pour guider l'utilisateur</p>
                  </div>

                  <!-- Media Component -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Media associé</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div v-if="newMission.media">
                        <div class="text-sm text-green-600 mb-2">✅ Media configuré</div>
                        <div class="bg-gray-50 rounded p-3">
                          <div><strong>Type:</strong> {{ newMission.media.type || 'Non défini' }}</div>
                          <div><strong>URL:</strong> {{ newMission.media.url || 'Non définie' }}</div>
                          <div><strong>Description:</strong> {{ newMission.media.description || 'Aucune' }}</div>
                          <button
                            type="button"
                            @click="newMission.media = null"
                            class="mt-2 text-sm text-red-600 hover:text-red-800"
                          >
                            Supprimer le media
                          </button>
                        </div>
                      </div>
                      <div v-else class="text-center py-8">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011-1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM7 8v10a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6m-3-3v6" />
                        </svg>
                        <p class="text-sm text-gray-500 mt-2">Aucun media configuré</p>
                        <button
                          type="button"
                          @click="newMission.media = { type: '', url: '', description: '' }"
                          class="mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Ajouter un media
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Achievement -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Succès associé</label>
                    <div class="border border-gray-300 rounded-lg p-4">
                      <div v-if="newMission.achievement">
                        <div class="flex items-center justify-between bg-yellow-50 rounded p-3">
                          <div class="flex items-center">
                            <span class="text-2xl mr-2">🏆</span>
                            <div>
                              <div class="font-medium">{{ newMission.achievement.name || 'Achievement sélectionné' }}</div>
                              <div class="text-sm text-gray-600">{{ newMission.achievement.experience || 0 }} XP</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            @click="newMission.achievement = null"
                            class="text-red-600 hover:text-red-800 text-sm"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                      <div v-else class="text-center py-4">
                        <span class="text-4xl">🏆</span>
                        <p class="text-sm text-gray-500 mt-2">Aucun succès associé</p>
                        <button
                          type="button"
                          @click="selectAchievement"
                          class="mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Associer un succès
                        </button>
                      </div>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Succès débloqué lors de la réussite de cette mission</p>
                  </div>
                  
                  <!-- Instructions -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                    <textarea 
                      v-model="newMission.instructions"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Instructions spécifiques pour accomplir la mission"
                      rows="3"
                    ></textarea>
                    <p class="mt-1 text-sm text-gray-500">Instructions détaillées pour les utilisateurs</p>
                  </div>
                  
                  <!-- Type de mission -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Type de mission</label>
                    <select 
                      v-model="newMission.type"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="exploration">Exploration</option>
                      <option value="photo">Photo</option>
                      <option value="enquete">Enquête</option>
                      <option value="decouverte">Découverte</option>
                    </select>
                  </div>
                  
                  <!-- Difficulté -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                    <select 
                      v-model="newMission.difficulty"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="facile">Facile</option>
                      <option value="moyen">Moyen</option>
                      <option value="difficile">Difficile</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- Actions (toujours visibles) -->
              <div class="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  @click="createMission"
                  :disabled="!canCreateMission || isCreating"
                  :class="canCreateMission && !isCreating ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                  class="px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
                >
                  <UiIcon v-if="!isCreating" name="plus" size="sm" class="mr-2" />
                  <UiIcon v-else name="refresh" size="sm" class="mr-2 animate-spin" />
                  {{ isCreating ? 'Création...' : 'Créer la mission' }}
                </button>
                <button
                  @click="clearForm"
                  :disabled="isCreating"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Réinitialiser
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Missions Management Table -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">Gestion des missions</h2>
            <div class="flex items-center space-x-4">
              <UiFilterOverlay
                page-title="les missions"
                :filters="{ status: filters.status, type: filters.type, difficulty: filters.difficulty }"
                :active-filters-count="activeFiltersCount"
                @update:filters="updateFilters"
                @reset="resetFilters"
              >
                <template #default="{ filters: filterValues, updateFilter }">
                  <div class="space-y-4">
                    <!-- Filtres pour les missions -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                      <select 
                        :value="filterValues.status"
                        @change="updateFilter('status', $event.target.value)"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Tous</option>
                        <option value="published">Publié</option>
                        <option value="modified">Modifié (à republier)</option>
                        <option value="draft">Brouillon</option>
                      </select>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select 
                        :value="filterValues.type"
                        @change="updateFilter('type', $event.target.value)"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Tous</option>
                        <option value="exploration">Exploration</option>
                        <option value="photo">Photo</option>
                        <option value="enquete">Enquête</option>
                        <option value="decouverte">Découverte</option>
                      </select>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                      <select 
                        :value="filterValues.difficulty"
                        @change="updateFilter('difficulty', $event.target.value)"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Tous</option>
                        <option value="facile">Facile</option>
                        <option value="moyen">Moyen</option>
                        <option value="difficile">Difficile</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </template>
              </UiFilterOverlay>
              <UiRefreshButton
                @click="refreshMissions"
                :loading="loading"
                variant="secondary"
                size="sm"
              />
            </div>
          </div>
          
          <!-- Résultats des filtres (si filtres actifs) -->
          <div v-if="activeFiltersCount > 0" class="mb-6 p-3 bg-purple-50 border border-purple-200 rounded-md">
            <div class="flex items-center justify-between">
              <span class="text-sm text-purple-700">
                {{ filteredMissions.length }} mission(s) trouvée(s) sur {{ missions.length }}
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

          <!-- Message si aucune mission -->
          <div v-if="!loading && !error && filteredMissions.length === 0 && missions.length === 0" class="mb-4 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="text-center">
              <UiIcon name="warning" size="xl" class="mx-auto text-yellow-400 mb-3" />
              <h3 class="text-lg font-medium text-yellow-800 mb-1">Aucune mission trouvée</h3>
              <p class="text-yellow-700">
                Aucune mission n'est enregistrée dans votre base de données Strapi.
                <br>Créez des missions dans l'interface d'administration de Strapi.
              </p>
            </div>
          </div>
          
          <!-- Message si aucun résultat après filtrage -->
          <div v-if="!loading && !error && filteredMissions.length === 0 && missions.length > 0" class="mb-4 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="text-center">
              <UiIcon name="search" size="xl" class="mx-auto text-blue-400 mb-3" />
              <h3 class="text-lg font-medium text-blue-800 mb-1">Aucun résultat</h3>
              <p class="text-blue-700">
                Aucune mission ne correspond à vos critères de filtrage.
                <br>Essayez de modifier ou réinitialiser les filtres.
              </p>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200">
            <!-- Table Header -->
            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <div class="grid grid-cols-8 gap-6 text-base font-medium text-gray-700">
                <div>Titre</div>
                <div>Description</div>
                <div>Latitude</div>
                <div>Longitude</div>
                <div>Threshold</div>
                <div>Circuit</div>
                <div>Statut</div>
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

              <!-- Missions list -->
              <div 
                v-else
                v-for="mission in filteredMissions" 
                :key="mission.id"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="grid grid-cols-8 gap-6 items-center text-base">
                  <div class="text-gray-900 font-medium">
                    <button 
                      @click="editMission(mission)"
                      class="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 cursor-pointer text-left"
                      :title="'Modifier la mission: ' + (mission.title || 'N/A')"
                    >
                      {{ mission.title || 'N/A' }}
                    </button>
                  </div>
                  <div class="text-gray-600 truncate" :title="mission.description">{{ mission.description || 'N/A' }}</div>
                  <div class="text-gray-600 font-mono text-sm">{{ mission.latitude || 'N/A' }}</div>
                  <div class="text-gray-600 font-mono text-sm">{{ mission.longitude || 'N/A' }}</div>
                  <div class="text-gray-900 font-bold">{{ mission.threshold || 'N/A' }}</div>
                  <div class="text-gray-600 text-sm">
                    <NuxtLink 
                      v-if="mission.circuit && getCircuitName(mission.circuit) !== 'Aucun'"
                      :to="'/admin/circuits'"
                      class="text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-200 cursor-pointer"
                      :title="'Voir le circuit: ' + getCircuitName(mission.circuit)"
                    >
                      {{ getCircuitName(mission.circuit) }}
                    </NuxtLink>
                    <span v-else>{{ getCircuitName(mission.circuit) }}</span>
                  </div>
                  <div class="flex items-center">
                    <span 
                      :class="{
                        'bg-green-100 text-green-800': mission.status === 'published',
                        'bg-orange-100 text-orange-800': mission.status === 'modified',
                        'bg-gray-100 text-gray-800': mission.status === 'draft'
                      }" 
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ 
                        mission.status === 'published' ? 'Publié' : 
                        mission.status === 'modified' ? 'Modifié' : 
                        'Brouillon' 
                      }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="editMission(mission)"
                      class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2"
                      title="Modifier"
                    >
                      <UiIcon name="edit" size="sm" />
                    </button>
                    <button
                      @click="handleDeleteMission(mission.documentId || mission.id)"
                      class="text-red-600 hover:text-red-800 transition-colors duration-200 p-2"
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
  
  <!-- Modal d'édition de mission -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">Modifier la mission</h3>
        <button @click="cancelEdit" class="text-gray-400 hover:text-gray-600">
          <UiIcon name="close" size="lg" />
        </button>
      </div>
      
      <!-- Onglets -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in editTabs"
            :key="tab.id"
            @click="setEditActiveTab(tab.id)"
            :class="[
              editActiveTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2'
            ]"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </nav>
      </div>
      
      <!-- Formulaire d'édition -->
      <div v-if="editingMission" class="space-y-6">
        <!-- Onglet Informations -->
        <div v-if="editActiveTab === 'infos'" class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Informations générales</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Titre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Titre <span class="text-red-500">*</span></label>
              <input 
                v-model="editingMission.title"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nom de la mission (min. 5 caractères)"
                required
              />
            </div>
            
            <!-- Threshold -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Threshold (mètres)</label>
              <input 
                v-model="editingMission.threshold"
                type="number" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Seuil requis en mètres"
              />
            </div>
            
            <!-- Statut -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select 
                v-model="editingMission.published"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option :value="false">Brouillon</option>
                <option :value="true">Publié</option>
              </select>
            </div>
            
            <!-- Circuit associé -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Circuit associé (optionnel)</label>
              <select 
                v-model="editingMission.circuit"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Aucun circuit</option>
                <option 
                  v-for="circuit in circuits" 
                  :key="circuit.id" 
                  :value="circuit.id"
                >
                  {{ circuit.name || `Circuit ${circuit.id}` }}
                </option>
              </select>
              <p class="mt-1 text-sm text-gray-500">Associez cette mission à un circuit existant</p>
            </div>
          </div>
        </div>

        <!-- Onglet Localisation -->
        <div v-if="editActiveTab === 'location'" class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Géolocalisation</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Latitude -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
              <input 
                v-model="editingMission.latitude"
                type="number" 
                step="any"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="ex: 50.8503"
              />
              <p class="mt-1 text-sm text-gray-500">Coordonnée latitude de la mission</p>
            </div>
            
            <!-- Longitude -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
              <input 
                v-model="editingMission.longitude"
                type="number" 
                step="any"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="ex: 4.3517"
              />
              <p class="mt-1 text-sm text-gray-500">Coordonnée longitude de la mission</p>
            </div>
            
            <!-- Adresse (optionnel) -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Adresse (optionnel)</label>
              <input 
                v-model="editingMission.address"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Adresse approximative du lieu"
              />
            </div>
          </div>
        </div>

        <!-- Onglet Description -->
        <div v-if="editActiveTab === 'description'" class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Description détaillée</h4>
          <div class="space-y-4">
            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                v-model="editingMission.description"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Description détaillée de la mission"
                rows="4"
              ></textarea>
              <p class="mt-1 text-sm text-gray-500">Décrivez l'objectif et les détails de la mission</p>
            </div>

            <!-- Hint -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Indice (optionnel)</label>
              <textarea 
                v-model="editingMission.hint"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Indice pour aider à accomplir la mission"
                rows="2"
              ></textarea>
              <p class="mt-1 text-sm text-gray-500">Indice facultatif pour guider l'utilisateur</p>
            </div>

            <!-- Media Component -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Media associé</label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div v-if="editingMission.media">
                  <div class="text-sm text-green-600 mb-2">✅ Media configuré</div>
                  <div class="bg-gray-50 rounded p-3">
                    <div><strong>Type:</strong> {{ editingMission.media.type || 'Non défini' }}</div>
                    <div><strong>URL:</strong> {{ editingMission.media.url || 'Non définie' }}</div>
                    <div><strong>Description:</strong> {{ editingMission.media.description || 'Aucune' }}</div>
                    <button
                      type="button"
                      @click="editingMission.media = null"
                      class="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Supprimer le media
                    </button>
                  </div>
                </div>
                <div v-else class="text-center py-8">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011-1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM7 8v10a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6m-3-3v6" />
                  </svg>
                  <p class="text-sm text-gray-500 mt-2">Aucun media configuré</p>
                  <button
                    type="button"
                    @click="editingMission.media = { type: '', url: '', description: '' }"
                    class="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Ajouter un media
                  </button>
                </div>
              </div>
            </div>

            <!-- Achievement -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Succès associé</label>
              <div class="border border-gray-300 rounded-lg p-4">
                <div v-if="editingMission.achievement">
                  <div class="flex items-center justify-between bg-yellow-50 rounded p-3">
                    <div class="flex items-center">
                      <span class="text-2xl mr-2">🏆</span>
                      <div>
                        <div class="font-medium">{{ editingMission.achievement.name || 'Achievement sélectionné' }}</div>
                        <div class="text-sm text-gray-600">{{ editingMission.achievement.experience || 0 }} XP</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="editingMission.achievement = null"
                      class="text-red-600 hover:text-red-800 text-sm"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
                <div v-else class="text-center py-4">
                  <span class="text-4xl">🏆</span>
                  <p class="text-sm text-gray-500 mt-2">Aucun succès associé</p>
                  <button
                    type="button"
                    @click="selectEditAchievement"
                    class="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Associer un succès
                  </button>
                </div>
              </div>
              <p class="mt-1 text-sm text-gray-500">Succès débloqué lors de la réussite de cette mission</p>
            </div>
            
            <!-- Instructions -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
              <textarea 
                v-model="editingMission.instructions"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Instructions spécifiques pour accomplir la mission"
                rows="3"
              ></textarea>
              <p class="mt-1 text-sm text-gray-500">Instructions détaillées pour les utilisateurs</p>
            </div>
            
            <!-- Type de mission -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type de mission</label>
              <select 
                v-model="editingMission.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="exploration">Exploration</option>
                <option value="photo">Photo</option>
                <option value="enquete">Enquête</option>
                <option value="decouverte">Découverte</option>
              </select>
            </div>
            
            <!-- Difficulté -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
              <select 
                v-model="editingMission.difficulty"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            @click="cancelEdit"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            @click="saveEditMission"
            :disabled="!editingMission.title || !editingMission.title.length"
            :class="editingMission.title && editingMission.title.length ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
          >
            <UiIcon name="check" size="sm" class="mr-2" />
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Meta de la page
definePageMeta({
  title: 'Missions Urbex'
})

// Head configuration
useHead({
  title: 'Missions Urbex',
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

// Utilisation du composable pour la gestion des missions
const { 
  missions, 
  loading, 
  error, 
  totalMissions,
  publishedMissions,
  draftMissions,
  modifiedMissions,
  fetchMissions, 
  createMission: createMissionApi,
  updateMission,
  deleteMission,
  publishMission,
  unpublishMission
} = await useMissions()

// Charger les circuits pour la relation
const { circuits, fetchCircuits } = useCircuits()
await fetchCircuits()

// Gestion des onglets pour l'ajout de mission
const activeTab = ref('infos')
const showAddForm = ref(false)
const tabs = [
  { id: 'infos', label: 'Informations', icon: '📝' },
  { id: 'location', label: 'Localisation', icon: '📍' },
  { id: 'description', label: 'Description', icon: '📋' }
]

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}

// Gestion des onglets pour le modal d'édition
const editActiveTab = ref('infos')
const editTabs = [
  { id: 'infos', label: 'Informations', icon: '📝' },
  { id: 'location', label: 'Localisation', icon: '📍' },
  { id: 'description', label: 'Description', icon: '📋' }
]

const setEditActiveTab = (tabId) => {
  editActiveTab.value = tabId
}

// Chargement initial des missions
await fetchMissions()

// États réactifs pour les filtres
const filters = ref({
  status: '',
  type: '',
  difficulty: ''
})

// État pour la dernière mise à jour
const lastUpdated = ref(new Date())

// Méthodes de gestion des filtres
const updateFilters = (newFilters) => {
  filters.value = { ...newFilters }
}

const resetFilters = () => {
  filters.value = {
    status: '',
    type: '',
    difficulty: ''
  }
}

// Compteur de filtres actifs
const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.status) count++
  if (filters.value.type) count++
  if (filters.value.difficulty) count++
  return count
})

// Missions filtrées
const filteredMissions = computed(() => {
  let result = missions.value
  
  // Filtre par statut (utiliser mission.status au lieu de mission.published)
  if (filters.value.status) {
    result = result.filter(m => m.status === filters.value.status)
  }
  
  // Filtre par type
  if (filters.value.type) {
    result = result.filter(m => m.type === filters.value.type)
  }
  
  // Filtre par difficulté
  if (filters.value.difficulty) {
    result = result.filter(m => m.difficulty === filters.value.difficulty)
  }
  
  return result
})

// États réactifs pour le formulaire d'ajout
const newMission = ref({
  // Champs requis du schema
  title: '',
  description: '',
  latitude: null,
  longitude: null,
  threshold: null,
  
  // Champs optionnels du schema
  hint: '',
  media: null,
  achievement: null,
  circuit: null, // Relation avec le circuit
  
  // Champs legacy (pour compatibilité)
  instructions: '',
  address: '',
  type: 'exploration',
  difficulty: 'moyen',
  published: false
})

const isCreating = ref(false)

// États pour la modal d'édition
const showEditModal = ref(false)
const editingMission = ref(null)
const originalPublishedState = ref(false) // Sauvegarder l'état de publication original

// Validation pour la création
const canCreateMission = computed(() => {
  return newMission.value.title && newMission.value.title.length >= 5
})

// Fonctions pour le formulaire
const clearForm = () => {
  newMission.value = {
    title: '',
    description: '',
    instructions: '',
    latitude: null,
    longitude: null,
    address: '',
    threshold: null,
    type: 'exploration',
    difficulty: 'moyen',
    status: 'draft',
    hint: '',
    media: null,
    achievement: null,
    circuit: null
  }
}

const createMission = async () => {
  if (!canCreateMission.value) return
  isCreating.value = true
  try {
    // Préparer les données pour Strapi (ne pas envoyer published/publishedAt)
    const missionData = {
      title: newMission.value.title,
      description: newMission.value.description || '',
      latitude: newMission.value.latitude,
      longitude: newMission.value.longitude,
      threshold: newMission.value.threshold,
      hint: newMission.value.hint || null,
      media: newMission.value.media || null,
      achievement: newMission.value.achievement || null,
      circuit: newMission.value.circuit || null,
      instructions: newMission.value.instructions || '',
      address: newMission.value.address || '',
      type: newMission.value.type || 'exploration',
      difficulty: newMission.value.difficulty || 'moyen'
    }
    // Créer la mission via l'API Strapi
    const created = await createMissionApi(missionData)
    // Si demandé, publier la mission après création
    if (newMission.value.status === 'published' && created?.id) {
      await publishMission(created.id)
    }
    // Afficher une notification de succès
    console.log('Mission créée avec succès dans Strapi')
    // Réinitialiser le formulaire
    clearForm()
    
  } catch (err) {
    console.error('Erreur lors de la création de la mission:', err)
    // L'erreur est déjà gérée par le composable
  } finally {
    isCreating.value = false
  }
}

// Fonctions pour les actions sur les missions
const editMission = (mission) => {
  // Sauvegarder l'état de publication ORIGINAL
  originalPublishedState.value = mission.publishedAt != null
  
  // Réinitialiser l'onglet actif
  editActiveTab.value = 'infos'
  
  editingMission.value = { 
    ...mission,
    published: mission.publishedAt != null,  // Convertir publishedAt en boolean pour l'interface
    // S'assurer que tous les champs optionnels existent
    hint: mission.hint || '',
    media: mission.media || null,
    achievement: mission.achievement || null,
    circuit: mission.circuit || null,
    instructions: mission.instructions || '',
    address: mission.address || '',
    type: mission.type || 'exploration',
    difficulty: mission.difficulty || 'moyen'
  }
  showEditModal.value = true
}

const saveEditMission = async () => {
  if (!editingMission.value) return
  
  try {
    const missionId = editingMission.value.documentId || editingMission.value.id
    
    console.log('🔍 DEBUG - Mission à modifier:', {
      id: editingMission.value.id,
      documentId: editingMission.value.documentId,
      missionId: missionId,
      wasPublished: editingMission.value.publishedAt != null,
      wantsToPublish: editingMission.value.published,
      fullData: editingMission.value
    })
    
    // IMPORTANT : Envoyer TOUS les champs pour éviter leur suppression
    // NE PAS envoyer publishedAt - Strapi v5 gère ça automatiquement avec draft/publish
    const missionData = {
      // Champs requis du schema
      title: editingMission.value.title,
      description: editingMission.value.description || '',
      latitude: editingMission.value.latitude,
      longitude: editingMission.value.longitude,
      threshold: editingMission.value.threshold,
      
      // Champs optionnels (garder les valeurs existantes)
      hint: editingMission.value.hint || null,
      media: editingMission.value.media || null,
      achievement: editingMission.value.achievement || null,
      circuit: editingMission.value.circuit || null,
      
      // Champs legacy (pour compatibilité)
      instructions: editingMission.value.instructions || '',
      address: editingMission.value.address || '',
      type: editingMission.value.type || 'exploration',
      difficulty: editingMission.value.difficulty || 'moyen'
      
      // ❌ NE PAS ENVOYER publishedAt - Strapi v5 le gère automatiquement
    }
    
    console.log('📦 DEBUG - Données envoyées (sans publishedAt):', missionData)
    
    // 1. Mise à jour de la mission via l'API
    const result = await updateMission(missionId, missionData)
    
    console.log('✅ DEBUG - Mission mise à jour:', result)
    
    // 2. Gérer le statut de publication séparément si changé
    const wasPublished = originalPublishedState.value  // Utiliser l'état ORIGINAL sauvegardé
    const wantsToPublish = editingMission.value.published
    
    console.log('🔍 DEBUG - Comparaison états:', { 
      wasPublished, 
      wantsToPublish,
      willPublish: !wasPublished && wantsToPublish,
      willUnpublish: wasPublished && !wantsToPublish,
      willRepublish: wasPublished && wantsToPublish
    })
    
    if (!wasPublished && wantsToPublish) {
      // Publier une mission qui était en draft
      console.log('� DEBUG - Publication de la mission...')
      await publishMission(missionId)
    } else if (wasPublished && !wantsToPublish) {
      // Dépublier une mission qui était publiée
      console.log('📝 DEBUG - Dépublication de la mission...')
      await unpublishMission(missionId)
    } else if (wasPublished && wantsToPublish) {
      // La mission reste publiée, publier les changements
      console.log('🔄 DEBUG - Republication des changements...')
      await publishMission(missionId)
    }
    
    // Fermer la modal
    showEditModal.value = false
    editingMission.value = null
    originalPublishedState.value = false
    editActiveTab.value = 'infos' // Réinitialiser l'onglet actif
    
    // Rafraîchir la liste après un court délai pour laisser Strapi synchroniser
    setTimeout(async () => {
      await fetchMissions()
      lastUpdated.value = new Date()
    }, 500)
    
    // Message de succès
    alert('Mission mise à jour avec succès !')
    
  } catch (err) {
    console.error('❌ DEBUG - Erreur complète:', {
      message: err.message,
      response: err.response,
      stack: err.stack
    })
    // Afficher un message d'erreur à l'utilisateur
    alert(`Erreur lors de la mise à jour de la mission: ${err.message}`)
  }
}

const cancelEdit = () => {
  showEditModal.value = false
  editingMission.value = null
  originalPublishedState.value = false
  editActiveTab.value = 'infos' // Réinitialiser l'onglet actif
}

// Fonction pour sélectionner un achievement
const selectAchievement = () => {
  // Simulation d'une sélection d'achievement (à remplacer par une vraie modal/sélection)
  newMission.value.achievement = {
    name: 'Explorateur débutant',
    experience: 100
  }
}

// Fonction pour sélectionner un achievement dans le modal d'édition
const selectEditAchievement = () => {
  // Simulation d'une sélection d'achievement (à remplacer par une vraie modal/sélection)
  editingMission.value.achievement = {
    name: 'Explorateur débutant',
    experience: 100
  }
}

// Fonction utilitaire pour récupérer le nom du circuit
const getCircuitName = (circuitId) => {
  if (!circuitId) return 'Aucun'
  const circuit = circuits.value.find(c => c.id === circuitId || c.documentId === circuitId)
  return circuit ? (circuit.name || `Circuit ${circuit.id}`) : 'Circuit inconnu'
}

const handleDeleteMission = async (missionId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
    await deleteMission(missionId)
  }
}

const refreshMissions = async () => {
  await fetchMissions()
  lastUpdated.value = new Date()
}
</script>

<style>
/* Permettre le scroll normal sur toutes les pages */
html, body {
  margin: 0;
  padding: 0;
}

/* Animation fade-in pour le formulaire collapsible */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>