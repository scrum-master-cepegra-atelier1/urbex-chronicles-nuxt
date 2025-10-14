<template>
  <div class="space-y-4">
    <!-- Recherche -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Rechercher
      </label>
      <input
        type="text"
        :value="filters.searchTerm"
        @input="updateFilter('searchTerm', $event.target.value)"
        placeholder="Nom, description..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      />
      <p class="text-xs text-gray-500 mt-1">Recherche dans nom et description</p>
    </div>

    <!-- Durée -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Durée (minutes)
      </label>
      <select
        :value="filters.selectedDuration"
        @change="updateFilter('selectedDuration', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="">Toutes les durées</option>
        <option value="0-60">Courte (0-60 min)</option>
        <option value="61-120">Moyenne (61-120 min)</option>
        <option value="121-180">Longue (121-180 min)</option>
        <option value="181+">Très longue (181+ min)</option>
      </select>
    </div>

    <!-- Likes -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Popularité (likes)
      </label>
      <select
        :value="filters.selectedLikes"
        @change="updateFilter('selectedLikes', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="">Tous les niveaux</option>
        <option value="0">Pas de likes (0)</option>
        <option value="1-10">Peu populaire (1-10)</option>
        <option value="11-50">Populaire (11-50)</option>
        <option value="51+">Très populaire (51+)</option>
      </select>
    </div>

    <!-- Thumbnail -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Image de couverture
      </label>
      <select
        :value="filters.selectedThumbnail"
        @change="updateFilter('selectedThumbnail', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="">Tous</option>
        <option value="true">Avec image</option>
        <option value="false">Sans image</option>
      </select>
    </div>

    <!-- Accessibilités -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Accessibilités
      </label>
      <select
        :value="filters.selectedAccessibilities"
        @change="updateFilter('selectedAccessibilities', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="">Tous</option>
        <option value="true">Avec accessibilités</option>
        <option value="false">Sans accessibilités</option>
      </select>
    </div>

    <!-- Achievement -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Achievement
      </label>
      <select
        :value="filters.selectedAchievement"
        @change="updateFilter('selectedAchievement', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="">Tous</option>
        <option value="true">Avec achievement</option>
        <option value="false">Sans achievement</option>
      </select>
    </div>

    <!-- Missions -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Missions
      </label>
      <select
        :value="filters.selectedMissions"
        @change="updateFilter('selectedMissions', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="">Tous</option>
        <option value="true">Avec missions</option>
        <option value="false">Sans missions</option>
      </select>
    </div>

    <!-- Commentaires -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Commentaires
      </label>
      <select
        :value="filters.selectedComments"
        @change="updateFilter('selectedComments', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="">Tous</option>
        <option value="true">Avec commentaires</option>
        <option value="false">Sans commentaires</option>
      </select>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  updateFilter: {
    type: Function,
    required: true
  }
})
</script>