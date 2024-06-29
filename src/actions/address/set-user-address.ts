'use server';

import { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userID: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userID);

    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      msg: 'No se pudo guardar la direccion'
    }
  }
}

async function createOrReplaceAddress(address: Address, userID: string) {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userID: userID
      }
    })

    const dbAddress = {
      userID: userID,
      address: address.address,
      address2: address.address2,
      countriesId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city
    }

    if(!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: { ...dbAddress }
      })

      return newAddress;
    }

    const updAddress = await prisma.userAddress.update({
      where: { userID },
      data: { ...dbAddress }
    })

    return updAddress

  } catch (error) {
    console.log(error);
    throw new Error('No se pudo guardar la direccion');
  }
}