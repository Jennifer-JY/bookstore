"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../contextAndProvider/cartContext";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const { cartId, itemsInCart, addItemToCart } = useCart();

  const [userDelivInfo, setUserDelivInfo] = useState({
    name: "",
    address: "",
    postcode: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDelivInfo({ ...userDelivInfo, [e.target.name]: e.target.value });
  };
  const handleCheckout = async () => {
    if (!itemsInCart.length) return null;
    const items = itemsInCart.map((item) => {
      return {
        book_id: item.book_id,
        quantity: item.quantity,
      };
    });

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        cartId: cartId,
        userDelivInfo: userDelivInfo,
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      setErrorMessage(
        errorData.error || "Something went wrong during checkout."
      );
      return;
    }
    const data = await res.json();

    router.push(data.url);
  };

  const total = itemsInCart.reduce(
    (sum, item) => sum + item.price * Number(item.quantity),
    0
  );

  const numItems = itemsInCart.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  return (
    <>
      <h2 className="m-4 text-2xl">Cart</h2>
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
        {itemsInCart.length > 0 && (
          <div className="sm:w-1/3 sm:mx-auto">
            <div className="flex gap-4 mt-4 text-3xl font-semibold mb-6">
              <span>Total{` (${numItems} items)`}:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <form className="flex flex-col mb-8 w-full">
              <div className="flex flex-col">
                <label>Recipient Name</label>
                <input
                  name="name"
                  className="p-2 border border-gray-300"
                  type="text"
                  placeholder="e.g. Mario Rossi"
                  value={userDelivInfo.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label>Address</label>
                <input
                  name="address"
                  className="p-2 border border-gray-300"
                  type="text"
                  placeholder="e.g. Via Roma 10"
                  value={userDelivInfo.address}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label>PostCode</label>
                <input
                  name="postcode"
                  className="p-2 border border-gray-300"
                  type="text"
                  placeholder="e.g. 00100"
                  value={userDelivInfo.postcode}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label>Phone Number</label>
                <input
                  name="phone"
                  className="p-2 border border-gray-300"
                  type="tel"
                  placeholder="e.g. +61 0467362538"
                  value={userDelivInfo.phone}
                  onChange={handleChange}
                />
              </div>
            </form>
            {errorMessage && (
              <div className="text-red-600 font-semibold mb-4">
                {errorMessage}
              </div>
            )}

            <button
              className="w-full bg-[#21B6A8] hover:bg-[#116530] text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              onClick={handleCheckout}
              title="Checkout"
              type="button"
            >
              Checkout
            </button>
          </div>
        )}
        {itemsInCart.length === 0 && <div>Your cart is empty.</div>}
      </div>
    </>
  );
}
