"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetProductByIdQuery } from "@/store";
import { Spinner } from "@/components/ui";

const PLACEHOLDER = "https://placehold.co/1320x750/e2e8f0/475569?text=Featured+Product";
const BANNER_PRODUCT_ID = 5; // Classic Black Hooded Sweatshirt

// Get all valid image URLs from a product's images array
const getProductImages = (images) => {
  if (!images || images.length === 0) return [PLACEHOLDER];
  const valid = images.filter(
    (url) => url && typeof url === "string" && url.startsWith("http") && !url.includes("[") && !url.includes("any"),
  );
  return valid.length > 0 ? valid : [PLACEHOLDER];
};

export default function Banner() {
  const { data: product, isLoading } = useGetProductByIdQuery(BANNER_PRODUCT_ID);
  const [activeThumb, setActiveThumb] = useState(0);
  const headingRef = useRef(null);

  const fitText = useCallback(() => {
    const el = headingRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    el.style.fontSize = "1000px";
    const scale = parent.clientWidth / el.scrollWidth;
    el.style.fontSize = `${1000 * scale}px`;
  }, []);

  useEffect(() => {
    fitText();
    window.addEventListener("resize", fitText);
    return () => window.removeEventListener("resize", fitText);
  }, [fitText]);

  if (isLoading) {
    return (
      <section className="mx-4 lg:mx-10 xl:mx-15">
        <h2 ref={headingRef} className="font-rubik font-bold uppercase leading-none mb-6 whitespace-nowrap w-full">
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
      <h2 ref={headingRef} className="font-rubik font-bold uppercase leading-none mb-6 whitespace-nowrap w-full">
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

        {/* Rotated side tag */}
        <div className="flex absolute left-0 top-4 lg:top-20 h-[157px] lg:h-59.25 w-[30px] lg:w-16.75 items-center justify-center z-20">
          <div className="-rotate-90">
            <div className="bg-[#232321] rounded-b-lg lg:rounded-b-2xl p-2 lg:px-6 lg:py-6 w-auto lg:w-59.25">
              <p className="font-rubik font-semibold text-xs lg:text-base text-[#e7e7e3] whitespace-nowrap">
                {product?.category?.name || "Featured Product"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom-left content */}
        <div className="absolute bottom-6 left-4 lg:bottom-12 lg:left-12 flex flex-col gap-4 lg:gap-6 z-20">
          <div className="flex flex-col">
            <h3 className="font-rubik font-semibold text-2xl lg:text-[74px] text-white leading-tight uppercase line-clamp-2">
              {product?.title || "Shop Now"}
            </h3>
            <p className="font-open-sans font-semibold text-sm lg:text-2xl text-[#e7e7e3] max-w-[197px] lg:max-w-122.5">
              {product?.description
                ? product.description.length > 80
                  ? product.description.slice(0, 80) + "..."
                  : product.description
                : "Discover our latest products"}
            </p>
          </div>
          <Link
            href={product ? `/products/${product.id}` : "/products"}
            className="inline-flex items-center justify-center h-8 lg:h-12 px-4 rounded-lg bg-[#232321] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors w-fit">
            {product ? `Shop now — $${product.price}` : "Shop now"}
          </Link>
        </div>

        {/* Right-side: product image thumbnails */}
        {thumbImages.length > 0 && (
          <div className="flex absolute right-4 bottom-6 lg:right-12 lg:bottom-12 flex-col gap-2 lg:gap-4 z-20">
            {thumbImages.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => {
                  const imgIndex = productImages.indexOf(imgUrl);
                  if (imgIndex !== -1) setActiveThumb(imgIndex);
                }}
                className="size-16 lg:size-40 rounded-lg lg:rounded-4xl border border-[#e7e7e3] lg:border-3 overflow-hidden block hover:opacity-90 transition-opacity cursor-pointer">
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
