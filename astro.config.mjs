// astro.config.mjs
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  adapter: cloudflare({
    mode: "directory", // para Cloudflare Pages
  }),
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
});
