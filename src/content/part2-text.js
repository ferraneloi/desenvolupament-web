export default {
  title: "Text, color i tipografia",
  description:
    "Encapçalaments, paràgrafs, colors i tots els elements que donen format al text.",
  chapters: [
    {
      slug: "encapcalaments-paragrafs",
      title: "Encapçalaments i estructura de paràgrafs",
      summary:
        "Els sis nivells d'encapçalament i l'element de paràgraf són la base de qualsevol text llegible. També veuràs com separar contingut amb línies i salts.",
      goals: [
        "Fer servir <code>h1</code>–<code>h6</code> amb una jerarquia correcta.",
        "Escriure paràgrafs i separar blocs de text.",
        "Saber quan toca <code>br</code>, <code>hr</code> i <code>blockquote</code>.",
      ],
      sections: [
        {
          title: "Els sis nivells d'encapçalament",
          body: `
            <p>L'HTML té sis nivells de títol, de <code>&lt;h1&gt;</code> a <code>&lt;h6&gt;</code>. <code>h1</code> és el títol principal de la pàgina; <code>h2</code> són les seccions; <code>h3</code> les subseccions, i així successivament.</p>
            <p>No triïs el nivell per la mida de la lletra: tria'l pel <strong>significat</strong>. La mida la decideix el CSS. Un document ben estructurat té un sol <code>h1</code> i no salta mai nivells (no passis d'<code>h2</code> a <code>h4</code>).</p>
            <p>Aquesta jerarquia és el que fan servir els lectors de pantalla per navegar i els cercadors per entendre el contingut.</p>
          `,
          code: `<h1>Títol principal de la pàgina</h1>

<h2>Secció 1</h2>
<p>Contingut de la primera secció.</p>
<h3>Subsecció 1.1</h3>
<p>Més detall dins de la primera secció.</p>

<h2>Secció 2</h2>
<p>Contingut de la segona secció.</p>

<h4>Aquest h4 hauria de ser un h3 o un h2</h4>
<p>Saltar-se nivells trenca l'esquema del document.</p>`,
        },
        {
          title: "Paràgrafs i separadors",
          body: `
            <p>El paràgraf és l'element <code>&lt;p&gt;</code>. No s'ha de fer servir per separar blocs: per això hi ha elements com <code>&lt;div&gt;</code>, <code>&lt;section&gt;</code> o <code>&lt;hr&gt;</code>.</p>
            <ul>
              <li><code>&lt;br&gt;</code> ➜ salt de línia <em>dins</em> d'un mateix paràgraf (adreces, poemes).</li>
              <li><code>&lt;hr&gt;</code> ➜ línia horitzontal que separa temes diferents.</li>
              <li><code>&lt;blockquote&gt;</code> ➜ una citació llarga, amb sagnat.</li>
            </ul>
            <p>Un paràgraf no pot contenir un altre paràgraf ni un títol: això és un error d'estructura que el navegador arreglarà «a la seva manera» i et farà perdre temps.</p>
          `,
          code: `<p>Un paràgraf normal. Pot tenir diverses frases i es justifica sol.</p>

<p>
  Carrer Major, 12<br>
  08001 Barcelona
</p>

<hr>

<p>Després de la línia comença un tema nou.</p>

<blockquote>
  L'HTML no és un llenguatge de programació, és un llenguatge de marcatge.
</blockquote>`,
        },
        {
          title: "Encara més text: adreces i text petit",
          body: `
            <p>Per a informació de contacte existeix <code>&lt;address&gt;</code>, i per a lletra petita legal o notes finals <code>&lt;small&gt;</code>. Tots dos aporten significat, no només aspecte.</p>
            <p>Recorda: si l'únic que vols és que un text sigui més gran o més petit visualment, això és feina del CSS (<code>font-size</code>). Les etiquetes expliquen <em>què és</em> el text.</p>
          `,
          code: `<address>
  Escola La Sínia<br>
  <a href="mailto:info@escola.example">info@escola.example</a><br>
  Tel. 93 000 00 00
</address>

<p>Preu final: 24,90 € <small>(IVA inclòs)</small></p>`,
        },
      ],
      exercise: {
        brief:
          "Escriu una pàgina amb un <code>h1</code>, dos <code>h2</code> i un <code>h3</code> dins del primer <code>h2</code>. Afegeix-hi un paràgraf amb un salt de línia, una línia <code>hr</code> i una citació.",
        hint: "Comprova l'esquema amb l'extensió o eina que mostri l'arbre d'encapçalaments: no hauria de saltar cap nivell.",
      },
    },
    {
      slug: "colors-estils-en-linia",
      title: "Colors i tècniques d'estil en línia",
      summary:
        "L'atribut style permet aplicar CSS directament a un element. És la manera més ràpida d'experimentar amb colors i també la que cal aprendre a no abusar.",
      goals: [
        "Escriure declaracions CSS dins de l'atribut <code>style</code>.",
        "Entendre els formats de color: noms, hex, rgb i hsl.",
        "Saber quan un estil en línia és mala idea.",
      ],
      sections: [
        {
          title: "La sintaxi de style",
          body: `
            <p>Dins de <code>style</code> s'escriuen declaracions CSS amb la forma <code>propietat: valor;</code>, separades per punt i coma. No hi ha selector: les declaracions s'apliquen directament a l'element.</p>
            <ul>
              <li><code>color</code> ➜ color del text.</li>
              <li><code>background-color</code> ➜ color de fons.</li>
              <li><code>font-size</code> ➜ mida de la lletra.</li>
              <li><code>text-align</code> ➜ alineació del text.</li>
              <li><code>border</code> ➜ vora, amb gruix, estil i color.</li>
            </ul>
          `,
          code: `<p style="color: #b85c3a;">Text en color terracota</p>

<p style="background-color: #f6e7c1; padding: 12px; border-radius: 8px;">
  Paràgraf amb fons groguenc i espai interior.
</p>

<h2 style="font-size: 20px; text-align: center; letter-spacing: 2px;">
  TÍTOL CENTRAT
</h2>

<div style="border: 2px solid #1f7a5c; padding: 16px;">
  Una caixa amb vora verda.
</div>`,
        },
        {
          title: "Els quatre formats de color",
          body: `
            <p>El CSS accepta diverses maneres d'escriure un color, i totes són vàlides:</p>
            <ul>
              <li><strong>Nom</strong>: <code>red</code>, <code>tomato</code>, <code>rebeccapurple</code> (140 noms).</li>
              <li><strong>Hex</strong>: <code>#b85c3a</code>, amb dos dígits per a vermell, verd i blau.</li>
              <li><strong>rgb()</strong>: <code>rgb(184, 92, 58)</code>, de 0 a 255 per canal.</li>
              <li><strong>hsl()</strong>: <code>hsl(14 55% 47%)</code> ➜ to (0-360), saturació i lluminositat.</li>
            </ul>
            <p>Els dos darrers accepten transparència amb una quarta xifra: <code>rgb(0 0 0 / 0.4)</code> o <code>hsl(14 55% 47% / 0.4)</code>. També hi ha <code>rgba()</code> i <code>hsla()</code>, equivalents.</p>
          `,
          code: `<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; font: 12px system-ui;">
  <div style="background: tomato; padding: 16px; color: white;">tomato</div>
  <div style="background: #b85c3a; padding: 16px; color: white;">#b85c3a</div>
  <div style="background: rgb(31 122 92); padding: 16px; color: white;">rgb(31 122 92)</div>
  <div style="background: hsl(45 80% 60%); padding: 16px;">hsl(45 80% 60%)</div>
</div>

<p style="background: rgb(31 122 92 / 0.15); padding: 12px;">
  Fons verd amb només un 15% d'opacitat.
</p>`,
        },
        {
          title: "Quan l'estil en línia és una mala idea",
          body: `
            <p>L'estil en línia té la màxima prioritat: guanya per sobre de les classes i dels fulls d'estils. Això el fa útil per provar, però perillós per mantenir.</p>
            <ul>
              <li>No es pot reutilitzar: si vols el mateix color a vint paràgrafs, l'hauràs de repetir vint vegades.</li>
              <li>No es pot canviar des d'un únic lloc.</li>
              <li>Barreja contingut i presentació, i complica els canvis de disseny.</li>
            </ul>
            <p>La bona pràctica és fer servir <code>class</code> i un full d'estils. Deixa <code>style</code> per a proves ràpides o per a valors calculats per JavaScript.</p>
          `,
          code: `<style>
  .avis {
    background: #fdf2d0;
    border-left: 4px solid #d69e2e;
    padding: 12px 16px;
    color: #6b4e00;
  }
</style>

<p class="avis">Aquest estil es defineix una sola vegada i es pot reutilitzar.</p>
<p class="avis">Aquest altre paràgraf comparteix exactament el mateix aspecte.</p>`,
        },
      ],
      exercise: {
        brief:
          "Crea una targeta amb un títol, dos paràgrafs i un color de fons propi. Fes-la dues vegades: la primera amb <code>style</code> en línia i la segona amb una classe. Compara quant codi has hagut de repetir.",
        hint: "Quan hagis acabat, canvia el color de les dues targetes i compta quants llocs has hagut de tocar.",
      },
    },
    {
      slug: "format-text-tipografia",
      title: "Format de text i tipografia",
      summary:
        "Negretes, cursives, marcatge, abreviatures, codi en línia i les regles tipogràfiques que fan que un text es llegeixi bé.",
      goals: [
        "Distingir els elements amb significat dels merament visuals.",
        "Fer servir <code>mark</code>, <code>abbr</code>, <code>code</code>, <code>kbd</code>, <code>sub</code> i <code>sup</code>.",
        "Aplicar tipografia llegible amb CSS.",
      ],
      sections: [
        {
          title: "Èmfasi amb significat",
          body: `
            <p>Per destacar text hi ha dos parells d'elements. El primer parell aporta <strong>significat</strong> i és el recomanat:</p>
            <ul>
              <li><code>&lt;strong&gt;</code> ➜ importància gran (es veu en negreta).</li>
              <li><code>&lt;em&gt;</code> ➜ èmfasi (es veu en cursiva).</li>
            </ul>
            <p>El segon parell només indica aspecte visual: <code>&lt;b&gt;</code> (negreta) i <code>&lt;i&gt;</code> (cursiva). Reserva'ls per a noms propis, termes tècnics o paraules en altres idiomes.</p>
          `,
          code: `<p><strong>Atenció:</strong> el termini acaba <em>demà</em>.</p>
<p>El llibre <i>El Petit Príncep</i> és de <b>Antoine de Saint-Exupéry</b>.</p>`,
        },
        {
          title: "Elements de text especialitzats",
          body: `
            <p>HTML té una etiqueta per a cada necessitat concreta. Fan la feina millor que un <code>span</code> amb estils:</p>
            <ul>
              <li><code>&lt;mark&gt;</code> ➜ ressaltat (groc), com un subratllador fluorescent.</li>
              <li><code>&lt;small&gt;</code> ➜ lletra petita legal.</li>
              <li><code>&lt;del&gt;</code> i <code>&lt;ins&gt;</code> ➜ text esborrat i text afegit.</li>
              <li><code>&lt;sub&gt;</code> i <code>&lt;sup&gt;</code> ➜ subíndex i superíndex (H₂O, 2ⁿᵈ).</li>
              <li><code>&lt;abbr&gt;</code> ➜ abreviatura amb el significat a l'atribut <code>title</code>.</li>
              <li><code>&lt;code&gt;</code>, <code>&lt;kbd&gt;</code>, <code>&lt;samp&gt;</code> ➜ codi, tecles i sortida de programa.</li>
              <li><code>&lt;time&gt;</code> ➜ dates llegibles per a màquines amb <code>datetime</code>.</li>
            </ul>
          `,
          code: `<p>Estudia <mark>aquest apartat</mark> per a l'examen.</p>
<p>Preu antic <del>19,90 €</del> i ara <ins>14,90 €</ins> <small>(oferta limitada)</small></p>
<p>Fórmula de l'aigua: H<sub>2</sub>O · Potència: 2<sup>10</sup></p>
<p>L'<abbr title="HyperText Markup Language">HTML</abbr> és un estàndard.</p>
<p>Prem <kbd>Ctrl</kbd> + <kbd>S</kbd> per desar. L'ordre és <code>npm run build</code>.</p>
<p>Publicat el <time datetime="2026-11-11">11 de novembre de 2026</time>.</p>`,
        },
        {
          title: "Tipografia llegible",
          body: `
            <p>Un text bonic és un text que es llegeix sense esforç. Tres regles bàsiques:</p>
            <ul>
              <li>Cos de text entre <strong>16 i 20 px</strong>; l'alçada de línia entre <strong>1,5 i 1,7</strong>.</li>
              <li>Amplada de línia de <strong>60 a 75 caràcters</strong> (<code>max-width: 65ch</code>).</li>
              <li>Poques famílies tipogràfiques: una per als títols i una per al text, com a molt.</li>
            </ul>
            <p>Les <em>font stacks</em> amb tipografies del sistema carreguen a l'instant i funcionen a tot arreu: <code>system-ui, -apple-system, "Segoe UI", sans-serif</code>.</p>
          `,
          code: `<style>
  body {
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    font-size: 17px;
    line-height: 1.6;
    color: #23302b;
    max-width: 65ch;
    margin: 40px auto;
    padding: 0 16px;
  }
  h1 { font-size: 2rem; line-height: 1.2; letter-spacing: -0.02em; }
  h2 { font-size: 1.4rem; margin-top: 2rem; }
  p  { margin: 0 0 1rem; }
</style>

<h1>Un article ben tipografiat</h1>
<h2>Subtítol de la secció</h2>
<p>La longitud de la línia és el factor que més afecta la llegibilitat. Si les línies són massa llargues, l'ull es perd en tornar al principi.</p>
<p>Per això limitem l'amplada a uns 65 caràcters i augmentem l'espaiat entre línies.</p>`,
        },
      ],
      exercise: {
        brief:
          "Escriu un paràgraf sobre el teu llibre preferit i aplica-hi: una negreta amb significat, una cursiva, una abreviatura amb <code>title</code>, un tros de text ressaltat i una data amb <code>time</code>.",
        hint: "Passa el ratolí per sobre de l'abreviatura: ha d'aparèixer el significat complet.",
      },
    },
  ],
};