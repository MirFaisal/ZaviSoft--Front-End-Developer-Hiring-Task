export default function ProductCardSkeleton() {
  return (
    <div className="bg-kicks-card rounded-2xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-kicks-bg m-2 rounded-xl" />

      {/* Content skeleton */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title skeleton */}
        <div className="space-y-1.5">
          <div className="h-4 bg-kicks-bg rounded-md w-full" />
          <div className="h-4 bg-kicks-bg rounded-md w-3/4" />
        </div>

        {/* Price skeleton */}
        <div className="h-5 w-20 bg-kicks-bg rounded-md" />
      </div>
    </div>
  );
}
