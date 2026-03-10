import { describe, expect, test } from "bun:test";
import { buildImportMapCsv } from "./utils";

describe("buildImportMapCsv", () => {
  test("includes the header and one row per unique file", () => {
    expect(
      buildImportMapCsv({
        "@mui/material": {
          Button: ["src/Button.tsx", "src/Button.tsx", "src/Form.tsx"],
          TextField: ["src/Form.tsx"],
        },
      }),
    ).toBe([
      "Package,Member,File",
      "@mui/material,Button,src/Button.tsx",
      "@mui/material,Button,src/Form.tsx",
      "@mui/material,TextField,src/Form.tsx",
    ].join("\n"));
  });

  test("escapes csv values that contain quotes or commas", () => {
    expect(
      buildImportMapCsv({
        "@mui/material": {
          'Button "Primary"': ["src/forms,dialog.tsx"],
        },
      }),
    ).toBe([
      "Package,Member,File",
      '@mui/material,"Button ""Primary""","src/forms,dialog.tsx"',
    ].join("\n"));
  });
});