import { create } from 'zustand';
import type { Cart, CartItem } from '@/types';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isOpen: boolean;
}

interface CartActions {
  setCart: (cart: Cart | null) => void;
  setLoading: (loading: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearCart: () => void;
}

interface CartComputedActions {
  getItemCount: () => number;
  getSubtotal: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

type CartStore = CartState & CartActions & CartComputedActions;

export const useCartStore = create<CartStore>()((set, get) => ({
  // State
  cart: null,
  isLoading: false,
  isOpen: false,

  // Actions
  setCart: (cart) => set({ cart }),
  setLoading: (loading) => set({ isLoading: loading }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ cart: null }),

  // Computed
  getItemCount: () => {
    const { cart } = get();
    return cart?.itemCount ?? 0;
  },

  getSubtotal: () => {
    const { cart } = get();
    return cart ? parseFloat(cart.subtotal) : 0;
  },

  getItem: (productId: string) => {
    const { cart } = get();
    return cart?.items.find((item) => item.productId === productId);
  },
}));
