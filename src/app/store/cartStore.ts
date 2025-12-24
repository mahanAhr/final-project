import { create } from "zustand";
import { persist } from "zustand/middleware";


type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find(
          (item) => item.id === product.id
        );

        if (existing) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          });
        }
      },

      increaseQty: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        }),

      decreaseQty: (id) =>
        set({
          cart: get().cart
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter(
            (item) => item.id !== id
          ),
        }),
    }),
    {
      name: "cart-storage", 
    }
  )
);
