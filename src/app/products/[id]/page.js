"use client";

import { use } from "react";
import Link from "next/link";
import { Spinner, ImageSlider } from "@/components/ui";
import { YouMayAlsoLike, ProductImageGrid, ProductInfo } from "@/components/products";
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from "@/store";
import { getValidImages } from "@/lib/utils";

const PLACEHOLDER = "https://placehold.co/600x600/e2e8f0/475569?text=Product";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const { data: categoryProducts } = useGetProductsByCategoryQuery(
    { categoryId: product?.category?.id, offset: 0, limit: 20 },
    { skip: !product?.category?.id },
  );

  // Related products = same category, excluding current product
  const relatedProducts = (categoryProducts || []).filter((p) => p.id !== Number(id)).slice(0, 16);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <Spinner size="lg" />
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-rubik font-semibold text-2xl text-kicks-dark mb-4">Product Not Found</h1>
            <p className="text-kicks-dark/60 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/products"
              className="inline-block bg-kicks-dark text-white px-6 py-3 rounded-lg hover:bg-kicks-dark-hover transition-colors font-rubik font-medium text-sm uppercase tracking-wider">
              Browse Products
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const imgs = getValidImages(product.images, 4, PLACEHOLDER);

  return (
    <div className="min-h-screen flex flex-col bg-kicks-bg">
      <main className="flex-1">
        {/* ─── Product Section ─── */}
        <section className="max-w-[1440px] mx-auto px-4 lg:px-[60px] pt-6 lg:pt-8 pb-12 lg:pb-20">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ─── Images ─── */}
            <div className="w-full lg:w-[80%]">
              {/* Mobile: Hero image + thumbnails */}
              <ImageSlider images={imgs} alt={product.title} className="lg:hidden" />

              {/* Desktop: 2×2 Grid */}
              <ProductImageGrid images={imgs} alt={product.title} />
            </div>

            {/* ─── Product Info ─── */}
            <ProductInfo product={product} />
          </div>
        </section>

        {/* ─── You may also like ─── */}
        <YouMayAlsoLike
          products={relatedProducts}
          className="max-w-[1440px] mx-auto px-4 lg:px-[60px] pb-12 lg:pb-20"
        />
      </main>
    </div>
  );
}
