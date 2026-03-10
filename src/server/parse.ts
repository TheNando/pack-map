export const TRACKED_IMPORTS = [
  "@mui/lab",
  "@mui/material",
  "@mui/styles",
  "@mui/x-date-pickers",
];

export type AnalyzeResult = Record<string, Record<string, string[]>>;

const IMPORT_REGEX =
  /import\s+(?:{([^}]+)}|(\*\s+as\s+\w+)|\w+)\s+from\s+['"]([^'"]+)['"]/g;

export function parseNamedImports(namedImports: string) {
  return namedImports
    .split(",")
    .map((member) => member.trim())
    .filter((member) => member.length > 0)
    .map((member) => member.split(/\s+as\s+/)[0]!.trim())
    .filter((memberName) => memberName.length > 0);
}

export function mapImports(
  content: string,
  filename: string,
  importMap: AnalyzeResult = {},
) {
  let match;

  while ((match = IMPORT_REGEX.exec(content)) !== null) {
    const moduleName = match[3];

    if (!moduleName || !TRACKED_IMPORTS.includes(moduleName)) {
      continue;
    }

    if (!importMap[moduleName]) {
      importMap[moduleName] = {};
    }

    const namedImports = match[1];
    const namespaceImport = match[2];

    if (namedImports) {
      const members = parseNamedImports(namedImports);
      for (const memberName of members) {
        if (!importMap[moduleName]![memberName]) {
          importMap[moduleName]![memberName] = [];
        }
        importMap[moduleName]![memberName]!.push(filename);
      }
    } else if (namespaceImport) {
      const namespaceName = namespaceImport.trim();
      if (!importMap[moduleName]![namespaceName]) {
        importMap[moduleName]![namespaceName] = [];
      }
      importMap[moduleName]![namespaceName]!.push(filename);
    }
  }

  return importMap;
}
