<template><template><template>

  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">

    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">

      <!-- Overlay -->

      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closePreview"></div>    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">



      <!-- Modal -->      <!-- Overlay -->      <!-- Overlay -->

      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">

        <!-- Header -->      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closePreview"></div>      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closePreview"></div>

        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6">

          <div class="flex items-center justify-between">

            <div class="flex items-center space-x-4">

              <div class="text-4xl">🏆</div>      <!-- Modal -->      <!-- Modal -->

              <div>

                <h3 class="text-xl font-bold text-white">      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">

                  {{ successData.title || 'Prévisualisation du succès' }}

                </h3>        <!-- Header -->        <!-- Header -->

                <p class="text-purple-100">

                  {{ successData.experience || 0 }} points d'expérience        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6">        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6">

                </p>

              </div>          <div class="flex items-center justify-between">          <div class="flex items-center justify-between">

            </div>

            <button @click="closePreview" class="text-white hover:text-purple-200 transition-colors">            <div class="flex items-center space-x-4">            <div class="flex items-center space-x-4">

              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>              <div class="text-4xl">🏆</div>              <div class="text-4xl">🏆</div>

              </svg>

            </button>              <div>              <div>

          </div>

        </div>                <h3 class="text-xl font-bold text-white">                <h3 class="text-xl font-bold text-white">



        <!-- Content -->                  {{ successData.title || 'Prévisualisation du succès' }}                  {{ successData.title || 'Prévisualisation du succès' }}

        <div class="p-6 sm:p-8">

          <div class="text-center">                </h3>                </h3>

            <div class="text-6xl mb-4">🏆</div>

            <h2 class="text-2xl font-bold text-gray-900 mb-2">                <p class="text-purple-100">                <p class="text-purple-100">

              {{ successData.title || 'Nouveau Succès' }}

            </h2>                  {{ successData.experience || 0 }} points d'expérience                  {{ successData.experience || 0 }} points d'expérience

            <p class="text-gray-600 mb-6">

              {{ successData.description || 'Description du succès' }}                </p>                </p>

            </p>

            <div class="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-block font-semibold">              </div>              </div>

              + {{ successData.experience || 0 }} XP

            </div>            </div>            </div>

          </div>

        </div>            <button @click="closePreview" class="text-white hover:text-purple-200 transition-colors">            <button @click="closePreview" class="text-white hover:text-purple-200 transition-colors">



        <!-- Footer -->              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

        <div class="bg-gray-50 px-6 py-4 sm:px-8 flex justify-end space-x-3">

          <button                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>

            @click="closePreview"

            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"              </svg>              </svg>

          >

            Fermer            </button>            </button>

          </button>

        </div>          </div>          </div>

      </div>

    </div>        </div>        </div>

  </div>

</template>



<script setup>        <!-- Content -->        <!-- Content -->

// Props

const props = defineProps({        <div class="p-6 sm:p-8">        <div class="p-6 sm:p-8">

  show: {

    type: Boolean,          <div class="text-center">          <div class="text-center">

    default: false

  },            <div class="text-6xl mb-4">🏆</div>            <div class="text-6xl mb-4">🏆</div>

  successData: {

    type: Object,            <h2 class="text-2xl font-bold text-gray-900 mb-2">            <h2 class="text-2xl font-bold text-gray-900 mb-2">

    default: () => ({})

  }              {{ successData.title || 'Nouveau Succès' }}              {{ successData.title || 'Nouveau Succès' }}

})

            </h2>            </h2>

// Emits

const emit = defineEmits(['close'])            <p class="text-gray-600 mb-6">            <p class="text-gray-600 mb-6">



// Methods              {{ successData.description || 'Description du succès' }}              {{ successData.description || 'Description du succès' }}

const closePreview = () => {

  emit('close')            </p>            </p>

}

</script>            <div class="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-block font-semibold">            <div class="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-block font-semibold">

              + {{ successData.experience || 0 }} XP              + {{ successData.experience || 0 }} XP

            </div>            </div>

          </div>          </div>

        </div>        </div>



        <!-- Footer -->        <!-- Footer -->

        <div class="bg-gray-50 px-6 py-4 sm:px-8 flex justify-end space-x-3">        <div class="bg-gray-50 px-6 py-4 sm:px-8 flex justify-end space-x-3">

          <button           <button 

            @click="closePreview"            @click="closePreview"

            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"

          >          >

            Fermer            Fermer

          </button>          </button>

        </div>        </div>

      </div>      </div>

    </div>    </div>

  </div>  </div>

</template></template>



<script setup><script setup>

// Props// Props

const props = defineProps({const props = defineProps({

  show: {  show: {

    type: Boolean,    type: Boolean,

    default: false    default: false

  },  },

  successData: {  successData: {

    type: Object,    type: Object,

    default: () => ({})    default: () => ({})

  }  }

})})



// Emits// Emits

const emit = defineEmits(['close'])const emit = defineEmits(['close'])



// Methods// Methods

const closePreview = () => {const closePreview = () => {

  emit('close')  emit('close')

}}

