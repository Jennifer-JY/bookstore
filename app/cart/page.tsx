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
    <>
      <h2>cart</h2>
      <div className="flex flex-row">
        <div>
          {itemsInCart.map((item) => {
            return (
              <div key={item.book_id}>
                <div className="flex flex-row">
                  <Image
                    width={141}
                    height={225}
                    alt="bookcover display"
                    src={`/bookCovers/${item.book_id}.png`}
                  ></Image>
                  <div>
                    <div>
                      {item.title} by {item.author}
                    </div>
                    <div>
                      <button
                        onClick={() => addItemToCart({ ...item, quantity: -1 })}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => addItemToCart({ ...item, quantity: 1 })}
                      >
                        +
                      </button>
                    </div>
                    <div>$ {item.price}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <form className="flex flex-col">
          <label>Recipient Name</label>
          <input></input>
          <label>Address</label>
          <input></input>
          <label>PostCode</label>
          <input></input>
          <label>Phone Number</label>
          <input></input>
          <button className="border-2" onClick={handleCheckout}>
            checkout
          </button>
        </form>
      </div>
    </>
  );
}
