import { getCartByEmail, storeItemsInCart } from "@/app/lib/data";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return Response.json({ error: "User not logged in." }, { status: 403 });
  }
  const cart = await getCartByEmail(session.user.email);

  return Response.json(cart);
}

export async function POST(request: Request) {
  const { itemsInCart, cartId } = await request.json();
  if (!itemsInCart || !itemsInCart.length)
    return Response.json({ error: "Cart is empty." }, { status: 400 });

  const session = await auth();

  if (!session || !session.user?.email) {
    return Response.json({ error: "User not logged in." }, { status: 403 });
  }
  const res = await storeItemsInCart(cartId, session.user.email, itemsInCart);

  return Response.json({ cartId: res.cartId });
}
