import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { Category } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category
  }
}

export default function CategoryPage({params}: Props) {

  const { id } = params;

  // if(id === 'kids') {
  //   notFound();
  // }

  const filteredProducts = initialData.products.filter(product => product.gender === id);

  const trad: Record<Category, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'para todos'
  }

  return (
    <>
      <Title title={trad[id]} subtitle={`Todos los productos para ${trad[id]}`} />
      <ProductGrid products={filteredProducts} />
    </>
  );
}