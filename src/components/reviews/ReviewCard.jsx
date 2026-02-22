import Image from "next/image";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: rating }).map((_, i) => (
          <Image
            key={i}
            src="/icons/star-gold.svg"
            alt=""
            width={24}
            height={24}
          />
        ))}
      </div>
      <span className="font-open-sans font-semibold text-base text-kicks-dark">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ReviewCard({ title, text, rating, avatar, productImage }) {
  return (
    <div className="flex flex-col">
      {/* Review text card */}
      <div className="bg-kicks-card rounded-t-4xl p-6 lg:p-8 flex flex-col gap-2">
        <div className="flex gap-2 items-start justify-between">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-rubik font-semibold text-2xl text-kicks-dark leading-normal">
              {title}
            </h3>
            <p className="font-open-sans text-base text-kicks-dark opacity-80 leading-normal">
              {text}
            </p>
          </div>
          <div className="shrink-0 w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt="Reviewer"
              width={64}
              height={64}
              className="object-cover size-full"
            />
          </div>
        </div>
        <StarRating rating={rating} />
      </div>

      {/* Product image */}
      <div className="bg-white rounded-b-4xl overflow-hidden h-62.5 lg:h-81.25 relative">
        <Image
          src={productImage}
          alt="Product"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
