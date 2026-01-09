import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { InternalServerError } from '../exceptions/InternalServerError.js';

dotenv.config()

export async function sendEmail(recipient, subject, message, attachment) {
  console.log(process.env.MERCHANT_GMAIL)
  console.log(process.env.GMAIL_PASSWORD)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MERCHANT_GMAIL,
      pass: process.env.GMAIL_PASSWORD
    },
    tls: {
    rejectUnauthorized: false // may help with some connection issues
  }
  });

  const mailOptions = {
    from: '"Dami Cooks" <damicooks25@gmail.com>',
    to: recipient,
    subject,
    text: "This is a test message",
    html: <p>Hello World</p>,
    // attachment: [attachment]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new InternalServerError(err.message);
  }
}

