import Image from "next/image";
import { getBookById } from "@/app/lib/data";
import AddBookToCartBtn from "@/components/books/AddToCarBtn";

type Params = {
  book_id: string;
};

export default async function BookPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const book_id = resolvedParams.book_id;
  const bookDetail = await getBookById(book_id);

  return (
    <div className="flex flex-row m-4 gap-4">
      {book_id && (
        <Image
          width={155}
          height={225}
          alt="bookcover display"
          src={`/bookCovers/${book_id}.png`}
          className="object-cover"
        />
      )}
      <div>
        <h3 className="font-bold">{bookDetail?.title}</h3>
        <div>by {bookDetail?.author}</div>
        <div className="">
          Published date:{" "}
          {bookDetail
            ? new Date(bookDetail?.published_date).toLocaleDateString("en-AU", {
                year: "numeric",
                month: "2-digit",
              })
            : ""}
        </div>
        <hr className="mt-4 mr-4 mb-4 border-t border-gray-200"></hr>
        <h4>Introduction</h4>
        <p>{bookDetail?.introduction}</p>
        <hr className="mt-4 mr-4 mb-4 border-t border-gray-200"></hr>
        <AddBookToCartBtn bookDetail={bookDetail} />
      </div>
    </div>
  );
}
