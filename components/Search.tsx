"use client";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onTopBar = pathname !== "/";

  const [term, setTerm] = useState("");

  // Fill in the search input bar with the existing query string
  useEffect(() => {
    if (pathname === "/books") {
      const query = searchParams.get("query");
      if (query) {
        setTerm(query);
      }
    }
  }, [pathname, searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term.trim()) {
      router.push(`/books?query=${term}`);
    } else {
      router.push(`/books`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
}
