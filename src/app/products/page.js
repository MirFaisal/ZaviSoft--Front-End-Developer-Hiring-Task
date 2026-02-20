"use client";

import { useState } from "react";
import { ProductGrid, PageHeader, Pagination } from "@/components";
import { useGetProductsQuery, useGetCategoriesQuery } from "@/store";

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    data: products,
    isLoading,
    error,
    isFetching,
  } = useGetProductsQuery({
    offset: page * PRODUCTS_PER_PAGE,
    limit: PRODUCTS_PER_PAGE,
  });

  const { data: categories } = useGetCategoriesQuery();

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 bg-gray-50">
        <PageHeader
          title="All Products"
          description="Browse our collection of quality products"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !selectedCategory
                          ? "bg-[#4a69e2]/10 text-[#4a69e2]"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}>
                      All Categories
                    </button>
                  </li>
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? "bg-[#4a69e2]/10 text-[#4a69e2]"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}>
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
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
          </div>
        </div>
      </main>
    </div>
  );
}
