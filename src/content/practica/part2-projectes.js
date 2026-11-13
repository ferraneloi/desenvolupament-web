export default {
  title: "Projectes reals pas a pas",
  description:
    "Construcció de projectes complets integrant HTML5 semàntic, CSS modern i JavaScript: des d'una landing page i un portafolis fins a una aplicació de tasques, una app amb API i el desplegament final a Vercel.",
  chapters: [
    {
      slug: "landing-page",
      title: "Construcció d'una landing page",
      summary:
        "Dissenya i maqueta una pàgina d'aterratge (landing page) atractiva, accessible i completament adaptada a dispositius mòbils.",
      goals: [
        "Estructurar seccions clau: Hero, Característiques (Features), Testimonis i Crida a l'acció (CTA).",
        "Aplicar el principi Mobile First amb Flexbox i CSS Grid.",
        "Implementar un menú de navegació mòbil accessible amb estat d'obertura.",
        "Optimitzar el contrast de colors i la jerarquia visual.",
      ],
      sections: [
        {
          title: "Estructura semàntica d'una Landing Page",
          body: `
            <p>Una landing page té com a objectiu principal captar l'atenció de la persona usuària i guiar-la cap a una conversió (registre, compra, subscripció). L'estructura ha de ser neta i ben jerarquitzada:</p>
            <ul>
              <li><code>&lt;header&gt;</code>: Logo, navegació principal i botó d'accés ràpid.</li>
              <li><code>&lt;main&gt;</code>: Contingut central, començant pel <strong>Hero</strong> (títol d'impacte, subtítol i botons principals).</li>
              <li><code>&lt;section id="caracteristiques"&gt;</code>: Graella amb els avantatges clau del producte.</li>
              <li><code>&lt;section id="cta"&gt;</code>: Crida a l'acció final (Call To Action).</li>
              <li><code>&lt;footer&gt;</code>: Enllaços legals, contacte i xarxes socials.</li>
            </ul>
          `,
          lang: "html",
          code: `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AppFlow — La plataforma per a equips creatius</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="capcalera">
    <div class="contenidor fila">
      <a href="#" class="logo">App<span>Flow</span></a>
      <nav aria-label="Navegació principal">
        <ul class="nav-llista">
          <li><a href="#caracteristiques">Característiques</a></li>
          <li><a href="#preus">Preus</a></li>
          <li><a href="#contacte" class="boto boto-primari">Comença de franc</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <!-- Secció HERO -->
    <section class="hero">
      <div class="contenidor">
        <h1>Gestiona els teus projectes a la velocitat de la llum</h1>
        <p class="subtitol">La solució integral per col·laborar en temps real, reduir reunions i lliurar projectes a temps.</p>
        <div class="hero-accions">
          <a href="#registre" class="boto boto-primari">Inicia prova gratuïta</a>
          <a href="#demo" class="boto boto-secundari">Veure demostració</a>
        </div>
      </div>
    </section>

    <!-- Secció Característiques -->
    <section id="caracteristiques" class="seccio">
      <div class="contenidor">
        <h2 class="titol-seccio">Tot el que necessites per créixer</h2>
        <div class="graella-features">
          <article class="targeta-feature">
            <div class="icona" aria-hidden="true">⚡</div>
            <h3>Ràpid i reactiu</h3>
            <p>Sense temps de càrrega. Totes les accions es sincronitzen instantàniament entre tot l'equip.</p>
          </article>
          <article class="targeta-feature">
            <div class="icona" aria-hidden="true">🔒</div>
            <h3>Seguretat d'extrem a extrem</h3>
            <p>Dades xifrades amb els estàndards més exigents del sector bancari.</p>
          </article>
          <article class="targeta-feature">
            <div class="icona" aria-hidden="true">📊</div>
            <h3>Analítica avançada</h3>
            <p>Informes visuals per mesurar la productivitat i prendre millors decisions.</p>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer class="peu">
    <div class="contenidor">
      <p>&copy; 2026 AppFlow Technologies. Tots els drets reservats.</p>
    </div>
  </footer>
</body>
</html>`,
          codeTitle: "index.html",
        },
        {
          title: "Estils CSS moderns i Mobile First",
          body: `
            <p>Apliquem CSS amb variables de disseny per als colors i mides, i fem servir <code>CSS Grid</code> per a la distribució de característiques que s'adapta automàticament a qualsevol amplada de pantalla.</p>
          `,
          lang: "css",
          code: `:root {
  --color-primari: #2563eb;
  --color-primari-fosc: #1d4ed8;
  --color-fons: #ffffff;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --color-superficie: #f8fafc;
  --radi: 10px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--color-text);
  line-height: 1.6;
}

.contenidor {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.capcalera {
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 0;
}

.capcalera .fila {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.35rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--color-text);
}
.logo span { color: var(--color-primari); }

.nav-llista {
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
}

.nav-llista a {
  text-decoration: none;
  color: var(--color-muted);
  font-weight: 500;
  transition: color 0.2s;
}
.nav-llista a:hover { color: var(--color-text); }

/* HERO */
.hero {
  padding: 80px 0 60px;
  text-align: center;
  background: radial-gradient(circle at top, #eff6ff 0%, #ffffff 70%);
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.15;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.subtitol {
  font-size: 1.2rem;
  color: var(--color-muted);
  max-width: 650px;
  margin: 0 auto 30px;
}

.hero-accions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.boto {
  padding: 12px 24px;
  border-radius: var(--radi);
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.15s, background 0.2s;
}
.boto:hover { transform: translateY(-2px); }

.boto-primari {
  background: var(--color-primari);
  color: white;
}
.boto-primari:hover { background: var(--color-primari-fosc); }

.boto-secundari {
  background: #e2e8f0;
  color: var(--color-text);
}

/* FEATURES GRID */
.seccio { padding: 70px 0; }
.titol-seccio {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
}

.graella-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.targeta-feature {
  background: var(--color-superficie);
  border: 1px solid #e2e8f0;
  border-radius: var(--radi);
  padding: 30px;
}

.targeta-feature .icona {
  font-size: 2rem;
  margin-bottom: 12px;
}

.peu {
  border-top: 1px solid #e2e8f0;
  padding: 30px 0;
  text-align: center;
  color: var(--color-muted);
  font-size: 0.9rem;
}`,
          codeTitle: "styles.css",
        },
      ],
      exercise: {
        brief: `<p>Afegeix una secció de <strong>Preguntes Freqüents (FAQ)</strong> a la landing page:</p>
<ul>
  <li>Fes servir l'element HTML5 semàntic <code>&lt;details&gt;</code> i <code>&lt;summary&gt;</code> per crear un acordió sense necessitat de JavaScript.</li>
  <li>Afegeix 3 preguntes i respostes típiques (com ara mètodes de pagament, cancel·lació i suport tècnic).</li>
  <li>Estila el <code>&lt;summary&gt;</code> perquè tingui cursor de punter, un padding còmode i un fons diferenciat en obrir-se.</li>
</ul>`,
        hint: `<p>Pots seleccionar l'element obert en CSS utilitzant el selector <code>details[open] summary</code>.</p>`,
        solution: `<pre><code>&lt;section class="seccio faq"&gt;
  &lt;div class="contenidor"&gt;
    &lt;h2 class="titol-seccio"&gt;Preguntes freqüents&lt;/h2&gt;
    &lt;details&gt;
      &lt;summary&gt;És gratuïta la prova inicial?&lt;/summary&gt;
      &lt;p&gt;Sí, disposes de 14 dies de prova sense necessitat de targeta de crèdit.&lt;/p&gt;
    &lt;/details&gt;
    &lt;details&gt;
      &lt;summary&gt;Puc cancel·lar la meva subscripció en qualsevol moment?&lt;/summary&gt;
      &lt;p&gt;Sí, pots cancel·lar amb un sol clic des de la configuració del teu compte.&lt;/p&gt;
    &lt;/details&gt;
  &lt;/div&gt;
&lt;/section&gt;</code></pre>`,
      },
    },

    {
      slug: "creacio-portafolis",
      title: "Creació d'un portafolis personal",
      summary:
        "Desenvolupa el teu lloc web de presentació professional amb galeria de projectes, filtre per categories, enllaços socials i mode clar/fosc.",
      goals: [
        "Presentar projectes i habilitats amb targetes interactives i enllaços a GitHub.",
        "Implementar filtratge dinàmic de projectes per etiquetes amb JavaScript.",
        "Crear un commutador de tema clar/fosc (dark mode) amb persistència a LocalStorage.",
        "Garantir un disseny accessible i una impressió impecable del currículum.",
      ],
      sections: [
        {
          title: "Filtratge dinàmic de projectes amb JavaScript",
          body: `
            <p>Un bon portafolis permet filtrar els projectes segons la tecnologia (per exemple: <em>Tots</em>, <em>HTML/CSS</em>, <em>JavaScript</em>, <em>APIs</em>). Farem servir atributs <code>data-categoria</code> a cada targeta per filtrar de manera instantània.</p>
          `,
          lang: "html",
          code: `<div class="filtres">
  <button class="boto-filtre actiu" data-filtre="tots">Tots</button>
  <button class="boto-filtre" data-filtre="html-css">HTML & CSS</button>
  <button class="boto-filtre" data-filtre="javascript">JavaScript</button>
  <button class="boto-filtre" data-filtre="api">APIs</button>
</div>

<div class="graella-projectes" id="projectes">
  <article class="targeta-projecte" data-categoria="html-css">
    <h3>Landing Page Moderna</h3>
    <p>Maquetació responsive amb CSS Grid i Flexbox.</p>
    <span class="etiqueta">HTML/CSS</span>
  </article>

  <article class="targeta-projecte" data-categoria="javascript">
    <h3>Aplicació de Tasques</h3>
    <p>App interactiva amb CRUD i persistència a LocalStorage.</p>
    <span class="etiqueta">JavaScript</span>
  </article>

  <article class="targeta-projecte" data-categoria="api">
    <h3>Buscador del Temps</h3>
    <p>Consulta en temps real a OpenWeatherMap amb Fetch API.</p>
    <span class="etiqueta">APIs</span>
  </article>
</div>

<script>
  const botons = document.querySelectorAll(".boto-filtre");
  const targetes = document.querySelectorAll(".targeta-projecte");

  botons.forEach((boto) => {
    boto.addEventListener("click", () => {
      // 1. Actualitzar estat visual dels botons
      botons.forEach((b) => b.classList.remove("actiu"));
      boto.classList.add("actiu");

      const filtre = boto.dataset.filtre;

      // 2. Mostrar o amagar targetes segons el filtre
      targetes.forEach((targeta) => {
        if (filtre === "tots" || targeta.dataset.categoria === filtre) {
          targeta.style.display = "block";
        } else {
          targeta.style.display = "none";
        }
      });
    });
  });
</script>`,
          codeTitle: "filtre-projectes.html",
        },
        {
          title: "Commutador de mode clar i fosc (Dark Mode)",
          body: `
            <p>Els visitants agraeixen poder triar entre tema clar i fosc. Utilitzem l'atribut <code>data-theme</code> a l'etiqueta <code>&lt;html&gt;</code> i guardem la preferència a <code>localStorage</code> per recordar-la.</p>
          `,
          lang: "js",
          code: `const botoTema = document.getElementById("btn-tema");
const temaGuardat = localStorage.getItem("tema") || "clar";

// Aplicar el tema inicial
document.documentElement.setAttribute("data-theme", temaGuardat);

botoTema.addEventListener("click", () => {
  const temaActual = document.documentElement.getAttribute("data-theme");
  const nouTema = temaActual === "fosc" ? "clar" : "fosc";

  document.documentElement.setAttribute("data-theme", nouTema);
  localStorage.setItem("tema", nouTema);
  botoTema.textContent = nouTema === "fosc" ? "☀️ Mode Clar" : "🌙 Mode Fosc";
});`,
          codeTitle: "dark-mode.js",
        },
      ],
      exercise: {
        brief: `<p>Dissenya la secció "Sobre mi" del teu portafolis:</p>
<ul>
  <li>Inclou una fotografia o avatar amb <code>border-radius: 50%</code> i ombra suau.</li>
  <li>Afegeix una breu biografia explicant qui ets i quines tecnologies domines.</li>
  <li>Afegeix una llista d'habilitats tècniques (skills) mostrades com a "pills" o etiquetes visuals.</li>
  <li>Inclou botons amb enllaços cap al teu perfil de GitHub i LinkedIn amb atributs <code>target="_blank"</code> i <code>rel="noopener noreferrer"</code>.</li>
</ul>`,
        hint: `<p>L'atribut <code>rel="noopener noreferrer"</code> és imprescindible per seguretat quan obres enllaços externs amb <code>target="_blank"</code>.</p>`,
        solution: `<pre><code>&lt;section class="sobre-mi"&gt;
  &lt;img src="avatar.jpg" alt="Foto de perfil" class="avatar"&gt;
  &lt;h2&gt;Hola, sóc Desenvolupador/a Web&lt;/h2&gt;
  &lt;p&gt;Apassionat/da per crear interfícies accessibles, netes i ràpides.&lt;/p&gt;
  &lt;div class="skills"&gt;
    &lt;span&gt;HTML5&lt;/span&gt;&lt;span&gt;CSS3&lt;/span&gt;&lt;span&gt;JavaScript&lt;/span&gt;&lt;span&gt;Git&lt;/span&gt;
  &lt;/div&gt;
  &lt;a href="https://github.com/..." target="_blank" rel="noopener noreferrer"&gt;GitHub&lt;/a&gt;
&lt;/section&gt;</code></pre>`,
      },
    },

    {
      slug: "formulari-validat",
      title: "Formulari interactiu validat",
      summary:
        "Crea un formulari de contacte professional amb validació visual en temps real, prevenció d'injecció i enviament asíncron amb indicador d'estat.",
      goals: [
        "Combinar la validació nativa d'HTML5 amb comprovacions avançades en JavaScript.",
        "Oferir missatges d'error comprensibles i accessibles amb <code>aria-live</code>.",
        "Gestionar l'esdeveniment <code>submit</code> evitant recàrregues de pàgina.",
        "Desactivar el botó mentre s'envien les dades per evitar enviaments duplicats.",
      ],
      sections: [
        {
          title: "Arquitectura del formulari validat",
          body: `
            <p>Construirem un formulari amb camps de nom, correu electrònic, assumpte i missatge. Cada camp disposarà del seu corresponent element <code>&lt;span class="error-msg"&gt;</code> connectat mitjançant <code>aria-describedby</code>.</p>
          `,
          lang: "html",
          code: `<form id="contact-form" novalidate>
  <div class="grup-camp">
    <label for="nom">Nom complet <span aria-hidden="true">*</span></label>
    <input type="text" id="nom" name="nom" required minlength="3" placeholder="Pau Casals">
    <span class="error-msg" id="nom-error" role="alert" aria-live="polite"></span>
  </div>

  <div class="grup-camp">
    <label for="email">Correu electrònic <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" required placeholder="pau@exemple.cat">
    <span class="error-msg" id="email-error" role="alert" aria-live="polite"></span>
  </div>

  <div class="grup-camp">
    <label for="missatge">El teu missatge <span aria-hidden="true">*</span></label>
    <textarea id="missatge" name="missatge" required minlength="10" rows="5"></textarea>
    <span class="error-msg" id="missatge-error" role="alert" aria-live="polite"></span>
  </div>

  <button type="submit" id="boto-enviar" class="boto boto-primari">Enviar missatge</button>
  <div id="resposta-servidor" class="missatge-estat" hidden></div>
</form>`,
          codeTitle: "formulari.html",
        },
        {
          title: "Lògica de validació en JavaScript",
          body: `
            <p>Validem en temps real quan l'usuari surt del camp (esdeveniment <code>blur</code>) i tornem a validar tots els camps abans d'executar l'enviament final.</p>
          `,
          lang: "js",
          code: `const form = document.getElementById("contact-form");
const botoEnviar = document.getElementById("boto-enviar");
const respostaEl = document.getElementById("resposta-servidor");

const validadors = {
  nom: (val) => val.trim().length >= 3 ? "" : "El nom ha de tenir com a mínim 3 caràcters.",
  email: (val) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val) ? "" : "Introdueix una adreça de correu vàlida.",
  missatge: (val) => val.trim().length >= 10 ? "" : "El missatge ha de tenir com a mínim 10 caràcters.",
};

function validarCamp(nomCamp) {
  const input = form.elements[nomCamp];
  const errorEl = document.getElementById(nomCamp + "-error");
  const missatgeError = validadors[nomCamp](input.value);

  if (missatgeError) {
    input.classList.add("invalid");
    errorEl.textContent = missatgeError;
    return false;
  } else {
    input.classList.remove("invalid");
    errorEl.textContent = "";
    return true;
  }
}

// Validació interactiva en perdre el focus
["nom", "email", "missatge"].forEach((camp) => {
  form.elements[camp].addEventListener("blur", () => validarCamp(camp));
});

// Gestió de l'enviament
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const esValid = ["nom", "email", "missatge"].every((camp) => validarCamp(camp));
  if (!esValid) return;

  // Estat de càrrega
  botoEnviar.disabled = true;
  botoEnviar.textContent = "Enviant...";

  try {
    // Simulem l'enviament a una API
    await new Promise((resolve) => setTimeout(resolve, 1200));

    respostaEl.textContent = "Moltes gràcies! Hem rebut el teu missatge correctament.";
    respostaEl.className = "missatge-estat exit";
    respostaEl.hidden = false;
    form.reset();
  } catch (err) {
    respostaEl.textContent = "Hi ha hagut un problema en enviar el formulari. Si us plau, torna-ho a provar.";
    respostaEl.className = "missatge-estat error";
    respostaEl.hidden = false;
  } finally {
    botoEnviar.disabled = false;
    botoEnviar.textContent = "Enviar missatge";
  }
});`,
          codeTitle: "validacio.js",
        },
      ],
      exercise: {
        brief: `<p>Afegeix un comptador de caràcters per al camp de text del missatge:</p>
<ul>
  <li>Estableix un límit màxim de 300 caràcters amb <code>maxlength="300"</code>.</li>
  <li>Afegeix un element <code>&lt;span id="comptador"&gt;0 / 300 caràcters&lt;/span&gt;</code> sota l'àrea de text.</li>
  <li>Escolta l'esdeveniment <code>input</code> del textarea per anar actualitzant el nombre de caràcters escrits en directe.</li>
  <li>Si l'usuari supera els 250 caràcters, canvia el color del comptador a taronja; si arriba a 300, a vermell.</li>
</ul>`,
        hint: `<p>Utilitza <code>textarea.value.length</code> per obtenir la longitud actual del text.</p>`,
        solution: `<pre><code>const textarea = document.getElementById("missatge");
const comptador = document.getElementById("comptador");

textarea.addEventListener("input", () => {
  const len = textarea.value.length;
  comptador.textContent = len + " / 300 caràcters";
  if (len >= 300) {
    comptador.style.color = "red";
  } else if (len >= 250) {
    comptador.style.color = "orange";
  } else {
    comptador.style.color = "inherit";
  }
});</code></pre>`,
      },
    },

    {
      slug: "aplicacio-tasques",
      title: "Aplicació de tasques (Todo App)",
      summary:
        "Desenvolupa una aplicació web completa amb operacions CRUD (Crear, Llegir, Actualitzar, Esborrar), filtres d'estat i persistència permanent a LocalStorage.",
      goals: [
        "Modelar l'estat d'una aplicació interactiva en JavaScript pur.",
        "Implementar la renderització reactiva a partir d'un array d'objectes.",
        "Manipular dades de manera immutable amb <code>map</code>, <code>filter</code> i <code>crypto.randomUUID()</code>.",
        "Sincronitzar l'estat amb <code>localStorage</code> a cada operació.",
      ],
      sections: [
        {
          title: "Model de dades i lògica d'estat",
          body: `
            <p>El secret d'una aplicació JavaScript robusta és separar clarament l'<strong>estat</strong> (les dades) de la <strong>renderització</strong> (el DOM). Quan l'estat canvia, tornem a pintar la interfície o actualitzem els nodes necessaris.</p>
          `,
          lang: "js",
          code: `// 1. Estat inicial (carregat de localStorage o array buit)
let tasques = JSON.parse(localStorage.getItem("tasques_app") || "[]");
let filtreActual = "totes"; // "totes" | "actives" | "fetes"

// Funció per guardar l'estat actualitzat
function guardarTasques() {
  localStorage.setItem("tasques_app", JSON.stringify(tasques));
  renderitzar();
}

// 2. Operacions CRUD
function afegirTasca(titol) {
  const novaTasca = {
    id: crypto.randomUUID(),
    titol: titol.trim(),
    feta: false,
    creadaEl: Date.now(),
  };
  tasques = [novaTasca, ...tasques];
  guardarTasques();
}

function commutarTasca(id) {
  tasques = tasques.map((t) => t.id === id ? { ...t, feta: !t.feta } : t);
  guardarTasques();
}

function eliminarTasca(id) {
  tasques = tasques.filter((t) => t.id !== id);
  guardarTasques();
}`,
          codeTitle: "app-estat.js",
        },
        {
          title: "Renderització accessible de la llista",
          body: `
            <p>Creem els elements del DOM de forma segura fent servir <code>textContent</code> per evitar qualsevol risc de vulnerabilitat XSS.</p>
          `,
          lang: "js",
          code: `const llistaEl = document.getElementById("llista-tasques");
const comptadorEl = document.getElementById("comptador-pendents");

function renderitzar() {
  llistaEl.innerHTML = "";

  // Filtrar segons la pestanya activa
  const tasquesFiltrades = tasques.filter((t) => {
    if (filtreActual === "actives") return !t.feta;
    if (filtreActual === "fetes") return t.feta;
    return true;
  });

  tasquesFiltrades.forEach((tasca) => {
    const li = document.createElement("li");
    li.className = "item-tasca" + (tasca.feta ? " completada" : "");

    // Checkbox per commutar
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = tasca.feta;
    check.setAttribute("aria-label", "Marcar com a feta: " + tasca.titol);
    check.addEventListener("change", () => commutarTasca(tasca.id));

    // Text de la tasca
    const span = document.createElement("span");
    span.textContent = tasca.titol;

    // Botó eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "✕";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.setAttribute("aria-label", "Eliminar tasca: " + tasca.titol);
    btnEliminar.addEventListener("click", () => eliminarTasca(tasca.id));

    li.append(check, span, btnEliminar);
    llistaEl.appendChild(li);
  });

  const pendents = tasques.filter((t) => !t.feta).length;
  comptadorEl.textContent = pendents + " tasques pendents";
}

// Formulari per afegir
document.getElementById("form-tasca").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("input-tasca");
  if (input.value.trim()) {
    afegirTasca(input.value);
    input.value = "";
  }
});

// Render inicial
renderitzar();`,
          codeTitle: "app-render.js",
        },
      ],
      exercise: {
        brief: `<p>Afegeix la funcionalitat de "Netejar completades":</p>
<ul>
  <li>Afegeix un botó a la barra d'eines que digui "Esborrar tasques fetes".</li>
  <li>Només ha d'estar habilitat si com a mínim hi ha una tasca amb <code>feta === true</code>.</li>
  <li>En fer-hi clic, demana una confirmació ràpida amb <code>confirm()</code> i filtra l'array per conservar només les tasques pendents.</li>
  <li>Guarda el resultat a LocalStorage i torna a renderitzar la interfície.</li>
</ul>`,
        hint: `<p>Pots comprovar si hi ha tasques completades amb <code>tasques.some(t => t.feta)</code>.</p>`,
        solution: `<pre><code>function netejarCompletades() {
  if (!tasques.some(t => t.feta)) return;
  if (confirm("Vols eliminar totes les tasques completades?")) {
    tasques = tasques.filter(t => !t.feta);
    guardarTasques();
  }
}</code></pre>`,
      },
    },

    {
      slug: "projecte-api",
      title: "Projecte complet amb API externa",
      summary:
        "Crea una aplicació del temps en temps real amb cerca de ciutats, debounce per optimitzar peticions i icones meteorològiques dinàmiques.",
      goals: [
        "Consultar dades meteorològiques d'una API REST real (Open-Meteo, gratuïta i sense clau).",
        "Implementar una funció de cerca amb <code>debounce</code> per no saturar l'API.",
        "Transformar dades JSON en targetes informatives i pronòstics a 5 dies.",
        "Gestionar estats de càrrega i geolocalització del navegador.",
      ],
      sections: [
        {
          title: "L'API d'Open-Meteo",
          body: `
            <p>Utilitzarem <strong>Open-Meteo</strong>: una API meteorològica oberta i gratuïta que no requereix targeta de crèdit ni clau privada. Primer convertim el nom d'un municipi a coordenades (Geocoding API) i després demanem la predicció meteorològica.</p>
          `,
          lang: "js",
          code: `// 1. Obtenir coordenades (Latitud / Longitud) per nom de ciutat
async function cercarCiutat(nom) {
  const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(nom) + "&count=1&language=ca";
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("No s'ha trobat cap ciutat amb aquest nom.");
  }
  return data.results[0]; // Retorna { name, latitude, longitude, country }
}

// 2. Obtenir el temps actual i predicció
async function obtenirTemps(lat, lon) {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
              "&longitude=" + lon +
              "&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto";
  const res = await fetch(url);
  return await res.json();
}`,
          codeTitle: "api-temps.js",
        },
        {
          title: "Funció Debounce i integració amb l'input",
          body: `
            <p>La tècnica de <strong>debounce</strong> espera que l'usuari deixi d'escriure durant uns mil·lisegons abans d'enviar la petició de xarxa, estalviant trànsit innecessari.</p>
          `,
          lang: "js",
          code: `function debounce(funcio, retard = 400) {
  let temporitzador;
  return function (...arguments) {
    clearTimeout(temporitzador);
    temporitzador = setTimeout(() => funcio.apply(this, arguments), retard);
  };
}

const inputCerca = document.getElementById("cerca-ciutat");
const resultatEl = document.getElementById("temps-info");

async function executarCerca(ciutatNom) {
  if (!ciutatNom.trim()) return;

  resultatEl.textContent = "Consultant meteorologia...";

  try {
    const ciutat = await cercarCiutat(ciutatNom);
    const temps = await obtenirTemps(ciutat.latitude, ciutat.longitude);
    const actual = temps.current_weather;

    resultatEl.innerHTML = \`
      <div class="targeta-temps">
        <h2>\${ciutat.name} (\${ciutat.country || ""})</h2>
        <div class="temperatura">\${actual.temperature} °C</div>
        <p>Vent: \${actual.windspeed} km/h</p>
      </div>
    \`;
  } catch (err) {
    resultatEl.textContent = err.message;
  }
}

inputCerca.addEventListener("input", debounce((e) => {
  executarCerca(e.target.value);
}, 500));`,
          codeTitle: "debounce-cerca.js",
        },
      ],
      exercise: {
        brief: `<p>Afegeix la funció de detecció de localització actual fent servir la <code>Geolocation API</code> del navegador:</p>
<ul>
  <li>Afegeix un botó "Ubicació actual".</li>
  <li>En prémer el botó, crida <code>navigator.geolocation.getCurrentPosition()</code>.</li>
  <li>Passa la latitud i longitud obtingudes directament a la funció <code>obtenirTemps()</code>.</li>
  <li>Si l'usuari rebutja el permís, mostra un missatge indicant que cal autoritzar l'accés a la ubicació.</li>
</ul>`,
        hint: `<p>Verifica primer que el navegador suporta la funcionalitat comprovant <code>if ("geolocation" in navigator)</code>.</p>`,
        solution: `<pre><code>document.getElementById("btn-gps").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("El teu navegador no suporta geolocalització");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      const temps = await obtenirTemps(latitude, longitude);
      renderitzarTemps({ name: "La teva ubicació" }, temps);
    },
    (err) => alert("No s'ha pogut obtenir la ubicació: " + err.message)
  );
});</code></pre>`,
      },
    },

    {
      slug: "desplegament-vercel",
      title: "Desplegament i publicació amb Vercel",
      summary:
        "Publica el teu projecte web a producció de manera gratuïta i automàtica utilitzant Vercel i GitHub amb integració contínua (CI/CD).",
      goals: [
        "Pujar el projecte local a un repositori públic o privat de GitHub.",
        "Connectar el compte de Vercel amb GitHub per gaudir de desplegament continu.",
        "Configurar les variables d'entorn i les rutes de redirecció.",
        "Comprovar el domini públic gratuït <code>.vercel.app</code> i afegir un domini personalitzat.",
      ],
      sections: [
        {
          title: "Què és Vercel i per què és ideal?",
          body: `
            <p>Vercel és la plataforma al núvol líder per a llocs estàtics i aplicacions web modernes. Ofereix una xarxa global de distribució (CDN Edge), certificat SSL gratuït automàtic i desplega una nova versió cada vegada que fas <code>git push</code> a la teva branca principal.</p>
          `,
          table: {
            head: ["Funció", "Avantatge"],
            rows: [
              ["Integració GitHub", "Cada commit a la branca main genera un desplegament de producció."],
              ["Preview Deployments", "Cada Pull Request obté una URL temporal per revisar canvis abans de fusionar."],
              ["SSL / HTTPS", "Certificat de seguretat emès i renovat de manera totalment automàtica."],
              ["Global CDN", "El teu codi es replica en desenes de servidors d'arreu del món per a una càrrega instantània."],
            ],
          },
        },
        {
          title: "Passos per al desplegament pas a pas",
          body: `
            <p>El procediment és molt senzill i es fa en menys de 3 minuts:</p>
            <ol>
              <li><strong>Puja el codi a GitHub:</strong> Assegura't d'haver fet commit i <code>git push</code> del projecte al teu repositori.</li>
              <li><strong>Entra a Vercel:</strong> Inicia sessió a <a href="https://vercel.com" target="_blank" rel="noopener">vercel.com</a> amb el teu compte de GitHub.</li>
              <li><strong>Importa el projecte:</strong> Fes clic al botó <em>Add New... > Project</em> i tria el teu repositori de la llista.</li>
              <li><strong>Configura el Build:</strong>
                <ul>
                  <li>Si és un projecte HTML/CSS/JS estàtic: Vercel ho detecta automàticament com a <em>Other</em>.</li>
                  <li>Si és un projecte amb Vite: Vercel detectarà el Framework <em>Vite</em> amb la carpeta de sortida <code>dist</code>.</li>
                  <li>Si és un projecte amb Astro: Vercel detectarà automàticament la configuració d'Astro.</li>
                </ul>
              </li>
              <li><strong>Fes clic a Deploy:</strong> En uns segons obtindràs la teva URL pública <code>https://el-teu-projecte.vercel.app</code>.</li>
            </ol>
          `,
          lang: "json",
          code: `// vercel.json (opcional, per a configuracions especials com redireccions)
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}`,
          codeTitle: "vercel.json",
          note: `<strong>Desplegament des del terminal (CLI):</strong> També pots instal·lar la comanda de Vercel amb <code>npm i -g vercel</code> i simplement escriure <code>vercel</code> a la carpeta del projecte per desplegar en pocs segons.`,
        },
      ],
      exercise: {
        brief: `<p>Verifica que el teu projecte està preparat per a producció abans de desplegar:</p>
<ul>
  <li>Revisa que totes les rutes a imatges, CSS i JS siguin relatives o comencin amb <code>/</code> correctament.</li>
  <li>Comprova que el títol de la pàgina i les meta tags de descripció estiguin presents a tots els fitxers HTML.</li>
  <li>Afegeix un fitxer <code>robots.txt</code> senzill que permeti la indexació de cercadors.</li>
  <li>Executa la comanda de build localment (si fas servir Vite o Astro) per verificar que no hi ha cap error de sintaxi.</li>
</ul>`,
        hint: `<p>Si fas un build amb Vite o Astro, revisa la carpeta <code>dist/</code> per comprovar que tots els fitxers generats són correctes.</p>`,
        solution: `<pre><code># robots.txt
User-agent: *
Allow: /

# Comanda de comprovació local
npm run build
npm run preview</code></pre>`,
      },
    },

    {
      slug: "desplegament-github-pages",
      title: "Desplegament i publicació a GitHub Pages",
      summary:
        "Com allotjar i publicar la teva pàgina web estàtica directament des del teu repositori de GitHub de manera gratuïta i automatitzada amb GitHub Actions.",
      goals: [
        "Configurar GitHub Pages des dels ajustos (Settings) del repositori.",
        "Publicar projectes directament des de la branca <code>main</code>.",
        "Automatitzar la compilació i publicació mitjançant un flux de treball de GitHub Actions.",
        "Ajustar el camí base (base path) per evitar errors 404 en recursos CSS i JavaScript.",
      ],
      sections: [
        {
          title: "Què és GitHub Pages i com funciona?",
          body: `
            <p><strong>GitHub Pages</strong> és el servei d'allotjament estàtic gratuït integrat directament a GitHub. Permet convertir qualsevol repositori en un lloc web públic accessible des d'un domini amb certificat SSL:</p>
            <ul>
              <li><strong>Web d'usuari:</strong> <code>https://&lt;usuari&gt;.github.io</code> (repositori anomenat exactament <code>&lt;usuari&gt;.github.io</code>).</li>
              <li><strong>Web de projecte:</strong> <code>https://&lt;usuari&gt;.github.io/&lt;nom-repositori&gt;/</code>.</li>
            </ul>
          `,
          table: {
            head: ["Modalitat", "Quan utilitzar-la", "Configuració"],
            rows: [
              ["Deploy from a branch", "Projectes HTML, CSS i JS purs (sense compilació)", "Settings > Pages > Branch main / root"],
              ["GitHub Actions", "Projectes amb pas de build (Vite, Astro, React)", "Settings > Pages > Source: GitHub Actions"],
            ],
          },
        },
        {
          title: "El problema del Camí Base (Base Path)",
          body: `
            <p>En publicar un web de projecte (que s'allotja a una subcarpeta com <code>/el-meu-projecte/</code> i no a l'arrel del domini), les rutes absolutes que comencen amb <code>/styles.css</code> o <code>/src/main.js</code> donaran un error 404 perquè el navegador les buscarà a l'arrel de <code>github.io</code>.</p>
            <p>Cal indicar el <strong>base path</strong> tant a l'empaquetador com als enllaços:</p>
          `,
          lang: "js",
          code: `// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Estableix el nom del teu repositori com a base:
  base: '/el-meu-projecte/',
});

// O si fas servir Astro (astro.config.mjs):
// export default defineConfig({
//   site: 'https://usuari.github.io',
//   base: '/el-meu-projecte',
// });`,
          codeTitle: "vite.config.js",
          note: `<strong>Fitxer .nojekyll:</strong> GitHub Pages activa per defecte el motor Jekyll, que ignora carpetes que comencin per guió baix (com ara <code>_astro/</code>). Afegeix un fitxer buit anomenat <code>.nojekyll</code> a la carpeta de sortida o a l'arrel pública per desactivar-lo.`,
        },
        {
          title: "Automatització completa amb GitHub Actions",
          body: `
            <p>Per a projectes amb eina de construcció, creem un flux de treball (workflow) a <code>.github/workflows/deploy.yml</code> que compila i publica el web automàticament a cada <code>git push</code>.</p>
          `,
          lang: "yaml",
          code: `name: Desplegar a GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Baixar codi
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Instal·lar dependències
        run: npm ci

      - name: Compilar projecte
        run: npm run build

      - name: Configurar pàgines
        uses: actions/configure-pages@v4

      - name: Pujar artefacte (dist)
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Desplegar a GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`,
          codeTitle: ".github/workflows/deploy.yml",
        },
      ],
      exercise: {
        brief: `<p>Prepara la configuració necessària per desplegar una aplicació Vite a GitHub Pages:</p>
<ul>
  <li>Modifica <code>vite.config.js</code> establint la propietat <code>base</code> amb el nom del teu repositori.</li>
  <li>Crea l'estructura de carpetes <code>.github/workflows/deploy.yml</code> per al workflow d'Actions.</li>
  <li>Afegeix l'script <code>"deploy": "gh-pages -d dist"</code> al teu <code>package.json</code> com a mètode manual alternatiu.</li>
  <li>Assegura't que el fitxer <code>.nojekyll</code> s'inclou a la carpeta <code>public/</code> perquè estigui present al <code>dist/</code> final.</li>
</ul>`,
        hint: `<p>Recorda anar a <em>Settings > Pages</em> a GitHub i seleccionar com a Source: <strong>GitHub Actions</strong>.</p>`,
        solution: `<pre><code># Crear fitxer .nojekyll a la carpeta pública
touch public/.nojekyll

# vite.config.js
import { defineConfig } from 'vite';
export default defineConfig({
  base: '/nom-repositori/',
});</code></pre>`,
      },
    },
  ],
};

