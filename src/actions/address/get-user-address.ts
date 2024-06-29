'use server';

import prisma from "@/lib/prisma";

export const getUserAddress = async (userID: string) => {
  try {
    const userAddress = await prisma.userAddress.findFirst({
      where: { userID }
    })

    if(!userAddress) return null;

    const { countriesId, address2, ...rest } = userAddress;

    return {
      ...rest,
      country: countriesId,
      address2: address2 ? address2 : ''
    };
  } catch (error) {
    console.log(error);

    return null;
  }
}