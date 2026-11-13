export default {
  title: "Disseny responsiu i layout modern",
  description:
    "Adaptar el disseny a qualsevol pantalla i construir estructures amb Flexbox, Grid i animacions.",
  chapters: [
    {
      slug: "disseny-responsiu",
      title: "Disseny responsiu i media queries",
      summary:
        "Un sol codi, totes les pantalles. Aprèn a treballar de mòbil cap a escriptori amb punts de ruptura clars.",
      goals: [
        "Escriure <em>media queries</em> amb criteris de mòbil primer.",
        "Triar punts de ruptura segons el contingut.",
        "Adaptar tipografia i imatges.",
      ],
      sections: [
        {
          title: "Mòbil primer",
          body: `
            <p>L'estratègia recomanada és escriure primer l'estil per a pantalles petites i afegir complexitat amb <code>min-width</code>. Així el codi base és el més simple i les millores són additives.</p>
            <p>Els punts de ruptura habituals són 640, 768, 1024 i 1280 px, però el bo és el que el teu contingut necessiti: eixampla la finestra fins que el disseny es trenqui i posa-hi el punt allà.</p>
          `,
          lang: "css",
          code: `.graella { display: grid; gap: 14px; }

@media (min-width: 640px) {
  .graella { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .graella { grid-template-columns: repeat(3, 1fr); }
}`,
          previewHtml: `<div class="graella">
  <div style="background:#fdf2d0;padding:16px;border-radius:8px">Targeta 1</div>
  <div style="background:#fdf2d0;padding:16px;border-radius:8px">Targeta 2</div>
  <div style="background:#fdf2d0;padding:16px;border-radius:8px">Targeta 3</div>
</div>`,
        },
        {
          title: "Tipografia i imatges que s'adapten",
          body: `
            <p>Per a text, <code>clamp()</code> substitueix diverses media queries per a la mida dels titulars. Per a imatges, <code>max-width: 100%</code> i <code>srcset</code> des de l'HTML.</p>
            <p>Per amagar contingut secundari en mòbil, pensa-ho dues vegades: sovint és millor reorganitzar-lo que eliminar-lo.</p>
          `,
          lang: "css",
          code: `h1 { font-size: clamp(1.75rem, 5vw, 3rem); }

img { max-width: 100%; height: auto; }

.columna-lateral { display: none; }

@media (min-width: 1024px) {
  .columna-lateral { display: block; }
}`,
          previewHtml: `<h1>Un titular fluid</h1><p>Canvia l'amplada de la finestra per veure com canvia la mida.</p>`,
        },
        {
          title: "Consultes de contenidor",
          body: `
            <p>Les <em>container queries</em> permeten que un component s'adapti a l'amplada del seu contenidor, no de la finestra. Són ideals per a components reutilitzables en contexts diferents.</p>
            <p>Cal declarar el contenidor amb <code>container-type: inline-size</code> i després consultar-lo amb <code>@container</code>.</p>
          `,
          lang: "css",
          code: `.targeta-contenidor { container-type: inline-size; }

.fitxa { display: grid; gap: 10px; }

@container (min-width: 420px) {
  .fitxa { grid-template-columns: 120px 1fr; align-items: center; }
}`,
          previewHtml: `<div class="targeta-contenidor" style="border:1px solid #e5ded0;border-radius:10px;padding:12px">
  <div class="fitxa"><img src="https://picsum.photos/id/1043/240/160" alt="Bosc" style="border-radius:8px;max-width:100%"><p style="margin:0">La imatge i el text es col·loquen en dues columnes quan hi ha espai.</p></div>
</div>`,
        },
      ],
      exercise: {
        brief:
          "Construeix una graella de targetes que passi d'una a dues i a tres columnes, amb titulars fluids i imatges que no desbordin.",
        hint: "Redueix la finestra fins a 320 px i comprova que no apareix cap barra horitzontal.",
      },
    },
    {
      slug: "selectors-avancats",
      title: "Selectors avançats i selecció per atribut",
      summary:
        "Seleccionar sense afegir classes: atributs, <code>:is()</code>, <code>:where()</code>, <code>:has()</code> i fórmules de posició.",
      goals: [
        "Seleccionar per atribut i per valor parcial.",
        "Simplificar llistes de selectors amb <code>:is()</code> i <code>:where()</code>.",
        "Fer servir <code>:has()</code> per estilitzar pares.",
      ],
      sections: [
        {
          title: "Selectors d'atribut",
          body: `
            <p>Permeten estilitzar elements segons un atribut, sense tocar l'HTML:</p>
            <ul>
              <li><code>a[target="_blank"]</code> ➜ enllaços que s'obren en una pestanya nova.</li>
              <li><code>[href^="https"]</code> ➜ comença per.</li>
              <li><code>[href$=".pdf"]</code> ➜ acaba amb.</li>
              <li><code>[class*="btn"]</code> ➜ conté el text.</li>
            </ul>
          `,
          lang: "css",
          code: `a[href$=".pdf"]::after {
  content: " (PDF)";
  font-size: 0.8em;
  color: #b85c3a;
}

a[target="_blank"] { font-weight: 600; }

input[type="email"] { border-color: #1f7a5c; }`,
          previewHtml: `<p><a href="apunts.pdf">Descarrega els apunts</a></p>
<p><a href="https://example.com" target="_blank">Enllaç extern</a></p>
<p><input type="email" placeholder="correu" style="padding:6px;border:2px solid #ccc;border-radius:6px"></p>`,
        },
        {
          title: ":is() i :where()",
          body: `
            <p>Agrupen selectors dins d'una sola regla sense repetir la resta. <code>:where()</code> té especificitat zero, cosa que el fa perfecte per a reinicis que després vols sobreescriure fàcilment.</p>
          `,
          lang: "css",
          code: `:is(h1, h2, h3) { line-height: 1.2; margin: 0 0 0.5em; }

:where(ul, ol) { padding-left: 1.1rem; }

article :is(h2, h3) + p { color: #4a4a45; }`,
          previewHtml: `<h2>Subtítol</h2><p>Paràgraf just després del subtítol.</p><ul><li>Element de llista</li></ul>`,
        },
        {
          title: ":has() i fórmules avançades",
          body: `
            <p><code>:has()</code> selecciona un element que <em>conté</em> una altra cosa. És la manera de fer que el pare reaccioni al fill sense JavaScript.</p>
            <p>També pots combinar <code>:nth-child()</code> amb <code>:not()</code> per tractar només una part dels elements.</p>
          `,
          lang: "css",
          code: `.camp:has(input:invalid) { border-color: #c0392b; }

.targeta:has(img) { padding-top: 0; }

li:nth-child(n + 4):not(:last-child) { opacity: 0.5; }`,
          previewHtml: `<div class="camp" style="border:2px solid #ccc;border-radius:8px;padding:10px">
  <input required placeholder="Camp obligatori" style="border:0;outline:none"> 
</div>`,
        },
      ],
      exercise: {
        brief:
          "Estilitza els enllaços a PDF amb un sufix automàtic i fes que un contenidor de formulari canviï de color quan un camp obligatori està buit.",
        hint: "Prova <code>:has(input:invalid)</code> al contenidor i <code>input:invalid</code> per al camp.",
      },
    },
    {
      slug: "flexbox",
      title: "Flexbox: el sistema de layout modern",
      summary:
        "Una dimensió, alineació perfecta i distribucions flexibles: el sistema que va canviar el CSS per sempre.",
      goals: [
        "Controlar eix principal i eix transversal.",
        "Repartir espai amb <code>justify-content</code> i <code>gap</code>.",
        "Fer créixer i encongir elements amb <code>flex</code>.",
      ],
      sections: [
        {
          title: "El contenidor",
          body: `
            <p><code>display: flex</code> converteix els fills en elements flexibles en una fila (o columna amb <code>flex-direction: column</code>).</p>
            <ul>
              <li><code>justify-content</code> ➜ reparteix al llarg de l'eix principal.</li>
              <li><code>align-items</code> ➜ alinea a l'eix transversal.</li>
              <li><code>gap</code> ➜ separa els fills sense marges.</li>
              <li><code>flex-wrap</code> ➜ permet saltar de línia.</li>
            </ul>
          `,
          lang: "css",
          code: `.fila {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.fila > * { background: #fdf2d0; padding: 10px 14px; border-radius: 8px; }`,
          previewHtml: `<div class="fila"><span>Un</span><span>Dos</span><span>Tres</span></div>`,
        },
        {
          title: "Controlar els fills",
          body: `
            <p><code>flex: 1</code> fa que l'element ocupi l'espai lliure. <code>flex-grow</code> defineix quant creix, <code>flex-shrink</code> quant pot minvar i <code>flex-basis</code> la mida inicial.</p>
            <p>L'abreviatura <code>flex: 1 1 0</code> reparteix l'espai en parts iguals. Per a una columna fixa i una altra elàstica: <code>flex: 0 0 240px</code> i <code>flex: 1</code>.</p>
          `,
          lang: "css",
          code: `.layout { display: flex; gap: 16px; }
.lateral { flex: 0 0 160px; background: #e8f5ef; padding: 12px; border-radius: 8px; }
.principal { flex: 1; background: #f6f0e6; padding: 12px; border-radius: 8px; }`,
          previewHtml: `<div class="layout"><aside class="lateral">Lateral</aside><main class="principal">Contingut principal elàstic</main></div>`,
        },
        {
          title: "Centrar i els errors típics",
          body: `
            <p>Centrar en tots dos eixos és tan fàcil com <code>display: grid; place-items: center</code> o <code>display: flex; justify-content: center; align-items: center</code>.</p>
            <p>Els errors més freqüents: oblidar <code>min-width: 0</code> en un fill amb text llarg, i fer servir marges per separar elements en lloc de <code>gap</code>.</p>
          `,
          lang: "css",
          code: `.hero {
  min-height: 200px;
  display: grid;
  place-items: center;
  background: #f6f0e6;
  border-radius: 12px;
}

.hero > div { max-width: 40ch; text-align: center; }`,
          previewHtml: `<div class="hero"><div><strong>Títol centrat</strong><p style="margin:6px 0 0">Text al mig de la caixa.</p></div></div>`,
        },
      ],
      exercise: {
        brief:
          "Munta una barra de navegació amb el logotip a l'esquerra i tres enllaços a la dreta, centrada verticalment i que passi a diverses línies en mòbil.",
        hint: "Fes servir <code>margin-left: auto</code> al primer element del grup de la dreta si no vols <code>space-between</code>.",
      },
    },
    {
      slug: "css-grid",
      title: "CSS Grid: el sistema de layout complet",
      summary:
        "Files i columnes alhora, amb plantilles explícites i graelles automàtiques que s'adapten totes soles.",
      goals: [
        "Definir columnes amb <code>grid-template-columns</code>.",
        "Col·locar elements per línia o per àrea.",
        "Crear graelles automàtiques amb <code>auto-fit</code> i <code>minmax()</code>.",
      ],
      sections: [
        {
          title: "Columnes i files",
          body: `
            <p><code>display: grid</code> crea una graella. Les unitats <code>fr</code> reparteixen l'espai lliure: <code>1fr 2fr</code> dona el doble d'espai a la segona columna.</p>
            <p><code>repeat(3, 1fr)</code> és equivalent a escriure <code>1fr 1fr 1fr</code>. <code>gap</code> separa cel·les sense marges.</p>
          `,
          lang: "css",
          code: `.graella {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.graella > div { background: #fdf2d0; padding: 18px; border-radius: 10px; }`,
          previewHtml: `<div class="graella"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>`,
        },
        {
          title: "Col·locar elements",
          body: `
            <p>Pots indicar on comença i on acaba cada element amb <code>grid-column</code> i <code>grid-row</code>, comptant les línies (no les cel·les).</p>
            <p>Les àrees amb nom són encara més llegibles per a dissenys de pàgina completa.</p>
          `,
          lang: "css",
          code: `.disposicio {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "cap cap"
    "menu contingut";
  gap: 12px;
}

.cap { grid-area: cap; background: #b85c3a; color: #fff; padding: 12px; border-radius: 8px; }
.menu { grid-area: menu; background: #e8f5ef; padding: 12px; border-radius: 8px; }
.contingut { grid-area: contingut; background: #f6f0e6; padding: 12px; border-radius: 8px; }`,
          previewHtml: `<div class="disposicio"><header class="cap">Capçalera</header><nav class="menu">Menú</nav><main class="contingut">Contingut</main></div>`,
        },
        {
          title: "Graelles automàtiques",
          body: `
            <p><code>repeat(auto-fit, minmax(220px, 1fr))</code> crea tantes columnes com hi càpiguen de 220 px mínim, i les fa créixer fins a omplir l'amplada. És la solució d'una línia per a galeries responsives, sense media queries.</p>
            <p><code>auto-fill</code> manté les columnes buides; <code>auto-fit</code> les col·lapsa.</p>
          `,
          lang: "css",
          code: `.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.galeria img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 10px; }`,
          previewHtml: `<div class="galeria">
  <img src="https://picsum.photos/id/1015/400/300" alt="Riu">
  <img src="https://picsum.photos/id/1025/400/300" alt="Gos">
  <img src="https://picsum.photos/id/1043/400/300" alt="Bosc">
</div>`,
        },
      ],
      exercise: {
        brief:
          "Crea una pàgina amb capçalera, menú lateral i contingut amb <code>grid-template-areas</code>, i una galeria automàtica amb <code>auto-fit</code>.",
        hint: "Si les àrees no es col·loquen bé, comprova que el nombre de columnes de la plantilla coincideixi amb el de cada fila d'àrees.",
      },
    },
    {
      slug: "animacions-keyframes",
      title: "Animacions amb @keyframes",
      summary:
        "Moviment continu o seqüències: quan una transició no arriba, entren els fotogrames clau.",
      goals: [
        "Declarar animacions amb <code>@keyframes</code>.",
        "Controlar durada, repetició, direcció i estat final.",
        "Animar només propietats eficients i respectar les preferències.",
      ],
      sections: [
        {
          title: "Fotogrames clau",
          body: `
            <p>Una animació declara estats intermedis amb percentatges. Després s'aplica amb la propietat <code>animation</code>, que accepta nom, durada, temporització, retard, repeticions i direcció.</p>
            <p><code>animation-fill-mode: both</code> manté l'estat inicial abans de començar i el final després d'acabar.</p>
          `,
          lang: "css",
          code: `@keyframes entrada {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}

.targeta {
  animation: entrada 400ms ease-out both;
  background: #fdf2d0;
  padding: 18px;
  border-radius: 12px;
}`,
          previewHtml: `<div class="targeta"><strong>Apareix suaument</strong><p style="margin:6px 0 0">Recarrega per tornar-ho a veure.</p></div>`,
        },
        {
          title: "Repetició i moviment continu",
          body: `
            <p><code>animation-iteration-count: infinite</code> repeteix sense parar. Amb <code>alternate</code> va i torna, cosa que estalvia escriure el fotograma de tornada.</p>
            <p>Per a indicadors de càrrega n'hi ha prou amb una rotació simple i 1 segon de durada.</p>
          `,
          lang: "css",
          code: `@keyframes gir { to { transform: rotate(360deg); } }

.espinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e8e2d5;
  border-top-color: #b85c3a;
  border-radius: 50%;
  animation: gir 900ms linear infinite;
}`,
          previewHtml: `<div class="espinner"></div>`,
        },
        {
          title: "Animar amb seny",
          body: `
            <p>Anima <code>transform</code> i <code>opacity</code>: no provoquen càlculs de disseny i van a 60 imatges per segon. Animar <code>width</code>, <code>height</code> o <code>top</code> força el navegador a recalcular tot.</p>
            <p>I sempre, sempre, respecta qui ha demanat menys moviment.</p>
          `,
          lang: "css",
          code: `.pols { animation: pols 1.6s ease-in-out infinite; }

@keyframes pols {
  50% { transform: scale(1.06); opacity: 0.85; }
}

@media (prefers-reduced-motion: reduce) {
  .pols, .espinner { animation: none; }
}`,
          previewHtml: `<div class="pols" style="width:56px;height:56px;border-radius:14px;background:#1f7a5c"></div>`,
        },
      ],
      exercise: {
        brief:
          "Fes una targeta que aparegui amb una animació d'entrada i un indicador circular que giri sense parar, tots dos desactivats si l'usuari prefereix menys moviment.",
        hint: "Si l'animació no s'executa, revisa el nom: ha de coincidir exactament amb el de <code>@keyframes</code>.",
      },
    },
    {
      slug: "resum-css",
      title: "Resum complet de CSS i referència",
      summary:
        "Tot el curs en una pàgina: conceptes clau, propietats imprescindibles i una llista de comprovació abans de publicar.",
      goals: [
        "Repassar l'ordre correcte dels conceptes.",
        "Tenir una referència ràpida de propietats.",
        "Aplicar una llista de comprovació abans de publicar.",
      ],
      sections: [
        {
          title: "Referència ràpida",
          body: `
            <p>Si has arribat fins aquí, ja coneixes les peces. Aquesta taula les ordena per àmbits perquè la tinguis a mà.</p>
          `,
          table: {
            head: ["Àmbit", "Propietats clau"],
            rows: [
              ["Caixa", "width, height, padding, border, margin, box-sizing"],
              ["Text", "font-family, font-size, line-height, letter-spacing, text-align"],
              ["Color", "color, background-color, opacity"],
              ["Layout", "display, flex, grid, gap, position"],
              ["Efectes", "transition, transform, box-shadow, filter"],
              ["Responsive", "clamp(), media queries, @container"],
            ],
          },
          lang: "css",
          code: `/* Estructura mínima d'un projecte */
:root { --color-marca: #b85c3a; --radi: 12px; }

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #23302b;
}

.contenidor {
  width: min(100% - 32px, 960px);
  margin-inline: auto;
}`,
          previewHtml: `<div class="contenidor" style="background:#f6f0e6;padding:16px;border-radius:12px">
  <strong>Un contenidor centrat i amb amplada màxima.</strong>
</div>`,
        },
        {
          title: "Llista de comprovació",
          body: `
            <p>Abans de donar una pàgina per acabada:</p>
            <ul>
              <li>Un sol <code>h1</code> i una jerarquia de títols coherent.</li>
              <li>Contrast de text suficient (4,5:1 per al text normal).</li>
              <li>Focus visible en tots els elements interactius.</li>
              <li>Cap desbordament horitzontal a 320 px.</li>
              <li>Imatges amb <code>alt</code>, mides i <code>loading="lazy"</code>.</li>
              <li>Animacions desactivades amb <code>prefers-reduced-motion</code>.</li>
              <li>Estils en un fitxer extern i noms de classe comprensibles.</li>
            </ul>
          `,
          lang: "css",
          code: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
          previewHtml: `<p>Prova de navegar la pàgina amb <kbd>Tab</kbd>: sempre has de veure on ets.</p>`,
        },
        {
          title: "Què has après",
          body: `
            <p>Has passat de pintar un paràgraf a construir dissenys sencers: model de caixa, selectors, cascada, tipografia, Flexbox, Grid, responsivitat i animacions.</p>
            <p>El següent pas natural és el JavaScript: donar comportament a aquestes pàgines. El tens al curs de JavaScript d'aquesta mateixa aula.</p>
          `,
        },
      ],
      exercise: {
        brief:
          "Agafa una pàgina teva i passa-li la llista de comprovació sencera. Anota els problemes que trobis i corregeix-ne almenys tres.",
        hint: "L'auditoria del navegador (pestanya Lighthouse o Accessibility) et dona pistes automàtiques de contrast i estructura.",
      },
    },
  ],
};