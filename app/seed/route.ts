import { sql } from "../lib/data";
import { bookDetails, books, users } from "./placeholder-data";

async function seedBooks() {
  await sql`DROP TABLE IF EXISTS books CASCADE;`;
  await sql`
    CREATE TABLE IF NOT EXISTS books (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT CHECK (genre IN ('fiction', 'non-fiction')) NOT NULL,
        stock NUMERIC CHECK (stock >= 0) NOT NULL,
        price NUMERIC CHECK (price >= 0) NOT NULL,
        stripe_product_id TEXT UNIQUE,
        stripe_price_id TEXT UNIQUE
    );
  `;

  const insertedBooks = await Promise.all(
    books.map(async (book) => {
      return sql`
        INSERT INTO books (id, title, author, genre, stock, price, stripe_product_id, stripe_price_id)
        VALUES (${book.id}, ${book.title}, ${book.author}, ${book.genre}, ${book.stock}, ${book.price}, ${book.stripe_product_id}, ${book.stripe_price_id})
      `;
    })
  );

  return insertedBooks;
}

async function seedBookDetails() {
  await sql`DROP TABLE IF EXISTS bookDetails;`;
  await sql`
  CREATE TABLE IF NOT EXISTS bookDetails (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    book_id UUID,
    published_date DATE NOT NULL,
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

async function seedUsers() {
  await sql`DROP TABLE IF EXISTS users;`;
  await sql`
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  );
`;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return sql`
        INSERT INTO users (email, password)
        VALUES (${user.email}, ${user.password})
      `;
    })
  );

  return insertedUsers;
}

export async function GET() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await seedBooks();
    await seedBookDetails();
    await seedUsers();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
