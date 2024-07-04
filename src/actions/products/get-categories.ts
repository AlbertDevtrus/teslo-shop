'use server'

import prisma from "@/lib/prisma"

export const getCategories = async () => {
  try {
    
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
      categories: categories
    }

  } catch (error) {
    return {
      ok: false,
      msg: 'No se pudieron obtener las categorias'
    }
  }
}