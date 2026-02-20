"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header, Footer, Cart, ProductGrid } from "@/components";
import { useGetProductsQuery, useGetCategoriesQuery, initializeCart } from "@/store";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Initialize cart
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <Cart />

      <main className="flex-1 bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-2 text-sm mb-4">
              <Link href="/" className="text-gray-500 hover:text-indigo-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Products</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="mt-2 text-gray-600">Browse our collection of quality products</p>
          </div>
        </div>

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
                          ? "bg-indigo-100 text-indigo-700"
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
                            ? "bg-indigo-100 text-indigo-700"
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
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                      ← Previous
                    </button>
                    <span className="text-gray-600">Page {page + 1}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={products.length < PRODUCTS_PER_PAGE}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                      Next →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
