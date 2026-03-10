/**
 * A bar that displays the selected entry and allows copying it.
 *
 * @param selectedEntry - The selected entry to display.
 */
export function SelectionBar({ selectedEntry }: { selectedEntry: string }) {
  const handleCopy = () => {
    if (!selectedEntry) {
      return;
    }

    copyTextToClipboard(selectedEntry);
  };

  return (
    <div className="rounded-box bg-base-200 px-4 py-3 text-sm">
      <label className="flex flex-col gap-2">
        <span className="text-base-content/70">
          Click any text to select it for copying
        </span>
        <div className="flex w-full gap-2">
          <input
            type="text"
            readOnly
            value={selectedEntry}
            placeholder="Selected entry"
            className="input input-bordered input-sm w-full"
            aria-label="Selected entry"
          />
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleCopy}
            disabled={!selectedEntry}
          >
            Copy
          </button>
        </div>
      </label>
    </div>
  );
}

function copyTextToClipboard(text: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return;
  }

  void navigator.clipboard.writeText(text);
}
