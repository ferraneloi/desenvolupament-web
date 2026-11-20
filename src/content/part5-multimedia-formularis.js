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
  <source src="/audio/audio-exemple.mp3" type="audio/mpeg">
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
       poster="/images/picsum-1043-640x360.jpg"
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

<audio controls src="/audio/podcast.mp3" aria-label="Episodi 1 del podcast del curs"></audio>`,
        },
      ],
      exercise: {
        brief:
          "Insereix un vídeo amb imatge de portada, controls i uns subtítols inventats en un fitxer <code>.vtt</code>. Afegeix-hi també un reproductor d'àudio amb bucle.",
        hint: "Si <code>autoplay</code> no funciona, és normal: cal afegir-hi <code>muted</code>.",
      },
    },

    // ─────────────────────────────────────────────────────────────
    // FORMULARIS
    // ─────────────────────────────────────────────────────────────
    {
      slug: "formularis",
      title: "Formularis HTML: entrada i validació",
      summary:
        "Els formularis són la porta d'entrada de les dades. Aprèn l'estructura, les etiquetes accessibles i la validació nativa del navegador.",
      goals: [
        "Construir un formulari complet amb <code>form</code>, <code>label</code> i <code>button</code>.",
        "Enviar dades amb <code>GET</code> i <code>POST</code>.",
        "Usar la validació nativa: <code>required</code>, <code>pattern</code>, mínims i màxims.",
      ],
      sections: [
        {
          title: "L'estructura d'un formulari",
          body: `
            <p><code>&lt;form&gt;</code> agrupa els camps. Els atributs <code>action</code> (on s'envien) i <code>method</code> (com s'envien) defineixen el destí de les dades.</p>
            <p>Cada camp necessita una <strong>etiqueta</strong> <code>&lt;label&gt;</code> associada. N'hi ha prou d'embolcallar el camp, o bé fer servir <code>for</code> amb l'<code>id</code> del camp.</p>
            <p>Sense <code>label</code>, el formulari no és accessible i el camp no s'activa en clicar el text.</p>
            <p>Un formulari mínim té tres parts: l'etiqueta <code>&lt;form&gt;</code>, almenys un camp d'entrada i un botó d'enviament.</p>
          `,
          code: `<form action="resultat.html" method="post">
  <label for="nom">Escriu el teu nom</label>
  <input type="text" id="nom" name="nom" value="">
  <button type="submit">Enviar</button>
</form>`,
        },
        {
          title: "action: on s'envien les dades",
          body: `
            <p><code>action</code> és la URL que rebrà les dades del formulari. Pot ser un fitxer estàtic (<code>resultat.html</code>) o un script del servidor (<code>processar.php</code>, <code>/api/contacte</code>, etc.).</p>
            <p>Si s'omet, les dades s'envien a la mateixa pàgina on és el formulari.</p>
            <p>Exemple conceptual:</p>
            <ul>
              <li>El formulari viu a <code>formulari.html</code>.</li>
              <li>En enviar-se, el navegador fa una petició a <code>processar.php</code> amb les dades.</li>
              <li>El servidor respon amb una pàgina nova (per exemple, <em>Hola Manel</em>).</li>
            </ul>
          `,
          code: `<form action="processar.php" method="post">
  <label for="nom">Escriu el teu nom</label>
  <input type="text" id="nom" name="nom">
  <button type="submit">Enviar</button>
</form>`,
        },
        {
          title: "method: GET o POST?",
          body: `
            <p><strong>GET</strong> posa les dades a la URL (a la barra d'adreces o <em>query string</em>). És útil per a cerques i filtres, però no per a contrasenyes ni dades llargues.</p>
            <p><strong>POST</strong> envia les dades al cos de la petició. És el que s'ha de fer servir per a formularis de contacte, registres i qualsevol cosa que canviï dades al servidor.</p>
            <p>Mai enviïs dades sensibles amb GET: queden a l'historial del navegador i als registres del servidor.</p>
            <table>
              <thead>
                <tr><th>Mètode</th><th>On van les dades</th><th>Quan usar-lo</th></tr>
              </thead>
              <tbody>
                <tr><td><code>GET</code></td><td>Adreça (URL)</td><td>Cerques, filtres, enllaços compartibles</td></tr>
                <tr><td><code>POST</code></td><td>Cos de la petició</td><td>Contacte, registre, dades sensibles</td></tr>
              </tbody>
            </table>
          `,
          code: `<form action="/cercar" method="get">
  <label for="q">Cerca al tutorial</label>
  <input type="search" id="q" name="q" placeholder="p. ex. taules">
  <button type="submit">Cerca</button>
</form>

<form action="/registre" method="post">
  <label for="correu">Correu</label>
  <input type="email" id="correu" name="correu">
  <button type="submit">Registra'm</button>
</form>`,
        },
        {
          title: "label: accessibilitat i clic",
          body: `
            <p><code>&lt;label&gt;</code> associa un títol visible a un camp. Té dos efectes molt útils:</p>
            <ul>
              <li>Millora l'accessibilitat: els lectors de pantalla llegeixen el text del camp.</li>
              <li>En clicar sobre l'etiqueta, el focus va al camp associat (especialment útil amb caselles i botons d'opció).</li>
            </ul>
            <p>Dues maneres d'associar-los:</p>
            <ul>
              <li>Amb <code>for</code> a la <code>&lt;label&gt;</code> i <code>id</code> al camp (recomanat).</li>
              <li>Embolcallant el camp dins de la mateixa <code>&lt;label&gt;</code> (també vàlid, especialment per a caselles).</li>
            </ul>
          `,
          code: `<label for="nom">Nom</label>
