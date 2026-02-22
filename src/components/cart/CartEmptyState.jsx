import Image from "next/image";
import { Button } from "@/components/ui";

export default function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="size-28 rounded-full bg-kicks-card flex items-center justify-center">
        <Image src="/icons/cart-empty.svg" alt="Empty cart" width={56} height={56} />
      </div>
      <div className="text-center">
        <p className="font-rubik font-semibold text-2xl text-kicks-dark">Your bag is empty</p>
        <p className="font-open-sans text-base text-kicks-dark/60 mt-2">
          Looks like you haven&apos;t added anything yet
        </p>
      </div>
      <Button variant="blue" size="md" href="/products">
        Continue Shopping
      </Button>
    </div>
  );
}
