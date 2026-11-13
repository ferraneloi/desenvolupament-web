export default {
  title: "Caixa, fons i tipografia",
  description:
    "El model de caixa és la base de tot el layout, i la tipografia és el que fa que una pàgina es pugui llegir.",
  chapters: [
    {
      slug: "model-de-caixa",
      title: "El model de caixa: fonaments del layout",
      summary:
        "Cada element de la pàgina és una caixa amb contingut, farciment, vora i marge. Entendre-ho és entendre el CSS.",
      goals: [
        "Diferenciar contingut, <code>padding</code>, <code>border</code> i <code>margin</code>.",
        "Calcular l'amplada real d'un element.",
        "Fer servir <code>box-sizing: border-box</code>.",
      ],
      sections: [
        {
          title: "Les quatre capes",
          body: `
            <p>Tota caixa té quatre zones, de dins cap a fora:</p>
            <ul>
              <li><strong>Contingut</strong> ➜ el text o la imatge.</li>
              <li><strong>Padding</strong> ➜ espai interior, entre contingut i vora.</li>
              <li><strong>Border</strong> ➜ la vora, que ocupa espai.</li>
              <li><strong>Margin</strong> ➜ espai exterior, entre la caixa i les veïnes.</li>
            </ul>
            <p>El <code>padding</code> allunya el contingut de la vora; el <code>margin</code> separa caixes. Confondre'ls és l'error més habitual al començament.</p>
          `,
          lang: "css",
          code: `.caixa {
  width: 240px;
  padding: 20px;
  border: 4px solid #b85c3a;
  margin: 16px;
  background: #fdf2d0;
}`,
          previewHtml: `<div class="caixa">Contingut amb espai interior, vora i marge exterior.</div>`,
        },
        {
          title: "L'amplada real i box-sizing",
          body: `
            <p>Per defecte, <code>width</code> només mesura el contingut: l'amplada real és contingut + padding + vora. Això fa que les caixes es desbordin quan les sumes.</p>
            <p>Amb <code>box-sizing: border-box</code>, <code>width</code> inclou padding i vora. És tan útil que gairebé tots els projectes el posen a tot el document.</p>
          `,
          lang: "css",
          code: `*, *::before, *::after { box-sizing: border-box; }

.quadrada { width: 100px; height: 100px; padding: 10px; border: 2px solid #1f7a5c; }
.antiga { box-sizing: content-box; width: 100px; height: 100px; padding: 10px; border: 2px solid #b85c3a; }`,
          previewHtml: `<div style="display:flex;gap:20px;align-items:flex-start">
  <div class="antiga" style="background:#e8f5ef"></div>
  <div class="quadrada" style="background:#fdfdf5"></div>
</div>`,
        },
        {
          title: "Marges que es fonen i centrat",
          body: `
            <p>Els marges verticals de caixes veïnes es <em>fonen</em>: no se sumen, es queda el més gran. És una font clàssica d'espais inesperats.</p>
            <p>Per centrar una caixa horitzontalment, <code>margin-inline: auto</code> amb una amplada màxima. Per centrar en vertical, millor Flexbox o Grid.</p>
          `,
          lang: "css",
          code: `p { margin: 0 0 24px; }
p + p { margin-top: 40px; } /* l'espai real entre els dos és 40px, no 64px */

.centrat {
  max-width: 480px;
  margin-inline: auto;
  background: #f6f0e6;
  padding: 16px;
}`,
          previewHtml: `<div class="centrat"><p>Primer paràgraf.</p><p>Segon paràgraf, amb menys espai del que sembla.</p></div>`,
        },
      ],
      exercise: {
        brief:
          "Crea dues caixes de 150px d'amplada amb el mateix padding i vora: una amb <code>content-box</code> i una amb <code>border-box</code>. Mesura-les i explica la diferència.",
        hint: "Obre les eines de desenvolupament del navegador i inspecciona la caixa: veuràs les quatre zones pintades.",
      },
    },
    {
      slug: "fons-background",
      title: "Fons: colors, imatges i tècniques",
      summary:
        "El fons pot ser un color, una imatge, un degradat o diverses capes alhora. Aprèn a controlar posició, mida i repetició.",
      goals: [
        "Dominar <code>background-color</code> i <code>background-image</code>.",
        "Col·locar imatges amb <code>cover</code> i <code>contain</code>.",
        "Combinar diverses capes de fons.",
      ],
      sections: [
        {
          title: "Color i imatge",
          body: `
            <p>Les propietats de fons es poden escriure per separat o amb l'abreviatura <code>background</code>. Una imatge sempre va sobre un color, i aquest color es veu si la imatge falla o és transparent.</p>
          `,
          lang: "css",
          code: `.hero {
  background-color: #23302b;
  background-image: url("https://picsum.photos/id/1015/1200/600");
  background-size: cover;
  background-position: center;
  height: 220px;
  display: flex;
  align-items: flex-end;
  color: #fff;
  padding: 16px;
}`,
          previewHtml: `<div class="hero"><strong>Una capçalera amb imatge de fons</strong></div>`,
        },
        {
          title: "Posició, mida i repetició",
          body: `
            <ul>
              <li><code>background-size: cover</code> ➜ omple la caixa encara que retalli.</li>
              <li><code>background-size: contain</code> ➜ es veu sencera, pot deixar buits.</li>
              <li><code>background-repeat</code> ➜ <code>no-repeat</code>, <code>repeat-x</code>, <code>repeat-y</code>.</li>
              <li><code>background-position</code> ➜ <code>center</code>, <code>top right</code>, o percentatges.</li>
              <li><code>background-attachment: fixed</code> ➜ efecte de paral·laxi, amb compte al mòbil.</li>
            </ul>
          `,
          lang: "css",
          code: `.patro {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23b85c3a'/%3E%3C/svg%3E");
  background-repeat: repeat;
  padding: 24px;
  border-radius: 12px;
  background-color: #fdf2d0;
}`,
          previewHtml: `<div class="patro">Text sobre un patró repetit.</div>`,
        },
        {
          title: "Diverses capes i llegibilitat",
          body: `
            <p>Pots apilar fons separant-los per comes: el primer és el de dalt. Una capa semitransparent sobre una imatge garanteix que el text es llegeixi.</p>
            <p>Aquesta és una solució honesta i accessible: no confiïs que la fotografia sempre tindrà zones fosques on posar text blanc.</p>
          `,
          lang: "css",
          code: `.portada {
  background:
    linear-gradient(180deg, rgb(20 26 22 / 0.15), rgb(20 26 22 / 0.75)),
    url("https://picsum.photos/id/1043/1200/500") center / cover no-repeat;
  color: #fff;
  padding: 32px;
  border-radius: 12px;
}`,
          previewHtml: `<div class="portada"><h3 style="margin:0;color:#fff">Curs d'HTML i CSS</h3><p style="margin:6px 0 0;color:#f0ece4">Text llegible gràcies a la capa fosca.</p></div>`,
        },
      ],
      exercise: {
        brief:
          "Crea una capçalera de 200px d'alçada amb una imatge de fons, una capa fosca i un títol blanc centrat. Comprova que el text es llegeix bé en mòbil.",
        hint: "Si la imatge queda deformada, et falta <code>background-size: cover</code>.",
      },
    },
    {
      slug: "propietats-text",
      title: "Propietats del text i tipografia",
      summary:
        "Alineació, interlineat, espaiat i decoracions: les propietats que converteixen un text pla en una pàgina llegible.",
      goals: [
        "Ajustar <code>font-size</code>, <code>line-height</code> i <code>letter-spacing</code>.",
        "Decidir l'amplada de línia i l'alineació.",
        "Evitar els errors de lectura més freqüents.",
      ],
      sections: [
        {
          title: "Mida, interlineat i amplada",
          body: `
            <p>Tres valors decideixen si un text es llegeix còmodament:</p>
            <ul>
              <li><code>font-size</code> entre 16 i 20 px per al cos.</li>
              <li><code>line-height</code> entre 1,5 i 1,7.</li>
              <li>Amplada de línia de 60 a 75 caràcters.</li>
            </ul>
            <p><code>line-height</code> sense unitats és el més segur: es recalcula per a cada mida de lletra filla.</p>
          `,
          lang: "css",
          code: `article p {
  font-size: 1.0625rem;
  line-height: 1.65;
  max-width: 68ch;
  margin: 0 0 1rem;
}`,
          previewHtml: `<article><p>Un text llarg es llegeix millor si la línia no és massa ampla i si hi ha aire entre les línies. Aquest paràgraf ho aplica i, per tant, és més còmode de seguir amb la vista.</p></article>`,
        },
        {
          title: "Alineació i espaiat",
          body: `
            <p><code>text-align</code> accepta <code>left</code>, <code>center</code>, <code>right</code> i <code>justify</code>. Per a blocs llargs, l'esquerra és la millor opció: el justificat crea rius d'espai si no hi ha partició de paraules.</p>
            <p>A la xarxa, però, l'alineació es fa millor amb <code>justify-content</code> i Flexbox que amb <code>text-align</code>.</p>
          `,
          lang: "css",
          code: `h1 {
  text-align: center;
  letter-spacing: -0.02em;
}

.overline {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  color: #b85c3a;
}`,
          previewHtml: `<h1 style="margin:0 0 8px">Títol centrat</h1><p class="overline">Etiqueta amb majúscules</p>`,
        },
        {
          title: "Decoracions i estats",
          body: `
            <p>Els enllaços mereixen un tractament propi: subratllat amb desplaçament (<code>text-underline-offset</code>) i un canvi clar en passar el ratolí. I no oblidis <code>:focus-visible</code>: qui navega amb teclat necessita veure on és.</p>
          `,
          lang: "css",
          code: `a {
  color: #b85c3a;
  text-decoration: underline;
  text-underline-offset: 3px;
}

a:hover { color: #1f7a5c; }

a:focus-visible {
  outline: 2px solid #1f7a5c;
  outline-offset: 2px;
  border-radius: 4px;
}`,
          previewHtml: `<p>Visita el <a href="#">capítol de formularis</a> per continuar.</p>`,
        },
      ],
      exercise: {
        brief:
          "Agafa tres paràgrafs llargs i aplica'ls tres interlineats diferents (1,2 / 1,6 / 2). Decideix quin es llegeix millor i justifica-ho.",
        hint: "Prova també de limitar l'amplada a <code>65ch</code>: notaràs la diferència de seguida.",
      },
    },
    {
      slug: "tipografia-fonts",
      title: "Tipografia web: famílies i càrrega",
      summary:
        "Com triar tipografies, carregar-les bé i evitar que la pàgina salt quan arriben.",
      goals: [
        "Escriure <em>font stacks</em> fiables.",
        "Carregar tipografies externes amb <code>@font-face</code> o <code>link</code>.",
        "Controlar el gruix, l'estil i la visualització durant la càrrega.",
      ],
      sections: [
        {
          title: "Una pila de tipografies",
          body: `
            <p><code>font-family</code> accepta una llista: el navegador prova la primera, després la segona, i així fins a una família genèrica final. Aquesta pila garanteix que sempre es vegi alguna cosa raonable.</p>
            <p>Les genèriques són <code>serif</code>, <code>sans-serif</code>, <code>monospace</code>, <code>cursive</code> i <code>system-ui</code>.</p>
          `,
          lang: "css",
          code: `body {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
}

h1, h2 { font-family: Georgia, "Times New Roman", serif; }

code, pre { font-family: "JetBrains Mono", ui-monospace, monospace; }`,
          previewHtml: `<h2>Un títol amb serif</h2><p>El cos del text amb la tipografia del sistema.</p><p><code>codi en línia</code></p>`,
        },
        {
          title: "Carregar una tipografia externa",
          body: `
            <p>Amb <code>@font-face</code> declares el fitxer i li dones un nom. Amb <code>font-display: swap</code> el text es mostra de seguida amb la tipografia del sistema i canvia quan la nova arriba: mai una pàgina en blanc.</p>
            <p>Carrega només els gruixos que facis servir: cada fitxer són kilobytes que algú descarrega.</p>
          `,
          lang: "css",
          code: `@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-400.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-600.woff2") format("woff2");
  font-weight: 600;
  font-display: swap;
}`,
          previewHtml: `<p>Amb <code>font-display: swap</code>, el text sempre és visible.</p>`,
        },
        {
          title: "Gruix, estil i ajustos",
          body: `
            <p>Controla el pes amb <code>font-weight</code> (400 normal, 600 seminegre, 700 negreta) i la inclinació amb <code>font-style</code>. Per a titulars grans, un <code>letter-spacing</code> lleugerament negatiu els fa més compactes i elegants.</p>
          `,
          lang: "css",
          code: `h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.destacat { font-weight: 700; }
.italica { font-style: italic; }`,
          previewHtml: `<h1>Un titular compacte</h1><p class="destacat">Text en negreta</p><p class="italica">Text en cursiva</p>`,
        },
      ],
      exercise: {
        brief:
          "Munta un sistema de tres nivells: titular (serif), cos (sans-serif) i codi (monoespaiada). Carrega una tipografia externa només per als titulars amb <code>font-display: swap</code>.",
        hint: "Si el text «salta» en carregar, revisa que tinguis <code>font-display</code> i mides declarades.",
      },
    },
    {
      slug: "imatges-llistes",
      title: "Estils per a imatges i llistes",
      summary:
        "Imatges que no es deformen ni desborden i llistes que es poden estilitzar sense perdre l'accessibilitat.",
      goals: [
        "Fer imatges responsives amb <code>max-width</code> i <code>aspect-ratio</code>.",
        "Retallar imatges amb <code>object-fit</code>.",
        "Canviar els marcadors de llista amb <code>list-style</code>.",
      ],
      sections: [
        {
          title: "Imatges que s'adapten",
          body: `
            <p>La regla mínima perquè cap imatge desbordi: <code>max-width: 100%</code> i <code>height: auto</code>. Amb <code>aspect-ratio</code> reserves l'espai abans que l'arxiu arribi.</p>
          `,
          lang: "css",
          code: `img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}

.miniatura {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
}`,
          previewHtml: `<img class="miniatura" src="https://picsum.photos/id/1025/640/360" alt="Un gos mirant a càmera">`,
        },
        {
          title: "Enquadernar amb object-fit",
          body: `
            <p>Quan fixes una mida i la imatge té una proporció diferent, <code>object-fit</code> decideix què passa:</p>
            <ul>
              <li><code>fill</code> ➜ deforma (per defecte).</li>
              <li><code>cover</code> ➜ omple i retalla.</li>
              <li><code>contain</code> ➜ encabeix, pot deixar buits.</li>
              <li><code>none</code> ➜ mida original.</li>
            </ul>
            <p><code>object-position</code> tria quina part es conserva en retallar.</p>
          `,
          lang: "css",
          code: `.galeria {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.galeria img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
}`,
          previewHtml: `<div class="galeria">
  <img src="https://picsum.photos/id/1015/400/400" alt="Riu de muntanya">
  <img src="https://picsum.photos/id/1043/400/400" alt="Bosc amb boira">
</div>`,
        },
        {
          title: "Llistes",
          body: `
            <p><code>list-style-type</code> canvia el marcador, <code>list-style-position</code> el col·loca dins o fora, i <code>list-style-image</code> hi posa una imatge. Per fer llistes sense marcador, <code>list-style: none</code>.</p>
            <p>En un <code>ul</code> amb marcador propi cal treure el punt i afegir-lo amb <code>::before</code>, mantenint l'element com a llista per als lectors de pantalla.</p>
          `,
          lang: "css",
          code: `ul.marcadors {
  list-style: square;
  padding-left: 1.2rem;
}

ul.neta {
  list-style: none;
  padding-left: 0;
  display: grid;
  gap: 8px;
}

ul.neta li {
  padding-left: 1.1rem;
  position: relative;
}

ul.neta li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: #b85c3a;
}`,
          previewHtml: `<ul class="marcadors"><li>Element amb quadre</li><li>Segon element</li></ul>
<ul class="neta"><li>Element amb marcador propi</li><li>Segon element</li></ul>`,
        },
      ],
      exercise: {
        brief:
          "Crea una galeria de quatre imatges en graella quadrada amb <code>object-fit: cover</code> i una llista de tres elements amb marcador propi.",
        hint: "Si les imatges queden aixafades, segur que et falta <code>object-fit</code> o <code>aspect-ratio</code>.",
      },
    },
  ],
};