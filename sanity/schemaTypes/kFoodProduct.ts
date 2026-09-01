export default {
  name: 'kFoodProduct',
  title: 'Bolti Termékek & Italok',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Termék Neve',
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
      title: 'Kategória (pl. Italkultúra, Nassolnivaló)',
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
      title: 'Részletes leírás / Fogyasztási tippek',
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
      name: 'price',
      title: 'Ár (opcionális)',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Hol kapható',
      type: 'string',
    },
  ],
};