import { Rubik } from "next/font/google";
import Link from "next/link";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

export default function NavLinks() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Fiction", href: "/books?query=fiction" },
    { name: "Non-fiction", href: "/books?query=non-fiction" },
  ];
  return (
    <div className="flex flex-row justify-start gap-y-3 w-full lg:flex-col m-3 p-5 inset-shadow-sm  border-gray-400 shadow-sm h-full pl-4">
      {links.map((l) => {
        return (
          <Link
            className={`hover:underline block ${rubik.className}`}
            key={l.name}
            href={l.href}
          >
            {l.name}
          </Link>
        );
      })}
    </div>
  );
}
