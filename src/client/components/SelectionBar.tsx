import { useAtomValue } from "jotai";
import { selectedEntryAtom } from "../lib/utils";

/**
 * A bar that displays the selected entry and allows copying it.
 */
export function SelectionBar() {
  const selectedEntry = useAtomValue(selectedEntryAtom);

  const handleCopy = () => {
    if (!selectedEntry) {
      return;
    }

    copyTextToClipboard(selectedEntry);
  };

  return (
    <div>
      <div className="text-base-content/70 mb-2">
        Click row text to select for copying
      </div>

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
    </div>
  );
}

function copyTextToClipboard(text: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return;
  }

  void navigator.clipboard.writeText(text);
}
