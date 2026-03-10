# Pack Map

Pack Map is a small Bun + React application for analyzing package imports in a TypeScript codebase and presenting the results as an interactive import map.

## What it does

When Pack Map starts, it scans every directory listed in the root `config.json` `src` array for `.ts` and `.tsx` files, extracts imports from the configured `packages` list, and exposes the results in a browser UI.

The UI displays those imports as a nested tree:

1. package
2. imported member
3. files that reference that member

## Getting started

Install dependencies:

```bash
bun install
```

Pack Map is configured through the root `config.json` file.

- `src`: an array of directories to scan recursively for `.ts` and `.tsx` files
- `packages`: an array of package names to include in the import analysis

Copy the `config.example.json` to `config.json`. Edit `config.json` it with the source directories and packages you want to analyze. Example:

```json
{
  "src": ["./src"],
  "packages": ["react", "jotai", "@tanstack/react-query"]
}
```

Then run the development server:

```bash
bun run dev
```

Then open the local URL printed by Bun in your terminal.

## Production run

Start the app in production mode:

```bash
bun run start
```

## Build

Create a production build:

```bash
bun run build
```

## Tech stack

- [Bun](https://bun.com)
- [React](https://react.dev)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
