# Pack Map

Pack Map is a small Bun + React application for analyzing package imports in a TypeScript codebase and presenting the results as an interactive import map.

Today, it is focused on tracking Material UI imports and showing:

- which tracked packages are used
- which named members are imported from each package
- which files reference each member
- a selectable value bar for quickly copying a package, member, or file path

## What it does

When Pack Map starts, it scans a source directory for `.ts` and `.tsx` files, extracts imports from a configured list of packages, and exposes the results in a browser UI.

The current tracked packages are:

- `@mui/lab`
- `@mui/material`
- `@mui/styles`
- `@mui/x-date-pickers`

The UI displays those imports as a nested tree:

1. package
2. imported member
3. files that reference that member

## Features

- recursive TypeScript/TSX source scanning
- grouped import map by package and imported member
- sorted, de-duplicated file listings
- interactive tree view for exploring import usage
- click-to-select entries with copy support
- loading and empty states in the import map panel

## Getting started

Install dependencies:

```bash
bun install
```

Run the development server and point it at the source directory you want to analyze:

```bash
bun run dev --src ../path-to-your-project/src
```

Then open the local URL printed by Bun in your terminal.

## Production run

Start the app in production mode:

```bash
bun run start --src ../path-to-your-project/src
```

## Build

Create a production build:

```bash
bun run build
```

## How it works

- The server scans the provided source directory for `.ts` and `.tsx` files.
- Import statements are parsed and filtered to a configured allowlist of packages.
- The analyzed import map is served from `/api/analyze`.
- The React client fetches that data and renders it as an interactive tree.

## Configuration

If you want to track different packages, update the `TRACKED_IMPORTS` array in `src/server/parse.ts`.

## Notes and limitations

- The app currently analyzes only TypeScript and TSX files.
- Import parsing is based on pattern matching and currently focuses on supported static import forms.
- The import map is generated when the server starts and served from that analyzed snapshot.

## Tech stack

- [Bun](https://bun.com)
- [React](https://react.dev)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
