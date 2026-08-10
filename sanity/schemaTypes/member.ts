export const member = {
  name: 'member',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Művésznév (pl. RM)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'fullName',
      title: 'Teljes Név',
      type: 'string',
    },
    {
      name: 'koreanName',
      title: 'Koreai Név',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Szerepkör (pl. Leader, Main Rapper)',
      type: 'string',
    },
    {
      name: 'birthDate',
      title: 'Születési Dátum',
      type: 'string',
    },
    {
      name: 'zodiac',
      title: 'Csillagjegy',
      type: 'string',
    },
    {
      name: 'height',
      title: 'Magasság',
      type: 'string',
    },
    {
      name: 'bloodType',
      title: 'Vércsoport',
      type: 'string',
    },
    {
      name: 'birthPlace',
      title: 'Születési Hely',
      type: 'string',
    },
    {
      name: 'signatureTrack',
      title: 'Kiemelt Dal / Szóló',
      type: 'string',
    },
    {
      name: 'brandAmbassador',
      title: 'Márkanagykövet',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Instagram Profil',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Idézet',
      type: 'string',
    },
    {
      name: 'shortBio',
      title: 'Rövid Bio',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Tag Képe',
      type: 'image',
      options: { hotspot: true },
    },
  ],
};