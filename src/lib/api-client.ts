import axios from "axios";

// Environment variable for backend URL (will be validated by env.mjs later)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Centralized API Client using Axios.
 * This is production-grade: it automatically attaches tokens and handles global errors.
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeouts to prevent hanging requests in production
  timeout: 10000, 
});

// Request Interceptor: Attach JWT Token if available
apiClient.interceptors.request.use(
  (config) => {
    // NOTE: In a real app, you might get this from Zustand or localStorage/cookies
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid -> Automatically log out the user
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        // Optionally redirect to login or trigger a global store action
        // window.location.href = "/auth/signin";
      }
    }
    return Promise.reject(error);
  }
);
