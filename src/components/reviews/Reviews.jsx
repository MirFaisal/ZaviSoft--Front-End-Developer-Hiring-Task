import Image from "next/image";

const reviews = [
  {
    id: 1,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5,
    avatar: "/images/avatar-1.jpg",
    productImage: "/images/review-product-1.jpg",
  },
  {
    id: 2,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5,
    avatar: "/images/avatar-2.jpg",
    productImage: "/images/review-product-2.jpg",
  },
  {
    id: 3,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5,
    avatar: "/images/avatar-3.jpg",
    productImage: "/images/review-product-3.jpg",
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
  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8 lg:mb-12">
        <h2 className="font-rubik font-semibold text-3xl lg:text-[74px] text-[#232321] uppercase leading-[0.95]">
          Reviews
        </h2>
        <button
          type="button"
          className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-[#232321] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors">
          See all
        </button>
      </div>

      {/* Review cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col">
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
                    src={review.avatar}
                    alt="Reviewer"
                    width={64}
                    height={64}
                    className="object-cover size-full"
                  />
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            {/* Product image */}
            <div className="bg-white rounded-b-4xl overflow-hidden h-[250px] lg:h-[325px] relative">
              <Image
                src={review.productImage}
                alt="Product"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
