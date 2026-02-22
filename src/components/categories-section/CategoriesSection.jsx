"use client";

import { useGetCategoriesQuery } from "@/store";
import { Spinner, Button } from "@/components/ui";
import CategoriesMobileCarousel from "./CategoriesMobileCarousel";
import CategoriesDesktopCarousel from "./CategoriesDesktopCarousel";

export default function CategoriesSection() {
  const { data: rawCategories, isLoading, error, refetch } = useGetCategoriesQuery();

  const allCategories = (rawCategories || [])
    .filter((cat) => {
      const name = (cat.name || "").toLowerCase();
      return (
        !name.includes("test") &&
        !name.includes("timestamp") &&
        !name.includes("{{") &&
        !name.includes("new category") &&
        name.length > 0
      );
    }).slice(0, 6);

  if (isLoading) {
    return (
      <section className="bg-kicks-dark lg:mx-10 xl:mx-15 flex items-center justify-center py-20">
        <Spinner size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-kicks-dark lg:mx-10 xl:mx-15 flex flex-col items-center justify-center py-20 gap-3">
        <p className="font-rubik font-semibold text-white text-lg">Something went wrong</p>
        <p className="font-open-sans text-sm text-white/60">
          Could not load categories. Please try again later.
        </p>
        <Button variant="blue" size="sm" onClick={refetch} className="mt-2">
          Try Again
        </Button>
      </section>
    );
  }

  if (allCategories.length === 0) {
    return (
      <section className="bg-kicks-dark lg:mx-10 xl:mx-15 flex items-center justify-center py-20">
        <p className="font-rubik font-semibold text-white/60">No categories available</p>
      </section>
    );
  }

  return (
    <section className="bg-kicks-dark lg:mx-10 xl:mx-15">
      <CategoriesMobileCarousel categories={allCategories} />
      <CategoriesDesktopCarousel categories={allCategories} />
    </section>
  );
}
