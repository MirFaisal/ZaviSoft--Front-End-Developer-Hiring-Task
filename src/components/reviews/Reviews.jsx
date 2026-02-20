"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "@/store";
import { Spinner } from "@/components/ui";

const PLACEHOLDER = "https://placehold.co/400x400/e2e8f0/475569?text=Product";

const getValidImage = (images) => {
  if (!images || images.length === 0) return PLACEHOLDER;
  const img = images[0];
  if (!img || typeof img !== "string" || img.includes("[") || img.includes("any") || !img.startsWith("http")) {
    return PLACEHOLDER;
  }
  return img;
};

// Review text templates to pair with actual products
const reviewTemplates = [
  {
    title: "Great Quality",
    text: "Amazing product! The quality exceeded my expectations.",
    rating: 5,
  },
  {
    title: "Highly Recommend",
    text: "I love this product. Great value for the price.",
    rating: 5,
  },
  {
    title: "Excellent Purchase",
    text: "Fantastic quality and fast delivery. Will buy again!",
    rating: 4,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: rating }).map((_, i) => (
          <Image
            key={i}
            src="/icons/star.svg"
            alt=""
            width={24}
            height={24}
          />
        ))}
      </div>
      <span className="font-open-sans font-semibold text-base text-[#232321]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function Reviews() {
  // Fetch products offset by some amount to show different ones from NewDrops
  const { data: products, isLoading } = useGetProductsQuery({ offset: 5, limit: 3 });

  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8 lg:mb-12">
        <h2 className="font-rubik font-semibold text-3xl lg:text-[74px] text-[#232321] uppercase leading-[0.95]">
          Reviews
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-[#232321] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors">
          See all
        </Link>
      </div>

      {/* Review cards grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(products || []).map((product, index) => {
            const review = reviewTemplates[index % reviewTemplates.length];
            const productImage = getValidImage(product.images);
            const categoryImage = product.category?.image;
            const avatarUrl = categoryImage && categoryImage.startsWith("http") && !categoryImage.includes("[")
              ? categoryImage
              : `https://placehold.co/64x64/4a69e2/ffffff?text=${product.title?.charAt(0) || "U"}`;

            return (
              <Link key={product.id} href={`/products/${product.id}`} className="flex flex-col group">
                {/* Review text card */}
                <div className="bg-[#fafafa] rounded-t-4xl p-6 lg:p-8 flex flex-col gap-2">
                  <div className="flex gap-2 items-start justify-between">
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="font-rubik font-semibold text-2xl text-[#232321]">
                        {review.title}
                      </h3>
                      <p className="font-open-sans text-base text-[#232321] opacity-80">
                        {review.text}
                      </p>
                    </div>
                    <div className="shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={avatarUrl}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="object-cover size-full"
                        unoptimized
                      />
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                {/* Product image */}
                <div className="bg-white rounded-b-4xl overflow-hidden h-[250px] lg:h-[325px] relative">
                  <Image
                    src={productImage}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
