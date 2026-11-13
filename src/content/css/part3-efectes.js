export default {
  title: "Disposició i efectes visuals",
  description:
    "Com es col·loquen els elements a la pàgina i com es poden transformar, moure i acolorir amb fons i efectes.",
  chapters: [
    {
      slug: "display-layout-basics",
      title: "La propietat display i les bases del layout",
      summary:
        "Block, inline, inline-block o none: la propietat que decideix com ocupa l'espai cada element.",
      goals: [
        "Diferenciar elements de bloc i en línia.",
        "Fer servir <code>inline-block</code> i <code>display: none</code>.",
        "Saber quan cal Flexbox o Grid.",
      ],
      sections: [
        {
          title: "Bloc i en línia",
          body: `
            <p>Els elements de <strong>bloc</strong> ocupen tota l'amplada disponible i comencen en una línia nova. Els elements <strong>en línia</strong> ocupen només el seu contingut i no accepten amplada ni alçada.</p>
            <p>Amb <code>display</code> pots canviar aquest comportament: un <code>li</code> pot ser en línia per fer un menú, i un <code>a</code> pot ser de bloc per fer una targeta clicable.</p>
          `,
          lang: "css",
          code: `.menu li {
  display: inline-block;
  margin-right: 12px;
}

.targeta {
  display: block;
  padding: 16px;
  border: 1px solid #ddd6c7;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
}`,
          previewHtml: `<ul class="menu"><li>Inici</li><li>Capítols</li><li>Contacte</li></ul>
<a class="targeta" href="#">Un enllaç que es comporta com una targeta</a>`,
        },
        {
          title: "Amagar elements",
          body: `
            <p><code>display: none</code> treu l'element del disseny: no ocupa espai ni és llegit pels lectors de pantalla. <code>visibility: hidden</code> el fa invisible però conserva el seu lloc.</p>
            <p>Per amagar contingut només visualment, però deixar-lo accessible, es fa servir la classe <em>sr-only</em>: retallada a un píxel i fora de la vista.</p>
          `,
          lang: "css",
          code: `.amagat { display: none; }
.invisible { visibility: hidden; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}`,
          previewHtml: `<p>Abans</p><p class="amagat">No ocupo espai</p><p class="invisible">Ocupo espai però no em veus</p><p>Després</p>`,
        },
        {
          title: "Quan passar a Flexbox o Grid",
          body: `
            <p><code>display</code> també activa els grans sistemes de layout: <code>display: flex</code> per a una fila o columna d'elements, i <code>display: grid</code> per a una graella de dues dimensions.</p>
            <p>Regla pràctica: una dimensió (una fila o una columna) ➜ Flexbox. Dues dimensions alhora ➜ Grid.</p>
          `,
          lang: "css",
          code: `.fila {
  display: flex;
  gap: 12px;
  align-items: center;
}

.graella {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}`,
          previewHtml: `<div class="fila"><span style="background:#fdf2d0;padding:8px;border-radius:6px">Un</span><span style="background:#fdf2d0;padding:8px;border-radius:6px">Dos</span></div>
<div class="graella" style="margin-top:12px"><div style="background:#e8f5ef;padding:12px;border-radius:6px">A</div><div style="background:#e8f5ef;padding:12px;border-radius:6px">B</div><div style="background:#e8f5ef;padding:12px;border-radius:6px">C</div></div>`,
        },
      ],
      exercise: {
        brief:
          "Converteix una llista en un menú horitzontal amb <code>inline-block</code> i, després, fes el mateix amb <code>display: flex</code>. Compara quina versió és més fàcil de centrar.",
        hint: "Amb Flexbox n'hi ha prou amb <code>justify-content: center</code> al contenidor.",
      },
    },
    {
      slug: "positionament",
      title: "Posicionament: control total de la col·locació",
      summary:
        "Cinc maneres de posicionar un element i com combinar-les amb <code>top</code>, <code>left</code> i <code>z-index</code>.",
      goals: [
        "Distingir <code>static</code>, <code>relative</code>, <code>absolute</code>, <code>fixed</code> i <code>sticky</code>.",
        "Entendre el context de posicionament.",
        "Controlar l'apilament amb <code>z-index</code>.",
      ],
      sections: [
        {
          title: "Els cinc valors",
          body: `
            <ul>
              <li><code>static</code> ➜ el flux normal (per defecte).</li>
              <li><code>relative</code> ➜ es desplaça respecte a la seva posició original, sense treure espai als altres.</li>
              <li><code>absolute</code> ➜ surt del flux i es col·loca respecte al primer ancestre posicionat.</li>
              <li><code>fixed</code> ➜ respecte a la finestra: no es mou en fer scroll.</li>
              <li><code>sticky</code> ➜ es comporta com a relatiu fins que arriba a un llindar, i llavors s'enganxa.</li>
            </ul>
          `,
          lang: "css",
          code: `.targeta { position: relative; padding: 16px; background: #f6f0e6; }

.etiqueta {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #b85c3a;
  color: #fff;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
}`,
          previewHtml: `<div class="targeta"><span class="etiqueta">NOU</span><p style="margin:0">Una targeta amb una etiqueta posicionada.</p></div>`,
        },
        {
          title: "Sticky i capçaleres",
          body: `
            <p><code>position: sticky</code> necessita un desplaçament (<code>top: 0</code>) i un ancestre amb alçada suficient. És la manera habitual de fer una capçalera o una columna de navegació que acompanya el scroll.</p>
          `,
          lang: "css",
          code: `.capcalera {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgb(251 248 242 / 0.9);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #e5ded0;
  padding: 10px 16px;
}`,
          previewHtml: `<div style="height:180px;overflow:auto;border:1px solid #e5ded0;border-radius:10px">
  <div class="capcalera"><strong>Capçalera enganxada</strong></div>
  <p style="padding:0 16px">Contingut…</p><p style="padding:0 16px">Contingut…</p><p style="padding:0 16px">Contingut…</p><p style="padding:0 16px">Contingut…</p><p style="padding:0 16px">Contingut…</p>
</div>`,
        },
        {
          title: "z-index i apilament",
          body: `
            <p><code>z-index</code> només funciona en elements posicionats (o amb <code>display: flex/grid</code> com a fills). Com més gran el número, més a prop de l'usuari.</p>
            <p>Evita valors com <code>9999</code>: defineix una escala curta i coherent (10, 20, 40, 100) per a capçaleres, menús i diàlegs.</p>
          `,
          lang: "css",
          code: `.caixa { position: absolute; width: 90px; height: 90px; border-radius: 10px; }
.un { top: 10px; left: 10px; background: #b85c3a; z-index: 1; }
.dos { top: 40px; left: 50px; background: #1f7a5c; z-index: 2; }`,
          previewHtml: `<div style="position:relative;height:150px">
  <div class="caixa un"></div><div class="caixa dos"></div>
</div>`,
          note: "Un <code>z-index</code> enorme no guanya mai sobre un element d'un context d'apilament superior: revisa els <code>position</code> i els <code>transform</code> dels pares.",
        },
      ],
      exercise: {
        brief:
          "Crea una targeta amb una insígnia a la cantonada superior dreta i una capçalera que quedi enganxada en fer scroll dins d'un contenidor.",
        hint: "Si l'<code>absolute</code> se'n va massa lluny, comprova que el pare tingui <code>position: relative</code>.",
      },
    },
    {
      slug: "transicions-transforms",
      title: "Transicions, transformacions i efectes visuals",
      summary:
        "Fer que els canvis passin suaument: <code>transition</code>, <code>transform</code>, ombres i filtres.",
      goals: [
        "Animar propietats amb <code>transition</code>.",
        "Moure, escalar i girar amb <code>transform</code>.",
        "Respectar <code>prefers-reduced-motion</code>.",
      ],
      sections: [
        {
          title: "Transicions",
          body: `
            <p>Una transició interpola un canvi de valor: si el color final és diferent, el navegador passa per tots els intermedis durant el temps indicat.</p>
            <p>La forma curta és <code>transition: propietat durada temporització retard</code>. Durades de 150 a 250 ms se senten àgils; més de 400 ms comencen a molestar.</p>
          `,
          lang: "css",
          code: `.boto {
  background: #b85c3a;
  color: #fff;
  padding: 10px 18px;
  border: 0;
  border-radius: 8px;
  transition: background-color 180ms ease, transform 180ms ease;
}

.boto:hover { background: #9d4b2e; transform: translateY(-1px); }`,
          previewHtml: `<button class="boto">Passa el ratolí</button>`,
        },
        {
          title: "Transformacions",
          body: `
            <p><code>transform</code> no afecta el disseny dels veïns: mou i escalona l'element sense desplaçar res. Accepta diverses funcions alhora i s'executen en ordre.</p>
            <ul>
              <li><code>translate(x, y)</code> ➜ desplaça.</li>
              <li><code>scale(n)</code> ➜ escala.</li>
              <li><code>rotate(deg)</code> ➜ gira.</li>
              <li><code>skew(deg)</code> ➜ inclina.</li>
            </ul>
          `,
          lang: "css",
          code: `.imatge {
  transition: transform 240ms ease;
  transform-origin: center;
}

.imatge:hover { transform: scale(1.04) rotate(-1deg); }`,
          previewHtml: `<img class="imatge" src="https://picsum.photos/id/1015/320/200" alt="Riu de muntanya" style="border-radius:10px;max-width:100%">`,
        },
        {
          title: "Ombres, filtres i accessibilitat",
          body: `
            <p><code>box-shadow</code> crea profunditat i <code>filter</code> aplica efectes com desenfocar, aclarir o passar a escala de grisos. Tots dos són barats si no abusen.</p>
            <p>Algunes persones pateixen marejos amb el moviment: embolcalla sempre les animacions en una consulta de preferència.</p>
          `,
          lang: "css",
          code: `.targeta {
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 12px 28px rgb(60 40 20 / 0.12);
}

.targeta img { filter: grayscale(1); transition: filter 200ms ease; }
.targeta:hover img { filter: none; }

@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; }
}`,
          previewHtml: `<div class="targeta"><img src="https://picsum.photos/id/1025/320/160" alt="Gos" style="max-width:100%;border-radius:8px"><p style="margin:10px 0 0">Pasa el ratolí per veure el color.</p></div>`,
        },
      ],
      exercise: {
        brief:
          "Fes una targeta que s'elevi lleugerament i projecti més ombra en passar el ratolí, amb una transició de 200 ms i respectant <code>prefers-reduced-motion</code>.",
        hint: "Anima només <code>transform</code> i <code>box-shadow</code>: són les propietats que el navegador pot dibuixar més de pressa.",
      },
    },
    {
      slug: "degradats",
      title: "Degradats i fons avançats",
      summary:
        "Lineals, radials i cònics: colors que es fonen sense necessitat d'imatges.",
      goals: [
        "Escriure <code>linear-gradient</code> i <code>radial-gradient</code>.",
        "Controlar les parades de color.",
        "Combinar degradats amb altres fons.",
      ],
      sections: [
        {
          title: "Degradat lineal",
          body: `
            <p><code>linear-gradient(direcció, color1, color2)</code> crea una transició recta. La direcció pot ser un angle (<code>135deg</code>) o una paraula (<code>to right</code>).</p>
            <p>Les parades de color admeten posicions: <code>#b85c3a 0%, #f0a26b 50%, #1f7a5c 100%</code>.</p>
          `,
          lang: "css",
          code: `.franja {
  background: linear-gradient(120deg, #b85c3a, #e09b6a 45%, #1f7a5c);
  color: #fff;
  padding: 28px;
  border-radius: 14px;
}

.ratlles {
  background: repeating-linear-gradient(45deg, #fdf2d0 0 10px, #f6e7c1 10px 20px);
  padding: 20px;
  border-radius: 14px;
}`,
          previewHtml: `<div class="franja"><strong>Capçalera amb degradat</strong></div><div class="ratlles" style="margin-top:10px">Patró repetit</div>`,
        },
        {
          title: "Degradats radials i cònics",
          body: `
            <p><code>radial-gradient</code> parteix d'un centre i creix en cercle o el·lipse. <code>conic-gradient</code> gira al voltant d'un punt: ideal per a gràfics circulars i indicadors.</p>
          `,
          lang: "css",
          code: `.rodo {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ffe8c9, #b85c3a 70%);
}

.anell {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: conic-gradient(#1f7a5c 0 65%, #e8e2d5 65% 100%);
  display: grid;
  place-items: center;
  font: 700 15px system-ui;
}`,
          previewHtml: `<div style="display:flex;gap:14px"><div class="rodo"></div><div class="anell"><span style="background:#fff;width:74px;height:74px;border-radius:50%;display:grid;place-items:center">65%</span></div></div>`,
        },
        {
          title: "Text amb degradat i límits",
          body: `
            <p>Per pintar el text amb un degradat es fa servir <code>background-clip: text</code> amb el text transparent. És un recurs vistós però cal comprovar-ne el contrast: sobre fons clar, els tons clars del degradat perden llegibilitat.</p>
          `,
          lang: "css",
          code: `.titol-degradat {
  background: linear-gradient(90deg, #8f3a1c, #1f7a5c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font: 700 34px/1.15 Georgia, serif;
}`,
          previewHtml: `<h2 class="titol-degradat">Títol amb degradat</h2>`,
          note: "El degradat és decoratiu: si el text conté informació essencial, assegura un contrast mínim de 4,5:1 en tota la paraula.",
        },
      ],
      exercise: {
        brief:
          "Crea tres tipus de degradat: un de lineal per a una capçalera, un de radial per a un avatar i un de cònic per a un indicador de progrés.",
        hint: "Pots combinar degradats amb imatges posant-los com a capes separades per comes a <code>background</code>.",
      },
    },
    {
      slug: "pseudo-classes-elements",
      title: "Pseudo-classes i pseudo-elements",
      summary:
        "Estats i parts dels elements que no existeixen a l'HTML: <code>:hover</code>, <code>:nth-child</code>, <code>::before</code> i molt més.",
      goals: [
        "Estilitzar estats amb pseudo-classes.",
        "Seleccionar per posició amb <code>nth-child</code>.",
        "Afegir contingut decoratiu amb <code>::before</code> i <code>::after</code>.",
      ],
      sections: [
        {
          title: "Pseudo-classes d'estat",
          body: `
            <p>Descriuen una situació de l'element: el ratolí a sobre, el focus, un enllaç ja visitat, un camp desactivat.</p>
            <ul>
              <li><code>:hover</code> ➜ el punter hi és a sobre.</li>
              <li><code>:focus-visible</code> ➜ el focus és visible (teclat).</li>
              <li><code>:checked</code> ➜ casella o opció marcada.</li>
              <li><code>:disabled</code> ➜ camp desactivat.</li>
              <li><code>:first-child</code>, <code>:last-child</code> ➜ posició entre germans.</li>
            </ul>
          `,
          lang: "css",
          code: `input:focus-visible {
  outline: 2px solid #1f7a5c;
  outline-offset: 2px;
}

input:disabled { background: #efe9dc; color: #8a8578; }

li:first-child { font-weight: 700; }`,
          previewHtml: `<p><input placeholder="Escriu aquí" style="padding:6px;border:1px solid #ccc;border-radius:6px"></p>
<p><input value="Desactivat" disabled style="padding:6px;border:1px solid #ccc;border-radius:6px"></p>
<ul><li>Primer (en negreta)</li><li>Segon</li></ul>`,
        },
        {
          title: "Selecció per posició",
          body: `
            <p><code>:nth-child()</code> accepta números, paraules clau (<code>odd</code>, <code>even</code>) i fórmules com <code>3n+1</code>. És la manera neta de fer taules amb files alternes.</p>
            <p><code>:not()</code> exclou una condició i estalvia moltes regles.</p>
          `,
          lang: "css",
          code: `table tbody tr:nth-child(even) { background: #f8f3e8; }

li:nth-child(3n) { color: #1f7a5c; }

.menu a:not(:last-child) { margin-right: 14px; }`,
          previewHtml: `<table style="border-collapse:collapse;width:100%"><tbody>
<tr><td style="padding:6px">Fila 1</td></tr><tr><td style="padding:6px">Fila 2</td></tr>
<tr><td style="padding:6px">Fila 3</td></tr><tr><td style="padding:6px">Fila 4</td></tr>
</tbody></table>`,
        },
        {
          title: "Pseudo-elements",
          body: `
            <p><code>::before</code> i <code>::after</code> creen una caixa decorativa dins de l'element. Necessiten la propietat <code>content</code>, encara que sigui buida.</p>
            <p>Es fan servir per a icones, marcadors, cometes de citació o línies decoratives. No han de contenir informació essencial: no sempre són accessibles.</p>
          `,
          lang: "css",
          code: `.cita {
  position: relative;
  padding-left: 22px;
  font-style: italic;
}

.cita::before {
  content: "\\201C";
  position: absolute;
  left: 0;
  top: -6px;
  font: 700 34px/1 Georgia, serif;
  color: #b85c3a;
}`,
          previewHtml: `<blockquote class="cita" style="margin:0">Aprendre CSS és aprendre a mirar.</blockquote>`,
        },
      ],
      exercise: {
        brief:
          "Fes una taula amb files alternes, un botó amb estat <code>:hover</code> i <code>:focus-visible</code> i una citació amb cometes fetes amb <code>::before</code>.",
        hint: "Col·loca les pseudo-classes sempre en aquest ordre: <code>:link</code>, <code>:visited</code>, <code>:hover</code>, <code>:focus</code>, <code>:active</code>.",
      },
    },
  ],
};