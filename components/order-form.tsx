"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  unit: string
}

interface OrderFormProps {
  product: Product
}

export function OrderForm({ product }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  const totalPrice = (product.price * quantity).toFixed(2)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            name: product.name,
            price: product.price,
            unit: product.unit,
          },
          quantity,
          totalPrice,
          customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
          },
          specialRequests,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error("Failed to send order")
      }
    } catch (error) {
      console.error("Error sending order:", error)
      alert("Failed to send order. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-lg font-semibold text-green-800">Order Sent Successfully!</h3>
            <p className="text-green-700">
              Thank you for your order! We've received your request and will contact you soon to confirm the details and
              arrange pickup or delivery.
            </p>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2">Order Summary:</h4>
              <p>
                {quantity} × {product.name} = ${totalPrice}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Quantity */}
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-20 text-center"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
            +
          </Button>
          <span className="text-sm text-muted-foreground ml-2">{product.unit}</span>
        </div>
      </div>

      {/* Total Price */}
      <div className="bg-red-50 p-3 rounded-lg">
        <p className="text-lg font-semibold text-red-700">Total: ${totalPrice}</p>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h4 className="font-semibold">Your Information</h4>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requests">Special Requests (Optional)</Label>
          <Textarea
            id="requests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Any special requests or notes for your order..."
            rows={3}
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Order...
          </>
        ) : (
          "Send Order to Shop"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By placing this order, you agree to be contacted by the shop owner to confirm details and arrange pickup or
        delivery.
      </p>
    </form>
  )
}
