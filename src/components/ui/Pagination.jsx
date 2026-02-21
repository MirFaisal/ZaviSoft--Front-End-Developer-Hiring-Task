/**
 * Reusable pagination with Previous/Next buttons.
 * @param {number} page - Current page index (0-based)
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {Function} onPrev - Called when "Previous" is clicked
 * @param {Function} onNext - Called when "Next" is clicked
 */
export default function Pagination({ page, hasMore, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-kicks-bg">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="h-10 px-5 rounded-lg bg-white border border-kicks-bg text-kicks-dark font-rubik font-medium text-sm uppercase tracking-wider hover:bg-kicks-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
        ← Previous
      </button>
      <span className="font-rubik font-semibold text-sm text-kicks-dark">
        Page {page + 1}
      </span>
      <button
        onClick={onNext}
        disabled={!hasMore}
        className="h-10 px-5 rounded-lg bg-kicks-dark text-white font-rubik font-medium text-sm uppercase tracking-wider hover:bg-kicks-dark-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
        Next →
      </button>
    </div>
  );
}
