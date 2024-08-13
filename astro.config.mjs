import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  experimental: {
    env: {
      schema: {
        DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN: envField.string({
          context: 'client',
          access: 'public',
        }),
        DATOCMS_DRAFT_CONTENT_CDA_TOKEN: envField.string({
          context: 'server',
          access: 'secret',
        }),
        DATOCMS_CMA_TOKEN: envField.string({
          context: 'server',
          access: 'secret',
        }),
      },
      validateSecrets: true,
    },
  },
  integrations: [react()],
});
