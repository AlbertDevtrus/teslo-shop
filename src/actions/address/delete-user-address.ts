'use server'

import prisma from "@/lib/prisma"

export const deleteUserAddress = async (userID: string) => {
  
  return await deleteAddress(userID);

}

async function deleteAddress(userID: string) {
  try {
    await prisma.userAddress.delete({ where: { userID } });
  
    return {
      ok: true,
      msg: 'Direccion borrada'
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: 'No se pudo borrar la direccion'
    }
  }
}