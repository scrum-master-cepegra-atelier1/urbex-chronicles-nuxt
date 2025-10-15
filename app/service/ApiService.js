/**
 * API Service for URBEX CHRONICLES
 * Handles HTTP calls to Laravel API in a scalable manner
 *
 * @class ApiService
 * @description Centralized service for making HTTP requests with automatic authentication
 * @example
 * // Use predefined Laravel instance
 * import { laravelApi } from '@/services/ApiService'
 * const data = await laravelApi.get('/circuits')
 *
 * // Create custom instance
 * const customApi = new ApiService('https://api.example.com', 'your-token')
 */

class ApiService {
  /**
   * Creates an instance of ApiService
   * @param {string|null} baseUrl - Base URL for API calls (defaults to environment variable)
   * @param {string|null} apiKey - API key for authentication (defaults to environment variable)
   */
  constructor(baseUrl = null, apiKey = null) {
    // Utiliser VITE_LARAVEL_BASE_URL comme base principale
    this.baseUrl =
      baseUrl ||
      import.meta.env.VITE_LARAVEL_BASE_URL ||
      import.meta.env.VITE_API_BASE_URL ||
      "";
    this.apiKey = apiKey || import.meta.env.VITE_LARAVEL_TOKEN || null;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json", // Laravel expects this header
    };

    // Add API key if it exists
    if (this.apiKey) {
      this.defaultHeaders["Authorization"] = `Bearer ${this.apiKey}`;
    }
  }

  /**
   * Performs an HTTP request
   * @param {string} endpoint - The API endpoint
   * @param {object} options - Fetch options
   * @returns {Promise<any>} - API response
   * @throws {Error} - HTTP error with status code
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const config = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    // Ajouter automatiquement le token depuis localStorage si disponible
    if (typeof window !== "undefined" && !config.headers.Authorization) {
      const token = localStorage.getItem("laravel_admin_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Try to get Laravel error message from response
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          const message =
            errorData.message || errorData.error || `HTTP ${response.status}`;
          throw new Error(message);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response contains JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      console.error("Laravel API Error:", error);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint - The API endpoint
   * @param {object} options - Additional options
   * @returns {Promise<any>} - Retrieved data
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: "GET",
      ...options,
    });
  }

  /**
   * POST request
   * @param {string} endpoint - The API endpoint
   * @param {object} data - Data to send
   * @param {object} options - Additional options
   * @returns {Promise<any>} - API response
   */
  async post(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : null,
      ...options,
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - The API endpoint
   * @param {object} data - Data to send
   * @param {object} options - Additional options
   * @returns {Promise<any>} - API response
   */
  async put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : null,
      ...options,
    });
  }

  /**
   * PATCH request
   * @param {string} endpoint - The API endpoint
   * @param {object} data - Data to send
   * @param {object} options - Additional options
   * @returns {Promise<any>} - API response
   */
  async patch(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : null,
      ...options,
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - The API endpoint
   * @param {object} options - Additional options
   * @returns {Promise<any>} - API response
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: "DELETE",
      ...options,
    });
  }

  /**
   * Set the authorization token for future requests
   * @param {string} token - JWT token
   */
  setToken(token) {
    if (token) {
      this.defaultHeaders["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders["Authorization"];
    }
  }

  /**
   * Get current authorization token
   * @returns {string|null} - Current token or null
   */
  getToken() {
    return this.defaultHeaders["Authorization"]?.replace("Bearer ", "") || null;
  }

  /**
   * File upload
   * @param {string} endpoint - The API endpoint
   * @param {FormData} formData - Form data to upload
   * @param {object} options - Additional options
   * @returns {Promise<any>} - API response
   */
  async upload(endpoint, formData, options = {}) {
    const headers = { ...this.defaultHeaders };
    // Remove Content-Type to let browser handle multipart/form-data
    delete headers["Content-Type"];

    return this.request(endpoint, {
      method: "POST",
      body: formData,
      headers,
      ...options,
    });
  }
}

// Instance unique pour Laravel API avec authentification automatique
export const laravelApi = new ApiService(
  import.meta.env.VITE_LARAVEL_BASE_URL,
  import.meta.env.VITE_LARAVEL_TOKEN
);

// Initialiser l'instance avec le token depuis localStorage
if (typeof window !== "undefined") {
  const token = localStorage.getItem("laravel_admin_token");
  if (token) {
    laravelApi.setToken(token);
  }
}

// Export pour compatibilité (même instance)
export const laravelAdminApi = laravelApi;

// Export the class to create other instances
export default ApiService;
