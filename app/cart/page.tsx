"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../contextAndProvider/cartContext";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { cartId, itemsInCart, addItemToCart } = useCart();
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
      body: JSON.stringify({ line_items: line_items, cartId: cartId }),
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
      <h2 className="m-4">cart</h2>
      <div className="flex sm:flex-row flex-col m-4">
        <div className="flex flex-col gap-10">
          {itemsInCart.map((item) => {
            return (
              <div key={item.book_id} className="border border-gray-400 p-4">
                <div className="flex flex-row gap-6">
                  <Image
                    width={141}
                    height={225}
                    alt="bookcover display"
                    src={`/bookCovers/${item.book_id}.png`}
                  ></Image>
                  <div>
                    <div className="mb-4">
                      {item.title} by {item.author}
                    </div>
                    <div className="flex flex-row gap-4">
                      <button
                        className="border w-7"
                        onClick={() => addItemToCart({ ...item, quantity: -1 })}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="border w-7"
                        onClick={() => addItemToCart({ ...item, quantity: 1 })}
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-7">$ {item.price}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mb-7">
          <form className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                type="text"
                placeholder="e.g. Mario Rossi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                type="text"
                placeholder="e.g. Via Roma 10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PostCode
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                type="text"
                placeholder="e.g. 00100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                type="tel"
                placeholder="e.g. +61 0467362538"
              />
            </div>
          </form>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            onClick={handleCheckout}
            type="button"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
