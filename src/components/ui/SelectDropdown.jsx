/**
 * Reusable styled select dropdown.
 * Renders a visible label + chevron with an invisible native <select> overlay.
 *
 * @param {string} label - Visible label prefix
 * @param {*} value - Currently selected value
 * @param {function} onChange - Called with the numeric value on change
 * @param {React.ReactNode} children - <option> elements
 */
export default function SelectDropdown({ label, value, onChange, children }) {
  return (
    <div className="relative flex items-center gap-1 lg:gap-3 cursor-pointer">
      <label className="font-open-sans font-semibold text-sm lg:text-lg text-kicks-dark/80 leading-normal pointer-events-none select-none">
        {label} {value}
      </label>
      {/* chevron */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 pointer-events-none"
        aria-hidden="true"
      >
        <path d="M6 9L12 15L18 9" stroke="#232321" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* native select — invisible overlay for interaction */}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
      >
        {children}
      </select>
    </div>
  );
}
