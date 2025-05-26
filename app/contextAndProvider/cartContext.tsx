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

  console.log(itemsInCart);
  const addItemToCart = (item: ItemInCart) => {
    let updatedItems;
    const existing = itemsInCart.find((i) => i.book_id === item.book_id);
    if (existing) {
      // Update the quantity and remove the item if quantity becomes 0
      updatedItems = itemsInCart
        .map((i) =>
          i.book_id === item.book_id
            ? { ...i, quantity: Number(i.quantity) + Number(item.quantity) }
            : i
        )
        .filter((i) => i.quantity > 0);
    } else {
      if (item.quantity > 0) {
        updatedItems = [...itemsInCart, item];
      } else {
        updatedItems = [...itemsInCart];
      }
    }

    setItemsInCart(updatedItems);
    console.log(updatedItems);
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemsInCart: updatedItems,
        cartId: cartId,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data: Cart) => {
        if (!cartId) setCartId(data.cartId || "");
      })
      .catch((error) => console.error("Error:", error));
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
