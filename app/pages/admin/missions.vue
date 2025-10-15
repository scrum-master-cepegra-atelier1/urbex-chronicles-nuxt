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
          <div class="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
            <!-- Total missions -->
            <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">{{ totalMissions }}</div>
              <div class="text-base lg:text-lg text-gray-600">Total</div>
            </div>

            <!-- Questions QCM -->
            <div class="bg-blue-50 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-blue-700 mb-2" style="font-family: 'Freeman', sans-serif;">{{ qcmQuestions }}</div>
              <div class="text-base lg:text-lg text-blue-600">QCM</div>
            </div>

            <!-- Questions Enigmes -->
            <div class="bg-purple-50 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-purple-700 mb-2" style="font-family: 'Freeman', sans-serif;">{{ enigmeQuestions }}</div>
              <div class="text-base lg:text-lg text-purple-600">Énigmes</div>
            </div>

            <!-- Questions QR -->
            <div class="bg-green-50 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-green-700 mb-2" style="font-family: 'Freeman', sans-serif;">{{ qrQuestions }}</div>
              <div class="text-base lg:text-lg text-green-600">QR Code</div>
            </div>

            <!-- Questions Vue 360 -->
            <div class="bg-orange-50 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-orange-700 mb-2" style="font-family: 'Freeman', sans-serif;">{{ vue360Questions }}</div>
              <div class="text-base lg:text-lg text-orange-600">Vue 360°</div>
            </div>

            <!-- Questions Autres -->
            <div class="bg-gray-50 rounded-lg p-4 lg:p-6">
              <div class="text-4xl lg:text-5xl font-bold text-gray-700 mb-2" style="font-family: 'Freeman', sans-serif;">{{ autreQuestions }}</div>
              <div class="text-base lg:text-lg text-gray-600">Autres</div>
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
                  
                  <!-- Circuit associé -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Circuit associé (optionnel)</label>
                    <select 
                      v-model="newMission.circuit_id"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option :value="null">Aucun circuit</option>
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
                </div>
              </div>

              <!-- Onglet Question -->
              <div v-if="activeTab === 'question'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Question associée</h4>
                <div class="border border-gray-200 rounded-lg p-4">
                  <div v-if="newMission.question">
                    <!-- Affichage de la question existante -->
                    <div class="bg-blue-50 rounded-lg p-4 mb-4">
                      <div class="flex items-center justify-between mb-3">
                        <span class="text-lg font-medium text-blue-800">Question configurée</span>
                        <button 
                          @click="newMission.question = null"
                          class="text-red-600 hover:text-red-800 text-sm"
                        >
                          Supprimer
                        </button>
                      </div>
                      <div class="space-y-2">
                        <div><strong>Type:</strong> {{ questionTypeLabel(newMission.question.type) }}</div>
                        <div><strong>Titre:</strong> {{ newMission.question.title }}</div>
                        <div><strong>Énoncé:</strong> {{ newMission.question.statement }}</div>
                        <div v-if="newMission.question.type === 'qcm'">
                          <strong>Choix:</strong> {{ newMission.question.data.choices.join(', ') }}
                        </div>
                        <div><strong>Réponse correcte:</strong> {{ newMission.question.answer.correct }}</div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <!-- Formulaire de création de question -->
                    <div class="space-y-4">
                      <!-- Type de question -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Type de question</label>
                        <select 
                          v-model="questionForm.type"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="qcm">QCM (Questionnaire à choix multiple)</option>
                          <option value="enigme">Énigme</option>
                          <option value="qr">QR Code</option>
                          <option value="vue360">Vue 360°</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>

                      <!-- Titre de la question -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Titre de la question</label>
                        <input 
                          v-model="questionForm.title"
                          type="text" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="ex: Quel arbre est le plus grand ?"
                        />
                      </div>

                      <!-- Énoncé -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Énoncé</label>
                        <textarea 
                          v-model="questionForm.statement"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Décrivez précisément la question"
                          rows="3"
                        ></textarea>
                      </div>

                      <!-- Choix pour QCM -->
                      <div v-if="questionForm.type === 'qcm'">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Choix de réponses</label>
                        <div class="space-y-2 mb-3">
                          <div v-for="(choice, index) in questionForm.choices" :key="index" class="flex items-center space-x-2">
                            <input 
                              v-model="questionForm.choices[index]"
                              type="text" 
                              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              :placeholder="`Choix ${index + 1}`"
                            />
                            <button 
                              @click="removeChoice(index)"
                              class="text-red-600 hover:text-red-800 p-2"
                              :disabled="questionForm.choices.length <= 2"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        <button 
                          @click="addChoice"
                          class="text-blue-600 hover:text-blue-800 text-sm"
                          :disabled="questionForm.choices.length >= 6"
                        >
                          + Ajouter un choix
                        </button>
                      </div>

                      <!-- Réponse correcte -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Réponse correcte</label>
                        <select 
                          v-if="questionForm.type === 'qcm'"
                          v-model="questionForm.correct"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Sélectionnez la bonne réponse</option>
                          <option v-for="choice in questionForm.choices.filter(c => c.trim())" :key="choice" :value="choice">
                            {{ choice }}
                          </option>
                        </select>
                        <input 
                          v-else
                          v-model="questionForm.correct"
                          type="text" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          :placeholder="getAnswerPlaceholder(questionForm.type)"
                        />
                      </div>

                      <!-- Difficulté -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                        <select 
                          v-model="questionForm.difficulty"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="easy">Facile</option>
                          <option value="medium">Moyen</option>
                          <option value="hard">Difficile</option>
                        </select>
                      </div>

                      <!-- Actions pour la question -->
                      <div class="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          @click="createQuestion"
                          :disabled="!canCreateQuestion"
                          :class="canCreateQuestion ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                          class="px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          Créer la question
                        </button>
                        <button
                          @click="clearQuestionForm"
                          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                        >
                          Réinitialiser
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="text-sm text-gray-500">Une seule question par mission. La question sera intégrée lors de la création de la mission.</p>
              </div>

              <!-- Onglet Circuits -->
              <div v-if="activeTab === 'circuits'" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Circuits disponibles</h4>
                
                <!-- Sélection de circuit -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Associer un circuit</label>
                  <select 
                    v-model="newMission.circuit_id"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option :value="null">Aucun circuit</option>
                    <option 
                      v-for="circuit in circuits" 
                      :key="circuit.id" 
                      :value="circuit.id"
                    >
                      {{ circuit.name || `Circuit ${circuit.id}` }} - {{ circuit.description || 'Pas de description' }}
                    </option>
                  </select>
                  <p class="mt-1 text-sm text-gray-500">Sélectionnez un circuit existant pour associer cette mission</p>
                </div>

                <!-- Liste des circuits avec leurs missions -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h5 class="font-medium text-gray-900">Aperçu des circuits existants</h5>
                  </div>
                  <div class="max-h-96 overflow-y-auto">
                    <div v-if="circuits.length === 0" class="p-6 text-center text-gray-500">
                      Aucun circuit disponible
                    </div>
                    <div v-else>
                      <div v-for="circuit in circuits" :key="circuit.id" class="p-4 border-b border-gray-100 last:border-b-0">
                        <div class="flex items-start justify-between">
                          <div class="flex-1">
                            <h6 class="font-medium text-gray-900">{{ circuit.name || `Circuit ${circuit.id}` }}</h6>
                            <p class="text-sm text-gray-600 mt-1">{{ circuit.description || 'Pas de description' }}</p>
                            <div class="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                              <span>ID: {{ circuit.id }}</span>
                              <span v-if="circuit.missions_count !== undefined">{{ circuit.missions_count }} mission(s)</span>
                            </div>
                          </div>
                          <button
                            @click="newMission.circuit_id = circuit.id"
                            :class="newMission.circuit_id === circuit.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                            class="px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                          >
                            {{ newMission.circuit_id === circuit.id ? 'Sélectionné' : 'Sélectionner' }}
                          </button>
                        </div>
                      </div>
                    </div>
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
                :filters="{ circuit: filters.circuit }"
                :active-filters-count="activeFiltersCount"
                @update:filters="updateFilters"
                @reset="resetFilters"
              >
                <template #default="{ filters: filterValues, updateFilter }">
                  <div class="space-y-4">
                    <!-- Filtre par circuit -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Circuit</label>
                      <select 
                        :value="filterValues.circuit"
                        @change="updateFilter('circuit', $event.target.value)"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Tous les circuits</option>
                        <option 
                          v-for="circuit in circuits" 
                          :key="circuit.id" 
                          :value="circuit.id"
                        >
                          {{ circuit.name || `Circuit ${circuit.id}` }}
                        </option>
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
                <li>Vérifiez que l'API Laravel est accessible</li>
                <li>Connectez-vous en tant qu'administrateur</li>
                <li>Vérifiez que votre token est valide (reconnectez-vous si nécessaire)</li>
              </ul>
            </div>
          </div>

          <!-- Message si aucune mission -->
          <div v-if="!loading && !error && filteredMissions.length === 0 && missions.length === 0" class="mb-4 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="text-center">
              <UiIcon name="warning" size="xl" class="mx-auto text-yellow-400 mb-3" />
              <h3 class="text-lg font-medium text-yellow-800 mb-1">Aucune mission trouvée</h3>
              <p class="text-yellow-700">
                Aucune mission n'est enregistrée dans votre base de données.
                <br>Créez des missions via cette interface.
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
              <div class="grid grid-cols-7 gap-6 text-base font-medium text-gray-700">
                <div>Titre</div>
                <div>Description</div>
                <div>Latitude</div>
                <div>Longitude</div>
                <div>Threshold</div>
                <div>Circuit</div>
                <div>Actions</div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="max-h-96 overflow-y-auto">
              <!-- Loading skeleton -->
              <div v-if="loading" class="px-6 py-6">
                <div class="animate-pulse space-y-4">
                  <div v-for="n in 3" :key="n" class="grid grid-cols-7 gap-6">
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
                v-else-if="filteredMissions && filteredMissions.length > 0"
                v-for="mission in filteredMissions" 
                :key="mission?.id || 'unknown'"
                class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div v-if="mission" class="grid grid-cols-7 gap-6 items-center text-base">
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
                  <div class="text-gray-900 font-bold">{{ mission.threshold || 'N/A' }} mètres</div>
                  <div class="text-gray-600 text-sm">
                    <div v-if="mission.circuits && mission.circuits.length > 0" class="relative">
                      <!-- Bouton pour afficher le nombre de circuits -->
                      <button
                        @click="toggleCircuitsList(mission.id)"
                        class="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                        :class="{ 'bg-purple-200': showCircuitsList[mission.id] }"
                      >
                        <span class="font-medium">{{ mission.circuits.length }}</span>
                        <span>circuit{{ mission.circuits.length > 1 ? 's' : '' }}</span>
                        <UiIcon 
                          name="close" 
                          size="sm" 
                          class="transform transition-transform duration-200"
                          :class="{ 'rotate-180': showCircuitsList[mission.id] }"
                        />
                      </button>
                      
                      <!-- Liste des circuits (dropdown) -->
                      <div 
                        v-if="showCircuitsList[mission.id]" 
                        class="absolute top-full left-0 mt-2 min-w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto"
                      >
                        <div class="p-2">
                          <div class="text-xs font-medium text-gray-500 mb-2 px-2">Circuits associés :</div>
                          <div 
                            v-for="circuit in mission.circuits" 
                            :key="circuit.id"
                            class="flex items-center justify-between p-2 hover:bg-gray-50 rounded group"
                          >
                            <div class="flex-1">
                              <NuxtLink 
                                :to="'/admin/circuits'"
                                class="text-purple-600 hover:text-purple-800 font-medium text-sm"
                                :title="'Voir le circuit: ' + (circuit.name || `Circuit ${circuit.id}`)"
                                @click="closeCircuitsList"
                              >
                                {{ circuit.name || `Circuit ${circuit.id}` }}
                              </NuxtLink>
                              <div class="text-xs text-gray-500">ID: {{ circuit.id }}</div>
                            </div>
                            <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                @click="handleDetachCircuit(mission.id, circuit.id, circuit.name)"
                                class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200"
                                :title="'Détacher le circuit: ' + (circuit.name || `Circuit ${circuit.id}`)"
                              >
                                <UiIcon name="trash" size="xs" />
                              </button>
                              <UiIcon name="eye" size="xs" class="text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span v-else class="text-gray-400 italic text-sm">Aucun circuit</span>
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
                      @click="handleDeleteMission(mission.id)"
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
            
            <!-- Circuit associé -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Circuits associés</label>
              
              <!-- Circuits actuels -->
              <div v-if="editingMission.circuits && editingMission.circuits.length > 0" class="mb-4">
                <div class="text-sm font-medium text-gray-700 mb-2">Circuits actuels :</div>
                <div class="space-y-2">
                  <div v-for="circuit in editingMission.circuits" :key="circuit.id" 
                       class="flex items-center justify-between bg-purple-50 rounded-lg p-3">
                    <div class="flex items-center">
                      <span class="text-purple-700 font-medium">{{ circuit.name || `Circuit ${circuit.id}` }}</span>
                      <span class="text-purple-500 text-sm ml-2">(ID: {{ circuit.id }})</span>
                    </div>
                    <span class="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">Existant</span>
                  </div>
                </div>
              </div>
              
              <!-- Sélection d'un nouveau circuit -->
              <div>
                <div class="text-sm font-medium text-gray-700 mb-2">Modifier le circuit principal :</div>
                <select 
                  v-model="editingMission.circuit_id"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option :value="null">Aucun circuit</option>
                  <option 
                    v-for="circuit in circuits" 
                    :key="circuit.id" 
                    :value="circuit.id"
                  >
                    {{ circuit.name || `Circuit ${circuit.id}` }}
                  </option>
                </select>
                <p class="mt-1 text-sm text-gray-500">
                  Note: Cette modification affectera le circuit principal. 
                  Les autres associations de circuits sont gérées côté API.
                </p>
              </div>
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
          </div>
        </div>

        <!-- Onglet Question -->
        <div v-if="editActiveTab === 'question'" class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Question associée</h4>
          <div class="border border-gray-200 rounded-lg p-4">
            <div v-if="editingMission.questions && editingMission.questions.length > 0">
              <!-- Affichage de la question existante -->
              <div class="bg-blue-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-lg font-medium text-blue-800">Question existante</span>
                </div>
                <div class="space-y-2">
                  <div><strong>Type:</strong> {{ questionTypeLabel(editingMission.questions[0].type) }}</div>
                  <div><strong>Titre:</strong> {{ editingMission.questions[0].title }}</div>
                  <div><strong>Énoncé:</strong> {{ editingMission.questions[0].statement }}</div>
                  <div v-if="editingMission.questions[0].type === 'qcm' && editingMission.questions[0].data">
                    <strong>Choix:</strong> {{ editingMission.questions[0].data.choices?.join(', ') || 'Aucun choix' }}
                  </div>
                  <div><strong>Réponse correcte:</strong> {{ editingMission.questions[0].answer?.correct || 'Non définie' }}</div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <span class="text-4xl">❓</span>
              <p class="mt-2">Aucune question associée à cette mission</p>
              <p class="text-sm mt-1">Les questions ne peuvent être modifiées que lors de la création</p>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
  qcmQuestions,
  enigmeQuestions,
  qrQuestions,
  vue360Questions,
  autreQuestions,
  fetchMissions, 
  createMission: createMissionApi,
  updateMission,
  deleteMission,
  detachCircuitFromMission
} = await useMissions()

