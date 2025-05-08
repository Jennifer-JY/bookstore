"use client";
import { usePathname } from "next/navigation";
import Search from "./Search";
import StoreIcon from "./StoreIcon";

export default function TopBar() {
  const pathname = usePathname();
  const isHidden = pathname !== "/";
  return (
    <div className="flex flex-row justify-between items-center p-4">
      {isHidden && <StoreIcon />}
      <div className="w-3/5">{isHidden && <Search />}</div>
      <div className="flex gap-3 sm:w-1/8 justify-end">
        <button>Login</button>
        <button>
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  );
}
