import { mapImports } from "./parse";
import { getTypeScriptFilesInDirectory } from "./files";

/** Analyze the list TypeScript files for imports */
export async function analyze() {
  const files = await getTypeScriptFilesInDirectory();
  const importMap: Record<string, Record<string, string[]>> = {};

  for (const filename of files) {
    const file = Bun.file(filename);
    const content = await file.text();

    mapImports(content, filename, importMap);
  }

  return importMap;
}
