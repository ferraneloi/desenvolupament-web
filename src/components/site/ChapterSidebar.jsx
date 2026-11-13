import { useProgress } from "../../lib/progress.js";
import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react";

export default function ChapterSidebar({ course, activeSlug }) {
  const done = useProgress(course.slug);
  const [collapsed, setCollapsed] = useState({});

  function togglePart(partIndex) {
    setCollapsed((c) => ({ ...c, [partIndex]: !c[partIndex] }));
  }

  return (
    <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto shell-scroll pr-2">
        <div className="mb-4">
          <a
            href={`/${course.slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            ← {course.name}
          </a>
        </div>
        <nav className="space-y-4">
          {course.parts.map((part) => (
            <div key={part.index}>
              <button
                type="button"
                className="side-part flex w-full items-center justify-between gap-1 hover:text-foreground"
                onClick={() => togglePart(part.index)}
              >
                <span>{part.title}</span>
                {collapsed[part.index] ? <ChevronRight size={11} /> : <ChevronDown size={11} />}
              </button>

              {!collapsed[part.index] && (
                <div className="mt-1 space-y-0.5">
                  {part.chapters.map((chapter) => {
                    const isDone = done.includes(chapter.slug);
                    const isActive = chapter.slug === activeSlug;

                    return (
                      <a
                        key={chapter.slug}
                        href={`/${course.slug}/capitol/${chapter.slug}`}
                        className="side-link"
                        data-active={isActive ? "true" : undefined}
                      >
                        <span className="side-num">{chapter.number}.</span>
                        <span className="flex-1">{chapter.title}</span>
                        {isDone && !isActive && (
                          <CheckCircle2 size={13} className="shrink-0 text-accent/70" />
                        )}
                        {!isDone && !isActive && (
                          <Circle size={13} className="shrink-0 text-border" />
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

