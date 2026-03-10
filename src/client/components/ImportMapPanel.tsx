import { useQuery } from "@tanstack/react-query";
import type { AnalyzeResponse } from "../lib/types";
import { ImportMapTree } from "./ImportMapTree";
import { LoadingSpinner } from "./LoadingSpinner";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { importMapAtom } from "../lib/utils";

/**
 * A panel that displays the import map result.
 */
export function ImportMapPanel() {
  const setImportMap = useSetAtom(importMapAtom);

  const { data, isLoading, isSuccess } = useQuery<AnalyzeResponse>({
    queryKey: ["analyze"],
    queryFn: async () => {
      const res = await fetch("/api/analyze");
      return res.json();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setImportMap(data.result);
    }
  }, [data, isSuccess, setImportMap]);

  const resultEntries = Object.entries(data?.result ?? {});
  const result = data?.result ?? {};

  return (
    <div className="mt-8 mx-auto flex w-full flex-col gap-4 text-left">
      {isLoading ? <LoadingSpinner /> : null}

      {isSuccess && resultEntries.length > 0 ? (
        <ImportMapTree result={result} />
      ) : null}

      {isSuccess && resultEntries.length === 0 ? (
        <div className="rounded-box bg-base-200 px-4 py-3 text-sm text-base-content/70">
          No tracked imports found.
        </div>
      ) : null}
    </div>
  );
}
