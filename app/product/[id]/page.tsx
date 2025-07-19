import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderForm } from "@/components/order-form";
import { ShareButton } from "@/components/share-button";
import { TProduct } from "@/data/product";
import { getAllProducts } from "@/lib/actions/product";

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product: TProduct) => ({
    id: product.name,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const products = await getAllProducts();
  const { id } = await params;
  const product = products.find(
    (p: TProduct) => p.name.toLowerCase().replace(/\s+/g, "-") == id,
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 max-md:text-sm"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-96 object-contain rounded-lg"
              />
              {/* {!product.inStock && ( */}
              {/*   <Badge variant="secondary" className="absolute top-4 right-4"> */}
              {/*     Out of Stock */}
              {/*   </Badge> */}
              {/* )} */}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-4">
                ₹{product.price}{" "}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Share Section */}
            {/* <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100"> */}
            {/*   <div className="flex items-center space-x-3"> */}
            {/*     <div className="p-2 bg-red-100 rounded-lg"> */}
            {/*       <Share2 className="h-5 w-5 text-red-600" /> */}
            {/*     </div> */}
            {/*     <div> */}
            {/*       <h4 className="font-semibold text-red-800"> */}
            {/*         Love this instrument? */}
            {/*       </h4> */}
            {/*       <p className="text-sm text-red-600"> */}
            {/*         Share it with your friends! */}
            {/*       </p> */}
            {/*     </div> */}
            {/*   </div> */}
            {/*   <ShareButton */}
            {/*     product={product} */}
            {/*     size="lg" */}
            {/*     variant="default" */}
            {/*     className="bg-red-600 hover:bg-red-700" */}
            {/*   /> */}
            {/* </div> */}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* {featuredProducts.inStock ? ( */}
            <Card>
              <CardHeader>
                <CardTitle>Place Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderForm product={product} />
              </CardContent>
            </Card>
            {/* ) : ( */}
            {/*   <Card> */}
            {/*     <CardContent className="pt-6"> */}
            {/*       <div className="text-center"> */}
            {/*         <h3 className="text-lg font-semibold mb-2"> */}
            {/*           Currently Out of Stock */}
            {/*         </h3> */}
            {/*         <p className="text-muted-foreground mb-4"> */}
            {/*           This item is temporarily unavailable. Please check back */}
            {/*           later or contact us for more information. */}
            {/*         </p> */}
            {/*         <Button variant="outline" asChild> */}
            {/*           <Link href="/">Browse Other Products</Link> */}
            {/*         </Button> */}
            {/*       </div> */}
            {/*     </CardContent> */}
            {/*   </Card> */}
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
