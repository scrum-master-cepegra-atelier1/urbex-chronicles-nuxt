<template>// ...existing code...

  <div class="flex min-h-screen bg-gray-50"><template>

    <!-- Sidebar -->  <div class="admin-layout flex">

    <LayoutSidebar />    <!-- Sidebar -->

        <LayoutSidebar />

    <!-- Contenu principal -->    

    <div class="flex-1 ml-72">    <!-- Contenu principal avec header -->

      <!-- TopBar -->    <div class="flex-1 ml-64 min-h-screen">

      <LayoutTopBar />      <!-- Header de navigation admin -->

            <header class="admin-layout__header">

      <!-- Contenu de la page -->        <div class="admin-layout__header__container">

      <main class="p-8">          <!-- Navigation centrale (optionnelle) -->

        <slot />          <nav class="admin-layout__header__nav">

      </main>            <div class="text-lg font-semibold text-gray-800">

    </div>              {{ getCurrentPageTitle() }}

  </div>            </div>

</template>          </nav>



<script setup>          <!-- Menu utilisateur -->

// Ce layout est utilisé pour toutes les pages administratives          <div class="admin-layout__header__user">

// Il inclut automatiquement la Sidebar et la TopBar            <div class="admin-layout__header__user__info">

</script>              <span class="admin-layout__header__user__info__name">

                {{ user?.firstname }} {{ user?.lastname }}

<style scoped>              </span>

/* Styles spécifiques au layout admin si nécessaire */              <span class="admin-layout__header__user__info__role">

</style>                Administrateur
              </span>
            </div>
            
            <div class="admin-layout__header__user__menu">
              <button 
                @click="toggleUserMenu"
                class="admin-layout__header__user__menu__trigger"
                :class="{ 'admin-layout__header__user__menu__trigger--active': isUserMenuOpen }"
              >
                <div class="w-8 h-8 bg-gray-400 rounded-full"></div>
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
                  <span>🚪</span>
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
  </div>
</template>

<script setup>
import AuthService from '~/service/AuthService.js'
import { useRoute } from 'vue-router'

// État réactif
const user = ref(null)
const isUserMenuOpen = ref(false)

// Router et route
const router = useRouter()
const route = useRoute()

// Méthodes
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const getCurrentPageTitle = () => {
  const path = route.path
  if (path === '/' || path === '/admin') return 'Dashboard'
  if (path.includes('/users')) return 'Utilisateurs'
  if (path.includes('/spots')) return 'Spots urbex'
  if (path.includes('/missions')) return 'Missions'
  if (path.includes('/success')) return 'Success'
  if (path.includes('/notifications')) return 'Notifications'
  if (path.includes('/tickets')) return 'Tickets'
  return 'Administration'
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
    z-index: 40;

    &__container {
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
    }

    &__nav {
      flex: 1;
      display: flex;
      align-items: center;
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
    min-height: calc(100vh - 4rem);

    &__container {
      padding: 0 2rem;
    }
  }
}

@media (max-width: 768px) {
  .admin-layout {
    .flex-1.ml-64 {
      margin-left: 0;
    }
    
    &__header {
      &__container {
        padding: 0 1rem;
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
