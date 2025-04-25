import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';

export function sendMerchantOrderCancelledMail(orderId, customerName, recipient){
    const html = fs.readFileSync(path.join(__dirname, '../templates/MerchantOrderCancelledTemplate.html'), 'utf8');
    const emailHtml = html
      .replace('{{customerName}}', customerName)
      .replace('{{orderId}}', orderId)
    sendEmail(recipient, "Order Cancelled", emailHtml)
}

