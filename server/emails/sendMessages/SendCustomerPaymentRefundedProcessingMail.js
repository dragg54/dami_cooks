import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';
import path from 'path'
import fs from 'fs';

export function sendCustomerPaymentRefundProcessingMail(orderId, customerName, recipient){
 const html = fs.readFileSync(path.join(__dirname, '../templates/CustomerPaymentRefundProcessing.html'), 'utf8');
        const emailHtml = html
          .replace('{{customerName}}', customerName)
          .replace('{{orderId}}', orderId)
        sendEmail(recipient, "Processing Payment Refund", emailHtml)
}