import CartClient from "./CartClient";

export const metadata = {
  title: "Your Bag | KICKS",
  description: "Review your shopping bag, update quantities, and proceed to checkout.",
};

export default function CartPage() {
  return <CartClient />;
}
