import { auth } from "@/auth";
import { getPastOrders } from "../lib/data";
import { Suspense } from "react";
import PastOrders from "@/components/account/OrderHistory";

export default async function AccountPage() {
  const session = await auth();
  const pastOrders = await getPastOrders(session?.user.email || null);

  return (
    <div className="m-5">
      <div>Hi {session?.user.name}</div>
      <div>
        {pastOrders.length !== 0 && <h2>Your Past Orders:</h2>}
        {pastOrders.length === 0 && <h2>You do not have any past orders.</h2>}
        <Suspense>
          <PastOrders />
        </Suspense>
      </div>
    </div>
  );
}
