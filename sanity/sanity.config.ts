import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: '82Seoul Admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8bjbqa5wg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // Itt kérjük meg, hogy a 'studio' útvonalat kösse össze a struktúrával
  plugins: [
    structureTool({
      name: 'studio',
      title: 'Studio',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});