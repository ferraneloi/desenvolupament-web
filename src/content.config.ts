// Els fitxers a src/content/ són mòduls JS que s'importen directament
// (NO són Astro Content Collections). Declarem collections buides
// per evitar que Astro les auto-detecti i mostri advertències.
import { defineCollection } from 'astro:content';

// Declarem les sub-carpetes com a collections buides
// (sense cap loader) per silenciar el warning d'auto-generated collections.
const css = defineCollection({});
const js = defineCollection({});
const practica = defineCollection({});

export const collections = { css, js, practica };
