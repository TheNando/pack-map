import { describe, expect, test } from "bun:test";
import { mapImports, parseNamedImports } from "./parse";

describe("parseNamedImports", () => {
  test("ignores empty members created by trailing commas", () => {
    expect(parseNamedImports("Button, TextField,")).toEqual([
      "Button",
      "TextField",
    ]);
  });

  test("keeps original imported names when aliases are used", () => {
    expect(
      parseNamedImports("Button as MuiButton, TextField as Field,"),
    ).toEqual(["Button", "TextField"]);
  });
});

describe("mapImports", () => {
  test("does not create a blank member for multiline imports with trailing commas", () => {
    const content = `import {
  Button,
  TextField,
} from "@mui/material";`;

    expect(mapImports(content, "src/example.tsx")).toEqual({
      "@mui/material": {
        Button: ["src/example.tsx"],
        TextField: ["src/example.tsx"],
      },
    });
  });
});
