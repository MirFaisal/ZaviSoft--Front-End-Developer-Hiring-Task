"use client";

import { useState } from "react";
import { ProductCardBranded } from "./";
import { NavArrows, SectionHeader } from "@/components/ui";

const ITEMS_PER_PAGE = 4;

export default function YouMayAlsoLike({ products = [], title = "You may also like", className = "" }) {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE) || 1;
  const visible = products.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  if (products.length === 0) return null;

  return (
    <section className={className}>
      <div className="flex flex-col gap-8 items-center">
        <SectionHeader
          title={title}
          className="w-full"
          action={
            <NavArrows
              onPrev={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              canGoBack={page > 0}
              canGoForward={page < pageCount - 1}
              variant="dark"
            />
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {visible.map((product) => (
            <ProductCardBranded key={product.id} product={product} badge="New" />
          ))}
        </div>

        <div className="flex gap-1">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 w-10 rounded-lg transition-colors ${
                i === page ? "bg-kicks-blue" : "bg-kicks-dark/25"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
