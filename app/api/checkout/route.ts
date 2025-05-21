import { auth } from "@/auth";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const { line_items } = await request.json();
  console.log("passing req body: " + line_items);

  const usersession = await auth();

  if (!usersession || !usersession.user?.email) {
    return Response.json({ error: "User not logged in." }, { status: 403 });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: usersession.user.email,
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });
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
