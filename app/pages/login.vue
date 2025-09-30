<template>
  <div class="min-h-screen bg-white flex flex-col font-sans">
    <!-- Contenu principal centré -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-md text-center">
        <!-- Header avec titre -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Urbex Chronicles</h1>
          <p class="text-gray-600 mb-8 text-lg font-normal">L'urbex à coté de chez toi</p>
          
          <!-- Logo -->
          <div class="flex justify-center mb-6">
            <img src="/images/logo.svg" alt="Logo Urbex Chronicles" class="w-20 h-auto" />
          </div>
          
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Champ Nom -->
          <div class="text-left">
            <label for="nom" class="block text-gray-800 text-sm font-medium mb-2">Nom</label>
            <input
              id="nom"
              v-model="formData.nom"
              type="text"
              autocomplete="username"
              class="w-full px-4 py-3 bg-white border-2 border-gray-500 rounded-lg text-gray-800 text-base transition-all duration-200 focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50"
              :class="{ 'border-red-500': errors.nom }"
              placeholder="Nom"
              required
              :disabled="isLoading"
            />
            <span v-if="errors.nom" class="block text-red-500 text-sm mt-1">
              {{ errors.nom }}
            </span>
          </div>

          <!-- Champ Mot de passe -->
          <div class="text-left">
            <label for="password" class="block text-gray-800 text-sm font-medium mb-2">Mot de passe</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              autocomplete="current-password"
              class="w-full px-4 py-3 bg-white border-2 border-gray-500 rounded-lg text-gray-800 text-base transition-all duration-200 focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Mot de passe"
              required
              :disabled="isLoading"
            />
            <span v-if="errors.password" class="block text-red-500 text-sm mt-1">
              {{ errors.password }}
            </span>
          </div>

          <!-- Lien mot de passe oublié -->
          <div class="text-left mb-6">
            <a href="#" class="text-blue-500 no-underline text-sm hover:underline">Mot de passe oublié ?</a>
          </div>

          <!-- Message d'erreur global -->
          <div v-if="globalError" class="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm mb-5">
            {{ globalError }}
          </div>

          <!-- Bouton de connexion -->
          <button
            type="submit"
            class="w-full py-3.5 bg-black text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 mb-8 hover:bg-gray-700 disabled:opacity-90 disabled:cursor-not-allowed"
            :disabled="isLoading || !isFormValid"
          >
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Séparateur -->
        <div class="my-6 relative text-gray-600 text-sm">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center bg-white px-4">
            <span>Ou continuer avec</span>
          </div>
        </div>

        <!-- Boutons OAuth -->
        <div class="flex gap-3 mb-8">
          <button class="flex-1 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-gray-300 hover:bg-gray-50">
            <span class="text-blue-500">Google</span>
          </button>
          <button class="flex-1 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-gray-300 hover:bg-gray-50">
            <span class="text-blue-600">Facebook</span>
          </button>
          <button class="flex-1 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-gray-300 hover:bg-gray-50">
            <span class="text-gray-800">Github</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Footer qui prend tout l'espace horizontal disponible -->
    <footer class="w-full border-t border-gray-200 bg-gray-50 py-16 px-8">
      <div class="text-center">
        <p class="text-gray-600 text-xs m-0">2025 Urbex Chronicles - Exploration urbaine sécurisée</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// import { useAuth } from '../composables/useAuth.js'

// Meta de la page
definePageMeta({
  layout: false,
  title: 'Connexion - Urbex Chronicles',
  // middleware: 'guest' // Temporairement désactivé pour debug
})

// Head configuration
useHead({
  title: 'Connexion - Urbex Chronicles'
})

// Composables (client-only to avoid SSR hydration mismatch)
const router = useRouter()

// État réactif simple
const formData = reactive({
  nom: '',
  password: ''
})

const errors = reactive({
  nom: '',
  password: ''
})

const globalError = ref('')
const isLoading = ref(false)

// Computed
const isFormValid = computed(() => {
  return formData.nom.trim() && formData.password.trim()
})

// Méthodes
const validateForm = () => {
  errors.nom = ''
  errors.password = ''
  globalError.value = ''

  let isValid = true

  // Validation nom
  if (!formData.nom.trim()) {
    errors.nom = 'Le nom est requis'
    isValid = false
  }

  if (!formData.password.trim()) {
    errors.password = 'Le mot de passe est requis'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  globalError.value = ''
  isLoading.value = true

  try {
    // TODO: Implémenter la logique de connexion
    console.log('Login:', formData.nom, formData.password)
    
    // Simulation d'une connexion
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirection vers le dashboard
    await router.push('/')
    
  } catch (error) {
    console.error('Erreur de connexion:', error)
    globalError.value = 'Une erreur s\'est produite lors de la connexion.'
  } finally {
    isLoading.value = false
  }
}
</script>
