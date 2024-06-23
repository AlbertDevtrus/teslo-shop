export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { Category } from "@/interfaces/product.interface";

interface Props {
  params: {
    gender: Category
  },
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({params, searchParams}: Props) {

  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender });

  const trad: Record<Category, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'para todos'
  }

  return (
    <>
      <Title title={trad[gender]} subtitle={`Todos los productos para ${trad[gender]}`} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}