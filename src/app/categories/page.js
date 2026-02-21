"use client";

import { CategoryCard, Spinner, PageHeader } from "@/components";
import { useGetCategoriesQuery } from "@/store";

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-[#e7e7e3]">
        <PageHeader
          title="Shop by Category"
          description="Browse our product categories to find exactly what you need"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
        />

        <div className="max-w-[1440px] mx-auto px-4 lg:px-[60px] py-8 lg:py-12">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="font-rubik font-semibold text-lg text-[#232321]">Something went wrong</p>
              <p className="font-open-sans text-sm text-[#232321]/60 mt-1">
                Failed to load categories. Please try again.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
