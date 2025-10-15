/**
 * Composable pour la gestion des utilisateurs avec Laravel API
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
   * Récupérer tous les utilisateurs
   */
  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Import de l'API Laravel
      const { laravelApi } = await import("../service/ApiService.js");

      console.log("Récupération de tous les utilisateurs...");

      // Récupérer tous les utilisateurs depuis l'API (Admin requis)
      const response = await laravelApi.get("/users");

      console.log("Réponse Laravel users:", response);

      // Laravel retourne directement la liste des utilisateurs
      users.value = Array.isArray(response) ? response : response.data || [];

      pagination.value.total = users.value.length;
      pagination.value.pageCount = Math.ceil(
        users.value.length / pagination.value.pageSize
      );

      console.log(`✅ ${users.value.length} utilisateur(s) récupéré(s)`);
    } catch (err) {
      console.error("❌ Erreur récupération utilisateurs:", err);
      error.value = `Erreur: ${err.message}`;
      users.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Autres méthodes temporairement désactivées
  const fetchUserById = async (userId) => {
    try {
      // Import de l'API Laravel
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`Récupération de l'utilisateur ${userId}...`);

      // Récupérer l'utilisateur spécifique via l'API (Token requis)
      const response = await laravelApi.get(`/users/${userId}`);

      console.log(`✅ Utilisateur ${userId} récupéré`);
      return response;
    } catch (err) {
      console.error("❌ Erreur récupération utilisateur:", err);
      error.value = `Erreur lors de la récupération: ${err.message}`;
      return null;
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Import de l'API Laravel
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`Suppression de l'utilisateur ${userId}...`);

      // Supprimer l'utilisateur via l'API (Admin requis)
      await laravelApi.delete(`/admin/users/${userId}`);

      // Mettre à jour la liste locale
      users.value = users.value.filter((user) => user.id !== userId);

      // Mettre à jour la pagination
      pagination.value.total = users.value.length;
      pagination.value.pageCount = Math.ceil(
        users.value.length / pagination.value.pageSize
      );

      console.log(`✅ Utilisateur ${userId} supprimé avec succès`);
      return true;
    } catch (err) {
      console.error("❌ Erreur suppression utilisateur:", err);
      error.value = `Erreur lors de la suppression: ${err.message}`;
      return false;
    }
  };
  const updateUser = async (userId, userData) => {
    try {
      // Import de l'API Laravel
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`Mise à jour de l'utilisateur ${userId}...`, userData);

      // Mettre à jour l'utilisateur via l'API (Token requis)
      const response = await laravelApi.put(`/users/${userId}`, userData);

      // Mettre à jour la liste locale
      const userIndex = users.value.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        users.value[userIndex] = { ...users.value[userIndex], ...response };
      }

      console.log(`✅ Utilisateur ${userId} mis à jour avec succès`);
      return response;
    } catch (err) {
      console.error("❌ Erreur mise à jour utilisateur:", err);
      error.value = `Erreur lors de la mise à jour: ${err.message}`;
      return null;
    }
  };

  const createUser = async (userData) => {
    try {
      // Import de l'API Laravel
      const { laravelApi } = await import("../service/ApiService.js");

      console.log("Création d'un nouvel utilisateur...", userData);

      // Créer l'utilisateur via l'API (Admin requis)
      const response = await laravelApi.post("/admin/users", userData);

      // Ajouter le nouvel utilisateur à la liste locale
      users.value.push(response);

      // Mettre à jour la pagination
      pagination.value.total = users.value.length;
      pagination.value.pageCount = Math.ceil(
        users.value.length / pagination.value.pageSize
      );

      console.log("✅ Utilisateur créé avec succès");
      return response;
    } catch (err) {
      console.error("❌ Erreur création utilisateur:", err);
      error.value = `Erreur lors de la création: ${err.message}`;
      return null;
    }
  };

  const searchUsers = async (query) => {
    try {
      searchLoading.value = true;

      // Import de l'API Laravel
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`Recherche d'utilisateurs: "${query}"`);

      // Pour l'instant, faire la recherche côté client
      // TODO: Implémenter la recherche côté serveur si l'API le supporte
      const filtered = users.value.filter(
        (user) =>
          user.username?.toLowerCase().includes(query.toLowerCase()) ||
          user.email?.toLowerCase().includes(query.toLowerCase()) ||
          user.role?.toLowerCase().includes(query.toLowerCase())
      );

      console.log(`✅ ${filtered.length} utilisateur(s) trouvé(s)`);
      return filtered;
    } catch (err) {
      console.error("❌ Erreur recherche utilisateurs:", err);
      error.value = `Erreur lors de la recherche: ${err.message}`;
      return [];
    } finally {
      searchLoading.value = false;
    }
  };

  const getTotalUsers = async () => {
    try {
      // Si on a déjà des utilisateurs chargés, retourner le nombre
      if (users.value.length > 0) {
        return users.value.length;
      }

      // Sinon, faire un appel API pour obtenir le total
      await fetchUsers();
      return users.value.length;
    } catch (err) {
      console.error("❌ Erreur récupération total utilisateurs:", err);
      return 0;
    }
  };

  // États calculés
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => !!error.value);
  const hasUsers = computed(() => users.value.length > 0);
  const userCount = computed(() => users.value.length);

  // Méthode de rafraîchissement
  const refreshUsers = async () => {
    await fetchUsers();
  };

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
    refreshUsers,
    fetchUserById,
    deleteUser,
    updateUser,
    createUser,
    searchUsers,
    getTotalUsers,
  };
};
