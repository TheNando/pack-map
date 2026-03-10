export function getUniqueSortedFiles(files: string[]) {
  return [...new Set(files)].sort((a, b) => a.localeCompare(b));
}

export function formatFolderLabel(name: string, entryCount: number) {
  return `${name} (${entryCount})`;
}
