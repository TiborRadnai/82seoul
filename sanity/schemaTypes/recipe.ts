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
          { title: 'Főételek', value: 'Hauptgerichte' },
          { title: 'Levesek & Egytálételek', value: 'Suppen & Eintöpfe' },
          { title: 'Street Food', value: 'Street Food' },
          { title: 'Desszertek & Sütemények', value: 'Desserts & Gebäck' },
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
      title: 'Elkészítés menete (Részletes leírás)',
      type: 'text',
      rows: 6,
      description: 'Írd le lépésről lépésre, hogyan kell elkészíteni az ételt.',
    },
    {
      name: 'prepTime',
      title: 'Elkészítési idő',
      type: 'string',
      placeholder: 'pl. 25 Min.',
    },
    {
      name: 'difficulty',
      title: 'Nehézség',
      type: 'string',
      options: {
        list: [
          { title: 'Könnyű', value: 'Einfach' },
          { title: 'Közepes', value: 'Mittel' },
          { title: 'Nehéz', value: 'Schwer' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'ingredients',
      title: 'Hozzávalók listája',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Soronként add meg a hozzávalókat a mennyiségekkel.',
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