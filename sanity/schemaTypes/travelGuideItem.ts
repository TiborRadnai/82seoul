// sanity/schemas/travelGuideItem.ts
export default {
  name: 'travelGuideItem',
  title: 'Utazási Kisokos Elem',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Cím (pl. KTX & T-Money)',
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
      title: 'Címke (pl. 01 // Mobilität)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Rövid leírás',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'orderRank',
      title: 'Sorrend (1, 2, 3)',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};