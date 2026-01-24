import fs from "fs"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';
import path from 'path'

export async function sendCustomerPickupEmail(order){
     try {
            const html = fs.readFileSync(path.join(__dirname, '../templates/CustomerPickUpOrderEmail.html'), 'utf8');
            const emailHtml = html
                .replace('{{CustomerName}}', order["user.firstName"] + " " + order["user.lastName"])
                .replace('{{OrderNumber}}', order.orderCd)
                .replace('{{StoreName}}', "Dami Cooks")
    
            await sendEmail(order["user.email"], "Order Ready for Pickup", emailHtml);
        } catch (error) {
            console.error('Error sending verification email:', error);
            throw error;
        }
}