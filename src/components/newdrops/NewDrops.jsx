"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store";
import { Spinner } from "@/components/ui";

const PLACEHOLDER = "https://placehold.co/400x400/e2e8f0/475569?text=Product";

const getValidImage = (images) => {
  if (!images || images.length === 0) return PLACEHOLDER;
  const img = images[0];
  if (!img || typeof img !== "string" || img.includes("[") || img.includes("any") || !img.startsWith("http")) {
    return PLACEHOLDER;
  }
  return img;
};

export default function NewDrops() {
  const { data: products, isLoading } = useGetProductsQuery({ offset: 0, limit: 4 });

  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-rubik font-semibold text-2xl lg:text-[74px] text-[#232321] uppercase leading-normal lg:leading-[0.95] max-w-[220px] lg:max-w-147.25">
          Don&apos;t miss out new drops
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center justify-center h-10 lg:h-12 px-4 rounded-lg bg-[#4a69e2] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:opacity-90 transition-colors w-fit shrink-0">
          Shop New Drops
        </Link>
      </div>

      {/* Product cards grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(products || []).map((product) => (
            <div key={product.id} className="flex flex-col gap-4">
              {/* Image container */}
              <div className="relative bg-[#fafafa] rounded-2xl lg:rounded-[28px] p-2 h-[180px] lg:h-87.5">
                <div className="relative w-full h-full rounded-xl lg:rounded-3xl overflow-hidden">
                  <Image
                    src={getValidImage(product.images)}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                </div>
                {/* Badge */}
                <div className="absolute top-2 left-2 bg-[#4a69e2] px-2 py-1 lg:px-4 lg:py-3 rounded-br-[13px] rounded-tl-xl lg:rounded-br-3xl lg:rounded-tl-3xl">
                  <span className="font-rubik font-semibold text-xs text-white">
                    New
                  </span>
                </div>
              </div>

              {/* Product info */}
              <div className="flex flex-col gap-2 lg:gap-4">
                <p className="font-rubik font-semibold text-base lg:text-2xl text-[#232321] leading-tight line-clamp-2">
                  {product.title}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="flex items-center justify-center h-10 lg:h-12 w-full rounded-lg bg-[#232321] font-rubik font-medium text-xs lg:text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors">
                  <span>View Product -&nbsp;</span>
                  <span className="text-[#ffa52f]">${product.price}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
