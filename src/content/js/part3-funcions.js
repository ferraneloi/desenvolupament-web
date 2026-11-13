export default {
  title: "Funcions i abast",
  description:
    "Reutilitzar codi, tancar-lo en àmbits i entendre què passa realment quan una funció s'executa.",
  chapters: [
    {
      slug: "funcions",
      title: "Funcions i expressions de funció",
      summary:
        "La unitat bàsica de reutilització: paràmetres, retorn i les diferents maneres de declarar-ne.",
      goals: [
        "Declarar funcions i retornar valors.",
        "Fer servir paràmetres per defecte.",
        "Diferenciar declaració i expressió.",
      ],
      sections: [
        {
          title: "Declarar i cridar",
          body: `
            <p>Una funció agrupa instruccions i les executa quan la crides. <code>return</code> acaba la funció i retorna un valor; si no hi és, retorna <code>undefined</code>.</p>
            <p>El codi després d'un <code>return</code> no s'executa mai.</p>
          `,
          lang: "js",
          code: `function saluda(nom) {
  return "Hola, " + nom + "!";
}

console.log(saluda("Ada"));
console.log(saluda());

function suma(a, b) {
  return a + b;
}

console.log(suma(3, 4));`,
        },
        {
          title: "Paràmetres per defecte",
          body: `
            <p>Pots donar un valor als paràmetres que no arriben. El valor per defecte s'avalua en el moment de la crida i pot fer servir paràmetres anteriors.</p>
            <p>Si passes <code>undefined</code> explícitament, també s'aplica el valor per defecte.</p>
          `,
          lang: "js",
          code: `function preuFinal(base, iva = 0.21, descompte = 0) {
  return base * (1 + iva) * (1 - descompte);
}

console.log(preuFinal(100));
console.log(preuFinal(100, 0.1));
console.log(preuFinal(100, 0.21, 0.2));

function etiqueta(text, prefix = text.slice(0, 3)) {
  return prefix + ": " + text;
}

console.log(etiqueta("JavaScript"));`,
        },
        {
          title: "Expressions i fletxes",
          body: `
            <p>Una <strong>declaració</strong> es pot cridar abans d'aparèixer al codi gràcies a l'elevació. Una <strong>expressió</strong> assignada a una variable no.</p>
            <p>Les funcions fletxa són més curtes i no tenen el seu propi <code>this</code>. Si el cos és una sola expressió, el <code>return</code> és implícit.</p>
          `,
          lang: "js",
          code: `console.log(declarada());

function declarada() {
  return "puc cridar-me abans";
}

const expressada = function () {
  return "només després";
};
console.log(expressada());

const doble = (n) => n * 2;
const ambCos = (n) => {
  const resultat = n * 2;
  return resultat;
};

console.log(doble(8), ambCos(8));`,
        },
      ],
      exercise: {
        brief:
          "Escriu una funció que calculi l'àrea d'un rectangle amb valors per defecte i una altra que rebi un nom i retorni una salutació formal.",
        hint: "Si no retornes res, el resultat serà <code>undefined</code>: comprova que hi hagi <code>return</code>.",
      },
    },
    {
      slug: "funcions-avancades",
      title: "Funcions avançades",
      summary:
        "Funcions com a valors, paràmetres rest, callbacks i funcions pures.",
      goals: [
        "Passar funcions com a arguments.",
        "Fer servir <code>...</code> per a arguments variables.",
        "Reconèixer una funció pura i els efectes secundaris.",
      ],
      sections: [
        {
          title: "Funcions com a valors",
          body: `
            <p>A JavaScript les funcions són valors: es poden desar en variables, passar com a argument i retornar. Una funció que rep una altra funció rep el nom de <strong>funció d'ordre superior</strong>.</p>
            <p>Això és la base de tots els mètodes d'array que veuràs més endavant.</p>
          `,
          lang: "js",
          code: `function aplica(valor, operacio) {
  return operacio(valor);
}

console.log(aplica(5, (n) => n * n));
console.log(aplica(5, (n) => n + 100));

function creaSaludador(salutacio) {
  return (nom) => salutacio + ", " + nom;
}

const hola = creaSaludador("Hola");
console.log(hola("Ada"));`,
        },
        {
          title: "Paràmetres rest i spread",
          body: `
            <p><code>...args</code> recull tots els arguments restants en un array. A la crida, <code>...array</code> els expandeix.</p>
            <p>El paràmetre rest ha de ser l'últim de la llista.</p>
          `,
          lang: "js",
          code: `function sumaTot(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

console.log(sumaTot(1, 2, 3, 4));
console.log(sumaTot());

const notes = [7, 8, 9];
console.log(Math.max(...notes));

function mitjana(primer, ...resta) {
  return (primer + sumaTot(...resta)) / (1 + resta.length);
}

console.log(mitjana(6, 8, 10));`,
        },
        {
          title: "Funcions pures i efectes secundaris",
          body: `
            <p>Una funció <strong>pura</strong> retorna sempre el mateix per als mateixos arguments i no modifica res extern. És fàcil de provar i de raonar.</p>
            <p>Un <strong>efecte secundari</strong> és qualsevol canvi fora de la funció: modificar un array, escriure al DOM, fer una petició. No són dolents, però han d'estar on toqui.</p>
          `,
          lang: "js",
          code: `// Impura: modifica l'array rebut
function afegeixImpura(llista, valor) {
  llista.push(valor);
  return llista;
}

// Pura: retorna una còpia
function afegeix(llista, valor) {
  return [...llista, valor];
}

const original = ["a"];
afegeixImpura(original, "b");
console.log(original);

const net = afegeix(["a"], "b");
console.log(net);`,
        },
      ],
      exercise: {
        brief:
          "Escriu una funció d'ordre superior que rebi un array de números i una operació, i retorni un array nou amb l'operació aplicada. Comprova que l'original no canvia.",
        hint: "Fes servir <code>map()</code> i passa la funció com a paràmetre.",
      },
    },
    {
      slug: "abast-closures",
      title: "Abast i closures",
      summary:
        "On viu cada variable i com una funció pot recordar l'entorn on va néixer.",
      goals: [
        "Entendre l'abast global, de funció i de bloc.",
        "Explicar què és un closure.",
        "Crear estat privat amb una funció.",
      ],
      sections: [
        {
          title: "Àmbits",
          body: `
            <p>Una variable declarada amb <code>let</code> o <code>const</code> dins d'un bloc només existeix dins d'aquell bloc. A l'interior d'una funció pots veure les variables de fora, però no al revés.</p>
            <p>Aquesta cadena de cerca s'anomena <em>scope chain</em>: el motor busca la variable al bloc actual i, si no hi és, puja cap enfora.</p>
          `,
          lang: "js",
          code: `const global = "global";

function externa() {
  const deFuncio = "externa";

  function interna() {
    const propia = "interna";
    console.log(propia, deFuncio, global);
  }

  interna();
  console.log(propia);
}

externa();`,
        },
        {
          title: "Closures",
          body: `
            <p>Un <strong>closure</strong> és una funció que recorda les variables de l'entorn on va ser creada, encara que aquell entorn ja hagi acabat.</p>
            <p>És el mecanisme que permet crear comptadors i estat privat sense classes.</p>
          `,
          lang: "js",
          code: `function creaComptador() {
  let compte = 0;

  return function () {
    compte += 1;
    return compte;
  };
}

const comptador = creaComptador();
console.log(comptador());
console.log(comptador());

const unAltre = creaComptador();
console.log(unAltre());`,
        },
        {
          title: "Per a què serveixen",
          body: `
            <p>Els closures apareixen a tot arreu: callbacks que recorden dades, gestors d'esdeveniments, mòduls amb estat intern i funcions que es "configuren" amb paràmetres.</p>
          `,
          lang: "js",
          code: `function creaSaludador(salutacio) {
  return (nom) => salutacio + ", " + nom;
}

const bonDia = creaSaludador("Bon dia");
const bonaTarda = creaSaludador("Bona tarda");

console.log(bonDia("Ada"));
console.log(bonaTarda("Alan"));

function multiplicador(factor) {
  return (n) => n * factor;
}

const triple = multiplicador(3);
console.log(triple(7));`,
          note: "Un closure manté vives les variables que referencia: si desa objectes grans, no s'alliberen mentre la funció existeixi.",
        },
      ],
      exercise: {
        brief:
          "Crea una funció que retorni un objecte amb dos mètodes: un per incrementar un comptador intern i un per llegir-lo. El comptador no ha de ser accessible des de fora.",
        hint: "Declara la variable dins de la funció creadora i retorna els mètodes que la fan servir.",
      },
    },
    {
      slug: "this-i-fletxes",
      title: "La paraula this i les funcions fletxa",
      summary:
        "El valor més confús del llenguatge, explicat amb els cinc casos que realment et trobaràs.",
      goals: [
        "Saber a què apunta <code>this</code> segons el tipus de crida.",
        "Entendre per què una fletxa no té <code>this</code> propi.",
        "Evitar els errors típics en callbacks.",
      ],
      sections: [
        {
          title: "A què apunta this",
          body: `
            <p><code>this</code> no depèn de on es declara la funció, sinó de com es crida:</p>
            <ul>
              <li>Mètode d'objecte ➜ l'objecte.</li>
              <li>Funció sola ➜ <code>undefined</code> en mode estricte.</li>
              <li>Crida amb <code>call</code>, <code>apply</code> o <code>bind</code> ➜ el que li indiquis.</li>
              <li>Funció fletxa ➜ hereta el <code>this</code> de fora.</li>
            </ul>
          `,
          lang: "js",
          code: `const alumne = {
  nom: "Ada",
  saluda() {
    return "Hola, " + this.nom;
  },
};

console.log(alumne.saluda());

const senseObjecte = alumne.saluda;
console.log(senseObjecte());

const lligada = alumne.saluda.bind(alumne);
console.log(lligada());`,
        },
        {
          title: "Fletxes i callbacks",
          body: `
            <p>Dins d'un mètode, un <code>setTimeout</code> amb funció normal perd el <code>this</code>. Amb una fletxa, el conserva.</p>
            <p>Aquesta és la raó principal per la qual les fletxes són tan còmodes en callbacks.</p>
          `,
          lang: "js",
          code: `const rellotge = {
  segons: 0,
  inicia() {
    setTimeout(function () {
      console.log("Amb funció normal:", this);
    }, 0);

    setTimeout(() => {
      console.log("Amb fletxa, segons =", this.segons);
    }, 100);
  },
};

rellotge.inicia();`,
        },
        {
          title: "Quan no fer servir fletxes",
          body: `
            <p>No facis servir fletxes quan necessitis el <code>this</code> dinàmic: mètodes d'objecte, prototips o constructors. I recorda que una fletxa no pot ser constructora: <code>new</code> dona error.</p>
          `,
          lang: "js",
          code: `function Persona(nom) {
  this.nom = nom;
}

Persona.prototype.saluda = function () {
  return "Hola, " + this.nom;
};

const p = new Persona("Alan");
console.log(p.saluda());

const objecte = {
  valor: 42,
  llegeix: () => {
    return this;
  },
};

console.log(objecte.llegeix());`,
        },
      ],
      exercise: {
        brief:
          "Crea un objecte amb un mètode que iniciï un temporitzador i, després d'un segon, mostri un comptador intern. Fes-ho primer amb funció normal i després amb fletxa.",
        hint: "Si obtens <code>undefined</code>, és que has perdut el <code>this</code>: canvia la funció per una fletxa.",
      },
    },
    {
      slug: "iife",
      title: "IIFE: funcions que s'executen totes soles",
      summary:
        "Una funció anònima embolcallada en parèntesis que s'executa immediatament i crea un àmbit privat.",
      goals: [
        "Escriure i reconèixer un IIFE.",
        "Evitar contaminar l'àmbit global.",
        "Entendre el patró de mòdul clàssic.",
      ],
      sections: [
        {
          title: "La sintaxi",
          body: `
            <p>Un IIFE (<em>Immediately Invoked Function Expression</em>) és una funció que es declara i s'executa alhora. Els parèntesis que l'envolten fan que el motor la tracti com una expressió.</p>
            <p>Rep i retorna valors com qualsevol funció, però les seves variables no surten a fora.</p>
          `,
          lang: "js",
          code: `(function () {
  const missatge = "només dins";
  console.log(missatge);
})();

const resultat = (function (a, b) {
  return a + b;
})(2, 3);

console.log(resultat);

(() => {
  console.log("versió fletxa");
})();`,
        },
        {
          title: "Per al patró de mòdul",
          body: `
            <p>Abans dels mòduls, un IIFE servia per amagar detalls i exposar només el necessari. Encara el veuràs en codi antic i en llibreries.</p>
          `,
          lang: "js",
          code: `const Comptador = (function () {
  let total = 0;

  function incrementa() {
    total += 1;
    return total;
  }

  return {
    incrementa,
    get total() {
      return total;
    },
  };
})();

Comptador.incrementa();
Comptador.incrementa();
console.log(Comptador.total);`,
        },
        {
          title: "Quan encara és útil",
          body: `
            <p>Amb els mòduls ES6 (<code>import</code> i <code>export</code>) i els blocs amb <code>let</code>, l'IIFE ha perdut protagonisme. Encara serveix per a scripts clàssics sense mòduls i per executar codi d'inicialització en un àmbit propi.</p>
          `,
          lang: "js",
          code: `(() => {
  "use strict";
  let iniciat = false;

  function arrenca() {
    if (iniciat) return;
    iniciat = true;
    console.log("Aplicació iniciada");
  }

  arrenca();
  arrenca();
})();`,
        },
      ],
      exercise: {
        brief:
          "Escriu un IIFE que creï tres variables internes i exposi només una funció que les faci servir. Comprova que des de fora no hi pots accedir.",
        hint: "Retorna un objecte amb la funció pública i deixa les dades dins de l'IIFE.",
      },
    },
    {
      slug: "context-execucion",
      title: "Context d'execució i pila de crides",
      summary:
        "Què passa dins del motor quan el codi s'executa: elevació, àmbits i la pila que el navegador mostra als errors.",
      goals: [
        "Entendre les dues fases d'execució.",
        "Explicar l'elevació de variables i funcions.",
        "Llegir una pila de crides.",
      ],
      sections: [
        {
          title: "Dues fases",
          body: `
            <p>Quan s'executa un codi, el motor primer el reconeix (crea l'àmbit i eleva declaracions) i després l'executa línia a línia.</p>
            <p>Per això pots cridar una funció declarada abans de la seva definició. Les declaracions amb <code>var</code> queden com a <code>undefined</code>; amb <code>let</code> i <code>const</code> hi ha una zona temporal morta i dona error.</p>
          `,
          lang: "js",
          code: `console.log(typeof elevada);
console.log(elevada());

function elevada() {
  return "funció elevada";
}

console.log(typeof ambVar);
var ambVar = 1;

try {
  console.log(ambLet);
} catch (error) {
  console.log("Error:", error.message);
}
let ambLet = 2;`,
        },
        {
          title: "La pila de crides",
          body: `
            <p>Cada funció cridada s'apila sobre l'anterior. Quan acaba, es desapila i el control torna a qui la va cridar. La profunditat màxima és limitada.</p>
            <p>Quan veus <em>Maximum call stack size exceeded</em>, tens una recursió sense cas base.</p>
          `,
          lang: "js",
          code: `function a() {
  return b();
}

function b() {
  return c();
}

function c() {
  return "final";
}

console.log(a());

function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

console.log(factorial(5));`,
        },
        {
          title: "Llegir un error",
          body: `
            <p>La traça d'un error llegeix de dalt a baix: el primer lloc és on va fallar, i els següents són els qui l'havien cridat. Saber-ho estalvia molt de temps.</p>
          `,
          lang: "js",
          code: `function divideix(a, b) {
  if (b === 0) {
    throw new Error("No es pot dividir per zero");
  }
  return a / b;
}

function calcula() {
  return divideix(10, 0);
}

try {
  calcula();
} catch (error) {
  console.log(error.message);
}`,
        },
      ],
      exercise: {
        brief:
          "Escriu tres funcions que es cridin en cadena i provoca un error a l'última. Llegeix la traça i identifica les tres crides.",
        hint: "La primera línia de la traça és on es va llançar l'error; les següents són els qui la van cridar.",
      },
    },
    {
      slug: "condicionals",
      title: "Condicionals i flux de control",
      summary:
        "Decidir què fa el programa amb <code>if</code>, <code>else</code>, <code>switch</code> i condicions que es llegeixen bé.",
      goals: [
        "Escriure condicions clares amb <code>if</code> i <code>else</code>.",
        "Fer servir <code>switch</code> quan toca.",
        "Aplicar clàusules de sortida primerenca.",
      ],
      sections: [
        {
          title: "if, else if, else",
          body: `
            <p>Les condicions s'avaluen en ordre i s'executa el primer bloc que sigui cert. Si cap ho és, s'executa el bloc <code>else</code>.</p>
            <p>Posa les condicions més específiques a dalt: si comproves <code>&gt; 0</code> abans que <code>&gt; 100</code>, el segon cas no s'assolirà mai.</p>
          `,
          lang: "js",
          code: `function qualificacio(nota) {
  if (nota < 5) {
    return "suspès";
  } else if (nota < 7) {
    return "aprovat";
  } else if (nota < 9) {
    return "notable";
  }
  return "excel·lent";
}

console.log(qualificacio(4.5));
console.log(qualificacio(8));
console.log(qualificacio(9.5));`,
        },
        {
          title: "switch",
          body: `
            <p><code>switch</code> compara amb <code>===</code> i salta a l'etiqueta que coincideix. Sense <code>break</code> continua executant les etiquetes següents: això s'anomena <em>fallthrough</em> i de vegades és intencionat.</p>
          `,
          lang: "js",
          code: `function diaTipus(dia) {
  switch (dia) {
    case "dissabte":
    case "diumenge":
      return "cap de setmana";
    case "dilluns":
      return "inici de setmana";
    default:
      return "entre setmana";
  }
}

console.log(diaTipus("dissabte"));
console.log(diaTipus("dimarts"));

const codi = 2;
switch (codi) {
  case 1:
    console.log("un");
    break;
  default:
    console.log("cap coincidència");
}`,
        },
        {
          title: "Sortides primerenques",
          body: `
            <p>Quan una funció té diverses validacions, retorna de seguida si alguna falla. El codi queda pla, sense <code>if</code> niats que cal llegir amb atenció.</p>
          `,
          lang: "js",
          code: `function registra(usuari) {
  if (!usuari) return "Falta l'usuari";
  if (usuari.length < 3) return "Massa curt";
  if (usuari.length > 12) return "Massa llarg";

  return "Usuari acceptat: " + usuari;
}

console.log(registra(""));
console.log(registra("ab"));
console.log(registra("ada_lovelace"));`,
          note: "No cal <code>else</code> després d'un <code>return</code>: el codi ja ha sortit de la funció.",
        },
      ],
      exercise: {
        brief:
          "Escriu una funció que classifiqui un número com a negatiu, zero, petit, mitjà o gran, amb sortides primerenques i sense <code>if</code> niats.",
        hint: "Comença pels casos que descarten (<code>&lt; 0</code>, <code>=== 0</code>) i continua amb rangs.",
      },
    },
  ],
};