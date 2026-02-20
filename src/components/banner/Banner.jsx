"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store";
import { Spinner } from "@/components/ui";

const PLACEHOLDER = "https://placehold.co/1320x750/e2e8f0/475569?text=Featured+Product";

const getValidImage = (images) => {
  if (!images || images.length === 0) return PLACEHOLDER;
  const img = images[0];
  if (!img || typeof img !== "string" || img.includes("[") || img.includes("any") || !img.startsWith("http")) {
    return PLACEHOLDER;
  }
  return img;
};

export default function Banner() {
  const { data: products, isLoading } = useGetProductsQuery({ offset: 0, limit: 3 });

  const featured = products?.[0];
  const thumbProducts = products?.slice(1, 3) || [];

  if (isLoading) {
    return (
      <section className="mx-4 lg:mx-10 xl:mx-15">
        <h2 className="font-rubik font-bold text-6xl lg:text-[223.5px] uppercase leading-none mb-6">
          <span className="text-[#232321]">Do it </span>
          <span className="text-[#4a69e2]">right</span>
        </h2>
        <div className="flex items-center justify-center w-full aspect-square lg:aspect-1320/750 rounded-3xl lg:rounded-[64px] bg-[#fafafa]">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  const mainImage = featured ? getValidImage(featured.images) : PLACEHOLDER;

  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* ── "DO IT RIGHT" heading ── */}
      <h2 className="font-rubik font-bold text-6xl lg:text-[223.5px] uppercase leading-none mb-6">
        <span className="text-[#232321]">Do it </span>
        <span className="text-[#4a69e2]">right</span>
      </h2>

      {/* ── Banner Image Card ── */}
      <div className="relative w-full aspect-square lg:aspect-1320/750 rounded-3xl lg:rounded-[64px] overflow-hidden">
        {/* Main background image */}
        <Image
          src={mainImage}
          alt={featured?.title || "Featured Product"}
          fill
          className="object-cover"
          priority
          unoptimized
        />

        {/* Gradient overlay (bottom half) */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-30% to-black/50 to-70%" />

        {/* Rotated side tag – desktop only */}
        <div className="hidden lg:flex absolute left-0 top-20 h-59.25 w-16.75 items-center justify-center">
          <div className="-rotate-90">
            <div className="bg-[#232321] rounded-b-2xl px-6 py-6 w-59.25">
              <p className="font-rubik font-semibold text-base text-[#e7e7e3] whitespace-nowrap">
                {featured?.category?.name || "Featured Product"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom-left content */}
        <div className="absolute bottom-6 left-4 lg:bottom-12 lg:left-12 flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col">
            <h3 className="font-rubik font-semibold text-4xl lg:text-[74px] text-white leading-tight uppercase">
              {featured?.title || "Shop Now"}
            </h3>
            <p className="font-open-sans font-semibold text-base lg:text-2xl text-[#e7e7e3] max-w-xs lg:max-w-122.5">
              {featured?.description
                ? featured.description.length > 80
                  ? featured.description.slice(0, 80) + "..."
                  : featured.description
                : "Discover our latest products"}
            </p>
          </div>
          <Link
            href={featured ? `/products/${featured.id}` : "/products"}
            className="inline-flex items-center justify-center h-10 lg:h-12 px-4 rounded-lg bg-[#232321] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors w-fit">
            {featured ? `Shop now — $${featured.price}` : "Shop now"}
          </Link>
        </div>

        {/* Right-side thumbnails – desktop only */}
        {thumbProducts.length > 0 && (
          <div className="hidden lg:flex absolute right-12 bottom-12 flex-col gap-4">
            {thumbProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="size-40 rounded-4xl border-3 border-[#e7e7e3] overflow-hidden block hover:opacity-90 transition-opacity">
                <Image
                  src={getValidImage(p.images)}
                  alt={p.title}
                  width={160}
                  height={160}
                  className="object-cover size-full"
                  unoptimized
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
