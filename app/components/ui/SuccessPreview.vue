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
                <p class="text-purple-100 text-sm">
                  {{ successData.subtitle || 'Découvrez ce nouveau succès' }}
                </p>
              </div>
            </div>
            <button @click="closePreview" class="text-white hover:text-gray-200 transition-colors text-2xl">×</button>
          </div>
        </div>

        <!-- Body -->
        <div class="bg-white px-6 py-6 sm:px-8 sm:py-8">
          <div class="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6 shadow-lg">
            <div class="text-center mb-6">
              <div class="text-6xl mb-4">{{ successData.icon || '🏆' }}</div>
              <h2 class="text-2xl font-bold text-gray-800 mb-2">
                {{ successData.name || 'Nouveau Succès' }}
              </h2>
              <p class="text-gray-600 text-lg">
                {{ successData.description || 'Vous avez débloqué un nouveau succès !' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse">
          <button @click="closePreview" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            Fermer
          </button>
          <button v-if="successData.id" @click="editSuccess" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors mr-2">
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessPreview',
  props: {
    show: { type: Boolean, default: false },
    successData: { type: Object, default: () => ({}) }
  },
  emits: ['close', 'edit'],
  methods: {
    closePreview() {
      this.$emit('close');
    },
    editSuccess() {
      this.$emit('edit', this.successData);
    }
  }
};
</script>

<style scoped>
</style>
