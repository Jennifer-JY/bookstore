"use client";
import Search from "./Search";
import StoreIcon from "./StoreIcon";
import { Suspense } from "react";
import Link from "next/link";
import { useCart } from "@/app/contextAndProvider/cartContext";
import { signOut } from "next-auth/react";
import GuestLoginBtn from "./authentication/GuestLoginBtn";

export default function TopBar() {
  const { session, itemsInCart } = useCart();

  return (
    <header className="flex flex-row justify-between items-center p-4 bg-[#59981a] text-white text-base">
      <StoreIcon />

      <Suspense>
        <Search />
      </Suspense>

      {session === null && <GuestLoginBtn />}
      <div className="flex gap-3  justify-end">
        {session === null && (
          <Link
            href="/login"
            className="flex items-center gap-3 justify-center"
          >
            <button className="cursor-pointer">
              <i className="fa-regular fa-circle-user mr-1"></i>
              <span className="hover:underline">Log In</span>
            </button>
          </Link>
        )}
        {session !== null && (
          <div className="flex flex-row justify-center items-center gap-x-2">
            <Link href={"/account"}>
              <button
                className="mr-2 cursor-pointer"
                title="Go to My account"
                aria-label="my-account"
              >
                <i className="fa-regular fa-circle-user mr-1"></i>
                <span className="hover:underline hidden sm:inline">
                  My account
                </span>
              </button>
            </Link>
            <button
              className="cursor-pointer"
              aria-label="sign-out"
              title="Sign out"
              onClick={async () => {
                await signOut({ redirect: true, callbackUrl: "/" });
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-1"></i>
              <span className="hover:underline hidden sm:inline">Sign Out</span>
            </button>
          </div>
        )}

        {session !== null && (
          <Link href="/cart" className="relative inline-block">
            {/* Cart Icon */}
            <button
              className="cursor-pointer"
              aria-label="go-to-cart"
              title="Go to cart"
            >
              <i className="fa-solid fa-cart-shopping mr-1"></i>
              <span className="hover:underline hidden sm:inline">Cart</span>
            </button>

            {/* Badge */}
            {itemsInCart.length > 0 && (
              <span className="absolute -top-3 md:right-5 right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                {itemsInCart.reduce(
                  (sum, item) => sum + Number(item.quantity),
                  0
                )}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
