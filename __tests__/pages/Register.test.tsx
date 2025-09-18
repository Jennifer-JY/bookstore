import { redirect } from "@/__mocks__/next/navigation";
import { CartContextType } from "@/app/contextAndProvider/cartContext";
import { ItemInCart } from "@/app/lib/types";
import Register from "@/app/register/page";
import { renderWithCart } from "@/tests/contexts/renderWithCart";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { Session } from "next-auth";
import userEvent from "@testing-library/user-event";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return { ...actual, useActionState: jest.fn() };
});

jest.mock("@/app/lib/actions", () => ({
  register: jest.fn(),
}));

// convenient handle to the mocked hook
const ReactMock = jest.requireMock("react") as {
  useActionState: jest.Mock;
};

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
describe("Register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ReactMock.useActionState.mockReset();
  });
  it("renders the input fields and buttons", () => {
    ReactMock.useActionState.mockReturnValue([undefined, jest.fn(), false]);
    renderWithCart(<Register />, {});

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  it("shows Creating account... when registering", async () => {
    ReactMock.useActionState.mockReturnValue([undefined, jest.fn(), true]);
    renderWithCart(<Register />, {});

    const btn = await screen.findByRole("button", {
      name: /Creating account/i,
    });
    expect(btn).toBeDisabled();
  });

  it("renders general error text", async () => {
    const errorState = {
      success: false,
      errors: { general: ["Something went wrong, please try again"] },
    };
    ReactMock.useActionState.mockReturnValue([errorState, jest.fn(), false]);

    renderWithCart(<Register />, { session: null });

    expect(
      await screen.findByText(/Something went wrong, please try again/i)
    ).toBeInTheDocument();
  });

  it("renders field-level errors", async () => {
    const errorState = {
      success: false,
      errors: {
        email: ["Email is required", "Must be a valid email"],
        password: ["Password must be at least 8 characters"],
        confirmPassword: ["Passwords do not match"],
      },
    };
    ReactMock.useActionState.mockReturnValue([errorState, jest.fn(), false]);

    renderWithCart(<Register />, { session: null });

    // Email errors
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Must be a valid email/i)).toBeInTheDocument();

    // Password errors
    expect(
      screen.getByText(/Password must be at least 8 characters/i)
    ).toBeInTheDocument();

    // Confirm password errors
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it("redirects when user is logged in", () => {
    ReactMock.useActionState.mockReturnValue([undefined, jest.fn(), false]);
    renderWithCart(<Register />, fakeCartValue);

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("submit the form successfully", async () => {
    const formAction = jest.fn();
    ReactMock.useActionState.mockReturnValue([undefined, formAction, false]);
    renderWithCart(<Register />, {});

    await userEvent.type(screen.getByLabelText("Email"), "mock@outlook.com");
    await userEvent.type(screen.getByLabelText("Password"), "mock123@MOCk");
    await userEvent.type(
      screen.getByLabelText("Confirm Password"),
      "mock123@MOCk"
    );
    await userEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(formAction).toHaveBeenCalledTimes(1);
    const fd = formAction.mock.calls[0][0] as FormData;
    expect(fd.get("email")).toBe("mock@outlook.com");
    expect(fd.get("password")).toBe("mock123@MOCk");
    expect(fd.get("confirmPassword")).toBe("mock123@MOCk");
  });
});
