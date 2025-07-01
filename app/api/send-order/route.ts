import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product, quantity, totalPrice, customer, specialRequests } = body

    // Create transporter (you'll need to configure this with your email settings)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email to shopkeeper
    const shopkeeperEmail = {
      from: process.env.SMTP_USER,
      to: process.env.SHOPKEEPER_EMAIL || "shopkeeper@villagemarket.com",
      subject: `New Order: ${product.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Order Received - Village Market</h2>
          
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Order Details</h3>
            <p><strong>Product:</strong> ${product.name}</p>
            <p><strong>Quantity:</strong> ${quantity} ${product.unit}</p>
            <p><strong>Unit Price:</strong> $${product.price}</p>
            <p><strong>Total Amount:</strong> $${totalPrice}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${customer.name}</p>
            <p><strong>Email:</strong> ${customer.email}</p>
            <p><strong>Phone:</strong> ${customer.phone}</p>
          </div>

          ${
            specialRequests
              ? `
            <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">Special Requests</h3>
              <p>${specialRequests}</p>
            </div>
          `
              : ""
          }

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Please contact the customer to confirm the order and arrange pickup or delivery.
            </p>
          </div>
        </div>
      `,
    }

    // Email confirmation to customer
    const customerEmail = {
      from: process.env.SMTP_USER,
      to: customer.email,
      subject: "Order Confirmation - Village Market",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Thank You for Your Order!</h2>
          
          <p>Dear ${customer.name},</p>
          
          <p>We've received your order and will contact you soon to confirm the details and arrange pickup or delivery.</p>

          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Your Order</h3>
            <p><strong>Product:</strong> ${product.name}</p>
            <p><strong>Quantity:</strong> ${quantity} ${product.unit}</p>
            <p><strong>Total Amount:</strong> $${totalPrice}</p>
            ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ""}
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p><strong>Village Market</strong></p>
            <p>📞 (555) 123-4567</p>
            <p>📧 orders@villagemarket.com</p>
            <p>📍 123 Main Street, Village Town</p>
          </div>
        </div>
      `,
    }

    // Send emails
    await transporter.sendMail(shopkeeperEmail)
    await transporter.sendMail(customerEmail)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send order" }, { status: 500 })
  }
}
