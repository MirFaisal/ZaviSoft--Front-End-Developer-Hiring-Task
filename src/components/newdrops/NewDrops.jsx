"use client";

import { useGetProductsQuery } from "@/store";
import { Spinner, Button } from "@/components/ui";
import { ProductCardBranded } from "@/components/products";

export default function NewDrops() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery({ offset: 0, limit: 4 });

  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-rubik font-semibold text-2xl lg:text-[74px] text-kicks-dark uppercase leading-normal lg:leading-[0.95] max-w-55 lg:max-w-147.25">
          Don&apos;t miss out new drops
        </h2>
        <Button variant="blue" size="md" href="/products" className="w-fit shrink-0">
          Shop New Drops
        </Button>
      </div>

      {/* Product cards grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="font-rubik font-semibold text-kicks-dark text-lg">Something went wrong</p>
          <p className="font-open-sans text-sm text-kicks-dark/60">Could not load new drops. Please try again later.</p>
          <button
            onClick={refetch}
            className="mt-2 h-10 px-6 bg-kicks-dark text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:bg-kicks-dark-hover transition-colors cursor-pointer">
            Try Again
          </button>
        </div>
      ) : (products || []).length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="font-rubik font-semibold text-kicks-dark/60">No products available</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCardBranded key={product.id} product={product} badge="New" />
          ))}
        </div>
      )}
    </section>
  );
}
