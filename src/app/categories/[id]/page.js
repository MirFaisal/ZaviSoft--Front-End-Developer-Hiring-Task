"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ProductGrid, Spinner } from "@/components";
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
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
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
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-2 text-sm mb-4">
              <Link href="/" className="text-gray-500 hover:text-indigo-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/categories" className="text-gray-500 hover:text-indigo-600">
                Categories
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{category?.name || "Loading..."}</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">{category?.name || "Loading..."}</h1>
            <p className="mt-2 text-gray-600">Browse all products in {category?.name || "this category"}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Results info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing page {page + 1}
                {isFetching && <span className="ml-2 text-indigo-600">Loading...</span>}
              </p>
            </div>

            {/* Products */}
            <ProductGrid products={products} isLoading={isLoading} error={error} />

            {/* Pagination */}
            {products && products.length > 0 && (
              <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 0}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  ← Previous
                </button>
                <span className="text-gray-600">Page {page + 1}</span>
                <button
                  onClick={handleNextPage}
                  disabled={products.length < PRODUCTS_PER_PAGE}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
