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
    <div className="flex flex-row gap-5 justify-between w-full lg:flex-col">
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
