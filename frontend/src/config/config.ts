/**
 * Environment Configuration
 * Lưu các biến môi trường và config chính
 */

export const API_CONFIG = {
  // API Base URL
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // Timeout for API requests (ms)
  TIMEOUT: 30000,
  
  // Token keys in localStorage
  ACCESS_TOKEN_KEY: 'accessToken',
  REFRESH_TOKEN_KEY: 'refreshToken',
  REMEMBER_EMAIL_KEY: 'rememberEmail',
};

// App config
export const APP_CONFIG = {
  APP_NAME: 'SmartParking',
  APP_VERSION: '1.0.0',
  
  // Routes
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgot-password',
    REGISTER: '/register',
  },
};

// Feature flags
export const FEATURES = {
  ENABLE_2FA: false,
  ENABLE_REGISTRATION: true,
  ENABLE_FORGOT_PASSWORD: false,
};
