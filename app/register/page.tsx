"use client";
import { redirect, useSearchParams } from "next/navigation";
import { register } from "../lib/actions";
import { useActionState, useEffect } from "react";
import { useCart } from "../contextAndProvider/cartContext";
import { signIn } from "next-auth/react";

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
        callbackUrl: callbackUrl,
      });
    }
  }, [callbackUrl, retMessage]);

  const { session } = useCart();
  if (session?.user) redirect("/");

  return (
    <div className="w-1/2 mx-auto border p-5 mb-10 border-gray-200">
      <form action={formAction} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          className="mb-4 p-2 border-2 border-gray-100"
        ></input>
        {retMessage?.errors?.email && (
          <>
            Error:{" "}
            {retMessage.errors.email.map((msg, index) => (
              <div className="text-red-500 text-sm mt-1" key={index}>
                {msg};
              </div>
            ))}
          </>
        )}
        <label>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          required
          minLength={8}
          className="mb-4 p-2 border-2 border-gray-100"
        ></input>
        {retMessage?.errors?.password && (
          <>
            Error:{" "}
            {retMessage.errors.password.map((msg, index) => (
              <div className="text-red-500 text-sm mt-1" key={index}>
                {msg};
              </div>
            ))}
          </>
        )}
        <label>Confirmed Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
          minLength={8}
          className="mb-6 p-2 border-2 border-gray-100"
        ></input>
        {retMessage?.errors?.confirmPassword && (
          <>
            Error:{" "}
            {retMessage.errors.confirmPassword.map((msg, index) => (
              <div className="text-red-500 text-sm mt-1" key={index}>
                {msg};
              </div>
            ))}
          </>
        )}
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button aria-disabled={isPending} className="border border-gray-300">
          Register
        </button>
        {retMessage?.errors?.general && (
          <>
            Error:{" "}
            {retMessage.errors.general.map((msg, index) => (
              <div className="text-red-500 text-sm mt-1" key={index}>
                {msg};
              </div>
            ))}
          </>
        )}
      </form>
    </div>
  );
}
