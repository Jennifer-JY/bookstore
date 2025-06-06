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
    <div>
      {pastOrders.map((order) => {
        return (
          <div
            key={order.cartId}
            className="border border-solid border-black p-4 mb-4"
          >
            <h3>CartId: {order.cartId}</h3>
            <h4 className={`${fredoka.className}`}>
              Created at {order.createDate.toDateString()}
            </h4>
            <div className="flex flex-row flex-wrap flex-1">
              {order.items.map((item) => {
                return (
                  <div
                    key={item.bookId}
                    className="w-[150px] m-2 flex flex-col items-center"
                  >
                    <Image
                      src={`/bookCovers/${item.bookId}.png`}
                      alt="book cover display"
                      width={141}
                      height={225}
                      className="object-cover"
                    ></Image>
                    <div>
                      {item.title} by {item.author}
                    </div>
                    <div className="self-start text-sm">${item.price}</div>
                  </div>
                );
              })}
            </div>
            <div className="text-blue-500 font-bold">
              Total: ${order.totalPrice}
            </div>
          </div>
        );
      })}
    </div>
  );
}
