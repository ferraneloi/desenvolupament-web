# AGENTS.md

## Project Context

This is **Aula HTML** — a Catalan educational platform built with **Astro 5** (static output), **React 19 Islands**, **Tailwind CSS v3**, and deployed to **Vercel**. It has no backend: all data is static JS modules and localStorage.

## Key Files

- `src/lib/tutorial.js`: Course data aggregator — imports all content files and builds the `courses` array. The main public API: `courses`, `getCourse(slug)`, `getChapter(courseSlug, chapterSlug)`, `getNeighbours()`, `totalChapters`.
- `src/lib/progress.js`: localStorage progress system. Hooks: `useProgress(courseSlug)`, `useTotalProgress()`. Functions: `toggleChapter(course, slug)`, `resetProgress(course)`. Keys: `aula-progress` (current), `aula-html-progress` (legacy).
- `src/lib/highlightCode.js`: Client-side syntax highlighter (HTML, CSS, JS) used in CodeBlock.
- `src/content/part*.js` + `src/content/css/` + `src/content/js/`: Tutorial content as JS object exports. Each file exports `{ title, description, chapters: [{ slug, title, summary, goals, sections, exercise }] }`. Sections have: `title`, `body` (HTML string), `code`, `lang`, `codeTitle`, `preview`, `previewHtml`, `table` (`{ head, rows }`), `note`, `widget`.

## Pages (all static)

- `src/pages/index.astro` → `/`
- `src/pages/[course]/index.astro` → `/html`, `/css`, `/javascript`
- `src/pages/[course]/capitol/[slug].astro` → `/html/capitol/[slug]`, etc.
- `src/pages/playground.astro` → `/playground` (uses `client:only="react"`)
- `src/pages/prova.astro` → redirects 301 to `/playground`
- `src/pages/sitemap.xml.js` → `/sitemap.xml` (GET endpoint)
- `src/pages/404.astro` → 404 page

## Components

- **React Islands** (need `client:load` or `client:only`): `SiteHeader`, `CourseCard`, `ChapterSidebar`, `ChapterBody`, `ChapterFooter`, `CodeBlock`, `ExerciseCard`, `VSCodePlayground`.
- **Astro components**: `MainLayout.astro`, `PlaygroundLayout.astro`.

## Content Data Structure

```js
// section object
{
  title: "...",
  body: "<p>HTML string</p>",      // optional
  code: "...",                      // optional code example
  lang: "html" | "css" | "js",
  codeTitle: "...",                 // optional
  preview: true,                    // show iframe preview button
  previewHtml: "...",               // HTML wrapper for CSS previews
  table: { head: [...], rows: [[...]] }, // optional reference table
  note: "<strong>...</strong>",    // optional aside note (HTML string)
  widget: "attributes",            // optional interactive widget
}
```

## Development

```bash
npm run dev    # http://localhost:4321
npm run build  # generates dist/
npm run preview
```

## Rules

- Never edit `src/content.config.ts` — it suppresses Astro content collection warnings.
- Never add TypeScript to `.js` or `.jsx` files (the project uses plain JS/JSX).
- The playground uses `client:only="react"` — no SSR for Monaco Editor.
- Progress hooks (`useProgress`, `useTotalProgress`) only work inside React Islands.
- Do NOT add backend dependencies — this is a static site.
- Keep `vercel.json` for the `/prova` → `/playground` rewrite.
