"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetProductByIdQuery } from "@/store";
import { Spinner } from "@/components/ui";

const PLACEHOLDER = "https://placehold.co/1320x750/e2e8f0/475569?text=Featured+Product";
const BANNER_PRODUCT_ID = 5; // Classic Black Hooded Sweatshirt

const isValidUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  if (url.includes("[") || url.includes("any") || !url.startsWith("http")) return false;
  return true;
};

// Get all valid image URLs from a product's images array
const getProductImages = (images) => {
  if (!images || images.length === 0) return [PLACEHOLDER];
  const valid = images.filter(isValidUrl);
  return valid.length > 0 ? valid : [PLACEHOLDER];
};

export default function Banner() {
  const { data: product, isLoading } = useGetProductByIdQuery(BANNER_PRODUCT_ID);
  const [activeThumb, setActiveThumb] = useState(0);

  if (isLoading) {
    return (
      <section className="mx-4 lg:mx-10 xl:mx-15">
        <h2 className="font-rubik font-bold text-6xl lg:text-[223.5px] uppercase leading-none mb-6">
          <span className="text-[#232321]">Do it </span>
          <span className="text-[#4a69e2]">right</span>
        </h2>
        <div className="flex items-center justify-center w-full aspect-square lg:aspect-1320/750 rounded-3xl lg:rounded-[64px] bg-[#fafafa]">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  const productImages = product ? getProductImages(product.images) : [PLACEHOLDER];
  const mainImage = productImages[activeThumb] || productImages[0] || PLACEHOLDER;

  // Thumbnails: show OTHER images of the product (excluding the currently displayed one)
  const thumbImages = productImages.filter((_, i) => i !== activeThumb);

  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* ── "DO IT RIGHT" heading ── */}
      <h2 className="font-rubik font-bold text-6xl lg:text-[223.5px] uppercase leading-none mb-6">
        <span className="text-[#232321]">Do it </span>
        <span className="text-[#4a69e2]">right</span>
      </h2>

      {/* ── Banner Image Card ── */}
      <div className="relative w-full aspect-square lg:aspect-1320/750 rounded-3xl lg:rounded-[64px] overflow-hidden">
        {/* Main background image */}
        <Image
          src={mainImage}
          alt={product?.title || "Featured Product"}
          fill
          className="object-cover"
          priority
          unoptimized
        />

        {/* Gradient overlay (bottom half) */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-30% to-black/50 to-70% pointer-events-none" />

        {/* Rotated side tag – desktop only */}
        <div className="hidden lg:flex absolute left-0 top-20 h-59.25 w-16.75 items-center justify-center z-20">
          <div className="-rotate-90">
            <div className="bg-[#232321] rounded-b-2xl px-6 py-6 w-59.25">
              <p className="font-rubik font-semibold text-base text-[#e7e7e3] whitespace-nowrap">
                {product?.category?.name || "Featured Product"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom-left content */}
        <div className="absolute bottom-6 left-4 lg:bottom-12 lg:left-12 flex flex-col gap-4 lg:gap-6 z-20">
          <div className="flex flex-col">
            <h3 className="font-rubik font-semibold text-4xl lg:text-[74px] text-white leading-tight uppercase line-clamp-2">
              {product?.title || "Shop Now"}
            </h3>
            <p className="font-open-sans font-semibold text-base lg:text-2xl text-[#e7e7e3] max-w-xs lg:max-w-122.5">
              {product?.description
                ? product.description.length > 80
                  ? product.description.slice(0, 80) + "..."
                  : product.description
                : "Discover our latest products"}
            </p>
          </div>
          <Link
            href={product ? `/products/${product.id}` : "/products"}
            className="inline-flex items-center justify-center h-10 lg:h-12 px-4 rounded-lg bg-[#232321] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors w-fit">
            {product ? `Shop now — $${product.price}` : "Shop now"}
          </Link>
        </div>

        {/* Right-side: product image thumbnails – desktop only */}
        {thumbImages.length > 0 && (
          <div className="hidden lg:flex absolute right-12 bottom-12 flex-col gap-4 z-20">
            {thumbImages.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => {
                  const imgIndex = productImages.indexOf(imgUrl);
                  if (imgIndex !== -1) setActiveThumb(imgIndex);
                }}
                className="size-40 rounded-4xl border-3 border-[#e7e7e3] overflow-hidden block hover:opacity-90 transition-opacity cursor-pointer">
                <Image
                  src={imgUrl}
                  alt={`${product?.title || "Product"} - view ${i + 1}`}
                  width={160}
                  height={160}
                  className="object-cover size-full"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