// Charger les circuits pour la relation
const { circuits, fetchCircuits } = useCircuits()
await fetchCircuits()

// Debug : vérifier que les circuits sont chargés
console.log('🔍 DEBUG - Circuits chargés:', circuits.value)

// Gestion des onglets pour l'ajout de mission
const activeTab = ref('infos')
const showAddForm = ref(false)
const tabs = [
  { id: 'infos', label: 'Informations', icon: '📝' },
  { id: 'location', label: 'Localisation', icon: '📍' },
  { id: 'description', label: 'Description', icon: '📋' },
  { id: 'question', label: 'Question', icon: '❓' },
  { id: 'circuits', label: 'Circuits', icon: '🔗' }
]

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}

// Gestion des onglets pour le modal d'édition
const editActiveTab = ref('infos')
const editTabs = [
  { id: 'infos', label: 'Informations', icon: '📝' },
  { id: 'location', label: 'Localisation', icon: '📍' },
  { id: 'description', label: 'Description', icon: '📋' },
  { id: 'question', label: 'Question', icon: '❓' }
]

const setEditActiveTab = (tabId) => {
  editActiveTab.value = tabId
}

// Chargement initial des missions
await fetchMissions()

// Event listener pour fermer les dropdowns
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// États réactifs pour les filtres
const filters = ref({
  circuit: ''
})

