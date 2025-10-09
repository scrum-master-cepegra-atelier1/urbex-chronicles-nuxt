/**
 * Composable pour la gestion de l'authentification
 * Fournit des méthodes réactives pour gérer l'état d'authentification
 */

import AuthService from "../service/AuthService.js";

export const useAuth = () => {
  // État réactif
  const user = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);

  // Initialiser l'état
  const initialize = () => {
    if (typeof window !== "undefined") {
      isAuthenticated.value = AuthService.isAuthenticated();
      user.value = AuthService.getUser();
    }
  };

  // Connexion
  const login = async (email, password) => {
    isLoading.value = true;

    try {
      const response = await AuthService.login(email, password);

      // Mettre à jour l'état réactif
      user.value = response.user;
      isAuthenticated.value = true;

      return response;
    } finally {
      isLoading.value = false;
    }
  };

  // Déconnexion
  const logout = () => {
    AuthService.logout();
    user.value = null;
    isAuthenticated.value = false;
  };

  // Vérifier les permissions admin
  const checkAdminPermissions = async () => {
    if (!isAuthenticated.value) return false;

    try {
      return await AuthService.isAuthenticatedAdmin();
    } catch (error) {
      console.error(
        "Erreur lors de la vérification des permissions admin:",
        error
      );
      return false;
    }
  };

  // Rafraîchir le token
  const refreshToken = async () => {
    try {
      await AuthService.refreshToken();
      return true;
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token:", error);
      logout();
      return false;
    }
  };

  // Initialiser au montage
  if (typeof window !== "undefined") {
    initialize();
  }

  return {
    // État
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),

    // Méthodes
    login,
    logout,
    checkAdminPermissions,
    refreshToken,
    initialize,
  };
};
