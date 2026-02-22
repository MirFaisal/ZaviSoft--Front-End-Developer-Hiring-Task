"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
// embla-carousel-react — headless slider, provides the scroll container ref and imperative API
import useEmblaCarousel from "embla-carousel-react";
import { useGetCategoriesQuery } from "@/store";
import { Spinner, NavArrows, Button } from "@/components/ui";
import { CategoryCardItem } from "@/components/categories";

export default function CategoriesSection() {
  const { data: rawCategories, isLoading, error, refetch } = useGetCategoriesQuery();

  // Filter out test/junk categories, keep even number (max 6)
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
    }).slice(0, 6)

  // Pair categories into slides — memoised so children are stable when the data hasn't changed
  const slides = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < allCategories.length; i += 2) {
      pairs.push(allCategories.slice(i, i + 2));
    }
    return pairs;
  }, [allCategories]);

  // emblaRef  — attach to the scroll container DOM node
  // emblaApi  — imperative API: scrollPrev, scrollNext, canScrollPrev, etc.
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", slidesToScroll: 1 });

  // canScrollPrev / canScrollNext — controls the disabled state of NavArrows
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Called by Embla whenever the selected slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    // Subscribe to Embla events
    emblaApi.on("select", onSelect); // fires on slide change
    emblaApi.on("reInit", onSelect); // fires on resize / reInit
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-kicks-dark lg:mx-10 xl:mx-15">
      <div className="w-full mx-auto px-4 lg:px-15 pt-6 lg:pt-22.5">
        <div className="flex items-end justify-between mb-6 lg:mb-12">
          <h2 className="font-rubik font-semibold text-2xl lg:text-[74px] text-white uppercase leading-normal lg:leading-[0.95]">
            Categories
          </h2>

          <NavArrows
            onPrev={() => emblaApi?.scrollPrev()}
            onNext={() => emblaApi?.scrollNext()}
            canGoBack={canScrollPrev}
            canGoForward={canScrollNext}
            variant="light"
          />
        </div>
      </div>

      <div className="w-full mx-auto pl-4 lg:pl-15 pb-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="font-rubik font-semibold text-white text-lg">Something went wrong</p>
            <p className="font-open-sans text-sm text-white/60">
              Could not load categories. Please try again later.
            </p>
            <Button variant="blue" size="sm" onClick={refetch} className="mt-2">
              Try Again
            </Button>
          </div>
        ) : allCategories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-rubik font-semibold text-white/60">No categories available</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-tl-3xl lg:rounded-tl-[64px]" ref={emblaRef}>
            <div className="flex">
              {slides.map((pair, slideIndex) => (
                <div key={slideIndex} className="flex-none w-full flex flex-col lg:flex-row gap-0 lg:h-150">
                  {pair.map((category, index) => (
                    <CategoryCardItem key={category.id} category={category} index={index} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
