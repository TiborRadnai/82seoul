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
      title: 'Relevante Links & Downloads',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platformType',
              title: 'Platform Típusa',
              type: 'string',
              options: {
                list: [
                  { title: 'Apple App Store', value: 'appStore' },
                  { title: 'Google Play Store', value: 'playStore' },
                  { title: 'Hivatalos Weboldal / Egyéb', value: 'web' }
                ]
              }
            },
            {
              name: 'buttonText',
              title: 'Gomb felirata (pl. Naver Map iOS)',
              type: 'string'
            },
            {
              name: 'url',
              title: 'Direkt Link (App Store / Play Store / Web)',
              type: 'url'
            }
          ]
        }
      ]
    },
    {
      name: 'orderRank',
      title: 'Sorrend (1, 2, 3...)',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};