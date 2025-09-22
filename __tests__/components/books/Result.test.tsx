import Result from "@/components/books/Results";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fetchBooksGivenTerm, fetchTotalNumItemsFound } from "@/app/lib/data";

jest.mock("@/components/books/Pagination", () => ({
  __esModule: true,
  default: ({ pages }: { pages: number }) => (
    <div data-testid="pagination">{pages}</div>
  ),
}));
jest.mock(
  "@imagekit/next",
  () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Image: ({ src, alt, width, height }: any) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} width={width} height={height} />
    ),
  }),
  { virtual: true }
);

jest.mock("@/app/lib/data", () => {
  return {
    fetchBooksGivenTerm: jest.fn(),
    fetchTotalNumItemsFound: jest.fn(),
  };
});

const makeBook = (overrides = {}) => ({
  id: 42,
  title: "Clean Code",
  author: "Robert C. Martin",
  genre: "Programming",
  price: 39.99,
  stock: 2,
  ...overrides,
});

describe("Result.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("shows the search result content correctly", async () => {
    (fetchBooksGivenTerm as jest.Mock).mockResolvedValue([
      makeBook({ id: 1, stock: 0 }), // Sold out
      makeBook({ id: 2, stock: 2 }), // Limited stock
    ]);
    (fetchTotalNumItemsFound as jest.Mock).mockResolvedValue(15);
    const ui = await Result({ query: "clean", page: 2 });
    render(ui);
    expect(
      screen.getByRole("heading", { name: /15 items found/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/Title:/i)).toHaveLength(2);
    expect(screen.getByText(/Sold out/i)).toBeInTheDocument();
    expect(screen.getByText(/Limited stock: 2/i)).toBeInTheDocument();
    // links point to /books/:id
    expect(screen.getAllByRole("link", { name: /book /i })[0]).toHaveAttribute(
      "href",
      "/books/1"
    );

    // pagination receives pages = ceil(15 / 10) = 2
    expect(screen.getByTestId("pagination")).toHaveTextContent("2");

    // image rendered (mocked as <img>)
    const imgs = screen.getAllByRole("img");
    expect(imgs[0]).toHaveAttribute("src", "/1.png");
    expect(imgs[0]).toHaveAttribute(
      "alt",
      expect.stringMatching(/book clean code/i)
    );
  });
  it("handles empty results", async () => {
    (fetchBooksGivenTerm as jest.Mock).mockResolvedValue([]);
    (fetchTotalNumItemsFound as jest.Mock).mockResolvedValue(0);

    const ui = await Result({ query: "nothing", page: 1 });
    render(ui);

    expect(
      screen.getByRole("heading", { name: /0 items found/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("pagination")).toHaveTextContent("0");
  });
});
