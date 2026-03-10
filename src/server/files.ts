import { readdir } from "node:fs/promises";
import { normalize, parse } from "node:path";
import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    src: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const isTypeScriptFile = (file: string) => {
  return file.endsWith(".ts") || file.endsWith(".tsx");
};

export async function getTypeScriptFilesInDirectory() {
  const path = parse(Bun.main);

  if (!values.src) {
    throw new Error("No source file provided");
  }

  try {
    const basePath = normalize(`${path.dir}/../${values.src}`);
    const files = await readdir(basePath, {
      recursive: true,
    });

    const tsFiles = files
      .filter(isTypeScriptFile)
      .map((file) => `${basePath}/${file}`);

    return tsFiles;
  } catch (error) {
    throw new Error(`Error resolving path: ${error}`);
  }
}
