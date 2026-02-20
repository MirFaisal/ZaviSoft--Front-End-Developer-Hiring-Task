"use client";

import { CategoryCard, Spinner, PageHeader } from "@/components";
import { useGetCategoriesQuery } from "@/store";

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        <PageHeader
          title="Shop by Category"
          description="Browse our product categories to find exactly what you need"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
        />

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
    </div>
  );
}
