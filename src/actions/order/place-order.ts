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

  const prismaTx = await prisma.$transaction(async (tx) => {
    
  });

} 