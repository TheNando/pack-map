import { parseArgs } from "util";

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    src: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

export function analyze() {
  return `${Bun.main}/${values.src}`;
}
