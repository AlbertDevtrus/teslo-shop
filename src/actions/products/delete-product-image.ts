'use server';

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";


cloudinary.config( process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (imageID: number, imageURL: string) => {

  if(!imageURL.startsWith('http')) {
    return {
      ok: false,
      msg: 'No se pueden borrar imagenes de filesystem'
    }
  }

  const imageName = imageURL
    .split('/')
    .pop()
    ?.split('.')[0] ?? '';
  
  try {
    
    await cloudinary.uploader.destroy(imageName);

    const deletedImage = await prisma.productImage.delete({
      where: { id: imageID },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/products/${deletedImage.product.slug}`)
    revalidatePath(`/product/${deletedImage.product.slug}`)

  } catch (error) {
    return {
      ok: false,
      msg: 'No se pudo eliminar la imagen'
    }
  }

}