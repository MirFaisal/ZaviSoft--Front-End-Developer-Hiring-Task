"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ProductCardBranded } from "./";
import { NavArrows, SectionHeader } from "@/components/ui";

// Splits an array into groups of `size` for rendering one slide per group
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function YouMayAlsoLike({ products = [], title = "You may also like", className = "" }) {
  // emblaRef  — attach to the scroll container DOM node
  // emblaApi  — imperative API: scrollPrev, scrollNext, scrollTo, canScrollPrev, etc.
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", slidesToScroll: 1 });

  // selectedIndex — tracks the active dot indicator
  const [selectedIndex, setSelectedIndex] = useState(0);
  // scrollSnaps — array of snap positions used to render the dot indicators
  const [scrollSnaps, setScrollSnaps] = useState([]);
  // canScrollPrev / canScrollNext — controls the disabled state of NavArrows
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Called by Embla whenever the selected slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Initialise snap list and state on mount
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    // Subscribe to Embla events
    emblaApi.on("select", onSelect);  // fires on slide change
    emblaApi.on("reInit", onSelect);  // fires on resize / reInit
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (products.length === 0) return null;

  const chunks = chunkArray(products, 4);

  return (
    <section className={className}>
      <div className="flex flex-col gap-8 items-center">
        <SectionHeader
          title={title}
          className="w-full"
          action={
            <NavArrows
              onPrev={() => emblaApi?.scrollPrev()}
              onNext={() => emblaApi?.scrollNext()}
              canGoBack={canScrollPrev}
              canGoForward={canScrollNext}
              variant="dark"
            />
          }
        />

        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {chunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="flex-none w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                {chunk.map((product) => (
                  <ProductCardBranded key={product.id} product={product} badge="New" />
                ))}
              </div>
            ))}
          </div>
        </div>

        {scrollSnaps.length > 1 && (
          <div className="flex gap-1">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 w-10 rounded-lg transition-colors ${
                  i === selectedIndex ? "bg-kicks-blue" : "bg-kicks-dark/25"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
