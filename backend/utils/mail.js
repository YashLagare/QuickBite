import dotenv from "dotenv";
import { Resend } from 'resend';
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpMail=async (to,otp) => {
    try {
        await resend.emails.send({
            from: process.env.EMAIL,
            to: to,
            subject: "Reset Your Password",
            html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
        });
    } catch (error) {
        console.error("Resend OTP Mail Error:", error);
    }
}


export const sendDeliveryOtpMail=async (user,otp) => {
    try {
        await resend.emails.send({
            from: process.env.EMAIL,
            to: user.email,
            subject: "Delivery OTP",
            html: `<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
        });
    } catch (error) {
        console.error("Resend Delivery OTP Mail Error:", error);
    }
}
