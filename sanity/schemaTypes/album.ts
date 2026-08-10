export const album = {
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Album ID (pl. proof)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Album Címe',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Típus',
      type: 'string',
      options: {
        list: [
          { title: 'Stúdióalbum (Full)', value: 'full' },
          { title: 'Minialbum (Mini / EP)', value: 'mini' },
          { title: 'Kislemez (Single)', value: 'single' },
          { title: 'OST', value: 'ost' },
        ],
      },
    },
    {
      name: 'releaseDate',
      title: 'Megjelenés Dátuma',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Borítókép',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'spotifyUrl',
      title: 'Spotify Link',
      type: 'url',
    },
    {
      name: 'tracks',
      title: 'Dallista (Tracklist)',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};