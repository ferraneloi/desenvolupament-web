import { useState } from "react";
import { Lightbulb, ExternalLink } from "lucide-react";

export default function ExerciseCard({ exercise }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  if (!exercise) return null;

  return (
    <section className="rounded-2xl border border-primary/25 bg-primary/[0.045] p-5 sm:p-6">
      <p className="eyebrow mb-2">Posa-ho en pràctica</p>
      <div
        className="prose-html"
        dangerouslySetInnerHTML={{ __html: exercise.brief }}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        {exercise.hint ? (
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Lightbulb size={15} />
            {showHint ? "Amaga la pista" : "Veure una pista"}
          </button>
        ) : null}

        {exercise.solution ? (
          <button
            type="button"
            onClick={() => setShowSolution((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
          >
            {showSolution ? "Amaga la solució" : "Veure la solució"}
          </button>
        ) : null}

        {exercise.playgroundFiles ? (
          <a
            href={`/playground?exercise=${encodeURIComponent(JSON.stringify(exercise.playgroundFiles))}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <ExternalLink size={13} />
            Prova-ho al Playground
          </a>
        ) : null}
      </div>

      {showHint ? (
        <div className="mt-3 rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground/70">
          <p dangerouslySetInnerHTML={{ __html: exercise.hint }} />
        </div>
      ) : null}

      {showSolution ? (
        <div className="mt-3 rounded-xl border border-border bg-background p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Solució orientativa</p>
          <div className="prose-html text-sm" dangerouslySetInnerHTML={{ __html: exercise.solution }} />
        </div>
      ) : null}
    </section>
  );
}

