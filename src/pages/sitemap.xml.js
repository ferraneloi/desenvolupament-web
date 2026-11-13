import { courses } from '../lib/tutorial.js';

export async function GET({ site }) {
  const base = site ?? new URL('https://desenvolupament-web.vercel.app');

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/playground', priority: '0.8', changefreq: 'monthly' },
  ];

  for (const course of courses) {
    pages.push({ url: `/${course.slug}`, priority: '0.9', changefreq: 'weekly' });
    for (const chapter of course.chapters) {
      pages.push({
        url: `/${course.slug}/capitol/${chapter.slug}`,
        priority: '0.8',
        changefreq: 'monthly',
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${new URL(p.url, base).href}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