// État pour la dernière mise à jour
const lastUpdated = ref(new Date())

// Méthodes de gestion des filtres
const updateFilters = (newFilters) => {
  filters.value = { ...newFilters }
}

const resetFilters = () => {
  filters.value = {
    circuit: ''
  }
}

// Compteur de filtres actifs
const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.circuit) count++
  return count
})

// Helper functions pour les circuits
const getCircuitInfo = (mission) => {
  if (!mission || !mission.circuits || !Array.isArray(mission.circuits) || mission.circuits.length === 0) {
    return { hasCircuit: false, name: 'Aucun circuit', id: null }
  }
  
  const circuit = mission.circuits[0]
  if (!circuit || !circuit.name) {
    return { hasCircuit: false, name: 'Circuit sans nom', id: circuit?.id || null }
  }
  
  return { 
    hasCircuit: true, 
    name: circuit.name, 
    id: circuit.id 
  }
}

// Missions filtrées
const filteredMissions = computed(() => {
  let result = missions.value
  
  // Filtre par circuit
  if (filters.value.circuit) {
    result = result.filter(m => {
      // Vérifier si la mission est associée au circuit sélectionné
      if (m.circuits && Array.isArray(m.circuits)) {
        return m.circuits.some(circuit => circuit.id.toString() === filters.value.circuit.toString())
      }
      return false
    })
  }
  
  return result
})

