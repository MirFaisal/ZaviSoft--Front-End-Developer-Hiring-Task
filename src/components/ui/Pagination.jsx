/**
 * Reusable pagination with Previous/Next buttons.
 * @param {number} page - Current page index (0-based)
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {Function} onPrev - Called when "Previous" is clicked
 * @param {Function} onNext - Called when "Next" is clicked
 */
export default function Pagination({ page, hasMore, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-[#e7e7e3]">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="h-10 px-5 rounded-lg bg-white border border-[#e7e7e3] text-[#232321] font-rubik font-medium text-sm uppercase tracking-wider hover:bg-[#e7e7e3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
        ← Previous
      </button>
      <span className="font-rubik font-semibold text-sm text-[#232321]">
        Page {page + 1}
      </span>
      <button
        onClick={onNext}
        disabled={!hasMore}
        className="h-10 px-5 rounded-lg bg-[#232321] text-white font-rubik font-medium text-sm uppercase tracking-wider hover:bg-[#1a1a18] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
        Next →
      </button>
    </div>
  );
}
