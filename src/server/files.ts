import { readdir } from "node:fs/promises";
import { join, normalize } from "node:path";

type AppConfig = {
  src?: string[];
};

const isTypeScriptFile = (file: string) => {
  return file.endsWith(".ts") || file.endsWith(".tsx");
};

async function getSourceDirectoriesFromConfig() {
  const configFile = Bun.file(new URL("../../config.json", import.meta.url));
  const config = (await configFile.json()) as AppConfig;

  if (!Array.isArray(config.src) || config.src.length === 0) {
    throw new Error("No source directories configured in config.json");
  }

  return config.src;
}

export async function getTypeScriptFiles() {
  const directories = await getSourceDirectoriesFromConfig();

  const fileGroups = await Promise.all(
    directories.map(async (directory) => {
      const basePath = normalize(directory);

      try {
        const files = await readdir(basePath, {
          recursive: true,
        });

        return files
          .filter(isTypeScriptFile)
          .map((file) => join(basePath, file));
      } catch (error) {
        throw new Error(`Error resolving path ${basePath}: ${error}`);
      }
    }),
  );

  return [...new Set(fileGroups.flat())];
}
