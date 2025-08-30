import { auth } from "@/auth";
import Image from "next/image";
import { Fredoka } from "next/font/google";
import { getPastOrders } from "@/app/lib/data";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

export default async function PastOrders() {
  const session = await auth();
  const pastOrders = await getPastOrders(session?.user.email || null);
  return (
    <div className="space-y-6">
      {pastOrders.map((order) => {
        return (
          <div
            key={order.cartId}
            className="rounded-xl border border-gray-200 bg-white shadow-sm p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Order #{order.cartId}
              </h3>
              <h4 className={`${fredoka.className} text-lg text-gray-500`}>
                {order.createDate.toDateString()}
              </h4>
            </div>

            {/* Items grid */}
            <div className="flex flex-wrap gap-6">
              {order.items.map((item) => {
                return (
                  <div
                    key={item.bookId}
                    className="w-[150px] flex flex-col items-center"
                  >
                    <Image
                      src={`/bookCovers/${item.bookId}.png`}
                      alt="book cover display"
                      width={141}
                      height={225}
                      className="rounded-md shadow-sm object-cover"
                    />
                    <div className="mt-2 text-center text-sm font-medium text-gray-700">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      by {item.author}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-gray-900">
                      ${item.price} × {item.quantity}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer / Total */}
            <div className="flex justify-end mt-6">
              <div className="text-3xl font-bold">
                Total: ${order.totalPrice}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
