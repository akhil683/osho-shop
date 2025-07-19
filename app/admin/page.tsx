"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProductSection from "@/components/add-product-section";
import AllProductsSection from "@/components/all-products-section";
import AnalyticsSection from "@/components/analytics-section";
import { useEffect, useState } from "react";
import AdminLogin from "@/components/AdminLogin";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("sadhana_admin_username");
    const password = localStorage.getItem("sadhana_admin_password");
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="text-3xl text-center mt-32">Loading...</div>;
  }

  return (
    <>
      {!isAuth ? (
        <AdminLogin />
      ) : (
        <div className="container mx-auto py-10">
          <h1 className="md:text-3xl text-2xl font-bold mb-6">
            Admin Dashboard
          </h1>
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
      )}
    </>
  );
}