</script></script>

  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">

    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">

      <!-- Overlay -->

      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closePreview"></div>    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">



      <!-- Modal -->      <!-- Overlay -->      <!-- Overlay -->

      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">

        <!-- Header -->      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closePreview"></div>      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closePreview"></div>

        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6">

          <div class="flex items-center justify-between">

            <div class="flex items-center space-x-3">

              <div class="text-3xl">🔍</div>      <!-- Modal -->      <!-- Modal -->

              <div>

                <h3 class="text-xl font-bold text-white">Prévisualisation du Succès</h3>      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">

                <p class="text-purple-100 text-sm mt-1">Aperçu en temps réel avant publication</p>

              </div>        <!-- Header -->        <!-- Header -->

            </div>

            <button @click="closePreview" class="text-purple-200 hover:text-white transition-colors">        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6">        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6">

              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>          <div class="flex items-center justify-between">          <div class="flex items-center justify-between">

              </svg>

            </button>            <div class="flex items-center space-x-3">            <div class="flex items-center space-x-3">

          </div>

        </div>              <div class="text-3xl">🔍</div>              <div class="text-3xl">🔍</div>



        <!-- Content -->              <div>              <div>

        <div class="p-6 sm:p-8">

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">                <h3 class="text-xl font-bold text-white">Prévisualisation du Succès</h3>                <h3 class="text-xl font-bold text-white">Prévisualisation du Succès</h3>

            <!-- Left: Preview -->

            <div class="space-y-6">                <p class="text-purple-100 text-sm mt-1">Aperçu en temps réel avant publication</p>                <p class="text-purple-100 text-sm mt-1">Aperçu en temps réel avant publication</p>

              <div>

                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">              </div>              </div>

                  <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>            </div>            </div>

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>

                  </svg>            <button @click="closePreview" class="text-purple-200 hover:text-white transition-colors">            <button @click="closePreview" class="text-purple-200 hover:text-white transition-colors">

                  Aperçu du Succès

                </h4>              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                

                <!-- Success Card Preview -->                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>

                <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">

                  <div class="flex items-start space-x-4">              </svg>              </svg>

                    <!-- Icon -->

                    <div class="text-4xl bg-white rounded-full p-3 shadow-sm">            </button>            </button>

                      {{ successData.icon || '🏆' }}

                    </div>          </div>        </div>

                    

                    <!-- Content -->        </div>

                    <div class="flex-1">

                      <div class="flex items-center space-x-3 mb-2">        <!-- Content -->

                        <h5 class="text-lg font-bold text-gray-900">

                          {{ successData.title || 'Titre du succès' }}        <!-- Content -->        <div class="p-6 sm:p-8">\n          <div class=\"grid grid-cols-1 lg:grid-cols-2 gap-8\">\n            <!-- Left: Preview -->\n            <div class=\"space-y-6\">\n              <div>\n                <h4 class=\"text-lg font-semibold text-gray-900 mb-4 flex items-center\">\n                  <svg class=\"w-5 h-5 mr-2 text-purple-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\"/>\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z\"/>\n                  </svg>\n                  Aperçu du Succès\n                </h4>\n                \n                <!-- Success Card Preview -->\n                <div class=\"bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200\">\n                  <div class=\"flex items-start space-x-4\">\n                    <!-- Icon -->\n                    <div class=\"text-4xl bg-white rounded-full p-3 shadow-sm\">\n                      {{ successData.icon || '🏆' }}\n                    </div>\n                    \n                    <!-- Content -->\n                    <div class=\"flex-1\">\n                      <div class=\"flex items-center space-x-3 mb-2\">\n                        <h5 class=\"text-lg font-bold text-gray-900\">\n                          {{ successData.title || 'Titre du succès' }}\n                        </h5>\n                        <span \n                          class=\"px-2 py-1 text-xs font-medium rounded-full\"\n                          :class=\"getRarityClasses(successData.rarity)\"\n                        >\n                          {{ getRarityLabel(successData.rarity) }}\n                        </span>\n                      </div>\n                      <p class=\"text-gray-600 mb-3\">\n                        {{ successData.description || 'Description du succès' }}\n                      </p>\n                      \n                      <!-- Metadata -->\n                      <div class=\"flex items-center space-x-4 text-sm text-gray-500\">\n                        <span class=\"flex items-center\">\n                          <svg class=\"w-4 h-4 mr-1 text-yellow-500\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                            <path d=\"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z\"/>\n                          </svg>\n                          {{ successData.xpReward || 0 }} XP\n                        </span>\n                        <span class=\"flex items-center\">\n                          <svg class=\"w-4 h-4 mr-1 text-gray-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z\"/>\n                          </svg>\n                          {{ getTypeLabel(successData.type) }}\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              \n              <!-- Notification Preview -->\n              <div>\n                <h4 class=\"text-lg font-semibold text-gray-900 mb-4 flex items-center\">\n                  <svg class=\"w-5 h-5 mr-2 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 011 0z\"/>\n                  </svg>\n                  Notification Toast\n                </h4>\n                \n                <div class=\"bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm\">\n                  <div class=\"flex items-start space-x-3\">\n                    <div class=\"text-2xl\">{{ successData.icon || '🏆' }}</div>\n                    <div class=\"flex-1\">\n                      <div class=\"flex items-center space-x-2 mb-1\">\n                        <h6 class=\"font-bold text-gray-900 text-sm\">Nouveau succès !</h6>\n                        <span \n                          class=\"px-1.5 py-0.5 text-xs font-medium rounded-full\"\n                          :class=\"getRarityClasses(successData.rarity)\"\n                        >\n                          {{ getRarityLabel(successData.rarity) }}\n                        </span>\n                      </div>\n                      <h6 class=\"font-semibold text-gray-800 text-sm mb-1\">\n                        {{ successData.title || 'Titre du succès' }}\n                      </h6>\n                      <p class=\"text-gray-600 text-xs mb-2\">\n                        {{ (successData.description || 'Description du succès').substring(0, 60) }}...\n                      </p>\n                      <div class=\"flex items-center space-x-1 text-xs text-green-600\">\n                        <span class=\"font-medium\">+{{ successData.xpReward || 0 }} XP</span>\n                        <svg class=\"w-3 h-3\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                          <path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414-1.414L9 5.586 7.707 4.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 6.586l-.293-.293z\" clip-rule=\"evenodd\"></path>\n                        </svg>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                \n                <button \n                  @click=\"simulateNotification\"\n                  class=\"mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors\"\n                >\n                  🧪 Tester la notification\n                </button>\n              </div>\n            </div>\n            \n            <!-- Right: Analysis & Settings -->\n            <div class=\"space-y-6\">\n              <!-- Condition Analysis -->\n              <div>\n                <h4 class=\"text-lg font-semibold text-gray-900 mb-4 flex items-center\">\n                  <svg class=\"w-5 h-5 mr-2 text-blue-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\"/>\n                  </svg>\n                  Analyse des Conditions\n                </h4>\n                \n                <div class=\"space-y-3\">\n                  <div class=\"bg-blue-50 rounded-lg p-4 border border-blue-200\">\n                    <h5 class=\"font-medium text-blue-900 mb-2\">Conditions de déverrouillage</h5>\n                    <ul class=\"space-y-1 text-sm text-blue-800\">\n                      <li v-if=\"successData.condition?.missions_completed\" class=\"flex items-center\">\n                        <svg class=\"w-4 h-4 mr-2 text-blue-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4\"/>\n                        </svg>\n                        {{ successData.condition.missions_completed }} missions terminées\n                      </li>\n                      <li v-if=\"successData.condition?.circuits_completed\" class=\"flex items-center\">\n                        <svg class=\"w-4 h-4 mr-2 text-blue-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4\"/>\n                        </svg>\n                        {{ successData.condition.circuits_completed }} circuits terminés\n                      </li>\n                      <li v-if=\"!successData.condition || (!successData.condition.missions_completed && !successData.condition.circuits_completed)\" class=\"flex items-center text-yellow-600\">\n                        <svg class=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z\"/>\n                        </svg>\n                        Aucune condition définie\n                      </li>\n                    </ul>\n                  </div>\n                  \n                  <!-- Difficulty Analysis -->\n                  <div class=\"bg-gray-50 rounded-lg p-4 border border-gray-200\">\n                    <h5 class=\"font-medium text-gray-900 mb-2\">Estimation de difficulté</h5>\n                    <div class=\"flex items-center space-x-3\">\n                      <div class=\"flex-1\">\n                        <div class=\"flex justify-between text-sm text-gray-600 mb-1\">\n                          <span>Facilité</span>\n                          <span>{{ difficultyPercentage }}%</span>\n                        </div>\n                        <div class=\"w-full bg-gray-200 rounded-full h-2\">\n                          <div \n                            class=\"h-2 rounded-full transition-all duration-300\"\n                            :class=\"difficultyBarClass\"\n                            :style=\"{ width: difficultyPercentage + '%' }\"\n                          ></div>\n                        </div>\n                      </div>\n                      <div class=\"text-lg\">{{ difficultyEmoji }}</div>\n                    </div>\n                    <p class=\"text-xs text-gray-500 mt-2\">{{ difficultyDescription }}</p>\n                  </div>\n                </div>\n              </div>\n              \n              <!-- User Simulation -->\n              <div>\n                <h4 class=\"text-lg font-semibold text-gray-900 mb-4 flex items-center\">\n                  <svg class=\"w-5 h-5 mr-2 text-purple-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\"/>\n                  </svg>\n                  Test Utilisateur\n                </h4>\n                \n                <div class=\"bg-purple-50 rounded-lg p-4 border border-purple-200\">\n                  <h5 class=\"font-medium text-purple-900 mb-3\">Simuler un utilisateur</h5>\n                  \n                  <div class=\"grid grid-cols-2 gap-4 mb-4\">\n                    <div>\n                      <label class=\"block text-sm font-medium text-purple-700 mb-1\">Missions terminées</label>\n                      <input \n                        v-model.number=\"testUser.missionsCompleted\"\n                        type=\"number\" \n                        min=\"0\" \n                        class=\"w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm\"\n                      />\n                    </div>\n                    <div>\n                      <label class=\"block text-sm font-medium text-purple-700 mb-1\">Circuits terminés</label>\n                      <input \n                        v-model.number=\"testUser.circuitsCompleted\"\n                        type=\"number\" \n                        min=\"0\" \n                        class=\"w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm\"\n                      />\n                    </div>\n                  </div>\n                  \n                  <div class=\"flex items-center justify-between p-3 bg-white rounded-md border\">\n                    <span class=\"text-sm font-medium text-gray-900\">Succès déverrouillable ?</span>\n                    <div class=\"flex items-center space-x-2\">\n                      <div \n                        class=\"w-3 h-3 rounded-full\"\n                        :class=\"canUnlockSuccess ? 'bg-green-500' : 'bg-red-500'\"\n                      ></div>\n                      <span \n                        class=\"text-sm font-medium\"\n                        :class=\"canUnlockSuccess ? 'text-green-600' : 'text-red-600'\"\n                      >\n                        {{ canUnlockSuccess ? 'Oui' : 'Non' }}\n                      </span>\n                    </div>\n                  </div>\n                  \n                  <button \n                    @click=\"testUnlock\"\n                    :disabled=\"!canUnlockSuccess\"\n                    class=\"mt-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors\"\n                    :class=\"canUnlockSuccess \n                      ? 'bg-purple-600 text-white hover:bg-purple-700' \n                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'\"\n                  >\n                    🧪 Tester le déverrouillage\n                  </button>\n                </div>\n              </div>\n              \n              <!-- Recommendations -->\n              <div>\n                <h4 class=\"text-lg font-semibold text-gray-900 mb-4 flex items-center\">\n                  <svg class=\"w-5 h-5 mr-2 text-yellow-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z\"/>\n                  </svg>\n                  Recommandations\n                </h4>\n                \n                <div class=\"space-y-2\">\n                  <div v-for=\"suggestion in suggestions\" :key=\"suggestion.id\" class=\"bg-yellow-50 rounded-lg p-3 border border-yellow-200\">\n                    <div class=\"flex items-start space-x-2\">\n                      <div class=\"text-sm\">{{ suggestion.icon }}</div>\n                      <div>\n                        <p class=\"text-sm font-medium text-yellow-900\">{{ suggestion.title }}</p>\n                        <p class=\"text-xs text-yellow-700\">{{ suggestion.description }}</p>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        \n        <!-- Footer -->\n        <div class=\"bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-gray-200\">\n          <button\n            @click=\"confirmCreate\"\n            class=\"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors\"\n          >\n            ✅ Créer ce succès\n          </button>\n          <button\n            @click=\"closePreview\"\n            class=\"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors\"\n          >\n            Annuler\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script setup>\nimport { ref, computed, watch } from 'vue'\n\n// Props\nconst props = defineProps({\n  show: {\n    type: Boolean,\n    default: false\n  },\n  successData: {\n    type: Object,\n    required: true\n  }\n})\n\n// Emits\nconst emit = defineEmits(['close', 'confirm', 'test-notification'])\n\n// Test user state\nconst testUser = ref({\n  missionsCompleted: 0,\n  circuitsCompleted: 0\n})\n\n// Computed properties\nconst canUnlockSuccess = computed(() => {\n  const condition = props.successData.condition || {}\n  \n  if (condition.missions_completed && testUser.value.missionsCompleted < condition.missions_completed) {\n    return false\n  }\n  \n  if (condition.circuits_completed && testUser.value.circuitsCompleted < condition.circuits_completed) {\n    return false\n  }\n  \n  return true\n})\n\nconst difficultyPercentage = computed(() => {\n  const condition = props.successData.condition || {}\n  const missions = condition.missions_completed || 0\n  const circuits = condition.circuits_completed || 0\n  \n  // Calculate difficulty based on requirements\n  const totalRequirement = missions + (circuits * 2) // Circuits are worth 2x missions\n  \n  if (totalRequirement === 0) return 90 // No conditions = very easy\n  if (totalRequirement <= 2) return 75\n  if (totalRequirement <= 5) return 60\n  if (totalRequirement <= 10) return 45\n  if (totalRequirement <= 25) return 30\n  if (totalRequirement <= 50) return 15\n  return 5 // Very hard\n})\n\nconst difficultyBarClass = computed(() => {\n  const percentage = difficultyPercentage.value\n  if (percentage >= 70) return 'bg-green-500'\n  if (percentage >= 50) return 'bg-yellow-500'\n  if (percentage >= 30) return 'bg-orange-500'\n  return 'bg-red-500'\n})\n\nconst difficultyEmoji = computed(() => {\n  const percentage = difficultyPercentage.value\n  if (percentage >= 70) return '😊'\n  if (percentage >= 50) return '🙂'\n  if (percentage >= 30) return '😐'\n  return '😤'\n})\n\nconst difficultyDescription = computed(() => {\n  const percentage = difficultyPercentage.value\n  if (percentage >= 70) return 'Très facile à obtenir, parfait pour les nouveaux utilisateurs'\n  if (percentage >= 50) return 'Accessible, encouragera la progression'\n  if (percentage >= 30) return 'Modérément difficile, pour les utilisateurs réguliers'\n  return 'Très difficile, réservé aux experts'\n})\n\nconst suggestions = computed(() => {\n  const suggestions = []\n  const condition = props.successData.condition || {}\n  \n  // Check XP reward vs rarity\n  const xp = props.successData.xpReward || 0\n  const rarity = props.successData.rarity\n  \n  if (rarity === 'common' && xp > 200) {\n    suggestions.push({\n      id: 'xp_too_high',\n      icon: '⚠️',\n      title: 'Récompense XP élevée',\n      description: 'Pour un succès commun, 50-150 XP est recommandé'\n    })\n  }\n  \n  if (rarity === 'legendary' && xp < 500) {\n    suggestions.push({\n      id: 'xp_too_low',\n      icon: '💎',\n      title: 'Récompense XP faible',\n      description: 'Un succès légendaire mérite 500+ XP'\n    })\n  }\n  \n  if (difficultyPercentage.value < 20 && rarity === 'common') {\n    suggestions.push({\n      id: 'too_difficult',\n      icon: '🎯',\n      title: 'Trop difficile pour un succès commun',\n      description: 'Réduisez les conditions ou changez la rareté'\n    })\n  }\n  \n  if (!condition.missions_completed && !condition.circuits_completed) {\n    suggestions.push({\n      id: 'no_conditions',\n      icon: '📝',\n      title: 'Aucune condition définie',\n      description: 'Ajoutez des conditions pour le déverrouillage'\n    })\n  }\n  \n  return suggestions\n})\n\n// Utility functions\nconst getRarityClasses = (rarity) => {\n  const classes = {\n    common: 'bg-gray-100 text-gray-800',\n    rare: 'bg-blue-100 text-blue-800',\n    epic: 'bg-purple-100 text-purple-800',\n    legendary: 'bg-yellow-100 text-yellow-800'\n  }\n  return classes[rarity] || classes.common\n}\n\nconst getRarityLabel = (rarity) => {\n  const labels = {\n    common: 'Commun',\n    rare: 'Rare',\n    epic: 'Épique',\n    legendary: 'Légendaire'\n  }\n  return labels[rarity] || 'Commun'\n}\n\nconst getTypeLabel = (type) => {\n  const labels = {\n    mission_completed: 'Mission terminée',\n    circuit_completed: 'Circuit terminé',\n    first_mission: 'Première mission',\n    first_circuit: 'Premier circuit',\n    mission_streak: 'Série missions',\n    circuit_streak: 'Série circuits',\n    explorer: 'Explorateur',\n    veteran: 'Vétéran',\n    completionist: 'Perfectionniste'\n  }\n  return labels[type] || type\n}\n\n// Event handlers\nconst closePreview = () => {\n  emit('close')\n}\n\nconst confirmCreate = () => {\n  emit('confirm')\n}\n\nconst simulateNotification = () => {\n  emit('test-notification', props.successData)\n}\n\nconst testUnlock = () => {\n  if (canUnlockSuccess.value) {\n    alert(`🎉 Succès \"${props.successData.title}\" déverrouillé !\\n+${props.successData.xpReward || 0} XP`)\n  }\n}\n\n// Watch for data changes to reset test user\nwatch(() => props.successData, () => {\n  testUser.value = {\n    missionsCompleted: 0,\n    circuitsCompleted: 0\n  }\n}, { deep: true })\n</script>\n\n<style scoped>\n/* Custom animations */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n.inline-block {\n  animation: fadeIn 0.2s ease-out;\n}\n</style>

                        </h5>        <div class="p-6 sm:p-8">

                        <span           <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

                          class="px-2 py-1 text-xs font-medium rounded-full"            <!-- Left: Preview -->

                          :class="getRarityClasses(successData.rarity)"            <div class="space-y-6">

                        >              <div>

                          {{ getRarityLabel(successData.rarity) }}                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">

                        </span>                  <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                      </div>                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>

                      <p class="text-gray-600 mb-3">                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>

                        {{ successData.description || 'Description du succès' }}                  </svg>

                      </p>                  Aperçu du Succès

                                      </h4>

                      <!-- Metadata -->                

                      <div class="flex items-center space-x-4 text-sm text-gray-500">                <!-- Success Card Preview -->

                        <span class="flex items-center">                <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">

                          <svg class="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">                  <div class="flex items-start space-x-4">

                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>                    <!-- Icon -->

                          </svg>                    <div class="text-4xl bg-white rounded-full p-3 shadow-sm">

                          {{ successData.xpReward || 0 }} XP                      {{ successData.icon || '🏆' }}

                        </span>                    </div>

                        <span class="flex items-center">                    

                          <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">                    <!-- Content -->

                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"/>                    <div class="flex-1">

                          </svg>                      <div class="flex items-center space-x-3 mb-2">

                          {{ getTypeLabel(successData.type) }}                        <h5 class="text-lg font-bold text-gray-900">

                        </span>                          {{ successData.title || 'Titre du succès' }}

                      </div>                        </h5>

                    </div>                        <span 

                  </div>                          class="px-2 py-1 text-xs font-medium rounded-full"

                </div>                          :class="getRarityClasses(successData.rarity)"

              </div>                        >

                                        {{ getRarityLabel(successData.rarity) }}

              <!-- Notification Preview -->                        </span>

              <div>                      </div>

                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">                      <p class="text-gray-600 mb-3">

                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                        {{ successData.description || 'Description du succès' }}

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 011 0z"/>                      </p>

                  </svg>                      

                  Notification Toast                      <!-- Metadata -->

                </h4>                      <div class="flex items-center space-x-4 text-sm text-gray-500">

                                        <span class="flex items-center">

                <div class="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm">                          <svg class="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">

                  <div class="flex items-start space-x-3">                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>

                    <div class="text-2xl">{{ successData.icon || '🏆' }}</div>                          </svg>

                    <div class="flex-1">                          {{ successData.xpReward || 0 }} XP

                      <div class="flex items-center space-x-2 mb-1">                        </span>

                        <h6 class="font-bold text-gray-900 text-sm">Nouveau succès !</h6>                        <span class="flex items-center">

                        <span                           <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                          class="px-1.5 py-0.5 text-xs font-medium rounded-full"                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"/>

                          :class="getRarityClasses(successData.rarity)"                          </svg>

                        >                          {{ getTypeLabel(successData.type) }}

                          {{ getRarityLabel(successData.rarity) }}                        </span>

                        </span>                      </div>

                      </div>                    </div>

                      <h6 class="font-semibold text-gray-800 text-sm mb-1">                  </div>

                        {{ successData.title || 'Titre du succès' }}                </div>

                      </h6>              </div>

                      <p class="text-gray-600 text-xs mb-2">              

                        {{ (successData.description || 'Description du succès').substring(0, 60) }}...              <!-- Notification Preview -->

                      </p>              <div>

                      <div class="flex items-center space-x-1 text-xs text-green-600">                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">

                        <span class="font-medium">+{{ successData.xpReward || 0 }} XP</span>                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 011 0z"/>

                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414-1.414L9 5.586 7.707 4.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 6.586l-.293-.293z" clip-rule="evenodd"></path>                  </svg>

                        </svg>                  Notification Toast

                      </div>                </h4>

                    </div>                

                  </div>                <div class="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm">

                </div>                  <div class="flex items-start space-x-3">

                                    <div class="text-2xl">{{ successData.icon || '🏆' }}</div>

                <button                     <div class="flex-1">

                  @click="simulateNotification"                      <div class="flex items-center space-x-2 mb-1">

                  class="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"                        <h6 class="font-bold text-gray-900 text-sm">Nouveau succès !</h6>

                >                        <span 

                  🧪 Tester la notification                          class="px-1.5 py-0.5 text-xs font-medium rounded-full"

                </button>                          :class="getRarityClasses(successData.rarity)"

              </div>                        >

            </div>                          {{ getRarityLabel(successData.rarity) }}

                                    </span>

            <!-- Right: Analysis & Settings -->                      </div>

            <div class="space-y-6">                      <h6 class="font-semibold text-gray-800 text-sm mb-1">

              <!-- Condition Analysis -->                        {{ successData.title || 'Titre du succès' }}

              <div>                      </h6>

                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">                      <p class="text-gray-600 text-xs mb-2">

                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                        {{ (successData.description || 'Description du succès').substring(0, 60) }}...

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>                      </p>

                  </svg>                      <div class="flex items-center space-x-1 text-xs text-green-600">

                  Analyse des Conditions                        <span class="font-medium">+{{ successData.xpReward || 0 }} XP</span>

                </h4>                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">

                                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414-1.414L9 5.586 7.707 4.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 6.586l-.293-.293z" clip-rule="evenodd"></path>

                <div class="space-y-3">                        </svg>

                  <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">                      </div>

                    <h5 class="font-medium text-blue-900 mb-2">Conditions de déverrouillage</h5>                    </div>

                    <ul class="space-y-1 text-sm text-blue-800">                  </div>

                      <li v-if="successData.condition?.missions_completed" class="flex items-center">                </div>

                        <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                

                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>                <button 

                        </svg>                  @click="simulateNotification"

                        {{ successData.condition.missions_completed }} missions terminées                  class="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"

                      </li>                >

                      <li v-if="successData.condition?.circuits_completed" class="flex items-center">                  🧪 Tester la notification

                        <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                </button>

                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>              </div>

                        </svg>            </div>

                        {{ successData.condition.circuits_completed }} circuits terminés            

                      </li>            <!-- Right: Analysis & Settings -->

                      <li v-if="!successData.condition || (!successData.condition.missions_completed && !successData.condition.circuits_completed)" class="flex items-center text-yellow-600">            <div class="space-y-6">

                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <!-- Condition Analysis -->

                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>              <div>

                        </svg>                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">

                        Aucune condition définie                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                      </li>                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>

                    </ul>                  </svg>

                  </div>                  Analyse des Conditions

                                  </h4>

                  <!-- Difficulty Analysis -->                

                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">                <div class="space-y-3">

                    <h5 class="font-medium text-gray-900 mb-2">Estimation de difficulté</h5>                  <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">

                    <div class="flex items-center space-x-3">                    <h5 class="font-medium text-blue-900 mb-2">Conditions de déverrouillage</h5>

                      <div class="flex-1">                    <ul class="space-y-1 text-sm text-blue-800">

                        <div class="flex justify-between text-sm text-gray-600 mb-1">                      <li v-if="successData.condition?.missions_completed" class="flex items-center">

                          <span>Facilité</span>                        <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                          <span>{{ difficultyPercentage }}%</span>                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>

                        </div>                        </svg>

                        <div class="w-full bg-gray-200 rounded-full h-2">                        {{ successData.condition.missions_completed }} missions terminées

                          <div                       </li>

                            class="h-2 rounded-full transition-all duration-300"                      <li v-if="successData.condition?.circuits_completed" class="flex items-center">

                            :class="difficultyBarClass"                        <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                            :style="{ width: difficultyPercentage + '%' }"                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>

                          ></div>                        </svg>

                        </div>                        {{ successData.condition.circuits_completed }} circuits terminés

                      </div>                      </li>

                      <div class="text-lg">{{ difficultyEmoji }}</div>                      <li v-if="!successData.condition || (!successData.condition.missions_completed && !successData.condition.circuits_completed)" class="flex items-center text-yellow-600">

                    </div>                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <p class="text-xs text-gray-500 mt-2">{{ difficultyDescription }}</p>                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>

                  </div>                        </svg>

                </div>                        Aucune condition définie

              </div>                      </li>

                                  </ul>

              <!-- User Simulation -->                  </div>

              <div>                  

                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">                  <!-- Difficulty Analysis -->

                  <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>                    <h5 class="font-medium text-gray-900 mb-2">Estimation de difficulté</h5>

                  </svg>                    <div class="flex items-center space-x-3">

                  Test Utilisateur                      <div class="flex-1">

                </h4>                        <div class="flex justify-between text-sm text-gray-600 mb-1">

                                          <span>Facilité</span>

                <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">                          <span>{{ difficultyPercentage }}%</span>

                  <h5 class="font-medium text-purple-900 mb-3">Simuler un utilisateur</h5>                        </div>

                                          <div class="w-full bg-gray-200 rounded-full h-2">

                  <div class="grid grid-cols-2 gap-4 mb-4">                          <div 

                    <div>                            class="h-2 rounded-full transition-all duration-300"

                      <label class="block text-sm font-medium text-purple-700 mb-1">Missions terminées</label>                            :class="difficultyBarClass"

                      <input                             :style="{ width: difficultyPercentage + '%' }"

                        v-model.number="testUser.missionsCompleted"                          ></div>

                        type="number"                         </div>

                        min="0"                       </div>

                        class="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"                      <div class="text-lg">{{ difficultyEmoji }}</div>

                      />                    </div>

                    </div>                    <p class="text-xs text-gray-500 mt-2">{{ difficultyDescription }}</p>

                    <div>                  </div>

                      <label class="block text-sm font-medium text-purple-700 mb-1">Circuits terminés</label>                </div>

                      <input               </div>

                        v-model.number="testUser.circuitsCompleted"              

                        type="number"               <!-- User Simulation -->

                        min="0"               <div>

                        class="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">

                      />                  <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    </div>                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>

                  </div>                  </svg>

                                    Test Utilisateur

                  <div class="flex items-center justify-between p-3 bg-white rounded-md border">                </h4>

                    <span class="text-sm font-medium text-gray-900">Succès déverrouillable ?</span>                

                    <div class="flex items-center space-x-2">                <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">

                      <div                   <h5 class="font-medium text-purple-900 mb-3">Simuler un utilisateur</h5>

                        class="w-3 h-3 rounded-full"                  

                        :class="canUnlockSuccess ? 'bg-green-500' : 'bg-red-500'"                  <div class="grid grid-cols-2 gap-4 mb-4">

                      ></div>                    <div>

                      <span                       <label class="block text-sm font-medium text-purple-700 mb-1">Missions terminées</label>

                        class="text-sm font-medium"                      <input 

                        :class="canUnlockSuccess ? 'text-green-600' : 'text-red-600'"                        v-model.number="testUser.missionsCompleted"

                      >                        type="number" 

                        {{ canUnlockSuccess ? 'Oui' : 'Non' }}                        min="0" 

                      </span>                        class="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"

                    </div>                      />

                  </div>                    </div>

                                      <div>

                  <button                       <label class="block text-sm font-medium text-purple-700 mb-1">Circuits terminés</label>

                    @click="testUnlock"                      <input 

                    :disabled="!canUnlockSuccess"                        v-model.number="testUser.circuitsCompleted"

                    class="mt-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors"                        type="number" 

                    :class="canUnlockSuccess                         min="0" 

                      ? 'bg-purple-600 text-white hover:bg-purple-700'                         class="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"

                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'"                      />

                  >                    </div>

                    🧪 Tester le déverrouillage                  </div>

                  </button>                  

                </div>                  <div class="flex items-center justify-between p-3 bg-white rounded-md border">

              </div>                    <span class="text-sm font-medium text-gray-900">Succès déverrouillable ?</span>

                                  <div class="flex items-center space-x-2">

              <!-- Recommendations -->                      <div 

              <div>                        class="w-3 h-3 rounded-full"

                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">                        :class="canUnlockSuccess ? 'bg-green-500' : 'bg-red-500'"

                  <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                      ></div>

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>                      <span 

                  </svg>                        class="text-sm font-medium"

                  Recommandations                        :class="canUnlockSuccess ? 'text-green-600' : 'text-red-600'"

                </h4>                      >

                                        {{ canUnlockSuccess ? 'Oui' : 'Non' }}

                <div class="space-y-2">                      </span>

                  <div v-for="suggestion in suggestions" :key="suggestion.id" class="bg-yellow-50 rounded-lg p-3 border border-yellow-200">                    </div>

                    <div class="flex items-start space-x-2">                  </div>

                      <div class="text-sm">{{ suggestion.icon }}</div>                  

                      <div>                  <button 

                        <p class="text-sm font-medium text-yellow-900">{{ suggestion.title }}</p>                    @click="testUnlock"

                        <p class="text-xs text-yellow-700">{{ suggestion.description }}</p>                    :disabled="!canUnlockSuccess"

                      </div>                    class="mt-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors"

                    </div>                    :class="canUnlockSuccess 

                  </div>                      ? 'bg-purple-600 text-white hover:bg-purple-700' 

                </div>                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'"

              </div>                  >

            </div>                    🧪 Tester le déverrouillage

          </div>                  </button>

        </div>                </div>

                      </div>

        <!-- Footer -->              

        <div class="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-gray-200">              <!-- Recommendations -->

          <button              <div>

            @click="confirmCreate"                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">

            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"                  <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

          >                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>

            ✅ Créer ce succès                  </svg>

          </button>                  Recommandations

          <button                </h4>

            @click="closePreview"                

            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"                <div class="space-y-2">

          >                  <div v-for="suggestion in suggestions" :key="suggestion.id" class="bg-yellow-50 rounded-lg p-3 border border-yellow-200">

            Annuler                    <div class="flex items-start space-x-2">

          </button>                      <div class="text-sm">{{ suggestion.icon }}</div>

        </div>                      <div>

      </div>                        <p class="text-sm font-medium text-yellow-900">{{ suggestion.title }}</p>

    </div>                        <p class="text-xs text-yellow-700">{{ suggestion.description }}</p>

  </div>                      </div>

