/**
 * Composable pour la gestion des utilisateurs avec Laravel API
 * VERSION TEMPORAIRE - En attente des routes d'admin Laravel
 */
import { ref, computed, readonly } from "vue";

export const useUsers = () => {
  // États réactifs
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchLoading = ref(false);
  const pagination = ref({
    page: 1,
    pageSize: 25,
    total: 0,
    pageCount: 0,
  });

  /**
   * Récupérer tous les utilisateurs (VERSION TEMPORAIRE)
   */
  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Import de l'API Laravel
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(
        "🚧 TEMPORAIRE - Récupération du profil utilisateur actuel seulement..."
      );

      // Pour l'instant, on récupère juste l'utilisateur connecté
      const response = await laravelApi.get("/auth/me");

      console.log("Réponse Laravel me:", response);

      // Simuler une liste avec juste l'utilisateur connecté
      const currentUser = response;
      users.value = [currentUser];

      pagination.value.total = 1;
      pagination.value.pageCount = 1;

      console.log(
        "🚧 TEMPORAIRE - 1 utilisateur récupéré (utilisateur connecté)"
      );
    } catch (err) {
      console.error("❌ Erreur récupération utilisateur:", err);
      error.value = `Erreur: ${err.message}`;
      users.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Autres méthodes temporairement désactivées
  const fetchUserById = async (userId) => {
    console.warn(
      "🚧 fetchUserById temporairement désactivé - Route Laravel nécessaire"
    );
    return null;
  };

  const deleteUser = async (userId) => {
    console.warn(
      "🚧 deleteUser temporairement désactivé - Route Laravel nécessaire"
    );
    return false;
  };

  const updateUser = async (userId, userData) => {
    console.warn(
      "🚧 updateUser temporairement désactivé - Route Laravel nécessaire"
    );
    return null;
  };

  const createUser = async (userData) => {
    console.warn(
      "🚧 createUser temporairement désactivé - Route Laravel nécessaire"
    );
    return null;
  };

  const searchUsers = async (query) => {
    console.warn(
      "🚧 searchUsers temporairement désactivé - Route Laravel nécessaire"
    );
    return [];
  };

  const getTotalUsers = async () => {
    console.warn(
      "🚧 getTotalUsers temporairement désactivé - Route Laravel nécessaire"
    );
    return 1;
  };

  // États calculés
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => !!error.value);
  const hasUsers = computed(() => users.value.length > 0);
  const userCount = computed(() => users.value.length);

  return {
    // États
    users: readonly(users),
    loading: readonly(loading),
    error: readonly(error),
    searchLoading: readonly(searchLoading),
    pagination: readonly(pagination),

    // États calculés
    isLoading,
    hasError,
    hasUsers,
    userCount,

    // Actions
    fetchUsers,
    fetchUserById,
    deleteUser,
    updateUser,
    createUser,
    searchUsers,
    getTotalUsers,
  };
};
