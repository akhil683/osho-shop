"use client";
import { TProduct } from "@/data/product";
import { getAllProducts } from "@/lib/actions/product";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShareButton } from "./share-button";

export default function HomeProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <div className="w-full min-h-72 rounded-xl bg-gray-500/40 animate-pulse" />
        <div className="w-full min-h-72 rounded-xl bg-gray-500/40 animate-pulse" />
        <div className="w-full min-h-72 rounded-xl bg-gray-500/40 animate-pulse" />
        <div className="w-full min-h-72 rounded-xl bg-gray-500/40 animate-pulse" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
      {products.slice(0, 10).map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
        >
          <CardHeader className="p-0 relative">
            <div className="relative overflow-hidden">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
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
              {product.inStock === false && (
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
              <Badge
                variant="outline"
                className="text-xs bg-purple-50 text-purple-700 border-purple-200"
              >
                {product.category}
              </Badge>
            </div>
            <CardTitle className="text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
              {product.name}
            </CardTitle>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {product.description}
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
                disabled={product.inStock === false}
              >
                <Link
                  href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {product.inStock === false ? "Out of Stock" : "View Details"}
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
        </Card>
      ))}
    </div>
  );
}
