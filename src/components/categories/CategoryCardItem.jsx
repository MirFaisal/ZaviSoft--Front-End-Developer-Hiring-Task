"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { getValidImageUrl } from "@/lib/utils";
import { PLACEHOLDER_CATEGORY } from "@/lib/constants";

export default function CategoryCardItem({ category, index }) {
  const [imgError, setImgError] = useState(false);
  const placeholder = `${PLACEHOLDER_CATEGORY.split("?")[0]}?text=${encodeURIComponent(category.name)}`;
  const src = imgError ? placeholder : getValidImageUrl(category.image, placeholder);

  return (
    <div
      className={`relative flex-none lg:flex-1 h-87 lg:h-full ${
        index === 1 ? "bg-[#f6f6f6]" : "bg-[#eceef0]"
      } ${index === 0 ? "rounded-tl-3xl lg:rounded-tl-[64px]" : ""} overflow-hidden`}>
      {/* Category image */}
      <Link href={`/categories/${category.id}`}>
        <Image
          src={src}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
          unoptimized
          onError={() => setImgError(true)}
        />
      </Link>

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
