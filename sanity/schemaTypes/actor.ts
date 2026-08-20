export default {
  name: 'actor',
  title: 'Actors & Actresses',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Színész neve',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'id',
      title: 'URL Azonosító (pl. go-youn-jung)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Portré kép',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Rövid leírás / Életrajz',
      type: 'text',
    },
  ],
};