</template>                    </div>

                  </div>

<script setup>                </div>

import { ref, computed, watch } from 'vue'              </div>

            </div>

// Props          </div>

const props = defineProps({        </div>

  show: {        

    type: Boolean,        <!-- Footer -->

    default: false        <div class="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-gray-200">

  },          <button

  successData: {            @click="confirmCreate"

    type: Object,            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"

    required: true          >

  }            ✅ Créer ce succès

})          </button>

          <button

// Emits            @click="closePreview"

const emit = defineEmits(['close', 'confirm', 'test-notification'])            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"

          >

// Test user state            Annuler

const testUser = ref({          </button>

  missionsCompleted: 0,        </div>

  circuitsCompleted: 0      </div>

})    </div>

  </div>

// Computed properties</template>

const canUnlockSuccess = computed(() => {

  const condition = props.successData.condition || {}<script setup>

  import { ref, computed, watch } from 'vue'

  if (condition.missions_completed && testUser.value.missionsCompleted < condition.missions_completed) {

    return false// Props

  }const props = defineProps({

    show: {

  if (condition.circuits_completed && testUser.value.circuitsCompleted < condition.circuits_completed) {    type: Boolean,

    return false    default: false

  }  },

    successData: {

  return true    type: Object,

})    required: true

  }

const difficultyPercentage = computed(() => {})

  const condition = props.successData.condition || {}

  const missions = condition.missions_completed || 0// Emits

  const circuits = condition.circuits_completed || 0const emit = defineEmits(['close', 'confirm', 'test-notification'])

  

  // Calculate difficulty based on requirements// Test user state

  const totalRequirement = missions + (circuits * 2) // Circuits are worth 2x missionsconst testUser = ref({

    missionsCompleted: 0,

  if (totalRequirement === 0) return 90 // No conditions = very easy  circuitsCompleted: 0

  if (totalRequirement <= 2) return 75})

  if (totalRequirement <= 5) return 60

  if (totalRequirement <= 10) return 45// Computed properties

  if (totalRequirement <= 25) return 30const canUnlockSuccess = computed(() => {

  if (totalRequirement <= 50) return 15  const condition = props.successData.condition || {}

  return 5 // Very hard  

})  if (condition.missions_completed && testUser.value.missionsCompleted < condition.missions_completed) {

    return false

const difficultyBarClass = computed(() => {  }

  const percentage = difficultyPercentage.value  

  if (percentage >= 70) return 'bg-green-500'  if (condition.circuits_completed && testUser.value.circuitsCompleted < condition.circuits_completed) {

  if (percentage >= 50) return 'bg-yellow-500'    return false

  if (percentage >= 30) return 'bg-orange-500'  }

  return 'bg-red-500'  

})  return true

})

