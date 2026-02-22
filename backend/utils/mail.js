import dotenv from "dotenv";
import nodemailer from "nodemailer";
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

export const sendOtpMail=async (to,otp) => {
  await transporter.sendMail({
    from:process.env.EMAIL,
    to,
    subject:"Reset Your Password",
    html:`<h1>Your OTP for password reset is ${otp}. It expires in 5 minutes.</h1>`
  })
}

export const sendDeliveryOtpMail=async (user,otp) => {
  await transporter.sendMail({
    from:process.env.EMAIL,
    to:user.email,
    subject:"Delivery OTP",
    html:`<h1>Your OTP for delivery is ${otp}. It expires in 5 minutes.</h1>`
  })
}
