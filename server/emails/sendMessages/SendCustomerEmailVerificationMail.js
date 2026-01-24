import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { sendEmail } from '../../services/EmailService.js';
import { TooManyRequestError } from '../../exceptions/TooManyRequestError.js';
import { canSendEmailMemory } from '../../utils/canSendEmail.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function sendCustomerEmailVerificationMail(customerName, token, recipient) {
    if (!canSendEmailMemory(recipient, 3, null, "email-verification")) {
        throw new TooManyRequestError("Too many requests. Try again later.")
    }
    try {
        const html = fs.readFileSync(path.join(__dirname, '../templates/EmailVerificationTemplate.html'), 'utf8');
        const emailHtml = html
            .replace('{{customerName}}', customerName)
            .replace('{{token}}', token);

        await sendEmail(recipient, "Email Verification for Dami Cooks", emailHtml);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
}