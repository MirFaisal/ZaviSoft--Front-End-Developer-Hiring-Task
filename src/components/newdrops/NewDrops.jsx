"use client";

import Link from "next/link";
import { useGetProductsQuery } from "@/store";
import { Spinner } from "@/components/ui";
import { ProductCardBranded } from "@/components/products";

export default function NewDrops() {
  const { data: products, isLoading } = useGetProductsQuery({ offset: 0, limit: 4 });

  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-rubik font-semibold text-2xl lg:text-[74px] text-kicks-dark uppercase leading-normal lg:leading-[0.95] max-w-[220px] lg:max-w-147.25">
          Don&apos;t miss out new drops
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center justify-center h-10 lg:h-12 px-4 rounded-lg bg-kicks-blue font-rubik font-medium text-sm text-white uppercase tracking-wider hover:opacity-90 transition-colors w-fit shrink-0">
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
            <ProductCardBranded key={product.id} product={product} badge="New" />
          ))}
        </div>
      )}
    </section>
  );
}
