'use server';

import type { Result } from '@/utils/types';
import { auth } from '../../../auth';
import { prisma } from '@/lib/prisma';



export const getUserImage = async (): Promise<Result<{ image: string | null }>> => {
  
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
        image: true,
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
        image: user.image,
      },
    }; 


  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };   
  }
};