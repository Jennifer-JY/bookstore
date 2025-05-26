import { auth } from "@/auth";
import { getPastOrders } from "../lib/data";
import Image from "next/image";

export default async function AccountPage() {
  const session = await auth();
  const pastOrders = await getPastOrders(session?.user.email || null);
  console.log(pastOrders);
  return (
    <div>
      <div>Hi {session?.user.name}</div>
      <div>
        <h2>Past orders</h2>
        <div>
          {pastOrders.map((order) => {
            return (
              <div
                key={order.cartId}
                className="border border-solid border-black p-4 mb-4"
              >
                cartId: {order.cartId}
                {order.items.map((item) => {
                  return (
                    <div key={item.bookId}>
                      <Image
                        src={`/bookCovers/${item.bookId}.png`}
                        alt="book cover display"
                        width={141}
                        height={225}
                      ></Image>
                      <div>
                        {item.title} by {item.author}
                      </div>
                      <div>${item.price}</div>
                    </div>
                  );
                })}
                <div>Total: ${order.totalPrice}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