// États réactifs pour le formulaire d'ajout
const newMission = ref({
  // Champs requis du schema Laravel
  title: '',
  description: '',
  latitude: null,
  longitude: null,
  threshold: null,
  
  // Champs optionnels du schema
  hint: '',
  achievement_id: null,
  circuit_id: null, // ID du circuit associé
  
  // Question associée (une seule par mission)
  question: null
})

// Formulaire pour la question
const questionForm = ref({
  type: 'qcm',
  title: '',
  statement: '',
  choices: ['', '', ''], // Pour QCM
  correct: '',
  difficulty: 'medium'
})

const isCreating = ref(false)

// États pour la modal d'édition
const showEditModal = ref(false)
const editingMission = ref(null)

// État pour l'affichage des listes de circuits
const showCircuitsList = ref({})

// Validation pour la création
const canCreateMission = computed(() => {
  return newMission.value.title && newMission.value.title.length >= 5
})

// Validation pour la création de question
const canCreateQuestion = computed(() => {
  if (!questionForm.value.title || !questionForm.value.statement || !questionForm.value.correct) {
    return false
  }
  if (questionForm.value.type === 'qcm') {
    return questionForm.value.choices.filter(c => c.trim()).length >= 2
  }
  return true
})

// Méthodes pour gérer les questions
const addChoice = () => {
  if (questionForm.value.choices.length < 6) {
    questionForm.value.choices.push('')
  }
}

