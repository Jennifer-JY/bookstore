import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400"],
});

export default function SuccessCheckoutPage() {
  return (
    <div className={`${nunito.className} text-2xl m-10`}>
      Thank you for shopping with us!
    </div>
  );
}
