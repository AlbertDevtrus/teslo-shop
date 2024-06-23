export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if(products.length === 0) {
    redirect('/')
  };
  
  return (
    <>
      <Title title="TIENDA" subtitle="Todos los productos" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
