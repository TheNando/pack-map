import FolderIcon from "../assets/FolderIcon";
import PackageIcon from "../assets/PackageIcon";
import { SelectableEntryLabel } from "./SelectableEntryLabel";

/**
 * A summary of an entry.
 *
 * @param label - The label to display.
 * @param entryName - The name of the entry.
 * @param className - The class name to apply.
 * @param onSelect - The callback to invoke when the entry is selected.
 * @param type - The type of the entry.
 */
export function EntrySummary({
  label,
  entryName,
  className,
  onSelect,
  type,
}: {
  label: string;
  entryName: string;
  className: string;
  onSelect: (entryName: string) => void;
  type: "package" | "folder";
}) {
  return (
    <summary className={`${className} flex items-center gap-2`}>
      <span className="flex min-w-0 items-center gap-2">
        {type === "package" && <PackageIcon />}
        {type === "folder" && <FolderIcon />}
        <SelectableEntryLabel
          entryName={entryName}
          label={label}
          onSelect={onSelect}
        />
      </span>
    </summary>
  );
}
