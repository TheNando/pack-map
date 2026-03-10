import { useAtomValue } from "jotai";
import { buildImportMapCsv, importMapAtom } from "../lib/utils";

/**
 * A panel that allows exporting the import map result.
 */
export function ExportMap() {
  const importMap = useAtomValue(importMapAtom);
  const hasImportMapData = Object.keys(importMap).length > 0;

  const handleExport = () => {
    if (!hasImportMapData) {
      return;
    }

    const csv = buildImportMapCsv(importMap);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "import-map.csv";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="text-base-content/70 mb-2 text-sm">
        Download import map as a CSV file.
      </div>

      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={handleExport}
        disabled={!hasImportMapData}
      >
        Export
      </button>
    </div>
  );
}
