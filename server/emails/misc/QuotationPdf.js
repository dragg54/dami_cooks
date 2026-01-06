import PDFDocument from "pdfkit"

export function generateQuotationPdf({
  customerName,
  bookingId,
  eventDate,
  eventLocation,
  guestCount,
  items,
  totalAmount
}) {
  const doc = new PDFDocument({ margin: 50 });
  const buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // Header
  doc
    .fontSize(20)
    .text('Event Booking Quotation', { align: 'center' })
    .moveDown();

  doc
    .fontSize(12)
    .text(`Customer Name: ${customerName}`)
    .text(`Booking Reference: ${bookingId}`)
    .text(`Event Date: ${eventDate}`)
    .text(`Event Location: ${eventLocation}`)
    .text(`Guest Count: ${guestCount}`)
    .moveDown();

  // Table Header
  doc.fontSize(14).text('Quotation Details', { underline: true });
  doc.moveDown(0.5);

  doc.fontSize(12);
  items.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.name} - ₦${item.amount.toLocaleString()}`
    );
  });

  doc.moveDown();
  doc
    .fontSize(14)
    .text(`Total Amount: ₦${totalAmount.toLocaleString()}`, {
      align: 'right',
      bold: true
    });

  doc.moveDown(2);
  doc
    .fontSize(10)
    .text(
      'This quotation is valid for 48 hours. Prices may change after expiration.',
      { align: 'center' }
    );

  doc.end();

  return Buffer.concat(buffers);
}
