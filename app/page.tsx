import Search from "@/components/Search";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="mb-5 sm:mb-20 p-4 flex flex-col items-center">
      <div>
        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Bookdrop
        </div>
        <div className="text-base sm:text-lg text-gray-600 italic text-center mt-1">
          - Bright books for curious minds -
        </div>
      </div>

      <Suspense>
        <Search />
      </Suspense>

      <nav className="w-1/2 mt-10 flex flex-col sm:justify-around sm:flex-row">
        <Link
          href={"/books?query=fiction"}
          className="mx-auto hover:underline font-semibold"
        >
          Fiction
        </Link>
        <Link
          href={"/books?query=non-fiction"}
          className="mx-auto hover:underline font-semibold"
        >
          Non-fiction
        </Link>
        <Link href={"/books"} className="mx-auto hover:underline font-semibold">
          Shop All
        </Link>
      </nav>
    </div>
  );
}
