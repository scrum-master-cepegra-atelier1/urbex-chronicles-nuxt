<template>
  <div class="space-y-4">
    <!-- Recherche -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Rechercher
      </label>
      <input
        type="text"
        :value="filters.search"
        @input="updateFilter('search', $event.target.value)"
        placeholder="Nom, email, username..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>

    <!-- Rôle -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Rôle
      </label>
      <select
        :value="filters.role"
        @change="updateFilter('role', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
      >
        <option value="">Tous les rôles</option>
        <option
          v-for="role in config.options.roles"
          :key="role.value"
          :value="role.value"
        >
          {{ role.label }}
        </option>
      </select>
    </div>

    <!-- Statut -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Statut
      </label>
      <select
        :value="filters.status"
        @change="updateFilter('status', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
      >
        <option value="">Tous les statuts</option>
        <option
          v-for="status in config.options.status"
          :key="status.value"
          :value="status.value"
        >
          {{ status.label }}
        </option>
      </select>
    </div>

    <!-- Niveau d'expérience -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Niveau d'expérience
      </label>
      <select
        :value="filters.experienceLevel"
        @change="updateFilter('experienceLevel', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
      >
        <option value="">Tous les niveaux</option>
        <option
          v-for="level in config.options.experienceLevels"
          :key="level.value"
          :value="level.value"
        >
          {{ level.label }}
        </option>
      </select>
    </div>

    <!-- Avatar -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Avatar
      </label>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="radio"
            :checked="filters.hasAvatar === null"
            @change="updateFilter('hasAvatar', null)"
            class="mr-2 text-emerald-600 focus:ring-emerald-500"
          />
          Tous
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            :checked="filters.hasAvatar === true"
            @change="updateFilter('hasAvatar', true)"
            class="mr-2 text-emerald-600 focus:ring-emerald-500"
          />
          Avec avatar
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            :checked="filters.hasAvatar === false"
            @change="updateFilter('hasAvatar', false)"
            class="mr-2 text-emerald-600 focus:ring-emerald-500"
          />
          Sans avatar
        </label>
      </div>
    </div>

    <!-- Succès -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Succès obtenus
      </label>
      <div class="space-y-2 max-h-32 overflow-y-auto">
        <label
          v-for="achievement in config.options.achievements"
          :key="achievement.value"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :checked="filters.achievements.includes(achievement.value)"
            @change="toggleAchievement(achievement.value)"
            class="mr-2 text-emerald-600 focus:ring-emerald-500"
          />
          {{ achievement.label }}
        </label>
      </div>
    </div>

    <!-- Plage de dates -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Date d'inscription
      </label>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Du</label>
          <input
            type="date"
            :value="filters.dateRange.start"
            @input="updateDateRange('start', $event.target.value)"
            class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Au</label>
          <input
            type="date"
            :value="filters.dateRange.end"
            @input="updateDateRange('end', $event.target.value)"
            class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  updateFilter: {
    type: Function,
    required: true
  },
  config: {
    type: Object,
    required: true
  }
})

// Méthodes
const toggleAchievement = (achievement) => {
  const achievements = [...props.filters.achievements]
  const index = achievements.indexOf(achievement)
  
  if (index > -1) {
    achievements.splice(index, 1)
  } else {
    achievements.push(achievement)
  }
  
  props.updateFilter('achievements', achievements)
}

const updateDateRange = (type, value) => {
  const dateRange = { ...props.filters.dateRange }
  dateRange[type] = value
  props.updateFilter('dateRange', dateRange)
}
</script>