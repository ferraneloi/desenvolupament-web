export default {
  title: "Asincronia i xarxa",
  description:
    "Codi que espera sense bloquejar: promeses, async/await i peticions HTTP amb fetch.",
  chapters: [
    {
      slug: "promeses",
      title: "Promeses i encadenament",
      summary:
        "Un objecte que representa un resultat futur: pendent, resolt o rebutjat.",
      goals: [
        "Crear i consumir promeses.",
        "Encadenar amb <code>then</code> i gestionar errors amb <code>catch</code>.",
        "Fer servir <code>Promise.all</code> i <code>Promise.allSettled</code>.",
      ],
      sections: [
        {
          title: "Estats d'una promesa",
          body: `
            <p>Una promesa comença <strong>pendent</strong> i acaba <strong>resolta</strong> (amb un valor) o <strong>rebutjada</strong> (amb un error). Un cop acabada, no canvia.</p>
            <p><code>then()</code> rep el valor resolt, <code>catch()</code> l'error i <code>finally()</code> s'executa sempre.</p>
          `,
          lang: "js",
          code: `const espera = (ms, valor) =>
  new Promise((resolve) => setTimeout(() => resolve(valor), ms));

espera(100, "dades carregades")
  .then((resultat) => console.log(resultat))
  .finally(() => console.log("fi"));

const falla = new Promise((resolve, reject) => {
  reject(new Error("Alguna cosa ha fallat"));
});

falla.catch((error) => console.log("Error:", error.message));`,
        },
        {
          title: "Encadenar",
          body: `
            <p>Cada <code>then</code> retorna una promesa nova, i el valor que retornis passa al següent. Si retornes una promesa, s'espera automàticament.</p>
            <p>Un sol <code>catch</code> al final captura els errors de tota la cadena.</p>
          `,
          lang: "js",
          code: `const doble = (n) => new Promise((resolve) => setTimeout(() => resolve(n * 2), 50));

doble(2)
  .then((a) => doble(a))
  .then((b) => {
    console.log("Resultat:", b);
    return b + 1;
  })
  .then((final) => console.log("Final:", final))
  .catch((error) => console.log("Error:", error.message));

Promise.resolve(1)
  .then((n) => {
    throw new Error("trencat al segon pas");
  })
  .catch((e) => console.log("Capturat:", e.message));`,
        },
        {
          title: "Diverses alhora",
          body: `
            <p><code>Promise.all()</code> espera totes i falla si una falla. <code>Promise.allSettled()</code> espera totes i retorna l'estat de cadascuna, sense llançar res.</p>
            <p><code>Promise.race()</code> dona la primera que acabi: útil per posar un temps màxim.</p>
          `,
          lang: "js",
          code: `const valor = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));

Promise.all([valor(50, "A"), valor(80, "B")]).then((res) =>
  console.log("Totes:", res)
);

Promise.allSettled([
  valor(30, "ok"),
  Promise.reject(new Error("no")),
]).then((res) => console.log(res.map((r) => r.status)));

Promise.race([valor(20, "ràpid"), valor(200, "lent")]).then((r) =>
  console.log("Guanyadora:", r)
);`,
        },
      ],
      exercise: {
        brief:
          "Crea una funció que retorni una promesa que es resolgui al cap d'un segon i una altra que es rebutgi. Encadena-les i gestiona l'error amb un sol <code>catch</code>.",
        hint: "Recorda que un <code>throw</code> dins d'un <code>then</code> equival a retornar una promesa rebutjada.",
      },
    },
    {
      slug: "async-await",
      title: "async/await i asincronia moderna",
      summary:
        "Escriure codi asíncron com si fos seqüencial, sense perdre el control dels errors.",
      goals: [
        "Declarar funcions <code>async</code>.",
        "Esperar amb <code>await</code>.",
        "Gestionar errors amb <code>try/catch</code>.",
      ],
      sections: [
        {
          title: "La sintaxi",
          body: `
            <p>Una funció <code>async</code> sempre retorna una promesa. Dins seu, <code>await</code> atura l'execució <em>d'aquella funció</em> fins que la promesa es resol, sense bloquejar el navegador.</p>
            <p>És equivalent a encadenar <code>then</code>, però es llegeix de dalt a baix.</p>
          `,
          lang: "js",
          code: `const espera = (ms, valor) =>
  new Promise((resolve) => setTimeout(() => resolve(valor), ms));

async function carrega() {
  console.log("Començo");
  const dades = await espera(100, "resultat");
  console.log("Rebut:", dades);
  return dades.toUpperCase();
}

carrega().then((r) => console.log("Retorn:", r));`,
        },
        {
          title: "Errors",
          body: `
            <p>Amb <code>await</code> els errors es capturen amb <code>try/catch</code>, igual que el codi síncron. Si no els captures, la promesa resultant queda rebutjada.</p>
            <p>No barregis <code>await</code> sense <code>try</code> dins d'un bucle si una fallada no ha d'aturar-ho tot.</p>
          `,
          lang: "js",
          code: `async function divideix(a, b) {
  if (b === 0) throw new Error("Divisió per zero");
  return a / b;
}

async function prova() {
  try {
    console.log(await divideix(10, 2));
    console.log(await divideix(10, 0));
  } catch (error) {
    console.log("Capturat:", error.message);
  } finally {
    console.log("Sempre s'executa");
  }
}

prova();`,
        },
        {
          title: "En sèrie o en paral·lel",
          body: `
            <p>Dos <code>await</code> seguits s'executen en sèrie: el segon espera el primer. Si són independents, llança'ls alhora i espera amb <code>Promise.all</code>.</p>
            <p>La diferència pot ser de segons en una pàgina real.</p>
          `,
          lang: "js",
          code: `const valor = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));

async function sequencial() {
  const a = await valor(100, "A");
  const b = await valor(100, "B");
  return a + b;
}

async function paral·lel() {
  const [a, b] = await Promise.all([valor(100, "A"), valor(100, "B")]);
  return a + b;
}

Promise.all([sequencial(), paral·lel()]).then((r) => console.log(r));`,
          note: "Dins d'un <code>forEach</code>, <code>await</code> no espera: el <code>forEach</code> no és asíncron. Fes servir un <code>for...of</code> o <code>Promise.all(map)</code>.",
        },
      ],
      exercise: {
        brief:
          "Escriu una funció asíncrona que esperi dues promeses independents en paral·lel i una tercera que depengui del resultat de les dues.",
        hint: "Combina <code>Promise.all</code> amb un <code>await</code> posterior.",
      },
    },
    {
      slug: "fetch-api",
      title: "Fetch API i peticions HTTP",
      summary:
        "Demanar dades a un servidor, comprovar la resposta i mostrar-ne el resultat.",
      goals: [
        "Fer una petició amb <code>fetch</code>.",
        "Comprovar <code>response.ok</code> abans de llegir.",
        "Mostrar estats de càrrega i error.",
      ],
      sections: [
        {
          title: "Una petició GET",
          body: `
            <p><code>fetch(url)</code> retorna una promesa amb la resposta. Important: <code>fetch</code> <strong>no</strong> rebutja amb un 404 o un 500: cal mirar <code>response.ok</code>.</p>
            <p><code>response.json()</code> llegeix el cos com a JSON i també és una promesa.</p>
          `,
          lang: "js",
          code: `async function carregaUsuaris() {
  const resposta = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!resposta.ok) {
    throw new Error("Error HTTP " + resposta.status);
  }

  const usuaris = await resposta.json();
  console.log(usuaris.length);
  console.log(usuaris[0].name);
}

carregaUsuaris().catch((error) => console.log(error.message));`,
        },
        {
          title: "Enviar dades",
          body: `
            <p>Per enviar dades: <code>method</code>, <code>headers</code> i <code>body</code>. El cos ha de ser text, per això es converteix l'objecte amb <code>JSON.stringify</code>.</p>
            <p>I sempre comprova l'estat de la resposta abans de donar l'operació per bona.</p>
          `,
          lang: "js",
          code: `async function creaUsuari(dades) {
  const resposta = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dades),
  });

  if (!resposta.ok) throw new Error("No s'ha pogut crear");

  return resposta.json();
}

creaUsuari({ name: "Ada", email: "ada@escola.cat" })
  .then((u) => console.log("Creat:", u.name))
  .catch((e) => console.log(e.message));`,
        },
        {
          title: "Carregar i mostrar",
          body: `
            <p>El flux complet té tres estats: carregant, error i dades. Pinta sempre els tres: una pàgina en blanc mentre espera sembla trencada.</p>
          `,
          lang: "html",
          code: `<button id="carrega">Carrega usuaris</button>
<p id="estat"></p>
<ul id="llista"></ul>

<script>
  const estat = document.getElementById("estat");
  const llista = document.getElementById("llista");

  document.getElementById("carrega").addEventListener("click", async () => {
    estat.textContent = "Carregant…";
    llista.replaceChildren();

    try {
      const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!resposta.ok) throw new Error("Error " + resposta.status);

      const usuaris = await resposta.json();
      estat.textContent = usuaris.length + " usuaris";

      usuaris.slice(0, 5).forEach((u) => {
        const li = document.createElement("li");
        li.textContent = u.name;
        llista.append(li);
      });
    } catch (error) {
      estat.textContent = "No s'han pogut carregar: " + error.message;
    }
  });
</script>`,
        },
      ],
      exercise: {
        brief:
          "Carrega una llista de dades d'una API pública i mostra-la, amb missatge de càrrega i missatge d'error si falla la petició.",
        hint: "Comprova <code>response.ok</code> i embolcalla-ho tot en un <code>try/catch</code>.",
      },
    },
    {
      slug: "oop-basics",
      title: "Bases de la programació orientada a objectes",
      summary:
        "Agrupar dades i comportament en una sola unitat, amb constructors i mètodes.",
      goals: [
        "Crear objectes amb un constructor.",
        "Entendre què és una instància.",
        "Distingir estat i comportament.",
      ],
      sections: [
        {
          title: "Constructor",
          body: `
            <p>Una funció constructora crea objectes amb la mateixa forma. Amb <code>new</code> es crea un objecte buit, s'executa la funció amb <code>this</code> apuntant-hi i es retorna l'objecte.</p>
          `,
          lang: "js",
          code: `function Alumne(nom, nota) {
  this.nom = nom;
  this.nota = nota;
}

Alumne.prototype.aprovat = function () {
  return this.nota >= 5;
};

const ada = new Alumne("Ada", 9);
const alan = new Alumne("Alan", 4);

console.log(ada.aprovat());
console.log(alan.aprovat());
console.log(ada instanceof Alumne);`,
        },
        {
          title: "Estat i comportament",
          body: `
            <p>L'estat són les dades de l'objecte; el comportament són els seus mètodes. Mantenir-los junts té sentit quan les operacions sempre van lligades a les mateixes dades.</p>
            <p>No converteixis tot en objectes: una funció pura sovint és més simple i més fàcil de provar.</p>
          `,
          lang: "js",
          code: `function Compte(saldoInicial) {
  this.saldo = saldoInicial;
}

Compte.prototype.ingressa = function (quantitat) {
  if (quantitat <= 0) throw new Error("Quantitat no vàlida");
  this.saldo += quantitat;
  return this.saldo;
};

Compte.prototype.retira = function (quantitat) {
  if (quantitat > this.saldo) throw new Error("Saldo insuficient");
  this.saldo -= quantitat;
  return this.saldo;
};

const c = new Compte(50);
c.ingressa(25);
console.log(c.retira(30));

try {
  c.retira(1000);
} catch (e) {
  console.log(e.message);
}`,
        },
        {
          title: "Quan convé",
          body: `
            <p>La orientació a objectes és útil quan hi ha diverses instàncies amb el mateix comportament i estat propi. Si només tens un conjunt de dades i operacions, un objecte literal i funcions externes són igual de bons i més senzills.</p>
          `,
          lang: "js",
          code: `const config = { tema: "clar", llengua: "ca" };

function tradueix(clau, cfg) {
  return cfg.llengua === "ca" ? clau : clau.toUpperCase();
}

console.log(tradueix("inici", config));`,
        },
      ],
      exercise: {
        brief:
          "Crea un constructor <code>Llibre</code> amb títol, autor i any, i un mètode que retorni una fitxa. Crea'n dues instàncies i comprova que no comparteixen dades.",
        hint: "Defineix els mètodes al <code>prototype</code> per no duplicar-los a cada instància.",
      },
    },
    {
      slug: "classes-es6",
      title: "Classes ES6 i mètodes",
      summary:
        "La sintaxi moderna per crear objectes: constructor, mètodes, camps i mètodes estàtics.",
      goals: [
        "Declarar classes i instàncies.",
        "Fer servir <code>constructor</code>, <code>get</code> i <code>static</code>.",
        "Entendre què és un camp privat.",
      ],
      sections: [
        {
          title: "Classe i instància",
          body: `
            <p>Una classe és una plantilla. El <code>constructor</code> s'executa amb <code>new</code> i els mètodes es defineixen al cos de la classe.</p>
            <p>Sota el capó, les classes són funcions constructores amb prototips: la sintaxi és més neta, el mecanisme és el mateix.</p>
          `,
          lang: "js",
          code: `class Alumne {
  constructor(nom, nota) {
    this.nom = nom;
    this.nota = nota;
  }

  aprovat() {
    return this.nota >= 5;
  }

  toString() {
    return this.nom + " (" + this.nota + ")";
  }
}

const ada = new Alumne("Ada", 9);
console.log(String(ada));
console.log(ada.aprovat());`,
        },
        {
          title: "Getters i estàtics",
          body: `
            <p>Un <code>get</code> es comporta com una propietat però calcula el valor. Un mètode <code>static</code> pertany a la classe, no a les instàncies.</p>
          `,
          lang: "js",
          code: `class Cercle {
  constructor(radi) {
    this.radi = radi;
  }

  get area() {
    return Math.PI * this.radi ** 2;
  }

  static compara(a, b) {
    return a.radi - b.radi;
  }
}

const c = new Cercle(2);
console.log(c.area.toFixed(2));

const llista = [new Cercle(3), new Cercle(1)].sort(Cercle.compara);
console.log(llista.map((x) => x.radi));`,
        },
        {
          title: "Camps i privacitat",
          body: `
            <p>Els camps es declaren al cos de la classe. Amb <code>#</code> al davant són privats: no es poden llegir ni modificar des de fora.</p>
            <p>És una privacitat real del llenguatge, no només un acord d'estil.</p>
          `,
          lang: "js",
          code: `class Compte {
  #saldo = 0;

  ingressa(quantitat) {
    if (quantitat <= 0) throw new Error("Quantitat no vàlida");
    this.#saldo += quantitat;
    return this;
  }

  get saldo() {
    return this.#saldo;
  }
}

const compte = new Compte();
compte.ingressa(30).ingressa(20);
console.log(compte.saldo);
console.log(compte["#saldo"]);`,
        },
      ],
      exercise: {
        brief:
          "Escriu una classe <code>Producte</code> amb nom, preu i un mètode que retorni el preu amb IVA. Afegeix-hi un camp privat per a l'estoc.",
        hint: "Fes servir un <code>get</code> per llegir l'estoc i un mètode per modificar-lo amb validació.",
      },
    },
  ],
};