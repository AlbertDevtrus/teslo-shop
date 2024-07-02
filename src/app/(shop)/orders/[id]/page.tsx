import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getOrderById } from "@/actions";
import { currencyFormat } from "@/utility";

import { IoCartOutline } from "react-icons/io5";
import Title from "@/components/ui/title/Title";
import { PayPalBtn } from "@/components";

interface Props {
  params: { id: string };
}

export default async function CartPage({ params }: Props) {
  const { id } = params;

  const { order, ok } = await getOrderById(id);

  if(!ok) {
    redirect('/');
  }

  const address = order!.OrderAddress;
  const products = order!.OrderItems;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[700px]">
        <Title title={`Orden #${id.split('-')[0]}`} />

        <div className="grid grid-cols-1 gap-10 mr-10">
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5  text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                }
              )}
            >
              <IoCartOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {products.map((product) => (
            <div key={product.product.slug + product.size} className="flex">
              <Image
                src={`/products/${product.product.ProductImage[0].url}`}
                width={100}
                height={100}
                style={{
                  width: "100px",
                  height: "100px",
                }}
                alt={product.product.title}
                className="mr-5 rounded object-cover"
              />
              <div>
                <p>{product.product.title}</p>
                <p>${product.price} x {product.quantity}</p>
                <p className="font-bold">Subtotal: {currencyFormat(product.price * product.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-7 w-[500px] mt-10">
        <h2 className="text-2xl mb-2">Direccion de entrega</h2>

        <div className="mb-10">
          <p className="font-bold">{address?.firstName} {address?.lastName}</p>
          <p>{address?.address}</p>
          <p>{address?.city}, {address?.countryID}</p>
          <p>CP. {address?.postalCode}</p>
          <p>{address?.phone}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

        <h2 className="text-2xl mb-2">Resumen de orden</h2>
        <div className="grid grid-cols-2 gap-2 ">
          <span>No. Productos</span>
          <span className="text-right">{order?.itemsInOrder} articulos</span>

          <span>Subtotal</span>
          <span className="text-right">{currencyFormat(order!.subTotal)}</span>

          <span>Impuestos</span>
          <span className="text-right">15%</span>

          <span className="text-2xl mt-5">Total:</span>
          <span className="text-right mt-5 text-2xl">{currencyFormat(order!.total)}</span>
        </div>

        <div className="mt-5 mb-2 w-full">
          <PayPalBtn />
        </div>
      </div>
    </div>
  );
}
