/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("MOCK_HASH"),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock("@/auth", () => {
  return {};
});

jest.mock("@/app/lib/db/client");

import {
  fetchBooksGivenTerm,
  fetchTotalNumItemsFound,
  getBookById,
} from "@/app/lib/data";
import { sql } from "@/app/lib/db/client";

describe("fetchBooksGivenTerm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("follows the logic when a term is given", async () => {
    (sql as any as jest.Mock).mockResolvedValueOnce([
      { id: "1", title: "Bird Book" },
    ]);

    const result = await fetchBooksGivenTerm("bird", 2, 5);

    expect(result).toEqual([{ id: "1", title: "Bird Book" }]);
    expect(sql).toHaveBeenCalledTimes(1);

    expect(sql).toHaveBeenCalledWith(
      expect.any(Array), // the string parts of the query
      expect.stringContaining("%bird%"), // %bird%
      expect.stringContaining("bird"), // bird
      expect.stringContaining("%bird%"), // %bird%
      5, // LIMIT
      5 // OFFSET
    );
  });

  it("does not contain term in the query when not given", async () => {
    (sql as any as jest.Mock).mockResolvedValueOnce([
      { id: "1", title: "Bird Book" },
    ]);

    const result = await fetchBooksGivenTerm("", 2, 5);

    expect(result).toEqual([{ id: "1", title: "Bird Book" }]);
    expect(sql).toHaveBeenCalledTimes(1);

    expect(sql).toHaveBeenCalledWith(
      expect.any(Array), // the string parts of the query
      5, // LIMIT
      5 // OFFSET
    );
  });
  it("throw an error when sql throws an error", async () => {
    (sql as any as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

    await expect(fetchBooksGivenTerm("bird", 2, 5)).rejects.toThrow(
      "Failed to fetch the books you are looking for."
    );

    expect(sql).toHaveBeenCalledTimes(1);
  });
});

describe("fetchTotalNumItemsFound", () => {
  it("returns the count number", async () => {
    (sql as any as jest.Mock).mockResolvedValueOnce([{ count: 10 }]);
    const result = await fetchTotalNumItemsFound("bird");
    expect(result).toBe(10);
    expect(sql).toHaveBeenCalledTimes(1);
    expect(sql).toHaveBeenCalledWith(
      expect.any(Array),
      "%bird%",
      "bird",
      "%bird%"
    );
  });
  it("does not pass any term when term is not given", async () => {
    (sql as any as jest.Mock).mockResolvedValueOnce([{ count: 10 }]);
    const result = await fetchTotalNumItemsFound("");
    expect(result).toBe(10);
    expect(sql).toHaveBeenCalledTimes(1);
    expect(sql).toHaveBeenCalledWith(expect.any(Array));
  });
  it("throws an error when db failed", async () => {
    (sql as any as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

    await expect(fetchTotalNumItemsFound("bird")).rejects.toThrow(
      "Failed to fetch the number of books you are looking for."
    );

    expect(sql).toHaveBeenCalledTimes(1);
  });
});

describe("getBookById", () => {
  it("calls sql with a given book id and return the book info", async () => {
    (sql as any as jest.Mock).mockResolvedValueOnce([{ title: "the book" }]);
    const result = await getBookById("id");
    expect(result).toMatchObject({ title: "the book" });
    expect(sql).toHaveBeenCalledWith(expect.any(Array), "id");
  });
  it("returns null when no result found", async () => {
    (sql as any as jest.Mock).mockResolvedValueOnce([]);
    const result = await getBookById("id");
    expect(result).toBeNull();
    expect(sql).toHaveBeenCalledWith(expect.any(Array), "id");
  });
  it("throws an error when db failed", async () => {
    (sql as any as jest.Mock).mockRejectedValueOnce(new Error("DB error"));
    await expect(getBookById("id")).rejects.toThrow(
      "Failed to fetch the book you are looking for."
    );
    expect(sql).toHaveBeenCalledTimes(1);
  });
});
