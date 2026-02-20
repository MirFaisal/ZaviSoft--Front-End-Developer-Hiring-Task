"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Header, Footer, Cart, CategoryCard, Spinner } from "@/components";
import { useGetCategoriesQuery, initializeCart } from "@/store";

export default function CategoriesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const { data: categories, isLoading, error } = useGetCategoriesQuery();

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
              <span className="text-gray-900">Categories</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">Shop by Category</h1>
            <p className="mt-2 text-gray-600">Browse our product categories to find exactly what you need</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Failed to load categories. Please try again.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
