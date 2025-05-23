/**
 * The implementation for the authentication follows the official
 * Next.js Getting Started tutorial:
 * Next.js Learn - Adding Authentication
 */
"use client";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { signIn } from "next-auth/react";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/books";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="w-1/2 mx-auto">
      <form action={formAction} className="flex flex-col">
        <label>Email </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          className="border-2 border-gray-100"
        ></input>
        <label>Password </label>
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
          className="cursor-pointer mt-10 border-2 border-gray-100"
        >
          Login
        </button>
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
        className="mt-4 border-2 border-gray-100 p-2"
      >
        Sign in with Google
      </button>
    </div>
  );
}
