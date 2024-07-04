'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const  changeUserRole = async (userID: string, role: string) => {
  const session = await auth()

  if(session?.user.role !== 'admin') {
    return {
      ok: false,
      msg: 'Debe de ser un administrador'
    }
  }

  try {

    const newRole = role === 'admin' ? 'admin' : 'user';
    
    const user = await prisma.user.update({
      where: { id: userID },
      data: {
        role: newRole
      }
    })

    revalidatePath('/admin/users')

    return { 
      ok: true
    }


  } catch (error) {
    console.log(error);

    return {
      ok: false,
      msg: 'No se pudo actualizar el rol'
    }
  }
}