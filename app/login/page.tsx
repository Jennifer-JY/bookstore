/**
 * The implementation for the authentication follows the official
 * Next.js Getting Started tutorial:
 * Next.js Learn - Adding Authentication
 */
"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useCart } from "../contextAndProvider/cartContext";
import GuestLoginBtn from "@/components/authentication/GuestLoginBtn";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/books";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const { session } = useCart();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        <form action={formAction} className="flex flex-col space-y-5">
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-300  outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-300  outline-none"
            />
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />

          {/* Login button */}
          <button
            aria-disabled={isPending}
            className="h-10 rounded-md bg-[#21B6A8] hover:bg-[#116530] text-white font-semibold transition disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Error message */}
        {errorMessage && (
          <div
            className="flex items-center gap-2 mt-4 text-red-600 text-sm font-medium"
            aria-live="polite"
            aria-atomic="true"
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Register link */}
        <div className="flex justify-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="ml-1 text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 border-t border-gray-300" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Guest login */}
        <div className="flex justify-center items-center">
          <GuestLoginBtn />
        </div>
      </div>
    </div>
  );
}
