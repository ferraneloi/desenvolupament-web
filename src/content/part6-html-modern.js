export default {
  title: "HTML modern: interactius i maquetació",
  description:
    "Elements natius interactius, text avançat, Web Components i les regles de maquetació amb div, section, bloc i línia.",
  chapters: [
    {
      slug: "elements-interactius",
      title: "Elements interactius d'HTML5",
      summary:
        "Desplegables, diàlegs, barres de progrés i acordions sense JavaScript: el navegador ja porta interactivitat incorporada.",
      goals: [
        "Fer desplegables amb <code>details</code> i <code>summary</code>.",
        "Crear finestres modals amb <code>dialog</code>.",
        "Mostrar progrés i mesures amb <code>progress</code> i <code>meter</code>.",
      ],
      sections: [
        {
          title: "Desplegables natius",
          body: `
            <p><code>&lt;details&gt;</code> crea un bloc que es pot obrir i tancar. El títol visible és <code>&lt;summary&gt;</code>. És perfecte per a preguntes freqüents.</p>
            <p>Funciona sense JavaScript, és accessible amb teclat i es pot obrir per defecte amb l'atribut <code>open</code>.</p>
          `,
          code: `<details open>
  <summary>Què és l'HTML?</summary>
  <p>Un llenguatge de marcatge que descriu l'estructura del contingut d'una pàgina web.</p>
</details>

<details>
  <summary>Cal saber programar per començar?</summary>
  <p>No. Només cal escriure etiquetes i obrir el fitxer al navegador.</p>
</details>`,
        },
        {
          title: "El diàleg modal",
          body: `
            <p><code>&lt;dialog&gt;</code> és una finestra modal nativa. S'obre amb <code>showModal()</code> des de JavaScript, es tanca amb la tecla <code>Esc</code> i bloqueja la interacció amb la resta de la pàgina.</p>
            <p>Comparat amb les finestres fetes a mà, guanya en accessibilitat: el focus es gestiona sol i el formulari <code>method="dialog"</code> tanca la finestra sense codi.</p>
          `,
          code: `<button id="obre">Obre la finestra</button>

<dialog id="finestra">
  <form method="dialog">
    <h2>Avís important</h2>
    <p>Els canvis es desaran en sortir.</p>
    <button>D'acord</button>
  </form>
</dialog>

<script>
  const dialeg = document.querySelector("#finestra");
  document.querySelector("#obre").addEventListener("click", () => dialeg.showModal());
</script>`,
        },
        {
          title: "Progrés, mesures i altres controls",
          body: `
            <ul>
              <li><code>&lt;progress&gt;</code> ➜ progrés d'una tasca (amb <code>value</code> i <code>max</code>, o indeterminat si no hi són).</li>
              <li><code>&lt;meter&gt;</code> ➜ una mesura dins d'un rang, amb colors segons <code>low</code>, <code>high</code> i <code>optimum</code>.</li>
              <li><code>&lt;output&gt;</code> ➜ resultat d'un càlcul d'un formulari.</li>
            </ul>
            <p>Tots tres són elements amb significat: no són barres decoratives. Si només vols una barra visual sense dades reals, això és CSS.</p>
          `,
          code: `<p>Progrés del curs: <progress value="7" max="28"></progress></p>
<p>Progrés indeterminat: <progress></progress></p>

<p>Bateria: <meter value="0.2" low="0.3" high="0.8" optimum="1"></meter> 20%</p>
<p>Memòria: <meter value="0.85" low="0.3" high="0.8" optimum="0.1"></meter> 85%</p>`,
        },
      ],
      exercise: {
        brief:
          "Crea una pàgina de preguntes freqüents amb cinc blocs <code>details</code> (un d'obert) i afegeix-hi una finestra <code>dialog</code> que s'obri amb un botó i es tanqui amb el formulari intern.",
        hint: "Prova de tancar el diàleg amb la tecla <code>Esc</code>: funciona sense cap codi addicional.",
      },
    },
    {
      slug: "text-avancat",
      title: "Elements de text avançats",
      summary:
        "Cites, blocs preformatats, figures, definicions, tecles i direccionalitat: els elements que fan que un text tècnic sigui precís.",
      goals: [
        "Citar correctament amb <code>blockquote</code>, <code>q</code> i <code>cite</code>.",
        "Presentar codi amb <code>pre</code> i <code>code</code>.",
        "Fer servir <code>bdi</code>, <code>bdo</code> i <code>ruby</code> quan cal.",
      ],
      sections: [
        {
          title: "Cites i referències",
          body: `
            <p>Hi ha tres elements per citar:</p>
            <ul>
              <li><code>&lt;blockquote&gt;</code> ➜ cita llarga, en bloc, sovint amb sagnat.</li>
              <li><code>&lt;q&gt;</code> ➜ cita curta en línia; el navegador hi afegeix les cometes.</li>
              <li><code>&lt;cite&gt;</code> ➜ el títol de l'obra citada, no la persona.</li>
            </ul>
            <p>L'atribut <code>cite</code> (en un <code>blockquote</code> o <code>q</code>) guarda l'URL de la font. No es veu a la pàgina, però les eines la poden llegir.</p>
          `,
          code: `<blockquote cite="https://www.w3.org/TR/html52/">
  <p>L'HTML és el llenguatge de publicació del web.</p>
  <footer>— <cite>Especificació HTML</cite>, W3C</footer>
</blockquote>

<p>Com deia la professora: <q>validar el codi estalvia hores</q>.</p>`,
        },
        {
          title: "Codi i text preformat",
          body: `
            <p><code>&lt;pre&gt;</code> conserva els espais i els salts de línia. Dins seu s'hi sol posar <code>&lt;code&gt;</code> per marcar que és codi.</p>
            <p>Per mostrar etiquetes HTML reals has d'escapar els caràcters: <code>&amp;lt;</code> per a <code>&lt;</code>, <code>&amp;gt;</code> per a <code>&gt;</code> i <code>&amp;amp;</code> per a <code>&amp;</code>.</p>
            <p>També hi ha <code>&lt;kbd&gt;</code> per a tecles i <code>&lt;samp&gt;</code> per a la sortida d'un programa.</p>
          `,
          code: `<p>Per crear un títol escriu <code>&lt;h1&gt;Text&lt;/h1&gt;</code>.</p>

<pre><code>&lt;ul&gt;
  &lt;li&gt;Primer&lt;/li&gt;
  &lt;li&gt;Segon&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<p>Prem <kbd>Ctrl</kbd> + <kbd>C</kbd>. El programa respon <samp>Copiat!</samp></p>`,
        },
        {
          title: "Detalls de direccionalitat i anotacions",
          body: `
            <p>Quan un text barreja idiomes amb direccions diferents (àrab, hebreu) cal marcar-ho:</p>
            <ul>
              <li><code>dir="rtl"</code> ➜ text de dreta a esquerra.</li>
              <li><code>&lt;bdi&gt;</code> ➜ aïlla un fragment perquè no alteri la direcció del voltant.</li>
              <li><code>&lt;bdo dir="rtl"&gt;</code> ➜ força la inversió del text.</li>
            </ul>
            <p><code>&lt;ruby&gt;</code> afegeix anotacions sobre els caràcters, típiques del japonès, però també útils per a la transcripció fonètica.</p>
          `,
          code: `<p>Nom en àrab: <bdi>أحمد</bdi> (l'ordre de la frase no es trenca).</p>

<p>Text invertit: <bdo dir="rtl">HTML</bdo></p>

<ruby>
  漢 <rp>(</rp><rt>kan</rt><rp>)</rp>
</ruby>`,
        },
      ],
      exercise: {
        brief:
          "Escriu un article amb una cita llarga amb la seva font, una cita curta en línia i un bloc de codi on es vegi l'etiqueta <code>&lt;h1&gt;</code> escrita literalment.",
        hint: "Recorda escriure <code>&amp;lt;h1&amp;gt;</code> perquè el navegador no interpreti l'etiqueta.",
      },
    },
    {
      slug: "web-components",
      title: "HTML5 Web Components",
      summary:
        "Crear les teves pròpies etiquetes reutilitzables amb <code>template</code>, <code>slot</code> i JavaScript. La manera estàndard de fer components.",
      goals: [
        "Entendre què és un Web Component.",
        "Definir plantilles amb <code>template</code> i <code>slot</code>.",
        "Registrar un element personalitzat.",
      ],
      sections: [
        {
          title: "Plantilles i slots",
          body: `
            <p><code>&lt;template&gt;</code> guarda un fragment d'HTML que no es mostra ni s'executa fins que el JavaScript el clona. És la base dels components.</p>
            <p><code>&lt;slot&gt;</code> és un forat on el component rep el contingut de fora. Cada slot pot tenir contingut per defecte.</p>
          `,
          code: `<template id="plantilla-targeta">
  <style>
    .targeta {
      border: 1px solid #e2dbcd;
      border-radius: 12px;
      padding: 16px;
      font-family: system-ui, sans-serif;
      background: #fffdf8;
    }
    h3 { margin: 0 0 6px; color: #b85c3a; }
  </style>
  <div class="targeta">
    <h3><slot name="titol">Títol per defecte</slot></h3>
    <slot>Sense contingut</slot>
  </div>
</template>`,
        },
        {
          title: "Definir un element personalitzat",
          body: `
            <p>Un element personalitzat és una classe JavaScript que hereta de <code>HTMLElement</code> i es registra amb <code>customElements.define()</code>.</p>
            <p>El nom ha de portar un guió obligatòriament (<code>targeta-info</code>), per no xocar mai amb les etiquetes estàndard.</p>
            <p>Dins del <code>constructor</code> es crea l'<em>shadow DOM</em> amb <code>attachShadow</code>: un arbre aïllat on els estils del component no surten ni els de fora hi entren.</p>
          `,
          code: `<targeta-info>
  <span slot="titol">HTML</span>
  Llenguatge de marcatge per estructurar el contingut del web.
</targeta-info>

<targeta-info>
  <span slot="titol">CSS</span>
  Llenguatge d'estils per definir l'aspecte de la pàgina.
</targeta-info>

<script>
  class TargetaInfo extends HTMLElement {
    constructor() {
      super();
      const plantilla = document.querySelector("#plantilla-targeta");
      const shadow = this.attachShadow({ mode: "open" });
      shadow.append(plantilla.content.cloneNode(true));
    }
  }
  customElements.define("targeta-info", TargetaInfo);
</script>`,
        },
        {
          title: "Quan val la pena",
          body: `
            <p>Els Web Components són útils quan necessites una peça reutilitzable en molts projectes o quan vols encapsular estils de veritat.</p>
            <p>Per a una pàgina petita, sovint n'hi ha prou amb HTML i CSS ben organitzats: no cal componentitzar-ho tot.</p>
            <p>Avantatges: encapsulament d'estils, reutilització, funciona amb qualsevol framework. Inconvenients: més codi i una corba d'aprenentatge de JavaScript.</p>
          `,
          note: `<strong>Atenció a l'ordre:</strong> la classe ha d'existir abans de fer servir l'etiqueta, o el navegador la mostrarà buida. Per això el <code>&lt;script&gt;</code> va després de la plantilla i dels usos.`,
        },
      ],
      exercise: {
        brief:
          "Crea un component <code>caixa-avis</code> amb una plantilla que tingui un títol per slot i un estil propi dins del shadow DOM. Fes-lo servir tres vegades amb textos diferents.",
        hint: "Comprova que els estils del component no afecten la resta de la pàgina.",
      },
    },
    {
      slug: "div-vs-section",
      title: "Contenidors de maquetació: div vs section",
      summary:
        "Quan un contenidor és només per a estils i quan ha de ser semàntic. La diferència entre agrupar i significar.",
      goals: [
        "Diferència <code>div</code> de <code>section</code>, <code>article</code> i <code>aside</code>.",
        "Saber quan un contenidor ha de tenir títol.",
        "Evitar l'excés d'elements innecessaris (<em>divitis</em>).",
      ],
      sections: [
        {
          title: "div: el contenidor neutre",
          body: `
            <p><code>&lt;div&gt;</code> no significa res: és una caixa genèrica per agrupar elements i aplicar-hi estils o JavaScript.</p>
            <p>És l'element correcte quan necessites una fila de grid, un embolcall per centrar contingut o un contenidor de decoració. No és correcte per representar una secció, un article o una navegació: per això hi ha etiquetes amb significat.</p>
          `,
          code: `<div style="display: flex; gap: 12px;">
  <div style="flex: 1; padding: 16px; background: #f1ece1; border-radius: 8px;">Columna 1</div>
  <div style="flex: 1; padding: 16px; background: #f1ece1; border-radius: 8px;">Columna 2</div>
</div>`,
        },
        {
          title: "section: un bloc amb títol",
          body: `
            <p><code>&lt;section&gt;</code> agrupa contingut relacionat i <strong>normalment porta un títol</strong> (<code>h2</code>, <code>h3</code>...). Si no en pot tenir cap, probablement hauria de ser un <code>div</code>.</p>
            <p>Dins d'una pàgina pots tenir una secció d'introducció, una de continguts i una de contacte. Els lectors de pantalla les poden llistar i navegar-hi.</p>
          `,
          code: `<section aria-labelledby="qui-som">
  <h2 id="qui-som">Qui som</h2>
  <p>Un equip de docents que ensenya desenvolupament web.</p>
</section>

<section aria-labelledby="que-fem">
  <h2 id="que-fem">Què fem</h2>
  <p>Formació presencial i materials oberts.</p>
</section>`,
        },
        {
          title: "article, aside i la síndrome del div",
          body: `
            <ul>
              <li><code>&lt;article&gt;</code> ➜ contingut independent i reutilitzable: una notícia, una fitxa de producte, un comentari.</li>
              <li><code>&lt;aside&gt;</code> ➜ contingut relacionat però secundari: una nota al marge, dades de contacte.</li>
              <li><code>&lt;main&gt;</code> ➜ el contingut principal, únic per pàgina.</li>
              <li><code>&lt;nav&gt;</code> ➜ un conjunt d'enllaços de navegació.</li>
            </ul>
            <p>Si un <code>div</code> només embolcalla un altre <code>div</code> sense cap estil ni funció, probablement sobra. Menys elements és codi més fàcil de mantenir.</p>
          `,
          code: `<main>
  <article>
    <h1>Com va néixer l'HTML</h1>
    <p>El 1991, al CERN...</p>
    <aside>
      <h2>Sabies que...</h2>
      <p>La primera web encara es pot visitar.</p>
    </aside>
  </article>
</main>`,
        },
      ],
      exercise: {
        brief:
          "Refà una pàgina plena de <code>div</code> fent servir <code>main</code>, <code>section</code>, <code>article</code>, <code>aside</code> i <code>nav</code>. Deixa <code>div</code> només on sigui purament decoratiu.",
        hint: "Comprova que cada <code>section</code> que hagis creat tingui un títol.",
      },
    },
    {
      slug: "bloc-vs-en-linia",
      title: "Elements de bloc i elements en línia",
      summary:
        "Per què dos elements es posen un sota l'altre o al costat, i com el CSS pot canviar aquest comportament.",
      goals: [
        "Reconèixer elements de bloc i elements en línia.",
        "Entendre per què no es poden niar sempre.",
        "Canviar el comportament amb <code>display</code>.",
      ],
      sections: [
        {
          title: "Dues maneres d'ocupar l'espai",
          body: `
            <p>Els <strong>elements de bloc</strong> comencen en una línia nova i ocupen tot l'amplada disponible: <code>div</code>, <code>p</code>, <code>h1</code>–<code>h6</code>, <code>ul</code>, <code>section</code>, <code>article</code>, <code>form</code>.</p>
            <p>Els <strong>elements en línia</strong> ocupen només l'amplada del seu contingut i segueixen el flux del text: <code>span</code>, <code>a</code>, <code>strong</code>, <code>em</code>, <code>code</code>, <code>img</code>, <code>input</code>.</p>
            <p>El flux normal del document col·loca cada element segons aquesta regla. Entendre-ho és el primer pas per dominar la maquetació.</p>
          `,
          code: `<p>Aquest paràgraf és un element de bloc.</p>
<p>I aquest comença en una línia nova.</p>

<p>
  Dins d'un paràgraf, <strong>la negreta</strong> i <a href="#">un enllaç</a>
  són en línia: continuen a la mateixa línia.
</p>`,
        },
        {
          title: "Per què no es poden niar sempre",
          body: `
            <p>Un element de bloc no pot anar dins d'un element en línia que només conté text, i un enllaç no ha de contenir un altre enllaç. Quan l'HTML és invàlid, el navegador «repara» l'arbre a la seva manera i el resultat no és el que esperaves.</p>
            <p>Regla pràctica: dins de <code>p</code> només hi van elements en línia (o <code>img</code>, <code>br</code>). Si necessites un bloc dins d'un text, tanca el paràgraf.</p>
          `,
          code: `<!-- INCORRECTE: un div dins d'un p -->
<p>Text <div>bloc</div> més text</p>

<!-- CORRECTE -->
<p>Text</p>
<div>bloc</div>
<p>Més text</p>

<!-- CORRECTE: span és en línia i pot anar dins -->
<p>Text amb <span style="color:#b85c3a">una part destacada</span> al mig.</p>`,
        },
        {
          title: "display: canviar les regles",
          body: `
            <p>Amb CSS pots canviar com es comporta qualsevol element:</p>
            <ul>
              <li><code>display: block</code> ➜ el fa de bloc.</li>
              <li><code>display: inline</code> ➜ el fa en línia (no accepta amplada ni alçada).</li>
              <li><code>display: inline-block</code> ➜ en línia però amb mides.</li>
              <li><code>display: flex</code> / <code>grid</code> ➜ el converteix en contenidor de maquetació.</li>
              <li><code>display: none</code> ➜ l'amaga i allibera el seu espai.</li>
            </ul>
            <p>Canviar <code>display</code> no canvia el significat de l'element: un <code>a</code> segueix sent un enllaç encara que el mostris com una targeta.</p>
          `,
          code: `<style>
  .enllac-targeta {
    display: inline-block;
    padding: 10px 16px;
    background: #b85c3a;
    color: white;
    text-decoration: none;
    border-radius: 8px;
  }
  .amagat { display: none; }
</style>

<a class="enllac-targeta" href="#">Sóc un enllaç amb forma de botó</a>

<p class="amagat">Aquest paràgraf no ocupa espai.</p>
<p>El paràgraf anterior no existeix visualment.</p>`,
        },
      ],
      exercise: {
        brief:
          "Crea una llista d'enllaços i converteix-los en botons amb <code>display: inline-block</code>. Després afegeix un paràgraf ocult amb <code>display: none</code> i comprova que no deixa cap forat.",
        hint: "Prova també <code>visibility: hidden</code> i compara: l'espai es reserva però no es veu.",
      },
    },
  ],
};