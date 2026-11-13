import { courses, totalChapters } from "../../lib/tutorial.js";
import { useTotalProgress } from "../../lib/progress.js";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function SiteHeader() {
  const done = useTotalProgress();
  const [mobileOpen, setMobileOpen] = useState(false);

  const base =
    "rounded-lg px-3 py-1.5 text-sm text-foreground/65 transition-colors hover:bg-secondary hover:text-foreground";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-mono text-[11px] font-medium text-primary-foreground">
            {"</>"}
          </span>
          <span className="font-heading text-[1.15rem] font-semibold tracking-tight">Desenvolupament Web</span>
        </a>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          <a href="/" className={base}>Inici</a>
          {courses.map((course) => (
            <a key={course.slug} href={`/${course.slug}`} className={base}>
              {course.label}
            </a>
          ))}
          <a href="/playground" className={base}>Playground</a>
        </nav>

        {/* Progress badge */}
        <span className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground lg:inline-flex">
          <span className="font-mono text-foreground">
            {done}/{totalChapters}
          </span>
          capítols fets
        </span>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-foreground/70 hover:bg-secondary sm:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-3 sm:hidden">
          <nav className="flex flex-col gap-1">
            <a href="/" className={base} onClick={() => setMobileOpen(false)}>Inici</a>
            {courses.map((course) => (
              <a
                key={course.slug}
                href={`/${course.slug}`}
                className={base}
                onClick={() => setMobileOpen(false)}
              >
                {course.label}
              </a>
            ))}
            <a href="/playground" className={base} onClick={() => setMobileOpen(false)}>
              Playground
            </a>
          </nav>
          <div className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
            <span className="font-mono text-foreground">{done}/{totalChapters}</span> capítols fets
          </div>
        </div>
      )}
    </header>
  );
}

