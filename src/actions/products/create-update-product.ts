'use server';

import { v2 as cloudinary } from 'cloudinary';

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';


cloudinary.config( process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
  inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
  categoryID: z.string().uuid(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
})


export const createUpdateProduct = async (formData: FormData) => {

  const data = Object.fromEntries(formData);
  const productParse = productSchema.safeParse(data);

  if (!productParse.success) {
    return {
      ok: false
    }
  }

  const product = productParse.data;

  product.slug = product.slug.toLowerCase().replace(/ /g,'_').trim();

  
  const { id, ...rest } = product;
  
  console.log(rest);

  try {

    const prismaTx = await prisma.$transaction(async (tx) => {
  
      let updatedProduct: Product;
      const tagsArr = rest.tags.split(',').map(tag => tag.trim().toLowerCase());
  
      if (id) { 
        updatedProduct = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArr,
            },
          }
        })
  
      } else {
        updatedProduct = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArr,
            },
          }
        })
      }

      if(formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);

        if(!images) {
          throw new Error('No se pudo cargar las imagenes');
        }

        await prisma.productImage.createMany({
          data: images.map(image => ({
            url: image!,
            productID: updatedProduct.id
          }))
        })

      }
      
      return {
        updatedProduct
      }
    })

    revalidatePath('/admin/product');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);
    
    return {
      ok: true,
      updatedProduct: prismaTx.updatedProduct
    }
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      msg: 'No se pudo crear'
    }
  }

} 

const uploadImages = async (images: File[]) => {
  try {
    
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        
        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                .then(resp => resp.secure_url);
      } catch (error) {
        console.log(error);
        
        return null;
      }  

    });

    const uploadedImages = await Promise.all(uploadPromises); 

    return uploadedImages;
  } catch (error) {
    console.log(error);
    
    return null;
  }
}