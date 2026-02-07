import { apiClient } from './client';
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
  UserProfile,
  ApiResponse,
  UpdateProfileInput,
  ChangePasswordInput,
} from '@/types';

export const authApi = {
  /**
   * Register a new user
   */
  register: (data: RegisterInput) =>
    apiClient.post<AuthResponse>('/api/auth/register', data),

  /**
   * Login user
   */
  login: (data: LoginInput) =>
    apiClient.post<AuthResponse>('/api/auth/login', data),

  /**
   * Get current user profile
   */
  getProfile: () =>
    apiClient.get<ApiResponse<UserProfile>>('/api/auth/me'),

  /**
   * Update current user profile
   */
  updateProfile: (data: UpdateProfileInput) =>
    apiClient.put<ApiResponse<UserProfile>>('/api/auth/me', data),

  /**
   * Change password
   */
  changePassword: (data: ChangePasswordInput) =>
    apiClient.put<{ message: string }>('/api/auth/password', data),
};
