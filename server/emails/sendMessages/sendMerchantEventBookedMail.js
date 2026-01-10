import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';

export async function sendMerchantEventBookedMail(bookingId, customerName, recipient, eventDate, eventLocation){
    const html = fs.readFileSync(path.join(__dirname, '../templates/MerchantEventBookedTemplate.html'), 'utf8');
    const emailHtml = html
      .replace('{{customerName}}', customerName)
      .replace('{{bookingId}}', bookingId)
      .replace('{{eventDate}}', eventDate)
      .replace('{{eventLocation}}', eventLocation)
    await sendEmail(recipient, "New Event Booking", emailHtml)
}