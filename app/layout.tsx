import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import CartContextProvider from "./contextAndProvider/cartContext";
import { auth } from "@/auth";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/homepage/Footer";

export const metadata: Metadata = {
  title: "Booknest",
  description: "A small bookstore for the curious mind.",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

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
      <body className={`min-h-screen flex flex-col ${roboto.className}`}>
        <CartContextProvider session={session}>
          <TopBar />
          <main className="flex-grow">{children}</main>
        </CartContextProvider>

        <Footer />
      </body>
    </html>
  );
}
