import { updateCartStatusAfterSucsPayment } from "@/app/lib/data";
import stripe, { Stripe } from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      //For test:
      // process.env.FOR_TEST_STRIPE_WEBHOOK_SECRET!
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      console.log("Payment succeeded:", checkoutSession.customer_email);
      await updateCartStatusAfterSucsPayment(
        checkoutSession.id,
        checkoutSession.customer_email ?? ""
      );
    } else {
      console.log("Unhandled event type:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }
}
