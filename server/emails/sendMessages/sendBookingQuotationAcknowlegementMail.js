import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { sendEmail } from '../../services/EmailService.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function sendBookingQuotationAcknowlegementMail(customerName, bookingLink, recipient, data) {
    try {
        const html = fs.readFileSync(path.join(__dirname, '../templates/BookingQuotationAknowlegementTemplate.html'), 'utf8');
        const emailHtml = html
            .replace('{{bookingLink}}', bookingLink)
            .replace('{{customerName}}', bookingLink);
        await sendEmail(recipient, "Booking Quotation", emailHtml );
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
}