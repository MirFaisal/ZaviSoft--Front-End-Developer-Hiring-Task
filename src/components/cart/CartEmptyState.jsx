import Image from "next/image";
import Link from "next/link";

export default function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="size-28 rounded-full bg-[#fafafa] flex items-center justify-center">
        <Image src="/icons/cart-empty.svg" alt="Empty cart" width={56} height={56} />
      </div>
      <div className="text-center">
        <p className="font-rubik font-semibold text-2xl text-[#232321]">Your bag is empty</p>
        <p className="font-open-sans text-base text-[#232321]/60 mt-2">
          Looks like you haven&apos;t added anything yet
        </p>
      </div>
      <Link
        href="/products"
        className="h-12 px-8 bg-[#4a69e2] text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-colors flex items-center justify-center">
        Continue Shopping
      </Link>
    </div>
  );
}
