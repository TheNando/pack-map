import type {
  AnalyzeResult,
  FilteredMemberEntry,
  FilteredPackageEntry,
  SortDirection,
  SortKey,
} from "./types";

export function filterResultEntries(
  result: AnalyzeResult,
  filterText: string,
  sortKey: SortKey,
  sortDirection: SortDirection,
) {
  const normalizedFilter = filterText.trim().toLowerCase();
  const filteredPackages: FilteredPackageEntry[] = [];

  for (const [moduleName, members] of Object.entries(result)) {
    const packageMatches = matchesFilter(moduleName, normalizedFilter);
    const filteredMembers: FilteredMemberEntry[] = [];

    for (const [memberName, files] of Object.entries(members)) {
      const memberMatches = matchesFilter(memberName, normalizedFilter);
      const uniqueFiles = getUniqueSortedFiles(files);
      const filteredFiles =
        !normalizedFilter || packageMatches || memberMatches
          ? uniqueFiles
          : uniqueFiles.filter((filePath) =>
              matchesFilter(filePath, normalizedFilter),
            );

      if (
        !normalizedFilter ||
        packageMatches ||
        memberMatches ||
        filteredFiles.length > 0
      ) {
        filteredMembers.push([memberName, filteredFiles]);
      }
    }

    if (!normalizedFilter || packageMatches || filteredMembers.length > 0) {
      filteredPackages.push([
        moduleName,
        sortEntries(filteredMembers, {
          sortKey,
          sortDirection,
          getCount: ([, files]) => files.length,
        }),
      ]);
    }
  }

  return sortEntries(filteredPackages, {
    sortKey,
    sortDirection,
    getCount: ([, members]) => members.length,
  });
}

export function formatFolderLabel(name: string, entryCount: number) {
  return `${name} (${entryCount})`;
}

export function getUniqueSortedFiles(files: string[]) {
  return [...new Set(files)].sort((a, b) => a.localeCompare(b));
}

function matchesFilter(value: string, normalizedFilter: string) {
  return !normalizedFilter || value.toLowerCase().includes(normalizedFilter);
}

function sortEntries<T extends [string, unknown]>(
  entries: T[],
  {
    sortKey,
    sortDirection,
    getCount,
  }: {
    sortKey: SortKey;
    sortDirection: SortDirection;
    getCount: (entry: T) => number;
  },
) {
  return [...entries].sort((entryA, entryB) => {
    const baseComparison =
      sortKey === "name"
        ? entryA[0].localeCompare(entryB[0])
        : getCount(entryA) - getCount(entryB) ||
          entryA[0].localeCompare(entryB[0]);

    return sortDirection === "asc" ? baseComparison : -baseComparison;
  });
}
