export default {
  title: "Eines avançades i qualitat",
  description:
    "Mòduls, iteradors, col·leccions, errors, rendiment i proves: el que separa un script d'un projecte.",
  chapters: [
    {
      slug: "moduls",
      title: "Mòduls ES6 i organització del codi",
      summary:
        "Dividir el projecte en fitxers, exportar el que cal i importar només el que es fa servir.",
      goals: [
        "Exportar amb <code>export</code> i importar amb <code>import</code>.",
        "Distingir exportació amb nom i per defecte.",
        "Carregar mòduls des de l'HTML.",
      ],
      sections: [
        {
          title: "Exportar i importar",
          body: `
            <p>Un mòdul és un fitxer amb el seu propi àmbit: res del que declara no és global. El que vulguis compartir ho has d'exportar.</p>
            <p>L'exportació amb nom permet diverses per fitxer; la per defecte, només una.</p>
          `,
          lang: "js",
          code: `// util.js
export const IVA = 0.21;

export function ambIVA(preu) {
  return preu * (1 + IVA);
}

export default function formata(numero) {
  return numero.toFixed(2) + " €";
}

// app.js
import formata, { ambIVA } from "./util.js";

console.log(formata(ambIVA(100)));`,
        },
        {
          title: "Renombrar i importar tot",
          body: `
            <p>Pots renombrar amb <code>as</code> i importar-ho tot en un objecte amb <code>* as</code>. També hi ha la càrrega dinàmica amb <code>import()</code>, que retorna una promesa.</p>
          `,
          lang: "js",
          code: `// geometria.js
export const areaQuadrat = (c) => c ** 2;
export const areaCercle = (r) => Math.PI * r ** 2;
export const PUNTUACIO = 10;

// app.js
import * as geo from "./geometria.js";

console.log(geo.areaQuadrat(3));
console.log(geo.PUNTUACIO);

import("./geometria.js").then((modul) => {
  console.log(modul.areaCercle(2).toFixed(2));
});`,
        },
        {
          title: "A l'HTML",
          body: `
            <p>Per fer servir mòduls al navegador cal declarar el script amb el tipus <em>module</em>. Els mòduls s'executen amb <code>defer</code> implícit i no comparteixen res amb els scripts clàssics.</p>
          `,
          lang: "html",
          code: `<script type="module" src="app.js"></script>

<script type="module">
  import { ambIVA } from "./util.js";
  console.log(ambIVA(50));
</script>

<script type="module">
  // El codi del mòdul no és global
  console.log(typeof ambIVA);
</script>`,
        },
      ],
      exercise: {
        brief:
          "Divideix un projecte en dos fitxers: un amb constants i funcions de càlcul i un altre que les importi i mostri el resultat per consola.",
        hint: "Per provar-ho al navegador cal el tipus de script mòdul i rutes relatives correctes.",
      },
    },
    {
      slug: "iteradors-generadors",
      title: "Iteradors i generadors",
      summary:
        "Produir valors d'un en un, amb pausa: <code>function*</code> i <code>yield</code>.",
      goals: [
        "Entendre el protocol d'iteració.",
        "Escriure un generador.",
        "Fer servir generadors per a seqüències infinites.",
      ],
      sections: [
        {
          title: "El protocol",
          body: `
            <p>Un objecte és iterable si té un mètode <code>Symbol.iterator</code> que retorna un iterador amb <code>next()</code>. Aquest mètode retorna <code>{ value, done }</code>.</p>
            <p><code>for...of</code>, <code>spread</code> i la desestructuració funcionen amb qualsevol iterable.</p>
          `,
          lang: "js",
          code: `const iterador = [10, 20, 30][Symbol.iterator]();

console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());

const manual = {
  [Symbol.iterator]() {
    let n = 0;
    return {
      next: () => (n < 3 ? { value: n++, done: false } : { value: undefined, done: true }),
    };
  },
};

console.log([...manual]);`,
        },
        {
          title: "Generadors",
          body: `
            <p>Una funció amb <code>*</code> es pausa a cada <code>yield</code> i continua quan li ho demanes. El codi queda com una funció normal que retorna valors un a un.</p>
          `,
          lang: "js",
          code: `function* comptador(fins) {
  for (let i = 1; i <= fins; i++) {
    yield i;
  }
}

const gen = comptador(3);
console.log(gen.next());
console.log(gen.next());

for (const n of comptador(5)) {
  if (n % 2 === 0) console.log("parell:", n);
}

console.log([...comptador(4)]);`,
        },
        {
          title: "Seqüències infinites",
          body: `
            <p>Com que el generador només calcula el que li demanes, pots tenir seqüències infinites sense omplir la memòria. És la diferència amb crear un array enorme amb <code>map</code>.</p>
          `,
          lang: "js",
          code: `function* naturals() {
  let n = 0;
  while (true) {
    yield n++;
  }
}

const infinits = naturals();
console.log(infinits.next().value);
console.log(infinits.next().value);
console.log(infinits.next().value);

function* parells() {
  for (const n of naturals()) {
    if (n % 2 === 0) yield n;
  }
}

const p = parells();
console.log([p.next().value, p.next().value, p.next().value]);`,
        },
      ],
      exercise: {
        brief:
          "Escriu un generador que retorni els múltiples de 3 fins a un límit, i recorre'l amb <code>for...of</code>.",
        hint: "Fes servir <code>yield</code> dins del bucle i no retornis res al final.",
      },
    },
    {
      slug: "symbols-maps-sets",
      title: "Symbols, Maps i Sets",
      summary:
        "Tres tipus de dades que resolen problemes concrets: claus úniques, diccionaris i valors sense duplicats.",
      goals: [
        "Crear i fer servir <code>Symbol</code>.",
        "Guardar parells amb <code>Map</code>.",
        "Eliminar duplicats amb <code>Set</code>.",
      ],
      sections: [
        {
          title: "Symbol",
          body: `
            <p>Un símbol és un valor únic i immutable, útil com a clau que ningú pot sobreescriure per accident. No apareix en un <code>for...in</code> ni a <code>Object.keys</code>.</p>
          `,
          lang: "js",
          code: `const id = Symbol("id");
const altre = Symbol("id");

const usuari = { nom: "Ada", [id]: 123 };

console.log(usuari[id]);
console.log(id === altre);
console.log(Object.keys(usuari));
console.log(typeof id);`,
        },
        {
          title: "Map",
          body: `
            <p><code>Map</code> és un diccionari que admet claus de qualsevol tipus, conserva l'ordre d'inserció i té mètodes clars: <code>set</code>, <code>get</code>, <code>has</code>, <code>delete</code>, <code>size</code>.</p>
            <p>A diferència d'un objecte, una clau pot ser un objecte o una funció.</p>
          `,
          lang: "js",
          code: `const notes = new Map();

notes.set("Ada", 9);
notes.set("Alan", 4);
notes.set("Grace", 7);

console.log(notes.size);
console.log(notes.get("Ada"));
console.log(notes.has("Alan"));

for (const [nom, nota] of notes) {
  console.log(nom, nota);
}

notes.delete("Alan");
console.log([...notes.keys()]);`,
        },
        {
          title: "Set",
          body: `
            <p>Un <code>Set</code> és una col·lecció sense duplicats. És la manera més ràpida d'eliminar repetits d'un array: <code>[...new Set(array)]</code>.</p>
            <p>També serveix per comprovar pertinença amb <code>has()</code>, que és més ràpid que <code>includes()</code> en col·leccions grans.</p>
          `,
          lang: "js",
          code: `const nums = [1, 2, 2, 3, 3, 3];

const unics = [...new Set(nums)];
console.log(unics);

const conjunt = new Set(["a", "b"]);
conjunt.add("c");
console.log(conjunt.has("b"));
console.log(conjunt.size);

const paraules = "hola món hola".split(" ");
console.log([...new Set(paraules)]);`,
        },
      ],
      exercise: {
        brief:
          "Donat un array de noms amb repetits, obtén la llista sense duplicats i compta quantes vegades apareix cada nom amb un <code>Map</code>.",
        hint: "Recorre l'array i fes <code>mapa.set(nom, (mapa.get(nom) || 0) + 1)</code>.",
      },
    },
    {
      slug: "errors-debugging",
      title: "Gestió d'errors i depuració",
      summary:
        "Quan alguna cosa falla: llançar, capturar i trobar la causa sense endevinar.",
      goals: [
        "Llançar errors amb <code>throw</code>.",
        "Capturar amb <code>try/catch/finally</code>.",
        "Depurar amb la consola i punts de ruptura.",
      ],
      sections: [
        {
          title: "Llançar i capturar",
          body: `
            <p>Un error s'ha de llançar quan una funció no pot complir la seva promesa. Llança objectes <code>Error</code>, no textos: tenen missatge i traça.</p>
            <p>Captura només on pots fer-hi alguna cosa: recuperar-te, informar l'usuari o registrar-ho.</p>
          `,
          lang: "js",
          code: `function divideix(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Calen dos números");
  }
  if (b === 0) throw new RangeError("No es pot dividir per zero");
  return a / b;
}

try {
  console.log(divideix(10, 2));
  console.log(divideix(10, 0));
} catch (error) {
  console.log(error.name + ": " + error.message);
} finally {
  console.log("Fi del càlcul");
}`,
        },
        {
          title: "Tipus d'error",
          body: `
            <p>Els més habituals: <code>TypeError</code> (una operació sobre un valor del tipus equivocat), <code>ReferenceError</code> (variable inexistent), <code>SyntaxError</code> (codi mal escrit) i <code>RangeError</code> (fora de límit).</p>
            <p><code>error.name</code> i <code>error.message</code> són el primer que has de mirar.</p>
          `,
          lang: "js",
          code: `const casos = [
  () => null.propietat,
  () => variableInexistent,
  () => new Array(-1),
];

casos.forEach((fn, i) => {
  try {
    fn();
  } catch (error) {
    console.log(i + 1, error.name, "-", error.message);
  }
});`,
        },
        {
          title: "Depurar",
          body: `
            <p>La consola té més que <code>log</code>: <code>table</code> per a arrays, <code>group</code> per agrupar, <code>time</code> per mesurar i <code>trace</code> per veure la pila.</p>
            <p>Els punts de ruptura de les eines del navegador són més potents que qualsevol <code>console.log</code>: aturen el codi i et deixen inspeccionar les variables.</p>
          `,
          lang: "js",
          code: `const alumnes = [
  { nom: "Ada", nota: 9 },
  { nom: "Alan", nota: 4 },
];

console.table(alumnes);

console.group("Càlculs");
console.time("bucle");
let total = 0;
for (let i = 0; i < 1000; i++) total += i;
console.timeEnd("bucle");
console.groupEnd();

console.assert(total > 0, "El total hauria de ser positiu");`,
        },
      ],
      exercise: {
        brief:
          "Escriu una funció que validi un correu i llanci un <code>Error</code> amb un missatge clar si no és vàlid. Captura'l i mostra el missatge.",
        hint: "Comprova que contingui una arrova i un punt després, i llança <code>Error</code> amb un text comprensible.",
      },
    },
    {
      slug: "rendiment",
      title: "Rendiment i bones pràctiques",
      summary:
        "Fer menys feina, fer-la més tard i fer-la una sola vegada: els tres principis del codi ràpid.",
      goals: [
        "Evitar treball repetit dins de bucles.",
        "Limitar la modificació del DOM.",
        "Aplicar <em>debounce</em> a esdeveniments freqüents.",
      ],
      sections: [
        {
          title: "Menys feina",
          body: `
            <p>Calcula fora del bucle el que no canvia, evita cerques al DOM dins de bucles i desa les referències en variables.</p>
            <p>Les estructures adequades també compten: <code>Set</code> i <code>Map</code> per a pertinença, <code>Map</code> per a agrupacions.</p>
          `,
          lang: "js",
          code: `const items = Array.from({ length: 5 }, (_, i) => i + 1);

let total = 0;
for (const n of items) {
  total += n;
}
console.log(total);

const notes = ["Ada", "Alan", "Ada", "Grace", "Ada"];
const comptador = new Map();
for (const n of notes) {
  comptador.set(n, (comptador.get(n) ?? 0) + 1);
}
console.log([...comptador]);`,
        },
        {
          title: "El DOM és car",
          body: `
            <p>Cada modificació del DOM pot forçar un recàlcul del disseny. Agrupa canvis amb <code>DocumentFragment</code>, canvia classes en lloc d'estils individuals i evita llegir i escriure alternativament.</p>
          `,
          lang: "html",
          code: `<ul id="llista"></ul>

<script>
  const llista = document.getElementById("llista");
  const dades = Array.from({ length: 50 }, (_, i) => "Element " + (i + 1));

  const fragment = document.createDocumentFragment();
  for (const text of dades) {
    const li = document.createElement("li");
    li.textContent = text;
    fragment.append(li);
  }

  llista.append(fragment);
  console.log("Fills:", llista.children.length);
</script>`,
        },
        {
          title: "Debounce",
          body: `
            <p>Un esdeveniment com <code>input</code> o <code>scroll</code> es dispara molt sovint. <em>Debounce</em> endarrereix l'execució fins que l'usuari para: menys feina i millor experiència.</p>
          `,
          lang: "html",
          code: `<input id="cerca" placeholder="Escriu...">
<p id="sortida"></p>

<script>
  function debounce(fn, espera) {
    let id;
    return (...args) => {
      clearTimeout(id);
      id = setTimeout(() => fn(...args), espera);
    };
  }

  const sortida = document.getElementById("sortida");

  const gestiona = debounce((valor) => {
    sortida.textContent = "Cerca: " + valor;
  }, 300);

  document
    .getElementById("cerca")
    .addEventListener("input", (e) => gestiona(e.target.value));
</script>`,
        },
      ],
      exercise: {
        brief:
          "Crea un camp de cerca que actualitzi un comptador només quan l'usuari deixa d'escriure durant 300 ms, i comprova la diferència sense debounce.",
        hint: "Guarda l'identificador del temporitzador en una clausura i cancel·la'l a cada tecla.",
      },
    },
    {
      slug: "testing",
      title: "Provar codi JavaScript",
      summary:
        "Com saber que el que has escrit funciona: casos, assercions i proves automàtiques.",
      goals: [
        "Escriure proves simples amb assercions.",
        "Organitzar casos límit.",
        "Conèixer les llibreries de test del sector.",
      ],
      sections: [
        {
          title: "Assercions bàsiques",
          body: `
            <p>Una prova comprova que una funció retorna el que esperes. La forma mínima és una funció que avisi quan el resultat no coincideix. Com més petita i pura és la funció, més fàcil és de provar.</p>
          `,
          lang: "js",
          code: `function assertEquals(actual, esperat, nom) {
  const ok = JSON.stringify(actual) === JSON.stringify(esperat);
  console.log((ok ? "OK  " : "FALLA ") + nom);
  if (!ok) console.log("  esperat:", esperat, "rebut:", actual);
}

function suma(a, b) {
  return a + b;
}

assertEquals(suma(2, 3), 5, "suma positius");
assertEquals(suma(-1, 1), 0, "suma oposats");
assertEquals(suma(0.1, 0.2).toFixed(1), "0.3", "decimals");`,
        },
        {
          title: "Casos límit",
          body: `
            <p>Els errors viuen als extrems: llista buida, zero, text buit, <code>null</code>, números negatius. Prova sempre aquests casos abans de donar una funció per acabada.</p>
          `,
          lang: "js",
          code: `function mitjana(nums) {
  if (!Array.isArray(nums) || nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

const casos = [
  { entrada: [8, 9], esperat: 8.5 },
  { entrada: [], esperat: null },
  { entrada: [5], esperat: 5 },
  { entrada: null, esperat: null },
];

for (const c of casos) {
  const resultat = mitjana(c.entrada);
  console.log(JSON.stringify(c.entrada), "→", resultat, resultat === c.esperat ? "OK" : "FALLA");
}`,
        },
        {
          title: "Eines del sector",
          body: `
            <p>En projectes reals es fan servir llibreries de test com Vitest o Jest: defineixen casos i comparen resultats amb <code>expect()</code>. La lògica, però, és la mateixa que acabes de veure.</p>
            <p>Consell pràctic: escriu la prova abans de la funció quan el comportament no és trivial. T'obliga a pensar quin és el contracte.</p>
          `,
          lang: "js",
          code: `// Amb Vitest o Jest: import { it, expect } from "vitest";

function capitalitza(text) {
  if (!text) return "";
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

const proves = [
  ["hola", "Hola"],
  ["HOLA", "Hola"],
  ["", ""],
];

proves.forEach(([entrada, esperat]) => {
  const resultat = capitalitza(entrada);
  console.log(entrada || "(buit)", "→", resultat === esperat ? "OK" : "FALLA");
});`,
        },
      ],
      exercise: {
        brief:
          "Escriu tres proves per a una funció que retorni el número més gran d'un array, incloent-hi el cas d'array buit.",
        hint: "Decideix què ha de retornar amb un array buit i fes que la prova ho verifiqui.",
      },
    },
    {
      slug: "resum-javascript",
      title: "Resum complet de JavaScript i referència",
      summary:
        "Tot el curs ordenat: del primer valor fins a l'asincronia, amb una llista de comprovació.",
      goals: [
        "Repassar l'itinerari complet.",
        "Tenir una referència ràpida.",
        "Saber què estudiar després.",
      ],
      sections: [
        {
          title: "Referència ràpida",
          body: `
            <p>Aquesta taula resumeix els blocs del curs. Si alguna fila et sona estranya, torna al capítol corresponent.</p>
          `,
          table: {
            head: ["Bloc", "Què hi ha"],
            rows: [
              ["Fonaments", "variables, tipus, conversió, operadors"],
              ["Dades", "strings, números, dates, arrays, objectes, JSON"],
              ["Funcions", "paràmetres, closures, this, àmbits"],
              ["Control de flux", "condicionals, bucles, map/filter/reduce"],
              ["DOM", "selecció, manipulació, esdeveniments"],
              ["Asincronia", "promeses, async/await, fetch"],
              ["Objectes i classes", "prototips, herència, descriptors"],
              ["Eines", "mòduls, iteradors, Map/Set, errors, rendiment, proves"],
            ],
          },
          lang: "js",
          code: `async function carregaIHiha() {
  const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!resposta.ok) throw new Error("Error " + resposta.status);

  const usuaris = await resposta.json();

  return usuaris
    .filter((u) => u.name)
    .map((u) => ({ nom: u.name, correu: u.email }))
    .slice(0, 3);
}

carregaIHiha()
  .then((llista) => console.log(llista))
  .catch((e) => console.log(e.message));`,
        },
        {
          title: "Llista de comprovació",
          body: `
            <ul>
              <li>Fes servir <code>const</code> per defecte i <code>let</code> només quan calgui.</li>
              <li>Compara sempre amb <code>===</code>.</li>
              <li>Prefereix <code>map</code>, <code>filter</code> i <code>reduce</code> als bucles manuals.</li>
              <li>No mutis els paràmetres que reps.</li>
              <li>Gestiona els errors de les promeses.</li>
              <li>Comprova <code>response.ok</code> a <code>fetch</code>.</li>
              <li>No facis servir <code>innerHTML</code> amb dades de l'usuari.</li>
              <li>Prova els casos límit: buit, zero, <code>null</code>.</li>
            </ul>
          `,
          lang: "js",
          code: `const CLAU = "aula-curs";

export function desa(dades) {
  localStorage.setItem(CLAU, JSON.stringify(dades));
}

export function carrega() {
  try {
    return JSON.parse(localStorage.getItem(CLAU)) ?? [];
  } catch {
    return [];
  }
}

console.log(typeof carrega());`,
        },
        {
          title: "Què ve després",
          body: `
            <p>Ja tens les bases per construir qualsevol pàgina interactiva. Els passos naturals són: un framework de components (React, Vue), una API pròpia amb Node, o eines de proves i desplegament.</p>
            <p>Però sobretot: escriu projectes petits i acaba'ls. La diferència entre saber JavaScript i saber programar és la pràctica de tancar feines.</p>
          `,
        },
      ],
      exercise: {
        brief:
          "Construeix un petit projecte que combini tot el curs: una llista de tasques amb dades desades al navegador, esdeveniments del DOM i gestió d'errors.",
        hint: "Comença per l'estat, continua pel pintat i acaba amb les accions. Prova els casos buits.",
      },
    },
  ],
};