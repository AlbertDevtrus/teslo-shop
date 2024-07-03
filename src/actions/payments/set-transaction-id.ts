'use server';

import prisma from "@/lib/prisma";

export const setTransactionId = async (orderID: string, transactionID: string) => {
  try {
    
    const order = await prisma.order.update({
      where: { id: orderID },
      data: {
        transactionID: transactionID
      }
    })

    if(!order) {
      return {
        ok: false,
        msg: `No se encontro la orden con el id: ${orderID}`
      }
    }

    return {
      ok: true,
      msg: 'Orden actualizada exitosamente'
    }

  } catch (error) {

    console.log(error);

    return {
      ok: false,
      msg: 'No se pudo actualizar la orden'
    }
  }
}