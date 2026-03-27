// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// Region is controlled via env var — each subdomain deploy sets REGION
const REGION_HOSTS = {
  sacramento: "https://sacramento.norcalcarb.com",
  bayarea: "https://bayarea.norcalcarb.com",
  stockton: "https://stockton.norcalcarb.com",
  fresno: "https://fresno.norcalcarb.com",
  redding: "https://redding.norcalcarb.com",
  chico: "https://chico.norcalcarb.com",
  northbay: "https://northbay.norcalcarb.com",
  eastbay: "https://eastbay.norcalcarb.com",
  southbay: "https://southbay.norcalcarb.com",
  centralcoast: "https://centralcoast.norcalcarb.com",
  root: "https://norcalcarb.com",
};

const region = process.env.REGION || "sacramento";
const siteUrl = REGION_HOSTS[region] || REGION_HOSTS.sacramento;

export default defineConfig({
  site: siteUrl,
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/draft/"),
    }),
  ],
  output: "static",
  // Static output = best Core Web Vitals, zero runtime JS by default
  // Switch specific pages to SSR via `export const prerender = false` if needed
});
