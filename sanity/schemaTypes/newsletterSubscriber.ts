export default {
  name: 'newsletterSubscriber',
  title: 'Hírlevél Feliratkozó',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'E-mail cím',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subscribedAt',
      title: 'Feliratkozás dátuma',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt',
    },
  },
};