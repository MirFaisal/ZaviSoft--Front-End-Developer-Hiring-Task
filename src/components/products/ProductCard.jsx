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
      <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
            unoptimized
          />
          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-700 text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          {category && (
            <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
              {category.name}
            </span>
          )}

          {/* Title */}
          <h3 className="mt-1 text-gray-900 font-medium line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>

          {/* Price */}
          <p className="mt-2 text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
      </article>
    </Link>
  );
}
