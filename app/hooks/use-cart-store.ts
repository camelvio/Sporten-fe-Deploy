import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  imgUrl: string;
}

export interface CustomerInfo {
  customerName: string;
  customerContact: number | null;
  customerAddress: string;
}

interface CartStore {
  customerInfo: CustomerInfo | null;
  items: CartItem[]; // <-- INI YANG BIKIN EROR KALAU LUPA DITULIS!
  setCustomerInfo: (info: CustomerInfo) => void;
  addItem: (product: any, qty?: number) => void;
  removeItem: (productId: string) => void;
  reset: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      customerInfo: null,
      items: [], // Initial state
      setCustomerInfo: (info) => {
        set({ customerInfo: info });
      },
      addItem: (product, qty = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item._id === product._id ? { ...item, qty: item.qty + qty } : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, qty }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item._id !== productId) });
      },
      reset: () => {
        set({ items: [], customerInfo: null });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);