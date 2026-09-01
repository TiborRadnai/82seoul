export default {
  name: 'recipe',
  title: 'Receptek',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Recept Neve',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'koreanTitle',
      title: 'Koreai Név (Hangul)',
      type: 'string',
    },
    {
      name: 'id',
      title: 'Egyedi azonosító (Slug / ID)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subCategory',
      title: 'Kategória (pl. Főételek, Levesek, Street Food)',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Rövid leírás (Csempékre / Hero-hoz)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'description',
      title: 'Részletes leírás / Háttérsztori',
      type: 'text',
      rows: 4,
    },
    {
      name: 'image',
      title: 'Fő kép / Poszter',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Sorrend',
      type: 'number',
    },
    {
      name: 'featured',
      title: 'Kiemelt a főoldalon (Csempe)',
      type: 'boolean',
      description: 'Ha bekapcsolod, ez jelenik meg a főoldali K-Food szekcióban.',
    },
    {
      name: 'prepTime',
      title: 'Elkészítési idő',
      type: 'string',
    },
    {
      name: 'difficulty',
      title: 'Nehézség',
      type: 'string',
      options: {
        list: [
          { title: 'Könnyű', value: 'Könnyű' },
          { title: 'Közepes', value: 'Közepes' },
          { title: 'Nehéz', value: 'Nehéz' },
        ],
      },
    },
    {
      name: 'ingredients',
      title: 'Hozzávalók',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};