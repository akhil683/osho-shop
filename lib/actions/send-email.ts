"use server";

import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECEIVER = process.env.SITE_MAIL_RECEIVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendOrder({
  customerName,
  customerEmail,
  customerPhone,
  quantity,
  specialRequests,
  productName,
}: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  quantity: number;
  specialRequests: string;
  productName: string;
}) {
  const mailOptions = {
    from: {
      name: "Sadhana Music House",
      address: SMTP_SERVER_USERNAME as string,
    },
    to: SITE_MAIL_RECEIVER,
    replyTo: customerEmail,
    subject: `Product Inquiry: ${productName}`,
    text: `
      Customer Name: ${customerName}
      Customer Email: ${customerEmail}
      Phone: ${customerPhone}
      Product: ${productName}
      Message: ${specialRequests}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center; margin-bottom: 30px;">New Product Order</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color: #007bff; color: white;">
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Field</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Customer Name</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${customerName}</td>
            </tr>
            <tr style="background-color: white;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Product Name</td>
              <td style="padding: 12px; border: 1px solid #ddd; color: #28a745; font-weight: bold;">${productName}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Quantity</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${quantity}</td>
            </tr>
            <tr style="background-color: white;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email Address</td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                <a href="mailto:${customerEmail}" style="color: #007bff; text-decoration: none;">${customerEmail}</a>
              </td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Phone Number</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${customerPhone || "Not provided"}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 12px; border: 1px solid #ddd; line-height: 1.6;">
                ${specialRequests.replace(/\n/g, "<br>")}
              </td>
            </tr>
            <tr style="background-color: white;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Date Submitted</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${new Date().toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 5px; text-align: center;">
          <p style="margin: 0; color: #6c757d; font-size: 14px;">
            This order was made through the Sadhana Music House website contact form.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const isVerified = await transporter.verify();
    if (!isVerified) {
      throw new Error("SMTP connection failed");
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);

    return {
      success: true,
      message: "Thank you for your inquiry! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: "Failed to send inquiry. Please try again later.",
      message: "Something went wrong!",
    };
  }
}
