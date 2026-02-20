"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/store";
import { Spinner } from "@/components/ui";

const PLACEHOLDER = "https://placehold.co/600x600/e2e8f0/475569?text=Category";

const getValidCategoryImage = (image) => {
  if (!image || typeof image !== "string" || image.includes("[") || image.includes("any") || !image.startsWith("http")) {
    return PLACEHOLDER;
  }
  return image;
};

export default function CategoriesSection() {
  const { data: allCategories, isLoading } = useGetCategoriesQuery();
  const [startIndex, setStartIndex] = useState(0);

  // Show 2 categories at a time
  const visibleCategories = (allCategories || []).slice(startIndex, startIndex + 2);
  const canGoBack = startIndex > 0;
  const canGoForward = allCategories && startIndex + 2 < allCategories.length;

  return (
    <section className="bg-[#232321] w-full">
      <div className="max-w-360 mx-auto px-4 lg:px-15 pt-16 lg:pt-22.5">
        {/* Header row */}
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <h2 className="font-rubik font-semibold text-4xl lg:text-[74px] text-white uppercase leading-[0.95]">
            Categories
          </h2>

          {/* Navigation arrows */}
          <div className="flex gap-4 items-center">
            <button
              type="button"
              disabled={!canGoBack}
              onClick={() => setStartIndex((i) => Math.max(0, i - 2))}
              className="flex items-center justify-center h-10 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous">
              <Image
                src="/icons/chevron-forward.svg"
                alt=""
                width={24}
                height={24}
                className="rotate-180 invert"
              />
            </button>
            <button
              type="button"
              disabled={!canGoForward}
              onClick={() => setStartIndex((i) => i + 2)}
              className="flex items-center justify-center h-10 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next">
              <Image
                src="/icons/chevron-forward.svg"
                alt=""
                width={24}
                height={24}
                className="invert"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="max-w-360 mx-auto pl-4 lg:pl-15 pb-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="flex gap-0 h-100 lg:h-150">
            {visibleCategories.map((category, index) => (
              <div
                key={category.id}
                className={`relative flex-1 bg-[#eceef0] ${
                  index === 1 ? "bg-[#f6f6f6]" : ""
                } ${index === 0 ? "rounded-tl-4xl lg:rounded-tl-[64px]" : ""} overflow-hidden`}>
                {/* Category image */}
                <div className="flex items-center justify-center h-full px-8 lg:px-16">
                  <div className="relative w-full max-w-120 h-full">
                    <Image
                      src={getValidCategoryImage(category.image)}
                      alt={category.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 50vw, 40vw"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Label + arrow button */}
                <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-12 right-6 lg:right-12 flex items-end justify-between">
                  <h3 className="font-rubik font-semibold text-xl lg:text-4xl text-[#232321] uppercase leading-tight">
                    {category.name.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </h3>
                  <Link
                    href={`/categories/${category.id}`}
                    className="flex items-center justify-center p-2 rounded-lg bg-[#232321] hover:bg-[#1a1a18] transition-colors shrink-0">
                    <Image
                      src="/icons/arrow-trend-right-up.svg"
                      alt="View category"
                      width={24}
                      height={24}
                      className="-rotate-45"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
