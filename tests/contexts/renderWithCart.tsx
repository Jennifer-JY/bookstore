import { ReactNode } from "react";
import { render } from "@testing-library/react";
import {
  CartContextType,
  CartContext,
} from "@/app/contextAndProvider/cartContext";

export function renderWithCart(
  ui: ReactNode,
  value: Partial<CartContextType> = {}
) {
  const defaults: CartContextType = {
    session: null,
    cartId: "",
    itemsInCart: [],
    addItemToCart: () => {},
  };
  return render(
    <CartContext value={{ ...defaults, ...value }}>{ui}</CartContext>
  );
}
