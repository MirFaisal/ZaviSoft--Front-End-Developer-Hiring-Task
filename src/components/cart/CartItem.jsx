"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "@/store";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 lg:gap-6">
      {/* Product Image */}
      <div className="relative w-39.25 lg:w-52 shrink-0 self-stretch lg:self-auto lg:h-56 rounded-3xl overflow-hidden bg-kicks-bg">
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
          <div className="flex-1 lg:flex-none lg:w-81.25 flex flex-col gap-2 lg:gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="font-rubik font-semibold text-base lg:text-xl text-kicks-dark uppercase leading-normal">
                {item.title}
              </h3>
              <p className="font-open-sans font-semibold text-sm lg:text-lg text-kicks-dark/80 leading-normal line-clamp-2">
                {item.description || "No description available"}
              </p>
            </div>
            {/* Quantity Controls */}
            <div className="flex items-center gap-4 lg:gap-10">
              <div className="flex items-center gap-2 bg-white rounded-lg border border-kicks-bg">
                <button
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="w-8 h-8 flex items-center justify-center rounded-l-lg hover:bg-kicks-bg transition-colors font-rubik font-medium text-kicks-dark cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-6 text-center font-rubik font-semibold text-sm text-kicks-dark">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="w-8 h-8 flex items-center justify-center rounded-r-lg hover:bg-kicks-bg transition-colors font-rubik font-medium text-kicks-dark cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* Price */}
          <p className="font-rubik font-semibold text-xl lg:text-2xl text-kicks-blue shrink-0">
            ${(item.price * item.quantity).toFixed(2)}
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
