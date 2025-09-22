import Pagination from "@/components/books/Pagination";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const push = jest.fn();
let pathname = "/books";
let params = new URLSearchParams("");

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => pathname,
  useSearchParams: () => params,
}));

describe("Pagination", () => {
  beforeEach(() => {
    push.mockReset();
    pathname = "/books";
    params = new URLSearchParams(""); // reset per test
  });

  it("clicking a page updates the 'page' param and preserves others", () => {
    params = new URLSearchParams("?page=2&query=hello");
    render(<Pagination pages={10} />);

    fireEvent.click(screen.getByRole("button", { name: "4" }));

    expect(push).toHaveBeenCalledTimes(1);
    const url = push.mock.calls[0][0] as string;

    const out = new URLSearchParams(url.split("?")[1]);
    expect(out.get("page")).toBe("4");
    expect(out.get("query")).toBe("hello");
  });

  it("shows the next two page numbers when on page 5", () => {
    params = new URLSearchParams("?page=6");
    render(<Pagination pages={10} />);

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "2" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "3" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "7" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "8" })).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "9" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
  });

  it("renders the correct shape when current page is in the middle", () => {
    params = new URLSearchParams("?page=10");
    render(<Pagination pages={20} />);

    const nav = screen.getByRole("navigation", { name: /pagination/i });
    // direct children only: buttons and the top-level "..." spans
    const items = nav.querySelectorAll(":scope > button, :scope > span");

    const labels = Array.from(items).map((el) => el.textContent?.trim());
    expect(labels).toEqual([
      "Previous",
      "1",
      "...",
      "8",
      "9",
      "10",
      "11",
      "12",
      "...",
      "20",
      "Next",
    ]);
  });

  it("navigates to the next page when Next is clicked", () => {
    params = new URLSearchParams("?page=2&query=hello");
    render(<Pagination pages={10} />);

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(push).toHaveBeenCalledTimes(1);

    const url = push.mock.calls[0][0] as string;
    const out = new URLSearchParams(url.split("?")[1]);

    expect(out.get("page")).toBe("3"); // went forward
    expect(out.get("query")).toBe("hello"); // preserved existing param
  });

  it("navigates to the previous page when Previous is clicked", () => {
    params = new URLSearchParams("?page=5&query=hello");
    render(<Pagination pages={10} />);

    fireEvent.click(screen.getByRole("button", { name: /previous/i }));

    expect(push).toHaveBeenCalledTimes(1);

    const url = push.mock.calls[0][0] as string;
    const out = new URLSearchParams(url.split("?")[1]);

    expect(out.get("page")).toBe("4"); // went backward
    expect(out.get("query")).toBe("hello"); // preserved existing param
  });

  it("disables prev when the page is at 1", () => {
    params = new URLSearchParams("?page=1");
    render(<Pagination pages={10} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it("disables next when the page is at 10", () => {
    params = new URLSearchParams("?page=10");
    render(<Pagination pages={10} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).not.toBeDisabled();

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });
});
