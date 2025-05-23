"use client";
import { usePathname } from "next/navigation";
import Search from "./Search";
import StoreIcon from "./StoreIcon";
import { Suspense } from "react";
import Link from "next/link";
import { useCart } from "@/app/contextAndProvider/cartContext";
import { signOut } from "next-auth/react";

export default function TopBar() {
  const { session, itemsInCart } = useCart();
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
        {session === null && <button>Login</button>}
        {session !== null && (
          <div>
            <Link href={"/account"}>
              <button>
                <i className="fa-regular fa-circle-user"></i>
              </button>
              <button
                onClick={async () => {
                  await signOut({ redirect: true, callbackUrl: "/" });
                }}
              >
                SignOut
              </button>
            </Link>
          </div>
        )}

        <Link href={"/cart"}>
          <button>
            <div>{itemsInCart.length}</div>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
