import nodemailer from "nodemailer";
import { env } from "../../../config/env.service.js"

export const sendEmail = async ( email,subject,text, html)  => {
  const transporter = nodemailer.createTransport({
    host: env.smtp_host,
    port: env.smtp_port,
    secure: true,
    auth: {
      user: env.smtp_user,
      pass: env.smtp_pass,
    },
    connectionTimeout: 5000, 
  });

  const mailOptions = {
    from: "Nti-os-e-commerce",
    to: email,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.error("Email error:", err.message);

    return null;
  }
};