import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: string;
  image?: string;
  color: string;
  quantity: number;
  thc: string;
  flowering: string;
  genotype: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface CheckoutState {
  step: 1 | 2;
  customerInfo: CustomerInfo;
  isSubmitting: boolean;
  orderPlaced: boolean;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  checkout: CheckoutState;

  // Cart Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Checkout Actions
  setCheckoutStep: (step: 1 | 2) => void;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  completeOrder: () => void;
  resetCheckout: () => void;

  // Computed values
  getItemQuantity: (id: string) => number;
  isItemInCart: (id: string) => boolean;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isOpen: false,
      checkout: {
        step: 1,
        customerInfo: {
          fullName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          postalCode: '',
          notes: '',
        },
        isSubmitting: false,
        orderPlaced: false,
      },

      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === newItem.id);

        if (existingItem) {
          // If item exists, increase quantity
          set((state) => ({
            items: state.items.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          // If item doesn't exist, add it with quantity 1
          set((state) => ({
            items: [...state.items, { ...newItem, quantity: 1 }],
          }));
        }

        // Update totals
        const updatedState = get();
        const totalItems = updatedState.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({ totalItems, totalPrice });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
        }));

        // Update totals
        const updatedState = get();
        const totalItems = updatedState.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({ totalItems, totalPrice });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.id === id
              ? { ...item, quantity }
              : item
          ),
        }));

        // Update totals
        const updatedState = get();
        const totalItems = updatedState.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({ totalItems, totalPrice });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getItemQuantity: (id) => {
        const item = get().items.find(item => item.id === id);
        return item ? item.quantity : 0;
      },

      isItemInCart: (id) => {
        return get().items.some(item => item.id === id);
      },

      // Checkout Actions
      setCheckoutStep: (step) => {
        set((state) => ({
          checkout: { ...state.checkout, step }
        }));
      },

      updateCustomerInfo: (info) => {
        set((state) => ({
          checkout: {
            ...state.checkout,
            customerInfo: { ...state.checkout.customerInfo, ...info }
          }
        }));
      },

      setSubmitting: (isSubmitting) => {
        set((state) => ({
          checkout: { ...state.checkout, isSubmitting }
        }));
      },

      completeOrder: () => {
        set((state) => ({
          checkout: { ...state.checkout, orderPlaced: true, isSubmitting: false },
          items: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },

      resetCheckout: () => {
        set(() => ({
          checkout: {
            step: 1,
            customerInfo: {
              fullName: '',
              email: '',
              phone: '',
              address: '',
              city: '',
              postalCode: '',
              notes: '',
            },
            isSubmitting: false,
            orderPlaced: false,
          }
        }));
      },
    }),
    {
      name: 'chex-seeds-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);

export default useCartStore;