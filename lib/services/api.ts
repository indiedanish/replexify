import axios from "axios";
import { buildApiUrl, getDefaultHeaders } from "@/config/endpoints";

// Create axios instance with default config - Now with credentials enabled
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: getDefaultHeaders(),
  timeout: 10000, // 10 seconds
  withCredentials: true, // Now enabled since backend CORS is configured
});

// Generic API service class
export class ApiService {
  private client = apiClient;

  // Generic methods for all endpoints
  async get<T>(endpoint: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(endpoint, config);
    return response.data;
  }

  async post<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, config);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<T>(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(endpoint, config);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.patch<T>(endpoint, data, config);
    return response.data;
  }
}

// Create a default instance
export const apiService = new ApiService();
