/**
 * Authentication Service for Strapi Admin
 * - Handles admin login, token storage, and verification
 */

import { strapiAdminApi } from "./ApiService.js";

class AuthService {
  constructor() {
    this.tokenKey = "strapi_admin_token";
    this.userKey = "strapi_admin_user";
    this.tokenExpiryKey = "strapi_admin_token_expiry";
    this.ttlMs = 24 * 60 * 60 * 1000; // 24h
  }

  // Login admin and store token + user
  async login(email, password) {
    try {
      const res = await strapiAdminApi.post("/admin/login", {
        email,
        password,
      });

      // Strapi admin usually returns { data: { token } }
      const token = res?.data?.token || res?.token;
      if (!token) throw new Error("Invalid response format from Strapi");

      this._setToken(token);
      this._setTokenExpiry(Date.now() + this.ttlMs);

      // Fetch user profile
      const me = await strapiAdminApi.get("/admin/users/me");
      const user = me?.data || me;
      if (!user) throw new Error("Failed to retrieve admin profile");

      if (!this._hasAdminRole(user?.roles)) {
        // Not an admin, cleanup and block
        this.logout();
        throw new Error("Access denied. User is not a Strapi administrator.");
      }

      this._setUser(user);
      return { user, token };
    } catch (err) {
      // Normalize errors
      const status = err?.response?.status;
      if (status === 400) throw new Error("Invalid credentials");
      if (status === 403)
        throw new Error("Access denied. Invalid admin credentials.");
      if (status === 429)
        throw new Error("Too many attempts. Please try again later.");
      if (!err?.response)
        throw new Error("Network error. Please check if Strapi is running.");
      throw err;
    }
  }

  logout() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenExpiryKey);
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
      const me = await strapiAdminApi.get("/admin/users/me");
      const roles = me?.data?.roles || me?.roles;
      return this._hasAdminRole(roles);
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
      const res = await strapiAdminApi.post("/admin/renew-token");
      const token = res?.data?.token || res?.token;
      if (!token) throw new Error("Failed to refresh token");
      this._setToken(token);
      this._setTokenExpiry(Date.now() + this.ttlMs);
      return token;
    } catch (e) {
      this.logout();
      throw e;
    }
  }

  hasAdminAccess(user) {
    return this._hasAdminRole(user?.roles);
  }

  _hasAdminRole(roles) {
    if (!Array.isArray(roles)) return false;
    return roles.some(
      (r) =>
        r?.code === "strapi-super-admin" ||
        r?.code === "strapi-admin" ||
        r?.name === "Super Admin" ||
        r?.name === "Admin"
    );
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
