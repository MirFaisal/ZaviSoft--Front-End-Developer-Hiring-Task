"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ProductGrid, PageHeader, Pagination } from "@/components";
import { useGetProductsByCategoryQuery, useGetCategoriesQuery } from "@/store";

const PRODUCTS_PER_PAGE = 12;

export default function CategoryPage({ params }) {
  const { id } = use(params);
  const [page, setPage] = useState(0);

  const { data: categories } = useGetCategoriesQuery();
  const category = categories?.find((c) => c.id === Number(id));

  const {
    data: products,
    isLoading,
    error,
    isFetching,
  } = useGetProductsByCategoryQuery({
    categoryId: id,
    offset: page * PRODUCTS_PER_PAGE,
    limit: PRODUCTS_PER_PAGE,
  });

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!category && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <Link
              href="/categories"
              className="inline-block bg-[#232321] text-white px-6 py-3 rounded-lg hover:bg-[#1a1a18] transition-colors font-rubik font-medium text-sm uppercase tracking-wider">
              Browse Categories
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        <PageHeader
          title={category?.name || "Loading..."}
          description={`Browse all products in ${category?.name || "this category"}`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category?.name || "Loading..." },
          ]}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Results info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing page {page + 1}
                {isFetching && <span className="ml-2 text-[#4a69e2]">Loading...</span>}
              </p>
            </div>

            {/* Products */}
            <ProductGrid products={products} isLoading={isLoading} error={error} />

            {/* Pagination */}
            {products && products.length > 0 && (
              <Pagination
                page={page}
                hasMore={products.length >= PRODUCTS_PER_PAGE}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
