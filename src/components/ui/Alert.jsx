export default function Alert({ children, type = "error", className = "" }) {
  let variantClasses = "";

  // Using opacity modifiers with the semantic status colors to create the "soft" alert look
  // compatible with both light and dark modes.
  // In Tailwind 4, we can use color mixing or opacity.
  // Here we use the base status color with low opacity for background,
  // and the base status color for text/border but slightly adjusted if needed.

  if (type === "error") {
    variantClasses =
      "bg-status-error/10 text-status-error border-status-error/20";
  } else if (type === "success") {
    variantClasses =
      "bg-status-success/10 text-status-success border-status-success/20";
  } else if (type === "warning") {
    variantClasses =
      "bg-status-warning/10 text-status-warning border-status-warning/20";
  } else {
    // Default / Info
    variantClasses =
      "bg-surface-sunken text-content-secondary border-border-default";
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`rounded-2xl border p-4 transition-colors duration-300 ease-in-out ${variantClasses} ${className}`}
    >
      {children}
    </div>
  );
}
