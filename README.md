# Desenvolupament Web 🌐

Benvingut/da al repositori de **Desenvolupament Web** ([desenvolupament-web.vercel.app](https://desenvolupament-web.vercel.app)).

Aquest projecte va néixer amb un objectiu molt clar: oferir un recurs obert, complet i en català perquè qualsevol persona o estudiant pugui aprendre a fer pàgines web des de zero, pas a pas i sense complicacions.

---

## Què hi trobaràs?

La plataforma està organitzada en quatre itineraris que cobreixen tot el camí bàsic del desenvolupament web modern:

1. **HTML** — L'esquelet del web: des de les primeres etiquetes i l'estructura semàntica fins a formularis, elements multimèdia i bones pràctiques d'accessibilitat.
2. **CSS** — L'aspecte visual: colors, tipografies, model de caixa, Flexbox, Grid, transicions, animacions i disseny adaptable a mòbils. A les capses de codi pots alternar entre les pestanyes de CSS i HTML per veure com encaixen.
3. **JavaScript** — La interactivitat: variables, funcions, lògica, manipulació del DOM, esdeveniments, crides asíncrones (`fetch`, APIs) i com fer que les pàgines cobrin vida.
4. **Projectes Pràctics** — El món real: utilització d'eines que fem servir al dia a dia com Git, GitHub, VS Code, DevTools del navegador i com desplegar projectes a Vercel o GitHub Pages.

A més, hi ha un **Playground interactiu** (a l'estil VS Code) integrat directament al navegador amb l'editor Monaco. Permet provar idees, escriure codi amb múltiples fitxers i veure el resultat al moment sense haver d'instal·lar cap programa.

El progrés de lectura es desa automàticament al teu propi navegador (`localStorage`), de manera que pots anar marcant els capítols fets al teu ritme.

---

## Com arrencar el projecte en local

Si vols clonar el projecte per consultar-lo, trastejar o provar canvis al teu equip:

1. Assegura't de tenir **Node.js** instal·lat (recomanat Node 18 o superior).
2. Clona el repositori i entra a la carpeta:
   ```bash
   git clone https://github.com/ferraneloi/desenvolupament-web.git
   cd aula-html-astro
   ```
3. Instal·la les dependències:
   ```bash
   npm install
   ```
4. Engega el servidor de desenvolupament:
   ```bash
   npm run dev
   ```
   Obre [http://localhost:4321](http://localhost:4321) al navegador i ja ho tens!

Per generar la versió final estàtica de producció:
```bash
npm run build
npm run preview
```

---

## Com està fet per dins?

El lloc està pensat perquè sigui molt ràpid i no depengui de servidors ni bases de dades externes:

- **[Astro 5](https://astro.build/)**: S'encarrega de generar tot el contingut com a pàgines HTML estàtiques ultraràpides.
- **[React](https://react.dev/)**: Utilitzat puntualment a les zones que requereixen interacció (el playground de codi, les capses d'exemples i la barra de progrés).
- **[Tailwind CSS](https://tailwindcss.com/)**: Per maquetar la interfície amb un disseny net i adaptat a mode clar i fosc.
- **Sense backend**: Totes les dades dels capítols són mòduls JavaScript locals i el progrés es guarda a la memòria del navegador.

---

## Autor

Creat per **Ferran Eloi** · Institut Caparrella (Lleida).  
Si et serveix per aprendre o per a les teves classes, objectiu complert!
