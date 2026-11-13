import html1 from "../content/part1-fonaments.js";
import html2 from "../content/part2-text.js";
import html3 from "../content/part3-contingut.js";
import html4 from "../content/part4-enllacos.js";
import html5 from "../content/part5-multimedia-formularis.js";
import html6 from "../content/part6-html-modern.js";
import html7 from "../content/part7-incrustacio-semantica.js";
import html8 from "../content/part8-accessibilitat-seo.js";
import css1 from "../content/css/part1-fonaments.js";
import css2 from "../content/css/part2-caixa-text.js";
import css3 from "../content/css/part3-efectes.js";
import css4 from "../content/css/part4-avancat.js";
import css5 from "../content/css/part5-modern.js";
import js1 from "../content/js/part1-fonaments.js";
import js2 from "../content/js/part2-dades.js";
import js3 from "../content/js/part3-funcions.js";
import js4 from "../content/js/part4-control.js";
import js5 from "../content/js/part5-dom.js";
import js6 from "../content/js/part6-asincronia.js";
import js7 from "../content/js/part7-oop.js";
import js8 from "../content/js/part8-avancat.js";
import js9 from "../content/js/part9-eines-modernes.js";
import practica1 from "../content/practica/part1-eines.js";
import practica2 from "../content/practica/part2-projectes.js";

function buildCourse(config) {
  const chapters = [];

  const parts = config.sources.map((source, index) => {
    const numbered = source.chapters.map((chapter) => {
      const enriched = {
        ...chapter,
        number: chapters.length + 1,
        partTitle: source.title,
        partIndex: index + 1,
        course: config.slug,
        courseLabel: config.label,
      };
      chapters.push(enriched);
      return enriched;
    });

    return {
      index: index + 1,
      title: source.title,
      description: source.description,
      chapters: numbered,
    };
  });

  return { ...config, parts, chapters, total: chapters.length };
}

export const courses = [
  buildCourse({
    slug: "html",
    label: "HTML",
    name: "Tutorial d'HTML",
    tagline: "L'estructura de la pàgina",
    description:
      "Des del primer document fins als elements semàntics d'HTML5: text, llistes, taules, imatges, formularis, multimèdia i accessibilitat.",
    sources: [html1, html2, html3, html4, html5, html6, html7, html8],
  }),
  buildCourse({
    slug: "css",
    label: "CSS",
    name: "Tutorial de CSS",
    tagline: "L'aspecte i la disposició",
    description:
      "Colors, caixes, tipografia, Flexbox, Grid, responsivitat i animacions: tot el que converteix una estructura en un disseny.",
    sources: [css1, css2, css3, css4, css5],
  }),
  buildCourse({
    slug: "javascript",
    label: "JavaScript",
    name: "Tutorial de JavaScript",
    tagline: "El comportament",
    description:
      "Variables, funcions, objectes, el DOM, esdeveniments i asincronia: el llenguatge que fa que la pàgina respongui.",
    sources: [js1, js2, js3, js4, js5, js6, js7, js8, js9],
  }),
  buildCourse({
    slug: "practica",
    label: "Projectes",
    name: "Desenvolupament Web Pràctic",
    tagline: "Eines, projectes reals i desplegament",
    description:
      "Git, GitHub, VS Code, DevTools, APIs i projectes complets: landing page, portafolis, formulari validat, aplicació de tasques i desplegament a Vercel i GitHub Pages.",
    sources: [practica1, practica2],
  }),
];

export const courseBySlug = courses.reduce((acc, course) => {
  acc[course.slug] = course;
  return acc;
}, {});

export const totalChapters = courses.reduce((sum, course) => sum + course.total, 0);

export function getCourse(slug) {
  return courseBySlug[slug] || null;
}

export function getChapter(courseSlug, chapterSlug) {
  const course = getCourse(courseSlug);
  if (!course) return null;
  return course.chapters.find((chapter) => chapter.slug === chapterSlug) || null;
}

export function getNeighbours(courseSlug, chapterSlug) {
  const course = getCourse(courseSlug);
  if (!course) return { prev: null, next: null };

  const index = course.chapters.findIndex((chapter) => chapter.slug === chapterSlug);
  return {
    prev: index > 0 ? course.chapters[index - 1] : null,
    next: index >= 0 && index < course.chapters.length - 1 ? course.chapters[index + 1] : null,
  };
}

export function getNextPending(courseSlug, doneSlugs = []) {
  const course = getCourse(courseSlug);
  if (!course) return null;
  return course.chapters.find((chapter) => !doneSlugs.includes(chapter.slug)) || null;
}
