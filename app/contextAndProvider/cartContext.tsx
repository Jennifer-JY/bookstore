"use client";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import { Cart, ItemInCart } from "../lib/types";
import { Session } from "next-auth";

type CartContextType = {
  session: Session | null;
  cartId: string;
  itemsInCart: ItemInCart[];
  addItemToCart: (item: ItemInCart) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([]);
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    if (session !== null) {
      fetch("/api/cart")
        .then((res) => res.json())
        .then((data: Cart) => {
          setItemsInCart(data.itemsInCart || []);
          setCartId(data.cartId || "");
        });
    } else {
      setItemsInCart([]);
    }
  }, [session]);

  const addItemToCart = (item: ItemInCart) => {
    // TODO: Set cartId when there's no cart recorded
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
    <CartContext value={{ session, cartId, itemsInCart, addItemToCart }}>
      {children}
    </CartContext>
  );
}

// Hook to use context
export function useCart() {
  const context = use(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartContextProvider");
  return context;
}
