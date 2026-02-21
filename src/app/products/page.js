"use client";

import { useState } from "react";
import { ProductGrid, PageHeader, Pagination } from "@/components";
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from "@/store";

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch all products (skip when a category is selected)
  const {
    data: allProducts,
    isLoading: allLoading,
    error: allError,
    isFetching: allFetching,
  } = useGetProductsQuery(
    { offset: page * PRODUCTS_PER_PAGE, limit: PRODUCTS_PER_PAGE },
    { skip: selectedCategory !== null },
  );

  // Fetch category-specific products (skip when no category is selected)
  const {
    data: categoryProducts,
    isLoading: catLoading,
    error: catError,
    isFetching: catFetching,
  } = useGetProductsByCategoryQuery(
    {
      categoryId: selectedCategory,
      offset: page * PRODUCTS_PER_PAGE,
      limit: PRODUCTS_PER_PAGE,
    },
    { skip: selectedCategory === null },
  );

  const { data: categories } = useGetCategoriesQuery();

  // Pick the active dataset
  const products = selectedCategory ? categoryProducts : allProducts;
  const isLoading = selectedCategory ? catLoading : allLoading;
  const error = selectedCategory ? catError : allError;
  const isFetching = selectedCategory ? catFetching : allFetching;

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(0); // reset to first page on category change
  };

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
      <main className="flex-1 bg-[#e7e7e3]">
        <PageHeader
          title="All Products"
          description="Browse our collection of quality products"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        />

        <div className="max-w-360 mx-auto px-4 lg:px-[60px] py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-[#fafafa] rounded-2xl p-6 sticky top-[100px]">
                <h2 className="font-rubik font-semibold text-[#232321] uppercase text-sm tracking-wider mb-4">
                  Categories
                </h2>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors font-rubik text-sm cursor-pointer ${
                        !selectedCategory
                          ? "bg-[#4a69e2] text-white font-semibold"
                          : "text-[#232321]/70 hover:bg-[#e7e7e3]"
                      }`}>
                      All Categories
                    </button>
                  </li>
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors font-rubik text-sm cursor-pointer ${
                          selectedCategory === category.id
                            ? "bg-[#4a69e2] text-white font-semibold"
                            : "text-[#232321]/70 hover:bg-[#e7e7e3]"
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
              {/* Results info */}
              <div className="flex items-center justify-between mb-6">
                <p className="font-open-sans text-sm text-[#232321]/60">
                  Showing page {page + 1}
                  {isFetching && (
                    <span className="ml-2 text-[#4a69e2] font-rubik font-medium">Loading...</span>
                  )}
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
      </main>
    </div>
  );
}
