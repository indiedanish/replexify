import axios from "axios";
import { RegisterFormData } from "@/lib/validations/auth";
import { ENDPOINTS, getDefaultHeaders } from "@/config/endpoints";
import { ProtectedRoute } from "@/components/auth/protected-route";

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

// Create axios instance with default config - Now with credentials enabled
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: getDefaultHeaders(),
  timeout: 10000, // 10 seconds
  withCredentials: true, // Now enabled since backend CORS is configured
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

// OTP verification API function
export const verifyOtp = async (
  email: string,
  code: string
): Promise<OtpVerifyResponse> => {
  try {
    const response = await apiClient.post<OtpVerifyResponse>(
      ENDPOINTS.OTP.VERIFY,
      {
        email,
        code,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      throw new Error(
        errorResponse?.error || error.message || "OTP verification failed"
      );
    }
    throw error;
  }
};

// Resend OTP API function
export const resendOtp = async (email: string): Promise<ResendOtpResponse> => {
  try {
    const response = await apiClient.post<ResendOtpResponse>(
      ENDPOINTS.OTP.RESEND,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      throw new Error(
        errorResponse?.error || error.message || "Failed to resend OTP"
      );
    }
    throw error;
  }
};

// Get current user profile - Uses the access token cookie
export const getCurrentUser = async (): Promise<UserProfile | null> => {
  try {
    const response = await apiClient.get<UserProfile>("/auth");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // User is not authenticated
      return null;
    }
    console.error("Get current user error:", error);
    return null;
  }
};

// Logout function
export const logoutUser = async (): Promise<void> => {
  try {
    await apiClient.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
