"use client";
import { redirect, useSearchParams } from "next/navigation";
import { register } from "../lib/actions";
import { useActionState, useEffect } from "react";
import { useCart } from "../contextAndProvider/cartContext";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [retMessage, formAction, isPending] = useActionState(
    register,
    undefined
  );

  useEffect(() => {
    if (retMessage?.success) {
      signIn("credentials", {
        email: retMessage.signInInfo?.email,
        password: retMessage.signInInfo?.password,
        callbackUrl,
      });
    }
  }, [callbackUrl, retMessage]);

  const { session } = useCart();
  if (session?.user) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create your account
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
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none"
            />
            {retMessage?.errors?.email && (
              <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
                {retMessage.errors.email.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            )}
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
              minLength={8}
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-300  outline-none"
            />
            {retMessage?.errors?.password && (
              <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
                {retMessage.errors.password.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              minLength={8}
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-300  outline-none"
            />
            {retMessage?.errors?.confirmPassword && (
              <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
                {retMessage.errors.confirmPassword.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            )}
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />

          {/* Submit */}
          <button
            disabled={isPending}
            aria-disabled={isPending}
            className="h-10 rounded-md bg-[#21B6A8] hover:bg-[#116530] text-white font-semibold transition disabled:opacity-50"
          >
            {isPending ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* General errors */}
        {retMessage?.errors?.general && (
          <div
            className="flex items-center gap-2 mt-4 text-red-600 text-sm font-medium"
            aria-live="polite"
            aria-atomic="true"
          >
            ⚠️
            <ul className="list-disc list-inside">
              {retMessage.errors.general.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Switch to Login */}
        <div className="flex justify-center mt-6 text-sm text-gray-600">
          Already have an account?
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="ml-1 text-indigo-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
