export default {
  title: "Enllaços, metadades i recursos",
  description:
    "La xarxa d'enllaços, els recursos externs, el SEO, el CSS intern i la integració de JavaScript.",
  chapters: [
    {
      slug: "enllacos",
      title: "Hiperenllaços i navegació",
      summary:
        "L'enllaç és el que fa que el web sigui una xarxa. Aprèn a enllaçar pàgines, seccions, correus i telèfons amb seguretat.",
      goals: [
        "Enllaçar pàgines externes, internes i seccions del mateix document.",
        "Fer servir <code>target</code> i <code>rel</code> correctament.",
        "Crear enllaços de correu i telèfon.",
      ],
      sections: [
        {
          title: "L'element a i l'atribut href",
          body: `
            <p><code>&lt;a&gt;</code> és l'element d'enllaç i <code>href</code> (hypertext reference) és el destí. Sense <code>href</code> no és un enllaç, només un text.</p>
            <ul>
              <li>Adreça absoluta: <code>https://exemple.com/pagina</code>.</li>
              <li>Adreça relativa: <code>contacte.html</code> o <code>../imatges/foto.jpg</code>.</li>
              <li>Secció del mateix document: <code>#seccio-2</code>.</li>
              <li>Correu: <code>mailto:hola@exemple.cat</code>.</li>
              <li>Telèfon: <code>tel:+34930000000</code>.</li>
            </ul>
            <p>El text de l'enllaç ha de descriure el destí. «Fes clic aquí» no diu res; «Consulta el temari» sí.</p>
          `,
          code: `<a href="https://developer.mozilla.org/ca/">Documentació del MDN</a>

<a href="contacte.html">Pàgina de contacte</a>

<a href="#horaris">Ves als horaris</a>
...
<h2 id="horaris">Horaris</h2>

<a href="mailto:info@escola.example">Escriu-nos un correu</a>
<a href="tel:+34930000000">Truca'ns al 93 000 00 00</a>`,
        },
        {
          title: "Obrir en una pestanya nova",
          body: `
            <p><code>target="_blank"</code> obre el destí en una pestanya nova. Quan el fas servir amb enllaços externs, afegeix-hi sempre <code>rel="noopener"</code>: evita que la pàgina de destí pugui manipular la teva.</p>
            <p>Amb <code>rel="noreferrer"</code> tampoc s'envia la informació d'origen.</p>
            <p>No obris tots els enllaços en pestanya nova: trenca el botó «endarrere» i molesta.</p>
          `,
          code: `<a href="https://www.w3.org/" target="_blank" rel="noopener noreferrer">
  Web del W3C (s'obre en una pestanya nova)
</a>

<a href="https://example.com" rel="nofollow">Enllaç que no volem que es rastregi</a>`,
        },
        {
          title: "Enllaços interns i de descàrrega",
          body: `
            <p>Els enllaços interns permeten saltar a qualsevol element amb <code>id</code>. És la base dels índexs de continguts i dels enllaços «torna a dalt».</p>
            <p>Amb l'atribut <code>download</code> el navegador descarrega el fitxer en lloc d'obrir-lo.</p>
            <p>Una bona pràctica és embolcallar blocs sencers amb un enllaç quan tota la targeta ha de ser clicable, en lloc de posar-hi diversos enllaços a dins.</p>
          `,
          code: `<nav>
  <a href="#introduccio">Introducció</a> ·
  <a href="#contingut">Contingut</a> ·
  <a href="#conclusio">Conclusió</a>
</nav>

<h2 id="introduccio">Introducció</h2>
<p>...</p>

<a href="apunts.pdf" download="apunts-html.pdf">Descarrega els apunts en PDF</a>

<p><a href="#top">Torna a dalt</a></p>`,
        },
      ],
      exercise: {
        brief:
          "Crea una pàgina amb un índex de tres enllaços interns cap a tres seccions, un enllaç extern que s'obri en una pestanya nova i un enllaç de correu.",
        hint: "Comprova que els enllaços interns funcionen: en fer clic, la URL ha d'acabar amb <code>#nom-seccio</code>.",
      },
    },
    {
      slug: "element-link",
      title: "L'element link: recursos externs",
      summary:
        "<code>link</code> connecta el document amb fitxers i serveis externs: fulls d'estils, icones, tipografies, versions traduïdes i molt més.",
      goals: [
        "Enllaçar un full d'estils extern.",
        "Afegir una icona de pestanya (favicon).",
        "Conèixer els atributs <code>rel</code>, <code>href</code>, <code>media</code> i <code>preload</code>.",
      ],
      sections: [
        {
          title: "Fulls d'estils externs",
          body: `
            <p>La manera professional d'aplicar CSS és un fitxer separat que s'enllaça des del <code>head</code>:</p>
            <p><code>&lt;link rel="stylesheet" href="estils.css"&gt;</code></p>
            <p>El fitxer <code>estils.css</code> conté només regles CSS, sense etiquetes HTML. Així el mateix estil es pot compartir entre moltes pàgines del lloc.</p>
            <p>L'ordre importa: si enllaça diversos fulls, l'últim guanya en cas de conflicte.</p>
          `,
          code: `<link rel="stylesheet" href="estils.css">
<link rel="stylesheet" href="impressio.css" media="print">
<link rel="stylesheet" href="mobil.css" media="(max-width: 600px)">`,
        },
        {
          title: "Icones i tipografies",
          body: `
            <p>El <em>favicon</em> és la icona que apareix a la pestanya del navegador. Es declara amb <code>rel="icon"</code>.</p>
            <p>Les tipografies de Google Fonts o d'altres serveis també s'enllacen amb <code>link</code>. Convé afegir-hi <code>preconnect</code> perquè la connexió comenci abans.</p>
          `,
          code: `<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icona-180.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap">`,
        },
        {
          title: "Altres relacions útils",
          body: `
            <p>L'atribut <code>rel</code> descriu la relació entre el document i el recurs. Valors habituals:</p>
            <ul>
              <li><code>canonical</code> ➜ l'adreça oficial de la pàgina (evita contingut duplicat).</li>
              <li><code>alternate</code> ➜ versions en altres idiomes o formats (RSS).</li>
              <li><code>preload</code> ➜ carrega un recurs prioritari abans que toqui.</li>
              <li><code>manifest</code> ➜ dades d'instal·lació com a aplicació.</li>
            </ul>
            <p><code>link</code> és una etiqueta buida i només té sentit dins del <code>head</code>.</p>
          `,
          code: `<link rel="canonical" href="https://exemple.cat/tutorial/html">
<link rel="alternate" hreflang="es" href="https://exemple.cat/es/tutorial/html">
<link rel="manifest" href="manifest.json">
<link rel="preload" href="fonts/inter.woff2" as="font" type="font/woff2" crossorigin>`,
        },
      ],
      exercise: {
        brief:
          "Crea un fitxer <code>estils.css</code>, enllaça'l des del HTML i comprova que els estils s'apliquen. Afegeix-hi una icona de pestanya i una tipografia externa.",
        hint: "Si l'estil no s'aplica, revisa que la ruta del <code>href</code> sigui correcta respecte al fitxer HTML.",
      },
    },
    {
      slug: "metatags",
      title: "Metatags: SEO i xarxes socials",
      summary:
        "Les metadades diuen als cercadors i a les xarxes socials com ha de presentar-se la pàgina. Poques línies de codi amb molt impacte.",
      goals: [
        "Escriure les metadades essencials d'una pàgina.",
        "Controlar com es veu l'enllaç a WhatsApp, X o LinkedIn.",
        "Entendre què és el SEO tècnic bàsic.",
      ],
      sections: [
        {
          title: "Les metadades essencials",
          body: `
            <p><code>&lt;meta&gt;</code> és una etiqueta buida que aporta informació sobre la pàgina. Les imprescindibles:</p>
            <ul>
              <li><code>charset</code> ➜ joc de caràcters (sempre UTF-8).</li>
              <li><code>viewport</code> ➜ adaptació a mòbils.</li>
              <li><code>description</code> ➜ el text que el cercador pot mostrar sota el títol.</li>
              <li><code>robots</code> ➜ si la pàgina es pot indexar.</li>
              <li><code>theme-color</code> ➜ color de la barra del navegador al mòbil.</li>
            </ul>
            <p>La descripció hauria de tenir entre 120 i 160 caràcters i resumir el contingut amb una frase atractiva.</p>
          `,
          code: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Curs d'HTML per a alumnat — Escola La Sínia</title>
  <meta name="description" content="Tutorial complet d'HTML en català amb exemples, exercicis i una zona de proves per escriure codi al navegador.">
  <meta name="author" content="Escola La Sínia">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#b85c3a">
</head>`,
        },
        {
          title: "Com es veu l'enllaç quan el comparteixes",
          body: `
            <p>Quan enganxes un enllaç a WhatsApp o a les xarxes, l'aplicació llegeix unes metadades especials. Si no hi són, mostra un text genèric o cap imatge.</p>
            <p>El protocol <strong>Open Graph</strong> (Facebook, LinkedIn, WhatsApp) i les <strong>Twitter Cards</strong> cobreixen gairebé tots els casos:</p>
            <ul>
              <li><code>og:title</code> ➜ títol de la targeta.</li>
              <li><code>og:description</code> ➜ descripció curta.</li>
              <li><code>og:image</code> ➜ imatge (mínim 1200 × 630 px).</li>
              <li><code>og:url</code> i <code>og:type</code> ➜ adreça i tipus de contingut.</li>
            </ul>
          `,
          code: `<meta property="og:type" content="article">
<meta property="og:title" content="Curs d'HTML per a alumnat">
<meta property="og:description" content="28 capítols en català amb exemples i exercicis.">
<meta property="og:image" content="https://exemple.cat/imatges/portada.png">
<meta property="og:url" content="https://exemple.cat/tutorial/html">
<meta property="og:locale" content="ca_ES">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Curs d'HTML per a alumnat">
<meta name="twitter:image" content="https://exemple.cat/imatges/portada.png">`,
        },
        {
          title: "Estructura de dades i SEO tècnic",
          body: `
            <p>Els cercadors també llegeixen dades estructurades en format JSON-LD per entendre el contingut i mostrar resultats enriquits (preguntes freqüents, receptes, cursos).</p>
            <p>Es col·loquen dins d'un <code>&lt;script type="application/ld+json"&gt;</code> al <code>head</code> o al final del <code>body</code>.</p>
            <p>Resum de SEO tècnic que pots controlar des de l'HTML: títol únic, descripció, un sol <code>h1</code>, imatges amb <code>alt</code>, enllaços descriptius, adreça canònica i bon rendiment.</p>
          `,
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Tutorial d'HTML en català",
  "description": "Curs complet d'HTML amb exemples i exercicis.",
  "provider": {
    "@type": "Organization",
    "name": "Escola La Sínia"
  }
}
</script>`,
        },
      ],
      exercise: {
        brief:
          "Prepara les metadades d'una pàgina teva: títol de menys de 60 caràcters, descripció de 120-160, Open Graph amb imatge i una targeta de Twitter.",
        hint: "Enganxa l'adreça publicada a WhatsApp per veure com queda la targeta.",
      },
    },
    {
      slug: "element-style",
      title: "L'element style: CSS intern",
      summary:
        "Escriure CSS dins del document: selectors, cascada, especificitat i les variables CSS que fan els estils molt més fàcils de mantenir.",
      goals: [
        "Escriure regles CSS dins de <code>style</code>.",
        "Entendre selectors, cascada i especificitat.",
        "Fer servir variables CSS.",
      ],
      sections: [
        {
          title: "Regles, selectors i propietats",
          body: `
            <p>Dins de <code>&lt;style&gt;</code> s'escriuen regles CSS. Cada regla té un <strong>selector</strong> i un bloc de declaracions entre claus.</p>
            <ul>
              <li><code>p</code> ➜ tots els paràgrafs (selector de tipus).</li>
              <li><code>.avis</code> ➜ tots els elements amb aquella classe.</li>
              <li><code>#capcalera</code> ➜ l'element amb aquell <code>id</code>.</li>
              <li><code>article p</code> ➜ paràgrafs dins d'un article (descendent).</li>
              <li><code>a:hover</code> ➜ estat de l'element en passar el ratolí.</li>
            </ul>
          `,
          code: `<style>
  body {
    font-family: system-ui, sans-serif;
    background: #faf7f1;
    color: #23302b;
    margin: 0;
    padding: 24px;
  }
  h1 { color: #b85c3a; margin-bottom: 8px; }
  p { line-height: 1.6; }
  .avis { border-left: 4px solid #b85c3a; padding-left: 12px; }
  a:hover { color: #1f7a5c; }
</style>

<h1>Estils interns</h1>
<p>Un paràgraf normal.</p>
<p class="avis">Un paràgraf amb classe.</p>
<p><a href="#">Un enllaç amb hover</a></p>`,
        },
        {
          title: "Cascada i especificitat",
          body: `
            <p>Quan dues regles afecten el mateix element, guanya la que té més <strong>especificitat</strong>. L'ordre aproximat, de menys a més:</p>
            <ol>
              <li>Selector de tipus (<code>p</code>)</li>
              <li>Selector de classe (<code>.avis</code>)</li>
              <li>Selector d'identificador (<code>#capcalera</code>)</li>
              <li>Estil en línia (<code>style="..."</code>)</li>
            </ol>
            <p>Si hi ha empat, guanya la regla que apareix més avall. Aquesta és la <em>cascada</em>. Per això és millor escriure estils senzills i evitar baralles d'especificitat.</p>
          `,
          code: `<style>
  p { color: #23302b; }
  .destacat { color: #b85c3a; }
  #unic { color: #1f7a5c; }
</style>

<p>Aquest paràgraf fa servir el selector de tipus.</p>
<p class="destacat">Aquest, la classe: guanya sobre el tipus.</p>
<p class="destacat" id="unic" style="color: #6b4e00;">
  Aquest té identificador i estil en línia: guanya l'estil en línia.
</p>`,
        },
        {
          title: "Variables CSS",
          body: `
            <p>Les variables (<em>custom properties</em>) permeten definir un valor una vegada i reutilitzar-lo. Es declaren amb dos guions i normalment s'agrupen a <code>:root</code>.</p>
            <p>Canviar un color de tot el lloc passa a ser una línia. També es poden canviar des de JavaScript o en funció del tema clar o fosc.</p>
          `,
          code: `<style>
  :root {
    --taronja: #b85c3a;
    --verd: #1f7a5c;
    --paper: #faf7f1;
    --text: #23302b;
    --radi: 12px;
  }
  body { background: var(--paper); color: var(--text); font-family: system-ui; padding: 24px; }
  .targeta {
    border: 1px solid #e2dbcd;
    border-radius: var(--radi);
    padding: 16px;
    border-top: 4px solid var(--taronja);
  }
  .targeta h2 { color: var(--verd); margin: 0 0 8px; }
</style>

<div class="targeta">
  <h2>Variables CSS</h2>
  <p>Un sol lloc per canviar tots els colors.</p>
</div>`,
        },
      ],
      exercise: {
        brief:
          "Crea un fitxer amb tres targetes que comparteixin classe i variables CSS per als colors. Després canvia només el valor de la variable i comprova que totes tres canvien alhora.",
        hint: "Declara les variables a <code>:root</code> perquè tots els elements hi tinguin accés.",
      },
    },
    {
      slug: "element-script",
      title: "L'element script: integració de JavaScript",
      summary:
        "Com afegir comportament a la pàgina: script en línia, fitxers externs, ordre d'execució i comunicació amb l'HTML.",
      goals: [
        "Afegir JavaScript en línia i extern.",
        "Entendre <code>defer</code> i per què importa la posició.",
        "Llegir i modificar l'HTML des de JavaScript.",
      ],
      sections: [
        {
          title: "Dues maneres d'incloure codi",
          body: `
            <p>El JavaScript s'inclou amb <code>&lt;script&gt;</code>. Pot anar escrit dins del document o en un fitxer extern amb l'atribut <code>src</code>.</p>
            <p>El codi en línia és còmode per a proves; el fitxer extern és el que has de fer servir en projectes reals, perquè es pot cachejar i reutilitzar.</p>
            <p>Un <code>&lt;script&gt;</code> sense <code>src</code> ha de tenir contingut. Un amb <code>src</code> ha d'estar buit.</p>
          `,
          code: `<script>
  console.log("Hola des d'un script en línia");
</script>

<script src="app.js"></script>`,
        },
        {
          title: "On col·locar-lo: defer i async",
          body: `
            <p>Quan el navegador troba un <code>&lt;script&gt;</code> al <code>head</code>, atura la lectura de la pàgina fins que l'executa. Si el codi busca elements que encara no existeixen, falla.</p>
            <p>Tres solucions, de pitjor a millor:</p>
            <ul>
              <li>Posar l'script al final del <code>body</code>.</li>
              <li><code>defer</code> ➜ descarrega en paral·lel i executa quan l'HTML ja està llest, mantenint l'ordre.</li>
              <li><code>async</code> ➜ descarrega en paral·lel i executa tan bon punt arriba (sense ordre garantit).</li>
            </ul>
            <p>Per a codi que toca la pàgina, <code>defer</code> és gairebé sempre la resposta.</p>
          `,
          code: `<head>
  <script src="app.js" defer></script>
</head>
<body>
  <h1 id="titol">Pàgina</h1>
  <button id="boto">Canvia el títol</button>
</body>`,
        },
        {
          title: "Parlar amb l'HTML",
          body: `
            <p>JavaScript pot llegir i canviar el document a través del DOM (l'arbre d'elements). Les operacions bàsiques són seleccionar, llegir i escriure.</p>
            <ul>
              <li><code>document.querySelector(".classe")</code> ➜ selecciona el primer element.</li>
              <li><code>element.textContent</code> ➜ llegeix o canvia el text.</li>
              <li><code>element.classList.toggle("actiu")</code> ➜ afegeix o treu una classe.</li>
              <li><code>element.addEventListener("click", funcio)</code> ➜ reacciona a un esdeveniment.</li>
            </ul>
          `,
          code: `<h1 id="titol">Text original</h1>
<button id="boto">Canvia'm</button>
<p id="comptador">Clics: 0</p>

<script>
  const titol = document.querySelector("#titol");
  const boto = document.querySelector("#boto");
  const comptador = document.querySelector("#comptador");
  let clics = 0;

  boto.addEventListener("click", () => {
    clics++;
    titol.textContent = "Has fet " + clics + " clics";
    comptador.textContent = "Clics: " + clics;
  });
</script>`,
        },
      ],
      exercise: {
        brief:
          "Crea un botó que canviï el color de fons d'un títol i actualitzi un comptador de clics. Prova-ho primer amb l'script al final del <code>body</code> i després amb <code>defer</code> al <code>head</code>.",
        hint: "Si el botó no fa res, comprova que el <code>id</code> del JavaScript coincideixi amb el de l'HTML.",
      },
    },
  ],
};