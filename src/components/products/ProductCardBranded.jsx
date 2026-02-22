"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { getFirstValidImage, formatPrice } from "@/lib/utils";
import { PLACEHOLDER_NO_IMAGE } from "@/lib/constants";
import Link from "next/link";

/**
 * Branded product card matching the KICKS Figma design.
 * Used in NewDrops section and "You may also like" related products.
 *
 * @param {object} product - Product data { id, title, price, images }
 * @param {string} badge - Badge text (e.g. "New")
 */
export default function ProductCardBranded({ product, badge = "New" }) {
  const { id, title, price, images } = product;
  const [imgError, setImgError] = useState(false);

  // 
  /**
   * Determines the image URL to display for a product card.
   * If an image error occurred, uses the placeholder image.
   * Otherwise, attempts to get the first valid image from the images array,
   * falling back to the placeholder if no valid image is found.
   * @type {string}
   */
  const imageUrl = imgError ? PLACEHOLDER_NO_IMAGE : (getFirstValidImage(images) || PLACEHOLDER_NO_IMAGE);

  return (
    <div className="flex flex-col gap-4">
      {/* Image container */}
      <Link href={`/products/${id}`}>
      <div className="relative bg-kicks-card rounded-2xl lg:rounded-[28px] p-2 h-45 lg:h-87.5">
        <div className="relative w-full h-full rounded-xl lg:rounded-3xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
            unoptimized
          />
        </div>
        {badge && (
          <div className="absolute top-2 left-2 bg-kicks-blue px-2 py-1 lg:px-4 lg:py-3 rounded-br-[13px] rounded-tl-xl lg:rounded-br-3xl lg:rounded-tl-3xl">
            <span className="font-rubik font-semibold text-xs text-white">{badge}</span>
          </div>
        )}
      </div>
      </Link>

      {/* Product info */}
      <div className="flex flex-col gap-2 lg:gap-4">
        <p className="font-rubik font-semibold text-base lg:text-2xl text-kicks-dark leading-tight line-clamp-2 uppercase min-h-[2lh]!">
          {title}
        </p>
        <Button
          href={`/products/${id}`}
          variant="dark"
          size="sm"
          className="w-full flex flex-row items-center justify-center whitespace-nowrap overflow-hidden px-2 sm:px-4 text-[10px] sm:text-xs">
          <span className="shrink-0">View Product -&nbsp;</span>
          <span className="text-kicks-yellow shrink-0">{formatPrice(price)}</span>
        </Button>
      </div>
    </div>
  );
}
