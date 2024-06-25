import Title from "@/components/ui/title/Title";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

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
          
        <ProductsInCart />

        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-7 w-[500px] mt-10">
        <h2 className="text-2xl mb-2">
          Resumen de orden
        </h2>
        <OrderSummary />

        <div className="mt-5 mb-2 w-full">
          <Link href="/checkout/address" className="flex btn-primary justify-center">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
