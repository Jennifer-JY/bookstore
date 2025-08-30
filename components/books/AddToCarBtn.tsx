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
        <button
          className="hover:cursor-pointer w-fit bg-[#21B6A8] hover:bg-[#116530] text-white font-medium py-2.5 px-4 rounded transition-colors"
          title="Add to cart"
          aria-label="add-to-cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </>
  );
}
