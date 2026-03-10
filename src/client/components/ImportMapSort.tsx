import { useAtom } from "jotai";
import type { SortKey } from "../lib/types";
import { sortDirectionAtom, sortKeyAtom } from "../lib/utils";

/**
 * Sort controls for the import map tree.
 */
export function ImportMapSort() {
  const [sortKey, setSortKey] = useAtom(sortKeyAtom);
  const [sortDirection, setSortDirection] = useAtom(sortDirectionAtom);

  const handleSortChange = (nextSortKey: SortKey) => {
    if (nextSortKey === sortKey) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
      return;
    }

    setSortKey(nextSortKey);
    setSortDirection("asc");
  };

  return (
    <div className="mb-4">
      <span className="text-sm text-base-content/70 mr-4">Sort by</span>

      <button
        type="button"
        className={`btn btn-sm ${sortKey === "name" ? "btn-primary" : "btn-ghost"} rounded-sm`}
        onClick={() => handleSortChange("name")}
        aria-pressed={sortKey === "name"}
      >
        Name {sortKey === "name" ? (sortDirection === "asc" ? "↑" : "↓") : null}
      </button>

      <button
        type="button"
        className={`btn btn-sm ${sortKey === "count" ? "btn-primary" : "btn-ghost"} rounded-sm`}
        onClick={() => handleSortChange("count")}
        aria-pressed={sortKey === "count"}
      >
        Count{" "}
        {sortKey === "count" ? (sortDirection === "asc" ? "↑" : "↓") : null}
      </button>
    </div>
  );
}
