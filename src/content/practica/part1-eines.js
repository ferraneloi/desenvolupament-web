export default {
  title: "Eines de desenvolupament i flux de treball",
  description:
    "El conjunt d'eines essencials per a qualsevol desenvolupador web: control de versions amb Git i GitHub, configuració de VS Code, depuració amb Chrome DevTools, arquitectura de projectes i consum d'APIs.",
  chapters: [
    {
      slug: "git-github",
      title: "Git i GitHub: control de versions",
      summary:
        "Aprèn a utilitzar Git des del terminal per guardar l'historial del teu codi, treballar amb branques i publicar projectes a GitHub.",
      goals: [
        "Comprendre el funcionament del control de versions distribuït.",
        "Executar les comandes essencials: <code>init</code>, <code>add</code>, <code>commit</code>, <code>status</code> i <code>log</code>.",
        "Gestionar branques amb <code>branch</code> i <code>checkout</code> o <code>switch</code>.",
        "Connectar un repositori local amb GitHub i fer <code>push</code> i <code>pull</code>.",
      ],
      sections: [
        {
          title: "Què és Git i per què és indispensable?",
          body: `
            <p>Git és un sistema de control de versions distribuït creat per Linus Torvalds el 2005. Permet registrar cada canvi que fas en el codi, revertir errors en qualsevol moment i col·laborar amb altres desenvolupadors sense risc de sobreescriure la feina dels altres.</p>
            <p>A diferència de desar fitxers com <code>projecte_v2_final_definitiu.zip</code>, Git pren captures (commits) de l'estat del teu projecte al llarg del temps.</p>
          `,
          table: {
            head: ["Concepte", "Descripció"],
            rows: [
              ["Working Directory", "Els fitxers reals a la teva carpeta de treball."],
              ["Staging Area (Index)", "L'àrea de preparació on afegeixes canvis abans de confirmar-los."],
              ["Repository (.git)", "La base de dades local on es guarden tots els commits."],
              ["Remote (GitHub)", "Còpia del repositori al núvol per a còpia de seguretat i col·laboració."],
            ],
          },
        },
        {
          title: "Flux de treball bàsic: de local a commit",
          body: `
            <p>Per començar a fer seguiment d'una carpeta, inicialitzem Git amb <code>git init</code>. Després preparem els fitxers i creem commits amb missatges clars i descriptius.</p>
          `,
          lang: "sh",
          code: `# 1. Configurar la identitat (només cal fer-ho un cop)
git config --global user.name "El Teu Nom"
git config --global user.email "el-teu-email@exemple.cat"

# 2. Inicialitzar un nou repositori a la carpeta actual
git init

# 3. Comprovar l'estat dels fitxers
git status

# 4. Afegir fitxers a l'àrea de preparació (staging)
git add index.html
git add styles.css
# O afegir tots els fitxers modificats:
git add .

# 5. Crear un commit amb un missatge descriptiu
git commit -m "feat: afegeix estructura inicial i estils del hero"

# 6. Veure l'historial de canvis
git log --oneline`,
          codeTitle: "terminal",
          note: `<strong>Bona pràctica:</strong> Crea un fitxer <code>.gitignore</code> a l'arrel del projecte per indicar a Git quins fitxers i carpetes no ha de seguir mai (com ara <code>node_modules/</code>, fitxers <code>.env</code> amb claus secretes o fitxers de sistema).`,
        },
        {
          title: "Branques (branches) i col·laboració a GitHub",
          body: `
            <p>Les branques permeten desenvolupar funcionalitats noves o corregir errors de manera aïllada sense afectar la branca principal (<code>main</code>).</p>
            <p>Un cop la funcionalitat està provada, es fusiona (<code>merge</code>) amb la branca principal o s'obre una <em>Pull Request</em> a GitHub.</p>
          `,
          lang: "sh",
          code: `# Crear una nova branca i canviar-hi
git switch -c nova-funcionalitat
# (O la comanda clàssica: git checkout -b nova-funcionalitat)

# Treballar, fer canvis i confirmar-los
git add .
git commit -m "feat: afegeix formulari de contacte"

# Tornar a la branca principal
git switch main

# Fusionar els canvis de la nova branca
git merge nova-funcionalitat

# Connectar amb un repositori remot a GitHub
git remote add origin https://github.com/usuari/el-meu-projecte.git
git branch -M main
git push -u origin main

# Descarregar canvis del remot
git pull origin main`,
          codeTitle: "git-branches.sh",
        },
      ],
      exercise: {
        brief: `<p>Configura un repositori Git local per a un projecte senzill:</p>
<ul>
  <li>Crea una carpeta de projecte amb un <code>index.html</code> i un <code>styles.css</code>.</li>
  <li>Crea un fitxer <code>.gitignore</code> que ignori fitxers <code>.DS_Store</code> i la carpeta <code>dist/</code>.</li>
  <li>Inicialitza el repositori, fes el primer commit amb missatge convencional.</li>
  <li>Crea una branca anomenada <code>afegir-footer</code>, afegeix un peu de pàgina a l'HTML, fes commit i fusiona'l a <code>main</code>.</li>
</ul>`,
        hint: `<p>Utilitza <code>git status</code> després de cada pas per verificar en quin estat es troben els fitxers i a quina branca ets.</p>`,
        solution: `<pre><code>mkdir el-meu-web && cd el-meu-web
git init
echo "dist/\n.DS_Store" > .gitignore
touch index.html styles.css
git add .
git commit -m "chore: estructura inicial"
git switch -c afegir-footer
# Edita index.html afegint &lt;footer&gt;
git add index.html
git commit -m "feat: afegeix footer accessible"
git switch main
git merge afegir-footer</code></pre>`,
      },
    },

    {
      slug: "vscode-eines",
      title: "VS Code i eines de desenvolupament",
      summary:
        "Domina Visual Studio Code: configuració professional, dreceres de teclat, extensions imprescindibles i linters.",
      goals: [
        "Configurar VS Code per a desenvolupament web modern.",
        "Instal·lar i configurar extensions essencials (Prettier, ESLint, Live Server).",
        "Utilitzar dreceres de teclat per multiplicar la productivitat.",
        "Automatitzar el formatat de codi en desar.",
      ],
      sections: [
        {
          title: "Configuració recomanada de VS Code",
          body: `
            <p>Visual Studio Code és l'editor de codi més utilitzat en la indústria. Amb una configuració adequada, s'elimina la fricció en escriure codi i s'eviten errors comuns de sintaxi i estil.</p>
            <p>Pots desar la configuració a nivell de projecte creant la carpeta <code>.vscode/</code> amb el fitxer <code>settings.json</code>.</p>
          `,
          lang: "json",
          code: `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.cursorBlinking": "smooth",
  "editor.bracketPairColorization.enabled": true,
  "files.autoSave": "onFocusChange",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}`,
          codeTitle: ".vscode/settings.json",
        },
        {
          title: "Extensions imprescindibles",
          body: `
            <p>Les extensions afegeixen superpoders a l'editor:</p>
            <ul>
              <li><strong>Prettier - Code formatter:</strong> Formata automàticament HTML, CSS, JS i JSON seguint regles consistents.</li>
              <li><strong>Live Server:</strong> Aixeca un servidor de desenvolupament local amb recàrrega en calent (Hot Reload).</li>
              <li><strong>ESLint:</strong> Analitza el codi JavaScript en temps real a la cerca de possibles errors o males pràctiques.</li>
              <li><strong>Tailwind CSS IntelliSense:</strong> Autocompletat i previsualització de classes CSS de Tailwind.</li>
              <li><strong>Auto Rename Tag:</strong> Reanomena automàticament l'etiqueta HTML de tancament quan modifiques l'etiqueta d'obertura.</li>
            </ul>
          `,
          lang: "json",
          code: `// .prettierrc (fitxer de configuració de Prettier a l'arrel)
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}`,
          codeTitle: ".prettierrc",
        },
        {
          title: "Dreceres de teclat per guanyar agilitat",
          body: `
            <p>Aprendre unes quantes dreceres de teclat estalvia hores de feina al llarg d'una setmana:</p>
          `,
          table: {
            head: ["Drecera (Windows/Linux)", "Drecera (macOS)", "Acció"],
            rows: [
              ["Ctrl + P", "Cmd + P", "Obrir qualsevol fitxer pel seu nom"],
              ["Ctrl + Shift + P", "Cmd + Shift + P", "Paleta de comandes (totes les accions)"],
              ["Alt + ↑ / ↓", "Option + ↑ / ↓", "Moure la línia actual amunt o avall"],
              ["Shift + Alt + ↓", "Shift + Option + ↓", "Duplicar la línia cap avall"],
              ["Ctrl + D", "Cmd + D", "Seleccionar la següent coincidència de la paraula"],
              ["Ctrl + /", "Cmd + /", "Comentar o descomentar línies"],
              ["Ctrl + `", "Cmd + `", "Obrir o tancar el terminal integrat"],
            ],
          },
        },
      ],
      exercise: {
        brief: `<p>Prepara un entorn de treball a VS Code per a un nou projecte web:</p>
<ul>
  <li>Crea la carpeta <code>.vscode/settings.json</code> amb formatat automàtic en desar (formatOnSave).</li>
  <li>Afegeix un fitxer <code>.prettierrc</code> amb configuració estàndard.</li>
  <li>Crea un fitxer <code>index.html</code> i utilitza Emmet escrivint <code>!</code> seguit de <code>Tab</code> per generar l'esquelet HTML5.</li>
  <li>Obre el terminal integrat i inicia Live Server o un servidor local.</li>
</ul>`,
        hint: `<p>A l'HTML, prova escriure dreceres d'Emmet com <code>nav>ul>li*3>a</code> i prem Tab per veure com es desplega en codi complet a l'instant.</p>`,
        solution: `<pre><code>// Estructura creada:
// .vscode/settings.json
// .prettierrc
// index.html (amb Emmet: ! generant l'esquelet complet)</code></pre>`,
      },
    },

    {
      slug: "devtools",
      title: "Chrome DevTools i depuració web",
      summary:
        "Utilitza les eines de desenvolupador del navegador per inspeccionar el DOM, analitzar estils, depurar JavaScript amb punts de ruptura i auditar el rendiment.",
      goals: [
        "Inspeccionar i editar en directe elements HTML i regles CSS.",
        "Treballar amb la Consola per executar expressions i veure logs.",
        "Depurar codi pas a pas mitjançant punts de ruptura (breakpoints).",
        "Analitzar peticions de xarxa al panell Network.",
      ],
      sections: [
        {
          title: "El panell Elements i el Box Model",
          body: `
            <p>Prem <kbd>F12</kbd> o <kbd>Ctrl+Shift+I</kbd> per obrir DevTools. El panell <strong>Elements</strong> mostra l'arbre DOM actual (que reflecteix tant l'HTML inicial com qualsevol modificació feta per JavaScript).</p>
            <ul>
              <li>Fes doble clic a qualsevol text o atribut per editar-lo en directe.</li>
              <li>A la pestanya <em>Styles</em> pots afegir noves propietats, activar o desactivar regles existents i forçar pseudo-classes com <code>:hover</code> o <code>:focus</code>.</li>
              <li>A la part inferior trobaràs la representació visual del <strong>Box Model</strong>: content, padding, border i margin amb les mides exactes en píxels.</li>
            </ul>
          `,
          lang: "html",
          code: `<!-- Prova a inspeccionar aquest botó a DevTools -->
<button id="demo-btn" class="boto-accio">
  Clica'm per provar
</button>

<style>
  .boto-accio {
    padding: 12px 24px;
    background-color: #2563eb;
    color: white;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  .boto-accio:hover {
    background-color: #1d4ed8;
  }
</style>`,
          codeTitle: "exemple-devtools.html",
        },
        {
          title: "Consola avançada: més enllà de console.log",
          body: `
            <p>La consola no només serveix per imprimir text; té mètodes especialitzats per estructurar la informació i mesurar el rendiment:</p>
          `,
          lang: "js",
          code: `// Mostrar dades tabulars amb format de taula
const usuaris = [
  { id: 1, nom: "Marta", rol: "Admin" },
  { id: 2, nom: "Oriol", rol: "Editor" },
  { id: 3, nom: "Laia", rol: "Usuària" },
];
console.table(usuaris);

// Advertències i errors amb stack trace
console.warn("Avís: la clau expirarà aviat");
console.error("Error: no s'ha pogut carregar el recurs");

// Mesurar el temps d'execució d'un bloc de codi
console.time("calcul-fibonacci");
function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2); }
fib(25);
console.timeEnd("calcul-fibonacci"); // Mostra: calcul-fibonacci: X.XX ms

// Agrupar logs relacionats
console.group("Inici de sessió");
console.log("Comprovant credencials...");
console.log("Token generat correctament");
console.groupEnd();`,
          codeTitle: "console-api.js",
        },
        {
          title: "Depuració amb Breakpoints al panell Sources",
          body: `
            <p>Substitueix els <code>console.log</code> per punts de ruptura al panell <strong>Sources</strong> o amb la paraula clau <code>debugger;</code> al teu codi.</p>
            <p>Quan el navegador arriba al punt de ruptura, l'execució es pausa i pots:</p>
            <ul>
              <li>Inspeccionar el valor de totes les variables en aquell instant precís (Scope).</li>
              <li>Avançar línia a línia (<em>Step over</em>, <kbd>F10</kbd>).</li>
              <li>Entrar dins d'una funció (<em>Step into</em>, <kbd>F11</kbd>).</li>
              <li>Veure la pila de crides (Call Stack).</li>
            </ul>
          `,
          lang: "js",
          code: `function calcularPreuFinal(preuBase, descomptePercent) {
  // En lloc de posar console.log, pots aturar l'execució aquí:
  debugger;

  const descompte = (preuBase * descomptePercent) / 100;
  const preuAmbDescompte = preuBase - descompte;
  const iva = preuAmbDescompte * 0.21;
  return preuAmbDescompte + iva;
}

const total = calcularPreuFinal(120, 15);
console.log("Total calculat:", total);`,
          codeTitle: "debugger-demo.js",
        },
      ],
      exercise: {
        brief: `<p>Obre les DevTools del teu navegador en aquesta mateixa pàgina:</p>
<ul>
  <li>Inspecciona el títol principal i canvia-li el color de text directament des del panell Styles.</li>
  <li>Obre la consola i executa <code>console.table()</code> amb un array de 3 objectes que continguin les propietats <code>nom</code>, <code>llenguatge</code> i <code>any</code>.</li>
  <li>Canvia la vista a mode dispositiu mòbil (<kbd>Ctrl+Shift+M</kbd>) i comprova com respon la barra de navegació superior.</li>
  <li>Al panell Network, fes un reload amb Shift premut i observa quins recursos tarden més en descarregar-se.</li>
</ul>`,
        hint: `<p>A la pestanya Network pots filtrar per tipus de recurs: Fetch/XHR, JS, CSS, Img per trobar ràpidament el que busques.</p>`,
        solution: `<pre><code>// A la consola de DevTools:
console.table([
  { nom: "HTML5", llenguatge: "Marcat", any: 2014 },
  { nom: "CSS3", llenguatge: "Estils", any: 1996 },
  { nom: "JavaScript", llenguatge: "Programació", any: 1995 }
]);</code></pre>`,
      },
    },

    {
      slug: "estructura-projecte",
      title: "Estructura d'un projecte web modern",
      summary:
        "Com organitzar carpetes, fitxers i mòduls en projectes reals, i com utilitzar Vite com a servidor i empaquetador ultraràpid.",
      goals: [
        "Dissenyar una estructura de carpetes escalable i coherent.",
        "Distingir entre codi font (src) i distribució compilada (dist o build).",
        "Utilitzar Vite per aixecar projectes amb suport de mòduls nadius.",
        "Gestionar fitxers estàtics com imatges, fonts i icones.",
      ],
      sections: [
        {
          title: "Arquitectura estàndard de directoris",
          body: `
            <p>A mesura que un projecte creix, tenir tot el codi a l'arrel esdevé caòtic. L'arquitectura estàndard separa el codi font editable (<code>src/</code>) dels fitxers públics directes (<code>public/</code>) i dels fitxers generats pel build (<code>dist/</code>).</p>
          `,
          lang: "text",
          code: `meu-projecte-web/
├── public/                # Fitxers estàtics servits tal qual (robots.txt, favicon.ico)
│   ├── favicon.svg
│   └── images/
├── src/                   # Codi font de l'aplicació
│   ├── assets/            # Imatges i fonts processades pel bundler
│   ├── components/        # Components visuals reutilitzables (botons, targetes, modal)
│   ├── styles/            # Fulls d'estil globals i variables
│   │   ├── main.css
│   │   └── variables.css
│   ├── js/                # Lògica de negoci i mòduls JavaScript
│   │   ├── api.js         # Crides a serveis externs
│   │   ├── storage.js     # Gestió de persistència
│   │   └── utils.js       # Funcions auxiliars pures
│   └── main.js            # Punt d'entrada de l'aplicació
├── index.html             # Pàgina HTML principal
├── package.json           # Dependències i scripts del projecte
├── .gitignore             # Fitxers ignorats per Git
└── README.md              # Documentació i instruccions del projecte`,
          codeTitle: "Estructura de fitxers",
        },
        {
          title: "Vite: L'eina de desenvolupament moderna",
          body: `
            <p>En el passat, eines com Webpack trigaven segons a reiniciar el servidor a cada canvi. <strong>Vite</strong> utilitza mòduls ES nadius al navegador durant el desenvolupament, oferint un inici instantani i recàrrega ultraràpida (HMR: Hot Module Replacement).</p>
          `,
          lang: "sh",
          code: `# Crear un projecte nou amb Vite (Vanilla JS)
npm create vite@latest el-meu-app -- --template vanilla

# Entrar a la carpeta
cd el-meu-app

# Instal·lar les dependències
npm install

# Iniciar el servidor de desenvolupament local (http://localhost:5173)
npm run dev

# Generar la versió de producció optimitzada (carpeta dist/)
npm run build

# Previsualitzar el resultat de producció localment
npm run preview`,
          codeTitle: "terminal",
        },
      ],
      exercise: {
        brief: `<p>Organitza l'estructura de fitxers d'un portal de notícies:</p>
<ul>
  <li>Crea l'arbre de carpetes <code>src/components</code>, <code>src/styles</code> i <code>src/js</code>.</li>
  <li>Crea un fitxer <code>src/js/utils.js</code> que exporti una funció <code>formatData(data)</code> utilitzant <code>Intl.DateTimeFormat</code> en català.</li>
  <li>Importa i utilitza aquesta funció a <code>src/main.js</code>.</li>
</ul>`,
        hint: `<p>A l'<code>index.html</code>, recorda carregar el fitxer principal amb <code>&lt;script type="module" src="/src/main.js"&gt;&lt;/script&gt;</code> perquè el navegador entengui els <code>import</code> i <code>export</code>.</p>`,
        solution: `<pre><code>// src/js/utils.js
export function formatData(data) {
  return new Intl.DateTimeFormat('ca-ES', {
    dateStyle: 'long'
  }).format(new Date(data));
}

// src/main.js
import { formatData } from './js/utils.js';
console.log(formatData(new Date()));</code></pre>`,
      },
    },

    {
      slug: "consum-apis",
      title: "Consum d'APIs REST i dades remotes",
      summary:
        "Com connectar la teva aplicació amb servidors externs fent servir Fetch API, gestionar estats de càrrega i error, i tractar dades JSON de manera segura.",
      goals: [
        "Entendre què és una API REST i els codis d'estat HTTP habituals.",
        "Demanar dades amb <code>fetch()</code> i <code>async/await</code>.",
        "Gestionar el cicle de vida d'una petició: càrrega (loading), èxit i error.",
        "Comprendre el concepte de CORS i com gestionar claus d'API.",
      ],
      sections: [
        {
          title: "Què és una API REST?",
          body: `
            <p>Una API (Application Programming Interface) permet que dues aplicacions es comuniquin. En la web, les APIs REST utilitzen el protocol HTTP per intercanviar informació, normalment en format <strong>JSON</strong>.</p>
          `,
          table: {
            head: ["Mètode HTTP", "Acció", "Exemple d'ús"],
            rows: [
              ["GET", "Obtenir dades", "Llegir la llista d'articles o un usuari."],
              ["POST", "Crear un nou recurs", "Enviar un nou comentari o registrar-se."],
              ["PUT / PATCH", "Actualitzar un recurs", "Modificar el perfil o editar un missatge."],
              ["DELETE", "Eliminar un recurs", "Esborrar una tasca o un article."],
            ],
          },
        },
        {
          title: "El patró complet de petició amb gestió d'estats",
          body: `
            <p>En crear una interfície d'usuari, mai no podem assumir que la xarxa funcionarà a l'instant. Sempre cal mostrar a l'usuari si les dades estan carregant, si hi ha hagut un error o si tot ha anat bé.</p>
          `,
          lang: "js",
          code: `const estatEl = document.getElementById("estat");
const llistaEl = document.getElementById("llista");

async function carregarUsuaris() {
  // 1. Estat de càrrega: donar feedback visual
  estatEl.textContent = "Carregant dades del servidor...";
  estatEl.className = "text-muted";
  llistaEl.innerHTML = "";

  try {
    const resposta = await fetch("https://jsonplaceholder.typicode.com/users");

    // 2. Comprovar si el servidor ha respost amb un codi 2xx
    if (!resposta.ok) {
      throw new Error("Error HTTP: " + resposta.status);
    }

    // 3. Parsejar el cos de la resposta com a JSON
    const usuaris = await resposta.json();

    // 4. Estat d'èxit: renderitzar dades
    estatEl.textContent = "";
    usuaris.forEach((usuari) => {
      const li = document.createElement("li");
      li.innerHTML = "<strong>" + usuari.name + "</strong> (" + usuari.email + ")";
      llistaEl.appendChild(li);
    });
  } catch (error) {
    // 5. Estat d'error: comunicar el problema amb claredat
    estatEl.textContent = "No s'han pogut carregar les dades: " + error.message;
    estatEl.className = "text-error";
  }
}

carregarUsuaris();`,
          codeTitle: "api-fetch.js",
        },
      ],
      exercise: {
        brief: `<p>Crea una funció que demani dades a una API pública (com ara <code>https://api.github.com/users/octocat</code>):</p>
<ul>
  <li>Mentre la petició estigui en curs, mostra un missatge o spinner de càrrega.</li>
  <li>Si la resposta és correcta, mostra l'avatar de l'usuari (<code>avatar_url</code>), el nom i el nombre de repositoris públics (<code>public_repos</code>).</li>
  <li>Si l'usuari no existeix (HTTP 404) o la connexió falla, mostra un missatge d'error amigable.</li>
</ul>`,
        hint: `<p>Comprova <code>resposta.status === 404</code> per donar un missatge específic com "Usuari de GitHub no trobat".</p>`,
        solution: `<pre><code>async function cercarGithub(usuari) {
  const container = document.getElementById("perfil");
  container.textContent = "Cercant...";
  try {
    const res = await fetch("https://api.github.com/users/" + usuari);
    if (res.status === 404) throw new Error("Usuari inexistent");
    if (!res.ok) throw new Error("Error en la xarxa");
    const data = await res.json();
    container.innerHTML = "&lt;img src='" + data.avatar_url + "' width='80'&gt;&lt;h3&gt;" + data.name + "&lt;/h3&gt;&lt;p&gt;Repos: " + data.public_repos + "&lt;/p&gt;";
  } catch (err) {
    container.textContent = err.message;
  }
}</code></pre>`,
      },
    },
  ],
};

