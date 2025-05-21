import { getCartByEmail } from "@/app/lib/data";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return Response.json({ error: "User not logged in." }, { status: 403 });
  }
  const cart = await getCartByEmail(session.user.email);

  return Response.json(cart);
}
