import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OrderForm } from "@/components/order-form"
import { ShareButton } from "@/components/share-button"

const products = [
  {
    id: 1,
    name: "Organic Apples",
    description:
      "Fresh organic apples from local farms. These crisp and juicy apples are perfect for snacking, baking, or adding to your favorite recipes. Grown without pesticides and harvested at peak ripeness.",
    price: 4.99,
    category: "Fruits",
    image: "/placeholder.svg?height=400&width=400",
    inStock: true,
    unit: "per lb",
  },
  {
    id: 2,
    name: "Artisan Bread",
    description:
      "Freshly baked sourdough bread made with traditional methods. Our master baker uses only the finest ingredients to create this crusty exterior and soft, flavorful interior.",
    price: 6.5,
    category: "Bakery",
    image: "/placeholder.svg?height=400&width=400",
    inStock: true,
    unit: "per loaf",
  },
  {
    id: 3,
    name: "Local Honey",
    description:
      "Pure, unfiltered honey from local beekeepers. This golden honey has a rich, complex flavor that reflects the diverse wildflowers of our region. Perfect for tea, toast, or cooking.",
    price: 12.99,
    category: "Pantry",
    image: "/placeholder.svg?height=400&width=400",
    inStock: true,
    unit: "per jar (12oz)",
  },
  {
    id: 4,
    name: "Farm Eggs",
    description:
      "Free-range eggs from happy chickens that roam freely on local farms. These eggs have bright orange yolks and rich flavor that comes from a natural diet and healthy lifestyle.",
    price: 5.99,
    category: "Dairy",
    image: "/placeholder.svg?height=400&width=400",
    inStock: false,
    unit: "per dozen",
  },
  {
    id: 5,
    name: "Handmade Soap",
    description:
      "Natural soap crafted with essential oils and organic ingredients. Gentle on your skin and free from harsh chemicals. Available in lavender, eucalyptus, and unscented varieties.",
    price: 8.99,
    category: "Personal Care",
    image: "/placeholder.svg?height=400&width=400",
    inStock: true,
    unit: "per bar",
  },
  {
    id: 6,
    name: "Ceramic Mug",
    description:
      "Handcrafted ceramic coffee mug made by local artisans. Each mug is unique with its own character and charm. Perfect for your morning coffee or evening tea.",
    price: 15.99,
    category: "Home",
    image: "/placeholder.svg?height=400&width=400",
    inStock: true,
    unit: "each",
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-red-600 hover:text-red-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Shop</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-red-600">Village Market</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
              {!product.inStock && (
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <p className="text-3xl font-bold text-red-600 mb-4">
                ${product.price} <span className="text-sm font-normal text-muted-foreground">{product.unit}</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Share Section */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Share2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800">Love this instrument?</h4>
                  <p className="text-sm text-purple-600">Share it with your friends!</p>
                </div>
              </div>
              <ShareButton
                product={product}
                size="lg"
                variant="default"
                className="bg-purple-600 hover:bg-purple-700"
              />
            </div>

            {/* Order Form */}
            {product.inStock ? (
              <Card>
                <CardHeader>
                  <CardTitle>Place Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderForm product={product} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Currently Out of Stock</h3>
                    <p className="text-muted-foreground mb-4">
                      This item is temporarily unavailable. Please check back later or contact us for more information.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/">Browse Other Products</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
