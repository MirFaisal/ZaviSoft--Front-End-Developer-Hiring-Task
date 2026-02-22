"use client";

import { CategoryCard, Spinner, PageHeader, Button } from "@/components";
import { useGetCategoriesQuery } from "@/store";

export default function CategoriesClient() {
  const { data: categories, isLoading, error, refetch } = useGetCategoriesQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-kicks-bg">
        <PageHeader
          title="Shop by Category"
          description="Browse our product categories to find exactly what you need"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
        />

        <div className="max-w-360 mx-auto px-4 lg:px-15 py-8 lg:py-12">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="font-rubik font-semibold text-lg text-kicks-dark">Something went wrong</p>
              <p className="font-open-sans text-sm text-kicks-dark/60 mt-1">
                Failed to load categories. Please try again.
              </p>
              <Button variant="dark" size="sm" onClick={refetch} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : !categories || categories.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-rubik font-semibold text-lg text-kicks-dark">No categories found</p>
              <p className="font-open-sans text-sm text-kicks-dark/60 mt-1">
                There are no product categories available at the moment.
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
