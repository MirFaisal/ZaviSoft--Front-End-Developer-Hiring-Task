/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis if needed
 */
export function truncateText(text, maxLength = 50) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Get valid image URL or placeholder
 * @param {string|string[]} images - Image URL or array of URLs
 * @param {string} placeholder - Placeholder URL
 * @returns {string} Valid image URL
 */
export function getValidImageUrl(images, placeholder = "https://placehold.co/400x400") {
  const imageUrl = Array.isArray(images) ? images[0] : images;

  if (!imageUrl || imageUrl.includes("[") || imageUrl.includes("any")) {
    return placeholder;
  }

  return imageUrl;
}

/**
 * Generate pagination array
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {Array} Array of page numbers and ellipsis
 */
export function generatePagination(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Class names utility (simple cn function)
 * @param  {...string} classes - Class names to join
 * @returns {string} Joined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
