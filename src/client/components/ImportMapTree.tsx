import { useAtomValue } from "jotai";
import { useMemo } from "react";
import type { AnalyzeResult } from "../lib/types";
import {
  filterResultEntries,
  filterTextAtom,
  formatFolderLabel,
  sortDirectionAtom,
  sortKeyAtom,
} from "../lib/utils";
import { EntrySummary } from "./EntrySummary";
import { FileList } from "./FileList";
import { UtilityTabs } from "./UtilityTabs";

/**
 * A tree view of the import map result.
 *
 * @param result - The import map result.
 */
export function ImportMapTree({ result }: { result: AnalyzeResult }) {
  const filterText = useAtomValue(filterTextAtom);
  const sortKey = useAtomValue(sortKeyAtom);
  const sortDirection = useAtomValue(sortDirectionAtom);

  const resultEntries = useMemo(
    () => filterResultEntries(result, filterText, sortKey, sortDirection),
    [filterText, result, sortDirection, sortKey],
  );

  return (
    <div className="flex gap-3">
      <UtilityTabs />

      <ul className="menu menu-xs rounded-box bg-base-200">
        {resultEntries.map(([moduleName, members]) => (
          <li key={moduleName}>
            <details>
              <EntrySummary
                type="package"
                className="font-medium"
                entryName={moduleName}
                label={formatFolderLabel(moduleName, members.length)}
              />
              <ul>
                {members.map(([memberName, files]) => (
                  <li key={`${moduleName}-${memberName}`}>
                    <details>
                      <EntrySummary
                        type="folder"
                        entryName={memberName}
                        label={formatFolderLabel(memberName, files.length)}
                      />
                      <FileList files={files} />
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
