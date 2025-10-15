/**
 * Authentication Service for Laravel API
 * - Handles admin login, token storage, and verification
 */

import { laravelApi } from "./ApiService.js";

class AuthService {
  constructor() {
    this.tokenKey = "laravel_admin_token";
    this.userKey = "laravel_admin_user";
    this.tokenExpiryKey = "laravel_admin_token_expiry";
    this.ttlMs = 24 * 60 * 60 * 1000; // 24h
  }

  // Login admin and store token + user
  async login(email, password) {
    try {
      const res = await laravelApi.post("/auth/login", {
        email,
        password,
      });

      // Laravel API returns { token, user }
      const token = res?.token;
      const user = res?.user;

      if (!token) throw new Error("Invalid response format from Laravel API");
      if (!user) throw new Error("User data not received from Laravel API");

      this._setToken(token);
      this._setTokenExpiry(Date.now() + this.ttlMs);

      // Vérifier que l'utilisateur a un rôle admin
      if (!this._hasAdminRole(user)) {
        // Not an admin, cleanup and block
        this.logout();
        throw new Error("Access denied. User is not a Laravel administrator.");
      }

      this._setUser(user);

      // Mettre à jour le token dans laravelApi pour les prochaines requêtes
      laravelApi.setToken(token);

      return { user, token };
    } catch (err) {
      // Normalize errors
      const status = err?.response?.status;
      if (status === 400 || status === 401)
        throw new Error("Invalid credentials");
      if (status === 403)
        throw new Error("Access denied. Invalid admin credentials.");
      if (status === 429)
        throw new Error("Too many attempts. Please try again later.");
      if (!err?.response)
        throw new Error(
          "Network error. Please check if Laravel API is running."
        );
      throw err;
    }
  }

  async logout() {
    try {
      // Appeler l'API Laravel pour déconnexion côté serveur
      await laravelApi.post("/auth/logout");
    } catch (e) {
      // Continuer même si l'API échoue (token peut être expiré)
      console.warn("Logout API call failed:", e.message);
    } finally {
      // Nettoyer le localStorage dans tous les cas
      if (typeof window !== "undefined") {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        localStorage.removeItem(this.tokenExpiryKey);
      }

      // Supprimer le token de laravelApi
      laravelApi.setToken(null);
    }
  }

  isAuthenticated() {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem(this.tokenKey);
    const expiry = parseInt(
      localStorage.getItem(this.tokenExpiryKey) || "0",
      10
    );
    if (!token || !expiry) return false;
    if (Date.now() > expiry) {
      this.logout();
      return false;
    }
    return true;
  }

  async isAuthenticatedAdmin() {
    if (!this.isAuthenticated()) return false;
    try {
      const me = await laravelApi.get("/auth/me");
      return this._hasAdminRole(me);
    } catch (e) {
      this.logout();
      return false;
    }
  }

  getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.tokenKey);
  }

  getUser() {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  async refreshToken() {
    try {
      const res = await laravelApi.post("/auth/refresh");
      const token = res?.token;
      if (!token) throw new Error("Failed to refresh token");
      this._setToken(token);
      this._setTokenExpiry(Date.now() + this.ttlMs);

      // Mettre à jour le token dans laravelApi
      laravelApi.setToken(token);

      return token;
    } catch (e) {
      this.logout();
      throw e;
    }
  }

  hasAdminAccess(user) {
    return this._hasAdminRole(user);
  }

  _hasAdminRole(user) {
    // Selon la doc Laravel : user.role peut être "user", "admin", "superadmin"
    const userRole = user?.role;
    return userRole === "admin" || userRole === "superadmin";
  }

  _setToken(token) {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.tokenKey, token);
  }

  _setUser(user) {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  _setTokenExpiry(ts) {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.tokenExpiryKey, String(ts));
  }
}

export default new AuthService();
