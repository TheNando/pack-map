import { useAtom } from "jotai";
import { filterTextAtom } from "../lib/utils";

/**
 * A text input for filtering import map entries.
 */
export function ImportMapFilter() {
  const [filterText, setFilterText] = useAtom(filterTextAtom);

  return (
    <div className="mb-4">
      <div className="text-sm text-base-content/70 mb-2">Filter</div>

      <input
        type="text"
        value={filterText}
        onChange={(event) => setFilterText(event.target.value)}
        placeholder="Filter by package, member, or file"
        className="input input-bordered input-sm w-full"
        aria-label="Filter import map entries"
      />
    </div>
  );
}
