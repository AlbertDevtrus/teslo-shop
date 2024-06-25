"use client";

import { useState } from "react";

import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";

import { CartProduct, Product, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore( state => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);

  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">Talla no seleccionada</span>
      )}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChange={setSize}
      />
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        {" "}
        Agregar al carrito{" "}
      </button>
    </>
  );
};
