import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#EFE6DD] mx-auto flex flex-col sm:flex-row justify-between w-full p-6">
      <p className="text-sm text-gray-600">© 2025 Booknest</p>
      <div className="flex gap-4">
        <Link
          href="https://github.com/Jennifer-JY/bookstore"
          target="_blank"
          className="text-[#495159] hover:text-[#D36135] underline"
          title="Go to the developer's GitHub repository"
          aria-label="github-repo"
        >
          GitHub Repo
        </Link>
        <Link
          href="https://jennifer-jy.github.io/portfolio/"
          target="_blank"
          title="Go to the developer's portfolio"
          aria-label="portfolio"
          className="text-[#495159] hover:text-[#D36135] underline"
        >
          Portfolio
        </Link>
        <Link
          href="mailto:yujiayue921@outlook.com"
          title="email to: yujiayue921@outlook.com"
          aria-label="contact"
          className="text-[#495159] hover:text-[#D36135] underline"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
