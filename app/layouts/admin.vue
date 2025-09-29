// ...existing code...
<template>
  <div class="admin-layout">
    <!-- Header de navigation admin -->
    <header class="admin-layout__header">
      <div class="admin-layout__header__container">
        <!-- Logo et titre -->
        <div class="admin-layout__header__brand">
          <h1 class="admin-layout__header__brand__title">
            URBEX CHRONICLES
          </h1>
          <span class="admin-layout__header__brand__subtitle">
            Administration
          </span>
        </div>

        <!-- Navigation -->
        <nav class="admin-layout__header__nav">
          <NuxtLink 
            to="/" 
            class="admin-layout__header__nav__link"
            active-class="admin-layout__header__nav__link--active"
          >
            <Icon name="heroicons:home" />
            Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/content" 
            class="admin-layout__header__nav__link"
            active-class="admin-layout__header__nav__link--active"
          >
            <Icon name="heroicons:document-text" />
            Contenu
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/media" 
            class="admin-layout__header__nav__link"
            active-class="admin-layout__header__nav__link--active"
          >
            <Icon name="heroicons:photo" />
            Médias
          </NuxtLink>
        </nav>

        <!-- Menu utilisateur -->
        <div class="admin-layout__header__user">
          <div class="admin-layout__header__user__info">
            <span class="admin-layout__header__user__info__name">
              {{ user?.firstname }} {{ user?.lastname }}
            </span>
            <span class="admin-layout__header__user__info__role">
              Administrateur
            </span>
          </div>
          
          <div class="admin-layout__header__user__menu">
            <button 
              @click="toggleUserMenu"
              class="admin-layout__header__user__menu__trigger"
              :class="{ 'admin-layout__header__user__menu__trigger--active': isUserMenuOpen }"
            >
              <Icon name="heroicons:user-circle" size="32" />
            </button>
            
            <!-- Dropdown menu -->
            <div 
              v-if="isUserMenuOpen"
              class="admin-layout__header__user__menu__dropdown"
            >
              <button 
                @click="handleLogout"
                class="admin-layout__header__user__menu__dropdown__item"
              >
                <Icon name="heroicons:arrow-right-on-rectangle" />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="admin-layout__main">
      <div class="admin-layout__main__container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import AuthService from '~/service/AuthService.js'

// État réactif
const user = ref(null)
const isUserMenuOpen = ref(false)

// Router
const router = useRouter()

// Méthodes
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleLogout = async () => {
  try {
    AuthService.logout()
    await router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Fermer le menu utilisateur en cliquant à l'extérieur
const closeUserMenuOnClickOutside = (event) => {
  if (!event.target.closest('.admin-layout__header__user__menu')) {
    isUserMenuOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Récupérer les informations de l'utilisateur
  user.value = AuthService.getUser()
  
  // Ajouter l'écouteur pour fermer le menu
  document.addEventListener('click', closeUserMenuOnClickOutside)
})

onUnmounted(() => {
  // Nettoyer l'écouteur
  document.removeEventListener('click', closeUserMenuOnClickOutside)
})
</script>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
  background: #f8fafc;

  &__header {
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    z-index: 100;

    &__container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
    }

    &__brand {
      &__title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
        line-height: 1.2;
      }

      &__subtitle {
        font-size: 0.75rem;
        color: #64748b;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    &__nav {
      display: flex;
      align-items: center;
      gap: 2rem;

      &__link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        color: #64748b;
        text-decoration: none;
        font-weight: 500;
        border-radius: 0.5rem;
        transition: all 0.2s ease;

        &:hover {
          color: #3b82f6;
          background: #eff6ff;
        }

        &--active {
          color: #3b82f6;
          background: #eff6ff;
        }
      }
    }

    &__user {
      display: flex;
      align-items: center;
      gap: 1rem;

      &__info {
        text-align: right;

        &__name {
          display: block;
          font-weight: 600;
          color: #1e293b;
          font-size: 0.875rem;
        }

        &__role {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
        }
      }

      &__menu {
        position: relative;

        &__trigger {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          transition: color 0.2s ease;
          border-radius: 50%;
          padding: 0.25rem;

          &:hover,
          &--active {
            color: #3b82f6;
          }
        }

        &__dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          min-width: 160px;
          z-index: 1000;

          &__item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            padding: 0.75rem 1rem;
            background: none;
            border: none;
            color: #64748b;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              background: #f1f5f9;
              color: #dc2626;
            }

            &:first-child {
              border-radius: 0.5rem 0.5rem 0 0;
            }

            &:last-child {
              border-radius: 0 0 0.5rem 0.5rem;
            }
          }
        }
      }
    }
  }

  &__main {
    padding: 2rem 0;

    &__container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }
  }
}

@media (max-width: 768px) {
  .admin-layout {
    &__header {
      &__container {
        padding: 0 1rem;
      }

      &__nav {
        display: none;
      }

      &__user {
        &__info {
          display: none;
        }
      }
    }

    &__main {
      &__container {
        padding: 0 1rem;
      }
    }
  }
}
</style>
