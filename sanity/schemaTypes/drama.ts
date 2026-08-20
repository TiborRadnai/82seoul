export const drama = {
  name: 'drama',
  title: 'K-Drama & Movies',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Cím (Angol / Eredeti)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'id',
      title: 'URL Azonosító (slug-szerű, pl. love-next-door)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Típus',
      type: 'string',
      options: {
        list: [
          { title: 'Sorozat (Series)', value: 'series' },
          { title: 'Film (Movie)', value: 'movie' },
        ],
      },
      initialValue: 'series',
    },
    {
      name: 'tagline',
      title: 'Rövid szlogen / Alcím',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Részletes leírás',
      type: 'text',
    },
    {
      name: 'platform',
      title: 'Streaming Platform (pl. Netflix, tvN)',
      type: 'string',
    },
    {
      name: 'releaseYear',
      title: 'Megjelenési év',
      type: 'number',
    },
    {
      name: 'episodes',
      title: 'Epizódok száma (vagy játékidő)',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Fő poszter kép',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'wideImage',
      title: 'Széles háttérkép (Hero / Részletes oldalhoz)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'rating',
      title: 'Értékelés / Pontszám (pl. 4.9)',
      type: 'string',
    },
    {
      name: 'cast',
      title: 'Főszereplők (Hivatkozás Actor dokumentumokra)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'actor' }] }],
    },
    {
      name: 'featured',
      title: 'Kiemelt elem a főoldali slideren/hero-n?',
      type: 'boolean',
      initialValue: false,
    },
  ],
};