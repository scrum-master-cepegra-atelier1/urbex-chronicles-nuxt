/**
 * Guest route middleware
 * If already authenticated as admin, redirect to dashboard
 */

// Nuxt auto-imports defineNuxtRouteMiddleware & navigateTo
import AuthService from "../service/AuthService.js"

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // Only on client
  if (import.meta.server) return

  if (AuthService.isAuthenticated()) {
    const isAdmin = await AuthService.isAuthenticatedAdmin()
    if (isAdmin) {
      return navigateTo("/")
    }
  }
})
