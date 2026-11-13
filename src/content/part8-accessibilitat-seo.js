export default {
  title: "Accessibilitat, SEO i rendiment",
  description:
    "Accessibilitat pràctica amb ARIA, SEO tècnic i Open Graph, formularis avançats, imatges responsives, Web Components i rendiment de càrrega.",
  chapters: [
    {
      slug: "accessibilitat-practica",
      title: "Accessibilitat pràctica i estructura semàntica avançada",
      summary:
        "ARIA, rols, regions de referència i navegació per teclat per fer pàgines usables per tothom.",
      goals: [
        "Fer servir atributs ARIA (<code>aria-label</code>, <code>aria-describedby</code>, <code>aria-hidden</code>).",
        "Identificar les landmark regions i els seus rols.",
        "Implementar navegació per teclat i gestió del focus.",
        "Afegir un skip link per saltar al contingut principal.",
      ],
      sections: [
        {
          title: "Per què accessibilitat?",
          body: `
            <p>L'accessibilitat web garanteix que persones amb discapacitats visuals, motores o cognitives puguin usar la pàgina. Les tecnologies d'assistència (lectors de pantalla com NVDA o VoiceOver) llegeixen l'estructura HTML i els atributs ARIA per narrar la interfície.</p>
            <p>L'accessibilitat no és opcional: és un requisit legal en molts contextos i millora l'experiència de <em>tots</em> els usuaris.</p>
          `,
          table: {
            head: ["Atribut ARIA", "Funció"],
            rows: [
              ["aria-label", "Etiqueta llegible per als lectors de pantalla"],
              ["aria-labelledby", "Apunta a un element que fa d'etiqueta (per id)"],
              ["aria-describedby", "Apunta a un element amb descripció addicional"],
              ["aria-hidden=\"true\"", "Amaga l'element als lectors de pantalla"],
              ["aria-expanded", "Indica si un element (menú, acordió) és obert"],
              ["aria-live", "Anuncia canvis dinàmics al contingut"],
            ],
          },
        },
        {
          title: "Landmark regions i rols semàntics",
          body: `
            <p>HTML5 té elements de referència (landmarks) que els lectors de pantalla usen per navegar ràpidament: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>.</p>
            <p>Si no pots usar elements semàntics, afegeix <code>role</code> per indicar la funció. Però sempre prefereix l'element natiu: <code>&lt;button&gt;</code> és sempre millor que <code>&lt;div role="button"&gt;</code>.</p>
          `,
          lang: "html",
          code: `<!DOCTYPE html>
<html lang="ca">
<head><title>Pàgina accessible</title></head>
<body>

  <a href="#contingut-principal" class="skip-link">
    Saltar al contingut
  </a>

  <header>
    <nav aria-label="Navegació principal">
      <ul>
        <li><a href="/">Inici</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contacte">Contacte</a></li>
      </ul>
    </nav>
  </header>

  <main id="contingut-principal">
    <h1>Benvinguts</h1>

    <!-- Botó accessible amb estat -->
    <button
      aria-expanded="false"
      aria-controls="menu-opcions"
      id="btn-menu"
    >
      Opcions
    </button>
    <ul id="menu-opcions" hidden>
      <li>Opció A</li>
      <li>Opció B</li>
    </ul>

    <!-- Icona decorativa oculta als lectors -->
    <span aria-hidden="true">★</span>
    <span>5 estrelles</span>

    <!-- Imatge amb text alternatiu descriptiu -->
    <img src="grafic.png" alt="Gràfic de vendes de gener a març, amb tendència creixent">

    <!-- Imatge decorativa sense text alternatiu -->
    <img src="separador.png" alt="">
  </main>

  <aside aria-label="Articles relacionats">
    <h2>Llegeix també</h2>
  </aside>

  <footer>
    <p>&copy; 2024 Empresa</p>
  </footer>

</body>
</html>`,
          codeTitle: "estructura-accessible.html",
        },
        {
          title: "Gestió del focus i navegació per teclat",
          body: `
            <p>Els usuaris que no usen ratolí han de poder navegar per teclat. Assegura't que:</p>
            <ul>
              <li>Tots els controls interactius reben focus amb <kbd>Tab</kbd>.</li>
              <li>L'ordre de focus segueix l'ordre visual.</li>
              <li>El focus visible és clar (no eliminis <code>outline</code> sense alternativa).</li>
              <li>Els diàlegs modals capturen el focus dins seu.</li>
            </ul>
            <p><code>tabindex="0"</code> afegeix un element a l'ordre natural. <code>tabindex="-1"</code> permet el focus per JavaScript però no per teclat.</p>
          `,
          lang: "html",
          code: `<!-- Skip link: permet saltar la navegació -->
<style>
  .skip-link {
    position: absolute;
    top: -100%;
    left: 0;
    padding: 0.5rem 1rem;
    background: #0070f3;
    color: white;
    z-index: 1000;
  }
  .skip-link:focus {
    top: 0;        /* Apareix quan rep focus per teclat */
  }
</style>
<a href="#contingut-principal" class="skip-link">
  Saltar al contingut principal
</a>

<!-- Dialog modal amb focus trap -->
<dialog id="modal" aria-labelledby="modal-titol">
  <h2 id="modal-titol">Confirmació</h2>
  <p>Estàs segur que vols eliminar l'element?</p>
  <button autofocus>Cancel·lar</button>
  <button>Eliminar</button>
</dialog>

<script>
  const modal = document.getElementById('modal');
  // <dialog> gestiona el focus trap automàticament
  modal.showModal();
</script>`,
          codeTitle: "focus-teclat.html",
        },
        {
          title: "Regions live i anuncis dinàmics",
          body: `
            <p>Quan el contingut canvia dinàmicament (resultats de cerca, alertes, missatges d'error), els lectors de pantalla no ho veuen tret que ho anunciïs amb <code>aria-live</code>.</p>
            <ul>
              <li><code>aria-live="polite"</code>: anuncia quan l'usuari deixa d'escriure.</li>
              <li><code>aria-live="assertive"</code>: interromp i anuncia immediatament (errors crítics).</li>
              <li><code>role="status"</code>: equivalent a <code>aria-live="polite"</code>.</li>
              <li><code>role="alert"</code>: equivalent a <code>aria-live="assertive"</code>.</li>
            </ul>
          `,
          lang: "html",
          code: `<!-- Zona d'estat (cerca en temps real) -->
<input type="search" id="cerca" aria-label="Cercar productes">

<div role="status" id="resultats-resum" aria-live="polite">
  <!-- S'actualitza dinàmicament -->
</div>

<div id="llista-resultats"></div>

<!-- Zona d'error (crítica) -->
<div role="alert" id="error-zona" aria-live="assertive">
  <!-- Errors greus que cal anunciar de seguida -->
</div>

<script>
  const cerca = document.getElementById('cerca');
  const resum = document.getElementById('resultats-resum');

  cerca.addEventListener('input', () => {
    const terme = cerca.value;
    // Simula cerca...
    const n = terme.length * 3; // resultats ficticis
    // El lector de pantalla llegirà aquest canvi
    resum.textContent = n + " resultats per a: " + terme;
  });
</script>`,
          codeTitle: "aria-live.html",
        },
      ],
      exercise: {
        brief: `<p>Partint d'aquest HTML poc accessible, millora'l:</p>
<pre><code>&lt;div onclick="obrirMenu()"&gt;☰ Menú&lt;/div&gt;
&lt;div id="nav"&gt;
  &lt;div onclick="anar('/')"&gt;Inici&lt;/div&gt;
  &lt;div onclick="anar('/blog')"&gt;Blog&lt;/div&gt;
&lt;/div&gt;
&lt;div&gt;
  &lt;img src="logo.png"&gt;
  &lt;div&gt;Benvinguts a la nostra web&lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>Has de: convertir el botó de menú en <code>&lt;button&gt;</code> amb <code>aria-expanded</code>, la navegació en <code>&lt;nav&gt;</code> amb <code>&lt;a&gt;</code>, afegir text alternatiu a la imatge i un <code>skip link</code>.</p>`,
        hint: `<p>Recorda que <code>&lt;button&gt;</code> ja és accessible per teclat i té <code>role="button"</code> implícit. Afegeix <code>aria-expanded="false"</code> i canvia-ho a <code>true</code> amb JavaScript quan el menú s'obre.</p>`,
        solution: `<pre><code>&lt;a href="#main" class="skip-link"&gt;Saltar al contingut&lt;/a&gt;
&lt;button aria-expanded="false" aria-controls="nav" onclick="toggle()"&gt;☰ Menú&lt;/button&gt;
&lt;nav id="nav" hidden&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="/"&gt;Inici&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/blog"&gt;Blog&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;
&lt;main id="main"&gt;
  &lt;img src="logo.png" alt="Logo de l'empresa"&gt;
  &lt;h1&gt;Benvinguts a la nostra web&lt;/h1&gt;
&lt;/main&gt;</code></pre>`,
      },
    },

    {
      slug: "seo-tecnic",
      title: "SEO tècnic, Open Graph i dades estructurades",
      summary:
        "Meta tags per al posicionament, Open Graph per a xarxes socials i JSON-LD per a resultats enriquits a Google.",
      goals: [
        "Configurar les meta tags essencials per a SEO.",
        "Implementar Open Graph i Twitter Cards.",
        "Afegir dades estructurades amb JSON-LD (Schema.org).",
        "Entendre la URL canònica i els hreflang.",
      ],
      sections: [
        {
          title: "Meta tags essencials per a SEO",
          body: `
            <p>El SEO on-page comença al <code>&lt;head&gt;</code>. Els elements més importants son el <code>&lt;title&gt;</code> i la meta <code>description</code>: apareixen directament als resultats de cerca.</p>
            <ul>
              <li><strong>Title:</strong> 50-60 caràcters. Ha de ser únic per pàgina i descriptiu.</li>
              <li><strong>Description:</strong> 150-160 caràcters. No afecta directament el ranking però sí el CTR.</li>
              <li><strong>Canonical:</strong> evita contingut duplicat indicant la URL preferida.</li>
              <li><strong>Robots:</strong> controla si els robots poden indexar i seguir links.</li>
            </ul>
          `,
          lang: "html",
          code: `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- SEO bàsic -->
  <title>Aprèn HTML des de zero | Aula HTML</title>
  <meta name="description"
    content="Tutorial d'HTML complet en català: des dels fonaments fins a HTML5 avançat. Aprèn a crear pàgines web professionals.">

  <!-- Canònica: evita duplicats -->
  <link rel="canonical" href="https://desenvolupament-web.vercel.app/html">

  <!-- Robots -->
  <meta name="robots" content="index, follow">

  <!-- Per a pàgines multiidioma -->
  <link rel="alternate" hreflang="ca" href="https://desenvolupament-web.vercel.app/html">
  <link rel="alternate" hreflang="es" href="https://desenvolupament-web.vercel.app/es/html">
  <link rel="alternate" hreflang="x-default" href="https://desenvolupament-web.vercel.app/html">

</head>
<body>
  <h1>Tutorial d'HTML</h1>
</body>
</html>`,
          codeTitle: "seo-basic.html",
        },
        {
          title: "Open Graph i Twitter Cards",
          body: `
            <p>Quan algú comparteix la teva URL a xarxes socials (Facebook, LinkedIn, WhatsApp, Twitter/X), la plataforma llegeix les meta tags Open Graph per mostrar una previsualització rica: títol, descripció i imatge.</p>
            <p>L'OG:image ha de ser d'almenys 1200×630 píxels per a la millor qualitat.</p>
          `,
          lang: "html",
          code: `<head>
  <!-- Open Graph (Facebook, LinkedIn, WhatsApp, etc.) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://desenvolupament-web.vercel.app/html">
  <meta property="og:title" content="Aprèn HTML des de zero | Aula HTML">
  <meta property="og:description"
    content="Tutorial d'HTML complet en català amb exemples interactius i exercicis pràctics.">
  <meta property="og:image" content="https://desenvolupament-web.vercel.app/og-html.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="ca_ES">
  <meta property="og:site_name" content="Aula HTML">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@aulahtml">
  <meta name="twitter:title" content="Aprèn HTML des de zero | Aula HTML">
  <meta name="twitter:description"
    content="Tutorial d'HTML complet en català amb exemples interactius.">
  <meta name="twitter:image" content="https://desenvolupament-web.vercel.app/og-html.png">
</head>`,
          codeTitle: "open-graph.html",
          note: `<strong>Eina útil:</strong> Pots validar les teves meta tags OG a <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook Sharing Debugger</a> i les Twitter Cards a <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener">Twitter Card Validator</a>.`,
        },
        {
          title: "Dades estructurades amb JSON-LD",
          body: `
            <p>Schema.org és un vocabulari estàndard per descriure contingut estructurat que Google entén. S'afegeix com a bloc <code>&lt;script type="application/ld+json"&gt;</code> al <code>&lt;head&gt;</code> o <code>&lt;body&gt;</code>.</p>
            <p>Permet obtenir <strong>resultats enriquits</strong> a Google: estrelles de valoració, preus de productes, migas de pa, receptes, FAQs, etc.</p>
          `,
          lang: "html",
          code: `<head>
  <!-- Article de blog -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Aprèn HTML des de zero",
    "description": "Tutorial complet d'HTML en català",
    "author": {
      "@type": "Person",
      "name": "Ferran García"
    },
    "datePublished": "2024-01-15",
    "dateModified": "2024-03-20",
    "publisher": {
      "@type": "Organization",
      "name": "Aula HTML",
      "logo": {
        "@type": "ImageObject",
        "url": "https://desenvolupament-web.vercel.app/logo.png"
      }
    }
  }
  </script>

  <!-- Miga de pa (Breadcrumb) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inici",
        "item": "https://desenvolupament-web.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tutorial HTML",
        "item": "https://desenvolupament-web.vercel.app/html"
      }
    ]
  }
  </script>

  <!-- FAQ (apareix com accordion a Google) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quant temps es tarda a aprendre HTML?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Amb pràctica diària, pots aprendre els fonaments en 2-4 setmanes."
        }
      }
    ]
  }
  </script>
</head>`,
          codeTitle: "json-ld.html",
        },
        {
          title: "Sitemap XML i robots.txt",
          body: `
            <p>El <strong>sitemap.xml</strong> és un índex de totes les URLs del teu lloc que ajuda els robots a descobrir-les. El <strong>robots.txt</strong> indica als robots quines parts no han de rastrejar.</p>
          `,
          lang: "html",
          code: `<!-- robots.txt (a l'arrel del domini) -->
<!--
User-agent: *
Allow: /

User-agent: Googlebot
Disallow: /admin/
Disallow: /privat/

Sitemap: https://desenvolupament-web.vercel.app/sitemap.xml
-->

<!-- sitemap.xml bàsic -->
<!--
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://desenvolupament-web.vercel.app/</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://desenvolupament-web.vercel.app/html</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
-->`,
          codeTitle: "robots-sitemap.html",
          note: `<strong>Eina:</strong> Comprova el SEO amb <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">Google Rich Results Test</a> i la cobertura d'indexació a <a href="https://search.google.com/search-console" target="_blank" rel="noopener">Google Search Console</a>.`,
        },
      ],
      exercise: {
        brief: `<p>Crea el <code>&lt;head&gt;</code> complet per a una pàgina de producte d'una botiga online que ven "Càmera fotogràfica Mirrorless 24MP" a 599€. Ha d'incloure:</p>
<ul>
  <li>Title i meta description optimitzats</li>
  <li>URL canònica</li>
  <li>Open Graph amb imatge, preu i disponibilitat</li>
  <li>JSON-LD de tipus <code>Product</code> amb nom, preu, moneda i valoració</li>
</ul>`,
        hint: `<p>Per a OG de producte usa <code>og:type="product"</code> i afegeix <code>product:price:amount</code> i <code>product:price:currency</code>. Per al JSON-LD de Product, el preu va dins d'<code>offers</code> amb <code>@type: "Offer"</code>.</p>`,
        solution: `<pre><code>&lt;head&gt;
  &lt;title&gt;Càmera Mirrorless 24MP - 599€ | La Botiga&lt;/title&gt;
  &lt;meta name="description" content="Càmera mirrorless 24MP amb estabilització òptica. Perfecta per a fotografia professional. Enviament gratuït."&gt;
  &lt;link rel="canonical" href="https://labotiga.cat/productes/camera-mirrorless-24mp"&gt;
  &lt;meta property="og:type" content="product"&gt;
  &lt;meta property="og:title" content="Càmera Mirrorless 24MP"&gt;
  &lt;meta property="og:image" content="https://labotiga.cat/img/camera.jpg"&gt;
  &lt;meta property="product:price:amount" content="599"&gt;
  &lt;meta property="product:price:currency" content="EUR"&gt;
  &lt;script type="application/ld+json"&gt;
  {"@context":"https://schema.org","@type":"Product","name":"Càmera Mirrorless 24MP","offers":{"@type":"Offer","price":"599","priceCurrency":"EUR","availability":"https://schema.org/InStock"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"124"}}
  &lt;/script&gt;
&lt;/head&gt;</code></pre>`,
      },
    },

    {
      slug: "formularis-avancats",
      title: "Formularis avançats i validació nativa",
      summary:
        "Constraint Validation API, camps especials (datalist, output, meter) i validació en temps real sense JavaScript extern.",
      goals: [
        "Fer servir la Constraint Validation API (<code>setCustomValidity</code>, <code>reportValidity</code>).",
        "Implementar <code>fieldset</code>, <code>legend</code>, <code>datalist</code> i <code>output</code>.",
        "Crear validació en temps real accessible.",
        "Entendre quan fer servir <code>novalidate</code>.",
      ],
      sections: [
        {
          title: "Validació nativa del navegador",
          body: `
            <p>HTML5 inclou validació integrada sense JavaScript: atributs com <code>required</code>, <code>type="email"</code>, <code>pattern</code>, <code>min</code>, <code>max</code>, <code>minlength</code> i <code>maxlength</code> fan que el navegador mostri errors abans d'enviar el formulari.</p>
            <p>Avantatges: és accessible, multiidioma i no depèn de JavaScript. Desavantatge: l'estil dels missatges varia per navegador.</p>
          `,
          lang: "html",
          code: `<form>
  <!-- required: camp obligatori -->
  <label for="nom">Nom *</label>
  <input type="text" id="nom" name="nom"
    required
    minlength="2"
    maxlength="50"
    autocomplete="given-name">

  <!-- type="email" valida el format automàticament -->
  <label for="email">Correu *</label>
  <input type="email" id="email" name="email"
    required
    autocomplete="email">

  <!-- pattern: expressió regular -->
  <label for="telefon">Telèfon</label>
  <input type="tel" id="telefon" name="telefon"
    pattern="[0-9]{9}"
    title="9 dígits sense espais (p.ex: 612345678)">

  <!-- min/max per a números -->
  <label for="edat">Edat</label>
  <input type="number" id="edat" name="edat"
    min="18" max="120">

  <!-- URL -->
  <label for="web">Web personal</label>
  <input type="url" id="web" name="web"
    placeholder="https://...">

  <button type="submit">Enviar</button>
</form>`,
          codeTitle: "validacio-nativa.html",
        },
        {
          title: "Constraint Validation API",
          body: `
            <p>La <strong>Constraint Validation API</strong> permet personalitzar els missatges d'error i fer validació en temps real:</p>
            <ul>
              <li><code>element.validity</code>: objecte amb propietats com <code>valueMissing</code>, <code>typeMismatch</code>, <code>patternMismatch</code>, <code>tooShort</code>.</li>
              <li><code>element.setCustomValidity("missatge")</code>: defineix un error personalitzat (string buit = vàlid).</li>
              <li><code>element.reportValidity()</code>: mostra els errors programàticament.</li>
              <li><code>element.checkValidity()</code>: retorna <code>true</code>/<code>false</code> sense mostrar res.</li>
            </ul>
          `,
          lang: "html",
          code: `<form id="registre" novalidate>
  <div class="camp">
    <label for="usuari">Nom d'usuari *</label>
    <input type="text" id="usuari" name="usuari"
      required minlength="3" maxlength="20"
      pattern="[a-zA-Z0-9_]+">
    <span class="error" id="error-usuari" aria-live="polite"></span>
  </div>

  <div class="camp">
    <label for="contrasenya">Contrasenya *</label>
    <input type="password" id="contrasenya" name="contrasenya"
      required minlength="8">
    <span class="error" id="error-pass" aria-live="polite"></span>
  </div>

  <div class="camp">
    <label for="confirma">Confirma contrasenya *</label>
    <input type="password" id="confirma" name="confirma" required>
    <span class="error" id="error-confirma" aria-live="polite"></span>
  </div>

  <button type="submit">Registrar-se</button>
</form>

<script>
  const form = document.getElementById('registre');
  const usuari = document.getElementById('usuari');
  const pass = document.getElementById('contrasenya');
  const confirma = document.getElementById('confirma');

  function mostrarError(input, errorId, missatge) {
    input.setCustomValidity(missatge);
    document.getElementById(errorId).textContent = missatge;
  }

  usuari.addEventListener('input', () => {
    const v = usuari.validity;
    if (v.valueMissing) mostrarError(usuari, 'error-usuari', 'El nom d\'usuari és obligatori');
    else if (v.tooShort) mostrarError(usuari, 'error-usuari', 'Mínim 3 caràcters');
    else if (v.patternMismatch) mostrarError(usuari, 'error-usuari', 'Només lletres, números i _');
    else mostrarError(usuari, 'error-usuari', ''); // vàlid
  });

  confirma.addEventListener('input', () => {
    if (confirma.value !== pass.value) {
      mostrarError(confirma, 'error-confirma', 'Les contrasenyes no coincideixen');
    } else {
      mostrarError(confirma, 'error-confirma', '');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      console.log('Formulari vàlid! Enviant...');
    } else {
      form.reportValidity();
    }
  });
</script>`,
          codeTitle: "constraint-validation.html",
        },
        {
          title: "Fieldset, datalist i output",
          body: `
            <p><code>&lt;fieldset&gt;</code> agrupa camps relacionats i <code>&lt;legend&gt;</code> els etiqueta. Essencial per a accessibilitat en grups de ràdio i checkboxes.</p>
            <p><code>&lt;datalist&gt;</code> ofereix suggeriments mentre l'usuari escriu (autocomplete) sense obligar a triar-ne un.</p>
            <p><code>&lt;output&gt;</code> mostra el resultat d'un càlcul o operació de formulari.</p>
          `,
          lang: "html",
          code: `<!-- Fieldset per a ràdio buttons -->
<fieldset>
  <legend>Mètode de pagament</legend>
  <label>
    <input type="radio" name="pagament" value="targeta"> Targeta
  </label>
  <label>
    <input type="radio" name="pagament" value="paypal"> PayPal
  </label>
  <label>
    <input type="radio" name="pagament" value="transferencia"> Transferència
  </label>
</fieldset>

<!-- Datalist: autocomplete amb opcions -->
<label for="pais">País</label>
<input type="text" id="pais" name="pais"
  list="llista-paisos"
  autocomplete="country-name">
<datalist id="llista-paisos">
  <option value="Espanya">
  <option value="França">
  <option value="Alemanya">
  <option value="Itàlia">
  <option value="Portugal">
</datalist>

<!-- Output: resultat dinàmic -->
<form oninput="resultat.value = parseInt(a.value) + parseInt(b.value)">
  <label>Valor A: <input type="range" id="a" name="a" min="0" max="100" value="50"></label>
  +
  <label>Valor B: <input type="number" id="b" name="b" value="10"></label>
  =
  <output name="resultat" for="a b">60</output>
</form>`,
          codeTitle: "fieldset-datalist-output.html",
        },
        {
          title: "Meter, progress i formularis avançats",
          body: `
            <p><code>&lt;meter&gt;</code> representa un valor dins d'un rang conegut (nivell de bateria, puntuació). <code>&lt;progress&gt;</code> mostra el progrés d'una tasca.</p>
          `,
          lang: "html",
          code: `<!-- Meter: valor dins un rang amb zones semàntiques -->
<label>Espai en disc:
  <meter value="7" min="0" max="10" low="3" high="8" optimum="2">
    7 GB de 10 GB
  </meter>
</label>

<!-- Progress: progrés d'una tasca -->
<label>Carregant fitxer:
  <progress id="progress" max="100" value="0"></progress>
</label>
<button onclick="simularCarga()">Iniciar càrrega</button>

<script>
  function simularCarga() {
    const bar = document.getElementById('progress');
    let v = 0;
    const id = setInterval(() => {
      v += 10;
      bar.value = v;
      if (v >= 100) clearInterval(id);
    }, 300);
  }
</script>

<!-- Input amb patrons avançats -->
<form>
  <!-- Data i hora -->
  <input type="datetime-local" name="reserva">

  <!-- Color picker -->
  <input type="color" name="color" value="#0070f3">

  <!-- Cerca (creu per esborrar integrada) -->
  <input type="search" name="q" placeholder="Cercar...">

  <!-- Fitxer: múltiple, filtrat per tipus -->
  <input type="file" name="fotos"
    multiple
    accept="image/png, image/jpeg, image/webp">
</form>`,
          codeTitle: "meter-progress.html",
        },
      ],
      exercise: {
        brief: `<p>Crea un formulari de reserva de restaurant amb validació en temps real que inclogui:</p>
<ul>
  <li>Nom i cognoms (requerits, mínim 2 caràcters cadascun)</li>
  <li>Telèfon de contacte (format: 9 dígits)</li>
  <li>Data de reserva (input type date, no pot ser al passat)</li>
  <li>Nombre de comensals (entre 1 i 20, amb meter que canviï de color)</li>
  <li>Al·lèrgies (datalist amb opcions: Fruits secs, Lactosa, Gluten, Marisc, Ous)</li>
  <li>Missatge d'error accessible per cada camp (aria-live)</li>
</ul>`,
        hint: `<p>Per validar que la data no sigui al passat, compara <code>input.value</code> (en format YYYY-MM-DD) amb <code>new Date().toISOString().split('T')[0]</code>. Usa <code>input.min = avui</code> per limitar-ho directament.</p>`,
        solution: `<pre><code>const dataInput = document.getElementById('data');
const avui = new Date().toISOString().split('T')[0];
dataInput.min = avui;
dataInput.addEventListener('change', () => {
  if (dataInput.value &lt; avui) {
    dataInput.setCustomValidity('La data no pot ser al passat');
  } else {
    dataInput.setCustomValidity('');
  }
});</code></pre>`,
      },
    },

    {
      slug: "imatges-responsives",
      title: "Imatges responsives: srcset, sizes i picture",
      summary:
        "Serveix la imatge adequada per a cada dispositiu i context amb srcset, sizes i l'element picture.",
      goals: [
        "Fer servir <code>srcset</code> amb descriptors <code>w</code> i <code>x</code>.",
        "Definir <code>sizes</code> per ajudar el navegador a triar.",
        "Fer art direction amb <code>&lt;picture&gt;</code> i <code>&lt;source&gt;</code>.",
        "Fer servir formats moderns (WebP, AVIF) amb fallback.",
      ],
      sections: [
        {
          title: "srcset i descriptors de densitat (x)",
          body: `
            <p>El descriptor <code>x</code> serveix imatges de diferent resolució per a pantalles d'alta densitat (Retina, HiDPI):</p>
            <ul>
              <li><code>1x</code>: pantalles normals (96 DPI)</li>
              <li><code>2x</code>: pantalles Retina (192 DPI)</li>
              <li><code>3x</code>: mòbils d'alta densitat</li>
            </ul>
            <p>El navegador tria automàticament la millor opció.</p>
          `,
          lang: "html",
          code: `<!-- Imatge bàsica per densitat de píxels -->
<img
  src="logo.png"
  srcset="logo.png 1x,
          logo@2x.png 2x,
          logo@3x.png 3x"
  alt="Logo de l'empresa"
  width="200"
  height="80">

<!-- Si el dispositiu és Retina, carregarà logo@2x.png -->`,
          codeTitle: "srcset-densitat.html",
        },
        {
          title: "srcset amb descriptors d'amplada (w) i sizes",
          body: `
            <p>El descriptor <code>w</code> indica l'amplada intrínseca de la imatge en píxels. L'atribut <code>sizes</code> explica al navegador quant espai ocuparà la imatge a la pantalla, perquè pugui triar la versió correcta <em>abans</em> de descarregar el CSS.</p>
            <p>Format de <code>sizes</code>: <code>(condició media) amplada, ..., amplada-per-defecte</code></p>
          `,
          lang: "html",
          code: `<!-- Imatge responsiva completa -->
<img
  src="foto-800.jpg"
  srcset="
    foto-400.jpg   400w,
    foto-800.jpg   800w,
    foto-1200.jpg 1200w,
    foto-2000.jpg 2000w
  "
  sizes="
    (max-width: 480px) 100vw,
    (max-width: 1024px) 50vw,
    800px
  "
  alt="Paisatge de muntanya a la tardor"
  loading="lazy"
  decoding="async">

<!--
  El navegador calcularà:
  - Pantalla de 375px → necessita 375px → tria foto-400.jpg
  - Tablet 768px a 50vw → necessita 384px → tria foto-400.jpg
  - Desktop 1440px a 800px → necessita 800px → tria foto-800.jpg
  - Retina desktop → doble resolució → tria foto-1600.jpg
-->`,
          codeTitle: "srcset-sizes.html",
        },
        {
          title: "Art direction amb l'element picture",
          body: `
            <p><code>&lt;picture&gt;</code> va més enllà: permet mostrar imatges <em>completament diferents</em> segons la mida de pantalla (art direction) i formats moderns amb fallback.</p>
            <p>El navegador prova els <code>&lt;source&gt;</code> en ordre i fa servir el primer que coincideix. L'<code>&lt;img&gt;</code> final és el fallback obligatori.</p>
          `,
          lang: "html",
          code: `<!-- Art direction: imatge diferent en mòbil i desktop -->
<picture>
  <!-- Mòbil: imatge vertical i retallada -->
  <source
    media="(max-width: 600px)"
    srcset="hero-mobile.webp 600w, hero-mobile@2x.webp 1200w"
    type="image/webp">

  <!-- Tablet i desktop: imatge panoràmica -->
  <source
    media="(min-width: 601px)"
    srcset="hero-desktop.webp 1200w, hero-desktop@2x.webp 2400w"
    type="image/webp">

  <!-- Fallback per a navegadors sense WebP -->
  <img
    src="hero-desktop.jpg"
    alt="Equip treballant en una oficina lluminosa"
    width="1200"
    height="600"
    loading="eager"
    fetchpriority="high">
</picture>

<!-- Formats moderns amb fallback: AVIF > WebP > JPEG -->
<picture>
  <source type="image/avif" srcset="foto.avif">
  <source type="image/webp" srcset="foto.webp">
  <img src="foto.jpg" alt="Descripció de la foto" width="800" height="600">
</picture>`,
          codeTitle: "picture-art-direction.html",
        },
        {
          title: "Atributs de rendiment i prioritat",
          body: `
            <p>Uns pocs atributs poden millorar molt el rendiment de càrrega:</p>
          `,
          table: {
            head: ["Atribut", "Valor", "Efecte"],
            rows: [
              ["loading", "lazy", "Carrega la imatge quan és visible (above-the-fold NO)"],
              ["loading", "eager", "Carrega immediatament (per defecte)"],
              ["decoding", "async", "Decodifica sense bloquejar el thread principal"],
              ["fetchpriority", "high", "Prioritza la descàrrega (imatge hero/LCP)"],
              ["fetchpriority", "low", "Baixa prioritat (icones, thumbnails)"],
            ],
          },
          lang: "html",
          code: `<!-- Imatge hero: màxima prioritat, sense lazy -->
<img
  src="hero.webp"
  alt="Portada del producte"
  width="1200"
  height="600"
  fetchpriority="high"
  decoding="sync">

<!-- Imatges de galeria: lazy loading -->
<img src="galeria-1.webp" alt="Foto 1" loading="lazy" decoding="async" width="400" height="300">
<img src="galeria-2.webp" alt="Foto 2" loading="lazy" decoding="async" width="400" height="300">
<img src="galeria-3.webp" alt="Foto 3" loading="lazy" decoding="async" width="400" height="300">

<!-- Precarregar la imatge LCP al head (molt recomanat) -->
<!--
<link rel="preload" as="image"
  href="hero.webp"
  imagesrcset="hero-800.webp 800w, hero-1600.webp 1600w"
  imagesizes="100vw">
-->`,
          codeTitle: "imatges-rendiment.html",
          note: `<strong>Consell:</strong> Sempre especifica <code>width</code> i <code>height</code> a les imatges: el navegador pot reservar l'espai abans de carregar-les i evita el <em>Cumulative Layout Shift</em> (CLS).`,
        },
      ],
      exercise: {
        brief: `<p>Crea una secció de portada (hero) i una galeria de 4 fotos amb bones pràctiques de rendiment:</p>
<ul>
  <li>Hero: <code>&lt;picture&gt;</code> amb versió mòbil i desktop, format AVIF > WebP > JPEG, fetchpriority="high"</li>
  <li>Galeria: 4 imatges amb lazy loading, decoding async, srcset per a 1x i 2x</li>
  <li>Totes les imatges han de tenir width, height i alt adequats</li>
</ul>`,
        hint: `<p>L'estructura de la galeria seria: <code>&lt;img src="foto.jpg" srcset="foto.jpg 1x, foto@2x.jpg 2x" loading="lazy" decoding="async" width="400" height="300" alt="..."&gt;</code>. El <code>width</code> i <code>height</code> han de correspondre a les dimensions reals de la imatge.</p>`,
        solution: `<pre><code>&lt;picture&gt;
  &lt;source type="image/avif" media="(max-width:600px)" srcset="hero-m.avif"&gt;
  &lt;source type="image/avif" srcset="hero.avif"&gt;
  &lt;source type="image/webp" media="(max-width:600px)" srcset="hero-m.webp"&gt;
  &lt;source type="image/webp" srcset="hero.webp"&gt;
  &lt;img src="hero.jpg" alt="..." width="1200" height="600" fetchpriority="high"&gt;
&lt;/picture&gt;</code></pre>`,
      },
    },

    {
      slug: "web-components-avancats",
      title: "Web Components avançats: Shadow DOM i Custom Elements",
      summary:
        "Crear components HTML reutilitzables i encapsulats amb Shadow DOM, Custom Elements i templates.",
      goals: [
        "Definir Custom Elements amb <code>customElements.define()</code>.",
        "Implementar Shadow DOM per encapsular estils i estructura.",
        "Fer servir slots per injectar contingut extern.",
        "Gestionar atributs observats i el cicle de vida del component.",
      ],
      sections: [
        {
          title: "Custom Elements: el cicle de vida",
          body: `
            <p>Un Custom Element és una classe que estén <code>HTMLElement</code> i es registra amb <code>customElements.define('nom-tag', Classe)</code>. El nom ha de contenir un guió.</p>
            <p>Mètodes del cicle de vida:</p>
            <ul>
              <li><code>connectedCallback()</code>: l'element s'afegeix al DOM.</li>
              <li><code>disconnectedCallback()</code>: l'element es treu del DOM (netejar event listeners).</li>
              <li><code>attributeChangedCallback(name, old, new)</code>: un atribut observat canvia.</li>
              <li><code>adoptedCallback()</code>: l'element es mou a un altre document.</li>
            </ul>
          `,
          lang: "html",
          code: `<!-- Ús del component -->
<comprador-badge nom="Anna García" rol="Administradora" avatar="anna.jpg">
</comprador-badge>

<script>
  class CompradorBadge extends HTMLElement {
    // Atributs que volem observar
    static get observedAttributes() {
      return ['nom', 'rol', 'avatar'];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue && this.isConnected) {
        this.render(); // Re-renderitza quan canvia un atribut
      }
    }

    disconnectedCallback() {
      // Netejar recursos si cal
      console.log('Component eliminat del DOM');
    }

    render() {
      const nom = this.getAttribute('nom') || 'Usuari';
      const rol = this.getAttribute('rol') || '';
      const avatar = this.getAttribute('avatar') || '';

      this.innerHTML = \`
        <div class="badge">
          \${avatar ? \`<img src="\${avatar}" alt="\${nom}">\` : ''}
          <div>
            <strong>\${nom}</strong>
            \${rol ? \`<span>\${rol}</span>\` : ''}
          </div>
        </div>
      \`;
    }
  }

  customElements.define('comprador-badge', CompradorBadge);
</script>`,
          codeTitle: "custom-element.html",
        },
        {
          title: "Shadow DOM: encapsulació d'estils",
          body: `
            <p>El Shadow DOM crea un arbre DOM independent que el CSS extern no pot afectar (ni afectar l'exterior). Perfecte per a components reutilitzables.</p>
            <ul>
              <li><code>attachShadow({ mode: 'open' })</code>: accessible des de <code>element.shadowRoot</code>.</li>
              <li><code>attachShadow({ mode: 'closed' })</code>: completament privat.</li>
              <li>Els estils dins del Shadow DOM no s'escapen a l'exterior.</li>
            </ul>
          `,
          lang: "html",
          code: `<targeta-producte
  nom="Càmera Mirrorless"
  preu="599"
  imatge="camera.jpg">
</targeta-producte>

<script>
  class TargetaProducte extends HTMLElement {
    connectedCallback() {
      // Crear Shadow DOM
      const shadow = this.attachShadow({ mode: 'open' });

      const nom = this.getAttribute('nom');
      const preu = this.getAttribute('preu');
      const imatge = this.getAttribute('imatge');

      // Els estils aquí no afecten la pàgina principal
      shadow.innerHTML = \`
        <style>
          :host {
            display: block;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
            font-family: system-ui, sans-serif;
          }
          img { width: 100%; display: block; }
          .info { padding: 1rem; }
          h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }
          .preu { color: #0070f3; font-weight: bold; font-size: 1.3rem; }
          button {
            background: #0070f3;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 0.5rem;
          }
          button:hover { background: #0051cc; }
        </style>

        <img src="\${imatge}" alt="\${nom}">
        <div class="info">
          <h2>\${nom}</h2>
          <p class="preu">\${preu} €</p>
          <button>Afegir al carro</button>
        </div>
      \`;

      shadow.querySelector('button').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('afegir-carro', {
          detail: { nom, preu: parseFloat(preu) },
          bubbles: true,
          composed: true  // Atravessa el shadow boundary
        }));
      });
    }
  }

  customElements.define('targeta-producte', TargetaProducte);

  // Escoltar l'event des de fora
  document.addEventListener('afegir-carro', (e) => {
    console.log('Afegit:', e.detail);
  });
</script>`,
          codeTitle: "shadow-dom.html",
        },
        {
          title: "Slots: injectar contingut extern",
          body: `
            <p>Els <strong>slots</strong> permeten que el contingut HTML escrit fora del component aparegui en llocs específics dins del Shadow DOM. Fan els Web Components molt més flexibles.</p>
          `,
          lang: "html",
          code: `<!-- Ús del component amb slots -->
<targeta-info>
  <span slot="titol">Informació important</span>
  <p slot="contingut">
    Recorda que les comandes realitzades abans de les 14h
    s'envien el mateix dia.
  </p>
  <a slot="accio" href="/enviaments">Més informació</a>
</targeta-info>

<script>
  class TargetaInfo extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = \`
        <style>
          :host { display: block; }
          .targeta {
            border-left: 4px solid #0070f3;
            padding: 1rem 1.5rem;
            background: #f0f7ff;
            border-radius: 0 8px 8px 0;
          }
          h3 { margin: 0 0 0.5rem; color: #0070f3; }
          ::slotted(p) { margin: 0 0 0.5rem; color: #374151; }
          ::slotted(a) { color: #0070f3; }
        </style>
        <div class="targeta">
          <h3><slot name="titol">Títol</slot></h3>
          <slot name="contingut"></slot>
          <slot name="accio"></slot>
        </div>
      \`;
    }
  }

  customElements.define('targeta-info', TargetaInfo);
</script>`,
          codeTitle: "slots.html",
        },
        {
          title: "HTML Templates reutilitzables",
          body: `
            <p>L'element <code>&lt;template&gt;</code> conté HTML que no es renderitza fins que ho clonem per JavaScript. Combinat amb Shadow DOM, és la base dels Web Components moderns.</p>
          `,
          lang: "html",
          code: `<!-- Template: no es mostra al DOM -->
<template id="tmpl-producte">
  <style>
    .producte { border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
    .nom { font-weight: bold; }
    .preu { color: green; }
  </style>
  <div class="producte">
    <div class="nom"></div>
    <div class="preu"></div>
  </div>
</template>

<div id="llista"></div>

<script>
  const productes = [
    { nom: 'Càmera', preu: 599 },
    { nom: 'Trípode', preu: 89 },
    { nom: 'Bateria extra', preu: 45 },
  ];

  const template = document.getElementById('tmpl-producte');
  const llista = document.getElementById('llista');

  productes.forEach(p => {
    // Clonar el template
    const clon = template.content.cloneNode(true);
    clon.querySelector('.nom').textContent = p.nom;
    clon.querySelector('.preu').textContent = p.preu + ' €';
    llista.appendChild(clon);
  });
</script>`,
          codeTitle: "template.html",
        },
      ],
      exercise: {
        brief: `<p>Crea un Web Component <code>&lt;comptador-interactiu&gt;</code> amb Shadow DOM que:</p>
<ul>
  <li>Accepti un atribut <code>valor-inicial</code> (número, per defecte 0)</li>
  <li>Accepti un atribut <code>pas</code> (increment/decrement, per defecte 1)</li>
  <li>Mostri el comptador actual amb dos botons: – i +</li>
  <li>Emeti un event <code>canvi-valor</code> amb el nou valor quan canviï</li>
  <li>Els estils estiguin encapsulats al Shadow DOM</li>
</ul>`,
        hint: `<p>Guarda el valor actual com a propietat de la instància (<code>this._valor</code>). Als botons, actualitza <code>this._valor</code> i refés el text del display. Llança l'event amb <code>this.dispatchEvent(new CustomEvent('canvi-valor', { detail: { valor: this._valor }, bubbles: true, composed: true }))</code>.</p>`,
        solution: `<pre><code>class ComptadorInteractiu extends HTMLElement {
  static get observedAttributes() { return ['valor-inicial', 'pas']; }
  connectedCallback() {
    this._valor = parseInt(this.getAttribute('valor-inicial') || 0);
    this._pas = parseInt(this.getAttribute('pas') || 1);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`&lt;style&gt;...&lt;/style&gt;
      &lt;button id="dec"&gt;–&lt;/button&gt;
      &lt;span id="val"&gt;\${this._valor}&lt;/span&gt;
      &lt;button id="inc"&gt;+&lt;/button&gt;\`;
    shadow.getElementById('dec').onclick = () => this._canviar(-this._pas);
    shadow.getElementById('inc').onclick = () => this._canviar(this._pas);
  }
  _canviar(delta) {
    this._valor += delta;
    this.shadowRoot.getElementById('val').textContent = this._valor;
    this.dispatchEvent(new CustomEvent('canvi-valor', { detail: { valor: this._valor }, bubbles: true, composed: true }));
  }
}
customElements.define('comptador-interactiu', ComptadorInteractiu);</code></pre>`,
      },
    },

    {
      slug: "rendiment-carrega",
      title: "Rendiment i càrrega de recursos",
      summary:
        "Tècniques per carregar la pàgina més ràpidament: lazy loading, preload, scripts async/defer i Core Web Vitals.",
      goals: [
        "Fer servir <code>loading=\"lazy\"</code> per a imatges i iframes.",
        "Precarregar recursos crítics amb <code>&lt;link rel=\"preload\"&gt;</code>.",
        "Entendre la diferència entre <code>async</code> i <code>defer</code> en scripts.",
        "Conèixer els Core Web Vitals (LCP, INP, CLS) i com millorar-los.",
      ],
      sections: [
        {
          title: "Lazy loading i iframes",
          body: `
            <p>El lazy loading difereix la càrrega de recursos que no són visibles. El navegador els carregarà quan l'usuari s'acosti a ells en fer scroll. Suportat nativament des de 2019.</p>
            <ul>
              <li><code>loading="lazy"</code>: en imatges i iframes.</li>
              <li><code>loading="eager"</code>: càrrega immediata (valor per defecte).</li>
              <li><strong>Important:</strong> mai facis servir lazy en la imatge principal (hero/LCP).</li>
            </ul>
          `,
          lang: "html",
          code: `<!-- Imatge hero: sense lazy (above-the-fold) -->
<img src="hero.webp" alt="Portada" width="1200" height="600"
  fetchpriority="high">

<!-- Imatges de galeria: lazy loading -->
<img src="foto-1.webp" alt="Foto 1" width="400" height="300" loading="lazy">
<img src="foto-2.webp" alt="Foto 2" width="400" height="300" loading="lazy">
<img src="foto-3.webp" alt="Foto 3" width="400" height="300" loading="lazy">

<!-- Iframe de mapa o vídeo: lazy loading (estalvia molt) -->
<iframe
  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
  title="Vídeo tutorial"
  width="560"
  height="315"
  loading="lazy"
  allowfullscreen>
</iframe>`,
          codeTitle: "lazy-loading.html",
        },
        {
          title: "Preload, prefetch i preconnect",
          body: `
            <p>Els resource hints permeten al navegador anticipar-se a les necessitats futures:</p>
          `,
          table: {
            head: ["Rel", "Moment", "Ús ideal"],
            rows: [
              ["preload", "Immediat (mateixa pàgina)", "Fonts, CSS crític, imatge LCP, scripts importants"],
              ["prefetch", "Baixa prioritat (pàgina futura)", "Recursos que caldrà a la pàgina següent"],
              ["preconnect", "Connexió anticipada", "Dominis de tercers (fonts, CDN, APIs)"],
              ["dns-prefetch", "Resolució DNS anticipada", "Dominis de tercers (alternativa lleugera a preconnect)"],
            ],
          },
          lang: "html",
          code: `<head>
  <!-- Preconnect: establir connexió anticipada a Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- DNS-prefetch: alternativa lleugera -->
  <link rel="dns-prefetch" href="https://analytics.example.com">

  <!-- Preload: carregar la font abans que el CSS la demani -->
  <link rel="preload" href="/fonts/inter-var.woff2"
    as="font" type="font/woff2" crossorigin>

  <!-- Preload: imatge hero (LCP) -->
  <link rel="preload" href="/img/hero.webp" as="image">

  <!-- Preload: script crític -->
  <link rel="preload" href="/js/app.js" as="script">

  <!-- Prefetch: recurs que caldrà a la pàgina de producte -->
  <link rel="prefetch" href="/js/producte.js" as="script">
  <link rel="prefetch" href="/img/producte-1.webp" as="image">
</head>`,
          codeTitle: "resource-hints.html",
        },
        {
          title: "Scripts: async vs defer",
          body: `
            <p>Per defecte, un <code>&lt;script&gt;</code> al <code>&lt;head&gt;</code> bloqueja el parsing HTML mentre es descarrega i executa. <code>async</code> i <code>defer</code> ho eviten:</p>
          `,
          table: {
            head: ["Atribut", "Descàrrega", "Execució", "Ordre garantit", "Ús"],
            rows: [
              ["(cap)", "Bloqueja", "Immediata", "Sí", "Scripts crítics (rar)"],
              ["async", "Paral·lela", "En acabar la descàrrega", "No", "Scripts independents (analytics)"],
              ["defer", "Paral·lela", "Quan el DOM és llest", "Sí", "Scripts que necessiten el DOM"],
              ["type=\"module\"", "Paral·lela", "Com defer", "Sí (dins mòdul)", "Mòduls ES6"],
            ],
          },
          lang: "html",
          code: `<head>
  <!-- Bloqueja: evitar si no és absolutament necessari -->
  <script src="crític.js"></script>

  <!-- Async: s'executa quan es descarrega (sense ordre) -->
  <!-- Bon per a: analytics, publicitat, scripts independents -->
  <script async src="https://analytics.example.com/script.js"></script>

  <!-- Defer: s'executa quan el DOM és llest, en ordre -->
  <!-- Bo per a: scripts que manipulen el DOM -->
  <script defer src="/js/main.js"></script>
  <script defer src="/js/components.js"></script>
  <!-- main.js s'executa abans que components.js (ordre garantit) -->

  <!-- Mòdul: defer per defecte, sempre -->
  <script type="module" src="/js/app.js"></script>
</head>

<!-- Recomanació: scripts al final del body (ja no necessiten defer) -->
<body>
  <!-- contingut... -->
  <script src="/js/main.js"></script>
</body>`,
          codeTitle: "async-defer.html",
        },
        {
          title: "Core Web Vitals",
          body: `
            <p>Google mesura l'experiència d'usuari amb tres mètriques clau (Core Web Vitals) que afecten el SEO:</p>
          `,
          table: {
            head: ["Mètrica", "Mesura", "Bon valor", "Com millorar"],
            rows: [
              ["LCP (Largest Contentful Paint)", "Temps fins que el contingut principal és visible", "< 2.5 s", "Preload imatge hero, optimitzar servidor, CDN"],
              ["INP (Interaction to Next Paint)", "Temps de resposta a interaccions", "< 200 ms", "Evitar scripts que bloquegin el thread, Web Workers"],
              ["CLS (Cumulative Layout Shift)", "Estabilitat visual (evitar salts)", "< 0.1", "Reserves d'espai per imatges (width/height), fonts"],
            ],
          },
          lang: "html",
          code: `<!-- Evitar CLS: reserva espai per a imatges -->
<img src="foto.jpg" alt="..." width="800" height="600">
<!-- width/height permeten al navegador reservar l'espai -->

<!-- Evitar CLS: fonts amb font-display: swap -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter.woff2') format('woff2');
    font-display: swap; /* Mostra text amb font de sistema mentre carrega */
    font-weight: 100 900;
  }
</style>

<!-- Evitar CLS: espai reservat per a anuncis -->
<div style="min-height: 250px; width: 300px;">
  <!-- El banner publicitari carregarà aquí -->
</div>

<!-- Mesura Core Web Vitals des de JavaScript -->
<script>
  // Necessita la lib web-vitals o s'usa Performance API
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('LCP:', entry.startTime, 'ms');
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
</script>`,
          codeTitle: "core-web-vitals.html",
          note: `<strong>Eina:</strong> Comprova les mètriques amb <a href="https://pagespeed.web.dev" target="_blank" rel="noopener">PageSpeed Insights</a> (dades reals de Chrome) o amb les DevTools > Lighthouse.`,
        },
      ],
      exercise: {
        brief: `<p>Optimitza el <code>&lt;head&gt;</code> d'una pàgina de blog que fa servir la font "Playfair Display" de Google Fonts, té una imatge hero gran, un script d'analytics extern i el fitxer JS principal de l'app.</p>
<ul>
  <li>Afegeix preconnect als dominis de Google Fonts</li>
  <li>Precarrega la font woff2</li>
  <li>Precarrega la imatge hero com a LCP</li>
  <li>Carrega analytics amb async</li>
  <li>Carrega el JS de l'app amb defer</li>
  <li>Afegeix lazy loading als iframes de comentaris</li>
</ul>`,
        hint: `<p>L'ordre al head hauria de ser: 1) charset i viewport, 2) preconnect, 3) preload font, 4) preload imatge hero, 5) CSS, 6) scripts async (analytics), 7) scripts defer (app). Els resource hints sense as="..." no funcionen.</p>`,
        solution: `<pre><code>&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;
&lt;link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin&gt;
&lt;link rel="preload" href="/img/hero-blog.webp" as="image"&gt;
&lt;script async src="https://analytics.example.com/script.js"&gt;&lt;/script&gt;
&lt;script defer src="/js/app.js"&gt;&lt;/script&gt;
&lt;!-- ... --&gt;
&lt;iframe src="https://comentaris.example.com" loading="lazy"&gt;&lt;/iframe&gt;</code></pre>`,
      },
    },
  ],
};

