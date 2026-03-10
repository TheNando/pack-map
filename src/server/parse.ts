import { readFileSync } from "node:fs";

type AppConfig = {
  packages?: string[];
};

function getPackagesFromConfig() {
  const configPath = new URL("../../config.json", import.meta.url);
  const config = JSON.parse(readFileSync(configPath, "utf8")) as AppConfig;

  if (!Array.isArray(config.packages) || config.packages.length === 0) {
    throw new Error("No tracked imports configured in config.json");
  }

  return config.packages;
}

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
    const packages = getPackagesFromConfig();
    const moduleName = match[3];

    if (!moduleName || !packages.includes(moduleName)) {
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
