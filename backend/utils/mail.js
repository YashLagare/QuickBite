import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Resend } from "resend";
dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpMail=async (to,otp) => {
  if (process.env.NODE_ENV === "production") {
    // Use Resend for production
    try {
      const result = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: to,
        subject: "Reset Your Password",
        html: `<h1>Your OTP for password reset is ${otp}. It expires in 5 minutes.</h1>`,
      });
      console.log("Email sent successfully:", result);
    } catch (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email via Resend");
    }
  } else {
    // Use Gmail SMTP for development
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Reset Your Password",
      html: `<h1>Your OTP for password reset is ${otp}. It expires in 5 minutes.</h1>`
    });
  }
}

export const sendDeliveryOtpMail=async (user,otp) => {
  if (process.env.NODE_ENV === "production") {
    // Use Resend for production
    try {
      const result = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Delivery OTP",
        html: `<h1>Your OTP for delivery is ${otp}. It expires in 5 minutes.</h1>`,
      });
      console.log("Email sent successfully:", result);
    } catch (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email via Resend");
    }
  } else {
    // Use Gmail SMTP for development
    await transporter.sendMail({
      from:process.env.EMAIL,
      to:user.email,
      subject:"Delivery OTP",
      html:`<h1>Your OTP for delivery is ${otp}. It expires in 5 minutes.</h1>`
    })
  }
}
