/**
 * Plugin d'initialisation de l'authentification
 * Vérifie automatiquement l'état d'authentification au démarrage de l'app
 */

import AuthService from "../service/AuthService.js";

export default defineNuxtPlugin(async () => {
  // Seulement côté client
  if (typeof window === "undefined") return;

  // Vérifier l'état d'authentification au démarrage de l'application
  const router = useRouter();

  // Vérifier si l'utilisateur a un token valide
  const isAuthenticated = AuthService.isAuthenticated();

  if (isAuthenticated) {
    try {
      // Vérifier que le token est toujours valide côté serveur
      const isValidAdmin = await AuthService.isAuthenticatedAdmin();

      if (!isValidAdmin) {
        // Token invalide, nettoyer et rediriger si nécessaire
        AuthService.logout();

        // Rediriger seulement si on est sur une page protégée
        const currentRoute = router.currentRoute.value;
        const middlewares = Array.isArray(currentRoute.meta?.middleware)
          ? currentRoute.meta.middleware
          : currentRoute.meta?.middleware
          ? [currentRoute.meta.middleware]
          : [];
        if (currentRoute.path !== "/login" && middlewares.includes("admin")) {
          await router.push("/login");
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'authentification:",
        error
      );
      AuthService.logout();
    }
  }
});
