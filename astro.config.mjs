import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://desenvolupament-web.vercel.app',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
});
