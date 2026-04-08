# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — run ESLint (flat config, `eslint.config.mjs`)

## Architecture

Next.js 16 blog (App Router) with Tailwind CSS v4, deployed on Vercel.

**Routing:** `/` redirects to `/home`. Main pages: `/home` (landing), `/blog` (post list with tag filtering, sorting, pagination), `/blog/[slug]` (individual post), `/projects`.

**Blog posts:** Markdown files in `posts/`. Each file uses gray-matter frontmatter with fields: `title`, `date`, `description`, `tags` (array), optional `externalUrl` and `score`. The filename (minus `.md`) becomes the URL slug.

**Content pipeline:** `lib/blog.ts` reads markdown files from disk at build time via `fs`/`gray-matter`. Posts are statically generated (`generateStaticParams`). Markdown is rendered client-side by `react-markdown` + `remark-gfm` via `components/MarkdownRenderer.tsx`.

**Tag ordering:** Tags have a custom sort order defined in `lib/blog.ts` (`getAllTags`): `starred`, `project`, `figma`, `yap`, `misc1`, then alphabetical.

**Styling:** Tailwind CSS v4 via PostCSS. Global CSS in `app/globals.css` defines custom animations (fade-in, float, spin). Uses `@theme inline` for CSS variables. Dark mode via `prefers-color-scheme`.

**Key components:** `Navigation` (site nav), `BlogCard` (post preview), `TagFilter`/`SortSelector` (blog list controls), `FadeIn` (animation wrapper), `Terminal` (home page widget), `Pong` (game), `AnimatedShapes` (background decorations).
