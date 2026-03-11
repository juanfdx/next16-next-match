'use server';

import type { Result } from '@/utils/types';
import { auth } from '../../../auth';
import { prisma } from '@/lib/prisma';
import { Photo } from '@/generated/prisma/client';



export const getUserPhotos = async (): Promise<Result<{ photos: Photo[] }>> => {
  
  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }

  try {
    // 2️⃣ Get user image
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        photos: true,
      },
    });

    if (!user) {
      return { 
        success: false, 
        error: 'User not found',
      };
    }

    return {
      success: true,
      data: {
        photos: user.photos,
      },
    };


  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };  
  }
}