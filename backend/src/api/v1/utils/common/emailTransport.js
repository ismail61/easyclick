import * as nodemailer from 'nodemailer';
import { config } from '../../../../config';
export default async (email, subject, html) => {
   const mailOptions = {
      from: config.email.address,
      to: email,
      subject: subject,
      html: html
   }
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
         user: config.email.username,
         pass: config.email.password
      }
   });
   try {
      const res = await transporter.sendMail(mailOptions);
      if (!res) return { err: "Email send Failed !" }
      else return { info: res }
   } catch (error) {
      console.log(error)
   }
};
