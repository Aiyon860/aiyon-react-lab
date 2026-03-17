export default function Button({
  children,
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) {
  const baseClasses =
    "px-3 py-1.5 text-sm font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base transition-all duration-200 ease-in-out";

  let variantClasses = "";
  const disabledClasses =
    "bg-surface-sunken text-content-tertiary cursor-not-allowed border border-transparent";

  if (variant === "primary") {
    variantClasses = disabled
      ? disabledClasses
      : "bg-brand-primary text-brand-text hover:bg-brand-hover focus-visible:ring-brand-primary shadow-sm";
  } else if (variant === "secondary") {
    variantClasses = disabled
      ? disabledClasses
      : "bg-surface-base text-content-primary border border-border-default shadow-sm hover:bg-surface-sunken hover:border-border-strong focus-visible:ring-border-strong";
  } else if (variant === "danger") {
    variantClasses = disabled
      ? disabledClasses
      : "bg-status-error text-white hover:opacity-90 focus-visible:ring-status-error shadow-sm";
  } else if (variant === "success") {
    variantClasses = disabled
      ? disabledClasses
      : "bg-status-success text-white hover:opacity-90 focus-visible:ring-status-success shadow-sm";
  } else if (variant === "warning") {
    variantClasses = disabled
      ? disabledClasses
      : "bg-status-warning text-white hover:opacity-90 focus-visible:ring-status-warning shadow-sm";
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
