import type { AnalyzeResult } from "../lib/types";
import { formatFolderLabel, getUniqueSortedFiles } from "../lib/utils";
import { EntrySummary } from "./EntrySummary";
import { FileList } from "./FileList";
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
  const resultEntries = Object.entries(result).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <div className="flex flex-col gap-3">
      <SelectionBar selectedEntry={selectedEntry} />
      <ul className="menu menu-xs w-full rounded-box bg-base-200">
        {resultEntries.map(([moduleName, members]) => (
          <li key={moduleName}>
            <details>
              <EntrySummary
                type="package"
                className="font-medium"
                entryName={moduleName}
                label={formatFolderLabel(
                  moduleName,
                  Object.keys(members).length,
                )}
                onSelect={onSelectEntry}
              />
              <ul>
                {Object.entries(members)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([memberName, files]) => (
                    <li key={`${moduleName}-${memberName}`}>
                      <details>
                        <EntrySummary
                          type="folder"
                          className=""
                          entryName={memberName}
                          label={formatFolderLabel(
                            memberName,
                            getUniqueSortedFiles(files).length,
                          )}
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
