export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category skeleton */}
        <div className="h-3 w-16 bg-gray-200 rounded" />

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Price skeleton */}
        <div className="h-6 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
