import axios from "axios";
import { apiService } from "./api";

// Types for the context upload API
export interface UploadContextRequest {
  files?: File[];
  contextName: string;
  text?: string;
}

export interface UploadContextResponse {
  id: string;
  contextName: string;
  status: string;
  createdAt: string;
  fileCount?: number;
  textLength?: number;
}

export interface ContextItem {
  id: string;
  contextName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  fileCount?: number;
  textLength?: number;
}

export interface GetContextsResponse {
  contexts: ContextItem[];
  total: number;
  page: number;
  limit: number;
}

export interface DeleteContextResponse {
  message: string;
}

// Error response type
export interface ApiErrorResponse {
  error: string;
}

// Upload context documents (files) or create context with text
export const uploadContext = async (
  data: UploadContextRequest
): Promise<UploadContextResponse> => {
  try {
    const formData = new FormData();

    // Add context name
    formData.append("contextName", data.contextName);

    // Add files if provided
    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    // Add text if provided
    if (data.text) {
      formData.append("text", data.text);
    }

    const response = await apiService.post<UploadContextResponse>(
      "/context/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "Context upload failed";
      throw new Error(errorMessage);
    }
    console.error("Context upload error:", error);
    throw error;
  }
};

// Get all contexts (if this endpoint exists)
export const getContexts = async (
  page: number = 1,
  limit: number = 10
): Promise<GetContextsResponse> => {
  try {
    const response = await apiService.get<GetContextsResponse>(
      `/context?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "Failed to fetch contexts";
      throw new Error(errorMessage);
    }
    console.error("Get contexts error:", error);
    throw error;
  }
};

// Get a specific context by ID (if this endpoint exists)
export const getContextById = async (
  contextId: string
): Promise<ContextItem> => {
  try {
    const response = await apiService.get<ContextItem>(`/context/${contextId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "Failed to fetch context";
      throw new Error(errorMessage);
    }
    console.error("Get context error:", error);
    throw error;
  }
};

// Delete a context (if this endpoint exists)
export const deleteContext = async (
  contextId: string
): Promise<DeleteContextResponse> => {
  try {
    const response = await apiService.delete<DeleteContextResponse>(
      `/context/${contextId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "Failed to delete context";
      throw new Error(errorMessage);
    }
    console.error("Delete context error:", error);
    throw error;
  }
};

// Update context (if this endpoint exists)
export const updateContext = async (
  contextId: string,
  data: Partial<UploadContextRequest>
): Promise<ContextItem> => {
  try {
    const response = await apiService.put<ContextItem>(
      `/context/${contextId}`,
      data
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "Failed to update context";
      throw new Error(errorMessage);
    }
    console.error("Update context error:", error);
    throw error;
  }
};
