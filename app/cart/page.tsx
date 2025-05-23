"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../contextAndProvider/cartContext";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { itemsInCart, addItemToCart } = useCart();
  console.log(itemsInCart);
  const handleCheckout = async () => {
    const line_items = itemsInCart.map((item) => {
      return {
        price: item.stripe_price_id,
        quantity: item.quantity,
      };
    });

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ line_items: line_items }),
    });
    if (!res.ok) {
      console.error("Failed to create checkout session");
      return;
    }
    const data = await res.json();

    router.push(data.url);
  };

  return (
    <div>
      <h2>cart</h2>
      <div>
        {itemsInCart.map((item) => {
          return (
            <div key={item.book_id}>
              <Image
                width={141}
                height={225}
                alt="bookcover display"
                src={`/bookCovers/${item.book_id}.png`}
              ></Image>
              <div>
                {item.title} by {item.author}
              </div>
              <div>$ {item.price}</div>
            </div>
          );
        })}
      </div>
      <button className="border-2" onClick={handleCheckout}>
        checkout
      </button>
    </div>
  );
}
