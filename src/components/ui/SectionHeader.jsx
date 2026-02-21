/**
 * Reusable section header with a large title and optional right-side action.
 * @param {string} title - Section title
 * @param {React.ReactNode} action - Right-side element (button, link, NavArrows, etc.)
 * @param {string} className - Additional class names
 */
export default function SectionHeader({ title, action, className = "" }) {
  return (
    <div className={`flex items-end justify-between ${className}`}>
      <h2 className="font-rubik font-semibold text-2xl lg:text-5xl text-kicks-dark uppercase">
        {title}
      </h2>
      {action && <div>{action}</div>}
    </div>
  );
}
