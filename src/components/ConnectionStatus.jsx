import { useState, useEffect } from "react";

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm transition-colors duration-300 ${
        isOnline
          ? "bg-status-success/10 text-status-success border-status-success/20"
          : "bg-status-error/10 text-status-error border-status-error/20"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          isOnline ? "bg-status-success" : "bg-status-error"
        }`}
      />
      {isOnline ? "Online" : "Offline"}
    </div>
  );
}
