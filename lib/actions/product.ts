"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/product";
import { revalidatePath } from "next/cache";

export async function createProduct({
  name,
  description,
  price,
  imageUrl,
  originalPrice,
  category,
  subCategory,
}: {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  originalPrice: string;
  category: string;
  subCategory: string;
}) {
  await dbConnect();

  try {
    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      category,
      subCategory,
      imageUrl,
      isStock: true,
      isNew: true,
      isSale: true,
    });
    console.log("product", product);
    revalidatePath("/admin");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function deleteProduct(name: string) {
  await dbConnect();

  try {
    await Product.deleteOne({ name });
    revalidatePath("/admin");
    revalidatePath("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function getAllProducts() {
  await dbConnect();
  try {
    const products = await Product.find({});
    console.log(products);
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
