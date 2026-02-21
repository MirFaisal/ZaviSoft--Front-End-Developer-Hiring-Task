"use client";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGrid({ products, isLoading, error }) {
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="font-rubik font-semibold text-lg text-[#232321]">Something went wrong</p>
        <p className="font-open-sans text-sm text-[#232321]/60 mt-1">Failed to load products. Please try again.</p>
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
        <p className="font-rubik font-semibold text-lg text-[#232321]">No products found</p>
        <p className="font-open-sans text-sm text-[#232321]/60 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
