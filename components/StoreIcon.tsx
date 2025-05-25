import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function StoreIcon() {
  return (
    <>
      <div
        className={`${quicksand.className} bg-green-50 w-fit h-5 hidden sm:block font-bold text-2xl`}
      >
        Bookdrop
      </div>
      <div className="block sm:hidden font-bold text-xl">B</div>
    </>
  );
}
