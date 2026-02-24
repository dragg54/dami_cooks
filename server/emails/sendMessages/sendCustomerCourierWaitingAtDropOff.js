import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';

export async function sendCustomerCourierWaitingAtDropOff(orderCd, recipient, customerName){
    const html = fs.readFileSync(path.join(__dirname, '../templates/CustomerCourierWaiting.html'), 'utf8');
    const emailHtml = html
      .replace('{{orderCd}}', orderCd)
      .replace('{{customerName}}', customerName)
    await sendEmail(recipient, "Courier Waiting", emailHtml)
}

