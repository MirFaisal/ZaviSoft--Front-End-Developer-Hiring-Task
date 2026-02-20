/**
 * Reusable pagination with Previous/Next buttons.
 * @param {number} page - Current page index (0-based)
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {Function} onPrev - Called when "Previous" is clicked
 * @param {Function} onNext - Called when "Next" is clicked
 */
export default function Pagination({ page, hasMore, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        ← Previous
      </button>
      <span className="text-gray-600">Page {page + 1}</span>
      <button
        onClick={onNext}
        disabled={!hasMore}
        className="px-4 py-2 rounded-lg bg-[#232321] text-white hover:bg-[#1a1a18] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Next →
      </button>
    </div>
  );
}
