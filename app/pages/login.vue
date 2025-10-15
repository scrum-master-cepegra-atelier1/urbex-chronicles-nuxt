<template>
  <div class="min-h-screen bg-white flex flex-col font-sans">
    <!-- Contenu principal centré -->
    <div class="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-sm sm:max-w-md text-center">
        <!-- Header avec titre -->
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 tracking-tight">Urbex Chronicles</h1>
          <p class="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg font-normal">L'urbex à coté de chez toi</p>
          
          <!-- Logo -->
          <div class="flex justify-center mb-4 sm:mb-6">
            <img src="/images/logo.svg" alt="Logo Urbex Chronicles" class="w-16 sm:w-20 h-auto" />
          </div>
          
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="space-y-3 sm:space-y-4">
          <!-- Champ Email -->
          <div class="text-left">
            <label for="email" class="block text-gray-800 text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              autocomplete="username"
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-500 rounded-lg text-gray-800 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Email"
              required
              :disabled="isLoading"
            />
            <span v-if="errors.email" class="block text-red-500 text-sm mt-1">
              {{ errors.email }}
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
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-500 rounded-lg text-gray-800 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50"
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
          <div class="text-left mb-4 sm:mb-6">
            <a href="#" class="text-blue-500 no-underline text-sm hover:underline">Mot de passe oublié ?</a>
          </div>

          <!-- Message d'erreur global -->
          <div v-if="globalError" class="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm mb-4 sm:mb-5">
            {{ globalError }}
          </div>

          <!-- Bouton de connexion -->
          <button
            type="submit"
            class="w-full py-3 sm:py-3.5 bg-black text-white border-none rounded-lg text-sm sm:text-base font-semibold cursor-pointer transition-all duration-200 mb-6 sm:mb-8 hover:bg-gray-700 disabled:opacity-90 disabled:cursor-not-allowed"
            :disabled="isLoading || !isFormValid"
          >
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
      </div>
    </div>
    
    <!-- Footer qui prend tout l'espace horizontal disponible -->
    <footer class="w-full border-t border-gray-200 bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="text-gray-600 text-xs m-0">2025 Urbex Chronicles - Exploration urbaine sécurisée</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AuthService from '../service/AuthService.js'

// Meta de la page
definePageMeta({
  title: 'Connexion'
})

useHead({
  title: 'Connexion'
})

// Composables (client-only to avoid SSR hydration mismatch)
const router = useRouter()

// État réactif simple
const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const globalError = ref('')
const isLoading = ref(false)

// Computed
const isFormValid = computed(() => {
  return formData.email.trim() && formData.password.trim()
})

// Méthodes
const validateForm = () => {
  errors.email = ''
  errors.password = ''
  globalError.value = ''

  let isValid = true

  // Validation email
  if (!formData.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!formData.email.includes('@')) {
    errors.email = 'Format d\'email invalide'
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
    // Utilisation du vrai AuthService avec Laravel API
    const result = await AuthService.login(formData.email, formData.password)
    
    console.log('Connexion réussie:', result.user)
    
    // Redirection vers le dashboard
    await router.push('/')
    
  } catch (error) {
    console.error('Erreur de connexion:', error)
    globalError.value = error.message || 'Une erreur s\'est produite lors de la connexion.'
  } finally {
    isLoading.value = false
  }
}
</script>
