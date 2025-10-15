<template>
  <!-- Bouton pour ouvrir les filtres -->
  <button
    @click="openOverlay"
    class="flex items-center font-medium rounded-lg transition-colors duration-200 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200"
  >
    <UiIcon name="filter" size="sm" class="mr-2" />
    Filtres
    <span v-if="activeFiltersCount > 0" class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
      {{ activeFiltersCount }}
    </span>
  </button>

  <!-- Overlay avec les filtres -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Arrière-plan sombre -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="closeOverlay"
    ></div>

    <!-- Panel des filtres -->
    <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900" id="modal-title">
            Filtrer {{ pageTitle }}
          </h3>
          <button
            @click="closeOverlay"
            class="text-gray-400 hover:text-gray-600"
          >
            <UiIcon name="x" size="20" />
          </button>
        </div>

        <!-- Contenu des filtres -->
        <div class="space-y-4">
          <slot :filters="filters" :updateFilter="updateFilter" />
        </div>
      </div>

      <!-- Footer avec actions -->
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          @click="resetFilters"
          v-if="activeFiltersCount > 0"
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Réinitialiser
        </button>
        <button
          @click="closeOverlay"
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  pageTitle: {
    type: String,
    default: 'les éléments'
  },
  filters: {
    type: Object,
    required: true
  },
  activeFiltersCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:filters', 'reset'])

// État de l'overlay
const isOpen = ref(false)

// Méthodes
const openOverlay = () => {
  isOpen.value = true
}

const closeOverlay = () => {
  isOpen.value = false
}

const updateFilter = (filterName, value) => {
  const updatedFilters = { ...props.filters, [filterName]: value }
  emit('update:filters', updatedFilters)
}

const resetFilters = () => {
  emit('reset')
  closeOverlay()
}

// Fermer avec Escape
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeOverlay()
  }
}

// Écouter les touches
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', handleKeydown)
}
</script>