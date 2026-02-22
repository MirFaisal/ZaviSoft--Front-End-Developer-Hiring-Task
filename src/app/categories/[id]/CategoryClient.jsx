"use client";

import { use, useState } from "react";
import { ProductGrid, PageHeader, Pagination, Button } from "@/components";
import { useGetProductsByCategoryQuery, useGetCategoriesQuery } from "@/store";

const PRODUCTS_PER_PAGE = 12;

export default function CategoryClient({ params }) {
  const { id } = use(params);
  const [page, setPage] = useState(0);

  const { data: categories } = useGetCategoriesQuery();
  const category = categories?.find((c) => c.id === Number(id));

  const {
    data: products,
    isLoading,
    error,
    isFetching,
    refetch,
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
        <main className="flex-1 bg-kicks-bg flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-rubik font-semibold text-2xl text-kicks-dark mb-4 uppercase">
              Category Not Found
            </h1>
            <Button variant="dark" size="md" href="/categories">
              Browse Categories
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-kicks-bg">
        <PageHeader
          title={category?.name || "Loading..."}
          description={`Browse all products in ${category?.name || "this category"}`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category?.name || "Loading..." },
          ]}
        />

        <div className="max-w-360 mx-auto px-4 lg:px-15 py-8 lg:py-12">
          {/* Results info */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-open-sans text-sm text-kicks-dark/60">
              Showing page {page + 1}
              {isFetching && <span className="ml-2 text-kicks-blue font-rubik font-medium">Loading...</span>}
            </p>
          </div>

          {/* Products */}
          <ProductGrid products={products} isLoading={isLoading} error={error} onRetry={refetch} />

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
      </main>
    </div>
  );
}