const difficultyEmoji = computed(() => {

  const percentage = difficultyPercentage.valueconst difficultyPercentage = computed(() => {

  if (percentage >= 70) return '😊'  const condition = props.successData.condition || {}

  if (percentage >= 50) return '🙂'  const missions = condition.missions_completed || 0

  if (percentage >= 30) return '😐'  const circuits = condition.circuits_completed || 0

  return '😤'  

})  // Calculate difficulty based on requirements

  const totalRequirement = missions + (circuits * 2) // Circuits are worth 2x missions

const difficultyDescription = computed(() => {  

  const percentage = difficultyPercentage.value  if (totalRequirement === 0) return 90 // No conditions = very easy

  if (percentage >= 70) return 'Très facile à obtenir, parfait pour les nouveaux utilisateurs'  if (totalRequirement <= 2) return 75

  if (percentage >= 50) return 'Accessible, encouragera la progression'  if (totalRequirement <= 5) return 60

  if (percentage >= 30) return 'Modérément difficile, pour les utilisateurs réguliers'  if (totalRequirement <= 10) return 45

  return 'Très difficile, réservé aux experts'  if (totalRequirement <= 25) return 30

})  if (totalRequirement <= 50) return 15

  return 5 // Very hard

const suggestions = computed(() => {})

  const suggestions = []

  const condition = props.successData.condition || {}const difficultyBarClass = computed(() => {

    const percentage = difficultyPercentage.value

  // Check XP reward vs rarity  if (percentage >= 70) return 'bg-green-500'

  const xp = props.successData.xpReward || 0  if (percentage >= 50) return 'bg-yellow-500'

  const rarity = props.successData.rarity  if (percentage >= 30) return 'bg-orange-500'

    return 'bg-red-500'

  if (rarity === 'common' && xp > 200) {})

    suggestions.push({

      id: 'xp_too_high',const difficultyEmoji = computed(() => {

      icon: '⚠️',  const percentage = difficultyPercentage.value

      title: 'Récompense XP élevée',  if (percentage >= 70) return '😊'

      description: 'Pour un succès commun, 50-150 XP est recommandé'  if (percentage >= 50) return '🙂'

    })  if (percentage >= 30) return '😐'

  }  return '😤'

  })

  if (rarity === 'legendary' && xp < 500) {

    suggestions.push({const difficultyDescription = computed(() => {

      id: 'xp_too_low',  const percentage = difficultyPercentage.value

      icon: '💎',  if (percentage >= 70) return 'Très facile à obtenir, parfait pour les nouveaux utilisateurs'

      title: 'Récompense XP faible',  if (percentage >= 50) return 'Accessible, encouragera la progression'

      description: 'Un succès légendaire mérite 500+ XP'  if (percentage >= 30) return 'Modérément difficile, pour les utilisateurs réguliers'

    })  return 'Très difficile, réservé aux experts'

  }})

  

  if (difficultyPercentage.value < 20 && rarity === 'common') {const suggestions = computed(() => {

    suggestions.push({  const suggestions = []

      id: 'too_difficult',  const condition = props.successData.condition || {}

      icon: '🎯',  

      title: 'Trop difficile pour un succès commun',  // Check XP reward vs rarity

      description: 'Réduisez les conditions ou changez la rareté'  const xp = props.successData.xpReward || 0

    })  const rarity = props.successData.rarity

  }  

    if (rarity === 'common' && xp > 200) {

  if (!condition.missions_completed && !condition.circuits_completed) {    suggestions.push({

    suggestions.push({      id: 'xp_too_high',

      id: 'no_conditions',      icon: '⚠️',

      icon: '📝',      title: 'Récompense XP élevée',

      title: 'Aucune condition définie',      description: 'Pour un succès commun, 50-150 XP est recommandé'

      description: 'Ajoutez des conditions pour le déverrouillage'    })

    })  }

  }  

    if (rarity === 'legendary' && xp < 500) {

  return suggestions    suggestions.push({

})      id: 'xp_too_low',

      icon: '💎',

// Utility functions      title: 'Récompense XP faible',

const getRarityClasses = (rarity) => {      description: 'Un succès légendaire mérite 500+ XP'

  const classes = {    })

    common: 'bg-gray-100 text-gray-800',  }

    rare: 'bg-blue-100 text-blue-800',  

    epic: 'bg-purple-100 text-purple-800',  if (difficultyPercentage.value < 20 && rarity === 'common') {

    legendary: 'bg-yellow-100 text-yellow-800'    suggestions.push({

  }      id: 'too_difficult',

  return classes[rarity] || classes.common      icon: '🎯',

}      title: 'Trop difficile pour un succès commun',

      description: 'Réduisez les conditions ou changez la rareté'

const getRarityLabel = (rarity) => {    })

  const labels = {  }

    common: 'Commun',  

    rare: 'Rare',  if (!condition.missions_completed && !condition.circuits_completed) {

    epic: 'Épique',    suggestions.push({

    legendary: 'Légendaire'      id: 'no_conditions',

  }      icon: '📝',

  return labels[rarity] || 'Commun'      title: 'Aucune condition définie',

}      description: 'Ajoutez des conditions pour le déverrouillage'

    })

const getTypeLabel = (type) => {  }

  const labels = {  

    mission_completed: 'Mission terminée',  return suggestions

    circuit_completed: 'Circuit terminé',})

    first_mission: 'Première mission',

    first_circuit: 'Premier circuit',// Utility functions

    mission_streak: 'Série missions',const getRarityClasses = (rarity) => {

    circuit_streak: 'Série circuits',  const classes = {

    explorer: 'Explorateur',    common: 'bg-gray-100 text-gray-800',

    veteran: 'Vétéran',    rare: 'bg-blue-100 text-blue-800',

    completionist: 'Perfectionniste'    epic: 'bg-purple-100 text-purple-800',

  }    legendary: 'bg-yellow-100 text-yellow-800'

  return labels[type] || type  }

}  return classes[rarity] || classes.common

}

