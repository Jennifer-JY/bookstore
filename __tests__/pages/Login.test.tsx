import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useActionState: jest.fn(),
  };
});

jest.mock("@/app/lib/actions", () => ({ authenticate: jest.fn() }));

jest.mock("@/components/authentication/GuestLoginBtn", () => ({
  __esModule: true,
  default: () => <button data-testid="guest-login">Continue as guest</button>,
}));

const fakeSession: Session = {
  user: {
    email: "test@example.com",
    name: "Test User",
  },
  expires: "",
};

const fakeCartValue: CartContextType = {
  session: fakeSession,
  cartId: "test-cart-id",
  itemsInCart: [
    {
      book_id: "book-123",
      quantity: 2,
      title: "Fake Book",
      price: 19.99,
    } as ItemInCart,
  ],
  addItemToCart: jest.fn(),
};

import Login from "@/app/login/page";
import { renderWithCart } from "@/tests/contexts/renderWithCart";
import { CartContextType } from "@/app/contextAndProvider/cartContext";
import { Session } from "next-auth";
import { ItemInCart } from "@/app/lib/types";
import { redirect } from "@/__mocks__/next/navigation";

// convenient handle to the mocked hook
const ReactMock = jest.requireMock("react") as {
  useActionState: jest.Mock;
};

describe("Login", () => {
  beforeEach(() => {
    ReactMock.useActionState.mockReset();
  });

  it("shows fields and primary action", () => {
    ReactMock.useActionState.mockReturnValue([undefined, jest.fn(), false]);
    renderWithCart(<Login />, {});

    expect(redirect).not.toHaveBeenCalledWith("/");
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^Password$/i, { selector: "input" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Register/i })).toBeInTheDocument();
  });

  it("redirects when user is logged in", () => {
    ReactMock.useActionState.mockReturnValue([undefined, jest.fn(), false]);
    renderWithCart(<Login />, fakeCartValue);

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("disables button when pending", async () => {
    ReactMock.useActionState.mockReturnValue([undefined, jest.fn(), true]);
    renderWithCart(<Login />, {});
    const btn = await screen.findByRole("button", {
      name: /Logging in\.\.\./i,
    });
    expect(btn).toBeDisabled();
  });

  it("renders error text", async () => {
    ReactMock.useActionState.mockReturnValue([
      "error message here",
      jest.fn(),
      false,
    ]);
    renderWithCart(<Login />, {});
    expect(await screen.findByText(/error message here/)).toBeInTheDocument();
  });

  it("submits form data", async () => {
    const formAction = jest.fn();
    ReactMock.useActionState.mockReturnValue([undefined, formAction, false]);
    renderWithCart(<Login />, {});

    await userEvent.type(screen.getByLabelText(/^Email$/i), "mock@outlook.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "mock123@MOCk");
    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(formAction).toHaveBeenCalledTimes(1);
    const fd = formAction.mock.calls[0][0] as FormData;
    expect(fd.get("email")).toBe("mock@outlook.com");
    expect(fd.get("password")).toBe("mock123@MOCk");
  });
});
