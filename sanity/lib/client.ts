import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8bjbqa5wg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-16',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skNudvQ0t0rY0eMgQhpAubswCtBqBfA6s92nZWcCVtcZEWX1E7393C1TZnlnGkdv568FoKpBZh8wcxce4We2SzTdpcfDzVu2xZbZVg4zdZOtgmiq49hhYKe8Y4Z8KNRgURQLhs9vqVSPkItelWGTZqlJCdHwv9m1G6SpKZjz21XDRTp579Jm', // <- Ez átüti a falat, ha a privát dataset miatt blockol
})