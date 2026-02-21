import Link from "next/link";

/**
 * Reusable breadcrumb navigation.
 * @param {Array<{label: string, href?: string}>} items - Breadcrumb items. Last item has no href.
 */
export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 font-open-sans text-sm mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-kicks-dark/30">/</span>}
          {item.href ? (
            <Link href={item.href} className="text-kicks-dark/50 hover:text-kicks-blue transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-kicks-dark font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
