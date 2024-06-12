import { Product } from "@/interfaces/product.interface"
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-col-2 sm:grid-cols-3 gap-10 mb-10">

      {
        products.map(product => (
          <ProductGridItem product={product} key={product.slug} />
        ))
      }

    </div>
  )
}