const removeChoice = (index) => {
  if (questionForm.value.choices.length > 2) {
    questionForm.value.choices.splice(index, 1)
    // Si la réponse correcte était celle supprimée, la réinitialiser
    if (questionForm.value.correct === questionForm.value.choices[index]) {
      questionForm.value.correct = ''
    }
  }
}

const createQuestion = () => {
  if (!canCreateQuestion.value) return
  
  // Créer l'objet question selon le format Laravel
  const question = {
    type: questionForm.value.type,
    title: questionForm.value.title,
    statement: questionForm.value.statement,
    data: questionForm.value.type === 'qcm' ? {
      choices: questionForm.value.choices.filter(c => c.trim())
    } : {},
    answer: {
      correct: questionForm.value.correct
    },
    metadata: {
      difficulty: questionForm.value.difficulty
    }
  }
  
  newMission.value.question = question
}

const clearQuestionForm = () => {
  questionForm.value = {
    type: 'qcm',
    title: '',
    statement: '',
    choices: ['', '', ''],
    correct: '',
    difficulty: 'medium'
  }
}

const questionTypeLabel = (type) => {
  const labels = {
    'qcm': 'QCM (Questionnaire à choix multiple)',
    'enigme': 'Énigme',
    'qr': 'QR Code',
    'vue360': 'Vue 360°',
    'autre': 'Autre'
  }
  return labels[type] || type
}

