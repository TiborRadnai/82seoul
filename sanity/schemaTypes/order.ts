// sanity/schemaTypes/order.ts
import { InvoiceDownloadButton } from '../components/InvoiceDownloadButton';

export default {
  name: 'order',
  title: 'Bestellungen (Rendelések)',
  type: 'document',
  fields: [
    { 
      name: 'stripeSessionId', 
      title: 'Stripe Session ID', 
      type: 'string' 
    },
    { 
      name: 'userId', 
      title: 'Felhasználó ID', 
      type: 'string' 
    },
    { 
      name: 'customerEmail', 
      title: 'Vásárló E-mail címe', 
      type: 'string' 
    },
    { 
      name: 'amountTotal', 
      title: 'Végösszeg (€)', 
      type: 'number' 
    },
    { 
      name: 'currency', 
      title: 'Valuta', 
      type: 'string' 
    },
    { 
      name: 'paymentStatus', 
      title: 'Fizetési Státusz', 
      type: 'string' 
    },
    { 
      name: 'invoiceId', 
      title: 'Stripe Invoice ID', 
      type: 'string' 
    },
    { 
      name: 'invoiceUrl', 
      title: 'Stripe Invoice URL', 
      type: 'url' 
    },
    {
      name: 'invoiceAction',
      title: 'Hivatalos Számla',
      type: 'string',
      components: {
        field: InvoiceDownloadButton,
      },
    },
    {
      name: 'items',
      title: 'Megrendelt Termékek',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Termék Neve / Mérete', type: 'string' },
            { name: 'price', title: 'Egységár (€)', type: 'number' },
            { name: 'quantity', title: 'Mennyiség', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'shippingDetails',
      title: 'Szállítási Adatok',
      type: 'object',
      fields: [
        { name: 'street', title: 'Utca, Házszám', type: 'string' },
        { name: 'city', title: 'Város', type: 'string' },
        { name: 'postalCode', title: 'Irányítószám', type: 'string' },
        { name: 'country', title: 'Ország', type: 'string' },
      ],
    },
    { 
      name: 'createdAt', 
      title: 'Rendelés Dátuma', 
      type: 'datetime' 
    },
  ],
  preview: {
    select: {
      email: 'customerEmail',
      amount: 'amountTotal',
      date: 'createdAt',
    },
    prepare(selection: { email?: string; amount?: number; date?: string }) {
      const { email, amount, date } = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString('de-DE') : 'Dátum nélkül';
      return {
        title: `${email || 'Ismeretlen vásárló'} - €${amount?.toFixed(2) || '0.00'}`,
        subtitle: formattedDate,
      };
    },
  },
};