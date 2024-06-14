import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[700px]">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Verificar carrito</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {productsInCart.map((product) => 
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
                <p>${product.price} x 3</p>
                <p className="font-bold">Subtotal: ${product.price * 3}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-7 w-[500px] mt-10">
        <h2 className="text-2xl mb-2">Direccion de entrega</h2>
        
        <div className="mb-10">
          <p className="font-bold">Luis Guzman</p>
          <p>Av. Hola Mundo</p>
          <p>Tamaulipas</p>
          <p>Mexico</p>
          <p>CP. 9542</p>
          <p>765 567 4564</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
        
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
          <p className="mb-5">
            <span className="text-xs">Al hacer click en colocar orden, aceptas nuestros terminos y condiciones de uso.</span>
          </p>
          <Link href="/orders/123" className="flex btn-primary justify-center">Colocar orden</Link>
        </div>
      </div>
    </div>
  );
}
