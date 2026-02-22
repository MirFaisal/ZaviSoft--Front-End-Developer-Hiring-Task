"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromCart, updateSize, setQuantity } from "@/store";

const ALL_SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const DISABLED_SIZES = new Set([39, 40]);
const MAX_QUANTITY = 10;

function SelectDropdown({ label, value, onChange, children }) {
  return (
    <div className="relative flex items-center gap-2 lg:gap-3 cursor-pointer">
      <label className="font-open-sans font-semibold text-sm lg:text-lg text-kicks-dark/80 leading-normal pointer-events-none select-none">
        {label} {value}
      </label>
      {/* chevron */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 pointer-events-none"
        aria-hidden="true"
      >
        <path d="M6 9L12 15L18 9" stroke="#232321" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* native select — invisible overlay for interaction */}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
      >
        {children}
      </select>
    </div>
  );
}

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const currentSize = item.size ?? ALL_SIZES[0];

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
      <div className="flex-1 flex flex-col gap-2 lg:gap-4">
        {/* Info + Price: stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-20">
          {/* Product details */}
          <div className="flex-1 lg:flex-none lg:w-81.25 flex flex-col gap-2 lg:gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="font-rubik font-semibold text-base lg:text-2xl text-kicks-dark uppercase leading-normal">
                {item.title}
              </h3>
              <p className="font-open-sans font-semibold text-sm lg:text-lg text-kicks-dark/80 leading-normal line-clamp-2">
                {item.description || "No description available"}
              </p>
            </div>

            {/* Size & Quantity dropdowns */}
            <div className="flex items-center gap-6 lg:gap-10">
              {/* Size dropdown */}
              <SelectDropdown
                label="Size"
                value={currentSize}
                onChange={(size) => dispatch(updateSize({ id: item.id, size }))}
              >
                {ALL_SIZES.map((size) => (
                  <option key={size} value={size} disabled={DISABLED_SIZES.has(size)}>
                    {size}
                  </option>
                ))}
              </SelectDropdown>

              {/* Quantity dropdown */}
              <SelectDropdown
                label="Quantity"
                value={item.quantity}
                onChange={(quantity) => dispatch(setQuantity({ id: item.id, quantity }))}
              >
                {Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1).map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </SelectDropdown>
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
            className="size-6 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer bg-transparent"
            aria-label="Add to wishlist"
          >
            <Image src="/icons/heart-dark.svg" alt="Wishlist" width={24} height={24} />
          </button>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="size-6 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Remove item"
          >
            <Image src="/icons/bin.svg" alt="Remove" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

