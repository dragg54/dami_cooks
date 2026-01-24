import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendEmail } from '../../services/EmailService.js';
import { canSendEmailMemory } from '../../utils/canSendEmail.js';
import { TooManyRequestError } from '../../exceptions/TooManyRequestError.js';

export async function sendResetPasswordLink(recipient, resetPasswordLink){
     if(!canSendEmailMemory(recipient, 3, null, "reset-password")){
        throw new TooManyRequestError("Too many requests. Try again later.")
      }
    const html = fs.readFileSync(path.join(__dirname, '../templates/UserResetPassword.html'), 'utf8');
    const emailHtml = html
      .replace('{{RESET_LINK}}', resetPasswordLink)
      .replace('{{RESET_LINK}}', resetPasswordLink)
    await sendEmail(recipient, "Password Reset", emailHtml)
}