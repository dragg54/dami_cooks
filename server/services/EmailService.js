import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { InternalServerError } from '../exceptions/InternalServerError.js';
import { Resend } from 'resend';
import { canSendEmailMemory } from '../utils/canSendEmail.js';


dotenv.config()

export async function sendEmail(recipient, subject, message, attachment) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try{
     const { data, error } = await resend.emails.send({
      from: 'support@damicooks.com',
      to: recipient,
      subject: subject,
      html: message,
      attachments: attachment
    });
    console.log("Email Error", error)
  }
  catch(err){
    console.log(err)
  }
}

