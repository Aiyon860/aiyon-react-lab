export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-surface-raised border border-border-subtle text-content-primary shadow-sm rounded-2xl p-6 transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
}
