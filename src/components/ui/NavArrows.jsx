"use client";

import Image from "next/image";

/**
 * Reusable prev/next navigation arrow buttons.
 * @param {Function} onPrev - Called when "previous" is clicked
 * @param {Function} onNext - Called when "next" is clicked
 * @param {boolean} canGoBack - Whether the back button is enabled
 * @param {boolean} canGoForward - Whether the forward button is enabled
 * @param {"dark"|"light"} variant - "dark" = dark bg + white icon, "light" = white bg + dark icon
 */
export default function NavArrows({ onPrev, onNext, canGoBack = true, canGoForward = true, variant = "dark" }) {
  const btnClass =
    variant === "dark"
      ? "bg-kicks-dark hover:bg-kicks-dark-hover"
      : "bg-white hover:bg-white/80";

  const iconClass = variant === "light" ? "invert" : "";

  return (
    <div className="flex gap-4 items-center">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoBack}
        className={`flex items-center justify-center py-2 px-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${btnClass}`}
        aria-label="Previous">
        <Image
          src="/icons/chevron-forward-white.svg"
          alt=""
          width={24}
          height={24}
          className={`rotate-180 ${iconClass}`}
        />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoForward}
        className={`flex items-center justify-center py-2 px-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${btnClass}`}
        aria-label="Next">
        <Image src="/icons/chevron-forward-white.svg" alt="" width={24} height={24} className={iconClass} />
      </button>
    </div>
  );
}
