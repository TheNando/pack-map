export type AnalyzeResponse = { result: AnalyzeResult };

export type AnalyzeResult = Record<string, Record<string, string[]>>;

export type FilteredMemberEntry = [string, string[]];

export type FilteredPackageEntry = [string, FilteredMemberEntry[]];

export type SortDirection = "asc" | "desc";

export type SortKey = "name" | "count";
