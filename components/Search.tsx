"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Search() {
  const pathname = usePathname();
  const onTopBar = pathname !== "/";
  return (
    <div
      className={clsx(
        "w-full flex flex-row items-center gap-2 border-2 border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500",
        {
          "sm:w-3/5 mt-5": !onTopBar,
        }
      )}
    >
      <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
      <input
        className="w-full outline-none bg-transparent"
        type="text"
        placeholder="Search book titles, authors"
      />
    </div>
  );
}
