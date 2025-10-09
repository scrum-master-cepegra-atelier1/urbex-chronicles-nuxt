<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closePreview"></div>

      <!-- Modal -->
      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="text-4xl">🏆</div>
              <div>
                <h3 class="text-xl font-bold text-white">
                  {{ successData.title || 'Prévisualisation du succès' }}
                </h3>
                <p class="text-purple-100">
                  {{ successData.experience || 0 }} points d'expérience
                </p>
              </div>
            </div>
            <button @click="closePreview" class="text-white hover:text-purple-200 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 py-6 sm:px-8 sm:py-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Left: Preview -->
            <div class="space-y-6">
              <!-- Success Card Preview -->
              <div class="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border-2 border-purple-200">
                <h4 class="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Aperçu pour l'utilisateur
                </h4>
                
                <!-- Success Card Mock -->
                <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="text-2xl">🏆</div>
                    <div class="flex-1">
                      <h5 class="font-semibold text-gray-900">{{ successData.title || 'Nom du succès' }}</h5>
                      <p class="text-sm text-gray-600">{{ successData.description || 'Description du succès' }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        {{ successData.experience || 0 }} XP
                      </span>
                    </div>
                    <div class="text-xs text-gray-500">
                      Achievement
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Analysis & Settings -->
            <div class="space-y-6">
              <!-- Info -->
              <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-900 mb-4">Informations</h4>
                <div class="space-y-2">
                  <div class="text-sm text-blue-700">
                    <p><strong>Nom:</strong> {{ successData.title || 'Non défini' }}</p>
                    <p><strong>Expérience:</strong> {{ successData.experience || 0 }} XP</p>
                    <p><strong>ID:</strong> {{ successData.id || 'Nouveau' }}</p>
                  </div>
                </div>
              </div>

              <!-- Test Results -->
              <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Actions</h4>
                
                <div class="space-y-4">
                  <button 
                    @click="simulateUnlock"
                    class="w-full px-4 py-2 rounded-md transition-colors font-medium bg-purple-600 text-white hover:bg-purple-700"
                  >
                    🧪 Tester le déverrouillage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-6 py-4 sm:px-8 flex justify-end space-x-3">
          <button 
            @click="closePreview"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Fermer
          </button>
          <button 
            v-if="successData.id"
            @click="editSuccess"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  successData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      experience: 0
    })
  }
})

// Emits
const emit = defineEmits(['close', 'edit'])

// Methods
const closePreview = () => {
  emit('close')
}

const editSuccess = () => {
  emit('edit', props.successData)
}

const simulateUnlock = () => {
  alert(`🎉 Succès déverrouillé ! +${props.successData.experience} XP`)
}
</script>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
