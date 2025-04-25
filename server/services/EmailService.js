import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { InternalServerError } from '../exceptions/InternalServerError.js';

dotenv.config()

export async function sendEmail(recipient, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MERCHANT_GMAIL,
      pass: process.env.GMAIL_PASSWORD
    },
  });

  const mailOptions = {
    from: '"Dami Cooks" <damicooks25@gmail.com>',
    to: recipient,
    subject,
    // text: "This is a test message",
    html: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (err) {
    throw new InternalServerError(err.message);
  }
}

