import axios from "axios";
import { RegisterFormData } from "@/lib/validations/auth";
import { ENDPOINTS, getDefaultHeaders } from "@/config/endpoints";

// Types matching your actual API responses
export interface RegisterResponse {
  id: number;
  email: string;
  organizationId: number | null;
  role: string | null;
  verified: boolean;
  createdAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

export interface LoginResponse {
  id: number;
  email: string;
  verified: boolean;
  role: string | null;
  organizationDetails: any | null;
}

export interface OtpVerifyResponse {
  id: number;
  email: string;
  role: string | null;
  verified: boolean;
}

export interface ResendOtpResponse {
  message: string;
}

export interface UserProfile {
  id: number;
  email: string;
  verified: boolean;
  role: string | null;
  organizationDetails: any | null;
}

// Error response type
export interface ApiErrorResponse {
  error: string;
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: getDefaultHeaders(),
  timeout: 10000, // 10 seconds
  withCredentials: true, // Important: This includes cookies in requests
});

// Add request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      "API Request:",
      config.method?.toUpperCase(),
      config.url,
      config.data
    );
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging (optional)
apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error(
      "API Response Error:",
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

// Registration API function
export const registerUser = async (
  data: RegisterFormData
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>(
      ENDPOINTS.AUTH.REGISTER,
      {
        email: data.email,
        password: data.password,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "Registration failed";
      throw new Error(errorMessage);
    }
    console.error("Registration error:", error);
    throw error;
  }
};

// Login API function
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "Login failed";
      throw new Error(errorMessage);
    }
    console.error("Login error:", error);
    throw error;
  }
};

// OTP Verification API function
export const verifyOtp = async (
  email: string,
  otp: string
): Promise<OtpVerifyResponse> => {
  try {
    const response = await apiClient.post<OtpVerifyResponse>(
      ENDPOINTS.AUTH.VERIFY_OTP,
      {
        email,
        otp,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "OTP verification failed";
      throw new Error(errorMessage);
    }
    console.error("OTP verification error:", error);
    throw error;
  }
};

// Resend OTP API function
export const resendOtp = async (email: string): Promise<ResendOtpResponse> => {
  try {
    const response = await apiClient.post<ResendOtpResponse>(
      ENDPOINTS.AUTH.RESEND_OTP,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "Resend OTP failed";
      throw new Error(errorMessage);
    }
    console.error("Resend OTP error:", error);
    throw error;
  }
};

// Authentication utility functions
export const getAccessToken = (): string | null => {
  // Since the cookie is HttpOnly, we can't access it directly from JavaScript
  // We'll need to make an API call to get the current user or check auth status
  return null;
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    // Make a request to check if user is authenticated
    // This will automatically include the HttpOnly cookie
    const response = await fetch("/api/auth", {
      credentials: "include", // Include cookies
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint to clear the cookie
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
};
