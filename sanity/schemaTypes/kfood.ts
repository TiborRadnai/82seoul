export default {
  name: 'kfood',
  title: 'K-Food & Termékek',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Megnevezés',
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
      name: 'category',
      title: 'Típus',
      type: 'string',
      options: {
        list: [
          { title: 'Recept', value: 'recipe' },
          { title: 'Bolti Termék / Ital', value: 'product' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subCategory',
      title: 'Kategória / Címke (pl. Street Food, Italkultúra)',
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

    // --- CSAK RECEPTEKHEZ ---
    {
      name: 'prepTime',
      title: 'Elkészítési idő',
      type: 'string',
      hidden: ({ document }: { document: any }) => document?.category !== 'recipe',
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
      hidden: ({ document }: { document: any }) => document?.category !== 'recipe',
    },
    {
      name: 'ingredients',
      title: 'Hozzávalók',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }: { document: any }) => document?.category !== 'recipe',
    },

    // --- CSAK BOLTI TERMÉKESHEZ / ITALOKHOZ ---
    {
      name: 'price',
      title: 'Ár (opcionális)',
      type: 'string',
      hidden: ({ document }: { document: any }) => document?.category !== 'product',
    },
    {
      name: 'location',
      title: 'Hol kapható',
      type: 'string',
      hidden: ({ document }: { document: any }) => document?.category !== 'product',
    },
  ],
};