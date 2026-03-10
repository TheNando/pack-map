import LoadingIcon from "../assets/LoadingIcon";

/**
 * A loading spinner.
 */
export function LoadingSpinner() {
  return (
    <div
      className="rounded-box bg-base-200 px-4 py-3 text-sm text-base-content/70"
      role="status"
      aria-live="polite"
    >
      <span className="flex items-center gap-2">
        <LoadingIcon />
        Loading import map...
      </span>
    </div>
  );
}
