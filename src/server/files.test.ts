import { describe, expect, test } from "bun:test";
import { isExcludedFile } from "./files";

describe("isExcludedFile", () => {
  test("returns true when the file path contains an excluded pattern", () => {
    expect(
      isExcludedFile(
        "/repo/src/node_modules/example/index.ts",
        ["/node_modules/"],
      ),
    ).toBe(true);
  });

  test("returns false when the file path does not contain an excluded pattern", () => {
    expect(isExcludedFile("/repo/src/components/Button.tsx", ["/node_modules/"])).toBe(false);
  });

  test("supports multiple exclude patterns", () => {
    expect(
      isExcludedFile("/repo/src/generated/types.ts", ["/node_modules/", "/generated/"]),
    ).toBe(true);
  });
});