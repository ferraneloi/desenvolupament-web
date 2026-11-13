import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toggleChapter, useProgress } from "../../lib/progress.js";

export default function ChapterFooter({ course, chapter, prev, next }) {
  const done = useProgress(course.slug);
  const isDone = done.includes(chapter.slug);

  return (
    <div className="mt-12 space-y-8 border-t border-border pt-8">
      <button
        type="button"
        onClick={() => toggleChapter(course.slug, chapter.slug)}
        className={
          isDone
            ? "inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
            : "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:border-accent hover:text-accent"
        }
      >
        <Check size={15} />
        {isDone ? "Capítol completat" : "Marca el capítol com a fet"}
      </button>

      <nav className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <a
            href={`/${course.slug}/capitol/${prev.slug}`}
            className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft size={13} /> Capítol {prev.number}
            </span>
            <span className="mt-1 block font-medium leading-snug text-foreground group-hover:text-primary">
              {prev.title}
            </span>
          </a>
        ) : (
          <span />
        )}

        {next ? (
          <a
            href={`/${course.slug}/capitol/${next.slug}`}
            className="group rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-primary/40 sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Capítol {next.number} <ArrowRight size={13} />
            </span>
            <span className="mt-1 block font-medium leading-snug text-foreground group-hover:text-primary">
              {next.title}
            </span>
          </a>
        ) : null}
      </nav>
    </div>
  );
}

