export default {
  title: "El DOM i els esdeveniments",
  description:
    "Convertir l'HTML en una estructura que el JavaScript pot llegir, modificar i escoltar.",
  chapters: [
    {
      slug: "dom-teoria",
      title: "Teoria del DOM: l'arbre del document",
      summary:
        "Què és el DOM, com es relaciona amb l'HTML i per què tot el que veuràs després depèn d'aquest model.",
      goals: [
        "Explicar què és el DOM i quin paper hi fa el navegador.",
        "Identificar nodes, elements i text.",
        "Recórrer l'arbre amb <code>document</code>.",
      ],
      sections: [
        {
          title: "L'HTML es converteix en arbre",
          body: `
            <p>El navegador llegeix l'HTML i construeix el <strong>DOM</strong> (<em>Document Object Model</em>): una estructura d'objectes en forma d'arbre que representa la pàgina.</p>
            <p>El DOM és viure: si el JavaScript l'afegeix un element, l'HTML del fitxer no canvia, però la pàgina sí. El que veus a l'inspector és el DOM actual, no el fitxer original.</p>
          `,
          lang: "html",
          code: `<h1 id="titol">Un document petit</h1>
<p class="text">El paràgraf <strong>amb negreta</strong> dins.</p>

<script>
  console.log(document.documentElement.tagName);
  console.log(document.body.children.length);
  console.log(document.querySelector("strong").textContent);
</script>`,
        },
        {
          title: "Nodes, elements i text",
          body: `
            <p>Tot el que hi ha a l'arbre és un <strong>node</strong>. Els més importants són els elements (<code>Element</code>), els textos (<code>Text</code>) i el document sencer.</p>
            <p><code>document</code> és l'entrada: des d'ell es pot arribar a qualsevol element amb <code>querySelector</code> o <code>getElementById</code>.</p>
          `,
          lang: "html",
          code: `<div id="contenidor">
  Text solt
  <span>un span</span>
</div>

<script>
  const contenidor = document.getElementById("contenidor");
  console.log(contenidor.childNodes.length);
  console.log(contenidor.children.length);
  console.log(contenidor.nodeName);
  console.log(contenidor.parentElement.tagName);
</script>`,
        },
        {
          title: "Per què això importa",
          body: `
            <p>Tot el que faràs amb JavaScript sobre la pàgina passa pel DOM: llegir valors, crear elements, canviar classes o reaccionar a un clic.</p>
            <p>I el DOM és lento si el modifiques en excés: cada canvi pot obligar el navegador a recalcular el disseny. Per això convé agrupar modificacions.</p>
          `,
          lang: "html",
          code: `<ul id="llista"></ul>

<script>
  const llista = document.getElementById("llista");
  const noms = ["Ada", "Alan", "Grace"];

  const fragment = document.createDocumentFragment();

  for (const nom of noms) {
    const item = document.createElement("li");
    item.textContent = nom;
    fragment.appendChild(item);
  }

  llista.appendChild(fragment);
</script>`,
        },
      ],
      exercise: {
        brief:
          "Escriu una pàgina amb tres elements niats i mostra per consola el nombre de fills, el nom de l'element pare i el text d'un descendent.",
        hint: "Fes servir <code>children.length</code>, <code>parentElement</code> i <code>textContent</code>.",
      },
    },
    {
      slug: "dom-manipulacio",
      title: "Manipulació i selecció d'elements",
      summary:
        "Seleccionar el que vols canviar i escollir bé entre <code>textContent</code>, <code>innerHTML</code> i <code>classList</code>.",
      goals: [
        "Seleccionar amb <code>querySelector</code> i <code>querySelectorAll</code>.",
        "Canviar text, atributs i classes.",
        "Evitar riscos amb <code>innerHTML</code>.",
      ],
      sections: [
        {
          title: "Seleccionar",
          body: `
            <p><code>document.querySelector()</code> retorna el primer element que coincideix; <code>querySelectorAll()</code> retorna una llista estàtica.</p>
            <p>Una llista de NodeList no té tots els mètodes d'array: converteix-la amb <code>Array.from()</code> si te'n calen.</p>
          `,
          lang: "html",
          code: `<p class="avis">Primer avís</p>
<p class="avis">Segon avís</p>

<script>
  const un = document.querySelector(".avis");
  console.log(un.textContent);

  const tots = document.querySelectorAll(".avis");
  console.log(tots.length);

  Array.from(tots).forEach((el, i) => {
    el.textContent = "Avís " + (i + 1) + " actualitzat";
  });
</script>`,
        },
        {
          title: "Text, atributs i classes",
          body: `
            <p><code>textContent</code> escriu text pla; <code>innerHTML</code> interpreta etiquetes. Amb dades de l'usuari, <code>textContent</code> és l'opció segura: <code>innerHTML</code> pot injectar codi.</p>
            <p>Per estilitzar des de JavaScript, el millor és afegir o treure classes: la presentació es queda al CSS.</p>
          `,
          lang: "html",
          code: `<div id="caixa">Text inicial</div>
<button id="boto">Canvia</button>

<script>
  const caixa = document.getElementById("caixa");

  caixa.classList.add("destacat");
  caixa.setAttribute("data-estat", "actiu");

  document.getElementById("boto").addEventListener("click", () => {
    caixa.textContent = "Text canviat";
    caixa.classList.toggle("actiu");
  });
</script>

<style>
  .destacat { background: #fdf2d0; padding: 10px; border-radius: 8px; }
  .actiu { border-left: 4px solid #1f7a5c; }
</style>`,
        },
        {
          title: "Crear i inserir",
          body: `
            <p>Per afegir contingut: <code>createElement()</code>, omplir l'element i inserir-lo amb <code>append()</code>, <code>prepend()</code> o <code>insertAdjacentElement()</code>.</p>
            <p>Evita fer servir <code>document.write()</code>: només funciona abans que la pàgina acabi de carregar-se.</p>
          `,
          lang: "html",
          code: `<ul id="llista"><li>Primer</li></ul>
<button id="afegeix">Afegeix</button>

<script>
  const llista = document.getElementById("llista");
  let comptador = 1;

  document.getElementById("afegeix").addEventListener("click", () => {
    comptador += 1;
    const item = document.createElement("li");
    item.textContent = "Element " + comptador;
    llista.append(item);
  });
</script>`,
        },
      ],
      exercise: {
        brief:
          "Crea una llista buida i un botó que hi afegeixi elements numerats. Després afegeix un segon botó que canviï el color de tots els elements amb una classe.",
        hint: "Fes servir <code>createElement</code> i, per als colors, <code>classList.add</code>.",
      },
    },
    {
      slug: "dom-traversal",
      title: "Recórrer el DOM: pares, fills i germans",
      summary:
        "Moure's per l'arbre des d'un element concret, amb les propietats que retornen elements i les que retornen nodes.",
      goals: [
        "Pujar al pare i baixar als fills.",
        "Diferenciar <code>children</code> de <code>childNodes</code>.",
        "Recórrer germans sense sortir de l'arbre.",
      ],
      sections: [
        {
          title: "Pares i fills",
          body: `
            <p><code>parentElement</code> puja un nivell. <code>children</code> dona només elements fills, mentre que <code>childNodes</code> inclou textos i comentaris.</p>
            <p><code>firstElementChild</code> i <code>lastElementChild</code> són dreceres útils.</p>
          `,
          lang: "html",
          code: `<div id="pare">
  <p>Un</p>
  <p>Dos</p>
  <p>Tres</p>
</div>

<script>
  const pare = document.getElementById("pare");
  console.log(pare.children.length);
  console.log(pare.childNodes.length);
  console.log(pare.firstElementChild.textContent);
  console.log(pare.lastElementChild.textContent);
  console.log(pare.children[1].parentElement.id);
</script>`,
        },
        {
          title: "Germans",
          body: `
            <p><code>nextElementSibling</code> i <code>previousElementSibling</code> es mouen entre germans. També existeixen les versions amb nodes (<code>nextSibling</code>), que inclouen salts de línia com a text.</p>
          `,
          lang: "html",
          code: `<ul id="menu">
  <li>Inici</li>
  <li class="actiu">Capítols</li>
  <li>Contacte</li>
</ul>

<script>
  const actiu = document.querySelector(".actiu");
  console.log(actiu.nextElementSibling.textContent);
  console.log(actiu.previousElementSibling.textContent);
  console.log(actiu.nextSibling);
</script>`,
        },
        {
          title: "Buscar des d'un element",
          body: `
            <p><code>querySelector</code> també existeix sobre qualsevol element: busca només dins seu. És la manera més segura de treballar amb diversos components iguals a la pàgina.</p>
          `,
          lang: "html",
          code: `<div class="targeta">
  <h3>Títol A</h3>
  <p>Text A</p>
</div>
<div class="targeta">
  <h3>Títol B</h3>
  <p>Text B</p>
</div>

<script>
  const targetes = document.querySelectorAll(".targeta");

  targetes.forEach((targeta) => {
    const titol = targeta.querySelector("h3");
    titol.textContent = titol.textContent.toUpperCase();
  });
</script>`,
        },
      ],
      exercise: {
        brief:
          "Donada una llista de quatre elements, marca el segon i mostra per consola els seus germans anterior i posterior.",
        hint: "Selecciona amb <code>:nth-child(2)</code> i llegeix <code>previousElementSibling</code>.",
      },
    },
    {
      slug: "dom-crud",
      title: "Operacions CRUD al DOM",
      summary:
        "Crear, llegir, actualitzar i eliminar elements: el cicle complet de qualsevol llista dinàmica.",
      goals: [
        "Afegir elements amb dades reals.",
        "Actualitzar contingut i atributs.",
        "Eliminar elements de manera segura.",
      ],
      sections: [
        {
          title: "Crear i llegir",
          body: `
            <p>El patró és sempre el mateix: crear l'element, omplir-lo, inserir-lo. Per llegir-lo, cerca'l o guarda'n la referència.</p>
            <p>Guarda la referència sempre que puguis: estalvia cerques i evita seleccionar l'element equivocat.</p>
          `,
          lang: "html",
          code: `<ul id="tasques"></ul>

<script>
  const tasques = document.getElementById("tasques");

  function afegeixTasca(titol) {
    const item = document.createElement("li");
    item.textContent = titol;
    tasques.append(item);
    return item;
  }

  const primera = afegeixTasca("Estudiar CSS");
  afegeixTasca("Practicar JavaScript");

  console.log(tasques.children.length);
  console.log(primera.textContent);
</script>`,
        },
        {
          title: "Actualitzar",
          body: `
            <p>Per canviar un element ja inserit, modifica'n <code>textContent</code>, les classes o els atributs. També pots substituir-lo amb <code>replaceWith()</code>.</p>
          `,
          lang: "html",
          code: `<ul id="tasques">
  <li>Estudiar CSS</li>
  <li>Practicar JavaScript</li>
</ul>

<script>
  const items = document.querySelectorAll("#tasques li");

  items[0].textContent = "Estudiar CSS Grid";
  items[1].classList.add("fet");

  const nova = document.createElement("li");
  nova.textContent = "Repassar el DOM";
  items[1].replaceWith(nova);
</script>

<style>
  #tasques li { padding: 4px 0; }
  .fet { text-decoration: line-through; color: #8a8578; }
</style>`,
        },
        {
          title: "Eliminar",
          body: `
            <p><code>element.remove()</code> treu l'element de l'arbre. Per buidar un contenidor, <code>replaceChildren()</code> és més ràpid que eliminar fills un a un.</p>
          `,
          lang: "html",
          code: `<ul id="llista">
  <li>Un <button class="esborra">×</button></li>
  <li>Dos <button class="esborra">×</button></li>
  <li>Tres <button class="esborra">×</button></li>
</ul>
<button id="buida">Buida-ho tot</button>

<script>
  const llista = document.getElementById("llista");

  llista.addEventListener("click", (event) => {
    if (event.target.matches(".esborra")) {
      event.target.closest("li").remove();
    }
  });

  document.getElementById("buida").addEventListener("click", () => {
    llista.replaceChildren();
  });
</script>`,
        },
      ],
      exercise: {
        brief:
          "Munta una llista de tasques amb un camp de text i dos botons: un per afegir i un per buidar-ho tot. Cada element ha de tenir el seu botó d'esborrar.",
        hint: "Delegació: un sol gestor al contenidor que comprovi <code>event.target.closest()</code>.",
      },
    },
    {
      slug: "esdeveniments",
      title: "Esdeveniments i gestors",
      summary:
        "Escoltar el que fa l'usuari amb <code>addEventListener</code> i respondre-hi sense sobreescriure altres gestors.",
      goals: [
        "Afegir i treure gestors d'esdeveniments.",
        "Fer servir l'objecte <code>event</code>.",
        "Evitar el comportament per defecte quan calgui.",
      ],
      sections: [
        {
          title: "addEventListener",
          body: `
            <p><code>addEventListener("click", gestor)</code> afegeix un gestor sense sobreescriure els anteriors. És la manera correcta: <code>onclick</code> només n'admet un.</p>
            <p>Per treure'l cal la mateixa referència de funció: una funció anònima no es pot eliminar.</p>
          `,
          lang: "html",
          code: `<button id="boto">Fes clic</button>
<p id="sortida">Encara no has fet clic.</p>

<script>
  const boto = document.getElementById("boto");
  const sortida = document.getElementById("sortida");
  let clics = 0;

  function gestiona() {
    clics += 1;
    sortida.textContent = "Has fet " + clics + " clics";
  }

  boto.addEventListener("click", gestiona);
</script>`,
        },
        {
          title: "L'objecte event",
          body: `
            <p>El gestor rep un objecte amb informació: <code>type</code>, <code>target</code> (l'element que va originar), <code>currentTarget</code> (on hi ha el gestor), i dades del teclat o del formulari segons el cas.</p>
            <p><code>preventDefault()</code> atura el comportament natiu (enviar un formulari, seguir un enllaç).</p>
          `,
          lang: "html",
          code: `<form id="formulari">
  <input id="nom" placeholder="El teu nom">
  <button>Envia</button>
</form>
<p id="missatge"></p>

<script>
  const formulari = document.getElementById("formulari");
  const nom = document.getElementById("nom");
  const missatge = document.getElementById("missatge");

  formulari.addEventListener("submit", (event) => {
    event.preventDefault();
    missatge.textContent = "Hola, " + nom.value + "!";
  });
</script>`,
        },
        {
          title: "Esdeveniments habituals",
          body: `
            <ul>
              <li><code>click</code>, <code>dblclick</code> ➜ ratolí.</li>
              <li><code>input</code> ➜ cada canvi en un camp.</li>
              <li><code>change</code> ➜ en confirmar el valor.</li>
              <li><code>submit</code> ➜ enviament de formulari.</li>
              <li><code>keydown</code> ➜ tecles premudes.</li>
              <li><code>scroll</code>, <code>resize</code> ➜ finestra.</li>
              <li><code>DOMContentLoaded</code> ➜ document llest.</li>
            </ul>
          `,
          lang: "html",
          code: `<input id="cerca" placeholder="Escriu per filtrar">
<ul id="llista">
  <li>HTML</li><li>CSS</li><li>JavaScript</li>
</ul>

<script>
  const llista = document.getElementById("llista");

  document.getElementById("cerca").addEventListener("input", (event) => {
    const text = event.target.value.toLowerCase();
    llista.querySelectorAll("li").forEach((li) => {
      li.hidden = !li.textContent.toLowerCase().includes(text);
    });
  });
</script>`,
        },
      ],
      exercise: {
        brief:
          "Crea un formulari que no s'enviï de debò i mostri un missatge amb el nom introduït. Afegeix un camp de cerca que amagui els elements que no coincideixen.",
        hint: "Fes servir <code>preventDefault()</code> al <code>submit</code> i l'esdeveniment <code>input</code> per a la cerca.",
      },
    },
    {
      slug: "esdeveniments-avancats",
      title: "Esdeveniments avançats: propagació i delegació",
      summary:
        "Per què un clic afecta diversos elements i com aprofitar-ho per escriure menys gestors.",
      goals: [
        "Entendre la fase de captura i la de bombolla.",
        "Delegar esdeveniments al contenidor.",
        "Controlar la propagació amb <code>stopPropagation</code>.",
      ],
      sections: [
        {
          title: "Propagació",
          body: `
            <p>Un esdeveniment baixa per l'arbre (captura), arriba a l'element (target) i puja de tornada (bombolla). Per defecte els gestors s'executen en la fase de bombolla.</p>
            <p>Pots escoltar en captura passant <code>{ capture: true }</code> com a tercer argument.</p>
          `,
          lang: "html",
          code: `<div id="pare" style="padding:12px;background:#fdf2d0;border-radius:8px">
  Pare
  <button id="fill">Fill</button>
</div>

<script>
  document.getElementById("pare").addEventListener("click", () => {
    console.log("clic al pare");
  });

  document.getElementById("fill").addEventListener("click", (event) => {
    console.log("clic al fill");
    console.log("target:", event.target.id);
    console.log("currentTarget:", event.currentTarget.id);
  });
</script>`,
        },
        {
          title: "Delegació",
          body: `
            <p>Si els elements fills es creen i s'eliminen dinàmicament, posa un sol gestor al pare i mira <code>event.target</code>. Això és la <strong>delegació</strong>: menys gestors i funciona amb elements futurs.</p>
          `,
          lang: "html",
          code: `<ul id="llista">
  <li><button data-id="1">Esborra A</button></li>
  <li><button data-id="2">Esborra B</button></li>
</ul>

<script>
  const llista = document.getElementById("llista");

  llista.addEventListener("click", (event) => {
    const boto = event.target.closest("button");
    if (!boto) return;

    console.log("Esborro l'element", boto.dataset.id);
    boto.closest("li").remove();
  });
</script>`,
        },
        {
          title: "Aturar la propagació",
          body: `
            <p><code>stopPropagation()</code> evita que l'esdeveniment continuï pujant. Fes-lo servir quan un element dins d'un altre ha de respondre de manera independent, com un botó dins d'una targeta clicable.</p>
            <p>Abusa'n poc: si has d'aturar molts esdeveniments, potser l'estructura es pot simplificar.</p>
          `,
          lang: "html",
          code: `<div id="targeta" style="border:1px solid #e5ded0;border-radius:10px;padding:14px;cursor:pointer">
  Targeta clicable
  <button id="intern">Botó intern</button>
</div>

<script>
  document.getElementById("targeta").addEventListener("click", () => {
    console.log("has clicat la targeta");
  });

  document.getElementById("intern").addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("només el botó");
  });
</script>`,
        },
      ],
      exercise: {
        brief:
          "Fes una llista on cada element tingui un botó d'esborrar gestionat amb delegació, i una targeta amb un botó intern que no dispari el clic de la targeta.",
        hint: "Combina <code>closest()</code> al contenidor amb <code>stopPropagation()</code> al botó intern.",
      },
    },
    {
      slug: "temporitzadors",
      title: "Temporitzadors: setTimeout i setInterval",
      summary:
        "Retardar codi o repetir-lo cada cert temps, i com aturar-ho sense deixar processos orfes.",
      goals: [
        "Programar codi amb <code>setTimeout</code>.",
        "Repetir amb <code>setInterval</code> i aturar-ho.",
        "Entendre que el temps no és exacte.",
      ],
      sections: [
        {
          title: "setTimeout",
          body: `
            <p><code>setTimeout(funció, mil·lisegons)</code> executa el codi un sol cop després del retard. Retorna un identificador que permet cancel·lar-lo amb <code>clearTimeout</code>.</p>
            <p>El codi no s'atura: el temporitzador simplement queda a la cua i s'executa quan toca.</p>
          `,
          lang: "js",
          code: `const id = setTimeout(() => {
  console.log("Han passat 500 ms");
}, 500);

setTimeout(() => {
  clearTimeout(id);
  console.log("Cancel·lat abans d'hora");
}, 100);

console.log("Això surt primer");`,
        },
        {
          title: "setInterval",
          body: `
            <p><code>setInterval</code> repeteix indefinidament. Guarda l'identificador i atura'l quan ja no calgui: un interval oblidat continua consumint recursos.</p>
          `,
          lang: "js",
          code: `let voltes = 0;

const interval = setInterval(() => {
  voltes += 1;
  console.log("Volta", voltes);

  if (voltes === 3) {
    clearInterval(interval);
    console.log("Interval aturat");
  }
}, 200);`,
        },
        {
          title: "Precisió i bones pràctiques",
          body: `
            <p>Els temporitzadors no són precisos: el navegador pot retardar-los si la pestanya està en segon pla o si el fil principal és ocupat.</p>
            <p>Per a animacions, fes servir <code>requestAnimationFrame</code>. Per a comptes enrere, calcula sempre a partir de la data real i no sumant voltes.</p>
          `,
          lang: "html",
          code: `<p id="compte">5</p>
<button id="atura">Atura</button>

<script>
  let restant = 5;
  const sortida = document.getElementById("compte");

  const interval = setInterval(() => {
    restant -= 1;
    sortida.textContent = restant >= 0 ? restant : "Fi!";
    if (restant < 0) clearInterval(interval);
  }, 1000);

  document.getElementById("atura").addEventListener("click", () => {
    clearInterval(interval);
    sortida.textContent = "Aturat";
  });
</script>`,
        },
      ],
      exercise: {
        brief:
          "Fes un compte enrere de cinc segons amb un botó per aturar-lo i un altre per reiniciar-lo.",
        hint: "Desa l'identificador de l'interval en una variable i cancel·la'l abans de crear'n un de nou.",
      },
    },
  ],
};