import postgres from "postgres";
import { Book } from "./types";

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchBooksGivenTerm(term: string | null) {
  try {
    const data = term
      ? await sql<Book[]>`
          SELECT * FROM books
          WHERE title ILIKE ${"%" + term + "%"}
          OR genre = ${term}
          OR author ILIKE ${"%" + term + "%"}`
      : await sql<Book[]>`
          SELECT * FROM books`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the books you are looking for.");
  }
}
