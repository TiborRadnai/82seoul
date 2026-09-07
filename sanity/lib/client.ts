// sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '8jbqa5wg',
  dataset: 'production',
  apiVersion: '2024-03-16',
  useCdn: true,
})