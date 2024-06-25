"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utility";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const { subTotal, itemsInCart, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-2 ">
      <span>No. Productos</span>
      <span className="text-right">
        {
          itemsInCart === 1 ? '1 articulo': `${itemsInCart} articulos`
        }
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
    </div>
  );
};
