"use client";

import Image from "next/image";
import Link from "next/link";
import { getFirstValidImage } from "@/lib/utils";

/**
 * Branded product card matching the KICKS Figma design.
 * Used in NewDrops section and "You may also like" related products.
 *
 * @param {object} product - Product data { id, title, price, images }
 * @param {string} badge - Badge text (e.g. "New")
 */
export default function ProductCardBranded({ product, badge = "New" }) {
  const { id, title, price, images } = product;
  const imageUrl = getFirstValidImage(images);

  return (
    <div className="flex flex-col gap-4">
      {/* Image container */}
      <div className="relative bg-[#fafafa] rounded-2xl lg:rounded-[28px] p-2 h-[180px] lg:h-87.5">
        <div className="relative w-full h-full rounded-xl lg:rounded-3xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
        </div>
        {badge && (
          <div className="absolute top-2 left-2 bg-[#4a69e2] px-2 py-1 lg:px-4 lg:py-3 rounded-br-[13px] rounded-tl-xl lg:rounded-br-3xl lg:rounded-tl-3xl">
            <span className="font-rubik font-semibold text-xs text-white">{badge}</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-2 lg:gap-4">
        <p className="font-rubik font-semibold text-base lg:text-2xl text-[#232321] leading-tight line-clamp-2 uppercase">
          {title}
        </p>
        <Link
          href={`/products/${id}`}
          className="flex items-center justify-center h-10 lg:h-12 w-full rounded-lg bg-[#232321] font-rubik font-medium text-xs lg:text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors">
          <span>View Product -&nbsp;</span>
          <span className="text-[#ffa52f]">${price}</span>
        </Link>
      </div>
    </div>
  );
}
