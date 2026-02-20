import Link from "next/link";

/**
 * Reusable breadcrumb navigation.
 * @param {Array<{label: string, href?: string}>} items - Breadcrumb items. Last item has no href.
 */
export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-gray-400">/</span>}
          {item.href ? (
            <Link href={item.href} className="text-gray-500 hover:text-[#4a69e2] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
