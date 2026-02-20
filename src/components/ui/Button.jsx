import Link from "next/link";

/**
 * Reusable button component matching the KICKS design system.
 *
 * @param {React.ReactNode} children
 * @param {"dark"|"blue"|"outline"} variant - Button style
 * @param {"sm"|"md"|"lg"} size - Button size
 * @param {string} href - If provided, renders as a Next.js Link
 * @param {string} className - Additional class names
 * @param {object} props - Other native button/link props
 */
export default function Button({
  children,
  variant = "dark",
  size = "md",
  href,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-rubik font-medium uppercase tracking-wider rounded-lg transition-colors";

  const variants = {
    dark: "bg-[#232321] text-white hover:bg-[#1a1a18]",
    blue: "bg-[#4a69e2] text-white hover:opacity-90",
    outline: "border border-[#232321] text-[#232321] hover:bg-[#232321]/5",
  };

  const sizes = {
    sm: "h-10 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
