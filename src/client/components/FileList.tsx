import { getUniqueSortedFiles } from "../lib/utils";
import { FileEntry } from "./FileEntry";

/**
 * A list of files.
 *
 * @param files - The files to display.
 * @param onSelect - The callback to invoke when a file is selected.
 */
export function FileList({
  files,
  onSelect,
}: {
  files: string[];
  onSelect: (entryName: string) => void;
}) {
  const uniqueFiles = getUniqueSortedFiles(files);

  return (
    <ul className="menu menu-xs w-full">
      {uniqueFiles.map((filePath) => (
        <li key={filePath}>
          <FileEntry filePath={filePath} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
