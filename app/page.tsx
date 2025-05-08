import Search from "@/components/Search";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mb-5 sm:mb-20 p-4 flex flex-col items-center">
      <div>
        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Brightbond
        </div>
        <div className="text-base sm:text-lg text-gray-600 italic text-center mt-1">
          - Bright books for curious minds -
        </div>
      </div>
      <Search />
      <nav className="w-1/2 mt-4 flex flex-col sm:justify-around sm:flex-row">
        <Link href={"/"} className="mx-auto hover:underline font-semibold">
          Fiction
        </Link>
        <Link href={"/"} className="mx-auto hover:underline font-semibold">
          Non-fiction
        </Link>
        <Link href={"/"} className="mx-auto hover:underline font-semibold">
          Shop All
        </Link>
      </nav>
    </div>
  );
}
