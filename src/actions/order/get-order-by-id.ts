'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {

  const session = await auth();

  if(!session?.user) {
    return {
      ok: false,
      msg: 'Debe de estar autenticado'
    }
  } 

  try {

    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        OrderAddress: true,
        OrderItems: {
          select: {
            price: true,
            size: true,
            quantity: true,

            product: {
              select: {
                title: true,
                slug: true,
                
                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if(!order) {
      throw new Error(`${id} no existe`);
    }

    if(session.user.role === 'user') {
      if(session.user.id !== order.userID) {
        throw new Error(`${id} no es de este usuario`);
      } 
    }

    return {
      ok: true,
      order
    };

    // const [order, address, productsInOrder] = await Promise.all([
    //   prisma.order.findFirst({ where: { id: id } }), 
    //   prisma.orderAddress.findFirst({ where: { orderID: id } }),
    //   prisma.orderItems.findMany({ where: { orderID: id } })
    // ]);
        
    // if(!order) {
    //   throw new Error(`${id} order not found - 404`);
    // }

    // const products = await Promise.all(productsInOrder.map(async (p) => {
    //   const product = await prisma.product.findFirst({
    //     where: { id: p.productID },
    //     select: {
    //       title: true,
    //     }
    //   });

    //   const productImage = await prisma.productImage.findFirst({
    //     where: { productID: p.productID },
    //     select: {
    //       url: true
    //     }
    //   })

    //   return {
    //     title: product?.title,
    //     image: productImage?.url,
    //     ...p
    //   }
    // })) ?? [];

    // return {
    //   ok: true,
    //   address,
    //   order,
    //   products
    // }

  } catch (error: any) {
    console.log(error);

    return {
      ok: false,
      msg: `Error obteniendo tu orden: ${error.message}`
    }
  }
}