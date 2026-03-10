import type { SortDirection, SortKey } from "../lib/types";

/**
 * Sort controls for the import map tree.
 *
 * @param sortKey - The active sort key.
 * @param sortDirection - The active sort direction.
 * @param onSortChange - The callback to update the sort key.
 */
export function ImportMapSort({
  sortKey,
  sortDirection,
  onSortChange,
}: {
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSortChange: (nextSortKey: SortKey) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-base-content/70">Sort by</span>
      <button
        type="button"
        className={`btn btn-sm ${sortKey === "name" ? "btn-primary" : "btn-ghost"}`}
        onClick={() => onSortChange("name")}
        aria-pressed={sortKey === "name"}
      >
        Name {sortKey === "name" ? (sortDirection === "asc" ? "↑" : "↓") : null}
      </button>
      <button
        type="button"
        className={`btn btn-sm ${sortKey === "count" ? "btn-primary" : "btn-ghost"}`}
        onClick={() => onSortChange("count")}
        aria-pressed={sortKey === "count"}
      >
        Count {sortKey === "count" ? (sortDirection === "asc" ? "↑" : "↓") : null}
      </button>
    </div>
  );
}