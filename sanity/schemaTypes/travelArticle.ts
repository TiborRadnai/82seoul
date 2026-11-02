// sanity/schemas/travelArticle.ts
export default {
  name: 'travelArticle',
  title: 'Korea Utazási Cikk',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Cikk / Úti cél neve (pl. Seoul, Gyeongju)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Hova tartozik?',
      type: 'string',
      options: {
        list: [
          { title: 'Metropolis & City Life', value: 'city' },
          { title: 'Kultur & Tradition', value: 'culture' },
          { title: 'Natur & Jeju', value: 'nature' },
          { title: 'Travel Guide & Essentials', value: 'guide' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tag',
      title: 'Kártya Címke (pl. 01 // Seoul)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Rövid leírás / Bevezető',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Kiemelt Kép (Borító)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    // << BŐVÍTETT GALÉRIA: Kép + Képaláírás (caption) >>
    {
      name: 'gallery',
      title: 'Képgaléria & Feliratok',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Galéria Kép',
          fields: [
            {
              name: 'image',
              title: 'Kép',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Képaláírás / Magyarázat',
              type: 'string',
              description: 'Opcionális leírás a kép alatt vagy a nagyítón (pl. Gyeongbokgung palota este).',
            },
          ],
        },
      ],
      description: 'További képek a helyszínről a magazinoldalhoz, saját feliratokkal.',
    },
    // << ÚJ MEZŐ: Hosszú, formázott cikk szöveg (Portable Text) >>
    {
      name: 'body',
      title: 'Részletes Cikk Tartalom (Magazin szöveg)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'A cikk teljes, formázott kifejtése alcímekkel és bekezdésekkel.',
    },
    {
      name: 'isFeaturedOnSection',
      title: 'Kiemeld a Fő Szekció Oldalon? (Top kártya)',
      type: 'boolean',
      description: 'Ha bekapcsolod, kártyaként megjelenik a pillér főoldalán.',
      initialValue: true,
    },
    {
      name: 'orderRank',
      title: 'Sorrend (1, 2, 3...)',
      type: 'number',
      description: 'Meghatározza a kártyák sorrendjét.',
    },
  ],
};