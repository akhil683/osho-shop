import ProductsPage from "@/components/Products.component";
import { featuredProducts } from "@/data/product";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const filtered = featuredProducts.filter(
    (product) => product?.category === id,
  );
  if (filtered.length === 0) {
    return null;
  }
  console.log(filtered);
  return (
    <section>
      <ProductsPage products={filtered} />
    </section>
  );
}
