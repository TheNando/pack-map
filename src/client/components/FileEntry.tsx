import FileIcon from "../assets/FileIcon";
import { SelectableEntryLabel } from "./SelectableEntryLabel";

/**
 * A file entry.
 *
 * @param filePath - The file path to display.
 * @param onSelect - The callback to invoke when the file is selected.
 */
export function FileEntry({
  filePath,
  onSelect,
}: {
  filePath: string;
  onSelect: (entryName: string) => void;
}) {
  return (
    <span className="flex items-center gap-2 px-2 py-1.5">
      <span className="flex min-w-0 items-center gap-2">
        <FileIcon />
        <SelectableEntryLabel
          entryName={filePath}
          label={filePath}
          onSelect={onSelect}
        />
      </span>
    </span>
  );
}
