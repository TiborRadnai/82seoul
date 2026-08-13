import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '8jbqa5wg', // Hardkódoltuk a project ID-t
  dataset: 'production',    // Hardkódoltuk a datasetet
  apiVersion: '2024-03-16',
  useCdn: true, 
})