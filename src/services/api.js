import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    window.showGlobalLoader?.();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    window.hideGlobalLoader?.();
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    window.hideGlobalLoader?.();
    return response;
  },
  (error) => {
    window.hideGlobalLoader?.();
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default api;
