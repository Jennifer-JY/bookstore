import Link from "next/link";

export default function NavLinks() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Fiction", href: "/books?query=fiction" },
    { name: "Non-fiction", href: "/books?query=non-fiction" },
  ];
  return (
    <div className="flex flex-row justify-between w-full lg:flex-col">
      {links.map((l) => {
        return (
          <Link className="hover:underline block" key={l.name} href={l.href}>
            {l.name}
          </Link>
        );
      })}
    </div>
  );
}