<input type="text" id="nom">

<label>Cognom
  <input type="text">
</label>

<label>
  <input type="checkbox" name="accepta"> Accepto les condicions
</label>`,
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
          code: `<form action="/registre" method="post">
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

    // ─────────────────────────────────────────────────────────────
    // CONTROLS D'ENTRADA
    // ─────────────────────────────────────────────────────────────
    {
      slug: "controls-entrada",
      title: "Controls d'entrada: referència completa",
      summary:
        "Tots els controls que existeixen per recollir dades: text, caselles, botons d'opció, llistes, àrees de text i botons.",
      goals: [
        "Triar el control adequat per a cada tipus de dada.",
        "Usar correctament <code>select</code>, <code>textarea</code> i <code>datalist</code>.",
        "Diferenciar <code>submit</code>, <code>reset</code> i <code>button</code>.",
      ],
      sections: [
        {
          title: "input: el punt d'entrada universal",
          body: `
            <p><code>&lt;input&gt;</code> és el control més versàtil del formulari: un sol element que canvia completament segons l'atribut <code>type</code>.</p>
            <p>Els tipus que veurem aquí són els “clàssics” d'HTML 4 i s'utilitzen a tot arreu:</p>
            <ul>
              <li><code>text</code> ➜ text d'una línia.</li>
              <li><code>password</code> ➜ text ocult (mostra punts).</li>
              <li><code>hidden</code> ➜ camp invisible per a l'usuari, però que s'envia.</li>
              <li><code>checkbox</code> ➜ caselles de selecció múltiple.</li>
              <li><code>radio</code> ➜ una sola opció dins d'un grup.</li>
              <li><code>file</code> ➜ pujada de fitxers.</li>
              <li><code>submit</code>, <code>reset</code>, <code>button</code> ➜ botons.</li>
            </ul>
            <p>Els tipus HTML5 (<code>email</code>, <code>date</code>, <code>range</code>, etc.) es veuen al capítol de tipus d'input.</p>
          `,
          code: `<form action="/exemple" method="post">
  <p>
    <label for="usuari">Usuari</label>
    <input type="text" id="usuari" name="usuari" value="">
  </p>
  <p>
    <label for="contrasenya">Contrasenya</label>
    <input type="password" id="contrasenya" name="contrasenya" value="">
  </p>
  <input type="hidden" name="origen" value="tutorial">
  <button type="submit">Enviar</button>
</form>`,
        },
        {
          title: "text, password i hidden",
          body: `
            <p><code>text</code> és el camp bàsic. <code>password</code> amaga el que s'escriu (punts o asteriscos) i <code>hidden</code> no mostra cap control, però envia un valor fix.</p>
            <ul>
              <li><code>password</code> <strong>no</strong> xifra res: només amaga visualment. La seguretat la dona HTTPS.</li>
              <li><code>hidden</code> no és una mesura de seguretat: qualsevol pot veure'l amb les eines del navegador. Serveix per portar dades auxiliars (token, origen, id).</li>
            </ul>
          `,
          code: `<p>
  <label for="t1">Usuari</label>
  <input type="text" id="t1" name="usuari" placeholder="federicu">
</p>

<p>
  <label for="t2">Contrasenya</label>
  <input type="password" id="t2" name="contrasenya" minlength="8">
</p>

<input type="hidden" name="token" value="abc123">`,
        },
        {
          title: "checkbox: diverses opcions independents",
          body: `
            <p><code>checkbox</code> permet seleccionar <strong>cap, una o diverses</strong> opcions. Cada casella ha de tenir el seu propi <code>name</code> (o un mateix <code>name</code> amb valors diferents si el servidor ho espera així).</p>
            <ul>
              <li><code>value</code> ➜ valor que s'envia si la casella està marcada.</li>
              <li><code>checked</code> ➜ deixa la casella marcada per defecte.</li>
            </ul>
          `,
          code: `<fieldset>
  <legend>Què vols amb el cafè?</legend>

  <label>
    <input type="checkbox" name="opcio1" value="Café" checked>
    Cafè
  </label>

  <label>
    <input type="checkbox" name="opcio2" value="Llet">
    Llet
  </label>

  <label>
    <input type="checkbox" name="opcio3" value="Sucre">
    Sucre
  </label>
</fieldset>`,
        },
        {
          title: "radio: una sola opció dins del grup",
          body: `
            <p><code>radio</code> permet triar <strong>una sola opció</strong> dins d'un grup. Perquè el navegador els tracti com un grup, totes les opcions han de compartir <strong>el mateix</strong> <code>name</code>.</p>
            <p>Si els <code>name</code> són diferents, es poden seleccionar diverses opcions alhora: és l'error més habitual amb els radio.</p>
          `,
          code: `<fieldset>
  <legend>Forma de pagament</legend>

  <label>
    <input type="radio" name="paga" value="comptat" checked>
    Comptat
  </label>

  <label>
    <input type="radio" name="paga" value="visa">
    Visa
  </label>

  <label>
    <input type="radio" name="paga" value="paypal">
    PayPal
  </label>
</fieldset>`,
        },
        {
          title: "Camps de text llargs: textarea",
          body: `
            <p><code>&lt;textarea&gt;</code> és un camp de text de diverses línies. Es defineix amb <code>rows</code> (alçada en línies) i <code>cols</code> (amplada en caràcters).</p>
            <p>A diferència d'<code>&lt;input&gt;</code>, el valor inicial es posa entre les etiquetes d'obertura i tancament, no amb <code>value</code>.</p>
          `,
          code: `<p>
  <label for="comentaris">Comentaris</label><br>
  <textarea id="comentaris" name="comentaris" rows="6" cols="40"
            placeholder="Escriu aquí el teu comentari..."></textarea>
</p>`,
        },
        {
          title: "Llistes desplegables: select i option",
          body: `
            <p><code>&lt;select&gt;</code> mostra una llista desplegable. Cada opció és un <code>&lt;option&gt;</code> amb un <code>value</code> que s'envia al servidor i un text visible.</p>
            <ul>
              <li><code>selected</code> ➜ opció marcada per defecte.</li>
              <li><code>multiple</code> ➜ permet seleccionar diverses opcions (es mostra com una llista, no com un desplegable).</li>
              <li><code>&lt;optgroup&gt;</code> ➜ agrupa opcions sota un títol comú.</li>
            </ul>
          `,
          code: `<p>
  <label for="beguda">Tria una beguda</label>
  <select id="beguda" name="beguda">
    <option value="Llet2">Llet</option>
    <option value="Cafe2" selected>Cafè</option>
    <option value="Sucre2">Sucre</option>
  </select>
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
      <option value="4">Avançat</option>
    </optgroup>
  </select>
</p>`,
        },
        {
          title: "file: pujar fitxers",
          body: `
            <p><code>&lt;input type="file"&gt;</code> obre el selector de fitxers del sistema. El navegador mostra un botó “Navega…” i el nom del fitxer triat.</p>
            <p>Perquè el formulari enviï fitxers correctament cal:</p>
            <ul>
              <li><code>method="post"</code> al <code>&lt;form&gt;</code>.</li>
              <li><code>enctype="multipart/form-data"</code> al <code>&lt;form&gt;</code>.</li>
            </ul>
            <p>L'atribut <code>accept</code> filtra els tipus de fitxer suggerits, i <code>multiple</code> permet triar-ne més d'un.</p>
          `,
          code: `<form action="/pujar" method="post" enctype="multipart/form-data">
  <p>
    <label for="fitxer">Imatge de perfil (JPG o PNG)</label><br>
    <input type="file" id="fitxer" name="fitxer"
           accept="image/jpeg,image/png">
  </p>
  <p>
    <label for="docs">Documents (diversos)</label><br>
    <input type="file" id="docs" name="docs" multiple>
  </p>
  <button type="submit">Puja</button>
</form>`,
        },
        {
          title: "Botons: submit, reset i button",
          body: `
            <p>Dins d'un formulari hi ha tres tipus de botó:</p>
            <ul>
              <li><code>submit</code> ➜ envia les dades del formulari.</li>
              <li><code>reset</code> ➜ buida tots els camps als valors inicials.</li>
              <li><code>button</code> ➜ no fa res per si sol; normalment el controla JavaScript.</li>
            </ul>
            <p>Es poden fer amb <code>&lt;input&gt;</code> (només text al <code>value</code>) o amb <code>&lt;button&gt;</code> (pot contenir text, imatges o HTML).</p>
            <p><strong>Compte:</strong> un <code>&lt;button&gt;</code> sense <code>type</code> dins d'un formulari es comporta com a <code>submit</code>. Indica sempre el tipus per evitar enviaments inesperats.</p>
          `,
          code: `<form action="/exemple" method="post">
  <p>
    <label for="nom">Nom</label>
    <input type="text" id="nom" name="nom">
  </p>

  <input type="submit" value="Acceptar">
  <input type="reset" value="Neteja">

  <button type="submit">Envia</button>
  <button type="reset">Esborra</button>
  <button type="button">Botó lliure</button>

  <input type="image" src="/img/boto-enviar.png" alt="Enviar" width="32" height="32">
</form>`,
        },
        {
          title: "Atributs clàssics de l'input",
          body: `
            <p>A més de <code>type</code>, qualsevol <code>&lt;input&gt;</code> pot portar aquests atributs:</p>
            <ul>
              <li><code>name</code> ➜ nom amb què el servidor rep la dada. <strong>Sense name no s'envia.</strong></li>
              <li><code>value</code> ➜ valor inicial del camp.</li>
              <li><code>maxlength</code> ➜ nombre màxim de caràcters.</li>
              <li><code>disabled</code> ➜ desactiva el camp: no es pot editar i <strong>no s'envia</strong>.</li>
              <li><code>checked</code> ➜ marca un <code>checkbox</code> o <code>radio</code> per defecte.</li>
              <li><code>readonly</code> ➜ camp només de lectura: es pot copiar, però no editar, i <strong>sí que s'envia</strong>.</li>
            </ul>
            <p>La diferència clau entre <code>disabled</code> i <code>readonly</code> és si el camp s'envia o no.</p>
          `,
          code: `<p>
  <label for="a1">Nom (max 10 caràcters)</label>
  <input type="text" id="a1" name="nom" maxlength="10">
</p>

<p>
  <label for="a2">Codi de soci (readonly)</label>
  <input type="text" id="a2" name="soci" value="SOC-2026" readonly>
</p>

<p>
  <label for="a3">Camp desactivat (no s'envia)</label>
  <input type="text" id="a3" name="bloquejat" value="no s'envia" disabled>
</p>

<label>
  <input type="checkbox" name="subscrit" checked>
  Vull rebre novetats
</label>`,
        },
      ],
      exercise: {
        brief:
          "Construeix un formulari de matrícula amb: text, correu, telèfon, tres caselles d'extres, un grup de botons d'opció i una llista desplegable amb dos grups d'opcions. Afegeix-hi els tres tipus de botó.",
        hint: "Comprova que totes les opcions d'un grup <code>radio</code> comparteixen el mateix <code>name</code>.",
      },
    },

    // ─────────────────────────────────────────────────────────────
    // TIPUS D'INPUT I PATTERN
    // ─────────────────────────────────────────────────────────────
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
          title: "Per què HTML5 afegeix tipus",
          body: `
            <p>HTML5 amplia els tipus d'<code>input</code> perquè el navegador pugui:</p>
            <ul>
              <li>Mostrar teclats adients al mòbil (numèric, correu, URL…).</li>
              <li>Validar el format automàticament (correu, URL, data…).</li>
              <li>Oferir controls especialitzats (calendari, selector de color, barra de rang…).</li>
            </ul>
            <p>Si el navegador no reconeix un tipus, el tracta com a <code>text</code>: el formulari no es trenca mai.</p>
          `,
          code: `<p><label>Correu <input type="email" name="correu"></label></p>
<p><label>Web <input type="url" name="web" placeholder="https://"></label></p>
<p><label>Data <input type="date" name="data"></label></p>
<p><label>Hora <input type="time" name="hora"></label></p>
<p><label>Quantitat <input type="number" name="q" min="1" max="10"></label></p>
<p><label>Volum <input type="range" name="volum" min="0" max="100" value="40"></label></p>
<p><label>Color <input type="color" name="color" value="#b85c3a"></label></p>`,
        },
        {
          title: "Tipus d'input disponibles",
          body: `
            <p>L'atribut <code>type</code> transforma un camp de text en un control especialitzat: teclat adient al mòbil, validació automàtica i selector de data o color.</p>
            <p>Els més útils són <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>tel</code>, <code>url</code>, <code>date</code>, <code>time</code>, <code>datetime-local</code>, <code>month</code>, <code>week</code>, <code>color</code>, <code>range</code>, <code>search</code>, <code>file</code>, <code>checkbox</code>, <code>radio</code>, <code>hidden</code> i els botons.</p>
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
        },
        {
          title: "email i url",
          body: `
            <p><code>type="email"</code> obliga que el valor sigui una adreça de correu vàlida. Si l'usuari escriu alguna cosa que no ho sembla, el navegador bloqueja l'enviament i mostra un missatge.</p>
            <p><code>type="url"</code> exigeix una URL completa (normalment amb protocol <code>https://</code>).</p>
            <p>Cap dels dos comprova que l'adreça existeixi: només el format.</p>
          `,
          code: `<p>
  <label for="correu">E-mail</label>
  <input type="email" id="correu" name="correu" placeholder="nom@exemple.com">
</p>

<p>
  <label for="web">La teva pàgina web</label>
  <input type="url" id="web" name="web" placeholder="https://exemple.com">
</p>

<button type="submit">Enviar</button>`,
        },
        {
          title: "date, time i datetime-local",
          body: `
            <p><code>date</code> obre un calendari per triar una data. El format que envia és <code>AAAA-MM-DD</code>.</p>
            <p><code>time</code> permet triar una hora (<code>HH:MM</code>). <code>datetime-local</code> combina data i hora.</p>
            <p>Els navegadors mostren aquests controls segons l'idioma i el sistema operatiu de l'usuari; el valor intern sempre és l'estàndard.</p>
          `,
          code: `<p>
  <label for="aniversari">El teu aniversari</label>
  <input type="date" id="aniversari" name="aniversari">
</p>

<p>
  <label for="hora">Hora d'arribada</label>
  <input type="time" id="hora" name="hora">
</p>

<p>
  <label for="reunio">Data i hora de la reunió</label>
  <input type="datetime-local" id="reunio" name="reunio">
</p>`,
        },
        {
          title: "number i range",
          body: `
            <p><code>number</code> mostra un camp numèric amb fletxes per pujar i baixar. Accepta els atributs <code>min</code>, <code>max</code>, <code>step</code> i <code>value</code>.</p>
            <p><code>range</code> mostra una barra lliscant per triar un valor dins d'un interval. També admet <code>min</code>, <code>max</code> i <code>step</code>.</p>
            <p>En tots dos casos, el navegador impedeix enviar valors fora del rang si els atributs estan ben definits.</p>
          `,
          code: `<p>
  <label for="quantitat">Quantitat (entre 1 i 5)</label>
  <input type="number" id="quantitat" name="quantitat" min="1" max="5" step="1" value="1">
</p>

<p>
  <label for="punts">Punts (1-10)</label>
  <input type="range" id="punts" name="punts" min="1" max="10" step="1" value="5">
</p>`,
        },
        {
          title: "color",
          body: `
            <p><code>type="color"</code> obre el selector de colors del navegador. El valor que s'envia és un codi hexadecimal (<code>#rrggbb</code>).</p>
            <p>És útil per a configuracions de tema, etiquetes o preferències visuals.</p>
          `,
          code: `<p>
  <label for="color">Selecciona el teu color favorit</label>
  <input type="color" id="color" name="color" value="#b85c3a">
</p>`,
        },
        {
          title: "autofocus i placeholder",
          body: `
            <p><code>autofocus</code> fa que un camp rebi el focus quan la pàgina es carrega. N'hi ha d'haver <strong>com a màxim un</strong> al document: si n'hi ha més d'un, el navegador ignora els sobrants.</p>
            <p><code>placeholder</code> mostra un text dins del camp que desapareix en escriure. Serveix per descriure el valor esperat o posar un exemple, però <strong>no substitueix l'etiqueta</strong>.</p>
            <p>El <code>placeholder</code> es pot fer servir a <code>text</code>, <code>search</code>, <code>url</code>, <code>tel</code>, <code>email</code> i <code>password</code>.</p>
          `,
          code: `<p>
  <label for="nom">Nom (autofocus)</label>
  <input type="text" id="nom" name="nom" autofocus
         placeholder="Escriu el teu nom">
</p>

<p>
  <label for="cognom">Primer cognom</label>
  <input type="text" id="cognom" name="cognom"
         placeholder="Primer Cognom">
</p>

<p>
  <label for="correu2">Correu</label>
  <input type="email" id="correu2" name="correu"
         placeholder="nom@exemple.com">
</p>`,
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