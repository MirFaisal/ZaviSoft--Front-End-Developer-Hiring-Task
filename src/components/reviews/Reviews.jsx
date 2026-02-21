import Link from "next/link";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    id: 1,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5,
    avatar: "/images/review-avatar-1.png",
    productImage: "/images/review-product-1.png",
  },
  {
    id: 2,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5,
    avatar: "/images/review-avatar-2.png",
    productImage: "/images/review-product-2.png",
  },
  {
    id: 3,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5,
    avatar: "/images/review-avatar-3.png",
    productImage: "/images/review-product-3.png",
  },
];

export default function Reviews() {
  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8 lg:mb-12">
        <h2 className="font-rubik font-semibold text-3xl lg:text-[74px] text-kicks-dark uppercase leading-[0.95]">
          Reviews
        </h2>
        <Link
          href="#"
          className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-kicks-blue font-rubik font-medium text-sm text-white uppercase tracking-wider hover:opacity-90 transition-colors">
          See all
        </Link>
      </div>

      {/* Review cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </section>
  );
}
