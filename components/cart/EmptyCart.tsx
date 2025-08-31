import Image from "next/image";

export function EmptyCart() {
  return (
    <div className="flex flex-col gap-24 m-8">
      <p className="text-gray-600">Your cart is empty.</p>
      <div className="h-full flex justify-center items-center">
        <Image
          src="/empty-cart-svgrepo-com.svg"
          alt="empty cart"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
