import CartContextProvider, {
  useCart,
} from "@/app/contextAndProvider/cartContext";
import { Cart, ItemInCart } from "@/app/lib/types";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Session } from "next-auth";

const getItem = (
  book_id: string,
  quantity: number,
  price: number
): ItemInCart => {
  return {
    book_id: book_id,
    title: "b1 title",
    author: "b1 author",
    quantity: quantity,
    price: price,
  };
};

function TestConsumer({ qty = 1, bookId }: { qty?: number; bookId: string }) {
  const { cartId, itemsInCart, addItemToCart } = useCart();
  const total = itemsInCart.reduce((n, i) => n + Number(i.quantity), 0);
  return (
    <>
      <div data-testid="cartId">{cartId}</div>
      <div data-testid="total">{total}</div>
      <button onClick={() => addItemToCart(getItem(bookId, qty, 10))}>
        add
      </button>
    </>
  );
}

describe("cartContext", () => {
  let fetchMock: jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock = jest
      .fn()
      // initial GET
      .mockResolvedValueOnce({
        ok: true,
        json: async () =>
          ({ cartId: "CART-123", itemsInCart: [getItem("b1", 1, 10)] } as Cart),
      })
      // POST response
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ cartId: "CART-123" }),
      });

    global.fetch = fetchMock;
  });

  it("successfully passes the props to children and updates the cart", async () => {
    render(
      <CartContextProvider session={{} as Session}>
        <TestConsumer qty={1} bookId="b1" />
      </CartContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("total").textContent).toBe("1");
    });

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByTestId("total").textContent).toBe("2");

    await waitFor(() => {
      expect(fetchMock).toHaveBeenLastCalledWith(
        "/api/cart",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  it("successfully deletes from the cart", async () => {
    render(
      <CartContextProvider session={{} as Session}>
        <TestConsumer qty={-1} bookId="b1" />
      </CartContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("total").textContent).toBe("1");
    });

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByTestId("total").textContent).toBe("0");

    await waitFor(() => {
      expect(fetchMock).toHaveBeenLastCalledWith(
        "/api/cart",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  it("successfully adds other books to the cart", async () => {
    render(
      <CartContextProvider session={{} as Session}>
        <TestConsumer qty={1} bookId="b2" />
      </CartContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("total").textContent).toBe("1");
    });

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByTestId("total").textContent).toBe("2");

    await waitFor(() => {
      expect(fetchMock).toHaveBeenLastCalledWith(
        "/api/cart",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  it("displays the original cart when deleting sth that does not exist in the cart", async () => {
    render(
      <CartContextProvider session={{} as Session}>
        <TestConsumer qty={-1} bookId="b2" />
      </CartContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("total").textContent).toBe("1");
    });

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByTestId("total").textContent).toBe("1");

    await waitFor(() => {
      expect(fetchMock).toHaveBeenLastCalledWith(
        "/api/cart",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  it("sets cartId after POST if it was missing after GET", async () => {
    // Override fetch for this test
    const customMock = jest
      .fn()
      // GET without cartId
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ itemsInCart: [] } as Cart),
      })
      // POST response with new cartId
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ cartId: "NEW-123" }),
      });

    // reassign
    global.fetch = customMock;

    render(
      <CartContextProvider session={{} as Session}>
        <TestConsumer qty={1} bookId="b1" />
      </CartContextProvider>
    );

    // cartId starts empty
    await waitFor(() =>
      expect(screen.getByTestId("cartId").textContent).toBe("")
    );

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() =>
      expect(screen.getByTestId("cartId").textContent).toBe("NEW-123")
    );
  });

  it("clears state when session is null", async () => {
    // fetch should not be called
    const fetchSpy = jest.spyOn(global, "fetch");

    render(
      <CartContextProvider session={null}>
        <TestConsumer qty={1} bookId="b1" />
      </CartContextProvider>
    );

    // immediately empty
    expect(screen.getByTestId("cartId").textContent).toBe("");
    expect(screen.getByTestId("total").textContent).toBe("0");
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
