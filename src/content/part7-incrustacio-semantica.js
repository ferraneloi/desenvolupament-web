export default {
  title: "Incrustació, semàntica i resum",
  description:
    "Marquee, iframes, incrustació avançada, els elements semàntics d'HTML5 i una referència ràpida de tot el llenguatge.",
  chapters: [
    {
      slug: "marquee-iframe",
      title: "Marquee i iframe: conceptes bàsics",
      summary:
        "Dos elements amb mala fama i molt ús real. Cal saber què són, per què <code>marquee</code> està desaconsellat i com s'incrusta una pàgina externa amb seguretat.",
      goals: [
        "Saber què és <code>marquee</code> i per què no s'ha de fer servir.",
        "Incrustar una pàgina amb <code>iframe</code>.",
        "Conèixer <code>sandbox</code>, <code>loading</code> i <code>title</code>.",
      ],
      sections: [
        {
          title: "L'element marquee",
          body: `
            <p><code>&lt;marquee&gt;</code> fa desplaçar un text o una imatge. Va néixer als anys noranta, mai no ha format part de l'estàndard i avui és <strong>obsolet</strong>.</p>
            <p>Els navegadors encara el mostren per no trencar pàgines antigues, però no s'ha de fer servir: és inaccessible, distreu i no respecta les preferències de moviment de les persones usuàries.</p>
            <p>Si necessites un desplaçament, fes-lo amb CSS: <code>transform</code> i <code>@keyframes</code>.</p>
          `,
          code: `<marquee behavior="alternate" scrollamount="6">
  Aquesta etiqueta està obsoleta: no la facis servir.
</marquee>

<p style="font-size:13px;color:#6b6259;">
  Equivalent modern: animació CSS amb <code>@keyframes</code>.
</p>`,
        },
        {
          title: "Incrustar una pàgina: iframe",
          body: `
            <p><code>&lt;iframe&gt;</code> incrusta un document dins del teu. És el que fan servir els vídeos de YouTube, els mapes i els reproductors externs.</p>
            <p>Tres atributs imprescindibles:</p>
            <ul>
              <li><code>src</code> ➜ la pàgina a incrustar.</li>
              <li><code>title</code> ➜ descripció per a lectors de pantalla (obligatori per a accessibilitat).</li>
              <li><code>loading="lazy"</code> ➜ carrega només quan es veu.</li>
            </ul>
            <p>Les mides es controlen amb <code>width</code>, <code>height</code> o CSS. Sempre cal donar una alçada concreta.</p>
          `,
          code: `<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=2.10%2C41.36%2C2.24%2C41.42&amp;layer=mapnik"
  title="Mapa de Barcelona"
  width="100%" height="320"
  style="border: 1px solid #e2dbcd; border-radius: 12px;"
  loading="lazy">
</iframe>`,
        },
        {
          title: "Seguretat: l'atribut sandbox",
          body: `
            <p>Un <code>iframe</code> és un document aliè dins de la teva pàgina. Amb <code>sandbox</code> li treus permisos: no pot executar scripts, no pot obrir finestres ni enviar formularis.</p>
            <p>Els permisos es tornen a donar d'un en un: <code>sandbox="allow-scripts"</code>, <code>allow-forms</code>, <code>allow-same-origin</code>.</p>
            <p>Mai incrustis contingut de tercers sense <code>sandbox</code> si no hi confies plenament.</p>
          `,
          code: `<iframe
  src="https://example.com"
  title="Contingut extern en mode restringit"
  sandbox="allow-scripts"
  width="100%" height="240"
  referrerpolicy="no-referrer">
  <p>El teu navegador no suporta iframes.</p>
</iframe>`,
        },
      ],
      exercise: {
        brief:
          "Incrusta un mapa amb <code>iframe</code>, amb títol, càrrega diferida i vores arrodonides. Afegeix-hi després un segon iframe en mode <code>sandbox</code> i explica la diferència.",
        hint: "Si l'iframe no es veu, revisa que tingui una alçada definida.",
      },
    },
    {
      slug: "incrustacio-avancada",
      title: "Incrustació avançada: embed, object i iframe",
      summary:
        "Els tres elements per incrustar contingut extern, quina diferència hi ha i quin toca fer servir avui.",
      goals: [
        "Diferència <code>iframe</code>, <code>embed</code> i <code>object</code>.",
        "Incrustar PDF i SVG de manera accessible.",
        "Triar sempre l'opció més segura.",
      ],
      sections: [
        {
          title: "Tres maneres d'incrustar",
          body: `
            <ul>
              <li><code>&lt;iframe&gt;</code> ➜ incrusta un document HTML complet. És l'opció habitual avui.</li>
              <li><code>&lt;embed&gt;</code> ➜ incrusta un recurs extern (PDF, SVG, un reproductor); etiqueta buida, sense contingut alternatiu.</li>
              <li><code>&lt;object&gt;</code> ➜ com <code>embed</code>, però amb contingut alternatiu a dins i atribut <code>type</code>.</li>
            </ul>
            <p>Per a HTML, vídeo, mapes i reproductors, fes servir <code>iframe</code>. Per a un PDF, <code>object</code> o un enllaç de descàrrega. <code>embed</code> queda per a casos molt concrets.</p>
          `,
          code: `<!-- Document extern -->
<iframe src="https://example.com" title="Pàgina externa" width="100%" height="240"></iframe>

<!-- Recurs incrustat -->
<embed src="document.pdf" type="application/pdf" width="100%" height="400">

<!-- Amb contingut alternatiu -->
<object data="document.pdf" type="application/pdf" width="100%" height="400">
  <p>El teu navegador no pot mostrar el PDF.
     <a href="document.pdf">Descarrega'l aquí</a>.</p>
</object>`,
        },
        {
          title: "PDF i SVG de manera accessible",
          body: `
            <p>Incrustar un PDF dins la pàgina és còmode però fràgil: no tots els navegadors mòbils el mostren igual. L'alternativa més robusta és un enllaç de descàrrega clar, opcionalment acompanyat d'una previsualització.</p>
            <p>Per als SVG, la millor opció és incrustar-los en línia amb <code>&lt;svg&gt;</code>: heretes els colors del CSS, es poden fer servir amb lectors de pantalla i no cal cap crida extra.</p>
          `,
          code: `<figure>
  <object data="guia.pdf" type="application/pdf" width="100%" height="420">
    <p>La previsualització no està disponible.
      <a href="guia.pdf" download>Descarrega la guia en PDF</a>.</p>
  </object>
  <figcaption>Guia del curs en PDF.</figcaption>
</figure>

<svg viewBox="0 0 24 24" width="64" height="64" fill="none"
     stroke="#1f7a5c" stroke-width="1.8" role="img"
     aria-label="Icona de descàrrega">
  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/>
</svg>`,
        },
        {
          title: "Rendiment i responsabilitat",
          body: `
            <p>Cada incrustació és una pàgina sencera que has de carregar: pes, peticions i riscos. Per això:</p>
            <ul>
              <li>Fes servir <code>loading="lazy"</code> sempre que puguis.</li>
              <li>Reserva l'espai amb amplada i alçada per evitar salts.</li>
              <li>Posa <code>title</code> a cada iframe.</li>
              <li>No incrustis contingut que no controlis sense <code>sandbox</code>.</li>
            </ul>
            <p>Un vídeo de fons que no es veu fins al final de la pàgina és pes mort: carrega'l només quan calgui.</p>
          `,
          code: `<div style="position: relative; padding-top: 56.25%; border-radius: 12px; overflow: hidden;">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="Vídeo de presentació del curs"
    loading="lazy"
    allow="accelerometer; encrypted-media; picture-in-picture"
    allowfullscreen
    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;">
  </iframe>
</div>`,
        },
      ],
      exercise: {
        brief:
          "Crea una pàgina amb: un iframe de mapa, un PDF incrustat amb alternativa de descàrrega i un SVG en línia. Tots tres han de tenir text alternatiu o títol.",
        hint: "Prova la pàgina en una finestra estreta: el vídeo ha de mantenir la proporció gràcies al <code>padding-top</code>.",
      },
    },
    {
      slug: "elements-semantics",
      title: "Elements semàntics d'HTML5",
      summary:
        "L'HTML5 va introduir etiquetes que descriuen l'estructura d'una pàgina. Fan el codi comprensible per a persones, lectors de pantalla i cercadors.",
      goals: [
        "Conèixer l'esquelet semàntic d'una pàgina.",
        "Entendre quan usar <code>header</code>, <code>nav</code>, <code>main</code> i <code>footer</code>.",
        "Comprovar l'accessibilitat d'una pàgina.",
      ],
      sections: [
        {
          title: "L'esquelet semàntic",
          body: `
            <p>Abans d'HTML5 tota la pàgina es feia amb <code>div</code> i <code>id</code>: <code>div#header</code>, <code>div#nav</code>. El resultat era un codi que només entenia qui l'havia escrit.</p>
            <p>HTML5 introdueix etiquetes amb significat propi:</p>
            <ul>
              <li><code>&lt;header&gt;</code> ➜ capçalera d'una pàgina o d'una secció.</li>
              <li><code>&lt;nav&gt;</code> ➜ conjunt d'enllaços de navegació.</li>
              <li><code>&lt;main&gt;</code> ➜ contingut principal, únic per pàgina.</li>
              <li><code>&lt;section&gt;</code> ➜ secció temàtica amb títol.</li>
              <li><code>&lt;article&gt;</code> ➜ peça de contingut independent.</li>
              <li><code>&lt;aside&gt;</code> ➜ contingut secundari o relacionat.</li>
              <li><code>&lt;footer&gt;</code> ➜ peu d'una pàgina o secció.</li>
            </ul>
          `,
          code: `<body>
  <header>
    <h1>Escola La Sínia</h1>
    <nav>
      <ul>
        <li><a href="#cursos">Cursos</a></li>
        <li><a href="#contacte">Contacte</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="cursos">
      <h2>Cursos</h2>
      <article>
        <h3>Iniciació a l'HTML</h3>
        <p>Vint-i-vuit capítols per començar de zero.</p>
      </article>
    </section>
  </main>

  <aside>
    <h2>Horari d'atenció</h2>
    <p>De dilluns a divendres, de 9 a 14 h.</p>
  </aside>

  <footer>
    <p>© 2026 Escola La Sínia</p>
  </footer>
</body>`,
        },
        {
          title: "Un esquema de títols coherent",
          body: `
            <p>La semàntica no és només el nom de les etiquetes: és també l'ordre dels títols. Una pàgina accessible té un sol <code>h1</code> i una jerarquia sense salts.</p>
            <p>Els <code>header</code>, <code>footer</code> i <code>nav</code> poden haver-hi diverses vegades: un <code>header</code> per a la pàgina i un per a cada <code>article</code>, per exemple.</p>
            <p>En canvi, <code>main</code> només n'hi pot haver un.</p>
          `,
          code: `<article>
  <header>
    <h2>Com validar el teu HTML</h2>
    <p><time datetime="2026-11-11">11 de novembre de 2026</time></p>
  </header>

  <p>Obre el validador del W3C i enganxa-hi l'adreça de la pàgina.</p>

  <section aria-labelledby="errors">
    <h3 id="errors">Errors habituals</h3>
    <p>Etiquetes sense tancar i <code>id</code> duplicats.</p>
  </section>

  <footer>
    <p>Autor: alumnat de 4t d'ESO</p>
  </footer>
</article>`,
        },
        {
          title: "ARIA: quan l'HTML no arriba",
          body: `
            <p>Els atributs <strong>ARIA</strong> (<code>role</code>, <code>aria-label</code>, <code>aria-labelledby</code>, <code>aria-hidden</code>) afegeixen informació per a tecnologies d'assistència.</p>
            <p>Primera regla d'ARIA: <strong>no facis servir ARIA si hi ha una etiqueta HTML que ja ho fa</strong>. Un <code>&lt;button&gt;</code> ja és un botó; no cal <code>role="button"</code> en un <code>div</code>.</p>
            <p>Ús legítim: posar nom a una icona (<code>aria-label</code>), relacionar una secció amb el seu títol (<code>aria-labelledby</code>) o amagar decoracions (<code>aria-hidden="true"</code>).</p>
          `,
          code: `<button aria-label="Tanca la finestra">
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="2"/>
  </svg>
</button>

<div aria-hidden="true" style="font-size: 40px;">★★★★★</div>
<p>Valoració: <strong>5 de 5</strong> estrelles</p>`,
        },
      ],
      exercise: {
        brief:
          "Construeix una pàgina completa amb capçalera, navegació, contingut principal amb dues seccions i dos articles, una barra lateral i un peu. Comprova l'esquema de títols.",
        hint: "Navega la pàgina amb la tecla <code>Tab</code> i comprova que tots els enllaços es poden fer servir amb el teclat.",
      },
    },
    {
      slug: "resum-referencia",
      title: "Resum complet d'HTML i referència ràpida",
      summary:
        "Tot el que has après en una sola pàgina: estructura, etiquetes essencials, atributs i les deu regles d'or.",
      goals: [
        "Repassar l'esquelet i les etiquetes imprescindibles.",
        "Tenir una taula de referència per consultar.",
        "Saber què estudiar després de l'HTML.",
      ],
      sections: [
        {
          title: "L'esquelet de memòria",
          body: `
            <p>Si recordes només una cosa d'aquest tutorial, que sigui aquesta: tot document HTML té doctype, arrel amb idioma, capçalera amb metadades i cos amb contingut.</p>
            <p>La resta és afegir-hi elements amb significat.</p>
          `,
          code: `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Títol de la pàgina</title>
    <meta name="description" content="Descripció de la pàgina.">
  </head>
  <body>
    <header>
      <h1>Títol principal</h1>
      <nav><a href="#seccio">Secció</a></nav>
    </header>
    <main>
      <section id="seccio">
        <h2>Secció</h2>
        <p>Contingut.</p>
      </section>
    </main>
    <footer><p>© 2026</p></footer>
  </body>
</html>`,
        },
        {
          title: "Les deu regles d'or",
          body: `
            <ol>
              <li>Un sol <code>h1</code> per pàgina i cap salt de nivell.</li>
              <li>Etiquetes amb significat abans que <code>div</code>.</li>
              <li>Sempre <code>alt</code> a les imatges i <code>label</code> als camps.</li>
              <li><code>id</code> únics; <code>class</code> per als estils.</li>
              <li>CSS en un fitxer: evita <code>style</code> en línia.</li>
              <li><code>defer</code> per als scripts que toquen la pàgina.</li>
              <li>Valida el document abans de publicar.</li>
              <li>Comprova-ho amb el teclat i amb el mòbil.</li>
              <li>No facis servir taules ni <code>marquee</code> per maquetar.</li>
              <li>Escriu codi que s'entengui d'aquí a sis mesos.</li>
            </ol>
          `,
          table: {
            head: ["Necessito...", "Element"],
            rows: [
              ["Un títol", "<code>h1</code>–<code>h6</code>"],
              ["Un paràgraf", "<code>p</code>"],
              ["Una llista", "<code>ul</code> / <code>ol</code> / <code>dl</code>"],
              ["Una taula de dades", "<code>table</code>, <code>thead</code>, <code>tbody</code>, <code>th</code>, <code>td</code>"],
              ["Una imatge", "<code>img</code> amb <code>alt</code>"],
              ["Un enllaç", "<code>a href</code>"],
              ["Una secció amb títol", "<code>section</code>"],
              ["Un contingut independent", "<code>article</code>"],
              ["Una capçalera o un peu", "<code>header</code> / <code>footer</code>"],
              ["Navegació", "<code>nav</code>"],
              ["Un formulari", "<code>form</code>, <code>label</code>, <code>input</code>, <code>button</code>"],
              ["Un desplegable", "<code>details</code> / <code>summary</code>"],
              ["Una finestra modal", "<code>dialog</code>"],
              ["Un vídeo o àudio", "<code>video</code> / <code>audio</code>"],
              ["Incrustar una pàgina", "<code>iframe</code> amb <code>title</code>"],
              ["Una caixa sense significat", "<code>div</code>"],
              ["Un tros de text dins d'un paràgraf", "<code>span</code>"],
            ],
          },
        },
        {
          title: "I ara què?",
          body: `
            <p>Ja saps escriure HTML correcte i semàntic. El següent pas natural és el <strong>CSS</strong>: selectors, caixes, flexbox, grid, disseny responsiu i variables.</p>
            <p>Després, el <strong>JavaScript</strong> i el DOM per fer pàgines interactives, i finalment les eines de publicació (Git, allotjament, dominis).</p>
            <p>Mentrestant, escriu molt. La diferència entre saber HTML i saber fer pàgines és la pràctica: comença per una pàgina personal i fes-la créixer.</p>
            <p>Tens una zona de proves en aquest mateix lloc: obre-la, experimenta i trenca coses. És la manera més ràpida d'aprendre.</p>
          `,
        },
      ],
      exercise: {
        brief:
          "Construeix una pàgina personal completa que faci servir, com a mínim, quinze etiquetes diferents d'aquest tutorial. Valida-la i comprova-la amb el teclat.",
        hint: "Guarda-la com a <code>index.html</code>: pot ser el començament del teu primer lloc web.",
      },
    },
  ],
};