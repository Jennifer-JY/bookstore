"use client";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagenation({ pages = 1 }: { pages?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  // Get the current page number
  const searchParams = useSearchParams();
  const rawPage = searchParams.get("page") || 1;
  const pageNum = Number(rawPage);
  const currentPage = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;

  const routerPushWithParams = (newPageNum: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPageNum);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };
  const handleClickPage = (selectedPageNum: number) => {
    routerPushWithParams(selectedPageNum.toString());
  };
  const handleClickPreviousPage = () => {
    routerPushWithParams((pageNum - 1).toString());
  };
  const handleClickNextPage = () => {
    routerPushWithParams((pageNum + 1).toString());
  };

  const pageNumbers = showPageNums(currentPage, pages);

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center items-center mt-4 m-4"
    >
      <button
        disabled={currentPage === 1}
        onClick={handleClickPreviousPage}
        className={clsx(
          "shadow-md px-3 py-1 transition-colors rounded-l-lg sm:w-24",
          {
            " hover:bg-gray-200 active:bg-gray-300 text-black": currentPage > 1,
            " text-gray-400": currentPage === 1,
          }
        )}
      >
        <div className="flex flex-row gap-1 items-center justify-center">
          <i className="fa-solid fa-arrow-left"></i>
          <span className="hidden sm:block">Previous</span>
        </div>
      </button>

      {pageNumbers.map((num, index) => {
        if (typeof num === "number") {
          return (
            <button
              key={index + num}
              disabled={currentPage === num}
              className={clsx("shadow-md px-3 py-1 transition-colors", {
                " text-gray-300 cursor-default border-2 border-solid":
                  num === currentPage,
                "hover:bg-gray-200 active:bg-gray-300": num !== currentPage,
                "text-gray-500": currentPage === num,
              })}
              onClick={() => handleClickPage(num)}
            >
              {num}
            </button>
          );
        } else {
          return (
            <span key={index + num} className="shadow-md px-3 py-1">
              {num}
            </span>
          );
        }
      })}

      <button
        disabled={currentPage === pages}
        onClick={handleClickNextPage}
        className={clsx(
          "shadow-md px-3 py-1 sm:w-24 transition-colors rounded-r-lg",
          {
            "  hover:bg-gray-200 active:bg-gray-300 text-black":
              currentPage < pages,
            " text-gray-400": currentPage === pages,
          }
        )}
      >
        <div className="flex flex-row gap-1 items-center justify-center">
          <span className="hidden sm:block">Next</span>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </button>
    </nav>
  );
}

// Show at least 2 page before and after, if not edge numbers
// And ... represents at least 2 pages
// Show the first and last page numbers always
function showPageNums(curPage: number, totalPage: number) {
  const pages: (number | string)[] = [];
  // Front
  if (curPage - 1 > 0) {
    pages.push(curPage - 1);
    if (curPage - 2 > 0) {
      pages.unshift(curPage - 2);
    }
    if (curPage >= 6) {
      pages.unshift(1, "...");
    } else {
      for (let i = curPage - 3; i > 0; i--) {
        pages.unshift(i);
      }
    }
  }

  // Itself
  pages.push(curPage);

  // Back
  if (totalPage - curPage > 0) {
    // push the next page
    pages.push(curPage + 1);
    if (totalPage - curPage > 1) {
      pages.push(curPage + 2);
    }
    // push the pages afterwards
    if (curPage + 4 < totalPage) {
      pages.push("...", totalPage);
    } else {
      for (let i = curPage + 3; i <= totalPage; i++) {
        pages.push(i);
      }
    }
  }

  return pages;
}
