export default {
  title: "Fonaments del JavaScript",
  description:
    "Què és el JavaScript, com es declaren les dades i com es fan els primers càlculs i comparacions.",
  chapters: [
    {
      slug: "introduccio-javascript",
      title: "Introducció al JavaScript i als fonaments",
      summary:
        "El llenguatge que dona comportament a la pàgina: què pot fer, on s'executa i com s'hi escriu el primer programa.",
      goals: [
        "Entendre què aporta el JavaScript a l'HTML i al CSS.",
        "Incloure codi amb <code>&lt;script&gt;</code> i veure'n el resultat.",
        "Fer servir la consola com a eina de treball.",
      ],
      sections: [
        {
          title: "Què fa el JavaScript",
          body: `
            <p>L'HTML estructura, el CSS dona estil i el <strong>JavaScript</strong> dona comportament: respon a clics, valida formularis, carrega dades i canvia la pàgina sense recarregar-la.</p>
            <p>És un llenguatge interpretat: el navegador llegeix el codi i l'executa. També funciona fora del navegador (servidors, editors, eines), però aquest curs se centra en la pàgina.</p>
          `,
          lang: "js",
          code: `console.log("Hola, món!");
console.log(2 + 3);

const nom = "Aula HTML";
console.log("Benvinguda a " + nom);`,
        },
        {
          title: "Incloure el codi",
          body: `
            <p>El codi s'inclou amb <code>&lt;script&gt;</code>. Si toca el document, col·loca'l amb <code>defer</code> al <code>head</code> o al final del <code>body</code>, perquè els elements ja existeixin quan s'executi.</p>
            <p><code>console.log()</code> escriu a la consola del navegador: és el primer lloc on has de mirar quan alguna cosa no funciona.</p>
          `,
          lang: "html",
          code: `<h1 id="titol">Pàgina de prova</h1>

<script>
  const titol = document.querySelector("#titol");
  console.log("El títol diu:", titol.textContent);
  titol.textContent = "Text canviat amb JavaScript";
</script>`,
        },
        {
          title: "La consola",
          body: `
            <p>Obre les eines de desenvolupament amb <kbd>F12</kbd> o <kbd>Ctrl</kbd> + <kbd>Maj</kbd> + <kbd>I</kbd> i ves a la pestanya <em>Console</em>. Hi pots escriure codi directament i provar-lo.</p>
            <p>Errors habituals que veuràs aquí: una variable no definida, una funció que no és funció o una propietat d'<code>null</code>. El missatge i la línia t'ho diuen tot.</p>
          `,
          lang: "js",
          code: `console.log("Text normal");
console.warn("Avís: això és groc");
console.error("Error: això és vermell");

let prova = 10;
console.log(typeof prova);`,
          note: "Cada exemple d'aquest curs es pot executar: prem <strong>Resultat</strong> i veuràs la consola simulada.",
        },
      ],
      exercise: {
        brief:
          "Escriu un script que mostri per consola una salutació, el resultat de sumar dues xifres i el tipus de dada de cadascuna.",
        hint: "Fes servir <code>typeof</code> per saber si un valor és <code>number</code> o <code>string</code>.",
      },
    },
    {
      slug: "variables-declaracions",
      title: "Variables i declaracions: var, let i const",
      summary:
        "Com es desa un valor i com es canvia. Les tres paraules clau i per què només dues són recomanables avui.",
      goals: [
        "Declarar variables amb <code>let</code> i <code>const</code>.",
        "Entendre la diferència amb <code>var</code>.",
        "Escollir noms clars i respectar l'abast.",
      ],
      sections: [
        {
          title: "let i const",
          body: `
            <p><code>let</code> declara una variable que pot canviar; <code>const</code> declara una referència que no es pot reassignar.</p>
            <p>Important: un objecte declarat amb <code>const</code> sí que pot canviar per dins. El que no pots fer és assignar-li un altre objecte.</p>
          `,
          lang: "js",
          code: `let intents = 0;
intents = intents + 1;
console.log(intents);

const curs = "JavaScript";
const alumne = { nom: "Ada", edat: 16 };

alumne.edat = 17;
console.log(alumne);`,
        },
        {
          title: "var i els seus problemes",
          body: `
            <p><code>var</code> existeix per compatibilitat, però té un abast de funció en lloc de bloc i permet redeclaracions silencioses. Això provoca errors difícils de trobar.</p>
            <p>Regla pràctica: <code>const</code> per defecte, <code>let</code> quan el valor ha de canviar, <code>var</code> mai en codi nou.</p>
          `,
          lang: "js",
          code: `if (true) {
  var ambVar = "visible fora";
  let ambLet = "només dins";
}

console.log(ambVar);

try {
  console.log(ambLet);
} catch (error) {
  console.log("Error:", error.message);
}`,
        },
        {
          title: "Noms i abast",
          body: `
            <p>Una variable viu dins del bloc <code>{ }</code> on es declara. Un nom ha de començar per lletra, <code>$</code> o <code>_</code> i no pot tenir espais.</p>
            <p>Escull noms que expliquin el contingut (<code>totalPreu</code>, no <code>tp</code>) i escriu-les en <em>camelCase</em>.</p>
          `,
          lang: "js",
          code: `const preuUnitat = 12.5;
const quantitat = 3;
const totalPreu = preuUnitat * quantitat;

console.log("Total:", totalPreu, "€");

function calcula() {
  const intern = "només aquí dins";
  return intern;
}

console.log(calcula());`,
        },
      ],
      exercise: {
        brief:
          "Crea tres variables: una constant amb el nom del curs, una que compti intents i un objecte alumne. Canvia'n el compte i una propietat de l'objecte, i explica què passa.",
        hint: "Si intentes reassignar una <code>const</code>, el navegador llança un <code>TypeError</code>.",
      },
    },
    {
      slug: "tipus-de-dades",
      title: "Tipus de dades i sistema de tipus",
      summary:
        "Set tipus primitius, dos compostos i una pregunta constant: quin tipus és això?",
      goals: [
        "Reconèixer els tipus primitius i <code>typeof</code>.",
        "Diferenciar <code>null</code> d'<code>undefined</code>.",
        "Entendre que els objectes es copien per referència.",
      ],
      sections: [
        {
          title: "Primitius",
          body: `
            <p>Els tipus primitius són <code>string</code>, <code>number</code>, <code>boolean</code>, <code>undefined</code>, <code>null</code>, <code>symbol</code> i <code>bigint</code>.</p>
            <p><code>typeof</code> et diu el tipus, amb una excepció famosa: <code>typeof null</code> retorna <code>"object"</code> per un error històric del llenguatge.</p>
          `,
          lang: "js",
          code: `console.log(typeof "hola");
console.log(typeof 42);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof Symbol("id"));
console.log(typeof 10n);`,
        },
        {
          title: "null i undefined",
          body: `
            <p><code>undefined</code> vol dir «encara no té valor»: una variable declarada sense assignar, una propietat que no existeix, una funció que no retorna res.</p>
            <p><code>null</code> és una absència <strong>intencionada</strong>: tu decideixes que allà no hi ha res. Confondre'ls és una font clàssica d'errors.</p>
          `,
          lang: "js",
          code: `let senseValor;
console.log(senseValor);

const persona = { nom: "Ada", telefon: null };
console.log(persona.telefon);
console.log(persona.correu);

console.log(senseValor === null);
console.log(senseValor == null);`,
        },
        {
          title: "Objectes i referències",
          body: `
            <p>Els objectes i els arrays no es guarden dins de la variable: la variable apunta a una adreça. Si copies la variable, copies la referència, i els dos noms modifiquen el mateix objecte.</p>
          `,
          lang: "js",
          code: `const a = { valor: 1 };
const b = a;

b.valor = 99;
console.log(a.valor);

const copia = { ...a };
copia.valor = 1;
console.log(a.valor);`,
          note: "Per comparar contingut d'objectes no serveix <code>===</code>: compara referències, no valors.",
        },
      ],
      exercise: {
        brief:
          "Declara una variable de cada tipus primitiu i mostra'n el resultat de <code>typeof</code>. Després crea un objecte, copia'l amb <em>spread</em> i canvia'n una propietat.",
        hint: "Comprova que l'objecte original no canvia quan modifiques la còpia.",
      },
    },
    {
      slug: "conversio-tipus",
      title: "Conversió i coerció de tipus",
      summary:
        "Quan el llenguatge converteix sol i quan ho has de fer tu. La diferència entre <code>==</code> i <code>===</code>.",
      goals: [
        "Convertir explícitament amb <code>Number()</code>, <code>String()</code> i <code>Boolean()</code>.",
        "Reconèixer les coerccions automàtiques.",
        "Recordar quins valors són falsy.",
      ],
      sections: [
        {
          title: "Conversió explícita",
          body: `
            <p>Converteix tu mateix quan llegeixis dades d'un formulari: un camp de text sempre retorna un <code>string</code>, encara que hi escriguin un número.</p>
            <p><code>parseInt()</code> i <code>parseFloat()</code> llegeixen el número inicial d'un text; <code>Number()</code> és més estricte i retorna <code>NaN</code> si el text no és un número complet.</p>
          `,
          lang: "js",
          code: `console.log(Number("42"));
console.log(Number("42abc"));
console.log(parseInt("42abc"));
console.log(parseFloat("3.14kg"));
console.log(String(7) + "!");
console.log(Boolean(""));`,
        },
        {
          title: "Coerció automàtica",
          body: `
            <p>L'operador <code>+</code> concatena si un dels dos costats és un <code>string</code>. Els altres operadors matemàtics converteixen a número.</p>
            <p>Aquesta diferència explica per què <code>"5" + 1</code> dona <code>"51"</code> i <code>"5" - 1</code> dona <code>4</code>.</p>
          `,
          lang: "js",
          code: `console.log("5" + 1);
console.log("5" - 1);
console.log("5" * "2");
console.log(true + 1);
console.log([] + {});

console.log(Number("5") + 1);`,
        },
        {
          title: "Valors falsy i comparacions",
          body: `
            <p>Aquests sis valors es comporten com a fals en una condició: <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code> i <code>NaN</code>. Tota la resta és cert, incloent-hi <code>"0"</code> i <code>[]</code>.</p>
            <p>Fes servir sempre <code>===</code> i <code>!==</code>: comparen tipus i valor, sense conversions inesperades.</p>
          `,
          lang: "js",
          code: `console.log(Boolean("0"));
console.log(Boolean(0));
console.log(Boolean([]));

console.log("5" == 5);
console.log("5" === 5);
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN === NaN);`,
        },
      ],
      exercise: {
        brief:
          "Simula un formulari: llegeix dos valors de text, converteix-los a número i mostra'n la suma. Després prova amb un text que no sigui número i comprova què surt.",
        hint: "Si el resultat és <code>NaN</code>, valida amb <code>Number.isNaN()</code> abans d'operar.",
      },
    },
    {
      slug: "operadors-expressions",
      title: "Operadors i expressions",
      summary:
        "Aritmètica, assignació, comparació, lògics i l'operador de fusió nul·la. Les peces amb què es construeixen les decisions.",
      goals: [
        "Fer servir els operadors aritmètics i d'assignació.",
        "Combinar condicions amb <code>&amp;&amp;</code>, <code>||</code> i <code>??</code>.",
        "Escriure un operador ternari llegible.",
      ],
      sections: [
        {
          title: "Aritmètica i assignació",
          body: `
            <p>A més de <code>+ - * /</code>, hi ha el mòdul <code>%</code> (el residu) i la potència <code>**</code>. El mòdul és la manera habitual de saber si un número és parell.</p>
            <p>Les formes curtes (<code>+=</code>, <code>-=</code>, <code>++</code>) estalvien codi, però no abusis de <code>++</code> dins d'una expressió: fa el codi difícil de llegir.</p>
          `,
          lang: "js",
          code: `let total = 10;
total += 5;
total *= 2;
total -= 1;
console.log(total);

console.log(7 % 2 === 0);
console.log(2 ** 10);

let comptador = 0;
comptador++;
console.log(comptador);`,
        },
        {
          title: "Comparacions i lògics",
          body: `
            <p><code>&amp;&amp;</code> retorna el primer valor fals o l'últim si tots són certs; <code>||</code> retorna el primer valor cert. Tots dos fan curtcircuit: si el primer ja decideix, el segon no s'avalua.</p>
            <p><code>&amp;&amp;</code> i <code>||</code> retornen <em>valors</em>, no només <code>true</code> o <code>false</code>. Per això serveixen per posar valors per defecte.</p>
          `,
          lang: "js",
          code: `const edat = 16;
const tePermis = false;

console.log(edat >= 18 && tePermis);
console.log(edat >= 18 || tePermis);
console.log(!tePermis);

const nomUsuari = "";
console.log(nomUsuari || "anònim");

console.log(5 > 3 && "Això surt");`,
        },
        {
          title: "Ternari i fusió nul·la",
          body: `
            <p>El ternari <code>condició ? valorSiCert : valorSiFals</code> és ideal per a assignacions simples. Si has d'encadenar-ne dos, millor un <code>if</code>.</p>
            <p><code>??</code> només substitueix <code>null</code> i <code>undefined</code>, no buits ni zeros: és el que vols per a valors per defecte.</p>
          `,
          lang: "js",
          code: `const nota = 7;
const resultat = nota >= 5 ? "aprovat" : "suspès";
console.log(resultat);

const configuracio = { intents: 0 };
console.log(configuracio.intents || 3);
console.log(configuracio.intents ?? 3);

const senseDefinir = undefined;
console.log(senseDefinir ?? "valor per defecte");`,
        },
      ],
      exercise: {
        brief:
          "Escriu una expressió que digui si un número és parell i més gran que 10 alhora, i una altra que posi un nom per defecte només si el nom és <code>null</code>.",
        hint: "Combina <code>% 2 === 0</code> amb <code>&amp;&amp;</code> i fes servir <code>??</code> per al nom.",
      },
    },
  ],
};