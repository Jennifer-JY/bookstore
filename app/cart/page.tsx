"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../contextAndProvider/cartContext";
import { Image } from "@imagekit/next";
import { useState } from "react";
import { EmptyCart } from "@/components/cart/EmptyCart";

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

  if (!itemsInCart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="m-6">
      <h2 className="text-2xl mb-6">Cart</h2>
      <div className="flex md:flex-row flex-col gap-10">
        <div className="flex-1 flex flex-col gap-10">
          {itemsInCart.map((item) => {
            return (
              <div key={item.book_id}>
                <div className="flex flex-row gap-6">
                  <Image
                    urlEndpoint="https://ik.imagekit.io/iqam99dxz"
                    src={`/${item.book_id}.png`}
                    width={141}
                    height={225}
                    alt="book cover display"
                    loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
                    className="w-full max-w-[150px] sm:max-w-[150px] lg:max-w-[150px] h-auto object-cover"
                  />

                  <div>
                    <div className="mb-4">
                      {item.title} by {item.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => addItemToCart({ ...item, quantity: -1 })}
                      >
                        {item.quantity > 1 ? (
                          "-"
                        ) : (
                          <i className="fa-solid fa-trash-can"></i>
                        )}
                      </button>

                      <span className="w-10 h-8 flex items-center justify-center  text-gray-800 font-medium">
                        {item.quantity}
                      </span>

                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => addItemToCart({ ...item, quantity: 1 })}
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-7">$ {item.price}</div>
                  </div>
                </div>
                <hr className="mt-4 border-t-1 border-gray-200" />
              </div>
            );
          })}
        </div>
        {itemsInCart.length > 0 && (
          <div className="md:w-1/3 flex-1 px-10">
            <div className="flex gap-4 text-3xl font-semibold mb-6">
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
                  placeholder="e.g. 0467362538"
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
      </div>
    </div>
  );
}
