<template>
  <div class="relative">
    <!-- Bouton d'ouverture des filtres -->
    <UiButton
      variant="outline"
      @click="togglePanel"
      class="relative"
    >
      <UiIcon name="filter" class="h-4 w-4 mr-2" />
      Filtres
      <UiBadge
        v-if="activeFiltersCount > 0"
        variant="primary"
        class="ml-2 px-1.5 py-0.5 text-xs"
      >
        {{ activeFiltersCount }}
      </UiBadge>
    </UiButton>

    <!-- Panel de filtres -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      >
        <!-- Header du panel -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Filtres{{ title ? ` - ${title}` : '' }}
          </h3>
          <button
            @click="closePanel"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <UiIcon name="x" class="h-5 w-5" />
          </button>
        </div>

        <!-- Contenu des filtres -->
        <div class="p-4 space-y-4 max-h-96 overflow-y-auto">
          <slot :filters="filters" :updateFilter="updateFilter" />
        </div>

        <!-- Footer avec actions -->
        <div class="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button
            @click="resetFilters"
            class="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Réinitialiser
          </button>
          <div class="flex space-x-2">
            <UiButton
              variant="outline"
              size="sm"
              @click="closePanel"
            >
              Annuler
            </UiButton>
            <UiButton
              variant="primary"
              size="sm"
              @click="applyFilters"
            >
              Appliquer
            </UiButton>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Overlay pour fermer le panel -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="closePanel"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  initialFilters: {
    type: Object,
    default: () => ({})
  },
  autoApply: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:filters', 'apply', 'reset'])

// État local
const isOpen = ref(false)
const filters = ref({ ...props.initialFilters })

// Computed
const activeFiltersCount = computed(() => {
  return Object.values(filters.value).filter(value => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'string') return value.trim() !== ''
    if (typeof value === 'boolean') return value
    return value !== null && value !== undefined
  }).length
})

// Méthodes
const togglePanel = () => {
  isOpen.value = !isOpen.value
}

const closePanel = () => {
  isOpen.value = false
}

const updateFilter = (key, value) => {
  filters.value[key] = value
  
  if (props.autoApply) {
    emit('update:filters', { ...filters.value })
  }
}

const applyFilters = () => {
  emit('apply', { ...filters.value })
  emit('update:filters', { ...filters.value })
  closePanel()
}

const resetFilters = () => {
  filters.value = { ...props.initialFilters }
  emit('reset')
  if (props.autoApply) {
    emit('update:filters', { ...filters.value })
  }
}

// Watchers
watch(() => props.initialFilters, (newFilters) => {
  filters.value = { ...newFilters }
}, { deep: true })

// Fermer le panel avec la touche Escape
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closePanel()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>