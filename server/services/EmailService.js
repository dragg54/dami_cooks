import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { InternalServerError } from '../exceptions/InternalServerError.js';

dotenv.config()

export async function sendEmail(recipient, subject, message, attachment) {
  console.log(process.env.MERCHANT_GMAIL)
  console.log(process.env.GMAIL_PASSWORD)
  const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MERCHANT_GMAIL,
      pass: process.env.GMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
    debug: true,
    logger: true
  });

  const mailOptions = {
    from: '"Dami Cooks" <damicooks25@gmail.com>',
    to: recipient,
    subject,
    text: "This is a test message",
    // html: "<p>Hello World</p>",
    // attachment: [attachment]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new InternalServerError(err.message);
  }
}

