"use client";

import { useCart } from "@/app/contextAndProvider/cartContext";
import { BookData, ItemInCart } from "@/app/lib/types";
import { useParams } from "next/navigation";

type Params = {
  book_id: string;
};
const DEFAULT_ADD_QUANTITY_AFTER_CLICKING_BUTTON = 1;

export default function AddBookToCartBtn({
  bookDetail,
}: {
  bookDetail: BookData | null;
}) {
  const { book_id } = useParams<Params>();
  const { addItemToCart } = useCart();
  const handleAddToCart = async () => {
    if (!bookDetail) return;
    const itemToAdd: ItemInCart = {
      book_id: book_id,
      title: bookDetail.title,
      author: bookDetail.author,
      quantity: DEFAULT_ADD_QUANTITY_AFTER_CLICKING_BUTTON,
      price: bookDetail.price,
    };
    addItemToCart(itemToAdd);
  };
  return (
    <>
      {bookDetail && (
        <button className="p-3 border-2 mt-3" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </>
  );
}
