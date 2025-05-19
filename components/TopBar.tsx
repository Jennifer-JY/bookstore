"use client";
import { usePathname } from "next/navigation";
import Search from "./Search";
import StoreIcon from "./StoreIcon";
import { Suspense } from "react";
import Link from "next/link";

export default function TopBar() {
  const pathname = usePathname();
  const isHidden = pathname !== "/";
  return (
    <div className="flex flex-row justify-between items-center p-4">
      {isHidden && <StoreIcon />}
      <div className="w-3/5">
        {isHidden && (
          <Suspense>
            <Search />
          </Suspense>
        )}
      </div>
      <div className="flex gap-3 sm:w-1/8 justify-end">
        <button>Login</button>
        <Link href={"/cart"}>
          <button>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
