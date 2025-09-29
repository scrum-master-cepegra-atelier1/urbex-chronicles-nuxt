/**
 * Guest route middleware (client-side, app scope)
 */

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  if (process.server) return;

  const { default: AuthService } = await import("../service/AuthService.js");

  if (AuthService.isAuthenticated()) {
    const isAdmin = await AuthService.isAuthenticatedAdmin();
    if (isAdmin) {
      return navigateTo("/");
    }
  }
});
