import axios, { AxiosInstance, AxiosError } from "axios";
import { API_CONFIG } from "@/config/config";

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
};

const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_CONFIG.ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(API_CONFIG.REFRESH_TOKEN_KEY);
        const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });
        localStorage.setItem(API_CONFIG.ACCESS_TOKEN_KEY, response.data.accessToken);
        api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(API_CONFIG.ACCESS_TOKEN_KEY);
        localStorage.removeItem(API_CONFIG.REFRESH_TOKEN_KEY);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: RegisterPayload) =>
    api.post("/auth/register", data),

  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  requestReset: (email: string) =>
    api.post("/auth/request-reset", { email }),

  verifyOtp: (email: string, otp: string, newPassword: string) =>
    api.post("/auth/verify-otp", { email, otp, newPassword }),

  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh-token", { refreshToken }),
};

export const profileAPI = {
  getProfile: () =>
    api.get("/profile/get-profile"),

  updateProfile: (data: { username?: string; phone?: string; address?: string }) =>
    api.put("/profile/update", data),

  requestChangePasswordOtp: () =>
    api.post("/profile/change-password/request-otp", {}),

  changePassword: (otp: string, newPassword: string) =>
    api.post("/profile/change-password/verify-otp", { otp, newPassword }),

  requestChangeEmailOtp: () =>
    api.post("/profile/change-email/request-old-otp", {}),

  verifyCurrentEmailOtp: (otp: string) =>
    api.post("/profile/change-email/verify-old-otp", { otp }),

  requestNewEmailOtp: (newEmail: string) =>
    api.post("/profile/change-email/request-new-otp", { newEmail }),

  changeEmail: (otp: string) =>
    api.post("/profile/change-email/verify-new-otp", { otp }),

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.post("/profile/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getAvatar: () =>
    api.get("/profile/avatar"),
};

export const userAPI = {
  getAllUsers: () =>
    api.get("/users/"),

  getUserById: (id: string) =>
    api.get(`/users/${id}`),

  createUser: (data: { username: string; email: string; password: string; phone?: string; address?: string }) =>
    api.post("/users/", data),

  updateUser: (id: string, data: { username?: string; email?: string; phone?: string; address?: string }) =>
    api.put(`/users/${id}`, data),

  deleteUser: (id: string) =>
    api.delete(`/users/${id}`),
};

export default api;
