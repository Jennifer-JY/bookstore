import postgres from "postgres";
import { Book, BookData, Cart, ItemInCart, UserDeliveryInfo } from "./types";

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
          b.stripe_price_id,
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

export async function getCartByEmail(email: string): Promise<Cart> {
  try {
    const cart = await sql<{ cart_id: string; status: string }[]>`
      SELECT id as cart_id FROM usercart
      WHERE email = ${email}
      ORDER BY create_date ASC;
    `;

    // If there's no cart or the most recent cart is paid,
    // Just treat it as nothing in cart yet
    if (cart.length === 0 || cart[0].status === "paid") {
      return {};
    }
    const items = await sql<ItemInCart[]>`
      SELECT c.book_id, b.title, b.author, c.quantity, b.price, b.stripe_price_id
      FROM books b
      JOIN cartDetails c
      ON b.id = c.book_id
      WHERE c.cart_id = ${cart[0].cart_id}
    `;
    return { cartId: cart[0].cart_id, itemsInCart: items };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch cart for the user.");
  }
}

export async function updateCartStatusAfterSucsPayment(
  sessionId: string,
  email?: string
) {
  if (!email) {
    throw new Error("customer email is not provided");
  }
  try {
    const result = await sql`
    UPDATE usercart
    SET status = 'paid'
    WHERE stripe_session_id = ${sessionId} AND email = ${email}
    RETURNING *;
  `;
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update cart status after payment succeeded.");
  }
}

export async function storeStripeSession(
  cartId: string,
  email: string,
  stripeSessionId: string
) {
  try {
    const result = await sql`
    UPDATE usercart
    SET stripe_session_id = ${stripeSessionId}
    WHERE id = ${cartId} AND email = ${email}
    RETURNING *;
  `;
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to store the Stripe session.");
  }
}

export async function storeItemsInCart(
  cartId: string,
  email: string,
  itemsInCart: ItemInCart[]
) {
  try {
    if (!cartId) {
      const result = await sql`
        INSERT INTO usercart (email)
        VALUES (${email})
        RETURNING id;
      `;
      cartId = result[0].id;
    }
    if (!cartId) {
      throw new Error("Failed to create cardId.");
    }

    await sql`
  DELETE FROM cartDetails
  WHERE cart_id = ${cartId}
`;

    await Promise.all(
      itemsInCart.map(async (item) => {
        return sql`
      INSERT INTO cartDetails (cart_id, book_id, quantity)
      VALUES (${cartId}, ${item.book_id}, ${item.quantity})
      ON CONFLICT (cart_id, book_id) 
      DO UPDATE SET quantity = cartDetails.quantity + ${item.quantity}
    `;
      })
    );
    return { cartId: cartId };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to store the items in cart.");
  }
}

export async function storeUserDeliveryInfo(info: UserDeliveryInfo) {
  const { email, name, address, postcode, phone } = info;
  try {
    await sql`
    INSERT INTO user_delivery_infos (email, name, address, postcode, phone)
        VALUES (${email}, ${name}, ${address}, ${postcode}, ${phone})
  `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to store the Stripe session.");
  }
}

export async function getUserEmailByCartId(cartId: string) {
  try {
    const email = await sql<{ email: string }[]>`
      SELECT email FROM usercart
      WHERE id = ${cartId}
      AND status = 'unpaid'
      ORDER BY create_date ASC
      LIMIT 1;
    `;
    return email[0]?.email || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Fail to get the email from the given cartId.");
  }
}

export async function getPriceIdsByBookIds(bookIds: string[]) {
  const bookRows = await sql<{ book_id: string; stripe_price_id: string }[]>`
  SELECT id as book_id, stripe_price_id
  FROM books
  WHERE id IN ${sql(bookIds)}
`;
  return bookRows;
}
