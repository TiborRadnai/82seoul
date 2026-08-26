export const actor = {
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
    // Alapadatok
    {
      name: 'birthDate',
      title: 'Születési dátum',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY', // Német/európai formátum a Stúdióban
      },
    },
    {
      name: 'birthPlace',
      title: 'Születési hely (pl. Szöul, Dél-Korea)',
      type: 'string',
    },
    {
      name: 'instagramUrl',
      title: 'Hivatalos Instagram URL',
      type: 'url',
    },
    {
      name: 'education',
      title: 'Iskolai végzettség / Egyetem',
      type: 'string',
    },
    {
      name: 'debutYear',
      title: 'Aktív évek / Debütálás (pl. 2019 – napjainkig)',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Rövid leírás / Életrajz',
      type: 'text',
    },
    // Teljes filmográfia lista
    {
      name: 'filmography',
      title: 'Filmográfia / Összes szereplés',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'mediaType',
              title: 'Típus',
              type: 'string',
              options: {
                list: [
                  { title: 'Sorozat / Dráma', value: 'series' },
                  { title: 'Film', value: 'movie' },
                ],
                layout: 'dropdown', // Lenyíló menü asztali nézetben is
              },
              initialValue: 'series', // Alapértelmezett érték (opcionális)
            },
            {
              name: 'year',
              title: 'Év',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Cím (Sorozat / Film)',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Karakter / Szerep',
              type: 'string',
            },
          ],
          // Opcionális: Ez mutatja a Stúdió listanézetében is a típust ikonnal/szöveggel
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
              mediaType: 'mediaType',
            },
            prepare(selection: { title: string; subtitle: string; mediaType: string }) {
              const { title, subtitle, mediaType } = selection;
              const typeIcon = mediaType === 'movie' ? '🎬 Film' : '📺 Sorozat';
              return {
                title: title,
                subtitle: `${subtitle || 'Év nélkül'} – ${typeIcon}`,
              };
            },
          },
        },
      ],
    },
  ],
};