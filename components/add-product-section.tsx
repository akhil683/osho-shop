"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function AddProductSection() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Server action will be called here
    console.log({
      name,
      description,
      price,
      image,
      originalPrice,
      category,
      subCategory,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <Label htmlFor="originalPrice">Original Price</Label>
            <Input
              id="originalPrice"
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex  justify-between gap-2">
          <div className="w-full">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="string"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <Label htmlFor="subCategory">Sub Category</Label>
            <Input
              id="subCategory"
              type="string"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
}
