import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { sendEmail } from '../../services/EmailService.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function sendCustomerOrderPlacedMail(customerName, orderId, recipient){
    const html = fs.readFileSync(path.join(__dirname, '../templates/OrderPlacedTemplate.html'), 'utf8');
    const emailHtml = html
      .replace('{{customerName}}', customerName)
      .replace('{{orderId}}', orderId)
    sendEmail(recipient, "Order Placed", emailHtml)
}