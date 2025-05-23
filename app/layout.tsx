import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import CartContextProvider from "./contextAndProvider/cartContext";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Brightbond",
  description: "A small bookstore for the curious mind.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <CartContextProvider session={session}>
          <header>
            <div className="bg-green-300 relative notification-banner">
              <span className="text-left sm:block sm:text-center font-medium">
                Free shipping on orders over $50
              </span>
              <span className="text-right absolute right-3 top-1/2 -translate-y-1/2">
                🇦🇺 AU
              </span>
            </div>

            <TopBar />
          </header>

          {children}
        </CartContextProvider>

        <hr className="ml-4 mr-4 mb-4 border-t border-gray-200"></hr>
        <footer className="mx-auto flex flex-col w-1/2 items-center sm:flex-row sm:justify-around">
          <section>
            <h2 className="font-medium">Brightbond</h2>
            <div className="flex flex-col">
              <Link
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                href={"https://github.com/Jennifer-JY/bookstore"}
              >
                GitHub Repo
              </Link>
              <Link
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                href={"/"}
              >
                Homepage
              </Link>
            </div>
          </section>

          <section>
            <h2 className="font-medium">Support</h2>
            <div className="footer-links-container">
              <Link
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                href={"https://github.com/Jennifer-JY/bookstore"}
              >
                Contact
              </Link>
              <Link
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                href={"/"}
              >
                FAQ
              </Link>
            </div>
          </section>
        </footer>
      </body>
    </html>
  );
}
