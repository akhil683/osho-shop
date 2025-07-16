"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProductSection from "@/components/add-product-section";
import AllProductsSection from "@/components/all-products-section";
import AnalyticsSection from "@/components/analytics-section";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="md:text-3xl text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="add-product" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="add-product">Add Product</TabsTrigger>
          <TabsTrigger value="all-products">All Products</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="add-product">
          <AddProductSection />
        </TabsContent>
        <TabsContent value="all-products">
          <AllProductsSection />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
