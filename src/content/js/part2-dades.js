export default {
  title: "Text, nombres i col·leccions",
  description:
    "Treballar amb cadenes, números, dates, arrays i objectes: les dades que més faràs servir.",
  chapters: [
    {
      slug: "strings-methods",
      title: "Cadenes de text i els seus mètodes",
      summary:
        "El text és el tipus de dada més freqüent. Aprèn a construir-lo, tallar-lo i transformar-lo.",
      goals: [
        "Crear cadenes amb cometes i plantilles.",
        "Fer servir els mètodes indispensables.",
        "Evitar els errors típics d'indexació.",
      ],
      sections: [
        {
          title: "Crear cadenes",
          body: `
            <p>Tres tipus de cometes: simples, dobles i invertides. Les invertides permeten <strong>plantilles</strong>: incrustar expressions amb <code>\${ }</code> i escriure en diverses línies.</p>
            <p>Les cadenes són immutables: cap mètode les canvia, tots retornen una cadena nova.</p>
          `,
          lang: "js",
          code: `const nom = "Ada";
const curs = 'JavaScript';
const saludo = \`Hola, \${nom}! Benvinguda a \${curs}.\`;

console.log(saludo);
console.log("Línia 1\\nLínia 2");
console.log("Cometes: \\"així\\" i 'així'");`,
        },
        {
          title: "Mètodes essencials",
          body: `
            <ul>
              <li><code>length</code> ➜ longitud (propietat, sense parèntesis).</li>
              <li><code>toUpperCase()</code> / <code>toLowerCase()</code> ➜ majúscules.</li>
              <li><code>trim()</code> ➜ treu espais dels extrems.</li>
              <li><code>includes()</code> ➜ conté un fragment.</li>
              <li><code>slice(inici, final)</code> ➜ trossa.</li>
              <li><code>replace()</code> / <code>replaceAll()</code> ➜ substitueix.</li>
              <li><code>split()</code> ➜ converteix en array.</li>
            </ul>
          `,
          lang: "js",
          code: `const text = "  Aprenent JavaScript  ";

console.log(text.trim().length);
console.log(text.trim().toUpperCase());
console.log(text.includes("JavaScript"));
console.log(text.trim().slice(0, 8));
console.log("a-b-c".split("-"));`,
        },
        {
          title: "Cercar i combinar",
          body: `
            <p><code>indexOf()</code> retorna la posició o <code>-1</code>. Recorda que es compta des de zero i que l'últim caràcter és a <code>length - 1</code>.</p>
            <p>Per unir cadenes hi ha la concatenació amb <code>+</code>, però les plantilles són més llegibles quan hi ha diverses parts.</p>
          `,
          lang: "js",
          code: `const correu = "alumne@escola.cat";

console.log(correu.indexOf("@"));
console.log(correu.includes("@") && correu.includes("."));

const [usuari, domini] = correu.split("@");
console.log("Usuari:", usuari);
console.log("Domini:", domini);
console.log(correu.charAt(0));`,
        },
      ],
      exercise: {
        brief:
          "Escriu una funció que rebi un nom complet i retorni les inicials en majúscules, separades per punts.",
        hint: "Divideix el nom amb <code>split(' ')</code> i recorre el resultat.",
      },
    },
    {
      slug: "nombres-math",
      title: "Nombres i operacions matemàtiques",
      summary:
        "Precisió decimal, arrodoniments i l'objecte <code>Math</code>: tot el que cal per calcular sense sorpreses.",
      goals: [
        "Fer servir <code>Math</code> i els mètodes de número.",
        "Entendre els errors de coma flotant.",
        "Generar números aleatoris dins d'un rang.",
      ],
      sections: [
        {
          title: "Math",
          body: `
            <p><code>Math</code> és un objecte amb funcions matemàtiques: <code>round</code>, <code>floor</code>, <code>ceil</code>, <code>abs</code>, <code>max</code>, <code>min</code>, <code>sqrt</code>, <code>random</code>.</p>
            <p><code>Math.random()</code> retorna un decimal entre 0 i 1 (sense incloure l'1). Per obtenir un enter entre 1 i 6, multiplica i arrodoneix.</p>
          `,
          lang: "js",
          code: `console.log(Math.round(4.5));
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.max(3, 9, 2));
console.log(Math.abs(-7));

const dau = Math.floor(Math.random() * 6) + 1;
console.log("Dau:", dau);`,
        },
        {
          title: "Precisió i format",
          body: `
            <p>Els números de JavaScript són coma flotant de 64 bits, i això provoca resultats com <code>0.1 + 0.2 === 0.30000000000000004</code>. No és un error del llenguatge, és com funciona la representació binària.</p>
            <p>Per a diners, treballa amb enters (cèntims) o formata amb <code>toFixed()</code> en el moment de mostrar.</p>
          `,
          lang: "js",
          code: `console.log(0.1 + 0.2);
console.log((0.1 + 0.2).toFixed(2));

const preu = 19.9;
console.log(preu.toFixed(2) + " €");

console.log(Number.isInteger(5));
console.log(Number.isNaN(NaN));
console.log(parseFloat("12.5abc"));`,
        },
        {
          title: "Rangs i validació",
          body: `
            <p>Una funció que retorni un enter entre dos límits és un clàssic d'entrevista i una bona pràctica d'abstracció: tanca la fórmula en un lloc i reutilitza-la.</p>
          `,
          lang: "js",
          code: `function aleatoriEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(aleatoriEntre(1, 10));

function arrodona(numero, decimals) {
  const factor = 10 ** decimals;
  return Math.round(numero * factor) / factor;
}

console.log(arrodona(3.14159, 2));`,
        },
      ],
      exercise: {
        brief:
          "Escriu una funció que generi un número aleatori entre 1 i 100 i digui si és parell o senar i si és més gran que 50.",
        hint: "Utilitza <code>% 2 === 0</code> per a la paritat i una condició composta per a la resta.",
      },
    },
    {
      slug: "dates-temps",
      title: "Dates i gestió del temps",
      summary:
        "L'objecte <code>Date</code>, els seus paranys i com calcular diferències en dies.",
      goals: [
        "Crear i llegir dates.",
        "Formatejar amb <code>Intl</code>.",
        "Calcular diferències entre dates.",
      ],
      sections: [
        {
          title: "Crear i llegir",
          body: `
            <p><code>new Date()</code> dona el moment actual. Els mesos comencen a <strong>zero</strong>: gener és 0 i desembre és 11. És un error clàssic.</p>
            <p>Els mètodes <code>get...</code> retornen parts; els <code>set...</code> les modifiquen sobre el mateix objecte.</p>
          `,
          lang: "js",
          code: `const ara = new Date();
console.log(ara.getFullYear());
console.log(ara.getMonth() + 1);
console.log(ara.getDate());

const naixement = new Date(2010, 4, 12);
console.log(naixement.toString());`,
        },
        {
          title: "Formatejar",
          body: `
            <p><code>toLocaleDateString()</code> adapta el format a l'idioma. Amb <code>Intl.DateTimeFormat</code> pots triar mesos llargs, dies de la setmana i zona horària.</p>
            <p>Passa sempre l'idioma explícitament: si no, el resultat depèn de la configuració de cada usuari i les proves no coincideixen.</p>
          `,
          lang: "js",
          code: `const data = new Date(2026, 10, 11);

console.log(data.toLocaleDateString("ca-ES"));
console.log(
  new Intl.DateTimeFormat("ca-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(data)
);`,
        },
        {
          title: "Diferències",
          body: `
            <p>Restar dues dates dona mil·lisegons. Divideix per 86.400.000 per obtenir dies.</p>
            <p>Per sumar dies, crea una data nova a partir de la original amb <code>setDate()</code>: així els canvis de mes i any es resolen sols.</p>
          `,
          lang: "js",
          code: `const inici = new Date(2026, 0, 1);
const fi = new Date(2026, 11, 31);

const dies = (fi - inici) / (1000 * 60 * 60 * 24);
console.log("Dies:", dies);

const dilluns = new Date(2026, 10, 9);
dilluns.setDate(dilluns.getDate() + 7);
console.log(dilluns.toLocaleDateString("ca-ES"));`,
          note: "Per a càlculs complexos i zones horàries, valora una llibreria especialitzada; l'objecte <code>Date</code> és limitat.",
        },
      ],
      exercise: {
        brief:
          "Calcula quants dies falten fins al final de curs i mostra la data en format llarg català.",
        hint: "Crea la data amb <code>new Date(any, mes - 1, dia)</code> i divideix la diferència entre mil·lisegons de dia.",
      },
    },
    {
      slug: "arrays-methods",
      title: "Arrays i els seus mètodes",
      summary:
        "Afegir, treure, tallar i recórrer: l'array és l'estructura de dades més utilitzada.",
      goals: [
        "Crear i recórrer arrays.",
        "Distingir els mètodes que muten dels que retornen còpies.",
        "Fer servir <code>slice</code>, <code>splice</code> i <code>join</code>.",
      ],
      sections: [
        {
          title: "Crear i accedir",
          body: `
            <p>Un array és una llista ordenada dins de claudàtors. Els elements es numeren des de zero i <code>length</code> dona la quantitat.</p>
            <p>L'últim element és a <code>length - 1</code>; per això <code>at(-1)</code> és tan útil.</p>
          `,
          lang: "js",
          code: `const cursos = ["HTML", "CSS", "JavaScript"];

console.log(cursos.length);
console.log(cursos[0]);
console.log(cursos[cursos.length - 1]);
console.log(cursos.at(-1));

cursos[1] = "CSS modern";
console.log(cursos);`,
        },
        {
          title: "Mutar o retornar",
          body: `
            <p>Alguns mètodes <strong>modifiquen</strong> l'array original i altres retornen un de nou:</p>
            <ul>
              <li>Modifiquen: <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>sort</code>, <code>reverse</code>.</li>
              <li>Retornen còpia: <code>slice</code>, <code>concat</code>, <code>map</code>, <code>filter</code>.</li>
            </ul>
            <p>Amb <code>const</code> pots mutar l'array sense reassignar-lo.</p>
          `,
          lang: "js",
          code: `const cua = ["a", "b", "c"];

cua.push("d");
console.log(cua);

console.log(cua.pop());
console.log(cua);

const mig = cua.slice(1, 3);
console.log(mig, cua);

cua.splice(1, 1, "B");
console.log(cua);`,
        },
        {
          title: "Cercar i unir",
          body: `
            <p><code>includes()</code> respon sí o no, <code>indexOf()</code> dona la posició, <code>find()</code> retorna l'element i <code>findIndex()</code> la seva posició.</p>
            <p><code>join()</code> converteix l'array en text; <code>sort()</code> ordena, però compte: per defecte converteix a text.</p>
          `,
          lang: "js",
          code: `const notes = [7, 4, 9, 10, 6];

console.log(notes.includes(9));
console.log(notes.indexOf(9));
console.log(notes.find((n) => n < 5));
console.log(notes.join(" · "));

console.log(notes.sort());
console.log(notes.sort((a, b) => a - b));`,
        },
      ],
      exercise: {
        brief:
          "Crea un array de cinc noms, afegeix-n'hi un al final i un al principi, treu-ne el segon i mostra'l ordenat alfabèticament.",
        hint: "Fes servir <code>push</code>, <code>unshift</code>, <code>splice</code> i <code>sort()</code>.",
      },
    },
    {
      slug: "objectes-methods",
      title: "Objectes i propietats",
      summary:
        "Agrupar dades amb sentit: propietats, mètodes, accés i recorregut.",
      goals: [
        "Crear objectes i accedir-hi amb punt i claudàtors.",
        "Definir mètodes dins d'un objecte.",
        "Recórrer amb <code>Object.keys</code>, <code>values</code> i <code>entries</code>.",
      ],
      sections: [
        {
          title: "Propietats",
          body: `
            <p>Un objecte és un conjunt de parells clau-valor. L'accés amb punt és el normal; amb claudàtors quan la clau és dinàmica o té guions.</p>
            <p><code>delete</code> elimina una propietat i <code>in</code> comprova si existeix.</p>
          `,
          lang: "js",
          code: `const alumne = {
  nom: "Ada",
  edat: 17,
  curs: "JavaScript",
};

console.log(alumne.nom);
console.log(alumne["curs"]);

alumne.edat = 18;
alumne["correu"] = "ada@escola.cat";
console.log(alumne);

console.log("edat" in alumne);
delete alumne.correu;
console.log(alumne);`,
        },
        {
          title: "Mètodes",
          body: `
            <p>Una funció dins d'un objecte és un mètode. Dins seu, <code>this</code> fa referència a l'objecte que el crida.</p>
            <p>Amb objectes literals, valora si et convé més una funció externa: és més fàcil de provar i no depèn de <code>this</code>.</p>
          `,
          lang: "js",
          code: `const carret = {
  articles: [],
  afegeix(nom, preu) {
    this.articles.push({ nom, preu });
  },
  total() {
    return this.articles.reduce((suma, a) => suma + a.preu, 0);
  },
};

carret.afegeix("Llibre", 16);
carret.afegeix("Quadern", 3.5);
console.log(carret.total());`,
        },
        {
          title: "Recórrer i copiar",
          body: `
            <p><code>Object.keys()</code>, <code>Object.values()</code> i <code>Object.entries()</code> converteixen l'objecte en arrays per poder-lo recórrer amb els mètodes que ja coneixes.</p>
            <p>L'operador <em>spread</em> fa una còpia superficial: les propietats que són objectes continuen compartides.</p>
          `,
          lang: "js",
          code: `const producte = { nom: "Teclat", preu: 29, estoc: 4 };

console.log(Object.keys(producte));
console.log(Object.values(producte));

for (const [clau, valor] of Object.entries(producte)) {
  console.log(clau, "=", valor);
}

const copia = { ...producte, preu: 24 };
console.log(copia);`,
        },
      ],
      exercise: {
        brief:
          "Crea un objecte llibre amb títol, autor, any i un mètode que retorni una fitxa en text. Recorre'l després amb <code>Object.entries</code>.",
        hint: "Al mètode, fes servir <code>this.titol</code> i una plantilla de text.",
      },
    },
    {
      slug: "destructuring",
      title: "Desestructuració d'arrays i objectes",
      summary:
        "Treure valors d'una estructura en una sola línia, amb valors per defecte i noms nous.",
      goals: [
        "Desestructurar arrays i objectes.",
        "Assignar valors per defecte i renombrar.",
        "Fer servir la desestructuració en paràmetres.",
      ],
      sections: [
        {
          title: "Objectes",
          body: `
            <p>La desestructuració copia propietats a variables amb el mateix nom. Pots renombrar amb <code>:</code> i posar valors per defecte amb <code>=</code>.</p>
          `,
          lang: "js",
          code: `const alumne = { nom: "Ada", edat: 17, curs: "JavaScript" };

const { nom, edat } = alumne;
console.log(nom, edat);

const { curs: assignatura, correu = "sense correu" } = alumne;
console.log(assignatura, correu);`,
        },
        {
          title: "Arrays",
          body: `
            <p>En arrays compta la posició. Pots saltar elements amb comes buides i agafar la resta amb <code>...</code>.</p>
          `,
          lang: "js",
          code: `const notes = [9, 7, 5, 8];

const [primera, segona] = notes;
console.log(primera, segona);

const [, , tercera] = notes;
console.log(tercera);

const [maxima, ...resta] = notes;
console.log(maxima, resta);

let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);`,
        },
        {
          title: "En paràmetres",
          body: `
            <p>És habitual rebre un objecte d'opcions i desestructurar-lo directament a la signatura. També pots fer-ho amb els paràmetres d'una funció que rep un array.</p>
          `,
          lang: "js",
          code: `function creaTargeta({ titol, text, color = "#b85c3a" }) {
  return titol + " | " + text + " | " + color;
}

console.log(creaTargeta({ titol: "Hola", text: "Món" }));

const coordenades = [41.39, 2.17];
const [lat, lng] = coordenades;
console.log(lat, lng);`,
        },
      ],
      exercise: {
        brief:
          "Escriu una funció que rebi un objecte alumne amb nom, nota i correu opcional, i retorni un missatge. Fes servir desestructuració amb valor per defecte.",
        hint: "Si el correu no arriba, el paràmetre ha de tenir un valor per defecte dins de la desestructuració.",
      },
    },
    {
      slug: "json",
      title: "JSON: el format d'intercanvi",
      summary:
        "Text estructurat per enviar i rebre dades. Com convertir-lo i què no hi pot haver.",
      goals: [
        "Escriure i llegir JSON.",
        "Convertir amb <code>JSON.stringify</code> i <code>JSON.parse</code>.",
        "Gestionar els errors de format.",
      ],
      sections: [
        {
          title: "Què és el JSON",
          body: `
            <p>JSON (<em>JavaScript Object Notation</em>) és text amb una sintaxi molt semblant als objectes de JavaScript. És el format d'intercanvi de gairebé totes les API.</p>
            <p>Regles: les claus van entre cometes dobles, no hi ha comes finals i no admet funcions ni <code>undefined</code>.</p>
          `,
          lang: "js",
          code: `const text = '{"nom":"Ada","edat":17,"cursos":["HTML","CSS"]}';

const dades = JSON.parse(text);
console.log(dades.nom);
console.log(dades.cursos[1]);

console.log(JSON.stringify(dades));
console.log(JSON.stringify(dades, null, 2));`,
        },
        {
          title: "Convertir i serialitzar",
          body: `
            <p><code>JSON.stringify()</code> converteix un valor en text; <code>JSON.parse()</code> fa el contrari. El segon paràmetre de <code>stringify</code> permet filtrar propietats o transformar valors; el tercer, indentar.</p>
          `,
          lang: "js",
          code: `const usuari = {
  nom: "Ada",
  clau: "secret",
  actiu: true,
  cursos: ["HTML", "CSS", "JavaScript"],
};

const net = JSON.stringify(usuari, (clau, valor) =>
  clau === "clau" ? undefined : valor
);
console.log(net);

const curt = JSON.stringify(usuari, ["nom", "actiu"]);
console.log(curt);`,
        },
        {
          title: "Errors de format",
          body: `
            <p>Si el text no és JSON vàlid, <code>parse()</code> llança una excepció i atura el codi. Quan les dades vénen de fora, val la pena protegir-ho.</p>
            <p>I recorda: mai facis <code>eval()</code> d'un text que no controles.</p>
          `,
          lang: "js",
          code: `function llegeix(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.log("JSON no vàlid:", error.message);
    return null;
  }
}

console.log(llegeix('{"ok":true}'));
console.log(llegeix("{ok:true}"));`,
        },
      ],
      exercise: {
        brief:
          "Crea un objecte amb dades d'un curs, converteix-lo a JSON amb indentació de dos espais, torna'l a llegir i comprova que les dades coincideixen.",
        hint: "Compara les propietats una a una, no els objectes sencers amb <code>===</code>.",
      },
    },
  ],
};