import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import { useCartStore } from '@/stores/cart-store';
import { useMergeCart } from './use-cart';
import type { LoginInput, RegisterInput, UpdateProfileInput, ChangePasswordInput } from '@/types';

/**
 * Hook to get current user profile
 */
export function useProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await authApi.getProfile();
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to login
 */
export function useLogin() {
  const { setAuth } = useAuthStore();
  const mergeCart = useMergeCart();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: async (response) => {
      const { token, user } = response.data;
      setAuth(user, token);

      // Try to merge guest cart
      const sessionId = typeof window !== 'undefined' ? localStorage.getItem('sessionId') : null;
      if (sessionId) {
        try {
          await mergeCart.mutateAsync(sessionId);
          // Clear guest session after merge
          localStorage.removeItem('sessionId');
        } catch {
          // Ignore merge errors
        }
      }

      // Invalidate cart query to refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

/**
 * Hook to register
 */
export function useRegister() {
  const { setAuth } = useAuthStore();
  const mergeCart = useMergeCart();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: async (response) => {
      const { token, user } = response.data;
      setAuth(user, token);

      // Try to merge guest cart
      const sessionId = typeof window !== 'undefined' ? localStorage.getItem('sessionId') : null;
      if (sessionId) {
        try {
          await mergeCart.mutateAsync(sessionId);
          localStorage.removeItem('sessionId');
        } catch {
          // Ignore merge errors
        }
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

/**
 * Hook to logout
 */
export function useLogout() {
  const { logout } = useAuthStore();
  const { clearCart } = useCartStore();
  const queryClient = useQueryClient();

  return () => {
    logout();
    clearCart();
    queryClient.clear();
  };
}

/**
 * Hook to update profile
 */
export function useUpdateProfile() {
  const { updateUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => authApi.updateProfile(data),
    onSuccess: (response) => {
      updateUser(response.data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

/**
 * Hook to change password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => authApi.changePassword(data),
  });
}
