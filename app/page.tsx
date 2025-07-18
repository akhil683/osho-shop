import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstagramSection } from "@/components/instagram-section";
import { BusinessHours } from "@/components/business-hours";
import { PaymentSection } from "@/components/payment-section";
import { ParallaxHero } from "@/components/parallax-hero";
import HomeProducts from "@/components/home-products";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ParallaxHero />

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect instrument for your musical journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Guitar",
                icon: "🎸",
                count: "150+ items",
                color: "from-red-400 to-red-600",
              },
              {
                name: "Keyboard",
                icon: "🎹",
                count: "80+ items",
                color: "from-blue-400 to-blue-600",
              },
              {
                name: "Drum",
                icon: "🥁",
                count: "60+ items",
                color: "from-green-400 to-green-600",
              },
              {
                name: "Audio Equipment",
                icon: "🎤",
                count: "120+ items",
                color: "from-purple-400 to-purple-600",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                className="group block"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className={`bg-gradient-to-br ${category.color} p-8 text-white text-center`}
                    >
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/80">{category.count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="md:text-4xl text-3xl font-bold text-gray-900 mb-4">
              Featured Instruments
            </h2>
            <p className="md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium musical instruments
              from top brands
            </p>
          </div>

          <HomeProducts />

          {/* See More Button */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
            >
              <Link href="/products">
                See All Products
                <span className="ml-2">→</span>
              </Link>
            </Button>
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
              <h4 className="text-xl font-bold mb-4">Sadhana Music House</h4>
              <p className="text-gray-400 mb-4">
                Your premier destination for musical instruments and audio
                equipment.
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
                <li>📍 Sundarnagar, Mandi</li>
                <li>📞 (555) 123-MUSIC</li>
                <li>📧 hi@sadhanamusichouse.com</li>
                <li>🕒 Mon-Sat: 10AM-8PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Sadhana Music House. All rights reserved. | Making
              music accessible to everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
