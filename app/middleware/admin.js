/**
 * Admin route middleware (client-side, app scope)
 */

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  if (process.server) return;

  const { default: AuthService } = await import("../service/AuthService.js");

  if (!AuthService.isAuthenticated()) {
    return navigateTo("/login");
  }

  try {
    const isAdmin = await AuthService.isAuthenticatedAdmin();
    if (!isAdmin) {
      AuthService.logout();
      return navigateTo("/login");
    }
  } catch (err) {
    console.error("Admin verification failed:", err);
    AuthService.logout();
    return navigateTo("/login");
  }
});
