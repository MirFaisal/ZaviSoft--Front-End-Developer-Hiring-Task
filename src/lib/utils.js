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
 * Validate a single image URL string.
 * Returns the URL if valid, otherwise the placeholder.
 * @param {string} url - Single image URL
 * @param {string} placeholder - Fallback URL
 * @returns {string}
 */
export function getValidImageUrl(
  url,
  placeholder = "https://placehold.co/400x400/e2e8f0/475569?text=Product",
) {
  if (
    !url ||
    typeof url !== "string" ||
    url.includes("[") ||
    url.includes("any") ||
    !url.startsWith("http")
  ) {
    return placeholder;
  }
  return url;
}

/**
 * Get the first valid image from an images array.
 * @param {string[]} images - Array of image URLs
 * @param {string} placeholder - Fallback URL
 * @returns {string}
 */
export function getFirstValidImage(
  images,
  placeholder = "https://placehold.co/400x400/e2e8f0/475569?text=Product",
) {
  if (!images || !Array.isArray(images) || images.length === 0) return placeholder;
  return getValidImageUrl(images[0], placeholder);
}

/**
 * Get N valid images from an array, padded to `count` by repeating the last valid image.
 * @param {string[]} images - Array of image URLs
 * @param {number} count - Number of images to return
 * @param {string} placeholder - Fallback URL
 * @returns {string[]}
 */
export function getValidImages(
  images,
  count = 4,
  placeholder = "https://placehold.co/600x600/e2e8f0/475569?text=Product",
) {
  if (!images || images.length === 0) return Array(count).fill(placeholder);
  const valid = images.map((img) => getValidImageUrl(img, placeholder));
  while (valid.length < count) valid.push(valid[valid.length - 1]);
  return valid.slice(0, count);
}
