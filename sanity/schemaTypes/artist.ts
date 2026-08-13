export const artist = {
  name: 'artist',
  title: 'Előadó / Banda',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Művész / Banda Neve',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'id',
      title: 'URL Azonosító (slug, pl. bts, blackpink)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rank',
      title: 'Rang / Helyezés (Top 10-hez)',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Kategória',
      type: 'string',
      options: {
        list: [
          { title: 'Fiúcsapat (BG)', value: 'bg' },
          { title: 'Lánycsapat (GG)', value: 'gg' },
          { title: 'Szóló Előadó', value: 'solo' },
        ],
      },
    },
    {
      name: 'filterAgency',
      title: 'Kiadó Ügynökség (Szűrőhöz)',
      type: 'string',
      options: {
        list: [
          { title: 'HYBE', value: 'HYBE' },
          { title: 'SM Entertainment', value: 'SM' },
          { title: 'YG Entertainment', value: 'YG' },
          { title: 'JYP Entertainment', value: 'JYP' },
          { title: 'Egyéb', value: 'OTHER' },
        ],
      },
    },
    {
      name: 'agency',
      title: 'Kiadó Megnevezése (szöveges)',
      type: 'string',
    },
    {
      name: 'themeColor',
      title: 'Egyedi Neon / Háttérszín (HEX kód, pl. #991b1b)',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Szlogen / Tagline',
      type: 'string',
    },
    {
      name: 'generation',
      title: 'Generáció (pl. 3rd, 4th)',
      type: 'string',
      description: 'Add meg a generációt szövegesen, pl: 3rd',
    },
    {
      name: 'image',
      title: 'Kis Kép (Lista nézethez)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'wideImage',
      title: 'Széles Borítókép',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'members',
      title: 'Tagok száma szövegesen (pl. 7 tag)',
      type: 'string',
    },
    {
      name: 'fandom',
      title: 'Fandom Név (pl. ARMY)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Rövid Leírás',
      type: 'text',
    },
    {
      name: 'extendedHistory',
      title: 'Részletes Történet',
      type: 'text',
    },
    {
      name: 'membersList',
      title: 'Tagok listája',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Művésznév (pl. RM)', type: 'string' },
            { name: 'fullName', title: 'Teljes Név', type: 'string' },
            { name: 'koreanName', title: 'Koreai Név', type: 'string' },
            { name: 'role', title: 'Szerepkör', type: 'string' },
            { name: 'birthDate', title: 'Születési Dátum', type: 'string' },
            { name: 'zodiac', title: 'Csillagjegy', type: 'string' },
            { name: 'height', title: 'Magasság', type: 'string' },
            { name: 'bloodType', title: 'Vércsoport', type: 'string' },
            { name: 'birthPlace', title: 'Születési Hely', type: 'string' },
            { name: 'signatureTrack', title: 'Kiemelt Dal / Szóló', type: 'string' },
            { name: 'brandAmbassador', title: 'Márkanagykövet', type: 'string' },
            { name: 'instagram', title: 'Instagram', type: 'string' },
            { name: 'quote', title: 'Idézet', type: 'string' },
            { name: 'shortBio', title: 'Rövid Bio', type: 'text' },
            { name: 'image', title: 'Tag Képe', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
    {
      name: 'albums',
      title: 'Albumok és Kiadványok',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'Album ID (pl. proof)', type: 'string' },
            { name: 'title', title: 'Cím', type: 'string' },
            {
              name: 'type',
              title: 'Típus',
              type: 'string',
              options: {
                list: [
                  { title: 'Stúdióalbum', value: 'full' },
                  { title: 'Minialbum (EP)', value: 'mini' },
                  { title: 'Kislemez (Single)', value: 'single' },
                  { title: 'OST', value: 'ost' },
                ],
              },
            },
            { name: 'releaseDate', title: 'Megjelenés Dátuma', type: 'string' },
            { name: 'coverImage', title: 'Borítókép', type: 'image', options: { hotspot: true } },
            { name: 'spotifyUrl', title: 'Spotify Link', type: 'url' },
            {
              name: 'tracks',
              title: 'Dallista (Tracklist)',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
  ],
};