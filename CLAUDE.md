# CLAUDE.md — SQ-6 Volunteer Training Guide

## Project Overview

A React + TypeScript single-page training guide for church audio volunteers learning the Allen & Heath SQ-6 digital mixing console. The app is a multi-section interactive reference: checklists, tabbed zone explorers, signal-chain walkthroughs, a troubleshooting accordion, and a searchable glossary.

## Tech Stack

- **React 18** with functional components and hooks
- **TypeScript 5** — strict mode enabled
- **Vite 5** — dev server and build tool
- **Tailwind CSS 3** — utility-first styling with a custom design token system
- **shadcn/ui pattern** — hand-rolled primitives in `src/components/ui/` using Radix UI + CVA
- **Radix UI** — headless primitives (ScrollArea, Separator, Dialog, etc.)
- **lucide-react** — icons
- **IBM Plex Sans / Playfair Display / IBM Plex Mono** — loaded from Google Fonts in `index.html`

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check then build to dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint
```

## Project Structure

```
sq6-training/
├── index.html                  # Google Fonts link lives here
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                # React root mount
│   ├── App.tsx                 # Root: state, layout shell, mobile nav toggle
│   ├── index.css               # Tailwind directives + global utilities
│   ├── lib/
│   │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│   ├── types/
│   │   └── index.ts            # All TypeScript interfaces and the SectionContent discriminated union
│   ├── data/
│   │   └── sections.ts         # All training content — the single source of truth
│   └── components/
│       ├── Sidebar.tsx         # Desktop left-nav (hidden on mobile)
│       ├── MobileNav.tsx       # Slide-in drawer for mobile
│       ├── SectionView.tsx     # Renders active section + prev/next footer
│       ├── ui/                 # shadcn-style primitives
│       │   ├── badge.tsx
│       │   ├── button.tsx
│       │   ├── input.tsx
│       │   ├── scroll-area.tsx
│       │   └── separator.tsx
│       └── sections/           # One component per content type
│           ├── index.ts        # Barrel export
│           ├── WelcomeSection.tsx
│           ├── ZonesSection.tsx
│           ├── LayersSection.tsx
│           ├── ChecklistSection.tsx
│           ├── StepsSection.tsx
│           ├── ProcessingSection.tsx
│           ├── FXSection.tsx
│           ├── TroubleshootSection.tsx
│           ├── TipsSection.tsx
│           └── GlossarySection.tsx
```

## Architecture

### Content model

All training content lives exclusively in `src/data/sections.ts` as a typed `Section[]` array. Each section has an `id`, `icon`, `title`, `color` (hex), and a `content` object.

The `content` field is a **discriminated union** (`SectionContent` in `src/types/index.ts`) keyed on `type`. The ten types are:

| type | Component | Key data shape |
|---|---|---|
| `intro` | `WelcomeSection` | `highlights[]` |
| `zones` | `ZonesSection` | `zones[]` with per-zone color/tips |
| `layers` | `LayersSection` | `layers[]`, `tips[]` |
| `checklist` | `ChecklistSection` | `checklists[]` (interactive, stateful) |
| `steps` | `StepsSection` | `steps[]` |
| `processing` | `ProcessingSection` | `chain[]` (tabbed signal chain) |
| `fx` | `FXSection` | `fxTypes[]` |
| `troubleshoot` | `TroubleshootSection` | `problems[]` (accordion) |
| `tips` | `TipsSection` | `categories[]` (tabbed) |
| `glossary` | `GlossarySection` | `terms[]` (searchable) |

`SectionView.tsx` dispatches to the correct component with a simple series of `content.type === 'x'` conditionals. TypeScript narrows the union at each branch so each section component receives a fully-typed prop.

### Navigation state

`App.tsx` owns a single `activeId: string` state. `Sidebar`, `MobileNav`, and `SectionView` all receive `onSelect` / `onPrev` / `onNext` callbacks — no router, no context.

### Styling conventions

The Tailwind config extends the default theme with semantic tokens:

- **Backgrounds**: `bg-bg-base`, `bg-bg-surface`, `bg-bg-elevated`, `bg-bg-overlay`
- **Borders**: `border-border-subtle`, `border-border-default`, `border-border-strong`
- **Text**: `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-faint`
- **Accents**: `accent-amber`, `accent-teal`, `accent-coral`, `accent-steel`, `accent-plum`, `accent-sky`
- **Fonts**: `font-sans` (IBM Plex Sans), `font-display` (Playfair Display), `font-mono` (IBM Plex Mono)
- **Animations**: `animate-fadeIn`, `animate-slideIn`

Each section has a `color` hex that is applied via **inline styles** for dynamic per-section tinting (e.g. active sidebar border, section banner gradient, tab highlights). Tailwind can't generate arbitrary hex values at runtime, so dynamic colors always use `style={{ color: section.color }}` rather than Tailwind classes.

The utility `text-gradient-amber` is defined in `index.css` and used for the app title.

### String literals in data

All strings in `src/data/sections.ts` use **double quotes**. Do not use single-quoted strings for any value that might contain an apostrophe (contractions like `it's`, `don't`, `what's`). TypeScript will fail to parse them as string literals.

## Adding a New Section

1. Add a new entry to the `sections` array in `src/data/sections.ts`. Pick an existing `type` or add a new one.
2. If adding a new type:
   - Add the interface(s) to `src/types/index.ts`
   - Add the new variant to the `SectionContent` discriminated union
   - Create `src/components/sections/NewSection.tsx`
   - Export it from `src/components/sections/index.ts`
   - Add the dispatch branch in `SectionView.tsx`
3. Choose a unique `color` hex for the section — it drives all tinting.
4. Give the section a short `id` (kebab-case), an emoji `icon`, and a `title`.

## Editing Training Content

All content changes happen only in `src/data/sections.ts`. No component files need to be touched for copy edits, reordering, or adding/removing items within existing section types.

## Known Issue (build)

At time of writing, `npm run build` fails with TypeScript parse errors on `src/data/sections.ts` due to unescaped apostrophes in some string values. The fix is to ensure every string in that file uses double quotes (`"`) rather than single quotes (`'`). Any contraction (e.g. `it's`) inside a single-quoted string will break the TS parser.

Run this to check for problem lines before building:

```bash
node -e "
const fs = require('fs');
const lines = fs.readFileSync('src/data/sections.ts', 'utf8').split('\n');
lines.forEach((l, i) => {
  const q = (l.match(/'/g) || []).length;
  if (q % 2 !== 0) console.log(i+1, l.trim().slice(0, 90));
});
"
```