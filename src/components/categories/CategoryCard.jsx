"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {
  const { id, name, image } = category;
  const [imgError, setImgError] = useState(false);

  const placeholder = `https://placehold.co/400x300/e2e8f0/475569?text=${encodeURIComponent(name)}`;

  // Validate image URL
  const getImageUrl = () => {
    if (imgError) return placeholder;
    if (!image || !image.startsWith("http") || image.includes("any") || image.includes("[")) {
      return placeholder;
    }
    return image;
  };

  const imageUrl = getImageUrl();

  return (
    <Link href={`/categories/${id}`} className="group block">
      <article className="relative h-48 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImgError(true)}
          unoptimized
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-xl font-semibold group-hover:text-indigo-300 transition-colors">
            {name}
          </h3>
        </div>
      </article>
    </Link>
  );
}
