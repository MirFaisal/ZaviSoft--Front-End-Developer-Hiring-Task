"use client";

import { useState, useRef } from "react";
import Image from "next/image";

/**
 * Reusable image slider with hero image, dot navigation, thumbnails, and swipe support.
 * @param {string[]} images - Array of image URLs to display
 * @param {string} alt - Alt text prefix for images
 * @param {string} className - Additional wrapper class names
 */
export default function ImageSlider({ images = [], alt = "Image", className = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  const uniqueImages = [...new Set(images)];

  if (uniqueImages.length === 0) return null;

  const goNext = () => setActiveIndex((i) => (i + 1) % uniqueImages.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + uniqueImages.length) % uniqueImages.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Hero image */}
      <div
        className="relative h-96 rounded-2xl overflow-hidden bg-kicks-card cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={uniqueImages[activeIndex]}
          alt={`${alt} - ${activeIndex + 1}`}
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
          unoptimized
        />
        {/* Dot navigation */}
        {uniqueImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {uniqueImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 w-3 rounded-full transition-colors ${
                  i === activeIndex ? "bg-kicks-blue" : "bg-white/30"
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {uniqueImages.length > 1 && (
        <div className="flex gap-2">
          {uniqueImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative size-16 rounded-lg overflow-hidden bg-kicks-card cursor-pointer transition-opacity ${
                activeIndex === i ? "ring-2 ring-kicks-dark" : "opacity-60"
              }`}>
              <Image
                src={img}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover object-top"
                sizes="64px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

