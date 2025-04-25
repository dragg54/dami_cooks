import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';

export function sendCustomerPaymentRefundedMail(customerName, paymentId, amount, cardInfo, recipient){
       const html = fs.readFileSync(path.join(__dirname, '../templates/CustomerPaymentRefunded.html'), 'utf8');
        const emailHtml = html
          .replace('{{customerName}}', customerName)
          .replace('{{paymentId}}', paymentId)
          .replace('{{cardInfo}}', cardInfo)
          .replace('{{amount}}', amount)
        sendEmail(recipient, "Payment Refunded", emailHtml)
}