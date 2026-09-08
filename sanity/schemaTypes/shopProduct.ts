export default {
  name: 'shopProduct',
  title: 'Webshop Termék',
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
      title: 'Koreai Név / Hangul',
      type: 'string',
    },
    {
      name: 'id',
      title: 'URL azonosító (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategória',
      type: 'string',
      options: {
        list: [
          { title: 'Arckrém & Hidratáló', value: 'Arckrém & Hidratáló' },
          { title: 'Szérum & Esszencia', value: 'Szérum & Esszencia' },
          { title: 'Arctisztító', value: 'Arctisztító' },
          { title: 'Arcmaszk & Peeling', value: 'Arcmaszk & Peeling' },
          { title: 'Smink & Egyéb', value: 'Smink & Egyéb' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'badge',
      title: 'Címke / Státusz (pl. Bestseller, Új)',
      type: 'string',
      options: {
        list: [
          { title: 'Bestseller', value: 'Bestseller' },
          { title: 'Trending', value: 'Trending' },
          { title: 'Új', value: 'Új' },
          { title: 'Populáris', value: 'Populáris' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Kiemelt a főoldalon (Max. 4 darab engedélyezett)',
      type: 'boolean',
      initialValue: false,
      validation: (Rule: any) =>
        Rule.custom(async (isFeatured: boolean, context: { document: { _id: string }; getClient: (options: { apiVersion: string }) => any }) => {
          if (!isFeatured) return true;

          const client = context.getClient({ apiVersion: '2024-03-01' });
          const currentId = context.document._id.replace(/^drafts\./, '');

          const featuredProducts = await client.fetch(
            '*[_type == "shopProduct" && featured == true]{ _id }'
          );

          const uniqueFeaturedIds = new Set(
            featuredProducts.map((p: any) => p._id.replace(/^drafts\./, ''))
          );

          if (uniqueFeaturedIds.size >= 4 && !uniqueFeaturedIds.has(currentId)) {
            return 'Maximum 4 kiemelt termék lehet egyszerre! Kérlek, kapcsold ki a kiemelést egy másik terméken, mielőtt ezt bekapcsolod.';
          }

          return true;
        }),
    },
    {
      name: 'image',
      title: 'Fő Kép',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    // --- GALÉRIA KÉPEK ---
    {
      name: 'gallery',
      title: 'Galéria Képek (További fotók a termékről)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'tagline',
      title: 'Rövid összefoglaló (Kártyákra)',
      type: 'text',
      rows: 2,
    },
    
    // --- KOZMETIKAI / RÉSZLETES MEZŐK ---
    {
      name: 'description',
      title: 'Részletes leírás',
      type: 'text',
      rows: 4,
    },
    {
      name: 'ingredients',
      title: 'Fő összetevők (pl. Niacinamide, Snail Mucin)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'howToUse',
      title: 'Használati útmutató',
      type: 'text',
      rows: 3,
    },

    // --- DINAMIKUS KISZERELÉSEK, ÁRAK ÉS KÉSZLET ---
    {
      name: 'variants',
      title: 'Kiszerelések, Árak és Készlet (EUR)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Kiszerelés / Méret (pl. 50 ml, 1 db)',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Alapár (pl. 12.50)',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'onSale',
              title: 'Akciós termék?',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'salePrice',
              title: 'Redukált / Akciós ár (pl. 9.90)',
              type: 'string',
              hidden: ({ parent }: { parent?: { onSale?: boolean } }) => !parent?.onSale,
            },
            {
              name: 'stock',
              title: 'Raktárkészlet ehhez a mérethez (Darabszám)',
              type: 'number',
              initialValue: 20,
              validation: (Rule: any) => Rule.min(0).required(),
            },
          ],
          preview: {
            select: {
              size: 'size',
              price: 'price',
              salePrice: 'salePrice',
              onSale: 'onSale',
              stock: 'stock',
            },
            prepare(selection: { size: string; price: string; salePrice: string; onSale: boolean; stock: number }) {
              const { size, price, salePrice, onSale, stock } = selection;
              return {
                title: `${size} — ${onSale ? `${salePrice} € (Akciós!)` : `${price} €`} (Készlet: ${stock ?? 0} db)`,
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1, 'Legalább egy kiszerelést meg kell adni!'),
    },
    
    // --- ÉRTÉKELÉS ---
    {
      name: 'rating',
      title: 'Értékelés (pl. 4.9)',
      type: 'number',
      initialValue: 5.0,
      options: {
        step: 0.1,
      },
      validation: (Rule: any) => Rule.min(1).max(5),
    },
  ],
};