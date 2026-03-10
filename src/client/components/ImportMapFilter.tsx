/**
 * A text input for filtering import map entries.
 *
 * @param filterText - The current filter text.
 * @param onFilterTextChange - The callback to update the filter text.
 */
export function ImportMapFilter({
  filterText,
  onFilterTextChange,
}: {
  filterText: string;
  onFilterTextChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-base-content/70">Filter entries</span>
      <input
        type="text"
        value={filterText}
        onChange={(event) => onFilterTextChange(event.target.value)}
        placeholder="Filter by package, member, or file"
        className="input input-bordered input-sm w-full"
        aria-label="Filter import map entries"
      />
    </label>
  );
}