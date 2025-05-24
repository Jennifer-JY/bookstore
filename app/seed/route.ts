import { sql } from "../lib/data";
import {
  bookDetails,
  books,
  cartDetails,
  usercart,
  users,
} from "./placeholder-data";

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
        stripe_product_id TEXT UNIQUE NOT NULL,
        stripe_price_id TEXT UNIQUE NOT NULL
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
    book_id UUID PRIMARY KEY,
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
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
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

async function seedUserCart() {
  await sql`DROP TABLE IF EXISTS usercart CASCADE;`;
  await sql`
  CREATE TABLE IF NOT EXISTS usercart (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('paid', 'unpaid')),
    create_date TIMESTAMPTZ DEFAULT now(),
    stripe_session_id TEXT UNIQUE
  );
`;

  const insertedusercart = await Promise.all(
    usercart.map(async (cart) => {
      return sql`
        INSERT INTO usercart (id, email, status)
        VALUES (${cart.id}, ${cart.email}, ${cart.status})
      `;
    })
  );

  return insertedusercart;
}

async function seedCartDetails() {
  await sql`DROP TABLE IF EXISTS cartDetails;`;
  await sql`
  CREATE TABLE IF NOT EXISTS cartDetails (
    cart_id UUID,
    book_id UUID,
    quantity NUMERIC,

    PRIMARY KEY (cart_id, book_id),
    FOREIGN KEY (cart_id) REFERENCES usercart(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

`;

  const insertedcartDetails = await Promise.all(
    cartDetails.map(async (detail) => {
      return sql`
        INSERT INTO cartDetails (cart_id, book_id, quantity)
        VALUES (${detail.cart_id}, ${detail.book_id}, ${detail.quantity})
      `;
    })
  );

  return insertedcartDetails;
}

async function insertUserDeliveryInfo() {
  await sql`DROP TABLE IF EXISTS user_delivery_infos;`;
  await sql`
    CREATE TABLE user_delivery_infos (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(300) NOT NULL,
    postcode TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
}

export async function GET() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await seedBooks();
    await seedBookDetails();
    await seedUsers();
    await seedUserCart();
    await seedCartDetails();
    await insertUserDeliveryInfo();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
