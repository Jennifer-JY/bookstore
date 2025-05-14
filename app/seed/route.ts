import postgres from "postgres";
import { bookDetails, books } from "./placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedBooks() {
  await sql`
    CREATE TABLE IF NOT EXISTS books (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT CHECK (genre IN ('fiction', 'non-fiction')),
        stock NUMERIC CHECK (stock >= 0),
        price NUMERIC CHECK (price >= 0)
    );
  `;

  const insertedBooks = await Promise.all(
    books.map(async (book) => {
      return sql`
        INSERT INTO books (id, title, author, genre, stock, price)
        VALUES (${book.id}, ${book.title}, ${book.author}, ${book.genre}, ${book.stock}, ${book.price})
      `;
    })
  );

  return insertedBooks;
}

async function seedBookDetails() {
  await sql`
  CREATE TABLE IF NOT EXISTS bookDetails (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    book_id TEXT,
    published_date DATE,
    introduction TEXT,
    FOREIGN KEY (book_id) REFERENCES books(id)
  );
`;

  const insertedBookDetails = await Promise.all(
    bookDetails.map(async (info) => {
      return sql`
        INSERT INTO bookDetails (book_id, published_date, introduction)
        VALUES (${info.book_id}, ${info.published_date}, ${info.introduction})
      `;
    })
  );

  return insertedBookDetails;
}

export async function GET() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await sql.begin((sql) => [seedBooks(), seedBookDetails()]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
