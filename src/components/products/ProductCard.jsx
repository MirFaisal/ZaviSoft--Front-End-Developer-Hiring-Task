"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store";
import { getFirstValidImage } from "@/lib/utils";

const PLACEHOLDER = "https://placehold.co/400x400/e2e8f0/475569?text=Product";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { id, title, price, images, category } = product;
  const [imgError, setImgError] = useState(false);

  const imageUrl = imgError ? PLACEHOLDER : getFirstValidImage(images, PLACEHOLDER);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id,
        title,
        price,
        image: imageUrl,
        quantity: 1,
      })
    );
  };

  return (
    <Link href={`/products/${id}`} className="group block">
      <article className="bg-[#fafafa] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#e7e7e3] p-2">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              unoptimized
            />
          </div>
          {/* Category badge */}
          {category && (
            <div className="absolute top-2 left-2 bg-[#4a69e2] px-2 py-1 rounded-br-xl rounded-tl-xl">
              <span className="font-rubik font-semibold text-xs text-white">{category.name}</span>
            </div>
          )}
          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#232321] text-white px-5 py-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#1a1a18] font-rubik font-medium text-xs uppercase tracking-wider cursor-pointer whitespace-nowrap"
          >
            Add to Cart
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-1">
          {/* Title */}
          <h3 className="font-rubik font-semibold text-sm text-[#232321] line-clamp-2 uppercase leading-snug">
            {title}
          </h3>

          {/* Price */}
          <p className="font-rubik font-semibold text-base text-[#4a69e2]">
            ${price.toFixed(2)}
          </p>
        </div>
      </article>
    </Link>
  );
}
