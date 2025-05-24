import {
  getPriceIdsByBookIds,
  getUserEmailByCartId,
  storeStripeSession,
  storeUserDeliveryInfo,
} from "@/app/lib/data";
import { ItemInCart } from "@/app/lib/types";
import { auth } from "@/auth";
import Stripe from "stripe";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const UserDeliveryInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  postcode: z.coerce.number().int().positive(),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-]{7,15}$/, "Invalid phone number format"),
});

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const { items, cartId, userDelivInfo } = body;

  const usersession = await auth();

  if (!usersession || !usersession.user?.email) {
    return Response.json({ error: "User not logged in." }, { status: 403 });
  }

  // Verify that the cartId actually belongs to the user's email
  const email = await getUserEmailByCartId(cartId);
  if (!email || email !== usersession.user.email) {
    return Response.json(
      { error: "The provided cartId does not match the user's email." },
      { status: 403 }
    );
  }

  // Validate the form:
  const result = UserDeliveryInfoSchema.safeParse(userDelivInfo);
  if (!result.success) {
    return Response.json(
      { error: "Invalid delivery info", details: result.error.format() },
      { status: 422 }
    );
  }
  // Store the delivery info
  await storeUserDeliveryInfo({
    ...result.data,
    email: usersession.user.email,
  });

  // Construct the line_items
  const bookIds = items.map((item: ItemInCart) => item.book_id);
  const bookRows = await getPriceIdsByBookIds(bookIds);

  const priceMap = new Map(
    bookRows.map((row) => [row.book_id, row.stripe_price_id])
  );
  const line_items = [];
  for (const item of items) {
    const priceId = priceMap.get(item.book_id);
    if (!priceId) {
      return Response.json(
        { error: `Missing price ID for book ID: ${item.book_id}` },
        { status: 400 }
      );
    }
    line_items.push({
      price: priceId,
      quantity: item.quantity,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: usersession.user.email,
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });
    if (!session) {
      return Response.json(
        { error: "Failed to create Stripe session." },
        { status: 500 }
      );
    }

    if (!cartId || !usersession.user.email || !session.id) {
      console.error(
        "Missing value:",
        cartId,
        usersession.user.email,
        session.id
      );
      throw new Error("Missing required input to storeStripeSession");
    }
    const res = await storeStripeSession(
      cartId,
      usersession.user.email,
      session.id
    );
    if (!res) {
      return Response.json(
        { error: "Failed to store Stripe session id for the user." },
        { status: 500 }
      );
    }

    if (!session.url) {
      return Response.json(
        { error: "Stripe session created but URL is missing." },
        { status: 500 }
      );
    }
    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json(
      { error: "Checkout failed: " + error },
      { status: 500 }
    );
  }
}
