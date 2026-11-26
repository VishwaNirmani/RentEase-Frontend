import axios from "axios";
import {
  AUTH_EXPIRED_EVENT,
  AUTH_SESSION_KEY,
  clearAuthSession,
} from "../auth/authStorage";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const savedSession = window.sessionStorage.getItem(AUTH_SESSION_KEY);

  if (savedSession) {
    try {
      const { token } = JSON.parse(savedSession);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Unable to read the saved RentEase access token.", error);
      clearAuthSession();
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url ?? "";
    const isAuthRequest =
      url.includes("/auth/login") || url.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthRequest) {
      clearAuthSession();
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }

    return Promise.reject(error);
  },
);

export default apiClient;
