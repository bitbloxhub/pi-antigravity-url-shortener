# Agent Documentation: Pi Antigravity URL Shortener

This document provides context for AI agents working on this project.

## Stack Overview
- **Framework:** Next.js 16 (App Router)
- **Authentication:** Better Auth (with Drizzle Adapter)
- **ORM:** Drizzle ORM
- **Database:** PostgreSQL (running on `localhost:2803`)
- **Styling:** Tailwind CSS v4 + DaisyUI
- **Fonts:** Fira Code (Default)
- **Theme:** Valentine (Light/Default), Coffee (Dark)

## Coding Standards (bitbloxhub)
- **Indentation:** Use tabs exclusively.
- **Formatting:** Always include trailing commas in all code structures.
- **Skills:** Always check for relevant skills using `find-skills` before starting a task.

## Key Files
- `src/lib/auth.ts`: Better Auth server configuration.
- `src/lib/auth-client.ts`: Better Auth client instance.
- `src/db/schema.ts`: Drizzle schema including Users, Sessions, and URLs.
- `src/app/actions.ts`: Server actions for URL creation, deletion, and account management.
- `src/app/s/[code]/route.ts`: Core redirection logic.

## Common Tasks
- **Migrations:** Run `npx drizzle-kit generate` and `npx drizzle-kit push` (loads env from `.env.local`).
- **Development:** `pnpm dev`
- **Testing:** Browser automation via `agent-browser` is preferred for flow verification.
