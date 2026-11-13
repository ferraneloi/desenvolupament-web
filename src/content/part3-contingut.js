export default {
  title: "Llistes, taules i imatges",
  description:
    "Estructures de dades en HTML: llistes de tot tipus, taules amb capçaleres i imatges ben descrites.",
  chapters: [
    {
      slug: "llistes",
      title: "Llistes HTML: ordenades, no ordenades i de descripció",
      summary:
        "Tres tipus de llistes per a tres necessitats: passos numerats, elements sense ordre i glossaris de terme i definició. També s'hi poden niar.",
      goals: [
        "Triar el tipus de llista adequat.",
        "Niuar llistes dins de llistes.",
        "Fer servir <code>ol</code> amb atributs com <code>start</code> i <code>reversed</code>.",
      ],
      sections: [
        {
          title: "Llistes no ordenades",
          body: `
            <p><code>&lt;ul&gt;</code> (unordered list) crea una llista amb pics. Cada element és un <code>&lt;li&gt;</code> (list item).</p>
            <p>Serveix quan l'ordre no importa: ingredients, característiques, enllaços d'un menú. El navegador hi posa un punt, però el símbol es pot canviar amb CSS (<code>list-style-type</code>).</p>
          `,
          code: `<h2>Materials per a la pràctica</h2>
<ul>
  <li>Ordinador amb navegador</li>
  <li>Editor de text</li>
  <li>Un fitxer <code>index.html</code></li>
</ul>`,
        },
        {
          title: "Llistes ordenades",
          body: `
            <p><code>&lt;ol&gt;</code> numera els elements automàticament. És la llista dels passos d'una recepta o d'un procediment.</p>
            <p>Té tres atributs útils: <code>start</code> per començar en un número concret, <code>reversed</code> per comptar enrere i <code>type</code> per canviar el marcatge (1, A, a, I, i).</p>
          `,
          code: `<h2>Com publicar una pàgina</h2>
<ol>
  <li>Desa el fitxer com a <code>index.html</code></li>
  <li>Obre'l al navegador</li>
  <li>Comprova que tot es veu bé</li>
</ol>

<h2>Començant al pas 4</h2>
<ol start="4" type="A">
  <li>Puja els fitxers al servidor</li>
  <li>Comprova l'adreça pública</li>
</ol>

<h2>Compte enrere</h2>
<ol reversed>
  <li>Tres</li>
  <li>Dos</li>
  <li>Un</li>
</ol>`,
        },
        {
          title: "Llistes de descripció i llistes niades",
          body: `
            <p><code>&lt;dl&gt;</code> serveix per a glossaris: cada <code>&lt;dt&gt;</code> és el terme i cada <code>&lt;dd&gt;</code> la seva definició. És ideal per a preguntes freqüents i fitxes tècniques.</p>
            <p>Una llista pot anar dins d'un <code>&lt;li&gt;</code> d'una altra llista: així es creen menús i índexs amb diversos nivells. El subnivell sempre va <strong>dins</strong> de l'element de la llista, mai entre dos <code>li</code>.</p>
          `,
          code: `<dl>
  <dt>HTML</dt>
  <dd>Llenguatge de marcatge que descriu l'estructura del contingut.</dd>
  <dt>CSS</dt>
  <dd>Llenguatge d'estils que defineix l'aspecte de la pàgina.</dd>
</dl>

<ul>
  <li>Fonaments
    <ul>
      <li>Estructura</li>
      <li>Atributs</li>
    </ul>
  </li>
  <li>Contingut
    <ul>
      <li>Llistes</li>
      <li>Taules</li>
    </ul>
  </li>
</ul>`,
        },
      ],
      exercise: {
        brief:
          "Crea tres llistes: una de la compra (no ordenada), una recepta de quatre passos (ordenada) i un mini glossari amb tres termes. Afegeix-hi una subllista dins del primer element de la compra.",
        hint: "Recorda que la subllista va dins del <code>&lt;li&gt;</code>, just abans de tancar-lo.",
      },
    },
    {
      slug: "taules",
      title: "Taules HTML: estructura i funcions avançades",
      summary:
        "Taules per a dades, no per a maquetar. Aprèn capçaleres, files, cel·les combinades i llegendes per fer-les accessibles.",
      goals: [
        "Construir una taula amb <code>thead</code>, <code>tbody</code> i <code>tfoot</code>.",
        "Distingir cel·les de capçalera (<code>th</code>) de cel·les de dades (<code>td</code>).",
        "Combinar cel·les amb <code>colspan</code> i <code>rowspan</code>.",
      ],
      sections: [
        {
          title: "L'estructura mínima",
          body: `
            <p>Una taula es construeix de fora cap a dins: <code>&lt;table&gt;</code>, files <code>&lt;tr&gt;</code> i cel·les <code>&lt;td&gt;</code>. Les cel·les de capçalera es marquen amb <code>&lt;th&gt;</code>.</p>
            <p>Agrupar les files en <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code> i <code>&lt;tfoot&gt;</code> no canvia l'aspecte, però dona estructura i facilita l'estil i l'accessibilitat.</p>
            <p>Mai facis servir una taula per maquetar la pàgina: per això hi ha CSS Grid i Flexbox.</p>
          `,
          code: `<table border="1" cellpadding="8">
  <caption>Notes del trimestre</caption>
  <thead>
    <tr>
      <th scope="col">Assignatura</th>
      <th scope="col">Nota</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Informàtica</th>
      <td>8,5</td>
    </tr>
    <tr>
      <th scope="row">Matemàtiques</th>
      <td>7,0</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Mitjana</td>
      <td>7,75</td>
    </tr>
  </tfoot>
</table>`,
        },
        {
          title: "Combinar cel·les",
          body: `
            <p><code>colspan</code> fa que una cel·la ocupi diverses columnes; <code>rowspan</code> fa que ocupi diverses files. És útil per a horaris i taules amb categories.</p>
            <p>Compte amb els comptes: si una cel·la ocupa tres columnes, aquella fila tindrà tres cel·les menys a la resta.</p>
          `,
          code: `<table border="1" cellpadding="8">
  <thead>
    <tr>
      <th>Hora</th>
      <th>Dilluns</th>
      <th>Dimarts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>8:00</th>
      <td colspan="2">Tutoria conjunta</td>
    </tr>
    <tr>
      <th>9:00</th>
      <td rowspan="2">Taller d'HTML</td>
      <td>Matemàtiques</td>
    </tr>
    <tr>
      <th>10:00</th>
      <td>Anglès</td>
    </tr>
  </tbody>
</table>`,
        },
        {
          title: "Accessibilitat i estil",
          body: `
            <p>Una taula és accessible quan:</p>
            <ul>
              <li>Té una <code>&lt;caption&gt;</code> que explica què conté.</li>
              <li>Cada <code>th</code> indica si és capçalera de columna (<code>scope="col"</code>) o de fila (<code>scope="row"</code>).</li>
              <li>No s'usa per a disseny.</li>
            </ul>
            <p>Per a l'estil, millor CSS que atributs antics com <code>border</code> o <code>cellpadding</code>. Amb <code>border-collapse: collapse</code> les vores no es dupliquen.</p>
          `,
          code: `<style>
  table { border-collapse: collapse; width: 100%; font: 15px system-ui; }
  caption { text-align: left; font-weight: 600; padding-bottom: 8px; }
  th, td { border-bottom: 1px solid #dcd6c9; padding: 10px 12px; text-align: left; }
  thead th { background: #f1ece1; }
  tbody tr:hover { background: #faf7f1; }
</style>

<table>
  <caption>Horari de la setmana</caption>
  <thead>
    <tr><th scope="col">Dia</th><th scope="col">Activitat</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Dilluns</th><td>HTML</td></tr>
    <tr><th scope="row">Dimarts</th><td>CSS</td></tr>
  </tbody>
</table>`,
        },
      ],
      exercise: {
        brief:
          "Construeix una taula d'horaris de cinc files i tres columnes amb capçalera, una cel·la que ocupi dues columnes i una altra que ocupi dues files. Afegeix-hi una llegenda.",
        hint: "Compta les cel·les de cada fila: han de sumar sempre el mateix nombre de columnes.",
      },
    },
    {
      slug: "imatges",
      title: "Imatges i contingut visual",
      summary:
        "La imatge és l'element amb més detalls subtils de l'HTML: mides, text alternatiu, formats moderns i càrrega eficient.",
      goals: [
        "Inserir imatges amb <code>img</code> i un bon text alternatiu.",
        "Evitar el «salt» de la pàgina amb <code>width</code> i <code>height</code>.",
        "Conèixer <code>figure</code>, <code>picture</code> i <code>loading</code>.",
      ],
      sections: [
        {
          title: "La imatge bàsica",
          body: `
            <p><code>&lt;img&gt;</code> és una etiqueta buida: no té contingut ni tancament. Els seus dos atributs obligatoris són <code>src</code> (el fitxer) i <code>alt</code> (el text alternatiu).</p>
            <p>L'<code>alt</code> ha de descriure la imatge amb paraules. Si és purament decorativa, es deixa buit: <code>alt=""</code>, i el lector de pantalla la ignorarà.</p>
            <p>Indica sempre <code>width</code> i <code>height</code>: el navegador reserva l'espai abans que la imatge arribi i el contingut no salta.</p>
          `,
          code: `<img
  src="https://picsum.photos/id/1015/640/360"
  alt="Un riu de muntanya envoltat de pedres"
  width="640"
  height="360">`,
        },
        {
          title: "Peus d'imatge i figures",
          body: `
            <p>Quan una imatge necessita un peu de text, s'embolcalla en <code>&lt;figure&gt;</code> amb un <code>&lt;figcaption&gt;</code>. Així la imatge i la seva explicació viatgen juntes.</p>
            <p><code>&lt;figure&gt;</code> també pot contenir codi, taules o diagrames: qualsevol contingut que es vulgui acompanyar d'una llegenda.</p>
          `,
          code: `<figure style="margin: 0; max-width: 480px;">
  <img
    src="https://picsum.photos/id/1025/480/280"
    alt="Un gos petit assegut mirant a càmera"
    width="480" height="280"
    style="border-radius: 12px; display: block; width: 100%; height: auto;">
  <figcaption style="font-size: 13px; color: #6b6259; margin-top: 8px;">
    Figura 1. La imatge i el peu formen una unitat.
  </figcaption>
</figure>`,
        },
        {
          title: "Formats, mides i càrrega",
          body: `
            <p>Escull el format segons el contingut:</p>
            <ul>
              <li><strong>JPG</strong> ➜ fotografies.</li>
              <li><strong>PNG</strong> ➜ transparència i captures.</li>
              <li><strong>SVG</strong> ➜ icones i logotips (escalen sense perdre qualitat).</li>
              <li><strong>WebP / AVIF</strong> ➜ formats moderns, més lleugers.</li>
            </ul>
            <p>Amb <code>loading="lazy"</code> el navegador carrega la imatge només quan està a punt d'aparèixer. Amb <code>srcset</code> pots oferir diverses mides i deixar que el navegador triï.</p>
          `,
          code: `<img
  src="https://picsum.photos/id/1043/320/200"
  srcset="https://picsum.photos/id/1043/320/200 320w,
          https://picsum.photos/id/1043/640/400 640w"
  sizes="(max-width: 600px) 320px, 640px"
  alt="Bosc amb boira al matí"
  width="640" height="400"
  loading="lazy"
  style="max-width: 100%; height: auto;">`,
        },
        {
          title: "SVG en línia",
          body: `
            <p>Els SVG es poden incrustar directament dins de l'HTML. Així es poden estilitzar amb CSS i canviar de color, cosa que amb un fitxer extern no és tan directe.</p>
            <p>És la manera habitual de fer icones lleugeres i nítides a qualsevol mida.</p>
          `,
          code: `<svg width="72" height="72" viewBox="0 0 24 24" fill="none"
     stroke="#b85c3a" stroke-width="1.6" stroke-linecap="round"
     role="img" aria-label="Icona d'un llamp">
  <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>
</svg>`,
        },
      ],
      exercise: {
        brief:
          "Afegeix a una pàgina tres imatges: una amb peu de foto, una de decorativa amb <code>alt</code> buit i una amb càrrega diferida i mides declarades. Comprova que el text alternatiu apareix si trenques la URL.",
        hint: "Per provar l'<code>alt</code>, canvia el <code>src</code> per una ruta que no existeixi i recarrega.",
      },
    },
  ],
};