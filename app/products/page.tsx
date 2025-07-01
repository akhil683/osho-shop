"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/navbar";
import { Search, Grid, List } from "lucide-react";
import { ShareButton } from "@/components/share-button";

const allProducts = [
  {
    id: 1,
    name: "Yamaha FG830 Acoustic Guitar",
    description: "Solid spruce top with rosewood back and sides",
    price: 299.99,
    originalPrice: 349.99,
    category: "Guitars",
    brand: "Yamaha",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Roland TD-17KVX Electronic Drum Kit",
    description: "Professional V-Drums with mesh heads",
    price: 1299.99,
    category: "Drums",
    brand: "Roland",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: true,
    isSale: false,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Korg Minilogue XD Synthesizer",
    description: "Analog synthesizer with digital effects",
    price: 649.99,
    category: "Keyboards",
    brand: "Korg",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Shure SM58 Dynamic Microphone",
    description: "Industry standard vocal microphone",
    price: 99.99,
    category: "Audio",
    brand: "Shure",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
    rating: 4.9,
  },
  {
    id: 5,
    name: "Fender Player Stratocaster",
    description: "Classic electric guitar with modern features",
    price: 849.99,
    category: "Guitars",
    brand: "Fender",
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
    isNew: false,
    isSale: false,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Pearl Export Series Drum Kit",
    description: "5-piece acoustic drum set with cymbals",
    price: 699.99,
    originalPrice: 799.99,
    category: "Drums",
    brand: "Pearl",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.5,
  },
  {
    id: 7,
    name: "Nord Stage 3 88-Key",
    description: "Professional stage piano and synthesizer",
    price: 3999.99,
    category: "Keyboards",
    brand: "Nord",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: true,
    isSale: false,
    rating: 4.8,
  },
  {
    id: 8,
    name: "Audio-Technica AT2020 Condenser Mic",
    description: "Studio condenser microphone",
    price: 149.99,
    category: "Audio",
    brand: "Audio-Technica",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
    rating: 4.7,
  },
  {
    id: 9,
    name: "Gibson Les Paul Standard",
    description: "Iconic electric guitar with humbucker pickups",
    price: 2499.99,
    category: "Guitars",
    brand: "Gibson",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
    rating: 4.9,
  },
  {
    id: 10,
    name: "Focusrite Scarlett 2i2 Audio Interface",
    description: "USB audio interface for home recording",
    price: 179.99,
    category: "Audio",
    brand: "Focusrite",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
    rating: 4.6,
  },
  {
    id: 11,
    name: "Taylor 814ce Acoustic Guitar",
    description: "Grand Auditorium with Sitka spruce top",
    price: 3299.99,
    category: "Guitars",
    brand: "Taylor",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: true,
    isSale: false,
    rating: 4.9,
  },
  {
    id: 12,
    name: "Moog Subsequent 37 Synthesizer",
    description: "Analog synthesizer with 37 keys",
    price: 1599.99,
    originalPrice: 1799.99,
    category: "Keyboards",
    brand: "Moog",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.8,
  },
  {
    id: 13,
    name: "DW Performance Series Drum Kit",
    description: "Professional maple shell drum set",
    price: 1899.99,
    category: "Drums",
    brand: "DW",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
    rating: 4.7,
  },
  {
    id: 14,
    name: "Neumann TLM 103 Condenser Mic",
    description: "Large diaphragm studio microphone",
    price: 1199.99,
    category: "Audio",
    brand: "Neumann",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    isNew: false,
    isSale: false,
    rating: 4.9,
  },
  {
    id: 15,
    name: "Martin D-28 Acoustic Guitar",
    description: "Dreadnought with East Indian rosewood",
    price: 3199.99,
    category: "Guitars",
    brand: "Martin",
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
    isNew: false,
    isSale: false,
    rating: 4.8,
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    "all",
    ...Array.from(new Set(allProducts.map((p) => p.category))),
  ];
  const brands = [
    "all",
    ...Array.from(new Set(allProducts.map((p) => p.brand))),
  ];

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesBrand =
        selectedBrand === "all" || product.brand === selectedBrand;

      return matchesSearch && matchesCategory && matchesBrand;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrand, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search instruments, brands, models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand === "all" ? "All Brands" : brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing {filteredAndSortedProducts.length} of {allProducts.length}{" "}
            products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedBrand("all");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredAndSortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardHeader
                    className={`p-0 relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-48 h-32" : "w-full h-48"
                        }`}
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                            NEW
                          </Badge>
                        )}
                        {product.isSale && (
                          <Badge className="bg-red-500 hover:bg-red-600 text-white font-semibold">
                            SALE
                          </Badge>
                        )}
                      </div>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge
                            variant="secondary"
                            className="text-lg px-4 py-2"
                          >
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <div
                    className={`flex flex-col justify-between ${viewMode === "list" ? "flex-1" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant="outline"
                          className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                        >
                          {product.category}
                        </Badge>
                        <div className="text-right text-xs text-gray-500">
                          ⭐ {product.rating}
                        </div>
                      </div>
                      <CardTitle
                        className={`mb-2 group-hover:text-purple-600 transition-colors ${
                          viewMode === "list" ? "text-xl" : "text-lg"
                        }`}
                      >
                        {product.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        Brand: {product.brand}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold text-purple-600">
                          ₹{product.price}
                        </p>
                        {product.originalPrice && (
                          <p className="text-lg text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </p>
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
                          <Link href={`/product/${product.id}`}>
                            {product.inStock ? "View Details" : "Out of Stock"}
                          </Link>
                        </Button>
                        <ShareButton
                          product={product}
                          size="default"
                          variant="outline"
                          className="border-purple-200 hover:bg-purple-50"
                        />
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
