'use client';

import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productsInCart = useCartStore( state => state.cart);
  const updateProductQuantity = useCartStore( state => state.updatedProductQuantity)
  const removeProduct = useCartStore( state => state.removeProduct)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if(!loaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded object-cover"
          />
          <div>
            <Link className="hover:text-blue-500" href={`/product/${product.slug}`}>
              {product.title} - <span className="font-semibold">{product.size}</span>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector quantity={product.quantity} onQuantityChange={ value => updateProductQuantity(product, value) } />
            <button onClick={() => removeProduct(product)} className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
