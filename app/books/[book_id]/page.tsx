"use client";
import Image from "next/image";
import { useCart } from "@/app/contextAndProvider/cartContext";
import { BookData, ItemInCart } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEFAULT_ADD_QUANTITY_AFTER_CLICKING_BUTTON = 1;

type Params = {
  book_id: string;
};

export default function BookPage() {
  const { book_id } = useParams<Params>();
  const { itemsInCart, addItemToCart } = useCart();
  const [bookDetail, setBookDetail] = useState<BookData | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/books/${book_id}`);
      if (!res.ok) {
        console.error("Failed to fetch book");
        return;
      }
      const data: BookData = await res.json();
      setBookDetail(data);
    };

    fetchBook();
  }, [book_id]);

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
  console.log(itemsInCart);

  return (
    <div className="flex flex-row m-4 gap-4">
      {book_id && (
        <Image
          width={141}
          height={225}
          alt="bookcover display"
          src={`/bookCovers/${book_id}.png`}
        />
      )}
      <div>
        <h3 className="font-bold">{bookDetail?.title}</h3>
        <div>by {bookDetail?.author}</div>
        <div className="">
          Published date: {bookDetail?.published_date.toString()}
        </div>
        <hr className="mt-4 mr-4 mb-4 border-t border-gray-200"></hr>
        <h4>Introduction</h4>
        <p>{bookDetail?.introduction}</p>
        <hr className="mt-4 mr-4 mb-4 border-t border-gray-200"></hr>
        <button className="p-3 border-2 mt-3" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
