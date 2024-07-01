'use server';

import { auth } from "@/auth.config";
import type { Address } from "@/interfaces/address.interface";
import type { Size } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productID: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIDs: ProductToOrder[], address: Address) => {
  
  const session = await auth();
  
  const userID = session?.user.id;

  if(!userID) {
    return {
      ok: false,
      msg: 'No hay session de usuario'
    }
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIDs.map(product => product.productID)
      } 
    }
  })

  const itemsInOrder = productIDs.reduce((acc, product) => acc + product.quantity, 0);

  const { subtotal, tax, total } = productIDs.reduce((totals, product) => {
    
    const productQuantity = product.quantity;
    const item = products.find(p => p.id === product.productID);

    if(!item) throw new Error(`${product.productID} no existe - 500`);
    
    const subtotal = item.price * productQuantity;

    totals.subtotal += subtotal;
    totals.tax += subtotal * 0.15;
    totals.total += subtotal * 1.15;

    return totals;
  }, { subtotal: 0, total: 0, tax: 0 } )

  console.log({ subtotal, tax, total })

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      const updatedProductsPromises = products.map(product => {
  
        const productQuantity = productIDs.filter(
          p => p.productID === product.id
        ).reduce((acc, item) => item.quantity + acc, 0);
  
        if(productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }
  
        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        })
  
      }) 
  
      const updatedProducts = await Promise.all(updatedProductsPromises);
  
      updatedProducts.forEach(product => {
        if(product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      })
  
      const order = await tx.order.create({
        data: {
          userID: userID,
          itemsInOrder: itemsInOrder,
          subTotal: subtotal,
          tax: tax,
          total: total,
  
          OrderItems: {
            createMany: {
              data: productIDs.map(p => ({
                quantity: p.quantity,
                size: p.size,
                productID: p.productID,
                price: products.find(product => product.id === p.productID)?.price ?? 0
              }))
            }
          },
  
        }
      })
  
      const { country: countryID, userID: _, ...restAddress } = address;
  
      const orderAddress = await tx.orderAddress.create({
        data: {
          countryID,
          ...restAddress,
          orderID: order.id
        }
      })
  
      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress
      }
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx
    }
    
  } catch (error: any) {
    console.log(error);

    return {
      ok: false,
      msg: error.message
    }
  }
  
} 