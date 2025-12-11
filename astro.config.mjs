// astro.config.mjs
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://codery.mx",
  adapter: cloudflare({
    mode: "directory", // para Cloudflare Pages
  }),
  integrations: [
    sitemap(), // 👈 genera sitemap.xml automáticamente
  ],
  output: "server",

  env: {
    schema: {
      // 🔐 Solo servidor, secreto (no llega nunca al cliente)
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()], 
  },
});
