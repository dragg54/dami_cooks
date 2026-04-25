import axios from 'axios';
import { BACKEND_SERVER_URL } from '../AppConfig';
import { toast } from 'react-toastify'
import { refreshTokenApi } from './user/UserService';

const Axios = axios.create({
  baseURL: `${BACKEND_SERVER_URL}/api/v1`,
  withCredentials: true,
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise = null;

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    if (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_RESPONSE") {
      toast.error("A server error occurred. Please try again later.");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If a refresh is already in flight, wait for it — don't start a new one
      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const { data } = await refreshTokenApi({ refreshToken });
            localStorage.setItem("authToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            return data.accessToken;
          } catch (err) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            if (!window.location.pathname.includes("/login")) {
              window.location.href = "/login";
            }
            throw err;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      try {
        const token = await refreshPromise; 
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return Axios(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
