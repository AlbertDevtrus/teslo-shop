"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utility";
import { placeOrder } from "@/actions";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore(state => state.cart);
  const { subTotal, itemsInCart, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setPlacingOrder(true);

    const productsToOrder = cart.map(product => ({
      productID: product.id,
      quantity: product.quantity,
      size: product.size
    }));
    
    const resp = await placeOrder(productsToOrder, address);

    setPlacingOrder(false);
  }

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 w-[500px] mt-10">
      <h2 className="text-2xl mb-2">Direccion de entrega</h2>

      <div className="mb-10 text-gray-800">
        <p className="font-bold text-black">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.city}, {address.country}</p>
        <p>CP. {address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2 gap-2 ">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 articulo" : `${itemsInCart} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-right mt-5 text-2xl">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en colocar orden, aceptas nuestros terminos y
            condiciones de uso.
          </span>
        </p>

        {/* <p className="text-red-500 text-center">Error de creacion</p> */}

        <button
          // href="/orders/123"
          onClick={onPlaceOrder}
          className={clsx(
            "flex justify-center w-full", {
              'btn-primary': !placingOrder,
              'btn-disabled': placingOrder
            }
          )}
          disabled={placingOrder}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
