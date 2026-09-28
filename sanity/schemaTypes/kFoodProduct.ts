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
      title: 'Egyedi azonosító (Slug / URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subCategory',
      title: 'Kategória',
      type: 'string',
      options: {
        list: [
          { title: 'Italok & Soju', value: 'Getränke & Erfrischungen' },
          { title: 'Nassolnivalók & Snackek', value: 'Snacks & Knabbereien' },
          { title: 'Alapanyagok', value: 'Zutaten & Grundnahrungsmittel' },
          { title: 'Szószok, Fűszerek & Tészták', value: 'Würzsaucen, Gewürze & Nudeln' },
          { title: 'Édességek & Desszertek', value: 'Süßwaren & Desserts' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Rövid ismertető (Csempékre & felvezetőnek)',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Részletes termékleírás & Fogyasztási tippek',
      type: 'text',
      rows: 5,
      description: 'Írd le az ízvilágot, kiszerelést vagy a fogyasztási etikettet.',
    },
    {
      name: 'price',
      title: 'Ár (opcionális)',
      type: 'string',
      placeholder: 'pl. 4.50 €',
    },
    {
      name: 'location',
      title: 'Hol kapható',
      type: 'string',
      placeholder: 'pl. Ázsiai boltok / Lotte Mart',
    },
    {
      name: 'image',
      title: 'Fő kép / Poszter',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Kiemelt a főoldalon (Csempe)',
      type: 'boolean',
      description: 'Ha bekapcsolod, ez jelenik meg a főoldali K-Food szekcióban.',
    },
    {
      name: 'order',
      title: 'Sorrend (Index)',
      type: 'number',
      hidden: true,
    },
    {
      name: 'spiceLevel',
      title: 'Csípősségi szint',
      type: 'string',
      options: {
        list: [
          { title: '🌶️ Enyhén csípős', value: '1' },
          { title: '🌶️🌶️ Közepesen csípős', value: '2' },
          { title: '🌶️🌶️🌶️ Extrém erős', value: '3' },
        ],
        layout: 'dropdown',
      },
    }
  ],
};