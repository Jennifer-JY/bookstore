import { fetchBooksGivenTerm } from "@/app/lib/data";
import Image from "next/image";

export default async function Result({
  query,
  currentPage,
}: {
  query?: string;
  currentPage?: string;
}) {
  const books = await fetchBooksGivenTerm(query || null);
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
              <div>{b.stock < 3 && `Limited stock: ${b.stock}`}</div>
            </div>
          );
        })}
      </div>
      <div>
        <Pagenation />
      </div>
    </div>
  );
}

function Pagenation() {
  return <div>page: 1</div>;
}
