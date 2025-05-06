import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brightbond",
  description: "A small bookstore for the curious mind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <header>
          <div className="notification-banner">
            <div>Free shipping on orders over $50</div>
            <div>🇦🇺 AU</div>
          </div>
          <div className="store-banner">
            <div className="baloo.className font-bold">Brightbond</div>
            <div>- Bright books for curious minds -</div>
            <button>Login</button>
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </header>
        {children}
        <footer>
          <section>
            <h2 className="font-bold">Brightbond</h2>
            <div className="footer-links-container">
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
            <h2 className="font-bold">Store</h2>
            <div className="footer-links-container">
              <Link
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                href={"https://github.com/Jennifer-JY/bookstore"}
              >
                Home
              </Link>
              <Link
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                href={"/"}
              >
                Cart
              </Link>
            </div>
          </section>
          <section>
            <h2 className="font-bold">Support</h2>
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
