export default {
  title: "Multimèdia i formularis",
  description:
    "Àudio, vídeo i formularis: com recollir dades i validar-les amb HTML, sense escriure ni una línia de JavaScript.",
  chapters: [
    {
      slug: "audio-video",
      title: "Àudio i vídeo: contingut multimèdia",
      summary:
        "Els elements <code>audio</code> i <code>video</code> permeten reproduir mitjans sense connectors externs, amb controls natius i subtítols.",
      goals: [
        "Inserir àudio i vídeo amb controls.",
        "Conèixer els atributs <code>controls</code>, <code>autoplay</code>, <code>muted</code> i <code>loop</code>.",
        "Afegir subtítols amb <code>track</code>.",
      ],
      sections: [
        {
          title: "Àudio",
          body: `
            <p><code>&lt;audio&gt;</code> reprodueix so. Sense l'atribut <code>controls</code> no es veu cap reproductor i, per tant, no es pot fer servir.</p>
            <p>El navegador tria la primera font compatible: per això s'indiquen diverses etiquetes <code>&lt;source&gt;</code> amb formats diferents. Si no en troba cap, mostra el text alternatiu.</p>
          `,
          code: `<audio controls loop preload="metadata">
  <source src="https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3" type="audio/mpeg">
  El teu navegador no pot reproduir aquest àudio.
</audio>`,
        },
        {
          title: "Vídeo",
          body: `
            <p><code>&lt;video&gt;</code> és pràcticament igual, però introdueix dues decisions importants: la mida i la vora de la imatge.</p>
            <ul>
              <li><code>poster</code> ➜ imatge que es veu abans de reproduir.</li>
              <li><code>muted</code> ➜ sense so. És obligatori perquè funcionin els <code>autoplay</code> moderns.</li>
              <li><code>playsinline</code> ➜ evita la pantalla completa als mòbils.</li>
            </ul>
            <p>Com a les imatges, indica <code>width</code> i <code>height</code> per evitar salts de maquetació.</p>
          `,
          code: `<video controls width="640" height="360"
       poster="https://picsum.photos/id/1043/640/360"
       preload="metadata">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
  El teu navegador no pot reproduir aquest vídeo.
</video>`,
        },
        {
          title: "Subtítols i accessibilitat",
          body: `
            <p>L'element <code>&lt;track&gt;</code> afegeix subtítols, descripcions o capítols. És imprescindible perquè l'àudio sigui accessible a persones sordes o en entorns sense so.</p>
            <p>El fitxer de subtítols es fa servir en format <strong>WebVTT</strong> (extensió <code>.vtt</code>) i conté temps i text.</p>
            <p>Per als vídeos, també és bona idea afegir <code>aria-label</code> o un títol visible que expliqui què s'hi veurà.</p>
          `,
          code: `<video controls width="640" height="360">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  <track kind="captions" src="subtitols.vtt" srclang="ca" label="Català" default>
  <track kind="descriptions" src="descripcions.vtt" srclang="ca">
</video>

<audio controls src="podcast.mp3" aria-label="Episodi 1 del podcast del curs"></audio>`,
        },
      ],
      exercise: {
        brief:
          "Insereix un vídeo amb imatge de portada, controls i uns subtítols inventats en un fitxer <code>.vtt</code>. Afegeix-hi també un reproductor d'àudio amb bucle.",
        hint: "Si <code>autoplay</code> no funciona, és normal: cal afegir-hi <code>muted</code>.",
      },
    },
    {
      slug: "formularis",
      title: "Formularis HTML: entrada i validació",
      summary:
        "Els formularis són la porta d'entrada de les dades. Aprèn l'estructura, les etiquetes accessibles i la validació nativa del navegador.",
      goals: [
        "Construir un formulari complet amb <code>form</code>, <code>label</code> i <code>button</code>.",
        "Enviar dades amb <code>GET</code> i <code>POST</code>.",
        "Usar la validació nativa: <code>required</code>, <code>pattern</code>, minuts i màxims.",
      ],
      sections: [
        {
          title: "L'estructura d'un formulari",
          body: `
            <p><code>&lt;form&gt;</code> agrupa els camps. Els atributs <code>action</code> (on s'envien) i <code>method</code> (com s'envien) defineixen el destí de les dades.</p>
            <p>Cada camp necessita una <strong>etiqueta</strong> <code>&lt;label&gt;</code> associada. N'hi ha prou d'embolcallar el camp, o bé fer servir <code>for</code> amb l'<code>id</code> del camp.</p>
            <p>Sense <code>label</code>, el formulari no és accessible i el camp no s'activa en clicar el text.</p>
          `,
          code: `<form action="/enviar" method="post">
  <p>
    <label for="nom">Nom complet</label><br>
    <input type="text" id="nom" name="nom" autocomplete="name">
  </p>
  <p>
    <label for="correu">Correu electrònic</label><br>
    <input type="email" id="correu" name="correu" autocomplete="email">
  </p>
  <p>
    <label for="missatge">Missatge</label><br>
    <textarea id="missatge" name="missatge" rows="4" cols="30"></textarea>
  </p>
  <button type="submit">Envia</button>
</form>`,
        },
        {
          title: "GET o POST?",
          body: `
            <p><strong>GET</strong> posa les dades a la URL. És útil per a cerques i filtres, però no per a contrasenyes ni dades llargues.</p>
            <p><strong>POST</strong> envia les dades al cos de la petició. És el que s'ha de fer servir per a formularis de contacte, registres i qualsevol cosa que canviï dades al servidor.</p>
            <p>Mai enviïs dades sensibles amb GET: queden a l'historial del navegador i als registres del servidor.</p>
          `,
          code: `<form action="/cercar" method="get">
  <label for="q">Cerca al tutorial</label>
  <input type="search" id="q" name="q" placeholder="p. ex. taules">
  <button type="submit">Cerca</button>
</form>`,
        },
        {
          title: "Validació nativa",
          body: `
            <p>L'HTML pot validar molts casos sense JavaScript. Si un camp no compleix les regles, el navegador no envia el formulari i mostra un missatge.</p>
            <ul>
              <li><code>required</code> ➜ el camp és obligatori.</li>
              <li><code>minlength</code> i <code>maxlength</code> ➜ longitud del text.</li>
              <li><code>min</code>, <code>max</code> i <code>step</code> ➜ rangs numèrics i de dates.</li>
              <li><code>pattern</code> ➜ expressió regular per al format.</li>
              <li><code>type="email"</code> o <code>type="url"</code> ➜ format ja validat.</li>
            </ul>
            <p>La validació del navegador és comoditat per a la persona usuària: el servidor <strong>sempre</strong> ha de tornar a validar.</p>
          `,
          code: `<form action="/registre" method="post" novalidate="false">
  <p>
    <label for="usuari">Nom d'usuari (3-12 caràcters)</label><br>
    <input type="text" id="usuari" name="usuari" required minlength="3" maxlength="12">
  </p>
  <p>
    <label for="edat">Edat</label><br>
    <input type="number" id="edat" name="edat" min="12" max="99" step="1" required>
  </p>
  <p>
    <label for="data">Data de naixement</label><br>
    <input type="date" id="data" name="data" required>
  </p>
  <p>
    <label for="cp">Codi postal (5 xifres)</label><br>
    <input type="text" id="cp" name="cp" inputmode="numeric"
           pattern="[0-9]{5}" title="Cinc xifres, per exemple 08001" required>
  </p>
  <button type="submit">Registra't</button>
</form>`,
        },
        {
          title: "Agrupar i ordenar camps",
          body: `
            <p><code>&lt;fieldset&gt;</code> agrupa camps relacionats i <code>&lt;legend&gt;</code> li dona un títol. És especialment útil en formularis llargs i en grups de botons d'opció.</p>
            <p>L'atribut <code>name</code> és el nom amb què el servidor rebrà cada dada. Sense <code>name</code>, un camp no s'envia mai.</p>
          `,
          code: `<form action="/enquesta" method="post">
  <fieldset>
    <legend>Com valores el curs?</legend>

    <label><input type="radio" name="valoracio" value="molt" required> Molt bé</label><br>
    <label><input type="radio" name="valoracio" value="be"> Bé</label><br>
    <label><input type="radio" name="valoracio" value="poc"> Podria millorar</label>
  </fieldset>

  <p>
    <label for="comentaris">Comentaris</label><br>
    <textarea id="comentaris" name="comentaris" rows="3" maxlength="300"></textarea>
  </p>

  <button type="submit">Envia l'enquesta</button>
</form>`,
        },
      ],
      exercise: {
        brief:
          "Crea un formulari de contacte amb nom, correu, assumpte (llista desplegable), missatge i una casella d'acceptació obligatòria. Tots els camps han de tenir etiqueta i validació.",
        hint: "Prova d'enviar el formulari amb camps buits: el navegador ha de marcar els errors.",
      },
    },
    {
      slug: "controls-entrada",
      title: "Controls d'entrada: referència completa",
      summary:
        "Tots els controls que existeixen per recollir dades: text, caselles, botons d'opció, llistes, àrees de text i botons.",
      goals: [
        "Triar el control adequat per a cada tipus de dada.",
        "Usar correctament <code>select</code>, <code>textarea</code> i <code>datalist</code>.",
        "Diferència entre <code>submit</code>, <code>reset</code> i <code>button</code>.",
      ],
      sections: [
        {
          title: "Camps de text i àrees de text",
          body: `
            <p><code>&lt;input type="text"&gt;</code> és d'una sola línia; <code>&lt;textarea&gt;</code> admet diverses línies i s'infla amb l'atribut <code>rows</code>.</p>
            <p>El <code>placeholder</code> és un text d'exemple que desapareix en escriure. No substitueix mai l'etiqueta: quan l'usuari escriu, el text d'ajuda s'esfuma.</p>
            <p><code>readonly</code> impedeix editar però permet copiar; <code>disabled</code> desactiva el camp i, a més, no s'envia.</p>
          `,
          code: `<p>
  <label for="t1">Nom (text)</label><br>
  <input type="text" id="t1" name="nom" placeholder="El teu nom">
</p>
<p>
  <label for="t2">Missatge (textarea)</label><br>
  <textarea id="t2" name="missatge" rows="3" placeholder="Escriu aquí..."></textarea>
</p>
<p>
  <label for="t3">Codi de soci (readonly)</label><br>
  <input type="text" id="t3" value="SOC-2026" readonly>
</p>`,
        },
        {
          title: "Caselles, opcions i llistes",
          body: `
            <ul>
              <li><code>checkbox</code> ➜ diverses opcions independents; cada casella té el seu <code>name</code> o un valor diferent.</li>
              <li><code>radio</code> ➜ una sola opció dins d'un grup; totes les opcions del grup comparteixen <strong>el mateix</strong> <code>name</code>.</li>
              <li><code>&lt;select&gt;</code> ➜ llista desplegable amb <code>&lt;option&gt;</code>; <code>multiple</code> permet triar-ne diverses.</li>
              <li><code>&lt;datalist&gt;</code> ➜ suggeriments mentre s'escriu, sense obligar.</li>
            </ul>
            <p>Per agrupar opcions dins d'una llista es fa servir <code>&lt;optgroup&gt;</code> amb una etiqueta.</p>
          `,
          code: `<p>
  <label><input type="checkbox" name="extres" value="material"> Vull material imprès</label><br>
  <label><input type="checkbox" name="extres" value="correu"> Vull rebre correus</label>
</p>

<p>
  <label for="nivell">Nivell</label>
  <select id="nivell" name="nivell">
    <optgroup label="Inicial">
      <option value="1">Principiant</option>
      <option value="2">Bàsic</option>
    </optgroup>
    <optgroup label="Avançat">
      <option value="3">Intermedi</option>
      <option value="4" selected>Avançat</option>
    </optgroup>
  </select>
</p>

<p>
  <label for="ciutat">Ciutat</label>
  <input type="text" id="ciutat" name="ciutat" list="ciutats">
  <datalist id="ciutats">
    <option value="Barcelona"></option>
    <option value="Girona"></option>
    <option value="Lleida"></option>
  </datalist>
</p>`,
        },
        {
          title: "Botons i fitxers",
          body: `
            <p>Dins d'un formulari, un <code>&lt;button&gt;</code> sense atribut <code>type</code> es comporta com a <code>submit</code> i envia el formulari. Això provoca errors difícils d'endevinar: indica sempre el tipus.</p>
            <ul>
              <li><code>type="submit"</code> ➜ envia.</li>
              <li><code>type="reset"</code> ➜ buida els camps.</li>
              <li><code>type="button"</code> ➜ no fa res per si sol; el controla JavaScript.</li>
            </ul>
            <p>Per pujar fitxers: <code>&lt;input type="file" multiple accept="image/*"&gt;</code>.</p>
          `,
          code: `<form action="/pujar" method="post" enctype="multipart/form-data">
  <p>
    <label for="fitxer">Imatge de perfil (JPG o PNG)</label><br>
    <input type="file" id="fitxer" name="fitxer" accept="image/jpeg,image/png">
  </p>

  <button type="submit">Puja la imatge</button>
  <button type="reset">Neteja</button>
  <button type="button" onclick="alert('Botó lliure')">Prova</button>
</form>`,
        },
      ],
      exercise: {
        brief:
          "Construeix un formulari de matrícula amb: text, correu, telèfon, tres caselles d'extres, un grup de botons d'opció i una llista desplegable amb dos grups d'opcions. Afegeix-hi els tres tipus de botó.",
        hint: "Comprova que totes les opcions d'un grup <code>radio</code> comparteixen el mateix <code>name</code>.",
      },
    },
    {
      slug: "tipus-input-pattern",
      title: "Tipus d'input i atribut pattern: guia completa",
      summary:
        "Els més de vint tipus d'<code>input</code> d'HTML5 i com validar formats concrets amb expressions regulars a <code>pattern</code>.",
      goals: [
        "Conèixer tots els tipus d'<code>input</code> i quan usar cadascun.",
        "Escriure patrons senzills i llegir-los.",
        "Combinar <code>pattern</code> amb <code>title</code> i <code>inputmode</code>.",
      ],
      sections: [
        {
          title: "Tipus d'input disponibles",
          body: `
            <p>L'atribut <code>type</code> transforma un camp de text en un control especialitzat: teclat adient al mòbil, validació automàtica i selector de data o color.</p>
            <p>Els més útils són <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>tel</code>, <code>url</code>, <code>date</code>, <code>time</code>, <code>datetime-local</code>, <code>month</code>, <code>week</code>, <code>color</code>, <code>range</code>, <code>search</code>, <code>file</code>, <code>checkbox</code>, <code>radio</code>, <code>hidden</code> i els botons.</p>
            <p>Si el navegador no reconeix un tipus, el tracta com a <code>text</code>: el formulari no es trenca mai.</p>
          `,
          table: {
            head: ["Tipus", "Per a què", "Validació automàtica"],
            rows: [
              ["email", "Adreces de correu", "Sí: format bàsic"],
              ["url", "Adreces web", "Sí: ha de ser una URL vàlida"],
              ["number", "Quantitats", "Sí: amb min, max i step"],
              ["tel", "Telèfons", "No: cal pattern"],
              ["date / time", "Dates i hores", "Sí: format i rangs"],
              ["range", "Valors dins d'un interval", "Sí: min i max"],
              ["color", "Selector de color", "Sí: format hexadecimal"],
              ["search", "Camps de cerca", "No"],
              ["file", "Fitxers", "Sí: accept i multiple"],
              ["password", "Contrasenyes", "Sí: minlength"],
            ],
          },
          code: `<p><label>Correu <input type="email" name="correu" required></label></p>
<p><label>Web <input type="url" name="web" placeholder="https://"></label></p>
<p><label>Data <input type="date" name="data"></label></p>
<p><label>Quantitat <input type="number" name="q" min="1" max="10" step="1" value="1"></label></p>
<p><label>Volum <input type="range" name="volum" min="0" max="100" value="40"></label></p>
<p><label>Color <input type="color" name="color" value="#b85c3a"></label></p>
<p><label>Contrasenya <input type="password" name="clau" minlength="8" required></label></p>`,
        },
        {
          title: "L'atribut pattern",
          body: `
            <p><code>pattern</code> accepta una <strong>expressió regular</strong> que el valor ha de complir completament (el navegador ja hi afegeix l'ancoratge inicial i final).</p>
            <p>És la manera de validar telèfons, codis postals o matrícules sense JavaScript. Combina'l sempre amb <code>title</code> per explicar el format esperat.</p>
            <ul>
              <li><code>[0-9]{5}</code> ➜ exactament cinc xifres.</li>
              <li><code>[A-Za-z]{2}[0-9]{4}</code> ➜ dues lletres i quatre xifres.</li>
              <li><code>[0-9]{3}-[0-9]{3}-[0-9]{3}</code> ➜ format 123-456-789.</li>
            </ul>
          `,
          code: `<p>
  <label for="cp">Codi postal</label>
  <input type="text" id="cp" name="cp"
         pattern="[0-9]{5}" title="Cinc xifres, per exemple 08001" required>
</p>

<p>
  <label for="mobil">Mòbil (9 xifres)</label>
  <input type="tel" id="mobil" name="mobil"
         pattern="[0-9]{9}" title="Nou xifres sense espais" required>
</p>

<p>
  <label for="matricula">Matrícula</label>
  <input type="text" id="matricula" name="matricula"
         pattern="[0-9]{4}[A-Z]{3}"
         title="Quatre xifres i tres lletres majúscules, per exemple 1234ABC"
         style="text-transform: uppercase">
</p>

<button type="submit">Valida</button>`,
        },
        {
          title: "Teclat, ajudes i accessibilitat",
          body: `
            <p><code>inputmode</code> tria el teclat del mòbil sense canviar la validació: <code>numeric</code>, <code>decimal</code>, <code>email</code>, <code>tel</code>, <code>url</code>, <code>search</code>.</p>
            <p>Altres atributs que milloren l'experiència:</p>
            <ul>
              <li><code>autocomplete</code> ➜ deixa que el navegador ompli dades conegudes.</li>
              <li><code>autofocus</code> ➜ enfoca el camp en carregar.</li>
              <li><code>spellcheck="false"</code> ➜ desactiva el corrector en codis i noms d'usuari.</li>
              <li><code>enterkeyhint</code> ➜ canvia la tecla de retorn al mòbil.</li>
            </ul>
            <p>I recorda: <code>pattern</code> no substitueix una explicació en text. Si el format és important, digues-lo al costat del camp.</p>
          `,
          code: `<p>
  <label for="dni">DNI (8 xifres i una lletra)</label>
  <input type="text" id="dni" name="dni"
         inputmode="text" spellcheck="false"
         pattern="[0-9]{8}[A-Za-z]"
         title="Vuit xifres seguides d'una lletra"
         autocomplete="off" required>
</p>

<p>
  <label for="import">Import (€)</label>
  <input type="text" id="import" name="import"
         inputmode="decimal" pattern="[0-9]+([.,][0-9]{1,2})?"
         title="Per exemple 12,50" required>
</p>`,
        },
      ],
      exercise: {
        brief:
          "Crea un formulari amb quatre camps validats amb <code>pattern</code>: codi postal, telèfon de nou xifres, matrícula i un import amb dos decimals. Cada camp ha de tenir el seu <code>title</code> explicatiu.",
        hint: "Prova valors incorrectes: el navegador ha de bloquejar l'enviament i mostrar el text de <code>title</code>.",
      },
    },
  ],
};