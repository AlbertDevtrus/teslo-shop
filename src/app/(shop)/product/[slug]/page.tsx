export const revalidate = 604800;

import { getProductSlug } from "@/actions";
import { StockLabel } from "@/components";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import ProductMovileSliceShow from "@/components/product/sliceshow/ProductMovileSliceShow";
import ProductSliceShow from "@/components/product/sliceshow/ProductSliceShow";

import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug
 
  const product = await getProductSlug(slug);
 
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params;

  const product = await getProductSlug(slug)

  if( !product ) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">

        <ProductMovileSliceShow title={product.title} images={product.images} className='block md:hidden' />

        <ProductSliceShow title={product.title} images={product.images} className='hidden md:block' />
      </div>
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]} />
        <QuantitySelector quantity={2}/>

        <button className="btn-primary my-5"> Agregar al carrito </button>

        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}