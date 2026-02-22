"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NavArrows } from "@/components/ui";
import { CategoryCardItem } from "@/components/categories";

export default function CategoriesMobileCarousel({ categories }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", align: "start", slidesToScroll: 1, watchDrag: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="lg:hidden">
      <div className="flex items-end justify-between px-4 pt-6 mb-6">
        <h2 className="font-rubik font-semibold text-2xl text-white uppercase leading-normal">
          Categories
        </h2>
        <NavArrows
          onPrev={() => emblaApi?.scrollPrev()}
          onNext={() => emblaApi?.scrollNext()}
          canGoBack={canPrev}
          canGoForward={canNext}
          variant="light"
        />
      </div>

      <div className="pl-4 pb-0">
        <div className="overflow-hidden rounded-tl-3xl h-192" ref={emblaRef}>
          <div className="flex flex-col h-full">
            {categories.map((category, index) => (
              <div key={category.id} className="flex-none w-full h-96">
                <CategoryCardItem category={category} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
