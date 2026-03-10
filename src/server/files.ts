import { readdir } from "node:fs/promises";
import { join, normalize } from "node:path";

type AppConfig = {
  src?: string[];
  exclude?: string[];
};

const isTypeScriptFile = (file: string) => {
  return file.endsWith(".ts") || file.endsWith(".tsx");
};

const normalizeForComparison = (value: string) => {
  return normalize(value).replaceAll("\\", "/");
};

export function isExcludedFile(filePath: string, excludePatterns: string[]) {
  const normalizedFilePath = normalizeForComparison(filePath);

  return excludePatterns.some((pattern) =>
    normalizedFilePath.includes(normalizeForComparison(pattern)),
  );
}

async function getFileScanConfig() {
  const configFile = Bun.file(new URL("../../config.json", import.meta.url));
  const config = (await configFile.json()) as AppConfig;

  if (!Array.isArray(config.src) || config.src.length === 0) {
    throw new Error("No source directories configured in config.json");
  }

  return {
    src: config.src,
    exclude: Array.isArray(config.exclude) ? config.exclude : [],
  };
}

export async function getTypeScriptFiles() {
  const { src: directories, exclude } = await getFileScanConfig();

  const fileGroups = await Promise.all(
    directories.map(async (directory) => {
      const basePath = normalize(directory);

      try {
        const files = await readdir(basePath, {
          recursive: true,
        });

        return files
          .map((file) => join(basePath, file))
          .filter(
            (filePath) =>
              isTypeScriptFile(filePath) && !isExcludedFile(filePath, exclude),
          );
      } catch (error) {
        throw new Error(`Error resolving path ${basePath}: ${error}`);
      }
    }),
  );

  return [...new Set(fileGroups.flat())];
}
