# SQ-6 Training Guide

A React + TypeScript learning app for Allen & Heath SQ-6 volunteers.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project structure

- `src/data/sections.ts` contains the typed training content.
- `src/types/index.ts` defines the section content model.
- `src/components/SectionView.tsx` dispatches content to section-specific components.
- `src/components/ui/` contains reusable UI primitives.
