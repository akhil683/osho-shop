import ProductsPage from "@/components/Products.component";
import { TProduct } from "@/data/product";
import { getAllProducts } from "@/lib/actions/product";

export async function generateStaticParams() {
  const products = await getAllProducts();
  const uniqueCategories = Array.from(
    new Set(products.map((product: TProduct) => product.category)),
  );

  return uniqueCategories.map((category) => ({
    id: category,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await getAllProducts();
  const filtered = products.filter(
    (product: TProduct) => product?.category === id,
  );
  return (
    <section>
      <ProductsPage products={filtered} />
    </section>
  );
}
