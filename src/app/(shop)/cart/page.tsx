import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {

  // redirect('/empty');

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[700px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className="underline mb-5">
              Continua comprando
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {productsInCart.map((product) => (
            <div key={product.slug} className="flex">
              <Image
                src={`/products/${product.images[0]}`}
                width={100}
                height={100}
                style={{
                  width: '100px',
                  height: '100px',
                }}
                alt={product.title}
                className="mr-5 rounded object-cover"
              />
              <div>
                <p>{product.title}</p>
                <p>${product.price}</p>
                <QuantitySelector quantity={3} />
                <button className="underline mt-3">Remover</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-7 w-[500px] mt-10">
        <h2 className="text-2xl mb-2">
          Resumen de orden
        </h2>
        <div className="grid grid-cols-2 gap-2 ">
          <span>No. Productos</span>
          <span className="text-right">3 articulos</span>

          <span>Subtotal</span>
          <span className="text-right">$100</span>

          <span>Impuestos</span>
          <span className="text-right">15%</span>

          <span className="text-2xl mt-5">Total:</span>
          <span className="text-right mt-5 text-2xl">$115</span>
        </div>

        <div className="mt-5 mb-2 w-full">
          <Link href="/checkout/address" className="flex btn-primary justify-center">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
