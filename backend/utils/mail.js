import sgMail from "@sendgrid/mail";
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

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Diagnostic logging on initialization
console.log("=== EMAIL CONFIG ===");
console.log("SendGrid API Key Present:", !!process.env.SENDGRID_API_KEY);
console.log("SendGrid API Key (first 15 chars):", process.env.SENDGRID_API_KEY?.substring(0, 15) + "...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Email Service:", process.env.NODE_ENV === "production" ? "SENDGRID" : "GMAIL SMTP");
console.log("====================\n");

export const sendOtpMail=async (to,otp) => {
  console.log("📧 sendOtpMail called for:", to);
  
  if (process.env.NODE_ENV === "production") {
    console.log("🚀 Using SENDGRID (Production Mode)");
    // Use SendGrid for production
    try {
      console.log("Sending via SendGrid API...");
      const msg = {
        to: to,
        from: process.env.EMAIL, // Your verified sender
        subject: "Reset Your Password",
        html: `<h1>Your OTP for password reset is ${otp}. It expires in 5 minutes.</h1>`,
      };
      
      const result = await sgMail.send(msg);
      console.log("✅ Email sent successfully via SendGrid");
      console.log("📨 Response Data:", JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("❌ SendGrid Error:", error.message);
      console.error("Full Error:", JSON.stringify(error, null, 2));
      throw new Error("Failed to send email via SendGrid: " + error.message);
    }
  } else {
    console.log("📧 Using GMAIL SMTP (Development Mode)");
    // Use Gmail SMTP for development
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Reset Your Password",
      html: `<h1>Your OTP for password reset is ${otp}. It expires in 5 minutes.</h1>`
    });
    console.log("✅ Email sent successfully via Gmail SMTP");
  }
}

export const sendDeliveryOtpMail=async (user,otp) => {
  console.log("📧 sendDeliveryOtpMail called for:", user.email);
  
  if (process.env.NODE_ENV === "production") {
    console.log("🚀 Using SENDGRID (Production Mode)");
    // Use SendGrid for production
    try {
      console.log("Sending via SendGrid API...");
      const msg = {
        to: user.email,
        from: process.env.EMAIL, // Your verified sender
        subject: "Delivery OTP",
        html: `<h1>Your OTP for delivery is ${otp}. It expires in 5 minutes.</h1>`,
      };
      
      const result = await sgMail.send(msg);
      console.log("✅ Email sent successfully via SendGrid");
      console.log("📨 Response Data:", JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("❌ SendGrid Error:", error.message);
      console.error("Full Error:", JSON.stringify(error, null, 2));
      throw new Error("Failed to send email via SendGrid: " + error.message);
    }
  } else {
    console.log("📧 Using GMAIL SMTP (Development Mode)");
    // Use Gmail SMTP for development
    await transporter.sendMail({
      from:process.env.EMAIL,
      to:user.email,
      subject:"Delivery OTP",
      html:`<h1>Your OTP for delivery is ${otp}. It expires in 5 minutes.</h1>`
    });
    console.log("✅ Email sent successfully via Gmail SMTP");
  }
}
