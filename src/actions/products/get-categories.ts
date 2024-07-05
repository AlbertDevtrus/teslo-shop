'use server'

import prisma from "@/lib/prisma"

export const getCategories = async () => {
  
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'desc'
    },
    select: {
      id: true,
      name: true
    }
  })

  return {
    ok: true,
    categories: categories ?? ''
  }

}