import Image from "next/image";
import Link from "next/link";

export function CategoryBadge({
  src,
  label,
  link,
}: {
  src: string;
  label: string;
  link: string;
}) {
  return (
    <Link className="group inline-flex flex-col items-center gap-3" href={link}>
      <div className="w-36 h-36 rounded-full bg-neutral-100 grid place-items-center ring-1 ring-gray-50 group-hover:ring-gray-300 transition">
        <Image src={src} alt={label} width={56} height={56} priority />
      </div>
      <span className="text-lg font-semibold">{label}</span>
    </Link>
  );
}
