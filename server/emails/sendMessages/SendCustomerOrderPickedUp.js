import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { sendEmail } from '../../services/EmailService.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function sendCustomerOrderPickedUp(customerName, orderId, recipient, jobId) {
    try {
        const html = fs.readFileSync(path.join(__dirname, '../templates/CustomerOrderPickedUp.html'), 'utf8');
        const emailHtml = html
            .replace('{{customerName}}', customerName)
            .replace('{{orderId}}', orderId)
            .replace('{{jobId}}', jobId)
        await sendEmail(recipient, "Order On The Way", emailHtml)
    }
    catch (exception) {
        throw exception
    }
}