const getAnswerPlaceholder = (type) => {
  const placeholders = {
    'enigme': 'Tapez la solution de l\'énigme',
    'qr': 'Contenu ou URL du QR Code',
    'vue360': 'Instructions pour la vue 360°',
    'autre': 'Tapez la réponse correcte'
  }
  return placeholders[type] || 'Tapez la réponse correcte'
}

// Fonctions pour le formulaire
const clearForm = () => {
  newMission.value = {
    title: '',
    description: '',
    latitude: null,
    longitude: null,
    threshold: null,
    hint: '',
    achievement_id: null,
    circuit_id: null,
    question: null
  }
  clearQuestionForm()
}

const createMission = async () => {
  if (!canCreateMission.value) return
  isCreating.value = true
  try {
    console.log('🔍 DEBUG - Valeurs du formulaire avant création:', {
      circuit_id: newMission.value.circuit_id,
      title: newMission.value.title,
      fullForm: newMission.value
    })

    // Préparer les données pour Laravel API
    const missionData = {
      title: newMission.value.title,
      description: newMission.value.description || '',
      latitude: newMission.value.latitude,
      longitude: newMission.value.longitude,
      threshold: newMission.value.threshold,
      hint: newMission.value.hint || null,
      achievement_id: newMission.value.achievement_id || null,
      circuit_id: newMission.value.circuit_id ? parseInt(newMission.value.circuit_id) : null
    }

    // Ajouter la question si elle existe
    if (newMission.value.question) {
      missionData.questions = [newMission.value.question]
    }

    console.log('🔄 Création de mission avec données:', missionData)
    console.log('📋 Circuit ID envoyé:', missionData.circuit_id)
    
    // Créer la mission via l'API Laravel
    const created = await createMissionApi(missionData)
    
    // Afficher une notification de succès
    console.log('Mission créée avec succès avec Laravel API')
    alert('Mission créée avec succès !')
    
    // Réinitialiser le formulaire
    clearForm()
    
    // Fermer le formulaire
    showAddForm.value = false
    
  } catch (err) {
    console.error('Erreur lors de la création de la mission:', err)
    alert(`Erreur lors de la création: ${err.message}`)
  } finally {
    isCreating.value = false
  }
}

