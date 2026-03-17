export default function Skeleton({ lines = 3, className = "", items = null }) {
  let skeletonItems;

  // Using bg-border-default (Slate 300 light / Slate 700 dark)
  // This provides sufficient contrast on both 'base' and 'raised' surfaces
  // in both light and dark modes.
  const baseClass = "bg-border-default animate-pulse rounded";

  if (items && Array.isArray(items)) {
    skeletonItems = items.map((item, i) => (
      <div
        key={i}
        className={`${baseClass} ${item.height || "h-4"} ${item.width || "w-full"} ${item.className || ""}`}
      />
    ));
  } else {
    skeletonItems = Array.from({ length: lines }, (_, i) => (
      <div
        key={i}
        className={`${baseClass} h-4 ${i === 0 ? "w-40" : i === 1 ? "w-24" : "w-28"}`}
      />
    ));
  }

  return (
    <div role="status" aria-busy="true" className={`space-y-3 ${className}`}>
      {skeletonItems}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
