export default {
  title: "Bucles i transformació de dades",
  description:
    "Repetir instruccions i processar col·leccions amb els mètodes que fan el codi declaratiu.",
  chapters: [
    {
      slug: "bucles",
      title: "Bucles i iteració",
      summary:
        "Repetir codi sense copiar-lo: <code>for</code>, <code>for...of</code>, <code>while</code> i quan aturar-se.",
      goals: [
        "Recórrer arrays amb el bucle adequat.",
        "Fer servir <code>break</code> i <code>continue</code>.",
        "Evitar els bucles infinits.",
      ],
      sections: [
        {
          title: "El bucle for",
          body: `
            <p>El <code>for</code> clàssic té tres parts: inicialització, condició i increment. És el més flexible i també el més fàcil de fer malament.</p>
            <p>Amb arrays, però, <code>for...of</code> és més llegible i evita errors d'índex.</p>
          `,
          lang: "js",
          code: `for (let i = 0; i < 3; i++) {
  console.log("Volta", i);
}

const cursos = ["HTML", "CSS", "JavaScript"];

for (const curs of cursos) {
  console.log(curs);
}

cursos.forEach((curs, index) => {
  console.log(index + 1, curs);
});`,
        },
        {
          title: "for...in, while i do...while",
          body: `
            <p><code>for...in</code> recorre les <strong>claus</strong> d'un objecte. No el facis servir per a arrays: recorre també propietats heretades i no garanteix l'ordre.</p>
            <p><code>while</code> comprova abans de cada volta; <code>do...while</code> executa almenys una vegada.</p>
          `,
          lang: "js",
          code: `const alumne = { nom: "Ada", edat: 17, curs: "JS" };

for (const clau in alumne) {
  console.log(clau, "→", alumne[clau]);
}

let intents = 0;
while (intents < 3) {
  intents += 1;
}
console.log("Intents:", intents);

let valor = 10;
do {
  valor += 1;
} while (valor < 5);
console.log(valor);`,
        },
        {
          title: "break i continue",
          body: `
            <p><code>break</code> surt del bucle; <code>continue</code> salta a la volta següent. Fer-los servir amb criteri estalvia condicions niades.</p>
            <p>Un bucle infinit és quan la condició no arriba mai a ser falsa. Revisa sempre que alguna cosa canviï dins del cos.</p>
          `,
          lang: "js",
          code: `const nums = [4, 7, 12, 3, 18];

for (const n of nums) {
  if (n % 2 === 1) continue;
  console.log("Parell:", n);
  if (n > 10) break;
}

let comptador = 0;
while (true) {
  comptador += 1;
  if (comptador === 2) break;
}
console.log(comptador);`,
        },
      ],
      exercise: {
        brief:
          "Recorre un array de notes, salta'n els valors negatius, suma la resta i atura't quan la suma passi de 30.",
        hint: "Combina <code>continue</code> per als negatius amb <code>break</code> quan arribis al total.",
      },
    },
    {
      slug: "funcions-ordre-superior",
      title: "Funcions d'ordre superior sobre arrays",
      summary:
        "map, filter, reduce, some i every: descriure què vols en lloc de com recórrer-ho.",
      goals: [
        "Transformar amb <code>map</code>.",
        "Seleccionar amb <code>filter</code>.",
        "Agregar amb <code>reduce</code>.",
        "Encadenar operacions sense bucles.",
      ],
      sections: [
        {
          title: "map i filter",
          body: `
            <p><code>map()</code> retorna un array nou de la mateixa llargada amb cada element transformat. <code>filter()</code> retorna només els que compleixen una condició.</p>
            <p>Tots dos retornen arrays nous: l'original no es toca.</p>
          `,
          lang: "js",
          code: `const notes = [4, 7, 9, 3, 10];

const arrodonides = notes.map((n) => Math.round(n));
console.log(arrodonides);

const aprovades = notes.filter((n) => n >= 5);
console.log(aprovades);

const alumnes = [
  { nom: "Ada", nota: 9 },
  { nom: "Alan", nota: 4 },
  { nom: "Grace", nota: 7 },
];

console.log(alumnes.filter((a) => a.nota >= 5).map((a) => a.nom));`,
        },
        {
          title: "reduce",
          body: `
            <p><code>reduce()</code> recorre l'array acumulant un resultat. El segon paràmetre és el valor inicial: posa'l sempre que puguis.</p>
            <p>Serveix per sumar, comptar, agrupar o construir objectes a partir d'un array.</p>
          `,
          lang: "js",
          code: `const preus = [12.5, 4, 30];

const total = preus.reduce((suma, preu) => suma + preu, 0);
console.log("Total:", total);

const alumnes = [
  { nom: "Ada", nota: 9 },
  { nom: "Alan", nota: 4 },
  { nom: "Grace", nota: 7 },
];

const mitjana =
  alumnes.reduce((suma, a) => suma + a.nota, 0) / alumnes.length;
console.log("Mitjana:", mitjana);

const comptador = preus.reduce((acc, preu) => {
  const clau = preu > 10 ? "cars" : "barats";
  acc[clau] = (acc[clau] || 0) + 1;
  return acc;
}, {});
console.log(comptador);`,
        },
        {
          title: "some, every, find i sort",
          body: `
            <p><code>some()</code> diu si almenys un compleix; <code>every()</code> si tots compleixen; <code>find()</code> retorna el primer que compleix.</p>
            <p><code>sort()</code> necessita un comparator numèric: <code>(a, b) =&gt; a - b</code> per ascendir.</p>
          `,
          lang: "js",
          code: `const notes = [4, 7, 9, 3, 10];

console.log(notes.some((n) => n === 10));
console.log(notes.every((n) => n >= 5));
console.log(notes.find((n) => n > 8));

const ordenades = [...notes].sort((a, b) => a - b);
console.log(ordenades);

const alumnes = [
  { nom: "Ada", nota: 9 },
  { nom: "Grace", nota: 7 },
];
console.log(
  alumnes
    .filter((a) => a.nota >= 8)
    .map((a) => a.nom)
    .join(", ")
);`,
        },
      ],
      exercise: {
        brief:
          "Donat un array de productes amb nom i preu, obtén els noms dels que costen més de 10 €, el total de la compra i el producte més car, sense escriure cap bucle.",
        hint: "Combina <code>filter</code>, <code>reduce</code> i <code>sort</code> o <code>reduce</code> amb comparació.",
      },
    },
  ],
};