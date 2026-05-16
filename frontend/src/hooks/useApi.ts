import { useState } from "react";
import { authAPI, profileAPI, userAPI, type RegisterPayload } from "@/services/api";
import type { AxiosError } from "axios";
import { API_CONFIG } from "@/config/config";

// ==================== AUTH HOOKS ====================

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem(API_CONFIG.ACCESS_TOKEN_KEY, response.data.accessToken);
      localStorage.setItem(API_CONFIG.REFRESH_TOKEN_KEY, response.data.refreshToken);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Register failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

// ==================== PROFILE HOOKS ====================

export const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileAPI.getProfile();
      setProfile(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Get profile failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    username?: string,
    phone?: string,
    address?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileAPI.updateProfile({
        username,
        phone,
        address,
      });
      setProfile(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Update profile failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { profile, getProfile, updateProfile, loading, error };
};

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileAPI.requestChangePasswordOtp();
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Request OTP failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndChange = async (otp: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileAPI.changePassword(otp, newPassword);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Change password failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { requestOtp, verifyOtpAndChange, loading, error };
};

export const useUploadAvatar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileAPI.uploadAvatar(file);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Upload avatar failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadAvatar, loading, error };
};

// ==================== USER HOOKS (ADMIN ONLY) ====================

export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Get users failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.getUserById(userId);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Get user failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (
    username: string,
    email: string,
    password: string,
    phone?: string,
    address?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.createUser({
        username,
        email,
        password,
        phone,
        address
      });
      setUsers([...users, response.data]);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Create user failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    userId: string,
    username?: string,
    email?: string,
    phone?: string,
    address?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.updateUser(userId, {
        username,
        email,
        phone,
        address
      });
      setUsers(
        users.map((u) => (u._id === userId ? response.data : u))
      );
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Update user failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await userAPI.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        (axiosError.response?.data as any)?.message ||
        "Delete user failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { users, getAllUsers, getUserById, createUser, updateUser, deleteUser, loading, error };
};
