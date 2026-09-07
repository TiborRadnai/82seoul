// sanity/schemaTypes/customer.ts
import { ToggleInput } from '../components/ToggleInput';

export default {
  name: 'customer',
  title: 'Regisztrált Felhasználók',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'Felhasználó Azonosító', // Átnevezve a Firebase-től függetlenre
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'E-mail cím',
      type: 'string',
    },
    {
      name: 'passwordHash', // <--- HOZZÁADVA: Itt tároljuk a bcrypt által titkosított hashet
      title: 'Jelszó Hash (Biztonságos)',
      type: 'string',
      hidden: true, // Elrejtjük a stúdió elől, hogy ne zavarjon
    },
    {
      name: 'lastName',
      title: 'Vezetéknév',
      type: 'string',
    },
    {
      name: 'firstName',
      title: 'Keresztnév',
      type: 'string',
    },
    {
      name: 'koreanName',
      title: 'Koreai név (Hangeul)',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Telefonszám',
      type: 'string',
    },
    {
      name: 'shippingAddress',
      title: 'Szállítási Cím',
      type: 'object',
      fields: [
        { name: 'street', title: 'Utca, Házszám', type: 'string' },
        { name: 'city', title: 'Város', type: 'string' },
        { name: 'postalCode', title: 'Irányítószám', type: 'string' },
        { name: 'country', title: 'Ország', type: 'string' },
      ],
    },
    {
    name: 'status',
      title: 'Fiók Státusza',
      type: 'string',
      components: {
        input: ToggleInput,
      },
      initialValue: 'active',
    },
    {
      name: 'createdAt',
      title: 'Regisztráció Dátuma',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      lastName: 'lastName',
      firstName: 'firstName',
      email: 'email',
      status: 'status',
    },
    prepare(selection: { lastName?: string; firstName?: string; email?: string; status?: string }) {
      const { lastName, firstName, email, status } = selection;
      const isArchived = status === 'archived';
      return {
        title: `${lastName || ''} ${firstName || ''}`.trim() || 'Névtelen felhasználó',
        subtitle: `${email || ''} ${isArchived ? '🔒 [ARCHIVÁLT]' : ''}`,
      };
    },
  },
};