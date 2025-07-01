"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  ShoppingCart,
  Menu,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Heart,
  Instagram,
  ChevronDown,
  Music,
} from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(3) // Mock cart count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Brands", href: "/brands" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const categories = [
    { name: "Guitars", href: "/category/guitars" },
    { name: "Keyboards & Pianos", href: "/category/keyboards" },
    { name: "Drums & Percussion", href: "/category/drums" },
    { name: "Audio Equipment", href: "/category/audio" },
    { name: "Accessories", href: "/category/accessories" },
    { name: "Sheet Music", href: "/category/sheet-music" },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-purple-600 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <span>(555) 123-MUSIC</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span>info@harmonyhub.com</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="h-3 w-3" />
              <span>123 Music Street, Harmony City</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">Mon-Sat: 10AM-8PM</span>
              <span className="sm:hidden">Open Now</span>
            </div>
            <Link href="https://instagram.com/harmonyhub" target="_blank" className="hover:text-purple-200">
              <Instagram className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 bg-white border-b transition-all duration-300 ${
          isScrolled ? "shadow-lg border-gray-200" : "border-gray-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Music className="text-white h-6 w-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Harmony Hub
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Musical Instruments</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                </Link>
              ))}

              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-600 font-medium">
                    Categories
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link href={category.href} className="cursor-pointer">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search instruments..."
                  className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-full"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Icon for Mobile */}
              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Search className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="hidden sm:flex p-2 relative">
                <Heart className="h-5 w-5 text-gray-600 hover:text-purple-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Button>

              {/* Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex p-2">
                    <User className="h-5 w-5 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                  <DropdownMenuItem>Order History</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Button variant="ghost" size="sm" className="p-2 relative">
                <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-purple-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden p-2">
                    <Menu className="h-5 w-5 text-gray-600" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                    <SheetDescription className="text-left">Navigate through our music store</SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-6">
                    {/* Mobile Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="search"
                        placeholder="Search instruments..."
                        className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="space-y-4">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Categories */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block text-gray-600 hover:text-purple-600 transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="pt-6 border-t space-y-4">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist (2)
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
