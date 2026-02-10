import Link from "next/link";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function SuccessCheckoutPage() {
  return (
    <main
      className={`${nunito.className} min-h-[60dvh] flex items-center justify-center p-6`}
    >
      <section className="w-full max-w-xl rounded-2xl  p-8 ">
        {/* Success icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7 stroke-green-600"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 7L9 18l-5-5" />
          </svg>
        </div>

        <h1 className="text-center text-2xl font-bold">
          Thank you for your purchase!
        </h1>

        <p className="mt-3 text-center text-gray-700">
          We’ve received your order. Once your payment is confirmed, it will
          appear in{" "}
          <span className="font-medium">My Account → Past orders</span>.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/account"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            View past orders
          </Link>
          <Link
            href="/books"
            className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Continue shopping
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Need help?{" "}
          <Link
            href="mailto:yujiayue921@outlook.com"
            title="email to: yujiayue921@outlook.com"
            className="underline hover:text-gray-700"
          >
            Contact support
          </Link>
        </div>
      </section>
    </main>
  );
}
