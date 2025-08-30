import { BookData } from "@/app/lib/types";
import AddBookToCartBtn from "./AddToCarBtn";

export function PriceCard({ bookDetail }: { bookDetail: BookData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-3xl font-bold text-gray-900 tracking-tight">
        ${bookDetail.price}
      </p>

      <div className="w-12 border-b border-gray-200"></div>

      <AddBookToCartBtn bookDetail={bookDetail} />
    </div>
  );
}
