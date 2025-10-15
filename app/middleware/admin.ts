/**
 * Admin route middleware
 * Ensures the user is authenticated as a Laravel admin
 */

// Nuxt auto-imports defineNuxtRouteMiddleware & navigateTo
import AuthService from "../service/AuthService.js"

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // Only run on client (uses localStorage)
  if (import.meta.server) return

  if (!AuthService.isAuthenticated()) {
    return navigateTo("/login")
  }

  try {
    const isAdmin = await AuthService.isAuthenticatedAdmin()
    if (!isAdmin) {
      await AuthService.logout()
      return navigateTo("/login")
    }
  } catch (err) {
    console.error("Admin verification failed:", err)
    await AuthService.logout()
    return navigateTo("/login")
  }
})
