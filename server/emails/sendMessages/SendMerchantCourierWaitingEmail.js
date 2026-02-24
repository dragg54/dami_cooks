import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';

export async function sendMerchantCourierWaitingEmail(orderCd, recipient){
    const html = fs.readFileSync(path.join(__dirname, '../templates/MerchantCourierWaiting.html'), 'utf8');
    const emailHtml = html
      .replace('{{orderCd}}', orderCd)
    await sendEmail(recipient, "Courier Waiting", emailHtml)
}

