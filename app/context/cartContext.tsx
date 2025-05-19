"use client";
import { createContext, ReactNode, use, useState } from "react";
import { ItemInCart } from "../lib/types";

type CartContextType = {
  itemsInCart: ItemInCart[];
  addItemToCart: (item: ItemInCart) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // TODO: fetch the default items in cart from the database for each user
  const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([]);

  const addItemToCart = (item: ItemInCart) => {
    setItemsInCart((prev) => {
      const existing = prev.find((i) => i.book_id === item.book_id);
      if (existing) {
        return prev.map((i) =>
          i.book_id === item.book_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };
  return (
    <CartContext value={{ itemsInCart, addItemToCart }}>{children}</CartContext>
  );
}

// Hook to use context
export function useCart() {
  const context = use(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartContextProvider");
  return context;
}
