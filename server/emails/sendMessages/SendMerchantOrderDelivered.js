import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';

export async function sendMerchantOrderDelivered(orderId, customerName, recipient, jobId){
    const html = fs.readFileSync(path.join(__dirname, '../templates/MerchantOrderDelivered.html'), 'utf8');
    const emailHtml = html
      .replace('{{customerName}}', customerName)
      .replace('{{orderId}}', orderId)
      .replace('{{jobId}}', jobId)
    await sendEmail(recipient, "Order Delivered", emailHtml)
}

