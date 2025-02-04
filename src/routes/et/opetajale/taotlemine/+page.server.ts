import nodemailer from "nodemailer";
import { env } from "$env/dynamic/private";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  ignoreTLS: true
});

const emailRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)?\.[a-zA-Z]+@tptlab\.eu$/;

const fullNameRegex = /^[A-Za-z-]+(\s[A-Za-z-]+){1,2}$/;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const fullName = data.get('fullName');
    const accessReason = data.get('accessReason');

    if (!emailRegex.test(email)) {
        console.log("Invalid email address")
      return { success: false, message: "Invalid email address" };
    }

    if (!fullNameRegex.test(fullName)) {
        console.log("Invalid name")
      return { success: false, message: "This isn't a full name." };
    }

    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: env.SMTP_TO,
      subject: `Access request ${fullName}`,
      text: `Access is requested by ${fullName} with email address ${email}. \nAccess reason: ${accessReason}`
    });

    return { success: true };
  }
};
