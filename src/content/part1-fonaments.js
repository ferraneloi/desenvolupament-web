export default {
  title: "Fonaments de l'HTML",
  description:
    "Què és l'HTML, com s'estructura un document i com funcionen els atributs, amb un explorador interactiu.",
  chapters: [
    {
      slug: "introduccio-html",
      title: "Introducció a l'HTML i al desenvolupament web",
      summary:
        "L'HTML descriu l'estructura de totes les pàgines web. Aquí veuràs d'on ve, quina feina fa i com encaixa amb el CSS i el JavaScript.",
      goals: [
        "Saber què és l'HTML i quina feina fa dins d'una pàgina web.",
        "Reconèixer les tres capes del web: estructura, estil i comportament.",
        "Escriure i obrir el teu primer document HTML.",
      ],
      sections: [
        {
          title: "Què és l'HTML?",
          body: `
            <p><strong>HTML</strong> (HyperText Markup Language, «llenguatge de marcatge d'hipertext») és el llenguatge que descriu l'<strong>estructura</strong> i el <strong>significat</strong> del contingut d'una pàgina: quins títols hi ha, quins paràgrafs, quines imatges, quins enllaços.</p>
            <p>No és un llenguatge de programació: no té bucles ni condicions. És un llenguatge de <em>marques</em>: escrius etiquetes com <code>&lt;h1&gt;</code> o <code>&lt;p&gt;</code> que envolten el text i li diuen al navegador què és cada cosa.</p>
            <ul>
              <li><code>&lt;h1&gt;Hola&lt;/h1&gt;</code> ➜ el navegador mostra un títol gran.</li>
              <li><code>&lt;p&gt;Text&lt;/p&gt;</code> ➜ el navegador mostra un paràgraf.</li>
            </ul>
            <p>L'HTML va néixer el 1991 de la mà de Tim Berners-Lee al CERN. Avui l'especificació la manté el <strong>WHATWG</strong> i es coneix com a <em>HTML Living Standard</em>: un estàndard viu que va creixent mica en mica.</p>
          `,
          code: `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="utf-8">
    <title>Hola, món</title>
  </head>
  <body>
    <h1>Hola, món!</h1>
    <p>Aquesta pàgina està escrita amb HTML.</p>
  </body>
</html>`,
        },
        {
          title: "Les tres capes del web",
          body: `
            <p>Una pàgina web completa es construeix amb tres tecnologies que es reparteixen la feina. És la idea més important de tot el tutorial:</p>
            <ul>
              <li><strong>HTML</strong> ➜ l'estructura i el contingut. Sense HTML no hi ha pàgina.</li>
              <li><strong>CSS</strong> ➜ l'aspecte: colors, tipografia, espais, disposició.</li>
              <li><strong>JavaScript</strong> ➜ el comportament: respostes a clics, càlculs, contingut dinàmic.</li>
            </ul>
            <p>Pensa en una casa: l'HTML són les parets i les habitacions, el CSS és la pintura i els mobles, i el JavaScript és l'electricitat que fa que les coses funcionin quan les toques.</p>
          `,
          codeTitle: "Les tres capes en un sol fitxer",
          code: `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="utf-8">
    <title>Les tres capes</title>
    <style>
      h1 { color: #b85c3a; }
    </style>
  </head>
  <body>
    <h1>Títol amb CSS</h1>
    <p id="text">Fes clic al botó per canviar aquest text.</p>
    <button onclick="document.getElementById('text').textContent = 'Text canviat amb JavaScript'">
      Canvia el text
    </button>
  </body>
</html>`,
        },
        {
          title: "El teu primer document",
          body: `
            <p>Per començar no necessites res instal·lat: un editor de text (Notepad, TextEdit, VS Code) i un navegador són suficients.</p>
            <ol>
              <li>Obre l'editor i escriu el codi de l'exemple.</li>
              <li>Desa el fitxer amb el nom <code>index.html</code> i l'extensió <code>.html</code>.</li>
              <li>Fes doble clic al fitxer: s'obrirà al navegador.</li>
            </ol>
            <p>Si canvies el codi, desa'l i recarrega la pàgina amb <strong>F5</strong> (o <strong>Ctrl/Cmd + R</strong>) per veure els canvis.</p>
          `,
          note: `<strong>Consell de nom:</strong> el fitxer principal d'una web sempre es diu <code>index.html</code>. És el nom que els servidors web busquen per defecte quan algú entra a una carpeta.`,
        },
      ],
      exercise: {
        brief:
          "Crea un fitxer <code>index.html</code> amb: el títol «El meu primer lloc», un encapçalament amb el teu nom, un paràgraf que expliqui per què vols aprendre HTML i un segon paràgraf amb la teva assignatura preferida.",
        hint: "Obre'l al navegador i comprova que les dues línies de text se separen en paràgrafs diferents.",
      },
    },
    {
      slug: "estructura-document",
      title: "Estructura bàsica d'un document HTML",
      summary:
        "Tot document HTML té un esquelet fix: doctype, html, head i body. Aprendre'l bé t'estalviarà molts errors estranys.",
      goals: [
        "Escriure l'esquelet complet d'un document HTML5.",
        "Entendre què va a <code>head</code> i què va a <code>body</code>.",
        "Fer servir comentaris, indentació i validar el codi.",
      ],
      sections: [
        {
          title: "L'esquelet del document",
          body: `
            <p>Tots els fitxers HTML comencen declarant el tipus de document amb <code>&lt;!DOCTYPE html&gt;</code>. No és una etiqueta, sinó una instrucció perquè el navegador treballi en <strong>mode estàndard</strong> i no en l'antic «quirks mode».</p>
            <p>Després ve l'element arrel <code>&lt;html&gt;</code>, que ho conté tot, amb l'atribut <code>lang</code> per indicar l'idioma (important per als lectors de pantalla i per als cercadors).</p>
            <p>A dins hi ha dues grans zones:</p>
            <ul>
              <li><code>&lt;head&gt;</code> ➜ informació <em>sobre</em> la pàgina: títol, joc de caràcters, estils, metadades. No es veu al contingut.</li>
              <li><code>&lt;body&gt;</code> ➜ tot el que el visitant veu.</li>
            </ul>
          `,
          code: `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Títol que apareix a la pestanya</title>
  </head>
  <body>
    <h1>Contingut visible</h1>
    <p>Això és el que veu el visitant.</p>
  </body>
</html>`,
        },
        {
          title: "Què hi ha dins de head",
          body: `
            <p>El <code>head</code> no mostra res, però és imprescindible. Els elements més habituals són:</p>
            <ul>
              <li><code>&lt;meta charset="utf-8"&gt;</code> ➜ permet accents, ç i símbols com €.</li>
              <li><code>&lt;meta name="viewport" ...&gt;</code> ➜ fa que la pàgina es vegi bé als mòbils.</li>
              <li><code>&lt;title&gt;</code> ➜ el títol de la pestanya i el que apareix al cercador.</li>
              <li><code>&lt;link rel="stylesheet"&gt;</code> ➜ enllaça un full d'estils extern.</li>
              <li><code>&lt;style&gt;</code> i <code>&lt;script&gt;</code> ➜ CSS i JavaScript en línia.</li>
            </ul>
          `,
          code: `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Pàgina d'exemple de l'estructura bàsica">
    <title>Estructura bàsica</title>
    <link rel="icon" href="data:,">
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; }
    </style>
  </head>
  <body>
    <h1>El head treballa en silenci</h1>
    <p>Cap d'aquestes metadades no es veu al contingut.</p>
  </body>
</html>`,
        },
        {
          title: "Comentaris, espais i indentació",
          body: `
            <p>Els comentaris s'escriuen entre <code>&lt;!--</code> i <code>--&gt;</code> i no arriben a la persona que visita la pàgina. Serveixen per deixar notes al codi.</p>
            <p>L'HTML <strong>col·lapsa els espais</strong>: si escrius deu espais o tres salts de línia seguits, el navegador en mostra un. Per controlar el text hi ha <code>&lt;br&gt;</code> (salt) i <code>&lt;pre&gt;</code> (text preformat), que veuràs més endavant.</p>
            <p>La indentació (sagnar els elements fills) no afecta el resultat, però fa que el codi es pugui llegir. Fes servir sempre dos espais per nivell.</p>
          `,
          code: `<!-- Això és un comentari: no es veu a la pàgina -->
<body>
  <h1>Títol</h1>

  <!-- Els espais seguits i els salts de línia no es respecten -->
  <p>Aquest    paràgraf
     té molts    espais
     i salts de línia.</p>

  <p>Primera línia<br>Segona línia amb un salt forçat</p>

  <pre>
    Aquí sí
      que es respecten
        els espais.
  </pre>
</body>`,
        },
        {
          title: "Validar el document",
          body: `
            <p>Quan escrius molt codi és fàcil deixar-se una etiqueta sense tancar. Dues eines t'ajudaran sempre:</p>
            <ul>
              <li>El <strong>validador del W3C</strong> (<code>validator.w3.org</code>) revisa el teu document i t'explica cada error.</li>
              <li>Les <strong>eines de desenvolupament</strong> del navegador (F12) mostren l'arbre del document real i els errors de la consola.</li>
            </ul>
            <p>Un document correcte s'anomena <em>ben format</em>: cada etiqueta oberta es tanca, les etiquetes no se solapen i els atributs van entre cometes.</p>
          `,
          note: `Algunes etiquetes buides com <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code> o <code>&lt;meta&gt;</code> no tenen contingut ni etiqueta de tancament. S'escriuen soles: <code>&lt;br&gt;</code> o <code>&lt;br /&gt;</code> (les dues formes són vàlides).`,
        },
      ],
      exercise: {
        brief:
          "Crea un document HTML complet amb: idioma català, joc de caràcters UTF-8, viewport, un títol «Exercici d'estructura», un comentari al principi del cos i dos paràgrafs separats per un <code>&lt;hr&gt;</code>.",
        hint: "Passa'l pel validador del W3C: no hi hauria d'haver cap error.",
      },
    },
    {
      slug: "atributs",
      title: "Atributs HTML: guia completa",
      summary:
        "Els atributs són la informació extra de cada etiqueta: enllacen fitxers, declaren identificadors, apliquen estils o canvien el comportament d'un element.",
      goals: [
        "Escriure atributs amb la sintaxi correcta.",
        "Entendre què és un atribut booleà.",
        "Conèixer els atributs globals que es poden fer servir a qualsevol element.",
      ],
      sections: [
        {
          title: "Sintaxi d'un atribut",
          body: `
            <p>Un atribut s'escriu <strong>dins de l'etiqueta d'obertura</strong>, amb la forma <code>nom="valor"</code>. Si n'hi ha més d'un, se separen per espais.</p>
            <ul>
              <li>El <strong>nom</strong> va en minúscules i no pot portar accents ni espais.</li>
              <li>El <strong>valor</strong> va sempre entre cometes dobles (o simples).</li>
              <li>Un element no pot tenir dos atributs amb el mateix nom.</li>
            </ul>
            <p>Les cometes senzilles són útils quan el valor conté cometes dobles: <code>title='Ell va dir "hola"'</code>.</p>
          `,
          code: `<!-- Un atribut -->
<p title="Text que apareix en passar el ratolí">Passa el ratolí per sobre</p>

<!-- Diversos atributs -->
<img src="https://picsum.photos/id/1015/320/180" alt="Riu entre muntanyes" width="320">

<!-- Cometes simples dins del valor -->
<p title='Ell va dir "hola"'>Un atribut amb cometes dobles a dins</p>`,
        },
        {
          title: "Atributs booleans",
          body: `
            <p>Hi ha atributs que no necessiten valor: la seva mera presència activa l'efecte. S'anomenen <strong>booleans</strong>.</p>
            <p>Per exemple, <code>disabled</code> desactiva un camp, <code>required</code> el fa obligatori, <code>checked</code> marca una casella i <code>hidden</code> amaga l'element.</p>
            <p>Si vols desactivar l'efecte, senzillament no escriguis l'atribut. Escriure <code>disabled="false"</code> <strong>no</strong> el desactiva: continua activat perquè l'atribut hi és.</p>
          `,
          code: `<form>
  <label>
    Nom:
    <input type="text" required>
  </label>
  <label>
    <input type="checkbox" checked> Vull rebre novetats
  </label>
  <button type="submit" disabled>Envia (desactivat)</button>
  <p hidden>Aquest paràgraf està amagat amb l'atribut hidden.</p>
</form>`,
        },
        {
          title: "Els atributs globals",
          body: `
            <p>Els <strong>atributs globals</strong> es poden fer servir a qualsevol element HTML. Els més importants són:</p>
            <ul>
              <li><code>id</code> ➜ identificador únic de l'element dins de la pàgina. Només n'hi pot haver un amb aquell valor.</li>
              <li><code>class</code> ➜ un o més noms separats per espais, per agrupar elements i aplicar-los estils.</li>
              <li><code>style</code> ➜ estils CSS en línia per a aquell element.</li>
              <li><code>title</code> ➜ text informatiu que apareix en passar el ratolí.</li>
              <li><code>lang</code> i <code>dir</code> ➜ idioma i direcció del text (<code>ltr</code>, <code>rtl</code>).</li>
              <li><code>data-*</code> ➜ dades pròpies que inventes tu, per exemple <code>data-preu="12"</code>.</li>
              <li><code>tabindex</code> ➜ ordre de navegació amb el teclat.</li>
            </ul>
          `,
          code: `<h2 id="seccio-1" class="titol destacat" lang="ca">Identificadors i classes</h2>

<p class="nota" data-autor="alumnat" style="color: #b85c3a;">
  Aquest paràgraf té classe, una dada pròpia i un estil en línia.
</p>

<p tabindex="0" title="També es pot enfocar amb el tabulador">
  Fes servir el tabulador per arribar aquí.
</p>`,
        },
        {
          title: "Atributs propis i bones pràctiques",
          body: `
            <p>Cada element té els seus atributs propis: <code>src</code> i <code>alt</code> a les imatges, <code>href</code> als enllaços, <code>type</code> als camps de formulari. A més, sempre pots afegir-hi els globals.</p>
            <p>Bones pràctiques:</p>
            <ul>
              <li>No repeteixis mai un <code>id</code>: el navegador només en reconeix el primer.</li>
              <li>Fes servir <code>class</code> per als estils i reserva <code>id</code> per a ancoratges o JavaScript.</li>
              <li>Evita <code>style</code> en línia quan hagis de repetir un estil: és millor una classe en un full d'estils.</li>
              <li>Posa sempre <code>alt</code> a les imatges: és accessibilitat bàsica.</li>
            </ul>
          `,
          code: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener">
  Documentació al MDN
</a>

<img src="https://picsum.photos/id/1025/320/180"
     alt="Un gos petit mirant a càmera"
     width="320" height="180" loading="lazy">

<input type="email" name="correu" placeholder="nom@exemple.cat" autocomplete="email">`,
        },
      ],
      exercise: {
        brief:
          "Crea tres elements amb el mateix <code>class</code> però amb <code>id</code> diferents. Afegeix-hi un atribut <code>data-*</code> inventat i un <code>title</code>. Després comprova amb les eines del navegador que cada element té els atributs que esperaves.",
        hint: "Recorda: el <code>id</code> és únic, el <code>class</code> es pot repetir.",
      },
    },
    {
      slug: "explorador-atributs",
      title: "Explorador interactiu d'atributs HTML",
      summary:
        "Un laboratori per provar atributs en directe: tria un element, activa o desactiva atributs i mira com canvia el resultat a l'instant.",
      goals: [
        "Relacionar cada atribut amb l'efecte que produeix.",
        "Experimentar sense por: els canvis no es desen enlloc.",
        "Tenir una referència ràpida dels atributs més útils.",
      ],
      sections: [
        {
          title: "Prova els atributs en directe",
          body: `
            <p>Tria un element a l'esquerra, marca els atributs que vulguis i observa el resultat a la dreta. El codi HTML es genera sol: si un atribut et resulta útil, copia'l al teu projecte.</p>
            <p>Cada element mostra només els atributs que li pertoquen: per exemple <code>href</code> apareix a l'enllaç però no a la imatge. Així no pots equivocar-te d'element.</p>
          `,
          widget: "attributes",
        },
        {
          title: "Referència ràpida",
          body: `
            <p>Aquesta taula recull els atributs que faràs servir més sovint. Els de la primera columna són <strong>globals</strong>: funcionen a qualsevol element.</p>
          `,
          table: {
            head: ["Atribut", "On s'usa", "Per a què serveix"],
            rows: [
              ["id", "Global", "Identificador únic per a enllaços interns, CSS i JavaScript."],
              ["class", "Global", "Agrupa elements per aplicar-los els mateixos estils."],
              ["style", "Global", "CSS en línia per a aquell element concret."],
              ["title", "Global", "Text d'ajuda que apareix en passar el ratolí."],
              ["hidden", "Global", "Amaga l'element sense esborrar-lo del codi."],
              ["lang / dir", "Global", "Idioma i direcció del text."],
              ["data-*", "Global", "Dades personalitzades que llegeix el teu JavaScript."],
              ["tabindex", "Global", "Ordre de navegació amb la tecla de tabulació."],
              ["href", "Enllaços", "Destí de l'enllaç: una URL, un correu o una secció."],
              ["target", "Enllaços", "On s'obre el destí: mateixa pestanya o una de nova."],
              ["src / alt", "Imatges, àudio, vídeo", "Fitxer d'origen i text alternatiu."],
              ["width / height", "Multimèdia", "Mides de l'element en píxels."],
              ["type / name", "Formularis", "Tipus de control i nom del camp enviat."],
              ["placeholder", "Formularis", "Text d'exemple dins del camp."],
              ["required", "Formularis", "Fa el camp obligatori (booleà)."],
              ["disabled", "Formularis", "Desactiva el control (booleà)."],
              ["loading", "Imatges, iframes", "Carrega el recurs només quan cal (<code>lazy</code>)."],
            ],
          },
        },
        {
          title: "Repte: combina atributs",
          body: `
            <p>Els atributs es poden combinar i sovint és la combinació la que dona el resultat. Prova aquestes tres situacions a l'explorador o a la zona de codi:</p>
            <ol>
              <li>Un enllaç que s'obri en una pestanya nova <strong>i</strong> mostri un text d'ajuda en passar-hi el ratolí.</li>
              <li>Una imatge amb text alternatiu, mida fixa i càrrega diferida.</li>
              <li>Un camp de text obligatori, amb text d'exemple i desactivat alhora (i pensa per què no té gaire sentit).</li>
            </ol>
          `,
          note: `<strong>Accessibilitat:</strong> l'atribut <code>alt</code> no és decoratiu. Si una imatge no es pot carregar o la persona fa servir un lector de pantalla, el text alternatiu és l'única informació disponible.`,
        },
      ],
      exercise: {
        brief:
          "Tria tres combinacions d'atributs de l'explorador, copia'n el codi a la zona de proves i modifica els valors. Documenta en un paràgraf què canvia a cada cas.",
        hint: "Si un atribut no fa res, potser no pertany a aquell element: consulta la segona columna de la taula.",
      },
    },
  ],
};