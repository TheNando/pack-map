import { useMemo, useState } from "react";
import type { AnalyzeResult, SortDirection, SortKey } from "../lib/types";
import { filterResultEntries, formatFolderLabel } from "../lib/utils";
import { EntrySummary } from "./EntrySummary";
import { FileList } from "./FileList";
import { ImportMapFilter } from "./ImportMapFilter";
import { ImportMapSort } from "./ImportMapSort";
import { SelectionBar } from "./SelectionBar";

/**
 * A tree view of the import map result.
 *
 * @param result - The import map result.
 * @param selectedEntry - The selected entry.
 * @param onSelectEntry - The callback to invoke when an entry is selected.
 */
export function ImportMapTree({
  result,
  selectedEntry,
  onSelectEntry,
}: {
  result: AnalyzeResult;
  selectedEntry: string;
  onSelectEntry: (entryName: string) => void;
}) {
  const [filterText, setFilterText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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

  const resultEntries = useMemo(
    () => filterResultEntries(result, filterText, sortKey, sortDirection),
    [filterText, result, sortDirection, sortKey],
  );

  return (
    <div className="flex flex-col gap-3">
      <SelectionBar selectedEntry={selectedEntry} />
      <ImportMapFilter
        filterText={filterText}
        onFilterTextChange={setFilterText}
      />
      <ImportMapSort
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
      <ul className="menu menu-xs w-full rounded-box bg-base-200">
        {resultEntries.map(([moduleName, members]) => (
          <li key={moduleName}>
            <details>
              <EntrySummary
                type="package"
                className="font-medium"
                entryName={moduleName}
                label={formatFolderLabel(moduleName, members.length)}
                onSelect={onSelectEntry}
              />
              <ul>
                {members.map(([memberName, files]) => (
                  <li key={`${moduleName}-${memberName}`}>
                    <details>
                      <EntrySummary
                        type="folder"
                        className=""
                        entryName={memberName}
                        label={formatFolderLabel(memberName, files.length)}
                        onSelect={onSelectEntry}
                      />
                      <FileList files={files} onSelect={onSelectEntry} />
                    </details>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
