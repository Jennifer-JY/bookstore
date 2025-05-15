import { fetchBooksGivenTerm, fetchTotalNumItemsFound } from "@/app/lib/data";
import Image from "next/image";
import Pagenation from "./Pagination";

const PAGE_SIZE = 1;

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
  const pages = Math.ceil(
    (await fetchTotalNumItemsFound(query || null)) / PAGE_SIZE
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((b) => {
          return (
            <div key={b.id}>
              <Image
                width={1410}
                height={2250}
                alt={`book ${b.title} by ${b.author} book cover`}
                src={`/bookCovers/${b.id}.png`}
              ></Image>
              <div>Title: {b.title}</div>
              <div>by: {b.author}</div>
              <div>＄{b.price}</div>
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