// Event handlers

const closePreview = () => {const getRarityLabel = (rarity) => {

  emit('close')  const labels = {

}    common: 'Commun',

    rare: 'Rare',

const confirmCreate = () => {    epic: 'Épique',

  emit('confirm')    legendary: 'Légendaire'

}  }

  return labels[rarity] || 'Commun'

const simulateNotification = () => {}

  emit('test-notification', props.successData)

}const getTypeLabel = (type) => {

  const labels = {

const testUnlock = () => {    mission_completed: 'Mission terminée',

  if (canUnlockSuccess.value) {    circuit_completed: 'Circuit terminé',

    alert(`🎉 Succès "${props.successData.title}" déverrouillé !\n+${props.successData.xpReward || 0} XP`)    first_mission: 'Première mission',

  }    first_circuit: 'Premier circuit',

}    mission_streak: 'Série missions',

    circuit_streak: 'Série circuits',

// Watch for data changes to reset test user    explorer: 'Explorateur',

watch(() => props.successData, () => {    veteran: 'Vétéran',

  testUser.value = {    completionist: 'Perfectionniste'

    missionsCompleted: 0,  }

    circuitsCompleted: 0  return labels[type] || type

  }}

}, { deep: true })

</script>// Event handlers

const closePreview = () => {

<style scoped>  emit('close')

/* Custom animations */}

@keyframes fadeIn {

  from {const confirmCreate = () => {

    opacity: 0;  emit('confirm')

    transform: scale(0.95);}

  }

  to {const simulateNotification = () => {

    opacity: 1;  emit('test-notification', props.successData)

    transform: scale(1);}

  }

}const testUnlock = () => {

  if (canUnlockSuccess.value) {

.inline-block {    alert(`🎉 Succès "${props.successData.title}" déverrouillé !\n+${props.successData.xpReward || 0} XP`)

  animation: fadeIn 0.2s ease-out;  }

}}

</style>
// Watch for data changes to reset test user
watch(() => props.successData, () => {
  testUser.value = {
    missionsCompleted: 0,
    circuitsCompleted: 0
  }
}, { deep: true })
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.inline-block {
  animation: fadeIn 0.2s ease-out;
}
</style>