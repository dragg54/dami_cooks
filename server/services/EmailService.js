import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { InternalServerError } from '../exceptions/InternalServerError.js';
import { Resend } from 'resend';


dotenv.config()

export async function sendEmail(recipient, subject, message, attachment) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try{
     const { data, error } = await resend.emails.send({
      from: 'DamiCooks <onboarding@resend.dev>', // Use this for testing
      to: "damicooks25@gmail.com",
      subject: subject,
      html: message,
    });
  }
  catch(err){
    console.log(err)
  }
}

