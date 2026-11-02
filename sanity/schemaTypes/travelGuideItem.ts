// sanity/schemas/travelGuideItem.ts
export default {
  name: 'travelGuideItem',
  title: 'Utazási Kisokos Elem',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Cím (pl. Papago Fordító & Nyelv)',
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
      name: 'tag',
      title: 'Címke / Kategória (pl. 01 // Mobilität, 05 // Shopping)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Rövid leírás (A kártyán látszik előzetesként)',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Részletes Tartalom (A felugró ablakban / modalban jelenik meg)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Itt adhatsz meg hosszabb infókat, listákat, tippeket (pl. nyitvatartások, jogsival kapcsolatos tudnivalók).',
    },
    {
      name: 'appLinks',
      title: 'Letöltési linkek / Külső hivatkozások (Opcionális)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'appLink',
          title: 'Link elem',
          fields: [
            {
              name: 'platformName',
              title: 'Platform neve (pl. Google Play, App Store, Hivatalos oldal)',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL Link',
              type: 'url',
            },
          ],
        },
      ],
      description: 'Csak akkor töltsd ki, ha az adott témához (pl. appokhoz, hivatalos oldalakhoz) tartoznak külső linkek.',
    },
    {
      name: 'orderRank',
      title: 'Sorrend (1, 2, 3...)',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};