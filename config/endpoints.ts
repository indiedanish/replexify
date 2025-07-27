// API Base URL configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Environment configuration
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

// API Endpoints
export const ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
  },
  OTP: {
    VERIFY: "/otp/verifyOtp",
    RESEND: "/otp/resendOtp",
  },
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

// Default headers for API requests
export const getDefaultHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});
