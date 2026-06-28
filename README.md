# Design.md Builder

A web app for generating [DESIGN.md](https://github.com/google-labs-code/design.md) design system files. Configure colors, typography, spacing, shapes, and components from scratch, then download a spec-compliant file for coding agents to follow.

## What's in this repo

```
designer-md/
├── references/          # Example DESIGN.md files (Wise, Linear, Supabase, etc.)
└── web/                 # Next.js builder app
```

The files in `references/` are structural inspiration only — the builder lets you create your own design from scratch.

## Quick start

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), click **Open builder**, and walk through the 7-step wizard.

## Using your DESIGN.md in Cursor

1. Configure your design in the web app and download `DESIGN.md`
2. Place `DESIGN.md` in the root of your new project
3. Tell Cursor:

   > Build this app following DESIGN.md — use the token values and component names exactly.

4. Optionally export a Tailwind theme:

   ```bash
   npx @google/design.md export --format tailwind DESIGN.md > tailwind.theme.json
   ```

5. Validate after manual edits:

   ```bash
   npx @google/design.md lint DESIGN.md
   ```

## Builder features

- **7-step wizard**: Identity, Colors, Typography, Spacing & Shapes, Layout & Elevation, Components & Rules, Review & Export
- **Live preview**: See buttons, cards, typography, and nav update as you configure tokens
- **Reference excerpts**: Collapsible examples from the `references/` folder for each section
- **Lint on export**: Validates against `@google/design.md` before download
- **Persisted state**: Your work is saved in browser localStorage
- **Site styling from root DESIGN.md**: The web app shell (landing page, builder chrome, buttons, cards) reads tokens from [`DESIGN.md`](../DESIGN.md) at the repo root and applies them via CSS variables

## Tech stack

- Next.js 16 (App Router)
- TypeScript, Tailwind CSS, Zustand
- `@google/design.md` for linting
- `js-yaml` for token serialization

## API routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/generate` | POST | Generate DESIGN.md markdown from config |
| `/api/lint` | POST | Generate + lint; returns errors and markdown |
| `/api/reference` | GET | Fetch reference excerpt for a wizard step |

## License

Reference design files are inspired interpretations for educational use. The DESIGN.md format is Apache-2.0 ([google-labs-code/design.md](https://github.com/google-labs-code/design.md)).
