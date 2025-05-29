/**
 * The implementation for the authentication follows the official
 * Next.js Getting Started tutorial:
 * Next.js Learn - Adding Authentication
 */
"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useCart } from "../contextAndProvider/cartContext";

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
    <div className="w-1/2 mx-auto border p-5 mb-10 border-gray-200">
      <form action={formAction} className="flex flex-col">
        <label htmlFor="email">Email </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          className="border-2 border-gray-100"
        ></input>
        <label htmlFor="password" className="mt-5">
          Password{" "}
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          required
          minLength={6}
          className="border-2 border-gray-100"
        ></input>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          aria-disabled={isPending}
          className="cursor-pointer mt-10 border-2 border-gray-300"
        >
          Login
        </button>
        <div>
          Do not have an account?{" "}
          <Link href="/register" className="hover:underline text-blue-600">
            Register
          </Link>
        </div>
      </form>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            ⚠️
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>

      <div>OR</div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: callbackUrl })}
        className="mt-4 border-2  p-2 border-blue-400"
      >
        Sign in with Google
      </button>
    </div>
  );
}
