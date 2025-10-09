/**
 * Guest route middleware
 * If already authenticated as admin, redirect to dashboard
 */

// Nuxt auto-imports defineNuxtRouteMiddleware & navigateTo
<<<<<<< HEAD
import AuthService from "../service/AuthService.js"
=======
import AuthService from "~/service/AuthService.js"
>>>>>>> origin/feature/test

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // Only on client
  if (process.server) return

  if (AuthService.isAuthenticated()) {
    const isAdmin = await AuthService.isAuthenticatedAdmin()
    if (isAdmin) {
      return navigateTo("/")
    }
  }
})
