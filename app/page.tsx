import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 flex flex-col items-center">
      <div className="w-full sm:w-5/6 flex flex-row items-center gap-2 border-2 border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
        <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
        <input
          className="w-full outline-none bg-transparent"
          type="text"
          placeholder="Search"
        />
      </div>

      <nav className="w-1/2 mt-4 flex flex-col sm:justify-around sm:flex-row">
        <Link href={"/"} className="mx-auto hover:underline">
          Fiction
        </Link>
        <Link href={"/"} className="mx-auto hover:underline">
          Non-fiction
        </Link>
        <Link href={"/"} className="mx-auto hover:underline">
          Shop All
        </Link>
      </nav>
    </div>
  );
}
