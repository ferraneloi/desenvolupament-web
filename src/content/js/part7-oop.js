export default {
  title: "Prototips i herència",
  description:
    "Com els objectes comparteixen comportament i com s'escriuen classes que hereten.",
  chapters: [
    {
      slug: "prototips",
      title: "Prototips i la cadena de prototips",
      summary:
        "El mecanisme real darrere de les classes: on busca JavaScript un mètode quan no el troba.",
      goals: [
        "Entendre què és <code>prototype</code> i què és <code>__proto__</code>.",
        "Llegir la cadena de prototips.",
        "Crear objectes que hereten d'un altre.",
      ],
      sections: [
        {
          title: "On viuen els mètodes",
          body: `
            <p>Cada objecte té una referència al seu prototip. Quan demanes una propietat, el motor la busca a l'objecte i, si no hi és, al prototip, i així fins a <code>Object.prototype</code>.</p>
            <p>Per això els mètodes es defineixen al prototip: totes les instàncies els comparteixen en lloc de duplicar-los.</p>
          `,
          lang: "js",
          code: `function Gos(nom) {
  this.nom = nom;
}

Gos.prototype.ladra = function () {
  return this.nom + " diu bup!";
};

const a = new Gos("Toby");
const b = new Gos("Rex");

console.log(a.ladra());
console.log(Object.getPrototypeOf(a) === Gos.prototype);
console.log(a.hasOwnProperty("ladra"));
console.log("ladra" in a);`,
        },
        {
          title: "La cadena",
          body: `
            <p>La cadena acaba a <code>null</code>. <code>Object.create(prototip)</code> crea un objecte amb el prototip que vulguis, sense necessitat de constructors.</p>
          `,
          lang: "js",
          code: `const animal = { viu: true, saluda() { return "hola"; } };
const gos = Object.create(animal);
gos.ladra = () => "bup!";

console.log(gos.saluda());
console.log(gos.viu);
console.log(Object.getPrototypeOf(gos) === animal);
console.log(Object.getPrototypeOf(animal) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));`,
        },
        {
          title: "Mirar sense recórrer",
          body: `
            <p><code>hasOwnProperty()</code> només mira l'objecte, no la cadena. <code>in</code> mira tota la cadena. És una distinció important quan recorres objectes.</p>
          `,
          lang: "js",
          code: `const base = { heretada: true };
const fill = Object.create(base);
fill.propia = 1;

for (const clau in fill) {
  console.log("for...in:", clau);
}

console.log("pròpies:", Object.keys(fill));
console.log(fill.hasOwnProperty("heretada"));
console.log("heretada" in fill);`,
        },
      ],
      exercise: {
        brief:
          "Crea un objecte base amb un mètode, tres objectes que n'heretin i comprova amb <code>Object.keys</code> que el mètode no apareix com a propietat pròpia.",
        hint: "Fes servir <code>Object.create(base)</code> i compara amb <code>hasOwnProperty</code>.",
      },
    },
    {
      slug: "herencia-polimorfisme",
      title: "Herència i polimorfisme",
      summary:
        "Estendre una classe, reutilitzar el constructor pare i redefinir mètodes amb sentit.",
      goals: [
        "Heretar amb <code>extends</code> i <code>super</code>.",
        "Sobreescriure mètodes.",
        "Reconèixer el polimorfisme en un array d'objectes.",
      ],
      sections: [
        {
          title: "extends i super",
          body: `
            <p><code>extends</code> fa que una classe hereti d'una altra. <code>super()</code> crida el constructor pare: és obligatori abans de fer servir <code>this</code>.</p>
            <p>Per cridar un mètode del pare des d'un mètode sobreescrit: <code>super.metode()</code>.</p>
          `,
          lang: "js",
          code: `class Animal {
  constructor(nom) {
    this.nom = nom;
  }

  descriu() {
    return "Animal: " + this.nom;
  }
}

class Gos extends Animal {
  constructor(nom, raça) {
    super(nom);
    this.raça = raça;
  }

  descriu() {
    return super.descriu() + " (" + this.raça + ")";
  }
}

console.log(new Gos("Toby", "mestís").descriu());`,
        },
        {
          title: "Polimorfisme",
          body: `
            <p>Diversos tipus responen al mateix mètode de maneres diferents. Si totes les classes comparteixen la interfície, pots recórrer un array sense preguntar de quin tipus és cadascú.</p>
          `,
          lang: "js",
          code: `class Figura {
  area() { return 0; }
  toString() { return "Figura amb àrea " + this.area().toFixed(1); }
}

class Quadrat extends Figura {
  constructor(costat) { super(); this.costat = costat; }
  area() { return this.costat ** 2; }
}

class Cercle extends Figura {
  constructor(radi) { super(); this.radi = radi; }
  area() { return Math.PI * this.radi ** 2; }
}

const figures = [new Quadrat(3), new Cercle(1.5)];
figures.forEach((f) => console.log(String(f)));
console.log(figures.every((f) => f instanceof Figura));`,
        },
        {
          title: "Quan no heretar",
          body: `
            <p>Si la relació no és «és un tipus de», l'herència és la solució equivocada. Sovint convé composar: un objecte que en conté un altre i li delega la feina.</p>
            <p>Les jerarquies molt profundes es tornen fràgils: prefereix poques classes i composició.</p>
          `,
          lang: "js",
          code: `class Motor {
  constructor(cilindrada) { this.cilindrada = cilindrada; }
}

class Cotxe {
  constructor(motor) { this.motor = motor; }
  descriu() { return "Cotxe de " + this.motor.cilindrada + " cc"; }
}

const cotxe = new Cotxe(new Motor(1600));
console.log(cotxe.descriu());`,
        },
      ],
      exercise: {
        brief:
          "Crea una classe base <code>Missatge</code> amb un mètode <code>envia()</code>, i dues classes filles que el redefineixin. Recorre-les en un array i crida el mètode a totes.",
        hint: "Crida <code>super()</code> al constructor de les filles abans de fer servir <code>this</code>.",
      },
    },
    {
      slug: "getters-setters",
      title: "Getters, setters i descriptors de propietat",
      summary:
        "Controlar com es llegeixen i s'escriuen les propietats, i per què a vegades no les veus en un <code>for...in</code>.",
      goals: [
        "Definir <code>get</code> i <code>set</code>.",
        "Llegir un descriptor amb <code>Object.getOwnPropertyDescriptor</code>.",
        "Crear propietats no enumerables.",
      ],
      sections: [
        {
          title: "get i set",
          body: `
            <p>Un <code>get</code> calcula un valor quan es llegeix la propietat; un <code>set</code> valida o transforma quan s'escriu. Des de fora es fan servir com a propietats normals.</p>
            <p>Un setter sense getter dona <code>undefined</code> en llegir-la.</p>
          `,
          lang: "js",
          code: `const alumne = {
  nom: "Ada",
  notes: [8, 9, 7],

  get mitjana() {
    return this.notes.reduce((a, b) => a + b, 0) / this.notes.length;
  },

  set nota(nova) {
    if (nova < 0 || nova > 10) throw new Error("Nota fora de rang");
    this.notes.push(nova);
  },
};

alumne.nota = 10;
console.log(alumne.mitjana.toFixed(2));

try {
  alumne.nota = 20;
} catch (e) {
  console.log(e.message);
}`,
        },
        {
          title: "Descriptors",
          body: `
            <p>Cada propietat té un descriptor amb <code>value</code>, <code>writable</code>, <code>enumerable</code> i <code>configurable</code>. Les propietats creades amb <code>Object.defineProperty</code> poden ser de només lectura o invisibles per a <code>Object.keys</code>.</p>
          `,
          lang: "js",
          code: `const config = {};

Object.defineProperty(config, "versio", {
  value: "1.0",
  writable: false,
  enumerable: false,
});

console.log(config.versio);
console.log(Object.keys(config));

config.versio = "2.0";
console.log(config.versio);

console.log(Object.getOwnPropertyDescriptor(config, "versio"));`,
        },
        {
          title: "Propietats calculades",
          body: `
            <p>Els noms de propietat poden ser expressions: <code>{ [clau]: valor }</code>. És molt útil per construir objectes dinàmics a partir de dades.</p>
          `,
          lang: "js",
          code: `const camp = "correu";
const valor = "ada@escola.cat";

const usuari = {
  nom: "Ada",
  [camp]: valor,
  ["total_" + "cursos"]: 3,
};

console.log(usuari);

const clau = "preu";
const obj = { [clau]: 19 };
console.log(obj.preu);`,
        },
      ],
      exercise: {
        brief:
          "Crea un objecte amb un array de notes i una propietat calculada <code>mitjana</code>. Afegeix un setter que rebutgi valors fora de 0 a 10.",
        hint: "Llança un <code>Error</code> al setter i captura'l amb <code>try/catch</code> en provar-ho.",
      },
    },
    {
      slug: "es6-modern",
      title: "Funcionalitats modernes d'ES6+",
      summary:
        "Plantilles, fletxes, spread, paràmetres per defecte, encadenament opcional i coalescència.",
      goals: [
        "Escriure plantilles de text.",
        "Fer servir <code>?.</code> i <code>??</code>.",
        "Entendre l'operador spread en arrays i objectes.",
      ],
      sections: [
        {
          title: "Plantilles i valors per defecte",
          body: `
            <p>Les plantilles substitueixen la concatenació i permeten diverses línies. Els paràmetres per defecte, la desestructuració i el rest completen la caixa d'eines.</p>
          `,
          lang: "js",
          code: `const alumne = { nom: "Ada", nota: 9 };

const text = \`Alumne: \${alumne.nom}
Nota: \${alumne.nota.toFixed(1)}\`;

console.log(text);

function saluda({ nom, salutacio = "Hola" } = {}) {
  return \`\${salutacio}, \${nom ?? "convidat"}!\`;
}

console.log(saluda({ nom: "Ada" }));
console.log(saluda());`,
        },
        {
          title: "Encadenament opcional",
          body: `
            <p><code>?.</code> atura l'accés si el valor és <code>null</code> o <code>undefined</code>, en lloc de llançar un error. Amb funcions: <code>obj.metode?.()</code>.</p>
            <p>Combina'l amb <code>??</code> per posar un valor per defecte només quan no hi ha res.</p>
          `,
          lang: "js",
          code: `const usuari = {
  nom: "Ada",
  adreca: { ciutat: "Barcelona" },
};

console.log(usuari.adreca?.ciutat);
console.log(usuari.telefon?.numero);
console.log(usuari.telefon?.numero ?? "sense telèfon");

const resposta = { dades: { items: [] } };
console.log(resposta.dades?.items?.length ?? 0);`,
        },
        {
          title: "Spread i Object.assign",
          body: `
            <p><code>...</code> copia propietats o elements en una estructura nova. Serveix per combinar objectes, clonar arrays i afegir un element al principi o al final.</p>
            <p>És una còpia <strong>superficial</strong>: els objectes niats es continuen compartint.</p>
          `,
          lang: "js",
          code: `const base = { tema: "clar", llengua: "ca" };
const usuari = { ...base, tema: "fosc" };
console.log(usuari);

const a = [1, 2];
const b = [3, 4];
console.log([...a, ...b]);
console.log([0, ...a]);
console.log(Math.max(...a, ...b));

const copia = { ...base };
console.log(copia !== base);`,
        },
      ],
      exercise: {
        brief:
          "Escriu una funció que rebi un objecte d'usuari possiblement incomplet i retorni una frase amb el nom i la ciutat, amb valors per defecte quan faltin dades.",
        hint: "Combina <code>?.</code> amb <code>??</code> dins d'una plantilla de text.",
      },
    },
  ],
};