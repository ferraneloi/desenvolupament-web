import { useProgress } from "../../lib/progress.js";

export default function CourseCard({ course }) {
  const done = useProgress(course.slug);
  const pct = course.total > 0 ? Math.round((done.length / course.total) * 100) : 0;

  const colorMap = {
    html: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
    css: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    javascript: "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
    practica: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  };

  const badgeColor = colorMap[course.slug] || "bg-secondary text-foreground";

  return (
    <a
      href={`/${course.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${badgeColor}`}>
          {course.label}
        </span>
        {done.length > 0 && (
          <span className="text-xs text-muted-foreground">{pct}%</span>
        )}
      </div>

      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {course.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{course.tagline}</p>
      </div>

      <p className="text-sm leading-relaxed text-foreground/70">{course.description}</p>

      <div className="mt-auto space-y-2">
        {done.length > 0 && (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{course.total} capítols · {course.parts.length} blocs</span>
          {done.length > 0 ? (
            <span className="text-primary">{done.length} fets</span>
          ) : (
            <span>Comença →</span>
          )}
        </div>
      </div>
    </a>
  );
}

