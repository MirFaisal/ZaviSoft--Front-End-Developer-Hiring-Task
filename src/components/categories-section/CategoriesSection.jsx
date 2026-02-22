"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/store";
import { Spinner, NavArrows, Button } from "@/components/ui";
import { getValidImageUrl } from "@/lib/utils";
import { PLACEHOLDER_CATEGORY } from "@/lib/constants";

export default function CategoriesSection() {
  const { data: rawCategories, isLoading, error, refetch } = useGetCategoriesQuery();
  const [startIndex, setStartIndex] = useState(0);

  // Filter out test/junk categories, keep even number (max 6)
  const allCategories = (rawCategories || []).filter((cat) => {
    const name = (cat.name || "").toLowerCase();
    return !name.includes("test") && !name.includes("timestamp") && !name.includes("{{") && !name.includes("new category") && name.length > 0;
  }).slice(0, 6);

  // Show 2 categories at a time
  const visibleCategories = allCategories.slice(startIndex, startIndex + 2);
  const canGoBack = startIndex > 0;
  const canGoForward = allCategories.length > 0 && startIndex + 2 < allCategories.length;

  const goBack = () => setStartIndex((i) => Math.max(0, i - 1));
  const goForward = () => setStartIndex((i) => i + 1);

  return (
    <section className="bg-kicks-dark lg:mx-10 xl:mx-15">
      <div className="w-full mx-auto px-4 lg:px-15 pt-6 lg:pt-22.5">
        {/* Header row */}
        <div className="flex items-end justify-between mb-6 lg:mb-12">
          <h2 className="font-rubik font-semibold text-2xl lg:text-[74px] text-white uppercase leading-normal lg:leading-[0.95]">
            Categories
          </h2>

          {/* Navigation arrows */}
          <NavArrows
            onPrev={goBack}
            onNext={goForward}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            variant="light"
          />
        </div>
      </div>

      {/* Category cards */}
      <div className="w-full mx-auto pl-4 lg:pl-15 pb-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="font-rubik font-semibold text-white text-lg">Something went wrong</p>
            <p className="font-open-sans text-sm text-white/60">Could not load categories. Please try again later.</p>
            <Button variant="blue" size="sm" onClick={refetch} className="mt-2">
              Try Again
            </Button>
          </div>
        ) : allCategories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-rubik font-semibold text-white/60">No categories available</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-0 lg:h-150">
            {visibleCategories.map((category, index) => (
              <CategoryCardItem key={category.id} category={category} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryCardItem({ category, index }) {
  const [imgError, setImgError] = useState(false);
  const placeholder = `${PLACEHOLDER_CATEGORY.split("?")[0]}?text=${encodeURIComponent(category.name)}`;
  const src = imgError ? placeholder : getValidImageUrl(category.image, placeholder);

  return (
    <div
      className={`relative flex-none lg:flex-1 h-87 lg:h-full ${
        index === 1 ? "bg-[#f6f6f6]" : "bg-[#eceef0]"
      } ${index === 0 ? "rounded-tl-3xl lg:rounded-tl-[64px]" : ""} overflow-hidden`}>
      {/* Category image */}
      <Image
        src={src}
        alt={category.name}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 40vw"
        unoptimized
        onError={() => setImgError(true)}
      />

      {/* Label + arrow button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm px-4 py-4 lg:px-12 lg:py-8 flex items-end justify-between">
        <h3 className="font-rubik font-semibold text-2xl lg:text-4xl text-kicks-dark uppercase leading-tight line-clamp-2">
          {category.name}
        </h3>
        <Button
          href={`/categories/${category.id}`}
          variant="dark"
          size="sm"
          className="flex items-center justify-center p-2 rounded lg:rounded-lg shrink-0">
          <Image
            src="/icons/arrow-trend-right-up.svg"
            alt="View category"
            width={24}
            height={24}
            className="-rotate-45"
          />
        </Button>
      </div>
    </div>
  );
}
