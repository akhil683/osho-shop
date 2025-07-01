import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InstagramSection } from "@/components/instagram-section"
import { BusinessHours } from "@/components/business-hours"
import { PaymentSection } from "@/components/payment-section"
import { ParallaxHero } from "@/components/parallax-hero"
import { Navbar } from "@/components/navbar"
import { ShareButton } from "@/components/share-button"

const featuredProducts = [
  {
    id: 1,
    name: "Yamaha FG830 Acoustic Guitar",
    description: "Solid spruce top with rosewood back and sides",
    price: 299.99,
    originalPrice: 349.99,
    category: "Guitars",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Roland TD-17KVX Electronic Drum Kit",
    description: "Professional V-Drums with mesh heads",
    price: 1299.99,
    category: "Drums",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Korg Minilogue XD Synthesizer",
    description: "Analog synthesizer with digital effects",
    price: 649.99,
    category: "Keyboards",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
  },
  {
    id: 4,
    name: "Shure SM58 Dynamic Microphone",
    description: "Industry standard vocal microphone",
    price: 99.99,
    category: "Audio",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Fender Player Stratocaster",
    description: "Classic electric guitar with modern features",
    price: 849.99,
    category: "Guitars",
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
    isNew: false,
    isSale: false,
  },
  {
    id: 6,
    name: "Pearl Export Series Drum Kit",
    description: "5-piece acoustic drum set with cymbals",
    price: 699.99,
    originalPrice: 799.99,
    category: "Drums",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: true,
  },
  {
    id: 7,
    name: "Nord Stage 3 88-Key",
    description: "Professional stage piano and synthesizer",
    price: 3999.99,
    category: "Keyboards",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Audio-Technica AT2020 Condenser Mic",
    description: "Studio condenser microphone",
    price: 149.99,
    category: "Audio",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
  },
  {
    id: 9,
    name: "Gibson Les Paul Standard",
    description: "Iconic electric guitar with humbucker pickups",
    price: 2499.99,
    category: "Guitars",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
  },
  {
    id: 10,
    name: "Focusrite Scarlett 2i2 Audio Interface",
    description: "USB audio interface for home recording",
    price: 179.99,
    category: "Audio",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <ParallaxHero />

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Instruments</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium musical instruments from top brands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold">NEW</Badge>
                      )}
                      {product.isSale && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white font-semibold">SALE</Badge>
                      )}
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                      {product.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-purple-600">${product.price}</p>
                    {product.originalPrice && (
                      <p className="text-lg text-gray-400 line-through">${product.originalPrice}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button
                      asChild
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={!product.inStock}
                    >
                      <Link href={`/product/${product.id}`}>{product.inStock ? "View Details" : "Out of Stock"}</Link>
                    </Button>
                    <ShareButton
                      product={product}
                      size="default"
                      variant="outline"
                      className="border-purple-200 hover:bg-purple-50"
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
              <Link href="/products">
                See All Products
                <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find the perfect instrument for your musical journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Guitars", icon: "🎸", count: "150+ items", color: "from-red-400 to-red-600" },
              { name: "Keyboards", icon: "🎹", count: "80+ items", color: "from-blue-400 to-blue-600" },
              { name: "Drums", icon: "🥁", count: "60+ items", color: "from-green-400 to-green-600" },
              { name: "Audio Equipment", icon: "🎤", count: "120+ items", color: "from-purple-400 to-purple-600" },
            ].map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="group block">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${category.color} p-8 text-white text-center`}>
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/80">{category.count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <InstagramSection />

      {/* Business Hours & Payment Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BusinessHours />
            <PaymentSection />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Harmony Hub</h4>
              <p className="text-gray-400 mb-4">
                Your premier destination for musical instruments and audio equipment.
              </p>
              <div className="flex space-x-4">
                <span>🎵</span>
                <span>🎸</span>
                <span>🎹</span>
                <span>🥁</span>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/products" className="hover:text-white">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="hover:text-white">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/category/guitars" className="hover:text-white">
                    Guitars
                  </Link>
                </li>
                <li>
                  <Link href="/category/keyboards" className="hover:text-white">
                    Keyboards
                  </Link>
                </li>
                <li>
                  <Link href="/category/drums" className="hover:text-white">
                    Drums
                  </Link>
                </li>
                <li>
                  <Link href="/category/audio" className="hover:text-white">
                    Audio Equipment
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact Info</h5>
              <ul className="space-y-2 text-gray-400">
                <li>📍 123 Music Street, Harmony City</li>
                <li>📞 (555) 123-MUSIC</li>
                <li>📧 info@harmonyhub.com</li>
                <li>🕒 Mon-Sat: 10AM-8PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Harmony Hub. All rights reserved. | Making music accessible to everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
