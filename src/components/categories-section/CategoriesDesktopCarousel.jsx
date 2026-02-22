"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NavArrows } from "@/components/ui";
import { CategoryCardItem } from "@/components/categories";

export default function CategoriesDesktopCarousel({ categories }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", slidesToScroll: 1 });
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
    <div className="hidden lg:block">
      <div className="flex items-end justify-between px-15 pt-22.5 mb-12">
        <h2 className="font-rubik font-semibold text-[74px] text-white uppercase leading-[0.95]">
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

      <div className="pl-15 pb-0">
        <div className="overflow-hidden rounded-tl-[64px]" ref={emblaRef}>
          <div className="flex">
            {categories.map((category, index) => (
              <div key={category.id} className="flex-none w-1/2 h-150">
                <CategoryCardItem category={category} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
