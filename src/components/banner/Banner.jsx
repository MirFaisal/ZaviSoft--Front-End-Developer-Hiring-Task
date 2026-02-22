"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Static banner assets 
const ALL_IMAGES = [
  "/images/banner/banner-hero.jpg",    // main hero
  "/images/banner/banner-thumb-1.jpg", // thumb 1
  "/images/banner/banner-thumb-2.jpg", // thumb 2
];

const BANNER = {
  title: "NIKE AIR MAX",
  subtitle: "Nike introducing the new air max for everyone's comfort",
  sideTag: "Nike product of the year",
  cta: "Shop now",
  ctaHref: "/products",
};

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingRef = useRef(null);

  // ── Fluid "DO IT RIGHT" heading
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

  // Derive current main image and the remaining thumbnails
  const mainImage = ALL_IMAGES[activeIndex];
  const thumbImages = ALL_IMAGES.filter((_, i) => i !== activeIndex);

  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* ── "DO IT RIGHT" heading ── */}
      <h2 ref={headingRef} className="font-rubik font-bold uppercase leading-none mb-6 whitespace-nowrap w-full">
        <span className="text-kicks-dark">Do it </span>
        <span className="text-kicks-blue">right</span>
      </h2>

      {/* ── Banner Image Card ── */}
      <div className="relative w-full aspect-square lg:aspect-1320/750 rounded-3xl lg:rounded-[64px] overflow-hidden">
        {/* Main background image */}
        <Image
          src={mainImage}
          alt={BANNER.title}
          fill
          className="object-cover transition-all duration-500"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-31% to-black/50 to-66% pointer-events-none" />

        {/* Rotated side tag */}
        <div className="flex absolute left-0 top-4 lg:top-20 h-39.25 lg:h-59.25 w-7.5 lg:w-16.75 items-center justify-center z-20">
          <div className="-rotate-90">
            <div className="bg-kicks-dark rounded-b-lg lg:rounded-b-2xl p-2 lg:px-6 lg:py-6 w-auto lg:w-59.25">
              <p className="font-rubik font-semibold text-xs lg:text-base text-kicks-bg whitespace-nowrap">
                {BANNER.sideTag}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom-left content */}
        <div className="absolute bottom-6 left-4 lg:bottom-12 lg:left-12 flex flex-col gap-4 lg:gap-6 z-20">
          <div className="flex flex-col">
            <h3 className="font-rubik font-semibold text-2xl lg:text-[74px] text-white leading-tight uppercase">
              {BANNER.title}
            </h3>
            <p className="font-open-sans font-semibold text-sm lg:text-2xl text-kicks-bg max-w-49.25 lg:max-w-122.5">
              {BANNER.subtitle}
            </p>
          </div>
          <Link
            href={BANNER.ctaHref}
            className="inline-flex items-center justify-center h-8 lg:h-12 px-4 rounded-lg bg-kicks-dark font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-kicks-dark-hover transition-colors w-fit">
            {BANNER.cta}
          </Link>
        </div>

        {/* Right-side thumbnails — click to swap with main image */}
        <div className="flex absolute right-4 bottom-6 lg:right-12 lg:bottom-12 flex-col gap-2 lg:gap-4 z-20">
          {thumbImages.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiveIndex(ALL_IMAGES.indexOf(src))}
              className="size-16 lg:size-40 rounded-lg lg:rounded-4xl border border-kicks-bg lg:border-3 overflow-hidden cursor-pointer hover:opacity-85 transition-opacity">
              <Image
                src={src}
                alt={`${BANNER.title} — view ${i + 1}`}
                width={160}
                height={160}
                className="object-cover size-full"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
