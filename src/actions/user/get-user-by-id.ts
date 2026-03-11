'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';
import type { Profile, Result } from '@/utils/types';



export const getUserById = async (userId: string): Promise<Result<Profile>> => {

  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }


  try {
    // 2️⃣ Get user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        gender: true,
        dateOfBirth: true,
        description: true,
        city: true,
        country: true,
        createdAt: true,
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
      data: user, 
    };

    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    }; 
  }

}