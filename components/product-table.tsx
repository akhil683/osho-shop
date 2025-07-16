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
import { TProduct, featuredProducts } from "@/data/product";
import Image from "next/image";

export default function ProductTable() {
  const handleDelete = (id: number) => {
    console.log(`Delete product with ID: ${id}`);
    // Implement actual delete logic here (e.g., API call)
  };

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
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {featuredProducts.map((product: TProduct) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="object-cover rounded"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
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
