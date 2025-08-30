import { getBookById } from "@/app/lib/data";
import { PriceCard } from "@/components/books/PriceCard";
import { ProductInfoTab } from "@/components/books/ProductInfoTab";
import { Image } from "@imagekit/next";

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
    <div className="p-12">
      <section className="flex flex-col md:flex-row gap-10 justify-center items-center md:items-start">
        <div className="border-r-2 border-gray-300 pr-12">
          {book_id && (
            <Image
              urlEndpoint="https://ik.imagekit.io/iqam99dxz"
              src={`/${book_id}.png`}
              width={310}
              height={450}
              alt="book cover display"
              loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
              className="w-full max-w-[310px] sm:max-w-[260px] lg:max-w-[310px] h-auto object-cover"
            />
          )}
        </div>

        <div className="flex-1 flex gap-y-6 flex-col">
          <h3 className="font-bold text-3xl">{bookDetail?.title}</h3>
          <div className="text-2xl">By: {bookDetail?.author}</div>
          <div className="">
            Published date:{" "}
            {bookDetail
              ? new Date(bookDetail?.published_date).toLocaleDateString(
                  "en-AU",
                  {
                    year: "numeric",
                    month: "2-digit",
                  }
                )
              : ""}
          </div>
          {bookDetail && (
            <div className="flex-1">
              <PriceCard bookDetail={bookDetail} />
            </div>
          )}
        </div>
      </section>

      {bookDetail && <ProductInfoTab bookDetail={bookDetail} />}
    </div>
  );
}
