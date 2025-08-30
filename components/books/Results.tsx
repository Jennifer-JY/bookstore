import { fetchBooksGivenTerm, fetchTotalNumItemsFound } from "@/app/lib/data";
import Pagenation from "./Pagination";
import Link from "next/link";
import { Image } from "@imagekit/next";

const PAGE_SIZE = 10;

export default async function Result({
  query,
  page = 1,
}: {
  query?: string;
  page?: number | string;
}) {
  const pageNum = Number(page);
  const currentPage = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;

  const books = await fetchBooksGivenTerm(
    query || null,
    currentPage,
    PAGE_SIZE
  );

  const totalNumItems = await fetchTotalNumItemsFound(query || null);
  const pages = Math.ceil(totalNumItems / PAGE_SIZE);

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">
        Results: {`${totalNumItems} items found`}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((b) => {
          return (
            <div key={b.id}>
              <Link href={`/books/${b.id}`}>
                <Image
                  urlEndpoint="https://ik.imagekit.io/iqam99dxz"
                  src={`/${b.id}.png`}
                  width={1410}
                  height={2250}
                  alt={`book ${b.title} by ${b.author} book cover`}
                  loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
                />
              </Link>
              <Link href={`/books/${b.id}`}>
                <div>Title: {b.title}</div>
              </Link>
              <div>by: {b.author}</div>
              <div className="text-blue-500 font-bold">＄{b.price}</div>
              <div>
                {b.stock === 0
                  ? "Sold out"
                  : b.stock < 3
                  ? `Limited stock: ${b.stock}`
                  : null}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Pagenation pages={pages} />
      </div>
    </div>
  );
}
