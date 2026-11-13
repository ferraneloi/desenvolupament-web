import { Check } from "lucide-react";
import CodeBlock from "./CodeBlock.jsx";
import ExerciseCard from "./ExerciseCard.jsx";
import AttributesExplorer from "./AttributesExplorer.jsx";

export default function ChapterBody({ chapter }) {
  return (
    <article>
      <p className="eyebrow">
        Capítol {chapter.number} · {chapter.partTitle}
      </p>

      <h1 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
        {chapter.title}
      </h1>

      <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-foreground/70">
        {chapter.summary}
      </p>

      {chapter.goals && chapter.goals.length ? (
        <section className="mt-8 rounded-2xl border border-border bg-card p-5">
          <p className="eyebrow mb-3">Què aprendràs</p>
          <ul className="grid gap-2.5">
            {chapter.goals.map((goal) => (
              <li key={goal} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/80">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                <span dangerouslySetInnerHTML={{ __html: goal }} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-10 space-y-11">
        {chapter.sections.map((section, index) => (
          <section key={section.title}>
            <h2 className="flex flex-wrap items-baseline gap-x-2.5 font-heading text-[1.45rem] font-semibold tracking-tight sm:text-[1.65rem]">
              <span className="font-mono text-[0.8rem] font-normal text-primary/70">
                {chapter.number}.{index + 1}
              </span>
              {section.title}
            </h2>

            <div className="mt-4 space-y-5">
              {section.body ? (
                <div
                  className="prose-html max-w-2xl"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              ) : null}

              {section.widget === "attributes" ? <AttributesExplorer /> : null}

              {section.code ? (
                <CodeBlock
                  code={section.code}
                  lang={section.lang || "html"}
                  title={section.codeTitle}
                  preview={section.preview !== false}
                  previewHtml={section.previewHtml}
                />
              ) : null}

              {section.table ? (
                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                  <table className="ref-table">
                    <thead>
                      <tr>
                        {(section.table.head || section.table.headers || []).map((h) => (
                          <th key={h} scope="col">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(section.table.rows || []).map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              dangerouslySetInnerHTML={{ __html: cell }}
                              className={j === 0 ? "font-medium text-foreground" : "text-foreground/75"}
                            />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {section.note ? (
                <aside
                  className="note-card max-w-2xl"
                  dangerouslySetInnerHTML={{ __html: section.note }}
                />
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-11">
        <ExerciseCard exercise={chapter.exercise} />
      </div>
    </article>
  );
}

