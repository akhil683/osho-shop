"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAllProducts, deleteProduct } from "@/lib/actions/product";
import { useQuery } from "@tanstack/react-query";
import { TProduct } from "@/data/product";

export default function ProductTable() {
  const { data: products = [], isLoading } = useQuery<TProduct[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await getAllProducts();
      return result;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const handleDelete = async (name: string) => {
    await deleteProduct(name);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <div className="h-24 rounded-xl w-full bg-gray-300 animate-pulse" />
        <div className="h-24 rounded-xl w-full bg-gray-300 animate-pulse" />
        <div className="h-24 rounded-xl w-full bg-gray-300 animate-pulse" />
      </div>
    );
  }
  return (
    <div className="mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: TProduct, index: number) => (
            <TableRow key={product.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="object-cover rounded"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>₹{product.price}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.name)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
