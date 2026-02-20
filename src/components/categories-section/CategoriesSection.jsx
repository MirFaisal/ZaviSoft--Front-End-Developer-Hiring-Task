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
  const { data: rawCategories, isLoading } = useGetCategoriesQuery();
  const [startIndex, setStartIndex] = useState(0);

  // Filter out test/junk categories, keep even number (max 6)
  const allCategories = (rawCategories || []).filter((cat) => {
    const name = (cat.name || "").toLowerCase();
    return !name.includes("test") && !name.includes("timestamp") && !name.includes("{{") && !name.includes("new category") && name.length > 0;
  }).slice(0, 4);

  // Show 2 categories at a time
  const visibleCategories = allCategories.slice(startIndex, startIndex + 2);
  const canGoBack = startIndex > 0;
  const canGoForward = allCategories.length > 0 && startIndex + 2 < allCategories.length;

  const goBack = () => setStartIndex((i) => Math.max(0, i - 1));
  const goForward = () => setStartIndex((i) => i + 1);

  return (
    <section className="bg-[#232321] lg:mx-10 xl:mx-15">
      <div className="w-full mx-auto px-4 lg:px-15 pt-6 lg:pt-22.5">
        {/* Header row */}
        <div className="flex items-end justify-between mb-6 lg:mb-12">
          <h2 className="font-rubik font-semibold text-2xl lg:text-[74px] text-white uppercase leading-normal lg:leading-[0.95]">
            Categories
          </h2>

          {/* Navigation arrows */}
          <div className="flex gap-4 items-center">
            <button
              type="button"
              disabled={!canGoBack}
              onClick={goBack}
              className="flex items-center justify-center h-10 px-3 rounded-lg bg-white hover:bg-white/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous">
              <Image
                src="/icons/chevron-forward-white.svg"
                alt=""
                width={24}
                height={24}
                className="rotate-180 invert"
              />
            </button>
            <button
              type="button"
              disabled={!canGoForward}
              onClick={goForward}
              className="flex items-center justify-center h-10 px-3 rounded-lg bg-white hover:bg-white/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next">
              <Image src="/icons/chevron-forward-white.svg" alt="" width={24} height={24} className="invert" />
            </button>
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="w-full mx-auto pl-4 lg:pl-15 pb-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-0 lg:h-150">
            {visibleCategories.map((category, index) => (
              <div
                key={category.id}
                className={`relative flex-none lg:flex-1 h-[348px] lg:h-full ${
                  index === 1 ? "bg-[#f6f6f6]" : "bg-[#eceef0]"
                } ${index === 0 ? "rounded-tl-3xl lg:rounded-tl-[64px]" : ""} overflow-hidden`}>
                {/* Category image */}
                <Image
                  src={getValidCategoryImage(category.image)}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized
                />

                {/* Label + arrow button */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm px-4 py-4 lg:px-12 lg:py-8 flex items-end justify-between">
                  <h3 className="font-rubik font-semibold text-2xl lg:text-4xl text-[#232321] uppercase leading-tight">
                    {category.name.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </h3>
                  <Link
                    href={`/categories/${category.id}`}
                    className="flex items-center justify-center p-2 rounded lg:rounded-lg bg-[#232321] hover:bg-[#1a1a18] transition-colors shrink-0">
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