// Fonctions pour les actions sur les missions
const editMission = (mission) => {
  // Réinitialiser l'onglet actif
  editActiveTab.value = 'infos'
  
  editingMission.value = { 
    ...mission,
    // S'assurer que tous les champs requis existent
    circuit_id: mission.circuit_id || (mission.circuits && mission.circuits.length > 0 ? mission.circuits[0].id : null),
    achievement_id: mission.achievement_id || null,
    questions: mission.questions || []
  }
  showEditModal.value = true
}

const saveEditMission = async () => {
  if (!editingMission.value) return
  
  try {
    const missionId = editingMission.value.id
    
    console.log('🔍 DEBUG - Mission à modifier (Laravel):', {
      id: editingMission.value.id,
      missionId: missionId,
      fullData: editingMission.value
    })
    
    // Préparer les données selon le schéma Laravel
    const missionData = {
      title: editingMission.value.title,
      description: editingMission.value.description || '',
      latitude: editingMission.value.latitude,
      longitude: editingMission.value.longitude,
      threshold: editingMission.value.threshold,
      hint: editingMission.value.hint || null,
      achievement_id: editingMission.value.achievement_id || null,
      circuit_id: editingMission.value.circuit_id ? parseInt(editingMission.value.circuit_id) : null
    }
    
    console.log('📦 DEBUG - Données envoyées à Laravel:', missionData)
    
    // Mise à jour de la mission via l'API Laravel
    const result = await updateMission(missionId, missionData)
    
    console.log('✅ DEBUG - Mission mise à jour:', result)
    
    // Fermer la modal
    showEditModal.value = false
    editingMission.value = null
    editActiveTab.value = 'infos'
    
    // Rafraîchir la liste des missions
    setTimeout(async () => {
      await fetchMissions()
      lastUpdated.value = new Date()
    }, 300)
    
    // Message de succès
    alert('Mission mise à jour avec succès !')
    
  } catch (err) {
    console.error('❌ DEBUG - Erreur complète:', {
      message: err.message,
      response: err.response,
      stack: err.stack
    })
    alert(`Erreur lors de la mise à jour de la mission: ${err.message}`)
  }
}

const cancelEdit = () => {
  showEditModal.value = false
  editingMission.value = null
  editActiveTab.value = 'infos'
}

const handleDeleteMission = async (missionId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
    try {
      await deleteMission(missionId)
      alert('Mission supprimée avec succès')
    } catch (err) {
      alert(`Erreur lors de la suppression: ${err.message}`)
    }
  }
}

const refreshMissions = async () => {
  await fetchMissions()
  lastUpdated.value = new Date()
}

// Méthodes pour gérer l'affichage des circuits
const toggleCircuitsList = (missionId) => {
  // Fermer toutes les autres listes ouvertes
  Object.keys(showCircuitsList.value).forEach(id => {
    if (id !== missionId.toString()) {
      showCircuitsList.value[id] = false
    }
  })
  
  // Toggle la liste pour cette mission
  showCircuitsList.value[missionId] = !showCircuitsList.value[missionId]
}

const closeCircuitsList = () => {
  Object.keys(showCircuitsList.value).forEach(id => {
    showCircuitsList.value[id] = false
  })
}

// Fermer les listes quand on clique ailleurs
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    closeCircuitsList()
  }
}

// Méthode pour détacher un circuit d'une mission
const handleDetachCircuit = async (missionId, circuitId, circuitName) => {
  const confirmMessage = `Êtes-vous sûr de vouloir détacher le circuit "${circuitName || `Circuit ${circuitId}`}" de cette mission ?`
  
  if (confirm(confirmMessage)) {
    try {
      await detachCircuitFromMission(missionId, circuitId)
      
      // Fermer la liste des circuits après détachement
      closeCircuitsList()
      
      // Message de succès
      alert(`Circuit "${circuitName || `Circuit ${circuitId}`}" détaché avec succès !`)
      
      // Optionnel : rafraîchir la liste des missions pour être sûr
      // await fetchMissions()
      
    } catch (err) {
      alert(`Erreur lors du détachement du circuit: ${err.message}`)
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