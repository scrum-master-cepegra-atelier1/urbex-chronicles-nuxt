<template>
  <div class="body">
    test tailwind
  </div>
  <div class="login-page">
    <div class="login-page__container">
      <!-- Logo et titre -->
      <div class="login-page__header">
        <h1 class="login-page__header__title">URBEX CHRONICLES</h1>
        <p class="login-page__header__subtitle">Administration - CMS</p>
      </div>

      <!-- Formulaire de connexion -->
      <div class="login-page__form-container">
        <form @submit.prevent="handleLogin" class="login-page__form">
          <h2 class="login-page__form__title">Connexion</h2>
          
          <!-- Champ email admin -->
          <div class="login-page__form__field">
            <label for="email" class="login-page__form__field__label">
              Email administrateur
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="login-page__form__field__input"
              :class="{ 'login-page__form__field__input--error': errors.email }"
              placeholder="admin@exemple.com"
              required
              :disabled="isLoading"
            />
            <span v-if="errors.email" class="login-page__form__field__error">
              {{ errors.email }}
            </span>
          </div>

          <!-- Champ mot de passe -->
          <div class="login-page__form__field">
            <label for="password" class="login-page__form__field__label">
              Mot de passe
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              class="login-page__form__field__input"
              :class="{ 'login-page__form__field__input--error': errors.password }"
              placeholder="Votre mot de passe"
              required
              :disabled="isLoading"
            />
            <span v-if="errors.password" class="login-page__form__field__error">
              {{ errors.password }}
            </span>
          </div>

          <!-- Message d'erreur global -->
          <div v-if="globalError" class="login-page__form__error">
            {{ globalError }}
          </div>

          <!-- Bouton de soumission -->
          <button
            type="submit"
            class="login-page__form__submit"
            :disabled="isLoading || !isFormValid"
          >
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Information pour les admins -->
        <div class="login-page__footer">
          <p class="login-page__footer__info">
            Seuls les administrateurs Strapi peuvent accéder à cette interface.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth.js'
// Meta de la page
definePageMeta({
  layout: false,
  title: 'Connexion - CMS URBEX CHRONICLES',
  middleware: 'guest'
})

// Head configuration
useHead({
  title: 'Connexion - CMS URBEX CHRONICLES'
})

// Composables (client-only to avoid SSR hydration mismatch)
const router = useRouter()
let loginFn
let authLoading
if (process.client) {
  const auth = useAuth()
  loginFn = auth.login
  authLoading = auth.isLoading
}

// État réactif
const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const globalError = ref('')

// Utiliser le isLoading du composable
const isLoading = computed(() => authLoading?.value ?? false)

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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = 'L\'email administrateur est requis'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
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

  try {
    if (!loginFn) return
    await loginFn(formData.email, formData.password)
    
    // Redirection vers le dashboard
    await router.push('/')
    
  } catch (error) {
    console.error('Erreur de connexion admin:', error)
    
    if (error.message === 'Invalid credentials') {
      globalError.value = 'Email ou mot de passe incorrect'
    } else if (error.message.includes('429')) {
      globalError.value = 'Trop de tentatives de connexion. Veuillez réessayer plus tard.'
    } else if (error.message.includes('Network')) {
      globalError.value = 'Erreur de connexion. Vérifiez que Strapi est démarré.'
    } else {
      globalError.value = error.message || 'Une erreur s\'est produite lors de la connexion.'
    }
  }
}

// Vérifier si déjà connecté
onMounted(async () => {
  if (!process.client) return
  const { isAuthenticated, checkAdminPermissions } = useAuth()
  if (isAuthenticated.value) {
    const isAdmin = await checkAdminPermissions()
    if (isAdmin) await router.push('/')
  }
})
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  &__container {
    width: 100%;
    max-width: 400px;
  }

  &__header {
    text-align: center;
    margin-bottom: 2rem;

    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 0.5rem 0;
      letter-spacing: 1px;
    }

    &__subtitle {
      color: #b8bcc8;
      margin: 0;
      font-size: 1rem;
    }
  }

  &__form-container {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  &__form {
    &__title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 1.5rem 0;
      text-align: center;
    }

    &__field {
      margin-bottom: 1.25rem;

      &__label {
        display: block;
        color: #e5e7eb;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      &__input {
        width: 100%;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        color: #ffffff;
        font-size: 1rem;
        transition: all 0.3s ease;

        &::placeholder {
          color: #9ca3af;
        }

        &:focus {
          outline: none;
          border-color: #60a5fa;
          background: rgba(255, 255, 255, 0.15);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        &--error {
          border-color: #f87171;
        }
      }

      &__error {
        color: #f87171;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }
    }

    &__error {
      background: rgba(248, 113, 113, 0.1);
      border: 1px solid rgba(248, 113, 113, 0.3);
      border-radius: 8px;
      padding: 0.75rem;
      color: #f87171;
      font-size: 0.875rem;
      margin-bottom: 1.25rem;
    }

    &__submit {
      width: 100%;
      padding: 0.875rem;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        transform: translateY(-2px);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }
    }
  }

  &__footer {
    text-align: center;
    margin-top: 1.5rem;
    color: #b8bcc8;
    font-size: 0.875rem;

    &__link {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 500;
      margin-left: 0.5rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
