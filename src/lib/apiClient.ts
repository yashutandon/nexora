import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // IMPORTANT: Allows sending HTTP-only cookies
});

// Optional: Add interceptors for response error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401 Unauthorized globally, we could trigger a logout here
    return Promise.reject(error);
  }
);
