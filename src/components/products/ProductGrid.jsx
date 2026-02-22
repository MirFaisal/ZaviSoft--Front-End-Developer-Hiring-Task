"use client";

import { ProductCardBranded } from "./";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Button } from "@/components/ui";

export default function ProductGrid({ products, isLoading, error, onRetry }) {
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="font-rubik font-semibold text-lg text-kicks-dark">Something went wrong</p>
        <p className="font-open-sans text-sm text-kicks-dark/60 mt-1">Failed to load products. Please try again.</p>
        {onRetry && (
          <Button variant="dark" size="sm" onClick={onRetry} className="mt-4">
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-rubik font-semibold text-lg text-kicks-dark">No products found</p>
        <p className="font-open-sans text-sm text-kicks-dark/60 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCardBranded key={product.id} product={product} badge="" />
      ))}
    </div>
  );
}
