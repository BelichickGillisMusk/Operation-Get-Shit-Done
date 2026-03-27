/**
 * Programmatic XML sitemap.
 * Includes all services, cities, and static pages.
 * Submitted to Google Search Console per regional subdomain.
 * Also referenced in robots.txt for OAI-SearchBot and other AI crawlers.
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getRegion } from "@/config/regions";

export const GET: APIRoute = async ({ site }) => {
  const region = getRegion();
  const base = site?.toString().replace(/\/$/, "") ?? region.host;

  const services = await getCollection("services", (s) => s.data.published);
  const cities = await getCollection("cities", (c) => c.data.published);

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "monthly" },
    { url: "/services", priority: "0.9", changefreq: "monthly" },
    { url: "/pricing", priority: "0.9", changefreq: "monthly" },
    { url: "/faq", priority: "0.9", changefreq: "monthly" },
    { url: "/contact", priority: "0.8", changefreq: "yearly" },
    { url: "/about", priority: "0.7", changefreq: "yearly" },
    { url: "/reviews", priority: "0.7", changefreq: "monthly" },
    { url: "/videos", priority: "0.7", changefreq: "monthly" },
    { url: "/cities", priority: "0.8", changefreq: "monthly" },
    { url: "/blog", priority: "0.7", changefreq: "weekly" },
  ];

  const servicePages = services.map((s) => ({
    url: `/services/${s.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));

  const cityPages = cities.map((c) => ({
    url: `/cities/${c.data.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const allPages = [...staticPages, ...servicePages, ...cityPages];
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${base}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
