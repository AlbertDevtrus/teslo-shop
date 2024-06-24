'use server';

import prisma from "@/lib/prisma";

interface Props {
  slug: string
}

export const getStockSlug = async ({ slug }: Props) => {

  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: slug
      },
      select: {
        inStock: true
      }
    })

    if(!product) return null;

    return product.inStock;

  } catch (error) {
    throw new Error('Error obteniendo el stock del producto')
  }
}