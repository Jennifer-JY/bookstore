import postgres from "postgres";
import { Book, BookData } from "./types";

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchBooksGivenTerm(
  term: string | null,
  page: number = 1,
  pageSize: number = 10
) {
  const offset = (page - 1) * pageSize;

  try {
    const data = term
      ? await sql<Book[]>`
          SELECT * FROM books
          WHERE title ILIKE ${"%" + term + "%"}
          OR genre = ${term}
          OR author ILIKE ${"%" + term + "%"}
          LIMIT ${pageSize} OFFSET ${offset}`
      : await sql<Book[]>`
          SELECT * FROM books
          LIMIT ${pageSize} OFFSET ${offset}`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the books you are looking for.");
  }
}

export async function fetchTotalNumItemsFound(term: string | null) {
  try {
    const result = term
      ? await sql<{ count: number }[]>`
          SELECT COUNT(*)::int AS count FROM books
          WHERE title ILIKE ${"%" + term + "%"}
          OR genre = ${term}
          OR author ILIKE ${"%" + term + "%"}`
      : await sql<{ count: number }[]>`
          SELECT COUNT(*)::int AS count FROM books`;

    return result[0].count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the books you are looking for.");
  }
}

export async function getBookById(book_id: string) {
  try {
    const result = await sql<BookData[]>`
        SELECT 
          b.title,
          b.author,
          b.genre,
          b.stock,
          b.price,
          b.strip_price_id,
          bd.published_date,
          bd.introduction
        FROM books b
        JOIN bookDetails bd ON b.id = bd.book_id
        WHERE b.id = ${book_id};
      `;
    // if no record, return null
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the books you are looking for.");
  }
}
