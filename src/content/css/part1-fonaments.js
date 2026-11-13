export default {
  title: "Fonaments del CSS",
  description:
    "Què és el CSS, com s'enganxa a l'HTML, com es trien els elements i per què un estil guanya per sobre d'un altre.",
  chapters: [
    {
      slug: "introduccio-css",
      title: "Introducció al CSS i als estils",
      summary:
        "El CSS decideix com es veu l'HTML: colors, tipografia, espai i disposició. És la capa de presentació del web.",
      goals: [
        "Entendre què fa el CSS i què deixa a l'HTML.",
        "Reconèixer l'anatomia d'una regla: selector, propietats i valors.",
        "Connectar un full d'estils amb el document.",
      ],
      sections: [
        {
          title: "Què és el CSS",
          body: `
            <p><strong>CSS</strong> (<em>Cascading Style Sheets</em>, fulls d'estil en cascada) és el llenguatge que descriu l'aspecte del document. L'HTML diu <em>què</em> és cada cosa; el CSS diu <em>com</em> s'ha de veure.</p>
            <ul>
              <li>Colors, tipografies i mides.</li>
              <li>Espai, vores, ombres i fons.</li>
              <li>Disposició dels elements i adaptació a cada pantalla.</li>
              <li>Animacions i transicions.</li>
            </ul>
            <p>El CSS no canvia el contingut ni la semàntica: un <code>h1</code> continua sent el títol principal encara que el pintis de rosa i el facis petit.</p>
          `,
          lang: "css",
          code: `h1 {
  color: #b85c3a;
  font-size: 32px;
}

p {
  color: #23302b;
  line-height: 1.6;
}`,
          previewHtml: `<h1>Aula d'HTML i CSS</h1>
<p>Un paràgraf amb més espai entre línies es llegeix millor.</p>`,
        },
        {
          title: "Anatomia d'una regla",
          body: `
            <p>Una regla té tres parts: el <strong>selector</strong> tria els elements, i dins de les claus hi ha les <strong>declaracions</strong>, formades per una propietat i un valor separats per dos punts i acabades amb punt i coma.</p>
            <p>El punt i coma de l'última declaració és opcional, però és bona pràctica no oblidar-lo: quan afegeixes una línia nova no has de recordar res.</p>
          `,
          lang: "css",
          code: `/* selector */ p {
  /* propietat: valor; */
  color: #1f7a5c;
  font-weight: 600;
  letter-spacing: 0.02em;
}`,
          previewHtml: `<p>Aquest paràgraf compleix una regla amb tres declaracions.</p>`,
          note: "Els comentaris en CSS s'escriuen entre <code>/*</code> i <code>*/</code>. No hi ha comentaris de línia.",
        },
        {
          title: "Connectar el CSS amb l'HTML",
          body: `
            <p>Un full d'estils extern es declara al <code>head</code> amb <code>&lt;link rel="stylesheet"&gt;</code>. És la manera recomanada: el mateix fitxer serveix per a totes les pàgines i el navegador el pot desar a la memòria cau.</p>
            <p>Les altres dues vies —l'atribut <code>style</code> i l'etiqueta <code>&lt;style&gt;</code>— les veuràs al capítol següent.</p>
          `,
          lang: "html",
          preview: false,
          code: `<head>
  <meta charset="utf-8">
  <title>La meva pàgina</title>
  <link rel="stylesheet" href="estils.css">
</head>`,
        },
      ],
      exercise: {
        brief:
          "Crea un fitxer <code>estils.css</code>, enllaça'l des d'una pàgina amb un <code>h1</code> i dos paràgrafs, i dona'ls colors i mides diferents.",
        hint: "Si no veus cap canvi, revisa que la ruta de l'<code>href</code> sigui correcta i que el fitxer no estigui buit.",
      },
    },
    {
      slug: "tipus-de-css",
      title: "Tipus de CSS: en línia, intern i extern",
      summary:
        "Hi ha tres maneres d'aplicar estils i no totes serveixen per al mateix. Compara-les, entén quan guanya cadascuna i tria bé.",
      goals: [
        "Aplicar estils amb l'atribut <code>style</code>.",
        "Escriure un bloc <code>&lt;style&gt;</code> dins del document.",
        "Enllaçar un full extern i entendre l'ordre de prioritat.",
      ],
      sections: [
        {
          title: "CSS en línia",
          body: `
            <p>L'atribut <code>style</code> aplica declaracions a un sol element. Té la prioritat més alta, per això és útil per provar i perillós per mantenir: no es reutilitza i no es pot canviar des d'un sol lloc.</p>
          `,
          lang: "html",
          code: `<p style="color: #b85c3a; font-size: 20px;">
  Aquest paràgraf té els estils escrits a dins.
</p>
<p>Aquest altre no en té cap.</p>`,
        },
        {
          title: "CSS intern",
          body: `
            <p>Un bloc <code>&lt;style&gt;</code> al <code>head</code> afecta tota la pàgina. És pràctic per a pràctiques d'un sol fitxer i per a estils crítics que han d'arribar de seguida.</p>
            <p>Si el lloc té diverses pàgines, però, acabaràs repetint el mateix bloc a totes.</p>
          `,
          lang: "html",
          code: `<style>
  body { font-family: system-ui, sans-serif; padding: 20px; }
  h2 { color: #1f7a5c; }
  .avis { background: #fdf2d0; padding: 12px; border-radius: 8px; }
</style>

<h2>Avis important</h2>
<p class="avis">Aquest paràgraf rep l'estil de la classe <code>.avis</code>.</p>`,
        },
        {
          title: "CSS extern",
          body: `
            <p>El full extern és l'estàndard professional: <em>index.html</em> només estructura, <em>estils.css</em> només presentació.</p>
            <p>Quan hi ha diverses fonts d'estil, la cascada resol els conflictes: guanya l'estil en línia, després el bloc intern i finalment el full extern. Dins d'un mateix nivell, guanya la regla que apareix més avall.</p>
          `,
          lang: "html",
          code: `<!-- index.html -->
<link rel="stylesheet" href="estils.css">

<!-- estils.css -->
body { font-family: system-ui, sans-serif; }
h1 { color: #b85c3a; }`,
          preview: false,
          note: "Evita <code>!important</code> per forçar prioritats: normalment és símptoma que l'organització dels estils es pot millorar.",
        },
      ],
      exercise: {
        brief:
          "Fes la mateixa targeta tres vegades: una amb estil en línia, una amb un bloc <code>&lt;style&gt;</code> i una amb un fitxer extern. Després canvia el color de totes tres i compta quants llocs has hagut de tocar.",
        hint: "L'atribut <code>style</code> guanya sempre sobre la classe, encara que la classe estigui més avall.",
      },
    },
    {
      slug: "selectors",
      title: "Selectors de CSS: guia completa",
      summary:
        "El selector és la manera de dir «aquests elements». Dels selectors bàsics als combinadors i els atributs.",
      goals: [
        "Fer servir selectors de tipus, classe, identificador i universal.",
        "Combinar selectors amb descendència, fills i germans.",
        "Escriure selectors llegibles i prou específics.",
      ],
      sections: [
        {
          title: "Selectors bàsics",
          body: `
            <p>Tres selectors cobreixen la majoria de casos:</p>
            <ul>
              <li><code>p</code> ➜ tots els elements d'aquell tipus.</li>
              <li><code>.avis</code> ➜ tots els elements amb <code>class="avis"</code>.</li>
              <li><code>#capcalera</code> ➜ l'element amb aquell <code>id</code> (n'hi ha d'haver un de sol).</li>
            </ul>
            <p>Les classes són reutilitzables i es poden combinar; els identificadors són únics i tenen més pes, així que es fan servir poc per estilitzar.</p>
          `,
          lang: "css",
          code: `p { color: #23302b; }

.avis {
  background: #fdf2d0;
  border-left: 4px solid #d69e2e;
  padding: 10px 14px;
}

#capcalera { font-size: 28px; }`,
          previewHtml: `<h1 id="capcalera">Títol de la pàgina</h1>
<p>Un paràgraf normal.</p>
<p class="avis">Un paràgraf amb la classe avis.</p>`,
        },
        {
          title: "Combinadors",
          body: `
            <p>Els combinadors relacionen elements entre ells:</p>
            <ul>
              <li><code>article p</code> ➜ descendents, a qualsevol profunditat.</li>
              <li><code>ul &gt; li</code> ➜ fills directes.</li>
              <li><code>h2 + p</code> ➜ el paràgraf que va just després.</li>
              <li><code>h2 ~ p</code> ➜ tots els germans posteriors.</li>
            </ul>
            <p>Com més específics, més difícils de reutilitzar. La majoria de projectes funcionen amb selectors de classe i algun descendent.</p>
          `,
          lang: "css",
          code: `.targeta > h3 { color: #b85c3a; margin: 0 0 6px; }
.targeta p { color: #4a4a45; }
h4 + p { font-style: italic; }`,
          previewHtml: `<div class="targeta">
  <h3>Títol de la targeta</h3>
  <p>Paràgraf fill directe.</p>
  <div><p>Paràgraf nét: no rep el color del fill directe.</p></div>
</div>`,
        },
        {
          title: "Agrupar i el selector universal",
          body: `
            <p>Una coma agrupa selectors que comparteixen declaracions. L'asterisc <code>*</code> tria tots els elements i s'ha de fer servir amb molta cura, perquè afecta el rendiment i pot desfer estils heretats.</p>
            <p>És habitual veure'l en un reinici bàsic: <code>* { box-sizing: border-box; }</code>.</p>
          `,
          lang: "css",
          code: `h1, h2, h3 {
  font-family: Georgia, serif;
  line-height: 1.2;
}

*, *::before, *::after {
  box-sizing: border-box;
}`,
          previewHtml: `<h1>Un títol</h1><h2>Un subtítol</h2><h3>Un títol petit</h3>`,
          table: {
            head: ["Selector", "Exemple", "Selecciona"],
            rows: [
              ["Tipus", "p", "Tots els paràgrafs"],
              ["Classe", ".avis", "Una classe concreta"],
              ["Identificador", "#capcalera", "L'element amb aquell id"],
              ["Descendent", "nav a", "Enllaços dins de nav"],
              ["Fill", "ul > li", "Només els li fills"],
              ["Germà", "h2 + p", "El p immediatament posterior"],
              ["Atribut", "a[target]", "Enllaços amb l'atribut"],
            ],
          },
        },
      ],
      exercise: {
        brief:
          "Crea una llista de tres elements i dona estil només al primer <code>li</code> amb un combinador, i a tots els enllaços dins d'un <code>nav</code>. Comprova que la resta no canvia.",
        hint: "Prova <code>li:first-child</code> per al primer element i <code>nav a</code> per als enllaços.",
      },
    },
    {
      slug: "especificitat-cascada",
      title: "Especificitat i cascada: qui guanya",
      summary:
        "Quan dues regles afecten el mateix element, el CSS té regles clares per decidir. Entendre-les estalvia hores de proves.",
      goals: [
        "Calcular la força d'un selector.",
        "Entendre l'ordre de la cascada i l'herència.",
        "Evitar <code>!important</code> i escriure estils predictibles.",
      ],
      sections: [
        {
          title: "Com es calcula la força",
          body: `
            <p>La <strong>cascada</strong> ordena les regles per quatre criteris, en aquest ordre: origen i importància, especificitat, ordre d'aparició i herència.</p>
            <p>L'especificitat es mesura amb tres comptadors (identificadors, classes i atributs, tipus):</p>
            <ul>
              <li><code>#capcalera</code> ➜ (1, 0, 0).</li>
              <li><code>.avis.destacat</code> ➜ (0, 2, 0).</li>
              <li><code>article p</code> ➜ (0, 0, 2).</li>
            </ul>
            <p>Guanya el nombre més alt llegint d'esquerra a dreta, no sumant.</p>
          `,
          lang: "css",
          code: `p { color: #23302b; }

.destacat { color: #b85c3a; }

#unic { color: #1f7a5c; }

/* L'estil en línia guanya sobre tots tres. */`,
          previewHtml: `<p>Aquest paràgraf només té el selector de tipus.</p>
<p class="destacat">Aquest té classe: guanya sobre el tipus.</p>
<p class="destacat" id="unic">Aquest té identificador: guanya sobre la classe.</p>`,
          note: "Si dues regles tenen la mateixa especificitat, guanya la que apareix més avall al codi.",
        },
        {
          title: "Herència",
          body: `
            <p>Algunes propietats s'hereden dels pares als fills, com <code>color</code>, <code>font-family</code> o <code>line-height</code>. Altres no, com <code>margin</code>, <code>padding</code>, <code>border</code> o <code>display</code>.</p>
            <p>Pots forçar-ne el comportament amb <code>inherit</code>, <code>initial</code> o <code>unset</code>. És útil per reiniciar un botó que hereta tipografia del formulari, per exemple.</p>
          `,
          lang: "css",
          code: `.contenidor { color: #1f7a5c; font-family: Georgia, serif; }

button {
  font-family: inherit;
  color: inherit;
  border: 1px solid currentColor;
  background: transparent;
  padding: 6px 12px;
}`,
          previewHtml: `<div class="contenidor">
  El text del contenidor és verd i amb serif.
  <p>El paràgraf hereta les dues coses.</p>
  <button>I el botó també</button>
</div>`,
        },
        {
          title: "Escriure estils predictibles",
          body: `
            <p>La bona notícia és que l'especificitat només és un problema quan les regles competeixen. Tres hàbits ho eviten:</p>
            <ul>
              <li>Un sol nivell de classe per component.</li>
              <li>Estructures planes, sense encadenar descendents llargs.</li>
              <li>Reservar <code>!important</code> per a casos extrems i documentats.</li>
            </ul>
          `,
          lang: "css",
          code: `/* Fràgil: guanya per accident */
div.contingut ul.llista li a.enllac { color: #b85c3a; }

/* Clar: guanya perquè és l'únic que ho diu */
.enllac-destacat { color: #b85c3a; }`,
          previewHtml: `<a class="enllac-destacat" href="#">Un enllaç destacat</a>`,
        },
      ],
      exercise: {
        brief:
          "Escriu tres regles que afectin el mateix paràgraf: una de tipus, una de classe i una d'identificador. Canvia'n els colors i prediu quin guanyarà abans de recarregar.",
        hint: "Ordena les regles de menys a més específica: així el codi explica la prioritat sense necessitat de comentaris.",
      },
    },
    {
      slug: "colors-i-unitats",
      title: "Colors i unitats: referència completa",
      summary:
        "Com s'escriu un color i com es mesura una mida. Dues decisions que afecten tota la pàgina.",
      goals: [
        "Escriure colors amb noms, hex, <code>rgb()</code> i <code>hsl()</code>.",
        "Triar entre unitats absolutes i relatives.",
        "Fer servir <code>rem</code>, <code>%</code> i <code>clamp()</code> amb criteri.",
      ],
      sections: [
        {
          title: "Formats de color",
          body: `
            <p>Tots aquests valors són el mateix color:</p>
            <ul>
              <li><code>tomato</code> ➜ un dels 140 noms.</li>
              <li><code>#ff6347</code> ➜ hexadecimal, dos dígits per canal.</li>
              <li><code>rgb(255 99 71)</code> ➜ de 0 a 255 per canal.</li>
              <li><code>hsl(9 100% 64%)</code> ➜ to, saturació i lluminositat.</li>
            </ul>
            <p>Els dos darrers accepten transparència: <code>rgb(255 99 71 / 0.5)</code>. <code>hsl()</code> és el més còmode per crear variants d'un mateix to.</p>
          `,
          lang: "css",
          code: `.a { background: tomato; }
.b { background: #ff6347; }
.c { background: rgb(255 99 71); }
.d { background: hsl(9 100% 64% / 0.45); }

h3 { color: hsl(9 75% 38%); }`,
          previewHtml: `<div style="display:flex;gap:8px;flex-wrap:wrap">
  <div class="a" style="width:70px;height:44px;border-radius:8px"></div>
  <div class="b" style="width:70px;height:44px;border-radius:8px"></div>
  <div class="c" style="width:70px;height:44px;border-radius:8px"></div>
  <div class="d" style="width:70px;height:44px;border-radius:8px"></div>
</div>
<h3>Text en un to més fosc</h3>`,
        },
        {
          title: "Unitats absolutes i relatives",
          body: `
            <p>Les absolutes no depenen de res: <code>px</code> és el píxel. Les relatives depenen del context:</p>
            <ul>
              <li><code>em</code> ➜ respecte a la mida de lletra de l'element.</li>
              <li><code>rem</code> ➜ respecte a la mida de l'arrel (<code>html</code>).</li>
              <li><code>%</code> ➜ respecte al pare.</li>
              <li><code>vw</code> / <code>vh</code> ➜ respecte a la finestra.</li>
              <li><code>ch</code> ➜ amplada del caràcter «0».</li>
            </ul>
            <p>Per a tipografia i espaiat, <code>rem</code> és la unitat més previsible: canviar la mida base escala tot el disseny.</p>
          `,
          lang: "css",
          code: `html { font-size: 16px; }

h1 { font-size: 2.5rem; }      /* 40px */
p  { font-size: 1.0625rem; }   /* 17px */
small { font-size: 0.8em; }

.ample { max-width: 65ch; }`,
          previewHtml: `<h1>Un títol gran</h1>
<p class="ample">Aquest paràgraf té una amplada màxima de 65 caràcters, que és el que es recomana per llegir còmodament.</p>
<small>Text petit.</small>`,
        },
        {
          title: "Mesures que s'adapten",
          body: `
            <p><code>clamp(mínim, preferit, màxim)</code> és la manera moderna de fer mides fluids: el valor creix amb la pantalla però no surt mai del rang.</p>
            <p>Combina-la amb <code>min()</code> i <code>max()</code> per a amplades i espaiats que respiren en mòbil sense desbordar en escriptori.</p>
          `,
          lang: "css",
          code: `h1 {
  font-size: clamp(1.8rem, 4vw, 3rem);
}

.contenidor {
  width: min(100% - 32px, 960px);
  margin-inline: auto;
  padding-block: clamp(16px, 3vw, 40px);
}`,
          previewHtml: `<div class="contenidor" style="background:#f6f0e6;border-radius:12px">
  <h1>Mida fluida</h1>
</div>`,
        },
      ],
      exercise: {
        brief:
          "Crea quatre caixes del mateix color amb hex, <code>rgb()</code>, <code>hsl()</code> i el nom, i canvia la mida de lletra de l'arrel per veure com escalen els <code>rem</code>.",
        hint: "Si vols la mateixa amplada en mòbil i escriptori, prova <code>width: min(100% - 32px, 900px)</code>.",
      },
    },
  ],
};