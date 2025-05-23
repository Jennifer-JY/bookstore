"use client";

import { useCart } from "@/app/contextAndProvider/cartContext";
import { BookData, ItemInCart } from "@/app/lib/types";
import { useParams } from "next/navigation";

const DEFAULT_ADD_QUANTITY_AFTER_CLICKING_BUTTON = 1;

type Params = {
  book_id: string;
};

export default function BookPage() {
  const { book_id } = useParams<Params>();
  const { itemsInCart, addItemToCart } = useCart();

  const handleAddToCart = async () => {
    console.log("Add to cart");
    const res = await fetch(`/api/books/${book_id}`);
    if (!res.ok) {
      console.error("Failed to fetch book");
      return;
    }
    const data: BookData = await res.json();
    const itemToAdd: ItemInCart = {
      book_id: book_id,
      title: data.title,
      author: data.author,
      quantity: DEFAULT_ADD_QUANTITY_AFTER_CLICKING_BUTTON,
      price: data.price,
      stripe_price_id: data.stripe_price_id,
    };
    addItemToCart(itemToAdd);
  };
  console.log(itemsInCart);

  return (
    <div>
      <div>Book</div>
      <button className="border-2" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}
