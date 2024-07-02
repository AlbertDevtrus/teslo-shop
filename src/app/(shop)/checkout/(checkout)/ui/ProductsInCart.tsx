'use client';
import Image from 'next/image'
import { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utility";

export const ProductsInCart = () => {
  const productsInCart = useCartStore( state => state.cart);


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
        <div key={`${product.id}-${product.size}`} className="flex">
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
            <span className="hover:text-blue-500">
              {product.title} - <span className="font-semibold">{product.size}</span> ({product.quantity})
            </span>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
