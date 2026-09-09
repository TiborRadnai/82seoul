// app/api/generate-invoice/route.ts
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

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

      // --- LOGÓ AUTOMATIKUS BETÖLTÉSE A PUBLIC MAPPÁBÓL ---
      let logoBuffer: Buffer | undefined = undefined;
      const possibleLogoPaths = [
        path.join(process.cwd(), 'public', 'images', 'logo.png'),
        path.join(process.cwd(), 'public', 'logo.png'),
      ];

      for (const p of possibleLogoPaths) {
        if (fs.existsSync(p)) {
          logoBuffer = fs.readFileSync(p);
          break;
        }
      }

      // --- FEJLÉC & LOGÓ ---
      if (logoBuffer) {
        // Ha van logó, balra tesszük, mellette a márkanév
        doc.image(logoBuffer, 50, 38, { width: 45, height: 45 });
        doc
          .fontSize(20)
          .fillColor(primaryColor)
          .font('Helvetica-Bold')
          .text('82SEOUL', 105, 48, { continued: true })
          .fontSize(8.5)
          .fillColor(accentColor)
          .text('   KOREAN LIFESTYLE PORTAL & SHOP', { align: 'right' });
      } else {
        // Fallback, ha a logó fájl még nincs a helyén
        doc
          .fontSize(22)
          .fillColor(primaryColor)
          .font('Helvetica-Bold')
          .text('82SEOUL', 50, 45, { continued: true })
          .fontSize(9)
          .fillColor(accentColor)
          .text('   KOREAN LIFESTYLE PORTAL & SHOP', { align: 'right' });
      }

      doc
        .moveTo(50, 92)
        .lineTo(545, 92)
        .strokeColor('#e7e5e4')
        .lineWidth(1)
        .stroke();

      // --- ELADÓ / CÉG INFORMÁCIÓ ---
      doc
        .fontSize(7.5)
        .fillColor('#78716c')
        .font('Helvetica-Bold')
        .text('Madevix • 82Seoul', 50, 102)
        .font('Helvetica')
        .text('Inhaber: Tibor Radnai • Deutschland', 50, 112);

      // --- VEVŐ CÍME ÉS METAADATOK ---
      const startY = 138;

      doc
        .fontSize(10)
        .fillColor(textColor)
        .font('Helvetica-Bold')
        .text(data.customerName, 50, startY)
        .font('Helvetica')
        .text(data.shippingAddress.street, 50, startY + 14)
        .text(`${data.shippingAddress.postalCode} ${data.shippingAddress.city}`, 50, startY + 28)
        .text(data.shippingAddress.country, 50, startY + 42);

      const metaX = 300;
      let metaY = startY;

      const addMetaField = (label: string, value: string) => {
        doc.fontSize(8).fillColor('#78716c').font('Helvetica').text(label, metaX, metaY, { width: 110 });
        doc.fontSize(8).fillColor(primaryColor).font('Helvetica-Bold').text(value, metaX + 110, metaY, { width: 135, align: 'right' });
        metaY += 14;
      };

      addMetaField('Rechnungsnummer:', data.invoiceNumber);
      addMetaField('Rechnungsdatum:', data.orderDate);
      addMetaField('Liefer-/Leistungsdatum:', data.orderDate);
      addMetaField('E-Mail:', data.customerEmail);

      // --- RECHNUNG CÍM ---
      doc
        .fontSize(18)
        .fillColor(primaryColor)
        .font('Helvetica-Bold')
        .text('Rechnung', 50, 215);

      // --- TÉTELEK TÁBLÁZAT ---
      const tableTop = 250;
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

        rowY += 24;

        doc
          .moveTo(50, rowY - 6)
          .lineTo(545, rowY - 6)
          .strokeColor('#f5f5f4')
          .lineWidth(0.5)
          .stroke();
      });

      // --- VÉGÖSSZEG SÁV ---
      rowY += 10;
      doc
        .rect(340, rowY, 205, 32)
        .fill(primaryColor);

      doc
        .fontSize(9)
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .text('Gesamtbetrag:', 355, rowY + 11)
        .text(`€${data.totalAmount.toFixed(2)}`, 465, rowY + 11, { width: 70, align: 'right' });

      // --- JOGI HIVATKOZÁS (§ 19 UStG) ---
      const legalTextY = rowY + 65;
      doc
        .fontSize(8.5)
        .fillColor(textColor)
        .font('Helvetica')
        .text('Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).', 50, legalTextY, { width: 495 });

      // --- FIX LÁBJEGYZET ALUL ---
      const footerY = 750;
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
        .text('82Seoul • Madevix • Steuernummer: 123/260/10535 • info@82seoul.de', 50, footerY + 8, { align: 'center', width: 495 });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}