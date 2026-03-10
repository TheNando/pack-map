import { type MouseEvent } from "react";

/**
 * A label that can be selected by clicking on it.
 *
 * @param entryName - The name of the entry.
 * @param label - The label to display.
 * @param onSelect - The callback to invoke when the entry is selected.
 */
export function SelectableEntryLabel({
  entryName,
  label,
  onSelect,
}: {
  entryName: string;
  label: string;
  onSelect: (entryName: string) => void;
}) {
  const handleSelectPointerDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(entryName);
  };

  return (
    <button
      type="button"
      className="min-w-0 cursor-pointer text-left"
      aria-label={`Select ${entryName}`}
      title={`Select ${entryName}`}
      onMouseDown={handleSelectPointerDown}
      onClick={handleSelect}
    >
      <span className="break-all">{label}</span>
    </button>
  );
}
