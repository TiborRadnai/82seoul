import PDFDocument from 'pdfkit';

interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

interface InvoiceData {
  invoiceNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  items: InvoiceItem[];
  totalAmount: number;
}

export function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      const primaryColor = '#09090b'; 
      const accentColor = '#be123c';  
      const textColor = '#292524';    
      const lightBg = '#f5f5f4';      

      // --- FEJLÉC ---
      doc
        .fontSize(22)
        .fillColor(primaryColor)
        .font('Helvetica-Bold')
        .text('82SEOUL', 50, 45, { continued: true })
        .fontSize(9)
        .fillColor(accentColor)
        .text('   KOREAN LIFESTYLE PORTAL & SHOP', { align: 'right' });

      doc
        .moveTo(50, 75)
        .lineTo(545, 75)
        .strokeColor('#e7e5e4')
        .lineWidth(1)
        .stroke();

      // --- CÉG / Küldő infó a címablak felett (rövid) ---
      doc
        .fontSize(7)
        .fillColor('#a8a29e')
        .font('Helvetica')
        .text('82Seoul • Madevix • Deutschland', 50, 85);

      // --- VEVŐ CÍME ÉS METAADATOK (EGY SZINTEN) ---
      const startY = 110;

      // Vevő címe bal oldalon
      doc
        .fontSize(10)
        .fillColor(textColor)
        .font('Helvetica-Bold')
        .text(data.customerName, 50, startY)
        .font('Helvetica')
        .text(data.shippingAddress.street, 50, startY + 14)
        .text(`${data.shippingAddress.postalCode} ${data.shippingAddress.city}`, 50, startY + 28)
        .text(data.shippingAddress.country, 50, startY + 42);

      // Számla metaadatok jobbra igazítva (szélesebb mezővel, hogy ne törjön az e-mail)
      const metaX = 320;
      let metaY = startY;

      const addMetaField = (label: string, value: string) => {
        doc.fontSize(8).fillColor('#78716c').font('Helvetica').text(label, metaX, metaY, { width: 90 });
        doc.fontSize(8).fillColor(primaryColor).font('Helvetica-Bold').text(value, metaX + 90, metaY, { width: 135, align: 'right' });
        metaY += 14;
      };

      addMetaField('Rechnungsnummer:', data.invoiceNumber);
      addMetaField('Datum:', data.orderDate);
      addMetaField('E-Mail:', data.customerEmail);

      // --- FŐ CÍM (RECHNUNG) ---
      doc
        .fontSize(18)
        .fillColor(primaryColor)
        .font('Helvetica-Bold')
        .text('Rechnung', 50, 195);

      // --- TÉTELEK TÁBLÁZAT ---
      const tableTop = 230;
      doc.rect(50, tableTop, 495, 20).fill(lightBg);

      doc
        .fontSize(8)
        .fillColor(primaryColor)
        .font('Helvetica-Bold')
        .text('Position / Artikel', 60, tableTop + 6)
        .text('Menge', 340, tableTop + 6, { width: 40, align: 'center' })
        .text('Einzelpreis', 390, tableTop + 6, { width: 70, align: 'right' })
        .text('Gesamt', 470, tableTop + 6, { width: 65, align: 'right' });

      let rowY = tableTop + 28;
      doc.font('Helvetica').fontSize(9).fillColor(textColor);

      data.items.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        
        doc
          .text(item.name, 60, rowY, { width: 270 })
          .text(item.quantity.toString(), 340, rowY, { width: 40, align: 'center' })
          .text(`€${item.price.toFixed(2)}`, 390, rowY, { width: 70, align: 'right' })
          .text(`€${itemTotal.toFixed(2)}`, 470, rowY, { width: 65, align: 'right' });

        rowY += 22;

        doc
          .moveTo(50, rowY - 6)
          .lineTo(545, rowY - 6)
          .strokeColor('#f5f5f4')
          .lineWidth(0.5)
          .stroke();
      });

      // --- VÉGÖSSZEG DOBOZ ---
      rowY += 10;
      const totalBoxY = rowY;
      doc
        .rect(340, totalBoxY, 205, 32)
        .fill(primaryColor);

      doc
        .fontSize(9)
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .text('Gesamtbetrag:', 355, totalBoxY + 11)
        .text(`€${data.totalAmount.toFixed(2)}`, 465, totalBoxY + 11, { width: 70, align: 'right' });

      // --- LÁBJEGYZET ---
      const footerY = 760;
      doc
        .moveTo(50, footerY)
        .lineTo(545, footerY)
        .strokeColor('#e7e5e4')
        .lineWidth(1)
        .stroke();

      doc
        .fontSize(7.5)
        .fillColor('#78716c')
        .font('Helvetica')
        .text('82Seoul / Madevix • Steuernummer: [Beispiel-Nr.] • Kleinunternehmerregelung gem. § 19 UStG', 50, footerY + 8, { align: 'center', width: 495 });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}