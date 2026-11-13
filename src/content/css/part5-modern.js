export default {
  title: "CSS Modern i arquitectura",
  description:
    "Funcions matemàtiques, CSS Nesting, Container Queries, Grid avançat, cascade layers, design tokens i arquitectura CSS.",
  chapters: [
    {
      slug: "funcions-css",
      title: "Funcions CSS: clamp(), min(), max() i calc()",
      summary:
        "Funcions matemàtiques natives de CSS per crear dissenys fluids i adaptables sense media queries.",
      goals: [
        "Fer servir <code>calc()</code> per combinar unitats diferents.",
        "Aplicar <code>min()</code> i <code>max()</code> per establir límits.",
        "Crear tipografia i espaiat fluid amb <code>clamp()</code>.",
        "Entendre quan fer servir cada funció.",
      ],
      sections: [
        {
          title: "calc(): aritmètica CSS",
          body: `
            <p><code>calc()</code> permet fer operacions matemàtiques barrejant unitats. És essencial per calcular mides que depenen de múltiples factors.</p>
            <ul>
              <li>Operadors: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code></li>
              <li>Cal espai al voltant de <code>+</code> i <code>-</code></li>
              <li>Es poden niar funcions: <code>calc(calc(...) + ...)</code></li>
            </ul>
          `,
          lang: "css",
          code: `/* Sidebar fixa, contingut fluid */
.sidebar { width: 280px; }
.contingut { width: calc(100% - 280px); }

/* Centrar amb offset */
.element {
  margin-left: calc(50% - 150px); /* centrat sense flex */
  width: 300px;
}

/* Padding que respecta les vores en mòbil */
.contenidor {
  padding: calc(1rem + 2vw);
}

/* Alçada de full page menys la capçalera */
.hero {
  height: calc(100vh - 64px);
}

/* Grid amb gap manual */
.item {
  width: calc(33.333% - 1rem);
  margin: 0.5rem;
}`,
          codeTitle: "calc.css",
          previewHtml: `<div style="background:#f3f4f6;padding:1rem;border-radius:8px;">
  <div style="display:flex;gap:1rem;">
    <div style="width:120px;background:#0070f3;color:white;padding:0.5rem;border-radius:4px;font-size:0.75rem;">Sidebar<br>120px</div>
    <div style="width:calc(100% - 120px - 1rem);background:#e0f2fe;padding:0.5rem;border-radius:4px;font-size:0.75rem;">Contingut: calc(100% - 120px - gap)</div>
  </div>
</div>`,
        },
        {
          title: "min() i max(): límits de mida",
          body: `
            <p><code>min(a, b)</code> retorna el valor més petit dels dos. <code>max(a, b)</code> retorna el més gran.</p>
            <p>Són especialment útils per establir mides que siguin responsives però amb límits:</p>
            <ul>
              <li><code>width: min(100%, 600px)</code> → mai més ample que 600px, però s'enretira en mòbil.</li>
              <li><code>font-size: max(1rem, 2vw)</code> → mai menys d'1rem.</li>
            </ul>
          `,
          lang: "css",
          code: `/* Contenidor que mai excedeix 1200px */
.contenidor {
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 0 max(1rem, 5vw); /* padding progressiu */
}

/* Imatge que s'enretira però no creix massa */
.imatge-article {
  width: min(100%, 600px);
}

/* Font que mai és massa petita ni massa gran */
h1 {
  font-size: max(1.5rem, 4vw);
}

/* Col·lumnes de grid sense breakpoints */
.targeta {
  width: min(300px, 100%);
}

/* Padding limitat */
section {
  padding: max(2rem, 5vh) max(1rem, 10vw);
}`,
          codeTitle: "min-max.css",
        },
        {
          title: "clamp(): valors fluids",
          body: `
            <p><code>clamp(mínim, preferit, màxim)</code> combina <code>min()</code> i <code>max()</code> en una sola funció. El valor preferit sol ser una unitat viewport (<code>vw</code>) o un <code>calc()</code>.</p>
            <p>El cas d'ús estrella és la <strong>tipografia fluida</strong>: la mida de lletra creix progressivament entre dos punts de ruptura sense cap media query.</p>
          `,
          lang: "css",
          code: `/* Tipografia fluida: de 16px (mòbil) a 24px (desktop) */
body {
  font-size: clamp(1rem, 1.5vw + 0.75rem, 1.5rem);
}

/* Títol fluid: de 24px a 64px */
h1 {
  font-size: clamp(1.5rem, 5vw, 4rem);
}

/* Padding fluid: de 1rem a 5rem */
.seccio {
  padding: clamp(1rem, 5vw, 5rem);
}

/* Amplada de contenidor fluid amb límits */
.contenidor {
  width: clamp(300px, 90%, 1200px);
  margin: 0 auto;
}

/* Escala tipogràfica fluida completa */
:root {
  --text-xs:   clamp(0.75rem,  0.5vw + 0.6rem,  0.875rem);
  --text-sm:   clamp(0.875rem, 0.75vw + 0.7rem,  1rem);
  --text-base: clamp(1rem,     1vw + 0.75rem,     1.125rem);
  --text-lg:   clamp(1.125rem, 1.5vw + 0.75rem,  1.5rem);
  --text-xl:   clamp(1.5rem,   3vw + 0.5rem,     2.5rem);
  --text-2xl:  clamp(2rem,     5vw,               4rem);
}`,
          codeTitle: "clamp-fluid.css",
          note: `<strong>Eina:</strong> Genera valors de <code>clamp()</code> automàticament a <a href="https://clamp.font-size.app" target="_blank" rel="noopener">clamp.font-size.app</a>.`,
        },
      ],
      exercise: {
        brief: `<p>Crea un sistema d'espaiat fluid per a un blog sense cap media query. Ha d'incloure:</p>
<ul>
  <li>Contenidor principal: mai més ample de 720px, amb padding lateral fluid (mínim 1rem, màxim 5rem)</li>
  <li>Títol principal (h1): fluid de 2rem a 4rem</li>
  <li>Text base: fluid de 1rem a 1.25rem</li>
  <li>Espaiat entre seccions: fluid de 2rem a 6rem</li>
  <li>Imatge destacada: mai més ampla de 100%, centrada</li>
</ul>`,
        hint: `<p>Per al contenidor: <code>width: min(720px, 100%); padding: 0 clamp(1rem, 5vw, 5rem);</code>. Per a la tipografia, el valor intermedi sol ser <code>Xvw + Yrem</code> on X controla la velocitat de creixement.</p>`,
        solution: `<pre><code>.contenidor {
  width: min(720px, 100%);
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 5rem);
}
h1 { font-size: clamp(2rem, 5vw, 4rem); }
body { font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem); }
.seccio { margin-bottom: clamp(2rem, 6vw, 6rem); }
.imatge-destacada { width: min(100%, 600px); display: block; margin: 0 auto; }</code></pre>`,
      },
    },

    {
      slug: "css-nesting",
      title: "CSS Nesting natiu",
      summary:
        "Niar regles CSS directament al navegador sense preprocessadors, igual que Sass però estàndard.",
      goals: [
        "Niar selectors fills dins del pare.",
        "Fer servir el selector <code>&</code> per referenciar el pare.",
        "Niar pseudo-classes, pseudo-elements i media queries.",
        "Entendre les diferències amb Sass Nesting.",
      ],
      sections: [
        {
          title: "Nesting bàsic",
          body: `
            <p>CSS Nesting nativo (W3C) permet escriure regles fills dins la regla pare, igual que Sass. Suportat des de 2023 a tots els navegadors moderns.</p>
            <p>Dos estils de nesting:</p>
            <ul>
              <li><code>& selector</code>: explícit (recomanat per claredat)</li>
              <li><code>selector</code> directe: Chromium accepta, però <code>&</code> és més compatible</li>
            </ul>
          `,
          lang: "css",
          code: `/* Sense nesting (CSS tradicional) */
.targeta { background: white; border-radius: 8px; }
.targeta .titol { font-size: 1.25rem; font-weight: bold; }
.targeta .contingut { color: #6b7280; }
.targeta:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

/* AMB nesting natiu */
.targeta {
  background: white;
  border-radius: 8px;

  /* Selector fill directe */
  & .titol {
    font-size: 1.25rem;
    font-weight: bold;
  }

  & .contingut {
    color: #6b7280;
  }

  /* Pseudo-classe al pare */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Pseudo-element */
  &::before {
    content: '';
    display: block;
    height: 4px;
    background: #0070f3;
  }
}`,
          codeTitle: "nesting-basic.css",
        },
        {
          title: "Nesting de media queries i modificadors",
          body: `
            <p>El nesting és especialment potent per mantenir els estils responsivos junts amb el component, i per a patrons de modificadors (BEM).</p>
          `,
          lang: "css",
          code: `/* Component amb variantes i responsivitat */
.boto {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;

  /* Modificadors (estil BEM) */
  &.boto--primari {
    background: #0070f3;
    color: white;
    &:hover { background: #0051cc; }
  }

  &.boto--secundari {
    background: transparent;
    border: 2px solid #0070f3;
    color: #0070f3;
    &:hover { background: #f0f7ff; }
  }

  /* Mida */
  &.boto--gran {
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
  }

  /* Media query niada */
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }

  /* Accessibilitat */
  &:focus-visible {
    outline: 3px solid #0070f3;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}`,
          codeTitle: "nesting-components.css",
        },
        {
          title: "Nesting vs Sass: diferències clau",
          body: `
            <p>El nesting natiu i el de Sass s'assemblen molt però tenen diferències:</p>
          `,
          table: {
            head: ["Característica", "CSS Natiu", "Sass"],
            rows: [
              ["Necessita compilació", "No (navegador)", "Sí (Node.js)"],
              ["Suport navegadors", "Chrome 112+, FF 117+, Safari 16.5+", "Tots (compila a CSS)"],
              ["& requerit per elements fills", "Recomanat (obligatori per text)", "Opcional"],
              ["Interpolació #{}", "No", "Sí"],
              ["Variables ($var)", "No (usa var(--x))", "Sí"],
              ["@extend i @mixin", "No", "Sí"],
              ["Nesting de pseudo-elements", "& ::before", "& ::before o ::before"],
            ],
          },
          lang: "css",
          code: `/* Navigació responsiva amb nesting natiu complet */
nav {
  display: flex;
  gap: 1rem;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.5rem;
  }

  & a {
    text-decoration: none;
    color: #374151;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;

    &:hover { background: #f3f4f6; color: #111827; }
    &[aria-current="page"] {
      background: #0070f3;
      color: white;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    & ul { flex-direction: column; }
    & a { display: block; padding: 0.75rem 1rem; }
  }
}`,
          codeTitle: "nesting-nav.css",
        },
      ],
      exercise: {
        brief: `<p>Escriu els estils d'un component de formulari fent servir CSS Nesting natiu. El component <code>.form-camp</code> ha d'incloure:</p>
<ul>
  <li>Estils base del contenidor</li>
  <li>Estils del <code>label</code> fill (normal i amb .requerit)</li>
  <li>Estils de l'<code>input</code> fill (normal, :focus, :invalid, :valid)</li>
  <li>Missatge d'error (<code>.error-msg</code>) ocult per defecte, visible quan l'input és :invalid</li>
  <li>Varianta <code>.form-camp--inline</code> que posa label i input en fila</li>
</ul>`,
        hint: `<p>Per mostrar el missatge d'error quan l'input és invàlid pots fer: <code>&:has(input:invalid) .error-msg { display: block; }</code> (o alternativament niant dins l'input).</p>`,
        solution: `<pre><code>.form-camp {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;

  & label { font-size: 0.875rem; font-weight: 500;
    & .requerit { color: red; margin-left: 0.25rem; }
  }

  & input {
    padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;
    &:focus { outline: none; border-color: #0070f3; box-shadow: 0 0 0 3px #bfdbfe; }
    &:invalid { border-color: #ef4444; }
    &:valid { border-color: #22c55e; }
  }

  & .error-msg { display: none; color: #ef4444; font-size: 0.75rem; }
  &:has(input:invalid) .error-msg { display: block; }

  &.form-camp--inline {
    flex-direction: row; align-items: center;
    & label { min-width: 120px; }
  }
}</code></pre>`,
      },
    },

    {
      slug: "container-queries",
      title: "Container Queries",
      summary:
        "Adaptar components al seu contenidor en lloc de a la finestra del navegador.",
      goals: [
        "Definir un contenidor amb <code>container-type</code>.",
        "Escriure regles <code>@container</code> condicionals.",
        "Fer servir unitats de contenidor (cqi, cqb).",
        "Entendre la diferència amb les media queries.",
      ],
      sections: [
        {
          title: "Per què Container Queries?",
          body: `
            <p>Amb les media queries adaptem estils a la mida de la <em>finestra</em>. Però si un component apareix en llocs de diferent amplada (sidebar vs. main), les media queries no prou.</p>
            <p>Les Container Queries adapten el component a la mida del seu <em>contenidor pare</em>. Un component pot ser "petit" dins una sidebar i "gran" a la zona de contingut principal, sense duplicar CSS.</p>
          `,
          lang: "css",
          code: `/* 1. Definir el contenidor */
.targeta-wrapper {
  /* inline-size: mesura l'eix horitzontal (el més comú) */
  container-type: inline-size;
  container-name: targeta; /* nom opcional */
}

/* Equivalent shorthand */
.targeta-wrapper {
  container: targeta / inline-size;
}

/* 2. Regles que reaccionen a la mida del contenidor */
@container targeta (min-width: 400px) {
  .targeta {
    display: grid;
    grid-template-columns: 150px 1fr;
  }
}

@container targeta (min-width: 600px) {
  .targeta .accions {
    display: flex;
    gap: 1rem;
  }
}`,
          codeTitle: "container-basic.css",
        },
        {
          title: "Exemple complet: targeta responsiva",
          body: `
            <p>El cas d'ús clàssic: una targeta que canvia de disposició vertical a horitzontal no quan la finestra és gran, sinó quan el seu contenidor té prou amplada.</p>
          `,
          lang: "css",
          code: `/* Contenidor */
.zona-targetes {
  container-type: inline-size;
}

/* Targeta per defecte: layout vertical (mòbil-first) */
.producte {
  display: grid;
  grid-template-areas:
    "imatge"
    "titol"
    "preu"
    "boto";
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.producte img    { grid-area: imatge; width: 100%; border-radius: 4px; }
.producte h2     { grid-area: titol; margin: 0; }
.producte .preu  { grid-area: preu; color: #0070f3; font-weight: bold; }
.producte button { grid-area: boto; }

/* Layout horitzontal quan el contenidor té >=480px */
@container (min-width: 480px) {
  .producte {
    grid-template-columns: 160px 1fr;
    grid-template-areas:
      "imatge titol"
      "imatge preu"
      "imatge boto";
  }
}

/* Layout expandit quan el contenidor té >=720px */
@container (min-width: 720px) {
  .producte {
    grid-template-columns: 240px 1fr auto;
    grid-template-areas:
      "imatge titol boto"
      "imatge preu  boto";
    align-items: center;
  }
}`,
          codeTitle: "container-targeta.css",
        },
        {
          title: "Unitats de contenidor (cq*)",
          body: `
            <p>Com <code>vw</code> i <code>vh</code> són al viewport, les unitats <code>cq*</code> son relatives al contenidor:</p>
          `,
          table: {
            head: ["Unitat", "Significat"],
            rows: [
              ["cqw", "1% de l'amplada del contenidor"],
              ["cqh", "1% de l'alçada del contenidor"],
              ["cqi", "1% de l'eix inline del contenidor (horitzontal en LTR)"],
              ["cqb", "1% de l'eix block del contenidor (vertical)"],
              ["cqmin", "El menor entre cqi i cqb"],
              ["cqmax", "El major entre cqi i cqb"],
            ],
          },
          lang: "css",
          code: `/* Tipografia relativa al contenidor */
.zona-article {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .article h2 {
    /* Font que creix amb el contenidor, entre 1.25rem i 2rem */
    font-size: clamp(1.25rem, 4cqi, 2rem);
  }

  .article p {
    font-size: clamp(0.9rem, 2cqi, 1.1rem);
  }
}`,
          codeTitle: "container-units.css",
        },
      ],
      exercise: {
        brief: `<p>Crea un component <code>.article-card</code> que s'adapti al seu contenidor:</p>
<ul>
  <li>Per defecte (contenidor estret): imatge a dalt, text a baix, layout vertical</li>
  <li>Contenidor ≥ 500px: imatge a l'esquerra (40%), text a la dreta (60%), layout horitzontal</li>
  <li>Contenidor ≥ 800px: imatge a l'esquerra (30%), text al centre, botons a la dreta, 3 columnes</li>
  <li>El títol ha de créixer proporcionalment amb el contenidor usant cqi</li>
</ul>`,
        hint: `<p>Defineix el contenidor al wrapper: <code>.article-card-wrapper { container: article / inline-size; }</code>. Dins els blocs <code>@container</code> pots usar <code>grid-template-columns</code> per canviar el layout.</p>`,
        solution: `<pre><code>.article-card-wrapper { container: article / inline-size; }
.article-card { display: grid; gap: 1rem; }
.article-card h2 { font-size: clamp(1rem, 3cqi, 2rem); }
@container article (min-width: 500px) {
  .article-card { grid-template-columns: 40% 1fr; }
  .article-card img { height: 100%; object-fit: cover; }
}
@container article (min-width: 800px) {
  .article-card { grid-template-columns: 30% 1fr auto; align-items: center; }
}</code></pre>`,
      },
    },

    {
      slug: "grid-avancat",
      title: "CSS Grid avançat i layouts reals",
      summary:
        "Subgrid, grid-template-areas, auto-fill/auto-fit i overlapping per a layouts complexos.",
      goals: [
        "Crear layouts complets amb <code>grid-template-areas</code>.",
        "Fer servir <code>subgrid</code> per alinear elements de fills.",
        "Entendre <code>auto-fill</code> vs <code>auto-fit</code> amb <code>minmax()</code>.",
        "Solapar elements deliberadament amb Grid.",
      ],
      sections: [
        {
          title: "grid-template-areas: layouts visuals",
          body: `
            <p><code>grid-template-areas</code> permet dissenyar el layout d'una pàgina escrivint el nom de cada zona, creant una representació visual a l'ASCII del disseny.</p>
            <p>Cada fila és una cadena de text, cada paraula és una cel·la. Un punt <code>.</code> és una cel·la buida.</p>
          `,
          lang: "css",
          code: `/* Layout complet de pàgina */
.pagina {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "sidebar footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Responsiu: col·lapsar sidebar en mòbil */
@media (max-width: 768px) {
  .pagina {
    grid-template-columns: 1fr;
    grid-template-rows: 64px auto 1fr auto;
    grid-template-areas:
      "header"
      "sidebar"
      "main"
      "footer";
  }
}`,
          codeTitle: "grid-areas.css",
          previewHtml: `<div style="display:grid;grid-template-columns:80px 1fr;grid-template-rows:40px 100px 30px;grid-template-areas:'h h' 's m' 's f';gap:4px;height:174px;font-size:0.65rem;">
  <div style="grid-area:h;background:#0070f3;color:white;display:flex;align-items:center;justify-content:center;border-radius:4px;">header</div>
  <div style="grid-area:s;background:#7c3aed;color:white;display:flex;align-items:center;justify-content:center;border-radius:4px;">sidebar</div>
  <div style="grid-area:m;background:#e0f2fe;display:flex;align-items:center;justify-content:center;border-radius:4px;">main</div>
  <div style="grid-area:f;background:#f3f4f6;display:flex;align-items:center;justify-content:center;border-radius:4px;">footer</div>
</div>`,
        },
        {
          title: "auto-fill vs auto-fit amb minmax()",
          body: `
            <p>El patró <code>repeat(auto-fill, minmax(min, 1fr))</code> crea una graella responsiva sense media queries: afegeix tantes columnes com hi càpiguen.</p>
            <ul>
              <li><code>auto-fill</code>: manté cel·les buides si sobra espai.</li>
              <li><code>auto-fit</code>: expandeix les cel·les plenes per omplir l'espai.</li>
            </ul>
          `,
          lang: "css",
          code: `/* Grid de targetes sense media queries */
.grid-targetes {
  display: grid;
  /* Columnes: tantes de mínim 280px com càpiguen */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* auto-fit: si queden 2 targetes a l'última fila,
   s'expandeixen per omplir tota l'amplada */
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Graella de fotos (sense deformar) */
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
}
.galeria img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}`,
          codeTitle: "auto-fill-fit.css",
        },
        {
          title: "Subgrid: alineació de fills de fills",
          body: `
            <p><code>subgrid</code> permet que els fills d'un element de grid participin en la graella del pare, en lloc de crear la seva pròpia. Resol el problema clàssic d'alinear elements interns de targetes.</p>
          `,
          lang: "css",
          code: `/* Sense subgrid: títols i textos desalineats entre targetes */
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

/* AMB subgrid: elements interns alineats entre targetes */
.grid-subgrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.targeta {
  display: grid;
  /* Hereta les files de la graella pare */
  grid-row: span 4;
  grid-template-rows: subgrid;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

/* Ara imatge, títol, text i botó s'alinearan entre targetes */
.targeta img    { grid-row: 1; }
.targeta h2     { grid-row: 2; padding: 1rem 1rem 0; }
.targeta p      { grid-row: 3; padding: 0 1rem; color: #6b7280; }
.targeta button { grid-row: 4; margin: 1rem; }`,
          codeTitle: "subgrid.css",
        },
        {
          title: "Solapament d'elements i línies nomenades",
          body: `
            <p>CSS Grid permet solapar elements intencionadament col·locant-los a les mateixes cel·les. <code>z-index</code> controla l'ordre de profunditat.</p>
            <p>Les <strong>línies nomenades</strong> fan el codi més llegible: <code>[contingut-start]</code> i <code>[contingut-end]</code>.</p>
          `,
          lang: "css",
          code: `/* Hero amb imatge i text solapats */
.hero {
  display: grid;
  /* 1 columna, 1 fila: tots els fills s'hiposicionen */
  grid-template-columns: 1fr;
  grid-template-rows: 500px;
}

.hero > * {
  grid-column: 1;
  grid-row: 1;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero .overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  color: white;
  z-index: 1;
}

/* Línies nomenades */
.layout {
  display: grid;
  grid-template-columns:
    [full-start] 1rem
    [contingut-start] 1fr
    [contingut-end] 1rem
    [full-end];
}

.element-normal { grid-column: contingut; }
.element-full   { grid-column: full; }`,
          codeTitle: "grid-solapament.css",
        },
      ],
      exercise: {
        brief: `<p>Crea el layout complet d'una pàgina de portafolis amb CSS Grid:</p>
<ul>
  <li>Capçalera: full width, 70px d'alçada</li>
  <li>Hero: full width, 500px, amb imatge de fons i text solapt</li>
  <li>Grid de projectes: 3 columnes en desktop (auto-fill, mínim 300px), 1 columna en mòbil</li>
  <li>Cada targeta de projecte: subgrid amb imatge, títol, descripció i link alineats</li>
  <li>Footer: full width</li>
</ul>`,
        hint: `<p>Per al hero amb text solaptat: <code>display: grid; grid-template-areas: "hero";</code> i tots els fills amb <code>grid-area: hero;</code>. Alternativament usa <code>position: relative/absolute</code> per al text. Per al subgrid, primer comprova el suport (<a href="https://caniuse.com/css-subgrid" target="_blank">caniuse</a>).</p>`,
        solution: `<pre><code>.pagina { display: grid; grid-template-rows: 70px 500px auto auto; }
header, .hero, .projectes, footer { grid-column: 1; }
.hero { display: grid; }
.hero > * { grid-column: 1; grid-row: 1; }
.projectes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem; padding: 2rem;
}
@media (max-width: 600px) {
  .projectes { grid-template-columns: 1fr; }
}</code></pre>`,
      },
    },

    {
      slug: "cascade-layers",
      title: "Capes de cascada amb @layer",
      summary:
        "Controlar l'ordre de prioritat del CSS sense dependre de l'especificitat.",
      goals: [
        "Declarar i usar <code>@layer</code> per organitzar CSS.",
        "Entendre com l'ordre dels layers afecta la cascada.",
        "Integrar CSS de tercers amb layers sense conflictes d'especificitat.",
        "Usar <code>revert-layer</code> i <code>!important</code> amb layers.",
      ],
      sections: [
        {
          title: "El problema de l'especificitat",
          body: `
            <p>Quan diverses regles CSS apunten al mateix element, la <strong>especificitat</strong> determina quina guanya. Això provoca guerres d'especificitat: afegir classes extra o <code>!important</code> per sobreescriure estils de biblioteques.</p>
            <p><code>@layer</code> resol això: les capes amb menor prioritat perden sempre davant les de major prioritat, independentment de l'especificitat.</p>
          `,
          lang: "css",
          code: `/* Sense @layer: especificitat problemàtica */
/* La classe de la biblioteca .btn { color: blue; } guanya a la nostra .btn { color: red; }
   si ve carregada després, tot i tenir la mateixa especificitat */

/* AMB @layer: controles l'ordre explícitament */

/* 1. Declarar l'ordre dels layers (el primer té menys prioritat) */
@layer reset, base, biblioteques, components, utilitats;

/* 2. Afegir estils a cada layer */
@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body, h1, h2, h3, p, ul { margin: 0; padding: 0; }
}

@layer base {
  body { font-family: system-ui, sans-serif; line-height: 1.6; }
  a { color: #0070f3; }
}

@layer biblioteques {
  /* Importar Bootstrap dins un layer sense conflictes */
  /* @import url('bootstrap.css'); */
  .btn { padding: 0.4rem 0.8rem; border-radius: 4px; }
}

@layer components {
  /* Els nostres components, amb prioritat sobre biblioteques */
  .btn { padding: 0.6rem 1.2rem; } /* guanya a .btn de biblioteques */
}

@layer utilitats {
  /* Utilitats: màxima prioritat (sense !important!) */
  .hidden { display: none; }
  .sr-only { position: absolute; width: 1px; height: 1px; clip: rect(0,0,0,0); }
}`,
          codeTitle: "cascade-layers.css",
        },
        {
          title: "Importar CSS extern en layers",
          body: `
            <p>Pots importar una biblioteca sencera dins d'un layer: tots els seus estils tindran la prioritat del layer, independentment de la seva especificitat interna.</p>
          `,
          lang: "css",
          code: `/* Importar normalize.css en el layer reset (mínima prioritat) */
@import url('normalize.css') layer(reset);

/* Importar Bootstrap en el layer biblioteques */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css')
  layer(biblioteques);

/* Els nostres estils guanyaran sempre, sense !important */
@layer components {
  /* Sobreescriu Bootstrap sense conflicte */
  .btn-primary {
    background: #7c3aed;
    border-color: #7c3aed;
  }
}

/* Estils fora de qualsevol layer: màxima prioritat */
/* (supera tots els layers) */
.alerta-crítica { background: red !important; }`,
          codeTitle: "import-layers.css",
        },
        {
          title: "revert-layer i !important amb layers",
          body: `
            <p><code>revert-layer</code> reverteix un valor al que tindria en el layer anterior. Molt útil per a reset puntuals.</p>
            <p>Amb <code>!important</code>, l'ordre dels layers s'inverteix: el layer de <em>menys</em> prioritat guanya (el <code>reset</code> pot sobreescriure els <code>components</code>).</p>
          `,
          lang: "css",
          code: `@layer reset, components, utilitats;

@layer reset {
  a { color: blue; text-decoration: underline; }
}

@layer components {
  .nav-link {
    color: white; /* sobreescriu reset */
    text-decoration: none;
  }

  /* En un context específic, revertir al layer anterior */
  .peu-de-pagina .nav-link {
    color: revert-layer; /* torna a color: blue del reset */
  }
}

/* !important inverteix l'ordre:
   reset !important guanya a components !important */
@layer reset {
  a { color: blue !important; } /* guanya sobre components */
}
@layer components {
  .nav a { color: white !important; } /* perd davant reset */
}
/* Per evitar confusions, usa !important el mínim possible amb layers */`,
          codeTitle: "revert-layer.css",
        },
      ],
      exercise: {
        brief: `<p>Organitza els estils d'una aplicació web en layers amb l'ordre correcte. Ha d'incloure:</p>
<ul>
  <li>Layer <code>reset</code>: box-sizing border-box, marges i paddings a 0</li>
  <li>Layer <code>tokens</code>: variables CSS de colors, fonts i espaiat</li>
  <li>Layer <code>base</code>: estils bàsics de body, headings, links</li>
  <li>Layer <code>components</code>: botó primari, targeta, formulari</li>
  <li>Layer <code>utilitats</code>: .hidden, .text-center, .flex, .gap-1</li>
  <li>Demostra que un estil a "utilitats" sobreescriu "components" sense !important</li>
</ul>`,
        hint: `<p>Declara els layers al principi del fitxer en l'ordre correcte: <code>@layer reset, tokens, base, components, utilitats;</code>. El que ve al final té la prioritat més alta.</p>`,
        solution: `<pre><code>@layer reset, tokens, base, components, utilitats;
@layer reset { *, *::before, *::after { box-sizing: border-box; } body,h1,h2,p { margin:0; } }
@layer tokens { :root { --primary: #0070f3; --radius: 6px; --space-1: 0.25rem; } }
@layer base { body { font-family: system-ui; } a { color: var(--primary); } }
@layer components {
  .btn { background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: var(--radius); }
}
@layer utilitats {
  .hidden { display: none; } /* sobreescriu components sense !important */
  .text-center { text-align: center; }
  .flex { display: flex; }
}</code></pre>`,
      },
    },

    {
      slug: "design-tokens",
      title: "Design tokens i sistemes de disseny amb CSS",
      summary:
        "Crear un sistema de disseny consistent amb variables CSS com a tokens primitius i semàntics.",
      goals: [
        "Entendre la diferència entre tokens primitius i semàntics.",
        "Implementar theming clar/fosc amb variables CSS.",
        "Crear una escala tipogràfica i d'espaiat amb tokens.",
        "Integrar tokens CSS amb Tailwind.",
      ],
      sections: [
        {
          title: "Tokens primitius vs semàntics",
          body: `
            <p>Un <strong>design token</strong> és un valor nomenat que representa una decisió de disseny. Hi ha dos nivells:</p>
            <ul>
              <li><strong>Tokens primitius:</strong> valors concrets sense context. <code>--blue-500: #3b82f6</code></li>
              <li><strong>Tokens semàntics:</strong> fan referència als primitius i expressem la seva funció. <code>--color-primary: var(--blue-500)</code></li>
            </ul>
            <p>Els components fan servir tokens semàntics. Quan canvia el tema, només cal redirigir els semàntics.</p>
          `,
          lang: "css",
          code: `/* ===== TOKENS PRIMITIUS ===== */
:root {
  /* Paleta de colors */
  --blue-100: #dbeafe;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;

  --gray-50:  #f9fafb;
  --gray-100: #f3f4f6;
  --gray-500: #6b7280;
  --gray-900: #111827;

  --red-500:   #ef4444;
  --green-500: #22c55e;

  /* Escala tipogràfica */
  --size-xs:   0.75rem;
  --size-sm:   0.875rem;
  --size-base: 1rem;
  --size-lg:   1.125rem;
  --size-xl:   1.25rem;
  --size-2xl:  1.5rem;
  --size-3xl:  1.875rem;
  --size-4xl:  2.25rem;

  /* Escala d'espaiat (base 4px) */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Radis */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Ombres */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
}

/* ===== TOKENS SEMÀNTICS ===== */
:root {
  --color-primary:         var(--blue-600);
  --color-primary-hover:   var(--blue-700);
  --color-primary-light:   var(--blue-100);

  --color-bg:              var(--gray-50);
  --color-surface:         white;
  --color-border:          var(--gray-100);
  --color-text:            var(--gray-900);
  --color-text-muted:      var(--gray-500);

  --color-error:           var(--red-500);
  --color-success:         var(--green-500);
}

/* ===== COMPONENTS (usen tokens semàntics) ===== */
.boto {
  background: var(--color-primary);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--size-sm);
  box-shadow: var(--shadow-sm);
}
.boto:hover { background: var(--color-primary-hover); }`,
          codeTitle: "design-tokens.css",
        },
        {
          title: "Theming clar/fosc",
          body: `
            <p>Amb tokens semàntics, el tema fosc només canvia quins tokens primitius fan servir els semàntics. Els components no canvien gens.</p>
          `,
          lang: "css",
          code: `/* Tokens semàntics - tema clar (per defecte) */
:root {
  --color-bg:        #ffffff;
  --color-surface:   #f9fafb;
  --color-border:    #e5e7eb;
  --color-text:      #111827;
  --color-text-muted: #6b7280;
  --color-primary:   #2563eb;
}

/* Tema fosc: activat per preferència del SO */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:        #0f172a;
    --color-surface:   #1e293b;
    --color-border:    #334155;
    --color-text:      #f1f5f9;
    --color-text-muted: #94a3b8;
    --color-primary:   #60a5fa;
  }
}

/* Tema fosc: activat manualment amb data-theme */
[data-theme="dark"] {
  --color-bg:        #0f172a;
  --color-surface:   #1e293b;
  --color-border:    #334155;
  --color-text:      #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-primary:   #60a5fa;
}

/* Els components NO canvien! */
body {
  background: var(--color-bg);
  color: var(--color-text);
}

.targeta {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}`,
          codeTitle: "dark-theme.css",
        },
        {
          title: "Integrar tokens amb Tailwind",
          body: `
            <p>Tailwind 3 permet extendre els colors, fonts i espaiat amb les teves variables CSS, fent que el sistema de tokens sigui accessible tant des de CSS com des de classes utilitàries.</p>
          `,
          lang: "css",
          code: `/* tailwind.config.js (versió simplificada) */
/* 
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
        },
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
      },
    },
  },
};
*/

/* Ara pots usar: */
/* <div class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover"> */

/* I els tokens CSS per a CSS personalitzat: */
.component-custom {
  background: var(--color-primary);
  border-radius: var(--radius-md);
}`,
          codeTitle: "tokens-tailwind.css",
        },
      ],
      exercise: {
        brief: `<p>Crea un sistema de design tokens complet per a una aplicació de gestió de tasques. Ha d'incloure:</p>
<ul>
  <li>Paleta de colors primitiva (almenys 3 colors base amb 5 tons cadascun)</li>
  <li>Tokens semàntics per a: fons, superfície, text, border, primari, èxit, error, advertència</li>
  <li>Escala tipogràfica (xs a 4xl) i d'espaiat (1 a 16)</li>
  <li>Tema fosc complet via <code>[data-theme="dark"]</code></li>
  <li>Un botó, una targeta i un badge usant exclusivament tokens semàntics</li>
</ul>`,
        hint: `<p>Segueix el principi: els components només fan referència a tokens semàntics (<code>var(--color-primary)</code>), mai a primitius (<code>#2563eb</code>). Això permet canviar temes sense tocar els components.</p>`,
        solution: `<pre><code>:root {
  --blue-500: #3b82f6; --green-500: #22c55e; --red-500: #ef4444;
  --color-primary: var(--blue-500);
  --color-bg: white; --color-text: #111827;
}
[data-theme="dark"] {
  --color-bg: #0f172a; --color-text: #f1f5f9;
  --color-primary: #60a5fa;
}
.boto { background: var(--color-primary); color: white; }
.targeta { background: var(--color-bg); color: var(--color-text); }</code></pre>`,
      },
    },

    {
      slug: "variables-css-dinamiques",
      title: "Variables CSS dinàmiques i JavaScript",
      summary:
        "Modificar variables CSS des de JavaScript per crear temes, animacions i personalitzacions en temps real.",
      goals: [
        "Llegir i modificar variables CSS des de JavaScript.",
        "Animar propietats CSS registrades amb <code>@property</code>.",
        "Passar dades de JS a CSS via variables inline.",
        "Crear un selector de temes dinàmic.",
      ],
      sections: [
        {
          title: "Llegir i modificar variables CSS des de JavaScript",
          body: `
            <p>JavaScript pot interactuar amb les variables CSS:</p>
            <ul>
              <li><code>element.style.setProperty('--var', valor)</code>: estableix una variable en l'element.</li>
              <li><code>getComputedStyle(element).getPropertyValue('--var')</code>: llegeix el valor calculat.</li>
              <li>Modificar <code>:root</code>: afecta tota la pàgina.</li>
            </ul>
          `,
          lang: "html",
          code: `<button id="btn-tema" onclick="canviarTema()">Canviar tema</button>

<style>
  :root {
    --color-bg: #ffffff;
    --color-text: #111827;
    --color-primary: #0070f3;
  }
  body {
    background: var(--color-bg);
    color: var(--color-text);
    transition: background 0.3s, color 0.3s;
  }
</style>

<script>
  let temaFosc = false;

  function canviarTema() {
    temaFosc = !temaFosc;
    const root = document.documentElement;

    if (temaFosc) {
      root.style.setProperty('--color-bg', '#0f172a');
      root.style.setProperty('--color-text', '#f1f5f9');
      root.style.setProperty('--color-primary', '#60a5fa');
    } else {
      root.style.removeProperty('--color-bg');
      root.style.removeProperty('--color-text');
      root.style.removeProperty('--color-primary');
    }
  }

  // Llegir una variable CSS
  const root = document.documentElement;
  const primari = getComputedStyle(root).getPropertyValue('--color-primary').trim();
  console.log('Color primari:', primari); // '#0070f3'
</script>`,
          codeTitle: "js-css-vars.html",
        },
        {
          title: "Variables inline i dades dinàmiques",
          body: `
            <p>Pots passar dades de JavaScript a CSS via variables inline a l'element. Molt útil per a barres de progrés, posicions, angles, etc.</p>
          `,
          lang: "html",
          code: `<style>
  .progress-bar {
    --progress: 0;        /* valor per defecte */
    width: calc(var(--progress) * 1%);
    height: 8px;
    background: #0070f3;
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  /* Carta de joc amb rotació via variable */
  .carta {
    --rotacio: 0deg;
    transform: rotate(var(--rotacio));
    transition: transform 0.3s;
  }

  /* Color d'avatar determinístic per ID d'usuari */
  .avatar {
    background: hsl(calc(var(--hue, 200) * 1deg) 60% 50%);
  }
</style>

<!-- Barra de progrés controlada per JS -->
<div class="progress-bar" id="barra" style="--progress: 30"></div>
<button onclick="actualitzarProgress()">Augmentar</button>

<script>
  let progress = 30;
  function actualitzarProgress() {
    progress = Math.min(100, progress + 10);
    const barra = document.getElementById('barra');
    barra.style.setProperty('--progress', progress);
  }

  // Assignar hue basat en l'ID d'usuari
  document.querySelectorAll('.avatar').forEach(avatar => {
    const userId = parseInt(avatar.dataset.userId);
    avatar.style.setProperty('--hue', userId % 36); // 0-35 → 0-360
  });
</script>`,
          codeTitle: "css-vars-data.html",
        },
        {
          title: "@property: registrar propietats CSS personalitzades",
          body: `
            <p><code>@property</code> permet registrar una variable CSS amb tipus, herència i valor inicial. El gran avantatge: es poden <strong>animar</strong> (les variables CSS normals no s'animen directament).</p>
          `,
          lang: "css",
          code: `/* Registrar la propietat amb tipus */
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@property --color-stop {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

/* Ara podem animar --angle */
.gradient-animat {
  background: conic-gradient(
    from var(--angle),
    #0070f3,
    #7c3aed,
    #0070f3
  );
  animation: rotar 3s linear infinite;
}

@keyframes rotar {
  to { --angle: 360deg; }
}

/* Animar el color d'un gradient */
.boto-gradient {
  --color-stop: 0%;
  background: linear-gradient(
    90deg,
    #0070f3 var(--color-stop),
    #7c3aed
  );
  transition: --color-stop 0.4s;
}
.boto-gradient:hover { --color-stop: 50%; }`,
          codeTitle: "property-animation.css",
        },
      ],
      exercise: {
        brief: `<p>Crea un selector de temes dinàmic amb 4 temes de color predefinits (blau, verd, morat, taronja). Ha d'incloure:</p>
<ul>
  <li>Variables CSS per a color primari, fons i text</li>
  <li>Botons per triar cada tema que actualitzin les variables de <code>:root</code> via JavaScript</li>
  <li>El tema seleccionat es desa a localStorage i es restaura en recarregar</li>
  <li>Transició suau entre temes (0.3s)</li>
  <li>Un component (botó + targeta) que usi les variables i canviï de color automàticament</li>
</ul>`,
        hint: `<p>Desa el tema a localStorage: <code>localStorage.setItem('tema', 'blau')</code>. A l'inici: <code>const temaDesat = localStorage.getItem('tema') || 'blau'</code>. Aplica el tema cridant a la funció d'aplicació del tema.</p>`,
        solution: `<pre><code>const temes = {
  blau:   { '--color-primary': '#2563eb', '--color-bg': '#eff6ff', '--color-text': '#1e3a8a' },
  verd:   { '--color-primary': '#16a34a', '--color-bg': '#f0fdf4', '--color-text': '#14532d' },
  morat:  { '--color-primary': '#7c3aed', '--color-bg': '#faf5ff', '--color-text': '#4c1d95' },
  taronja:{ '--color-primary': '#ea580c', '--color-bg': '#fff7ed', '--color-text': '#7c2d12' },
};

function aplicarTema(nom) {
  const root = document.documentElement;
  Object.entries(temes[nom]).forEach(([k,v]) => root.style.setProperty(k, v));
  localStorage.setItem('tema', nom);
}

aplicarTema(localStorage.getItem('tema') || 'blau');</code></pre>`,
      },
    },

    {
      slug: "accessibilitat-animacions",
      title: "Accessibilitat en animacions i prefers-reduced-motion",
      summary:
        "Crear animacions inclusives que respectin les preferències d'usuari i els estàndards d'accessibilitat.",
      goals: [
        "Fer servir <code>@media (prefers-reduced-motion)</code>.",
        "Distingir entre reduir i eliminar animacions.",
        "Implementar <code>:focus-visible</code> per al focus de teclat.",
        "Comprovar el contrast de colors i <code>forced-colors</code>.",
      ],
      sections: [
        {
          title: "prefers-reduced-motion",
          body: `
            <p>Alguns usuaris pateixen vertigen, epilèpsia o altres condicions que fan les animacions molestes o perilloses. El SO i el navegador exposen la preferència "reduir moviment" via la media query <code>(prefers-reduced-motion: reduce)</code>.</p>
            <p>L'estratègia recomanada: escriu les animacions normalment i sobreescriu-les quan la preferència és reduir. <strong>Reduir ≠ eliminar</strong>: pots mantenir transicions suaus (opacity, color) i eliminar les que mouen elements (translate, rotate, scale).</p>
          `,
          lang: "css",
          code: `/* Animació per defecte */
.targeta {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.targeta:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.spinner {
  animation: girar 1s linear infinite;
}
@keyframes girar { to { transform: rotate(360deg); } }

/* Versió reduïda: sense moviment físic */
@media (prefers-reduced-motion: reduce) {
  .targeta {
    transition: box-shadow 0.3s ease; /* mantenim ombra, eliminem moviment */
  }
  .targeta:hover {
    transform: none; /* eliminem el moviment */
  }

  .spinner {
    animation: none;
    opacity: 0.6; /* feedback visual sense moviment */
  }

  /* Reset global (convenient però agressiu) */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
          codeTitle: "reduced-motion.css",
        },
        {
          title: "focus-visible: focus accessible sense estètica trencada",
          body: `
            <p><code>:focus</code> mostra l'anell de focus sempre que l'element rep focus (clic o teclat). Molts dissenyadors l'eliminen perquè queda "lleig" amb el ratolí. <code>:focus-visible</code> el mostra <em>només</em> quan l'usuari navega per teclat o programàticament.</p>
          `,
          lang: "css",
          code: `/* MAL: eliminar el focus completament */
/* button:focus { outline: none; } ← EVITAR */

/* BÉ: eliminar per ratolí, mantenir per teclat */
button:focus:not(:focus-visible) {
  outline: none;
}

button:focus-visible {
  outline: 3px solid #0070f3;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Recomanació moderna: usar només :focus-visible */
:focus-visible {
  outline: 3px solid #0070f3;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Links: sovint volen un estil diferent */
a:focus-visible {
  outline: 3px solid #0070f3;
  outline-offset: 4px;
  border-radius: 2px;
  text-decoration: underline;
}

/* Input: el focus és part de l'estil */
input:focus-visible {
  outline: none; /* substituïm per box-shadow */
  box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.3);
  border-color: #0070f3;
}`,
          codeTitle: "focus-visible.css",
        },
        {
          title: "Contrast de colors i forced-colors",
          body: `
            <p>El contrast entre text i fons ha de complir les WCAG: <strong>AA</strong> (4.5:1 per a text normal, 3:1 per a text gran) o <strong>AAA</strong> (7:1).</p>
            <p><code>forced-colors</code> és el mode d'alt contrast de Windows. El navegador substitueix colors per una paleta d'alt contrast. Cal assegurar-se que els components segueixen funcionant.</p>
          `,
          lang: "css",
          code: `/* Comprova contrast: fons blanc, text #767676 → ratio 4.48:1 (just AA) */
/* Millor: text #595959 → ratio 7:1 (AAA) */

body {
  color: #1a1a1a; /* ratio ~16:1 sobre blanc → excel·lent */
  background: white;
}

/* Assured contrast per a text sobre fons de color */
.etiqueta-primari {
  background: #0070f3;
  color: white; /* blanc sobre blau → 4.5:1 ✓ */
}

/* forced-colors: Windows High Contrast Mode */
@media (forced-colors: active) {
  .boto {
    /* Usar paraules clau del sistema d'alt contrast */
    background: ButtonFace;
    color: ButtonText;
    border: 2px solid ButtonText;
    forced-color-adjust: none; /* controla tu els colors */
  }

  /* Les ombres desapareixen en forced-colors: usar border en comptes */
  .targeta {
    border: 1px solid CanvasText;
    box-shadow: none;
  }
}`,
          codeTitle: "contrast-forced-colors.css",
          note: `<strong>Eina:</strong> Comprova el ràtio de contrast a <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener">WebAIM Contrast Checker</a> o directament a les DevTools (inspector de colors).`,
        },
      ],
      exercise: {
        brief: `<p>Crea un component de notificació (toast) animat que sigui completament accessible:</p>
<ul>
  <li>Apareix des de baix amb una animació de slide-up</li>
  <li>Desapareix amb fade-out després de 3 segons</li>
  <li>Amb <code>prefers-reduced-motion: reduce</code>: apareix i desapareix amb fade (sense moviment)</li>
  <li>Té un botó de tancament amb <code>:focus-visible</code> visible</li>
  <li>Usa <code>role="status"</code> o <code>role="alert"</code> per notificar lectors de pantalla</li>
  <li>Contrast de text adequat (mínim 4.5:1)</li>
</ul>`,
        hint: `<p>L'animació de slide-up: <code>@keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }</code>. Amb reduced-motion: <code>@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</code>.</p>`,
        solution: `<pre><code>@keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes fadeOut { to { opacity: 0; } }
.toast { animation: slideUp 0.3s ease, fadeOut 0.3s ease 2.7s forwards; }
@media (prefers-reduced-motion: reduce) {
  @keyframes slideUp { from { opacity: 0; } to { opacity: 1; } }
}
.toast button:focus-visible { outline: 3px solid white; outline-offset: 2px; }</code></pre>`,
      },
    },

    {
      slug: "arquitectura-css",
      title: "Arquitectura CSS: BEM, ITCSS i utilitats",
      summary:
        "Metodologies per organitzar CSS a gran escala: mantenible, escalable i sense guerres d'especificitat.",
      goals: [
        "Aplicar la convenció BEM (Block__Element--Modifier).",
        "Entendre l'estructura en capes d'ITCSS.",
        "Comparar utility-first (Tailwind) amb CSS tradicional.",
        "Triar la metodologia adequada per a cada projecte.",
      ],
      sections: [
        {
          title: "BEM: Block, Element, Modifier",
          body: `
            <p>BEM és una convenció de noms que fa els selectors autodescriptius i evita la cascada involuntària:</p>
            <ul>
              <li><strong>Block:</strong> component independent. <code>.targeta</code></li>
              <li><strong>Element:</strong> fill d'un block. <code>.targeta__titol</code></li>
              <li><strong>Modifier:</strong> variació. <code>.targeta--destacada</code></li>
            </ul>
            <p>Avantatges: especificitat sempre igual (una classe), codi autodescriptiu, fàcil de reutilitzar.</p>
          `,
          lang: "css",
          code: `/* BEM aplicat a una targeta de producte */

/* Block */
.producte {
  display: grid;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

/* Elements */
.producte__imatge {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.producte__cos {
  padding: 1rem;
}

.producte__titol {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.producte__preu {
  color: #0070f3;
  font-weight: bold;
  font-size: 1.25rem;
}

.producte__boto {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Modifiers */
.producte--destacat {
  border-color: #0070f3;
  border-width: 2px;
}

.producte--esgota {
  opacity: 0.6;
  pointer-events: none;
}

.producte__preu--rebaix {
  color: #ef4444;
}`,
          codeTitle: "bem.css",
        },
        {
          title: "ITCSS: Inverted Triangle CSS",
          body: `
            <p>ITCSS organitza el CSS en capes ordenades per especificitat i abast, formant un triangle invertit: les capes superiors són generals i de baixa especificitat; les inferiors, específiques i d'alta especificitat.</p>
          `,
          table: {
            head: ["Capa", "Contingut", "Especificitat"],
            rows: [
              ["Settings", "Variables CSS, tokens, configuració", "Cap (no genera CSS)"],
              ["Tools", "Mixins i funcions (Sass)", "Cap (no genera CSS)"],
              ["Generic", "Reset, normalize, box-sizing", "Molt baixa"],
              ["Elements", "Estils d'etiquetes HTML (h1, p, a)", "Baixa"],
              ["Objects", "Patrons de layout no decorats (.container, .grid)", "Mitja"],
              ["Components", "Components UI decorats (.btn, .targeta)", "Mitja-alta"],
              ["Utilities", "Classes de sobreescriptura (!important permet)", "Alta"],
            ],
          },
          lang: "css",
          code: `/* Estructura de fitxers ITCSS */
/*
  styles/
  ├── settings/
  │   ├── _colors.css
  │   └── _typography.css
  ├── generic/
  │   ├── _reset.css
  │   └── _box-sizing.css
  ├── elements/
  │   ├── _headings.css
  │   └── _links.css
  ├── objects/
  │   ├── _container.css
  │   └── _grid.css
  ├── components/
  │   ├── _button.css
  │   ├── _card.css
  │   └── _navbar.css
  ├── utilities/
  │   ├── _spacing.css
  │   └── _display.css
  └── main.css  ← importa tot en ordre
*/

/* main.css */
@import './settings/colors.css';
@import './generic/reset.css';
@import './elements/headings.css';
@import './objects/container.css';
@import './components/button.css';
@import './utilities/spacing.css';

/* Combinació recomanada: ITCSS + @layer */
@layer settings, generic, elements, objects, components, utilities;`,
          codeTitle: "itcss.css",
        },
        {
          title: "Utility-first vs Component-based",
          body: `
            <p>Utility-first (Tailwind) aplica classes atòmiques directament a l'HTML. Component-based (BEM, CSS Modules) encapsula estils en classes semàntiques.</p>
          `,
          table: {
            head: ["Aspecte", "Utility-first (Tailwind)", "Component-based (BEM)"],
            rows: [
              ["Velocitat de prototipat", "Molt alta", "Mitja"],
              ["Tamany del CSS final", "Petit (purge automàtic)", "Pot créixer"],
              ["Llegibilitat HTML", "Baixa (moltes classes)", "Alta (classes semàntiques)"],
              ["Reutilització de components", "Via @apply o components de framework", "Natural"],
              ["Corba d'aprenentatge", "Mitja (memoritzar classes)", "Baixa (CSS estàndard)"],
              ["Customització de disseny", "Via config de Tailwind", "Lliure"],
              ["Recomanat per a", "Projectes ràpids, equips React/Vue", "Biblioteques, design systems"],
            ],
          },
          lang: "css",
          code: `/* El mateix botó en 3 metodologies */

/* 1. BEM pur */
.boto { background: #0070f3; color: white; padding: 0.5rem 1rem; }
.boto--gran { padding: 0.75rem 1.5rem; }
/* HTML: <button class="boto boto--gran"> */

/* 2. Utility-first (Tailwind) */
/* HTML: <button class="bg-blue-600 text-white px-4 py-2 text-lg rounded"> */

/* 3. CSS Modules (en React/Vue) */
/* boto.module.css */
.boto { background: #0070f3; color: white; }
/* Component: <button className={styles.boto}> */
/* El compilador genera: <button class="boto_a1b2c3"> */

/* 4. Híbrid recomanat per a projectes grans:
   ITCSS + @layer + BEM per a components + utilitats */
@layer components {
  .btn { /* estil base */ }
  .btn--primary { /* variació */ }
}
@layer utilities {
  .mt-auto { margin-top: auto; }
  .hidden { display: none; }
}`,
          codeTitle: "metodologies.css",
        },
      ],
      exercise: {
        brief: `<p>Organitza els estils d'un formulari de contacte seguint l'arquitectura ITCSS + BEM:</p>
<ul>
  <li>Settings: tokens de color i espaiat com a variables CSS</li>
  <li>Generic: reset de margin/padding, box-sizing</li>
  <li>Elements: estil de <code>label</code>, <code>input</code>, <code>button</code> base (sense classes)</li>
  <li>Components: classe <code>.formulari</code> (block), <code>.formulari__camp</code>, <code>.formulari__label</code>, <code>.formulari__input</code>, <code>.formulari__boto</code></li>
  <li>Modifiers: <code>.formulari__input--error</code>, <code>.formulari__boto--secundari</code></li>
  <li>Utilities: <code>.sr-only</code>, <code>.text-error</code>, <code>.mt-1</code></li>
</ul>`,
        hint: `<p>Segueix el principi: els Elements defineixen estils globals per etiqueta (p.ex. tots els <code>input</code>), i els Components els refinen per classe (p.ex. <code>.formulari__input</code> sobreescriu o complementa l'input base).</p>`,
        solution: `<pre><code>/* Settings */
:root { --color-primary: #0070f3; --color-error: #ef4444; --space-1: 0.25rem; }
/* Generic */
*, *::before, *::after { box-sizing: border-box; }
/* Elements */
input { border: 1px solid #d1d5db; padding: 0.5rem; border-radius: 4px; width: 100%; }
/* Components - BEM */
.formulari { max-width: 480px; display: grid; gap: 1rem; }
.formulari__camp { display: flex; flex-direction: column; gap: 0.25rem; }
.formulari__input--error { border-color: var(--color-error); }
/* Utilities */
.sr-only { position:absolute; width:1px; height:1px; clip:rect(0,0,0,0); }
.text-error { color: var(--color-error); font-size: 0.75rem; }</code></pre>`,
      },
    },
  ],
};

