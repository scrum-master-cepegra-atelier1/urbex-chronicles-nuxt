/**
 * Admin route middleware
 * Ensures the user is authenticated as a Strapi admin
 */

// Nuxt auto-imports defineNuxtRouteMiddleware & navigateTo
import AuthService from "~/app/service/AuthService.js"

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // Only run on client (uses localStorage)
  if (process.server) return

  if (!AuthService.isAuthenticated()) {
    return navigateTo("/login")
  }

  try {
    const isAdmin = await AuthService.isAuthenticatedAdmin()
    if (!isAdmin) {
      AuthService.logout()
      return navigateTo("/login")
    }
  } catch (err) {
    console.error("Admin verification failed:", err)
    AuthService.logout()
    return navigateTo("/login")
  }
})
