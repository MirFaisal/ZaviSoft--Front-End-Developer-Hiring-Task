"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 lg:gap-6">
      {/* Product Image */}
      <div className="relative w-[157px] lg:w-52 shrink-0 self-stretch lg:self-auto lg:h-56 rounded-3xl overflow-hidden bg-[#e7e7e3]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-top"
          unoptimized
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col gap-2 lg:gap-12">
        {/* Info + Price: stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-20">
          {/* Product details */}
          <div className="flex-1 lg:flex-none lg:w-[325px] flex flex-col gap-2 lg:gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="font-rubik font-semibold text-base lg:text-xl text-[#232321] uppercase leading-normal">
                {item.title}
              </h3>
              <p className="font-open-sans font-semibold text-sm lg:text-lg text-[#232321]/80 leading-normal line-clamp-2">
                {item.description || "No description available"}
              </p>
            </div>
            {/* Size + Quantity */}
            <div className="flex items-center gap-4 lg:gap-10">
              <div className="flex items-center lg:gap-4">
                <span className="font-open-sans font-semibold text-base lg:text-lg text-[#232321]/80">
                  Size 10
                </span>
                <Image src="/icons/chevron-down.svg" alt="" width={18} height={18} className="hidden lg:block" />
              </div>
              <div className="flex items-center lg:gap-4">
                <span className="font-open-sans font-semibold text-base lg:text-lg text-[#232321]/80">
                  Quantity {item.quantity}
                </span>
                <Image src="/icons/chevron-down.svg" alt="" width={18} height={18} className="hidden lg:block" />
              </div>
            </div>
          </div>
          {/* Price */}
          <p className="font-rubik font-semibold text-xl lg:text-2xl text-[#4a69e2] shrink-0">
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            className="size-6 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Add to wishlist">
            <Image src="/icons/heart-dark.svg" alt="Wishlist" width={24} height={24} />
          </button>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="size-6 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Remove item">
            <Image src="/icons/bin.svg" alt="Remove" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
