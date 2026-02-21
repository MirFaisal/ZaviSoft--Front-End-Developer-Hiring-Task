"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal, selectCartItemCount, useGetProductsQuery } from "@/store";
import { YouMayAlsoLike, CartItem } from "@/components";

const DELIVERY_FEE = 6.99;

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const { data: suggestedProducts } = useGetProductsQuery({ offset: 0, limit: 16 });

  const total = items.length > 0 ? subtotal + DELIVERY_FEE : 0;

  return (
    <div className="bg-[#e7e7e3] min-h-screen">
      {/* Promo Banner */}
      <div className="max-w-360 mx-auto px-4 lg:px-15 pt-6 lg:pt-8">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="font-rubik font-semibold text-xl lg:text-[32px] text-[#232321]">
            Saving to celebrate
          </h2>
          <p className="font-open-sans font-semibold text-xs lg:text-sm text-[#232321]/80">
            Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code
            needed.
          </p>
          <p className="font-open-sans font-semibold text-sm lg:text-base text-[#232321]/80">
            <Link href="/" className="underline">
              Join us
            </Link>
            &nbsp; or &nbsp;
            <Link href="/" className="underline">
              Sign-in
            </Link>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-360 mx-auto px-4 lg:px-15 pb-12 lg:pb-20">
        {items.length === 0 ? (
          /* Empty State */
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
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left: Your Bag */}
            <div className="flex-1 bg-[#fafafa] rounded-2xl p-5 lg:p-6">
              <div className="flex flex-col gap-2 mb-10 lg:mb-12">
                <h1 className="font-rubik font-semibold text-2xl lg:text-[32px] text-[#232321] leading-normal">
                  Your Bag
                </h1>
                <p className="font-open-sans text-sm lg:text-base text-[#232321]/80 leading-normal">
                  Items in your bag not reserved- check out now to make them yours.
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex flex-col gap-8 lg:gap-12">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Right: Order Summary — Figma node 1:3942 */}
            <div className="w-full lg:w-[418px] shrink-0 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <h2 className="font-rubik font-semibold text-2xl lg:text-[32px] text-[#232321] leading-normal">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-open-sans font-semibold text-base lg:text-xl text-[#232321]">
                      {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
                    </span>
                    <span className="font-open-sans font-semibold text-base lg:text-xl text-[#232321]/80">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-open-sans font-semibold text-base lg:text-xl text-[#232321]">
                      Delivery
                    </span>
                    <span className="font-open-sans font-semibold text-base lg:text-xl text-[#232321]/80">
                      ${DELIVERY_FEE.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-open-sans font-semibold text-base lg:text-xl text-[#232321]">
                      Sales Tax
                    </span>
                    <span className="font-open-sans font-semibold text-base lg:text-xl text-[#232321]/80">
                      -
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-rubik font-semibold text-xl lg:text-2xl text-[#232321]">Total</span>
                    <span className="font-rubik font-semibold text-xl lg:text-2xl text-[#232321]/80">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full h-12 bg-[#232321] text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-[0.25px] hover:bg-[#1a1a18] transition-colors cursor-pointer">
                Checkout
              </button>

              <button className="font-open-sans font-semibold text-base lg:text-xl text-[#232321] underline text-left cursor-pointer">
                Use a promo code
              </button>
            </div>
          </div>
        )}

        <YouMayAlsoLike products={suggestedProducts || []} className="mt-12 lg:mt-20" />
      </div>
    </div>
  );
}
