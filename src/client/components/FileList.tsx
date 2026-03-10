import { getUniqueSortedFiles, selectedEntryAtom } from "../lib/utils";
import { FileEntry } from "./FileEntry";

/**
 * A list of files.
 *
 * @param files - The files to display.
 */
export function FileList({ files }: { files: string[] }) {
  const uniqueFiles = getUniqueSortedFiles(files);

  return (
    <ul className="menu menu-xs w-full">
      {uniqueFiles.map((filePath) => (
        <li key={filePath}>
          <FileEntry filePath={filePath} />
        </li>
      ))}
    </ul>
  );
}
