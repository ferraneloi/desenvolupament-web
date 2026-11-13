# Desenvolupament Web

Plataforma educativa en català per aprendre desenvolupament web (HTML, CSS, JavaScript i Projectes Pràctics) — construïda amb **Astro 5**, **React 19** i preparada per desplegar a **Vercel** (`https://desenvolupament-web.vercel.app`).

## Característiques

- **4 itineraris complets** — 129 capítols d'HTML, CSS, JavaScript i Desenvolupament Pràctic
- **Playground tipus VS Code** — editor Monaco amb múltiples fitxers, previsualització en directe i exportació ZIP
- **Sistema de progrés** persistent amb `localStorage`
- **Desplegament estàtic** — sense servidor, compatible amb Vercel i GitHub Pages
- **SEO complet** — metadades, Open Graph, sitemap i robots.txt
- **Mode clar/fosc** integrat
- **Totalment en català**

## Estructura

```
aula-html-astro/
├── src/
│   ├── components/
│   │   ├── playground/     # VSCodePlayground (Monaco Editor)
│   │   ├── site/           # SiteHeader, ChapterSidebar, CourseCard
│   │   ├── tutorial/       # ChapterBody, ChapterFooter, CodeBlock, ExerciseCard
│   │   └── ui/             # Shadcn UI components
│   ├── content/            # Continguts dels cursos (JS objects)
│   │   ├── css/            # 4 blocs CSS
│   │   ├── js/             # 8 blocs JavaScript
│   │   └── part*.js        # 7 blocs HTML
│   ├── layouts/
│   │   ├── MainLayout.astro
│   │   └── PlaygroundLayout.astro
│   ├── lib/
│   │   ├── tutorial.js     # Lògica dels cursos
│   │   ├── progress.js     # Sistema de progrés (localStorage)
│   │   └── highlightCode.js
│   ├── pages/
│   │   ├── index.astro         # Pàgina d'inici
│   │   ├── playground.astro    # Playground VS Code
│   │   ├── [course]/
│   │   │   ├── index.astro             # Índex del curs
│   │   │   └── capitol/[slug].astro   # Capítol individual
│   │   ├── sitemap.xml.js      # Sitemap dinàmic
│   │   └── 404.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── vercel.json
└── package.json
```

## Desenvolupament local

```bash
# Instal·lar dependències
npm install

# Servidor de desenvolupament (http://localhost:4321)
npm run dev

# Build de producció
npm run build

# Previsualitzar el build
npm run preview
```

## Desplegament a Vercel

1. Connecta el repositori a [Vercel](https://vercel.com)
2. Framework: **Astro** (auto-detectat)
3. Build command: `npm run build`
4. Output directory: `dist`
5. No cal cap variable d'entorn

O amb la CLI de Vercel:
```bash
npm i -g vercel
vercel --prod
```

## URLs

| Ruta | Descripció |
|------|------------|
| `/` | Pàgina d'inici amb els tres cursos |
| `/html` | Índex del curs d'HTML |
| `/css` | Índex del curs de CSS |
| `/javascript` | Índex del curs de JavaScript |
| `/html/capitol/[slug]` | Capítol individual |
| `/playground` | Playground VS Code |
| `/prova` | Redirigeix a `/playground` (URL legacy) |
| `/sitemap.xml` | Sitemap XML |
| `/robots.txt` | Robots.txt |

## Arquitectura

- **Astro 5** com a framework principal — generació estàtica
- **React Islands** (`client:load` / `client:only`) per als components interactius
- **Tailwind CSS v3** per als estils
- **Monaco Editor** al Playground (carregat de manera dinàmica)
- **localStorage** per al sistema de progrés (claus: `aula-progress`, `aula-playground-projects`)

## Funcionalitats del Playground

- Explorador de fitxers amb creació, eliminació i canvi de nom
- Editor Monaco amb ressaltat de sintaxi per a HTML, CSS i JavaScript
- Previsualització en directe (actualització automàtica amb debounce de 600ms)
- Múltiples pestanyes de fitxers
- Consola d'errors de JavaScript
- Exportació del projecte en format ZIP
- Persistència de projectes amb localStorage
- Integració amb tutorials (paràmetre `?exercise=...`)

## Progrés de la migració (Base44 → Astro)

### ✅ Implementat
- Tota l'estructura de rutes
- Tots els continguts (93 capítols)
- Sistema de progrés (localStorage)
- Playground VS Code amb Monaco
- SEO, sitemap, robots.txt
- Mode clar/fosc
- Redirect `/prova` → `/playground`

### 🔜 Pendent (fases futures)
- Autenticació i comptes d'usuari
- Sincronització del progrés al núvol
- Nous continguts (accessibilitat, SEO tècnic, TypeScript...)
- Exercicis interactius amb validació
- Tests automatitzats
