// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { z } from 'zod';

export default defineConfig({
  adapter: cloudflare({ mode: 'directory' }),
  output: 'server',
  env: {
    schema: {
      RESEND_API_KEY: z.string().min(1),
    },
  },
});
