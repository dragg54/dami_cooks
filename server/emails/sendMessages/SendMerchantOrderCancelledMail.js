import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';

export async function sendMerchantOrderCancelledMail(orderId, customerName, recipient, cancellationTime){
    const html = fs.readFileSync(path.join(__dirname, '../templates/MerchantOrderCancelledTemplate.html'), 'utf8');
    const emailHtml = html
      .replace('{{customerName}}', customerName)
      .replace('{{orderId}}', orderId)
      .replace('{{cancellationTime}}', cancellationTime)
    await sendEmail(recipient, "Order Cancelled", emailHtml)
}

