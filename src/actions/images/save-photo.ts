'use server'

import { Prisma } from '@/generated/prisma/client';
import { auth } from '../../../auth';
import { prisma } from "@/lib/prisma"


export async function savePhoto(url: string, publicId: string) {

  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }


  try {
    // 2️⃣ Save photo
    await prisma.photo.create({
      data: {
        url,
        publicId,
        userId: session.user.id
      }
    })

    return {
      success: true,
      data: {
        url,
        publicId,
        userId: session.user.id
      }
    }
    


  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        error: `Prisma Error [${error.code}]: ${error.message}`
      }
    }
    
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}