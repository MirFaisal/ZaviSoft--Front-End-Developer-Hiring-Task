"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ProductCardBranded } from "./";
import { NavArrows, SectionHeader } from "@/components/ui";

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function YouMayAlsoLike({ products = [], title = "You may also like", className = "" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", slidesToScroll: 1 });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
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
