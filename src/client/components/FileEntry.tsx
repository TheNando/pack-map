import FileIcon from "../assets/FileIcon";
import { SelectableEntryLabel } from "./SelectableEntryLabel";

/**
 * A file entry.
 *
 * @param filePath - The file path to display.
 */
export function FileEntry({ filePath }: { filePath: string }) {
  return (
    <span className="flex items-center gap-2 px-2 py-1.5">
      <span className="flex min-w-0 items-center gap-2">
        <FileIcon />
        <SelectableEntryLabel entryName={filePath} label={filePath} />
      </span>
    </span>
  );
}
