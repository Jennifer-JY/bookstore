import { Quicksand } from "next/font/google";
import Link from "next/link";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function StoreIcon() {
  return (
    <>
      <Link href="/">
        <div
          className={`${quicksand.className} w-fit h-5 hidden font-bold text-2xl cursor-pointer sm:flex items-center`}
        >
          Bookdrop
        </div>
        <div className="block sm:hidden font-bold text-xl">B</div>
      </Link>
    </>
  );
}
